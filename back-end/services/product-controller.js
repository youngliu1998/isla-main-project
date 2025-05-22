import db from '../config/mysql.js'
import { uploadImageAndGetUrl } from './product-picture-upload-service.js'

export async function getFilteredProducts(filters) {
  const {
    keyword,
    onSaleOnly,
    brandIds,
    categoryIds,
    tagIds,
    minPrice,
    maxPrice,
    minRating,
    maxRating,
    limit = 20,
    offset = 0,
    sortOrder,
    sortBy,
  } = filters

  const allowedSortMap = {
    final_price: 'final_price',
    average_rating: 'review_summary.avg_rating',
    created_at: 'products.created_at',
  }
  let sortValue = allowedSortMap[filters.sortBy] || 'products.product_id'
  // console.log('sortBy:', sortBy)
  console.log('sortValue:', sortValue)
  console.log('sortOrder:', sortOrder)
  const onSaleFlag = Boolean(onSaleOnly)
  console.log('onSaleFlag:', onSaleFlag)
  const conditions = []
  const params = []

  // 建立 SQL 查詢的基本部分
  let sql = `
    SELECT 
      products.product_id,
      products.name,
      products.base_price,
      products.sale_price,
      products.sale_start_date,
      products.sale_end_date,
      brand.name AS brand_name,
      category.name AS category_name,
      primary_image.image_url AS primary_image_url,
      review_summary.review_count,
      review_summary.avg_rating,
      GROUP_CONCAT(DISTINCT product_color_stocks.color_id) AS color_ids,
      SUM(product_color_stocks.stock_quantity) AS total_stock,
      GROUP_CONCAT(DISTINCT product_tags.name ORDER BY product_tags.name) AS tag_names,
      CASE 
        WHEN products.sale_price IS NOT NULL 
             AND NOW() >= products.sale_start_date
             AND NOW() <= products.sale_end_date
        THEN products.sale_price
        ELSE products.base_price
      END AS final_price,
      CASE 
        WHEN products.sale_price IS NOT NULL 
             AND NOW() >= products.sale_start_date
             AND NOW() <= products.sale_end_date
        THEN TRUE
        ELSE FALSE
      END AS is_on_sale
    FROM products
    JOIN brands brand ON products.brand_id = brand.brand_id
    JOIN categories category ON products.category_id = category.category_id
    LEFT JOIN (
      SELECT product_id, MIN(image_url) AS image_url
      FROM product_images
      WHERE is_primary = 1
      GROUP BY product_id
    ) AS primary_image ON primary_image.product_id = products.product_id
    LEFT JOIN (
      SELECT 
        product_id, 
        COUNT(*) AS review_count, 
        ROUND(AVG(rating), 1) AS avg_rating
      FROM product_reviews
      WHERE status = 'approved'
      GROUP BY product_id
    ) AS review_summary ON review_summary.product_id = products.product_id
    LEFT JOIN product_color_stocks ON product_color_stocks.product_id = products.product_id
    LEFT JOIN product_tag_relations ON product_tag_relations.product_id = products.product_id
    LEFT JOIN product_tags ON product_tags.tag_id = product_tag_relations.tag_id
  `

  // 篩選
  if (brandIds && brandIds.length > 0) {
    conditions.push(
      `products.brand_id IN (${brandIds.map(() => '?').join(',')})`
    )
    params.push(...brandIds)
  }
  if (categoryIds && categoryIds.length > 0) {
    conditions.push(
      `products.category_id IN (${categoryIds.map(() => '?').join(',')})`
    )
    params.push(...categoryIds)
  }
  if (tagIds && tagIds.length > 0) {
    conditions.push(`
      products.product_id IN (
        SELECT product_id
        FROM product_tag_relations
        WHERE tag_id IN (${tagIds.map(() => '?').join(',')})
        GROUP BY product_id
        HAVING COUNT(DISTINCT tag_id) = ${tagIds.length}
      )
    `)
    params.push(...tagIds)
  }
  if (minPrice !== undefined && minPrice !== null) {
    conditions.push(`
      CASE 
        WHEN products.sale_price IS NOT NULL 
             AND NOW() >= products.sale_start_date
             AND NOW() <= products.sale_end_date
        THEN products.sale_price
        ELSE products.base_price
      END >= ?
    `)
    params.push(minPrice)
  }
  if (maxPrice !== undefined && maxPrice !== null) {
    conditions.push(`
      CASE 
        WHEN products.sale_price IS NOT NULL 
             AND NOW() >= products.sale_start_date
             AND NOW() <= products.sale_end_date
        THEN products.sale_price
        ELSE products.base_price
      END <= ?
    `)
    params.push(maxPrice)
  }
  if (
    minRating !== undefined &&
    minRating !== null &&
    maxRating !== undefined &&
    maxRating !== null
  ) {
    conditions.push(
      `(review_summary.avg_rating IS NOT NULL AND review_summary.avg_rating >= ? AND review_summary.avg_rating <= ?)`
    )
    params.push(minRating, maxRating)
  } else if (minRating !== undefined && minRating !== null) {
    conditions.push(
      `(review_summary.avg_rating IS NOT NULL AND review_summary.avg_rating >= ?)`
    )
    params.push(minRating)
  } else if (maxRating !== undefined && maxRating !== null) {
    conditions.push(
      `(review_summary.avg_rating IS NOT NULL AND review_summary.avg_rating <= ?)`
    )
    params.push(maxRating)
  }

  // 關鍵字搜尋
  if (keyword) {
    const loweredKeyword = `%${keyword.toLowerCase()}%`
    conditions.push(`
    (
      LOWER(products.name) LIKE ?
      OR LOWER(brand.name) LIKE ?
      OR LOWER(category.name) LIKE ?
      OR EXISTS (
        SELECT 1
        FROM product_tags pt
        JOIN product_tag_relations ptr ON ptr.tag_id = pt.tag_id
        WHERE ptr.product_id = products.product_id
        AND LOWER(pt.name) LIKE ?
      )
    )
  `)
    params.push(loweredKeyword, loweredKeyword, loweredKeyword, loweredKeyword)
  }

  //只顯示特價開關，判斷特價欄位及日期
  if (onSaleFlag) {
    conditions.push(`
    products.sale_price IS NOT NULL
    AND NOW() >= products.sale_start_date
    AND NOW() <= products.sale_end_date
  `)
  }

  // 添加 WHERE 子句（如果需要）
  if (conditions.length > 0) {
    sql += ' WHERE ' + conditions.join(' AND ')
  }

  // GROUP BY, ORDER BY, LIMIT 和 OFFSET
  sql += `
    GROUP BY products.product_id
    ORDER BY ${sortValue} ${sortOrder === 'desc' ? 'DESC' : 'ASC'}
    LIMIT ${limit} OFFSET ${offset};
  `

  try {
    // DEBUG
    // console.log('==== SQL ====')
    // console.log(sql)
    // console.log('==== Params ====')
    // console.log(params)
    // console.log(
    //   `Params length: ${params.length}, Placeholders count: ${
    //     (sql.match(/\?/g) || []).length
    //   }`
    // )
    try {
      const [rows] = await db.query(sql, params)
      return rows
    } catch (queryError) {
      console.error('Error:', queryError)
      throw queryError
    }
  } catch (error) {
    console.error('SQL Run Time Error:', error)
    throw error
  }
}

