import express from 'express'
const router = express.Router()

let cartItems = []

// GET /api/cart  取得購物車所有商品
router.get('/', (req, res) => {
  res.json(cartItems)
})

// POST /api/cart  加入商品到購物車
router.post('/', (req, res) => {
  const item = req.body
  cartItems.push(item)
  res.status(200).json({ status: 'success', message: '成功加入購物車', item })
})

export default router
