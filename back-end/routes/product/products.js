import express from 'express'
const router = express.Router()

// import verifyToken from '../../lib/verify-token.js'
import { getFilteredProducts } from '../../services/product-controller.js'

// 支援分頁與多條件篩選
router.get('/', async (req, res) => {
  try {
    const {
      brandIds,
      categoryIds,
      tagIds,
      minPrice,
      maxPrice,
      minRating,
      maxRating,
      offset = 0,
      limit = 20,
    } = req.query

    const filters = {
      brandIds: brandIds
        ? brandIds
            .split(',')
            .map(Number)
            .filter((n) => !isNaN(n))
        : [],
      categoryIds: categoryIds
        ? categoryIds
            .split(',')
            .map(Number)
            .filter((n) => !isNaN(n))
        : [],
      tagIds: tagIds
        ? tagIds
            .split(',')
            .map(Number)
            .filter((n) => !isNaN(n))
        : [],
      minPrice:
        minPrice !== undefined && minPrice !== '' ? parseFloat(minPrice) : null,
      maxPrice:
        maxPrice !== undefined && maxPrice !== '' ? parseFloat(maxPrice) : null,
      minRating:
        minRating !== undefined && minRating !== ''
          ? parseFloat(minRating)
          : null,
      maxRating:
        maxRating !== undefined && maxRating !== ''
          ? parseFloat(maxRating)
          : null,
      offset: Number.isInteger(parseInt(offset)) ? parseInt(offset) : 0,
      limit: Number.isInteger(parseInt(limit)) ? parseInt(limit) : 20,
    }

    const result = await getFilteredProducts(filters)

    res.json({ status: 'success', data: result })
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message })
  }
})

export default router
