import express from 'express'
import db from '../../config/mysql.js'

const router = express.Router()

// 查詢所有優惠券，是否已領取
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
  // 沒登入擋掉
  if (!user_id || user_id === 0) {
    return res.status(401).json({
      status: 'false',
      message: '未登入無法領取優惠券',
    })
  }
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

// 查詢會員已領取的優惠券（含狀態）
router.get('/member', async (req, res) => {
  const { user_id } = req.query

  if (!user_id) {
    return res.status(400).json({ status: 'false', message: '缺少 user_id' })
  }

  try {
    // 1. 過期 → state = 3（已過期）
    await db.execute(
      `
      UPDATE coupons_user
      JOIN coupons ON coupons_user.coupon_id = coupons.id
      SET coupons_user.state = 3
      WHERE coupons_user.user_id = ?
        AND coupons_user.state = 1
        AND coupons.valid_to < CURDATE()
    `,
      [user_id]
    )

    // 2. 即將過期（剩三天內）→ state = 4
    await db.execute(
      `
      UPDATE coupons_user
      JOIN coupons ON coupons_user.coupon_id = coupons.id
      SET coupons_user.state = 4
      WHERE coupons_user.user_id = ?
        AND coupons_user.state = 1
        AND coupons.valid_to BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 3 DAY)
    `,
      [user_id]
    )

    // 查詢更新後的紀錄
    const [coupons] = await db.query(
      `
      SELECT 
        coupons.*, 
        coupons_user.user_id,
        coupons_user.state AS state_id,
        coupons_user.claimed_at,
        coupons_state.name AS state_name
      FROM coupons_user
      JOIN coupons ON coupons_user.coupon_id = coupons.id
      LEFT JOIN coupons_state ON coupons_user.state = coupons_state.id
      WHERE coupons_user.user_id = ?
    `,
      [user_id]
    )

    res.json({ status: 'success', data: { coupons } })
  } catch (error) {
    console.error('查詢會員優惠券錯誤:', error)
    res.status(500).json({ status: 'false', message: '資料庫錯誤' })
  }
})
// 已使用
router.post('/use', async (req, res) => {
  const { user_id, order_id } = req.body
  // console.log({ user_id, order_id })
  try {
    await db.execute(
      ` UPDATE coupons_user
        SET state = 2
        WHERE user_id = ? AND coupon_id IN (SELECT coupon_id FROM order_coupons WHERE order_id = ?)`,
      [user_id, order_id]
    )

    res.json({ status: 'success', message: '優惠券已標記為已使用' })
  } catch (err) {
    console.error('更新優惠券為已使用失敗:', err)
    res.status(500).json({ status: 'false', message: '更新失敗' })
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
