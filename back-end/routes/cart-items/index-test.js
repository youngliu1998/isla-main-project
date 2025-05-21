import express from 'express'
import db from '../../config/mysql.js'
import verifyToken from '../../lib/verify-token.js'

const router = express.Router()

// http://localhost:3005/api/cart-items
router.get('/', verifyToken, async (req, res) => {
  // const user_id = req.query.user_id 不使用token
  const user_id = req.user.id
  console.log('req.user:', req.user)

  if (!user_id) {
    return res.status(400).json({ status: 'fail', message: '請提供 user_id' })
  }

  try {
    const [cartItems] = await db.execute(
      `SELECT * FROM cart_items WHERE user_id = ?`,
      [user_id]
    )

    //檢查是否為空陣列
    if (cartItems.length === 0) {
      return res.json({
        status: 'success',
        message: '購物車是空的',
        data: { cartItems: [] },
      })
    }

    // 分類 ID
    const productIds = cartItems
      .filter((i) => i.product_id)
      .map((i) => i.product_id)
    const courseIds = cartItems
      .filter((i) => i.course_id)
      .map((i) => i.course_id)
    const expIds = cartItems
      .filter((i) => i.course_experience_id)
      .map((i) => i.course_experience_id)

    // 撈商品
    const [products] = await db.execute(
      `
      SELECT p.product_id, p.name, p.base_price, p.sale_price, p.category_id, cat.name AS category_name,
      pi.image_url
      FROM products p
      LEFT JOIN categories cat ON p.category_id = cat.category_id
      LEFT JOIN product_images pi ON pi.product_id = p.product_id AND pi.is_primary = 1
      WHERE p.product_id IN (?)
      `,
      [productIds]
    )
    console.log('productIds:', productIds)

    const [colorRows] = await db.execute(
      `
      SELECT pcs.product_id, pcs.color_id, c.color_name, c.color_code
      FROM product_color_stocks pcs
      JOIN colors c ON pcs.color_id = c.color_id
      WHERE pcs.product_id IN (?)
      `,
      [productIds]
    )

    const colorOptionsMap = {}
    colorRows.forEach((row) => {
      if (!colorOptionsMap[row.product_id]) colorOptionsMap[row.product_id] = []
      colorOptionsMap[row.product_id].push({
        id: row.color_id,
        name: row.color_name,
        code: row.color_code,
      })
    })

    // 撈課程
    const [courses] = await db.execute(
      `
      SELECT c.id, c.title, c.price, c.discount, c.picture, cat.name AS category_name
      FROM courses c
      LEFT JOIN courses_categories cat ON c.categories_id = cat.id
      WHERE c.id IN (?)
      `,
      [courseIds]
    )

    // 撈體驗課程
    const [experiences] = await db.execute(
      `
      SELECT e.id, e.title, e.price, e.discount, cat.name AS category_name, e.images
      FROM courses_experience e
      LEFT JOIN courses_categories cat ON e.categories_id = cat.id
      WHERE e.id IN (?)
      `,
      [expIds]
    )

    // 組回傳給前端的資料格式
    const formattedItems = cartItems
      .map((item) => {
        if (item.product_id) {
          const prod = products.find((p) => p.product_id === item.product_id)
          return {
            id: item.id,
            item_type: 'product',
            product_id: prod?.product_id,
            name: prod?.name,
            base_price: prod?.base_price,
            sale_price: prod?.sale_price,
            category: prod?.category_name,
            quantity: item.quantity,
            image_url: `https://isla-image.chris142852145.workers.dev/${prod?.image_url}`,
            color: item.color_name
              ? { name: item.color_name, code: item.color_code }
              : null,
            color_options: colorOptionsMap[prod?.product_id] || [],
          }
        }

        if (item.course_id) {
          const course = courses.find((c) => c.id === item.course_id)
          return {
            id: item.id,
            item_type: 'course',
            course_id: course?.id,
            name: course?.title,
            base_price: course?.price,
            sale_price: course?.discount,
            category: course?.category_name,
            quantity: item.quantity,
            image_url: `images/bannerall/${course?.picture}`,
          }
        }

        if (item.course_experience_id) {
          const e = experiences.find((e) => e.id === item.course_experience_id)
          return {
            id: item.id,
            item_type: 'experience',
            course_experience_id: e?.id,
            name: e?.title,
            base_price: e?.price,
            sale_price: e?.discount,
            category: e?.category_name,
            quantity: item.quantity,
            image_url: e?.images
              ? `/images/course/bannerall/${e.images}`
              : null,
          }
        }

        return null
      })
      .filter(Boolean)

    //
    res.json({
      status: 'success',
      message: '成功取得購物車商品資料',
      data: { cartItems: formattedItems },
    })
  } catch (err) {
    console.error('購物車資料錯誤:', err.message)
    res.status(500).json({
      status: 'fail',
      message: '資料庫錯誤',
    })
  }
})

export default router
