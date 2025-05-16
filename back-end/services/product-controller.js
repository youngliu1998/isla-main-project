import db from '../config/mysql.js'

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
  } = filters

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
  if (minRating !== undefined && minRating !== null) {
    conditions.push(`review_summary.avg_rating >= ?`)
    params.push(minRating)
  }
  if (maxRating !== undefined && maxRating !== null) {
    conditions.push(`review_summary.avg_rating <= ?`)
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

  if (onSaleOnly) {
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
    ORDER BY products.product_id
    LIMIT ${limit} OFFSET ${offset};
  `

  try {
    // DEBUG
    // console.log('==== SQL ====')
    console.log(sql)
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
    }
  } catch (error) {
    console.error('SQL Run Time Error:', error)
    throw error
  }
}
