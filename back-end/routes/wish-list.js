import express from 'express'
import db from '../config/mysql.js'
import verifyToken from '../lib/verify-token.js'

const router = express.Router()

router.get('/', verifyToken, async (req, res) => {
  const user_id = req.user.id

  if (!user_id) {
    return res.status(401).json({ message: '未授權使用者' })
  }

  try {
    const [wishlist] = await db.execute(
      `SELECT id, user_id, courses_id, courses_experience_id, product_id, created_at
       FROM wishlist
       WHERE user_id = ?`,
      [user_id]
    )

    res.json({
      message: '取得收藏清單成功',
      data: wishlist,
    })
  } catch (err) {
    console.error('取得收藏失敗:', err)
    res.status(500).json({ message: '伺服器錯誤' })
  }
})

router.post('/', verifyToken, async (req, res) => {
  const user_id = req.user.id
  const { courses_id, courses_experience_id, product_id } = req.body

  if (!user_id) {
    return res.status(401).json({ message: '未授權使用者' })
  }

  const fields = []
  const values = []

  if (courses_id) {
    fields.push('courses_id')
    values.push(courses_id)
  }

  if (courses_experience_id) {
    fields.push('courses_experience_id')
    values.push(courses_experience_id)
  }

  if (product_id) {
    fields.push('product_id')
    values.push(product_id)
  }

  if (fields.length !== 1) {
    return res.status(400).json({
      message:
        '只能傳入一種收藏類型（courses_id、courses_experience_id 或 product_id）',
    })
  }

  fields.push('user_id')
  values.push(user_id)

  fields.push('created_at')
  values.push(new Date()) // 這會被 mysql driver 自動轉成 datetime 格式

  try {
    const sql = `INSERT INTO wishlist (${fields.join(',')}) VALUES (${fields
      .map(() => '?')
      .join(',')})`
    await db.execute(sql, values)
    res.json({ message: '收藏成功' })
  } catch (err) {
    console.error('收藏失敗:', err)
    res.status(500).json({ message: '伺服器錯誤' })
  }
})

router.delete('/', verifyToken, async (req, res) => {
  const user_id = req.user.id
  const { courses_id, courses_experience_id, product_id } = req.body

  if (!user_id) {
    return res.status(401).json({ message: '未授權使用者' })
  }

  const conditions = []
  const values = []

  if (courses_id) {
    conditions.push('courses_id = ?')
    values.push(courses_id)
  }

  if (courses_experience_id) {
    conditions.push('courses_experience_id = ?')
    values.push(courses_experience_id)
  }

  if (product_id) {
    conditions.push('product_id = ?')
    values.push(product_id)
  }

  if (conditions.length !== 1) {
    return res.status(400).json({
      message:
        '請傳入一種收藏類型的ID (courses_id、courses_experience_id 或 product_id)',
    })
  }

  // 加上 user_id 條件，確保只能刪除自己的收藏
  values.push(user_id)
  const sql = `DELETE FROM wishlist WHERE ${conditions.join(
    ' AND '
  )} AND user_id = ?`

  try {
    const [result] = await db.execute(sql, values)
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: '找不到該收藏紀錄' })
    }
    res.json({ message: '刪除成功' })
  } catch (err) {
    console.error('刪除收藏失敗:', err)
    res.status(500).json({ message: '伺服器錯誤' })
  }
})

export default router