export async function getProductDetail(productId) {
  const [productRows] = await db.query(
    `
      SELECT 
        products.product_id, 
        products.name, 
        products.description, 
        products.base_price, 
        products.sale_price, 
        products.status,
        brands.brand_id, 
        brands.name AS brand_name,
        categories.category_id, 
        categories.name AS category_name,
        product_tag_relations.tag_id,
        product_tags.name AS tag_name
      FROM products
      LEFT JOIN brands ON products.brand_id = brands.brand_id
      LEFT JOIN product_tag_relations ON products.product_id = product_tag_relations.product_id
      LEFT JOIN product_tags ON product_tag_relations.tag_id = product_tags.tag_id
      LEFT JOIN categories ON products.category_id = categories.category_id
      WHERE products.product_id = ?
  `,
    [productId]
  )

  if (productRows.length === 0) {
    throw new Error('找不到商品')
  }

  const product = productRows[0]

  // 顏色與庫存
  const [colors] = await db.query(
    `
    SELECT product_color_stocks.color_id, product_color_stocks.stock_quantity,
           colors.color_name, colors.color_code
    FROM product_color_stocks
    JOIN colors ON product_color_stocks.color_id = colors.color_id
    WHERE product_color_stocks.product_id = ?
  `,
    [productId]
  )

  // 圖片
  const [images] = await db.query(
    `
    SELECT image_id, image_url
    FROM product_images
    WHERE product_id = ?
  `,
    [productId]
  )

  // // 成分
  // const [ingredients] = await db.query(
  //   `
  //   SELECT ingredients.ingredient_id, ingredients.name, ingredients.is_sensitive, ingredients.warning_message
  //   FROM product_ingredients
  //   JOIN ingredients ON product_ingredients.ingredient_id = ingredients.ingredient_id
  //   WHERE product_ingredients.product_id = ?
  // `,
  //   [productId]
  // )

  // 平均評分
  const [avgResult] = await db.query(
    `
    SELECT ROUND(AVG(rating), 1) AS average_rating
    FROM product_reviews
    WHERE product_id = ?
  `,
    [productId]
  )

  const tags = productRows
    .filter((row) => row.tag_id && row.tag_name)
    .map((row) => ({
      tag_id: row.tag_id,
      name: row.tag_name,
    }))

  const average_rating = avgResult[0].average_rating || 0

  // 組合回傳資料
  return {
    product_id: product.product_id,
    name: product.name,
    description: product.description,
    price: product.price,
    status: product.status,
    brand: {
      brand_id: product.brand_id,
      name: product.brand_name,
    },
    category: {
      category_id: product.category_id,
      name: product.category_name,
    },
    tags,
    colors,
    images,
    average_rating,
  }
}

