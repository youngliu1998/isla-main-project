import express from 'express'
const router = express.Router()
// import verifyToken from '../../lib/verify-token.js'
import { getFilteredProducts } from '../services/product-controller.js'

router.get('/', async (req, res) => {
  console.log('Front Send Query :', req.query)

  try {
    const {
      keyword,
      brandIds,
      categoryIds,
      tagIds,
      minPrice,
      maxPrice,
      minRating,
      maxRating,
      onSaleOnly,
      offset = 0,
      limit = 20,
      sortBy,
      sortOrder,
      Colorful,
      colors,
    } = req.query

    function parseIdArray(param) {
      if (!param) return []
      if (Array.isArray(param))
        return param.map(Number).filter((n) => !isNaN(n))
      return param
        .split(',')
        .map(Number)
        .filter((n) => !isNaN(n))
    }

    const filters = {
      sortBy: sortBy || 'products.product_id',
      sortOrder: sortOrder || 'DESC',
      onSaleOnly: String(onSaleOnly).toLowerCase() === 'true',
      colors: parseIdArray(colors),
      Colorful: String(Colorful).toLowerCase() === 'true',
      keyword: keyword || '',
      brandIds: parseIdArray(brandIds),
      categoryIds: parseIdArray(categoryIds),
      tagIds: parseIdArray(tagIds),
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
