import express from 'express'
const router = express.Router()
import db from '../../config/mysql.js'

// PATCH /api/cart-items/update/:id
router.patch('/:id', async (req, res) => {
  const cartItemId = req.params.id
  const { quantity } = req.body

  if (typeof quantity !== 'number' || quantity < 1) {
    return res.status(400).json({ status: 'fail', message: '數量必須為正整數' })
  }

  try {
    const [result] = await db.execute(
      `UPDATE cart_items SET quantity = ? WHERE id = ?`,
      [quantity, cartItemId]
    )

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ status: 'fail', message: '找不到該購物車商品' })
    }
    console.log(`cart-items_id：${cartItemId} 購物車商品數量已更新`)
    res.json({ status: 'success', message: '購物車商品數量已更新' })
  } catch (err) {
    console.error('更新錯誤:', err)
    res.status(500).json({ status: 'error', message: '資料庫錯誤' })
  }
})

export default router
