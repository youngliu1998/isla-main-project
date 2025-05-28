import express from 'express'
import db from '../../config/mysql.js'

const router = express.Router()

// 取得所有優惠券（)
router.get('/', async (req, res) => {
  try {
    const [coupons] = await db.query(`
    SELECT 
        coupons.*, 
        brands.name AS brand_name, 
        categories.name AS category_name,
        courses_categories.name AS course_category_name,
        coupons_area.name AS area_name,
        coupons_categories.name AS type_name
      FROM coupons
      LEFT JOIN brands ON coupons.brand_id = brands.brand_id
      LEFT JOIN categories ON coupons.category_id = categories.category_id
      LEFT JOIN courses_categories ON coupons.course_categories_id = courses_categories.id
      LEFT JOIN coupons_area ON coupons.area = coupons_area.id
      LEFT JOIN coupons_categories ON coupons.type_id = coupons_categories.id
      WHERE coupons.valid = 1
      ORDER BY coupons.id ASC
    `)

    res.json({ status: 'success', data: coupons })
  } catch (err) {
    console.error('查詢優惠券錯誤:', err)
    res.status(500).json({ status: 'false', message: '資料庫錯誤' })
  }
})

// 取得所有品牌
router.get('/brand', async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT brand_id AS id, name FROM brands WHERE status = 'active'`
    )
    res.json({ status: 'success', data: rows })
  } catch (err) {
    console.error('取得品牌失敗:', err)
    res.status(500).json({ status: 'false', message: '資料庫錯誤' })
  }
})

// 取得所有商品種類
router.get('/category', async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT category_id AS id, name FROM categories WHERE status = 'active'`
    )
    res.json({ status: 'success', data: rows })
  } catch (err) {
    console.error('取得種類失敗:', err)
    res.status(500).json({ status: 'false', message: '資料庫錯誤' })
  }
})

// 編輯優惠券
router.put('/:id', async (req, res) => {
  const { id } = req.params
  const {
    title,
    description,
    brand_id,
    category_id,
    course_categories_id,
    amount,
    discount_rate,
    free,
    min_amount,
    min_quantity,
    valid_from,
    valid_to,
  } = req.body

  try {
    await db.execute(
      `
      UPDATE coupons SET 
        title = ?, 
        description = ?, 
        brand_id = ?, 
        category_id = ?, 
        course_categories_id = ?, 
        amount = ?, 
        discount_rate = ?, 
        free = ?, 
        min_amount = ?, 
        min_quantity = ?, 
        valid_from = ?, 
        valid_to = ?
      WHERE id = ?
    `,
      [
        title,
        description,
        brand_id || null,
        category_id || null,
        course_categories_id || null,
        amount || 0,
        discount_rate || 0,
        free || 0,
        min_amount || 0,
        min_quantity || 0,
        valid_from || null,
        valid_to || null,
        id,
      ]
    )

    res.json({ status: 'success', message: '優惠券已更新' })
  } catch (err) {
    console.error('更新優惠券錯誤:', err)
    res.status(500).json({ status: 'false', message: '更新失敗' })
  }
})

// 刪除優惠券
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    await db.execute('UPDATE coupons SET valid = 0 WHERE id = ?', [id])
    res.json({ status: 'success', message: '優惠券已刪除' })
  } catch (err) {
    console.error('刪除優惠券錯誤:', err)
    res.status(500).json({ status: 'false', message: '刪除失敗' })
  }
})

export default router
