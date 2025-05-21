import express from 'express'
const router = express.Router()
import db from '../../config/mysql.js'
import verifyToken from '../../lib/verify-token.js'

// GET：取得課程評論（支援排序）
router.get('/', async (req, res) => {
  const { course_id, sort = '1' } = req.query

  if (!course_id) {
    return res.status(400).json({ status: 'false', message: '缺少課程 ID' })
  }

  let orderByClause = 'cc.is_helpful DESC'

  switch (sort) {
    case '2':
      orderByClause = 'cc.star DESC'
      break
    case '3':
      orderByClause = 'cc.star ASC'
      break
    case '4':
      orderByClause = 'cc.created DESC'
      break
    case '5':
      orderByClause = 'cc.created ASC'
      break
    default:
      orderByClause = 'cc.is_helpful DESC'
  }

  try {
    const [comments] = await db.query(
      `
      SELECT
        cc.id AS comment_id,
        cc.member_id,
        u.name AS member_name,
        u.ava_url,
        cc.star,
        cc.created,
        cc.content,
        cc.picture,
        cc.is_helpful
      FROM courses_comments cc
      LEFT JOIN users u ON cc.member_id = u.id
      WHERE cc.courses_id = ?
      ORDER BY ${orderByClause}
    `,
      [course_id]
    )

    res.json({ status: 'success', data: comments })
  } catch (err) {
    console.error('留言撈取錯誤:', err)
    res.status(500).json({ status: 'false', message: '留言撈取失敗' })
  }
})

//POST:新增評論
router.post('/', async (req, res) => {
  const { course_id, star, content, member_id } = req.body

  // 基本欄位檢查
  if (!course_id || !star || !content || !member_id) {
    return res.status(400).json({ status: 'false', message: '缺少必要欄位' })
  }

  try {
    // 新增評論
    const [insertResult] = await db.query(
      `
      INSERT INTO courses_comments (courses_id, member_id, star, content, created)
      VALUES (?, ?, ?, ?, NOW())
    `,
      [course_id, member_id, star, content]
    )

    const comment_id = insertResult.insertId

    // 撈出新增成功的資料
    const [newComment] = await db.query(
      `
      SELECT
        cc.id AS comment_id,
        u.name AS member_name,
        u.ava_url,
        cc.star,
        cc.created,
        cc.content,
        cc.is_helpful
      FROM courses_comments cc
      LEFT JOIN users u ON cc.member_id = u.id
      WHERE cc.id = ?
    `,
      [comment_id]
    )

    res.json({ status: 'success', data: newComment[0] })
  } catch (err) {
    console.error('新增留言錯誤:', err)
    res.status(500).json({ status: 'false', message: '新增留言失敗: '+ err})
  }
})

// PATCH：更新某留言的 is_helpful
router.patch('/', async (req, res) => {
  const { comment_id, is_add } = req.body

  if (!comment_id || typeof is_add === 'undefined') {
    return res.status(400).json({ status: 'false', message: '缺少參數' })
  }

  try {
    const [result] = await db.query(
      `
      UPDATE courses_comments
      SET is_helpful = is_helpful ${is_add ? '+ 1' : '- 1'}
      WHERE id = ?
    `,
      [comment_id]
    )

    res.json({ status: 'success', message: '已更新 is_helpful' })
  } catch (err) {
    console.error('更新按讚失敗:', err)
    res.status(500).json({ status: 'false', message: '資料庫錯誤' })
  }
})

export default router
