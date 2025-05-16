import express from 'express'
const router = express.Router()
import db from '../../config/mysql.js'

// /api/course/experience
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM courses_experience ')
    res.json({ status: 'success', data: rows })
  } catch (err) {
    console.error('撈取體驗課程失敗:', err)
    res.status(500).json({ status: 'false', message: '資料庫錯誤' })
  }
})

export default router
