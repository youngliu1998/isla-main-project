import express from 'express'
import db from '../../config/mysql.js'
// import verifyToken from '../../lib/verify-token.js'
const router = express.Router()

// GET http://localhost:3005/api/order/order-number/ORD12345678
router.get('/:orderNumber', async (req, res) => {
  console.log('✅ 進入 /api/order/:orderNumber 路由')
  const { orderNumber } = req.params
  console.log('🔍 收到的 orderNumber:', orderNumber)

  try {
    // 1. 查訂單基本資料
    const [orders] = await db.execute(
      `SELECT id, user_id, order_number, status, payment_method, 
      shipping_address, shipping_method,
      pickup_store_name, pickup_store_address,
      created_at 
      FROM orders 
      WHERE order_number = ?`,
      [orderNumber]
    )

    if (orders.length === 0) {
      return res.status(404).json({ success: false, message: '找不到訂單' })
    }

    const order = orders[0]
    console.log('📦 查到的訂單資料:', order)

    // 2. 查 order_items
    const [items] = await db.execute(
      `SELECT product_id, course_id, course_experience_id, quantity, price, item_type 
      FROM order_items 
      WHERE order_id = ?`,
      [order.id]
    )
    console.log('🛒 訂單項目:', items)

    // 3. 查對應的會員資料
    const [[user]] = await db.execute(
      `SELECT name, tel, address FROM users WHERE id = ?`,
      [order.user_id]
    )
    console.log('🙋‍♀️ 會員資料:', user)

    // 4. 組合商品資訊（根據 item_type 抓 name）
    const products = []

    for (const item of items) {
      let name = '未知商品'

      if (item.item_type === 'product' && item.product_id) {
        const [[prod]] = await db.execute(
          'SELECT name FROM products WHERE product_id = ?',
          [item.product_id]
        )
        name = prod?.name || name
      } else if (item.item_type === 'course' && item.course_id) {
        const [[course]] = await db.execute(
          'SELECT title FROM courses WHERE id = ?',
          [item.course_id]
        )
        name = course?.title || name
      } else if (item.item_type === 'experience' && item.course_experience_id) {
        const [[exp]] = await db.execute(
          'SELECT title FROM courses_experience WHERE id = ?',
          [item.course_experience_id]
        )
        name = exp?.title || name
      }

      products.push({
        name,
        quantity: item.quantity,
        price: item.price,
      })
    }

    // 5. 收件人資訊，優先用訂單表裡的欄位，再 fallback 用會員資料
    const recipient = {
      name: order.recipient_name || user?.name || '未提供',
      phone: order.recipient_phone || user?.tel || '未提供',
      address:
        order.recipient_address ||
        order.shipping_address ||
        user?.address ||
        '未提供',
    }

    res.json({
      orderId: order.order_number,
      orderDate: order.created_at,
      orderStatus: order.status,
      paymentMethod: order.payment_method,
      paymentStatus: order.status === 'completed' ? '已付款' : '未付款',
      recipient,
      shippingMethod: order.shipping_method,
      pickupStoreName: order.pickup_store_name,
      pickupStoreAddress: order.pickup_store_address,
      products,
    })
  } catch (err) {
    console.error('查詢訂單失敗', err)
    res.status(500).json({ success: false, message: '查詢訂單時發生錯誤' })
  }
})

export default router
