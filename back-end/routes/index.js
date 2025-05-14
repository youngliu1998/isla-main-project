import express from 'express'
import cartRoutes from './cart/index.js'
const router = express.Router()

/* GET home page. */
router.get('/', function (req, res) {
  res.status(200).json({ status: 'success', message: 'Express(path: /api)' })
})

router.use('/cart', cartRoutes)

export default router
