import express from 'express'
const router = express.Router()
import db from '../../config/mysql.js'

// Url: http://localhost:3006/api/course/course?tag=1 或 tag=2
router.get('/', async (req, res) => {
  const { tag } = req.query

  try {
    let baseSQL = `
      SELECT
        c.id AS course_id,
        c.picture,
        c.title,
        c.student,
        c.price,
        c.discount,
        c.status,
        c.categories_id,
        c.tag,
        c.banner_video,
        c.course_chapter,
        c.video_length,
        c.detail,
        c.created,
        c.updated,
        c.remove,
        c.content,
        c.like_id,
        c.star AS course_star,
        c.teacher_id,
        t.id AS teacher_id,
        t.about AS teacher_about,
        t.banner AS teacher_banner,
        t.detail AS teacher_detail,
        t.status AS teacher_status,
        t.website AS teacher_website,
        t.facebook AS teacher_facebook,
        t.instagram AS teacher_instagram,
        u.name AS teacher_name,
        u.email AS teacher_email,
        COALESCE(AVG(cc.star), 0) AS avg_star,
        COUNT(cc.id) AS comment_count
      FROM courses c
      LEFT JOIN courses_comments cc ON c.id = cc.courses_id
      LEFT JOIN teachers t ON c.teacher_id = t.id
      LEFT JOIN users u ON t.users_id = u.id
    `
    const values = []

    if (tag === '1' || tag === '2') {
      baseSQL += ` WHERE c.tag = ?`
      values.push(tag)
    }

    baseSQL += ` GROUP BY c.id ORDER BY c.created DESC`

    const [course] = await db.query(baseSQL, values)

    res.json({ status: 'success', data: course })
  } catch (err) {
    console.error('課程撈取錯誤:', err)
    res.status(500).json({ status: 'false', message: '連接資料庫錯誤' })
  }
})

export default router
