import express from 'express'
const router = express.Router()

router.get('/', function (req, res) {
  res
    .status(200)
    .json({ status: 'success', message: 'Express(path: /api/cart/test)' })
})

export default router
