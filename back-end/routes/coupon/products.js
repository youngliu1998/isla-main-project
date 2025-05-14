import express from 'express'
import db from '../../config/mysql.js'

const router = express.Router()

// 查詢所有優惠券
router.get('/', async (req, res) => {
  const user_id = req.query.user_id
  try {
    const [coupons] = await db.query(
      `
       SELECT 
        coupons.*, 
        brands.name AS brand_name, 
        categories.name AS category_name,
        courses_categories.name AS course_category_name,
        IF(coupons_user.state = 1, TRUE, FALSE) AS claimed
      FROM coupons
      LEFT JOIN brands ON coupons.brand_id = brands.brand_id
      LEFT JOIN categories ON coupons.category_id = categories.category_id
      LEFT JOIN courses_categories ON coupons.course_categories_id = courses_categories.id
      LEFT JOIN coupons_user 
        ON coupons_user.coupon_id = coupons.id AND coupons_user.user_id = ?
     `,
      [user_id]
    )

    res.json({ status: 'success', data: { coupons } })
  } catch (err) {
    console.error('撈取優惠券錯誤:', err)
    res.status(500).json({ status: 'false', message: '連接資料庫錯誤' })
  }
})

// 領取優惠券（防止重複領取）
router.post('/claim', async (req, res) => {
  const { user_id, coupon_id } = req.body

  try {
    const [rows] = await db.query(
      'SELECT * FROM coupons_user WHERE user_id = ? AND coupon_id = ?',
      [user_id, coupon_id]
    )

    if (rows.length > 0 && rows[0].state === 1) {
      return res.status(400).json({
        status: 'false',
        message: '此優惠券已領取，無法再次領取',
      })
    } else if (rows.length > 0) {
      await db.execute(
        'UPDATE coupons_user SET state = 1, claimed_at = NOW() WHERE user_id = ? AND coupon_id = ?',
        [user_id, coupon_id]
      )
    } else {
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

// 查詢會員已領取優惠券
router.get('/member', async (req, res) => {
  const { user_id, state_id } = req.query

  try {
    const [coupons] = await db.query(
      `
      SELECT coupons.*, coupons_user.state
      FROM coupons_user
      JOIN coupons ON coupons_user.coupon_id = coupons.id
      WHERE coupons_user.user_id = ? AND coupons_user.state = ?
      `,
      [user_id, state_id]
    )

    res.json({ status: 'success', data: { coupons } })
  } catch (error) {
    console.error('查詢會員優惠券錯誤:', error)
    res.status(500).json({ status: 'false', message: '資料庫錯誤' })
  }
})

// 創建專屬優惠券（使用者限定）
router.post('/member', async (req, res) => {
  const { user_id, brand_id, category_id, skin_type_id } = req.body

  const brandMap = {
    1: 'unleashia',
    2: 'COSNORI',
    3: 'MUZIGAE',
    4: 'kaja',
    5: 'rom&nd',
    6: "A'pieu",
  }

  const categoryMap = {
    1: '眼影',
    2: '口紅',
    3: '唇蜜',
    4: '粉底',
    5: '氣墊粉餅',
  }

  const brandName = brandMap[brand_id] || '指定品牌'
  const categoryName = categoryMap[category_id] || '指定商品'
  const description = `購買 ${brandName} ${categoryName} 滿 NT$2000 即享折扣 NT$300`

  const now = new Date()
  const valid_to = new Date(now)
  valid_to.setDate(valid_to.getDate() + 30)

  try {
    await db.execute(
      `
      INSERT INTO coupons_member 
      (user_id, brand_id, category_id, skin_type_id, min_amount, amount, valid_from, valid_to, description) 
      VALUES (?, ?, ?, ?, ?, ?, NOW(), ?, ?)
      `,
      [
        user_id,
        brand_id,
        category_id,
        skin_type_id,
        2000,
        300,
        valid_to,
        description,
      ]
    )

    res.json({ status: 'success', message: '優惠券已建立' })
  } catch (error) {
    console.error('寫入錯誤:', error)
    res.status(500).json({ status: 'false', message: '寫入失敗' })
  }
})

export default router
