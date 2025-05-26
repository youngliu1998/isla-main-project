import express from 'express'
const router = express.Router()
import db from '../../config/mysql.js'

// Url: http://localhost:3005/api/course/teacher-list
router.get('/:id', async (req, res) => {
  const { id } = req.params
  console.log('id', id)
  try {
    const [teachers] = await db.query(`
      SELECT t.*, u.*
      FROM teachers t
      LEFT JOIN users u ON t.users_id = u.id
      
    `)
    res.json({ status: 'success', data: teachers })
  } catch (err) {
    console.error('撈取老師錯誤:', err)
    res.status(500).json({ status: 'false', message: '連接資料庫錯誤' })
  }
})

export default router
