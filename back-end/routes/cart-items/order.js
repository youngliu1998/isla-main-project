import express from 'express'
import db from '../../config/mysql.js'
import verifyToken from '../../lib/verify-token.js'

const router = express.Router()
// POST /api/cart-items/order
router.post('/', verifyToken, async (req, res) => {
  try {
    // 前端回傳資料格式
    const {
      user_id,
      items, // [{ product_id, course_id, quantity, unit_price }]
      total_price,
      discount_total,
      status = 'pending',
      payment_method = null,
      shipping_method = null,
      shipping_address = null,
      shipping_store_code = null,
    } = req.body

    // 2. 建立訂單主表 order
    const [orderResult] = await db.execute(
      `INSERT INTO orders (user_id, total_price, discount_total, status, payment_method, shipping_method, shipping_address, shipping_store_code) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user_id,
        total_price,
        discount_total,
        status,
        payment_method,
        shipping_method,
        shipping_address,
        shipping_store_code,
      ]
    )
    const order_id = orderResult.insertId

    // 3. 建立訂單明細 order_items
    for (let item of items) {
      await db.execute(
        `INSERT INTO order_items (order_id, product_id, course_id, quantity, unit_price)
        VALUES (?, ?, ?, ?, ?)`,
        [
          order_id,
          item.product_id ?? null,
          item.course_id ?? null,
          item.quantity,
          item.unit_price,
        ]
      )
    }

    res.json({ status: 'success', order_id })
  } catch (error) {
    console.error('建立訂單失敗:', error)
    res
      .status(500)
      .json({ status: 'fail', message: '建立訂單失敗', error: error.message })
  }
})

export default router
