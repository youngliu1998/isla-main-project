import express from 'express'
import multer from 'multer'
import db from '../../config/mysql.js' // 使用mysql

const router = express.Router()
const upload = multer()

// 得到多筆文章
// 後端送出的post_user_liked, post_user_saved 為字串
router.get('/:pageName', async function (req, res) {
  // 取得userID
  const userID = 1
  const postsQuery = `SELECT 
        p.*,
        pc.id AS cate_id,
        pc.name AS cate_name,
        u.nickname AS user_nick,
        IFNULL (liked.user_ids, '') AS liked_user_ids,
        IFNULL( liked.likes, 0) AS likes,
        IFNULL (saved.user_ids, '') AS saved_user_ids
    FROM post p
    JOIN post_category pc ON p.cate_id = pc.id
    JOIN users u ON p.user_id = u.id
    LEFT JOIN (
        SELECT post_id,
        GROUP_CONCAT(user_id) AS user_ids,
        COUNT(user_id) AS likes
        FROM post_user_liked
        GROUP BY post_id
    ) liked ON p.id = liked.post_id
    LEFT JOIN (
        SELECT post_id,
        GROUP_CONCAT(user_id) AS user_ids
        FROM post_user_saved
        GROUP BY post_id
    ) saved ON p.id = saved.post_id`

  const pageName = req.params.pageName
  let postsResult
  let morePostsResult

  if (!userID) return res.json({ status: 'success', data: '未登入成功' })

  switch (pageName) {
    case 'post-detail': {
      const postID = req.query.postID
      postsResult = await db.query(`${postsQuery} WHERE p.id=${postID}`)
      morePostsResult = await db.query(`${postsQuery} WHERE p.cate_id = 
        (SELECT cate_id FROM post WHERE id = ${postID}) AND p.id != ${postID} LIMIT 4`)
      if (morePostsResult) {
        return res.json({
          status: 'success',
          data: { posts: postsResult[0], morePosts: morePostsResult[0] },
        })
      }
      break
    }
    case 'home': {
      const tab = req.query.tab
      const keyword = req.query.keyword
      const productCate = req.query.productCate?.split(',')
      const postCate = req.query.postCate?.split(',')
      // console.log({ keyword, productCate, postCate })

      // WHERE p.title LIKE ? OR p.content LIKE ? AND p.cate_id = ? AND p.product_cate_id = ?
      // 冷靜的找到篩選問題是括號，我好棒！
      if (tab) {
        const tabValue = tab !== '1' ? 'p.updated_at' : 'likes'
        // console.log(tab, tabValue)
        postsResult = await db.query(`${postsQuery} ORDER BY ${tabValue} DESC`)
        if (keyword || productCate || postCate) {
          const keywordClause = keyword
            ? `(p.title LIKE ? OR p.content LIKE ?)`
            : ''
          const keywordValue = keyword ? `%${keyword}%` : ''
          const productClause = productCate
            ? `p.product_cate_id IN (${productCate.map((c) => '?').join(',')})`
            : ''
          const productValue = productCate ?? []
          const postClause = postCate
            ? `p.cate_id IN (${postCate.map((c) => '?').join(',')})`
            : ''
          const postValue = postCate ?? []

          const totalClause = [keywordClause, productClause, postClause]
            .filter((c) => c.length > 0)
            .join(' AND ')
          const totalValue = [
            keywordValue,
            keywordValue,
            ...productValue,
            ...postValue,
          ].filter((v) => v)
          postsResult = await db.query(
            `${postsQuery} WHERE ${totalClause} ORDER BY ${tabValue} DESC`,
            totalValue
          )
        }
      } else {
        postsResult = await db.query(`${postsQuery} ORDER BY likes DESC`)
      }

      break
    }
    case 'profile': {
      // req網址 http://localhost:3000/forum/profile
      const authorID = req.query.authorID
      postsResult = await db.query(
        `${postsQuery} WHERE p.user_id = ${authorID}`
      )
      break
    }
    case 'my-post': {
      postsResult = await db.query(
        `${postsQuery} WHERE p.user_id = ${userID} ORDER BY p.updated_at DESC`
      )
      break
    }
    case 'my-following': {
      // postsResult = await db.query(`${}`)
      break
    }
    case 'saved-post': {
      postsResult = await db.query(`${postsQuery} ORDER BY p.updated_at DESC`)
      // console.log(postsResult[0])
      postsResult[0] = postsResult[0].filter((p) =>
        p.saved_user_ids.split(',').map(Number).includes(userID)
      )
      break
    }
  }

  // const [posts] = postsResult
  return res.json({
    status: 'success',
    data: postsResult[0],
  })
})

// 得到多筆文章 - 篩選
router.get('/:queryParam', async function (req, res) {
  const queryParam = req.params.queryParam
  queryParam.split('&')
  const [posts] = await db.query(`SELECT * FROM post`)
  return res.json({ status: 'success', data: { posts } })
})

// 新增一筆文章 - 網址：POST /api/forum/posts
router.post('/', upload.none(), async function (req, res) {
  // const { title, content, userID, cateID, postCateID } = req.body
  // const [result] = await db.query(
  //   `INSERT INTO post(title,content,updated_at, user_id, cate_id, cate_id) VALUES('${title}','${content}', NOW(),'${userID}', '${cateID}', '${postCateID}')`
  // )
  const { title, content } = req.body
  const [result] = await db.query(
    'INSERT INTO post(title, content, user_id, cate_id, product_cate_id) VALUES (?,?,?,?,?)',
    [title, content, 1, 1, 1]
  )
  console.log(req.body)
  if (result.affectedRows === 0) throw new Error('沒有資料被更改(put)')
  return res.json({
    status: 'success',
    data: null,
  })
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
