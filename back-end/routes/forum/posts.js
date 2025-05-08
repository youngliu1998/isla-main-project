import express from 'express'
const router = express.Router()
// 使用mysql
import db from '../../config/mysql.js'

// 得到多筆文章
router.get('/', async function (req, res) {
  // 執行sql
  const [posts] = await db.query(
    // $sql = "SELECT products.*,
    // products_stocks.image AS image,
    // products_stocks.valid AS valid,
    // products_categories.name AS category,
    // products_subcategories.name AS subcategory
    // FROM products
    // LEFT JOIN products_stocks ON products.id = products_stocks.product_id
    // LEFT JOIN products_categories ON products.category_id = products_categories.id
    // LEFT JOIN products_subcategories ON products.subcategory_id = products_subcategories.id
    // WHERE products.valid = 1";

    // ⚠️🐰用了別名就要貫徹始終
    // 目前做法是搜集成按讚過的使用者ID陣列，再去計算數量。還是單獨sql WHERE user_id = 登入者_id就好？
    `SELECT p.*, 
    pc.name AS post_cate_name, 
    GROUP_CONCAT(liked.user_id) AS liked_user_ids,
    GROUP_CONCAT(saved.user_id) AS saved_user_ids 
    FROM post p 
    LEFT JOIN post_category pc ON p.post_cate_id = pc.id 
    LEFT JOIN post_user_liked liked ON p.id = liked.post_id 
    LEFT JOIN post_user_saved saved ON p.id = saved.post_id
    GROUP BY p.id`
  )
  return res.json({ status: 'success', data: { posts } })
})

// 得到多筆文章 - 篩選
router.get('/:queryParam', async function x(req, res) {
  const queryParam = req.params.queryParam
  queryParam.split('&')
  // 執行sql
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

  // 執行sql
  const [result] = await db.query(
    `INSERT INTO post(title,content,updated_at, user_id, cate_id, post_cate_id) VALUES('${title}','${content}', NOW(),'${userID}', '${cateID}', '${postCateID}',);`
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
