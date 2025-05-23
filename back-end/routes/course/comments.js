import express from 'express'
const router = express.Router()
import db from '../../config/mysql.js'
import verifyToken from '../../lib/verify-token.js' // ✅ 中介：驗證 JWT token

/**
 * 📌 GET：取得特定課程的所有留言
 * 支援根據 sort 參數排序（1=按讚數, 2=星數高→低, 3=星數低→高, 4=新→舊, 5=舊→新）
 * GET:http://localhost:3005/api/course/comments?course_id=2&sort=2
 */

router.get('/', async (req, res) => {
  const { course_id, sort = '1' } = req.query

  // 👉 如果未帶入 course_id，回傳錯誤
  if (!course_id) {
    return res.status(400).json({ status: 'false', message: '缺少課程 ID' })
  }

  // 👉 根據傳入的 sort 決定 ORDER BY 條件
  let orderByClause = 'cc.is_helpful DESC' // 預設：按讚數高的排前面

  switch (sort) {
    case '2':
      orderByClause = 'cc.star DESC' // 星等高的優先
      break
    case '3':
      orderByClause = 'cc.star ASC' // 星等低的優先
      break
    case '4':
      orderByClause = 'cc.created DESC' // 最新的優先
      break
    case '5':
      orderByClause = 'cc.created ASC' // 最舊的優先
      break
    default:
      orderByClause = 'cc.is_helpful DESC' // 預設值
  }

  try {
    // 👉 查詢符合條件的留言，並連接使用者資料
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

    // 👉 成功回傳資料
    res.json({ status: 'success', data: comments })
  } catch (err) {
    console.error('留言撈取錯誤:', err)
    res.status(500).json({ status: 'false', message: '留言撈取失敗' })
  }
})

/**
 * 📌 POST：新增一則課程留言
 * 須包含 course_id, star, content, member_id
 */
router.post('/', async (req, res) => {
  const { course_id, star, content, member_id } = req.body

  // 👉 檢查必要欄位是否齊全
  if (!course_id || !star || !content || !member_id) {
    return res.status(400).json({ status: 'false', message: '缺少必要欄位' })
  }

  try {
    // 👉 將留言資料寫入資料庫
    const [insertResult] = await db.query(
      `
      INSERT INTO courses_comments (courses_id, member_id, star, content, created)
      VALUES (?, ?, ?, ?, NOW())
    `,
      [course_id, member_id, star, content]
    )

    const comment_id = insertResult.insertId // 取得新留言的 ID

    // 👉 立即撈出該留言資料（含使用者資訊）回傳給前端
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
    res.status(500).json({ status: 'false', message: '新增留言失敗: ' + err })
  }
})

/**
 * 📌 PATCH：更新留言的按讚數（is_helpful 欄位）
 * 前端會傳入 comment_id 與 is_add（true=+1, false=-1）
 */
router.patch('/', async (req, res) => {
  const { comment_id, is_add } = req.body

  // 👉 檢查參數是否正確
  if (!comment_id || typeof is_add === 'undefined') {
    return res.status(400).json({ status: 'false', message: '缺少參數' })
  }

  try {
    // 👉 根據 is_add 的布林值決定加或減
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

// DELETE
router.delete('/:id', verifyToken, async (req, res) => {
  const commentId = req.params.id
  const userId = req.user.id

  const [[comment]] = await db.query(
    'SELECT member_id FROM courses_comments WHERE id = ?',
    [commentId]
  )

  if (!comment || comment.member_id !== userId) {
    return res
      .status(403)
      .json({ status: 'fail', message: '只能刪除自己的留言' })
  }

  await db.query('DELETE FROM courses_comments WHERE id = ?', [commentId])
  res.json({ status: 'success' })
})

// 👉 將 router 匯出給主應用使用
export default router
