import express from 'express'
import multer from 'multer'
import db from '../../config/mysql.js' // 使用mysql
import path from 'path'

const router = express.Router()

// 取得第一層留言
router.get('/', async function (req, res) {
  //   const { followID, userID } = req.body
  const userID = req.query.userID
  const followID = req.query.followID

  const [result] = await db.query(
    `SELECT * FROM user_follow
    WHERE user_id = ? AND follow_id = ?
    `,
    [userID, followID]
  )
  return res.json({ status: 'success', data: result.length > 0 })
})

router.post('/get-follow-list', async function (req, res) {
  const { userID, pageName } = req.body
  let limitClause = ''
  if (pageName === 'subNav') {
    limitClause = 'LIMIT 4'
  }
  // console.log('hi', userID)

  const [result] = await db.query(
    `SELECT follow.*,
    u.ava_url AS userImg,
    u.nickname AS userNick
    FROM user_follow AS follow
    JOIN users AS u ON follow.follow_id = u.id
    WHERE user_id = ? ${limitClause}`,
    [userID]
  )
  return res.json({ status: 'success', data: result })
})

router.post('/', async function (req, res) {
  const { followID, userID } = req.body

  const [result] = await db.query(
    `INSERT INTO user_follow (user_id, follow_id) VALUES (?, ?)`,
    [userID, followID]
  )

  if (result.affectedRows === 0) {
    return res.json({
      status: 'success',
      data: 'POST',
      message: '已成功追蹤此帳號',
    })
  }

  return res.json({ status: 'success', data: null })
})

router.delete('/', async function (req, res) {
  const { followID, userID } = req.body

  const [result] = await db.query(
    `DELETE FROM user_follow WHERE user_id = ? AND follow_id = ?`,
    [userID, followID]
  )

  if (result.affectedRows === 0) {
    return res.json({
      status: 'success',
      data: 'DELETE',
      message: '已取消追蹤此帳號',
    })
  }

  return res.json({ status: 'success', data: null })
})

export default router
