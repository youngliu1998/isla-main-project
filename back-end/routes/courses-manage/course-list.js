import express from 'express'
const router = express.Router()
import db from '../../config/mysql.js'

//Url:http://localhost:3005/api/courses-manage/course-list
router.get('/', async (req, res) => {
  try {
    const [course] = await db.query(`
      SELECT
        c.id,
        c.picture,
        c.title,
        c.student,
        c.price,
        c.discount,
        c.status,
        c.tag,
        c.created,
        c.categories_id,
        c.course_chapter,
        c.video_length,
        c.teacher_id,
        c.updated,
        c.remove,
        c.detail,
        c.content,
        c.banner_video,
        cat.name AS category_name,
        u.name AS teacher_name,
        COALESCE(AVG(cc.star), 0) AS avg_star,
        COUNT(cc.id) AS comment_count
      FROM courses c
      LEFT JOIN courses_comments cc ON c.id = cc.courses_id
      LEFT JOIN courses_categories cat ON c.categories_id = cat.id
      LEFT JOIN teachers t ON c.teacher_id=t.id
      LEFT JOIN users u ON t.users_id = u.id
      GROUP BY
        c.id, c.picture, c.title, c.student, c.price, c.discount, c.status,
        c.tag, c.created, c.categories_id, c.teacher_id, cat.name
      ORDER BY c.created DESC
    `)

    res.json({ status: 'success', data: course })
  } catch (err) {
    console.error('撈取課程錯誤:', err)
    res.status(500).json({ status: 'false', message: '連接資料庫錯誤' })
  }
})

// 檔案路徑：routes/courses-manage/course-list.js
router.patch('/:id/toggle-status', async (req, res) => {
  const courseId = req.params.id
  try {
    const [[course]] = await db.query(
      'SELECT status FROM courses WHERE id = ?',
      [courseId]
    )
    if (!course) {
      return res.status(404).json({ status: 'false', message: '找不到課程' })
    }

    const newStatus = course.status === 1 ? 0 : 1
    const removeDate = newStatus === 0 ? new Date() : null // 若下架，寫入時間；若上架，清空

    await db.query('UPDATE courses SET status = ?, remove = ? WHERE id = ?', [
      newStatus,
      removeDate,
      courseId,
    ])

    res.json({
      status: 'success',
      data: {
        id: courseId,
        status: newStatus,
        remove: removeDate, // 前端可以拿到
      },
    })
  } catch (err) {
    console.error('更新課程狀態錯誤:', err)
    res.status(500).json({ status: 'false', message: '資料庫錯誤' })
  }
})

// ✅ GET 單一課程 by id
// 檔案路徑：routes/courses-manage/course-list/course/:id
router.get('/course/:id', async (req, res) => {
  const courseId = req.params.id

  try {
    const [[course]] = await db.query(
      `
      SELECT
        c.id,
        c.title,
        c.price,
        c.discount,
        c.detail,
        c.content,
        c.picture,
        c.banner_video,
        c.course_chapter,
        c.video_length,
        c.student,
        c.status,
        c.created,
        c.updated,
        c.remove,
        c.categories_id,
        c.teacher_id,
        cat.name AS category_name,
        u.name AS teacher_name
      FROM courses c
      LEFT JOIN courses_categories cat ON c.categories_id = cat.id
      LEFT JOIN teachers t ON c.teacher_id = t.id
      LEFT JOIN users u ON t.users_id = u.id
      WHERE c.id = ?
      `,
      [courseId]
    )

    if (!course) {
      return res.status(404).json({ status: 'false', message: '找不到課程' })
    }

    res.json({ status: 'success', data: course })
  } catch (err) {
    console.error('撈取單一課程錯誤:', err)
    res.status(500).json({ status: 'false', message: '資料庫錯誤' })
  }
})

// ✅ PUT 更新課程
// PUT /api/courses-manage/course-list/course/:id
router.put('/course/:id', async (req, res) => {
  const courseId = req.params.id
  const updates = req.body

  try {
    // 判斷是否真的有要更新的欄位
    if (!updates || Object.keys(updates).length === 0) {
      return res
        .status(400)
        .json({ status: 'fail', message: '沒有任何欄位需要更新' })
    }

    // 建立動態的欄位字串與值陣列
    const fields = Object.keys(updates)
    const values = Object.values(updates)

    // 加上 updated 欄位時間戳
    fields.push('updated')
    values.push(new Date())

    // 組合成 SET 語法片段
    const setClause = fields.map((field) => `${field} = ?`).join(', ')
    const sql = `UPDATE courses SET ${setClause} WHERE id = ?`

    const [result] = await db.query(sql, [...values, courseId])

    res.json({ status: 'success', data: { affectedRows: result.affectedRows } })
  } catch (err) {
    console.error('更新課程錯誤:', err)
    res.status(500).json({ status: 'false', message: '資料庫錯誤' })
  }
})

// 取得所有分類列表
// GET /api/courses-manage/course-list/categories
router.get('/categories', async (req, res) => {
  try {
    const [rows] = await db.query(`SELECT id, name FROM courses_categories`)
    res.json({ status: 'success', data: rows })
  } catch (err) {
    console.error('撈取分類列表失敗:', err)
    res.status(500).json({ status: 'false', message: '資料庫錯誤' })
  }
})

// 取得所有講師列表
// GET /api/courses-manage/course-list/teachers
router.get('/teachers', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT t.id, u.name
      FROM teachers t
      JOIN users u ON t.users_id = u.id
    `)
    res.json({ status: 'success', data: rows })
  } catch (err) {
    console.error('撈取講師列表失敗:', err)
    res.status(500).json({ status: 'false', message: '資料庫錯誤' })
  }
})

// ✅ 圖片上傳功能
import multer from 'multer'
import path from 'path'
import fs from 'fs'

// multer 設定：這裡不要用 courseId 動態路徑，先讓它接受 callback
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const courseId = req.query.courseId

    if (!courseId) {
      return cb(new Error('缺少課程 ID'), null)
    }

    const uploadDir = `public/images/course/course-list/${courseId}`
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    console.log(1, req.body)
    console.log(11, req.query)

    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    console.log(2, req.body)
    console.log(22, req.query)

    const uniqueName = Date.now() + '-' + file.originalname
    cb(null, uniqueName)
  },
})

const upload = multer({ storage })

// ✅ 上傳圖片 API
// POST /api/courses-manage/course-list/upload
router.post('/upload', upload.single('file'), (req, res) => {
  try {
    console.log('✅ 接收到的 courseId:', req.body.courseId)
    console.log('✅ 檔案資訊:', req.file)

    const courseId = req.body.courseId
    if (!req.file) {
      return res.status(400).json({ status: 'fail', message: '未收到檔案' })
    }
    const fileUrl = `/images/course/course-list/${courseId}/${req.file.filename}`
    res.json({ status: 'success', url: fileUrl })
  } catch (error) {
    console.error('上傳錯誤:', error)
    res.status(500).json({ status: 'fail', message: error.message })
  }
})

export default router