export async function getProductReviews(productId) {
  // TODO: 需與user資料表JOIN，取得使用者名稱
  const [reviews] = await db.query(
    `SELECT review_id, user_id, rating, comment_text, is_anonymous, created_at, stock_id
     FROM product_reviews
     WHERE product_id = ? AND status = 'approved'
     ORDER BY created_at DESC`,
    [productId]
  )

  const reviewResults = await Promise.all(
    reviews.map(async (review) => {
      const { review_id, stock_id } = review
      const [images] = await db.query(
        `SELECT image_url FROM review_images WHERE review_id = ?`,
        [review_id]
      )

      let color = null
      if (stock_id) {
        const [[stock]] = await db.query(
          `SELECT color_id FROM product_color_stocks WHERE stock_id = ?`,
          [stock_id]
        )
        if (stock?.color_id) {
          const [[colorInfo]] = await db.query(
            `SELECT color_id, color_name, color_code FROM colors WHERE color_id = ?`,
            [stock.color_id]
          )
          if (colorInfo) {
            color = colorInfo
          }
        }
      }

      return {
        ...review,
        images: images.map((img) => img.image_url),
        color,
      }
    })
  )

  return reviewResults
}

export async function getProductIngredient(productId) {
  // 成分
  const [ingredients] = await db.query(
    `
    SELECT ingredients.ingredient_id, ingredients.name, ingredients.is_sensitive, ingredients.warning_message
    FROM product_ingredients
    JOIN ingredients ON product_ingredients.ingredient_id = ingredients.ingredient_id
    WHERE product_ingredients.product_id = ?
  `,
    [productId]
  )

  return ingredients
}

//http://localhost:3005/api/product-reviews/user/check?product_id=133812&user_id=52
export async function getUserReviewForProduct(userId, productId) {
  const [reviewRows] = await db.query(
    `SELECT review_id, product_id, user_id, rating, comment_text, created_at
     FROM product_reviews
     WHERE user_id = ? AND product_id = ? AND status = 'approved'`,
    [userId, productId]
  )
  if (reviewRows.length === 0) return null
  const review = reviewRows[0]
  const [imageRows] = await db.query(
    `SELECT review_image_id, image_url FROM review_images WHERE review_id = ?`,
    [review.review_id]
  )
  const images = imageRows.map((img) => ({
    id: img.review_image_id,
    url: img.image_url,
  }))
  return {
    review,
    images,
  }
}

export async function saveOrUpdateReview({
  product_id,
  user_id,
  rating,
  context,
  review_id,
  imageToDelete,
  images,
}) {
  //GPT建議：使用SQL交易機制，若失敗可以撤消所有操作，保護資料表
  //GPT建議：使用村民交易機制，若失敗可以毆打村民
  const conn = await db.getConnection()
  try {
    await conn.beginTransaction()
    let newReviewId = review_id
    if (!review_id) {
      // 新增評論
      const [insertRes] = await conn.execute(
        `INSERT INTO product_reviews (product_id, user_id, rating, comment_text)
         VALUES (?, ?, ?, ?)`,
        [product_id, user_id, rating, context]
      )
      newReviewId = insertRes.insertId
    } else {
      // 更新評論
      await conn.execute(
        `UPDATE product_reviews
         SET rating = ?, comment_text = ?
         WHERE review_id = ? AND user_id = ?`,
        [rating, context, review_id, user_id]
      )
    }

    if (Array.isArray(imageToDelete) && imageToDelete.length > 0) {
      const target = imageToDelete.map(() => '?').join(',')
      await conn.execute(
        `DELETE FROM review_images
         WHERE review_image_id IN (${target}) AND review_id = ?`,
        [...imageToDelete, newReviewId]
      )
    }

    const imageUrls = await Promise.all(
      images.map((file) => uploadImageAndGetUrl(file.buffer, file.originalname))
    )

    for (const imgurl of imageUrls) {
      await conn.execute(
        `INSERT INTO review_images (review_id, image_url) VALUES (?, ?)`,
        [newReviewId, imgurl]
      )
    }

    //跟村民交易（請準備綠寶石
    await conn.commit()
  } catch (error) {
    //失敗回滾所有操作
    console.error('saveOrUpdateReview error:', error)
    await conn.rollback()
    throw error
  } finally {
    conn.release()
  }
}
