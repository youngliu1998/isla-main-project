import express from 'express'
import db from '../../config/mysql.js'
import verifyToken from '../../lib/verify-token.js'

// http://localhost:3005/api/cart-items?user_id=1
const router = express.Router()
// 取得購物車商品列表
router.get('/', verifyToken, async (req, res) => {
  // const user_id = req.query.user_id 不使用token
  const user_id = req.user.id
  console.log('req.user:', req.user)

  if (!user_id) {
    return res.status(400).json({ status: 'fail', message: '請提供 user_id' })
  }

  try {
    const [cartItems] = await db.query(
      `
        SELECT 
          ci.id AS cart_item_id,
          ci.product_id, 
          ci.quantity,
          p.name AS product_name,
          p.base_price AS price,
          pi.image_url,
          c.color_name,
          c.color_code
        FROM cart_items ci
        JOIN products p ON ci.product_id = p.product_id
        LEFT JOIN product_images pi 
          ON pi.product_id = p.product_id AND pi.is_primary = 1
        LEFT JOIN colors c 
          ON c.color_id = ci.color_id
        WHERE ci.user_id = ?
          AND ci.product_id IS NOT NULL
      `,
      [user_id]
    )

    // #step01 先抓購物車裡有哪些product_id
    const productIds = cartItems.map((item) => item.product_id)

    //檢查是否為空陣列
    if (productIds.length === 0) {
      return res.json({
        status: 'success',
        message: '購物車是空的',
        data: { cartItems: [] },
      })
    }

    // #step02 查每個商品的所有色號
    const [colorOptionsRows] = await db.query(
      `
        SELECT
          pcs.product_id,
          pcs.color_id,
          c.color_name,
          c.color_code
        FROM product_color_stocks pcs
        JOIN colors c ON pcs.color_id = c.color_id
        WHERE pcs.product_id IN (?)
      `,
      [productIds]
    )

    const colorOptions = {}

    colorOptionsRows.forEach((row) => {
      if (!colorOptions[row.product_id]) {
        colorOptions[row.product_id] = []
      }
      colorOptions[row.product_id].push({
        id: row.color_id,
        name: row.color_name,
        code: row.color_code,
      })
    })

    // 整理回傳給前端的格式
    const formatCurrency = (num) =>
      typeof num === 'number'
        ? new Intl.NumberFormat('zh-TW', {
            style: 'currency',
            currency: 'TWD',
            minimumFractionDigits: 0, // 若不要小數點，可加這行
          }).format(num)
        : null

    const formattedItems = cartItems.map((item) => {
      const price = item.price
      const salePrice = item.sale_price
      const finalPrice = salePrice ?? price

      return {
        id: item.cart_item_id,
        name: item.product_name,
        quantity: item.quantity,
        price,
        sale_price: salePrice,
        final_price: finalPrice,
        formatted_price: formatCurrency(price),
        formatted_sale_price: formatCurrency(salePrice),
        formatted_final_price: formatCurrency(finalPrice),
        image_url: `https://isla-image.chris142852145.workers.dev/${item.image_url}`,
        color: item.color_name
          ? {
              name: item.color_name,
              code: item.color_code,
            }
          : null,
        color_options: colorOptions[item.product_id] || [],
      }
    })

    res.json({
      status: 'success',
      message: '成功取得購物車商品資料',
      data: { cartItems: formattedItems },
    })
  } catch (err) {
    console.error('取得購物車資料錯誤:', err.message)
    res.status(500).json({
      status: 'fail',
      message: '資料庫錯誤',
    })
  }
})

export default router
