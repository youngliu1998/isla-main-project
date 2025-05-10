import express from 'express'
const router = express.Router()
// 使用mysql
import db from '../../config/mysql.js'
import { number } from 'zod'

// 得到多筆文章
router.get('/', async function (req, res) {
  // posts是陣列含多個物件
  const [postsRaw] = await db.query(
    // ⚠️🐰用了別名就要貫徹始終
    // 目前做法是搜集成按讚過的使用者ID陣列，再去計算數量。還是單獨sql WHERE user_id = 登入者_id就好？
    `SELECT p.*, 
    pc.name AS post_cate_name
    FROM post p
    JOIN post_category pc ON p.post_cate_id = pc.id`
  )
  const [likedRaw] = await db.query(
    `SELECT liked.post_id,
    GROUP_CONCAT(liked.user_id) AS liked_user_id
    FROM post_user_liked liked
    GROUP BY liked.post_id`
  )
  const [savedRaw] = await db.query(
    `SELECT saved.post_id,
    GROUP_CONCAT(saved.user_id) AS saved_user_id
    FROM post_user_saved saved
    GROUP BY saved.post_id`
  )

  const extendedPosts = postsRaw.map((post) => {
    const likedUserIDs =
      likedRaw
        .find((el) => el.post_id == post.id)
        ?.liked_user_id.split(',')
        .map((el) => Number(el)) ?? []

    const savedUserIDs =
      savedRaw
        .find((el) => el.post_id === post.id)
        ?.saved_user_id.split(',')
        .map((el) => Number(el)) ?? []
    // NOTE '大卡點！！！要用?防止undefined！！！'

    return {
      ...post,
      liked_user_ids: likedUserIDs,
      saved_user_ids: savedUserIDs,
    }
  })

  return res.json({
    status: 'success',
    data: extendedPosts,
  })
})

// 得到多筆文章 - 篩選
router.get('/:queryParam', async function (req, res) {
  const queryParam = req.params.queryParam
  queryParam.split('&')
  const [posts] = await db.query(`SELECT * FROM post`)
  return res.json({ status: 'success', data: { posts } })
})

// 得到單筆文章
router.get('/:postID', async function (req, res) {
  // 從動態網址中得到id（需要轉換為數字，因在資料表的id是自動遞增的數字）
  const id = Number(req.params.postID)
  // 執行sql，取得一個陣列[]，內含多筆符合的資料物件{}
  const [posts] = await db.query(`SELECT * FROM post WHERE id = ${id}`)
  const post = posts[0]
  res.json({ status: 'success', data: { post } })
})

// 新增一筆文章 - 網址：POST /api/forum/posts
router.post('/', async function (req, res) {
  const { title, content, userID, cateID, postCateID } = req.body
  const [result] = await db.query(
    `INSERT INTO post(title,content,updated_at, user_id, cate_id, post_cate_id) VALUES('${title}','${content}', NOW(),'${userID}', '${cateID}', '${postCateID}')`
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
      `UPDATE post SET title='${title}', content='${content}', updated_at='NOW()', user_id='${userID}', cate_id='${cateID}', post_cate_id='${postCateID}' WHERE id=${id}`
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
