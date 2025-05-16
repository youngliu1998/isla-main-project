import express, { json } from 'express'
const router = express.Router()
// 使用mysql
import db from '../../config/mysql.js'

// GET 得到單筆文章
router.get('/:postID', async function (req, res) {
  const postID = Number(req.params.postID)
  const [posts] = await db.query(
    `
    SELECT 
        p.*,
        pc.id AS cate_id,
        pc.name AS cate_name,
        u.nickname AS user_nick,
        IFNULL (liked.user_ids, '') AS liked_user_ids,
        IFNULL (saved.user_ids, '') AS saved_user_ids
    FROM post p
    JOIN post_category pc ON p.cate_id = pc.id
    JOIN users u ON p.user_id = u.id
    LEFT JOIN (
        SELECT post_id,
        GROUP_CONCAT(user_id) AS user_ids
        FROM post_user_liked
        GROUP BY post_id
    ) liked ON p.id = liked.post_id
    LEFT JOIN (
        SELECT post_id,
        GROUP_CONCAT(user_id) AS user_ids
        FROM post_user_saved
        GROUP BY post_id
    ) saved ON p.id = saved.post_id
    WHERE p.id = ?
    `,
    [postID]
  )
  const cateID = posts[0]?.cate_id
  const [morePosts] = await db.query(
    `
    SELECT p.*,
    pc.id AS cate_id,
    pc.name AS cate_name,
    u.nickname AS user_nick,
    IFNULL (liked.user_ids, '') AS liked_user_ids,
    IFNULL (saved.user_ids, '') AS saved_user_ids
    FROM post p
    JOIN post_category pc ON p.cate_id = pc.id
    JOIN users u ON p.user_id = u.id
    LEFT JOIN (
        SELECT post_id,
        GROUP_CONCAT(user_id) AS user_ids
        FROM post_user_liked
        GROUP BY post_id
    ) liked ON p.id = liked.post_id
    LEFT JOIN (
        SELECT post_id,
        GROUP_CONCAT(user_id) AS user_ids
        FROM post_user_saved
        GROUP BY post_id
    ) saved ON p.id = saved.post_id
    WHERE p.id!=? AND p.cate_id = ?
    LIMIT 4
    `,
    [postID, cateID]
  )
  return res.json({
    status: 'success',
    data: { posts, morePosts },
  })
})

// 新增一筆文章 - 網址：POST /api/forum/posts
router.post('/', async function (req, res) {
  const { title, content, userID, cateID, postCateID } = req.body
  const [result] = await db.query(
    `INSERT INTO post(title,content,updated_at, user_id, cate_id, cate_id) VALUES('${title}','${content}', NOW(),'${userID}', '${cateID}', '${postCateID}')`
  )
  return res.json({ status: 'success', data: null })
})

// 修改文章 網址：PUT /api/forum/posts/:id
router.put('/:postID', async function (req, res) {
  // 用try/catch捕獲了一個本來淹沒在終端機、看不出所以然的錯誤，覺得自己又更像工程師了
  try {
    const id = Number(req.params.postID)
    const { title, content, userID, cateID, postCateID } = req.body
    const [result] = await db.query(
      `UPDATE post SET title='${title}', content='${content}', updated_at='NOW()', user_id='${userID}', cate_id='${cateID}', cate_id='${postCateID}' WHERE id=${id}`
    )
    if (result.affectedRows === 0) throw new Error('沒有資料被更改(put)')
    // console.log(result)
    return res.json({ status: 'success', data: null })
  } catch (error) {
    console.log(error)
    return res.json({ status: 'error', message: error.message })
  }
})

// 刪除文章  網址:DELETE /api/forum/posts/:id
router.delete('/:postID', async function (req, res) {
  try {
    const id = Number(req.params.postID)
    // const [result] = await db.query(`DELETE FROM post WHERE id=${id}`)
    const [result] = await db.query(`UPDATE post SET valid=0 WHERE id=${id}`)
    if (result.affectedRows === 0) throw new Error('沒有資料被刪除')
  } catch (error) {
    return res.json({ status: 'error', message: error.message })
  }
  return res.json({ status: 'success', data: null })
})
export default router
