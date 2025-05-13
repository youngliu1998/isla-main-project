import express from 'express'
import db from '../../config/mysql.js'

const router = express.Router()

// 查詢所有優惠券
router.get('/', async (req, res) => {
  try {
    const [coupons] = await db.query('SELECT * FROM coupons')
    res.json({ status: 'success', data: { coupons } })
  } catch (err) {
    console.error('撈取優惠券錯誤:', err)
    res.status(500).json({ status: 'false', message: '資料庫錯誤' })
  }
})

// 領取優惠券
router.post('/claim', async (req, res) => {
  const { user_id, coupon_id } = req.body

  try {
    // 檢查是否已領取
    const [rows] = await db.query(
      'SELECT * FROM coupons_user WHERE user_id = ? AND coupon_id = ?',
      [user_id, coupon_id]
    )

    if (rows.length > 0) {
      // 已存在，更新狀態與時間
      await db.execute(
        'UPDATE coupons_user SET state = 1, claimed_at = NOW() WHERE user_id = ? AND coupon_id = ?',
        [user_id, coupon_id]
      )
    } else {
      // 尚未領取，新增記錄且設已領取狀態
      await db.execute(
        'INSERT INTO coupons_user (user_id, coupon_id, state, claimed_at) VALUES (?, ?, 1, NOW())',
        [user_id, coupon_id]
      )
    }

    res.json({ status: 'success', data: { user_id, coupon_id } })
  } catch (error) {
    console.error('領取優惠券錯誤:', error)
    res.status(500).json({ status: 'false', message: '寫入失敗' })
  }
})

export default router
