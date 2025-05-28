import express from 'express'
import {
  getProductDetail,
  updateProduct,
  getProductById,
} from '../services/product-controller.js'
//驗證格式套件
import { body, validationResult } from 'express-validator'

const router = express.Router()

router.get('/:id', async (req, res) => {
  try {
    const productId = parseInt(req.params.id)
    if (isNaN(productId)) return res.status(400).json({ error: 'ID格式錯誤' })

    const [product, reviews] = await Promise.all([getProductDetail(productId)])

    res.json({
      success: true,
      data: {
        ...product,
        reviews,
      },
    })
  } catch (error) {
    res.status(404).json({ success: false, message: error.message })
  }
})

router.get('/edit/:id', async (req, res) => {
  try {
    const productId = parseInt(req.params.id)
    if (isNaN(productId)) return res.status(400).json({ error: 'ID格式錯誤' })

    const [product, ingredients] = await Promise.all([
      getProductById(productId),
    ])

    res.json({
      success: true,
      data: {
        ...product,
        ...ingredients,
      },
    })
  } catch (error) {
    res.status(404).json({ success: false, message: error.message })
  }
})

router.put(
  '/edit/:id',
  [
    //驗證格式
    body('name').notEmpty(),
    body('base_price').isFloat({ min: 0 }),
    body('status').isIn(['active', 'draft', 'archived']),
  ],
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    updateProduct(req, res, next)
  }
)

export default router
