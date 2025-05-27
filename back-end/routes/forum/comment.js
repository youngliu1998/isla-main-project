import express from 'express'
import multer from 'multer'
import db from '../../config/mysql.js' // 使用mysql
import path from 'path'

const router = express.Router()

// 取得第一層留言
router.get('/', async function (req, res) {
  const postID = req.query.postID
  const [data] = await db.query(
    `SELECT c.*,
    u.nickname AS nick,
    u.ava_url AS user_img,
    IFNULL (cliked.user_ids, '') AS user_liked_ids
    FROM comment AS c
    JOIN users AS u ON c.user_id = u.id
    LEFT JOIN (
        SELECT comment_id,
        GROUP_CONCAT(user_id) AS user_ids
        FROM comment_user_liked
        GROUP BY comment_id
    ) cliked ON c.id = cliked.comment_id
    WHERE c.post_id = ? AND c.valid = 1
    ORDER BY c.updated_at ASC
    `,
    [postID]
  )
  //   const [liked] = await db.query(`
  //     SELECT comment_id,
  //     GROUP_CONCAT(user_id) AS user_ids
  //     FROM comment_user_liked
  //     GROUP BY comment_id`)

  return res.json({ status: 'success', data: data })
})

// 展開子留言
router.get('/sub-comment', async function (req, res) {})

export default router
