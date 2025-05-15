import express from 'express'
const router = express.Router()
// 使用mysql
import db from '../../config/mysql.js'

// router.get('/', async function (req, res) {
//   return res.json({})
// })
// 得到多筆文章
router.get('/:pageName', async function (req, res) {
  // 取得userID
  const userID = 1
  const postsQuery = `SELECT 
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
    ) saved ON p.id = saved.post_id`

  const pageName = req.params.pageName
  let postsResult
  let morePostsResult

  if (!userID) return res.json({ status: 'success', data: '未登入成功' })

  switch (pageName) {
    case 'post-detail': {
      const postID = req.query.postID
      morePostsResult = await db.query(`${postsQuery} WHERE p.cate_id = 
        (SELECT cate_id FROM post WHERE id = ${postID}) AND p.id != ${postID} LIMIT 4`)
      // fall through
    }
    case 'home': {
      postsResult = await db.query(`${postsQuery}`)
      if (morePostsResult) {
        return res.json({
          status: 'success',
          data: { posts: postsResult[0], morePosts: morePostsResult[0] },
          test: 'hello',
        })
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
      postsResult = await db.query(`${postsQuery} WHERE p.user_id = ${userID}`)
      break
    }
  }

  const [posts] = postsResult
  return res.json({
    status: 'success',
    data: postsResult[0],
    test: 'hello',
  })
  // referer歷史遺跡
  // // 取得WHERE參數、判斷路由
  // const referer = req.get('Referer')
  // const isHome = referer === 'http://localhost:3000/forum'
  // const isPost = referer.includes('http://localhost:3000/forum/post')
  // const isProfile = referer.includes('http://localhost:3000/forum/profile/')
  // const isMyPost = referer.includes(
  //   'http://localhost:3000/member/my-forum/my-post'
  // )

  // // whereClause
  // let whereClause = ''
  // if (isProfile) {
  //   const profileID = req.get('Referer').match(/\/profile\/(\d+)$/)[1]
  //   whereClause = profileID ? `WHERE p.user_id = ${profileID}` : '' //有必要嗎？
  // } else if (isMyPost) {
  //   whereClause = `WHERE p.user_id = ${userID}`
  // } else if (isPost) {
  //   // BUG 點擊至post再跳回上一頁時，上一頁論壇首頁只剩在where篩選後的單篇資料
  //   const postID = req.get(`Referer`).match(/\/forum\/post\/(\d+)$/)[1]
  //   whereClause = `WHERE p.id = ${postID}`
  // } else if (isHome) {
  //   whereClause = ''
  // }

  // posts是陣列含多個物件
})

// 得到多筆文章 - 篩選
router.get('/:queryParam', async function (req, res) {
  const queryParam = req.params.queryParam
  queryParam.split('&')
  const [posts] = await db.query(`SELECT * FROM post`)
  return res.json({ status: 'success', data: { posts } })
})

// 新增一筆文章 - 網址：POST /api/forum/posts
router.post('/', async function (req, res) {
  // const { title, content, userID, cateID, postCateID } = req.body
  // const [result] = await db.query(
  //   `INSERT INTO post(title,content,updated_at, user_id, cate_id, cate_id) VALUES('${title}','${content}', NOW(),'${userID}', '${cateID}', '${postCateID}')`
  // )
  console.log(req.body)
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
