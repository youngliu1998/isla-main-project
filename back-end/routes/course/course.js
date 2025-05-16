import express from 'express'
const router = express.Router()
import db from '../../config/mysql.js'

//course + courses_comments
router.get('/', async (req, res) => {
  try {
    const [course] = await db.query(`
      SELECT
        c.*,
        COALESCE(AVG(cc.star), 0) AS avg_star,
        COUNT(cc.id) AS comment_count
      FROM
        courses c
      LEFT JOIN
        courses_comments cc ON c.id = cc.courses_id
      GROUP BY
        c.id
      LIMIT 35
    `)

    res.json({ status: 'success', data: course })
  } catch (err) {
    console.error('撈取課程錯誤:', err)
    res.status(500).json({ status: 'false', message: '連接資料庫錯誤' })
  }
})

// /api/course/experience
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM courses_experience')
    res.json({ status: 'success', data: rows })
  } catch (err) {
    console.error('撈取體驗課程失敗:', err)
    res.status(500).json({ status: 'false', message: '資料庫錯誤' })
  }
})

export default router
