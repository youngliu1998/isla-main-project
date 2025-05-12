import express from 'express'
const router = express.Router()
import db from '../../config/mysql.js'

// 按讚
router.post('/:action', async function (req, res) {
  const action = req.params.action
  try {
    const { userID, postID } = req.body
    const [result] = await db.query(
      `INSERT INTO post_user_${action} (user_id, post_id) VALUES ('${userID}','${postID}')`
    )
    if (result.affectedRows === 0) throw new Error('無資料被更改')
    return res.json({ status: 'success', data: null })
  } catch (error) {
    console.log(error.message)
    return res.json({ status: 'error', message: error.message })
  }
})

// 取消按讚
router.delete('/:action', async function (req, res) {
  const action = req.params.action
  try {
    const { userID, postID } = req.body
    // NOTE 用 ?＋陣列參數避免 SQL injection，而不要把變數直接串字串
    const [result] = await db.query(
      `DELETE FROM post_user_${action} WHERE user_Id = ? AND post_id = ?`,
      [userID, postID]
    )
    if (result.affectedRows === 0) throw new Error('無資料被刪除')
    return res.json({ status: 'success', data: null })
  } catch (error) {
    return res.json({ status: 'error', message: error.message })
  }
})

export default router
