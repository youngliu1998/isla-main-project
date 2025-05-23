import express from 'express'
import db from '../../config/mysql.js'

const router = express.Router()

// [GET] 後台取得所有優惠券（包含對應名稱）
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
      ORDER BY coupons.id DESC
    `)

    res.json({ status: 'success', coupons })
  } catch (err) {
    console.error('查詢優惠券錯誤:', err)
    res.status(500).json({ status: 'false', message: '資料庫錯誤' })
  }
})

// [DELETE] 刪除指定優惠券
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    await db.execute('DELETE FROM coupons WHERE id = ?', [id])
    res.json({ status: 'success', message: '優惠券已刪除' })
  } catch (err) {
    console.error('刪除優惠券錯誤:', err)
    res.status(500).json({ status: 'false', message: '刪除失敗' })
  }
})

export default router
