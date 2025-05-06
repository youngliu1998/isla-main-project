import express from 'express'
const router = express.Router()
import { getUsers } from '../services/user.js'
import { successResponse, errorResponse, isDev } from '../lib/utils.js'
import db from '../config/mysql.js'

/* GET home page. */
router.get('/', async (req, res) => {
  try {
    // 需要加上await等待取得資料
    const [users] = await db.query('SELECT * FROM `user` LIMIT 100')
    // successResponse(res, { users })
    res.json({ status: 'success', data: users })
  } catch (error) {
    errorResponse(res, error)
  }
})

export default router
