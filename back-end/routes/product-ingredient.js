import express from 'express'
import { getProductIngredient } from '../services/product-controller.js'

const router = express.Router()

router.get('/:id', async (req, res) => {
  try {
    const productId = parseInt(req.params.id)
    if (isNaN(productId)) return res.status(400).json({ error: 'ID格式錯誤' })

    const [product, ingredient] = await Promise.all([
      getProductIngredient(productId),
    ])

    res.json({
      success: true,
      data: {
        ...product,
        ingredient,
      },
    })
  } catch (error) {
    res.status(404).json({ success: false, message: error.message })
  }
})

export default router
