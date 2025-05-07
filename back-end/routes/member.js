import express from 'express'
const router = express.Router()
import db from '../config/mysql.js'

/* GET home page. */
router.get('/', async function (req, res) {

  const [members] = await db.query(`SELECT * FROM user`)
  res.json({ status: 'success', data: members })
})

export default router
