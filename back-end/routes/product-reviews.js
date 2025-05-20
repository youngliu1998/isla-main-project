import express from 'express'
import { getProductReviews } from '../services/product-controller.js'

const router = express.Router()

router.get('/:id', async (req, res) => {
  try {
    const productId = parseInt(req.params.id)
    if (isNaN(productId)) return res.status(400).json({ error: 'ID格式錯誤' })

    const [reviews] = await Promise.all([getProductReviews(productId)])

    res.status(200).json({
      success: true,
      data: Object.values(reviews), // 將 Object 轉為 Array
    })
  } catch (error) {
    res.status(404).json({ success: false, message: error.message })
  }
})

export default router
