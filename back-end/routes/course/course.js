import express from 'express'
const router = express.Router()
import db from '../../config/mysql.js'
import verifyToken from '../../lib/verify-token.js' // token verification

// 查詢所有課程與體驗課程
router.get('/22222', async (req, res) => {
  const user_id = req.query.user_id
  try {
    const [course] = await db.query(
      `
      select * from courses limit 12
     `
    )

    res.json({ status: 'success', data: course })
  } catch (err) {
    console.error('撈取優惠券錯誤:', err)
    res.status(500).json({ status: 'false', message: '連接資料庫錯誤' })
  }
})

export default router
