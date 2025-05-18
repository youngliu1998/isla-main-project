import express from 'express'
const router = express.Router()
import db from '../../config/mysql.js'
import jwt from 'jsonwebtoken'
const secretKey = process.env.JWT_SECRET_KEY

// get: Send data if Auth is ok
router.post('/', async (req, res) => {
  let error
  const { token } = req.body

  try {
    // 向 Google 驗證 Token
    const googleResponse = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`
    )
    const userData = await googleResponse.json()

    if (userData.error) {
      return res.status(400).json({ error: 'Invalid token' })
    }

    // 整合原有ISLA的登入系統
    try {
      const query = `SELECT id,email, password FROM users WHERE email=?`
      const user = await db
        .execute(query, [userData['email']])
        .then((data) => data[0][0])
        .catch((err) => {
          error = err
        })
      // if there is no user
      if (!user) return res.json({ status: 'error', message: '查無此會員' })
      // if user exist, build token from user
      const islaToken = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        secretKey,
        { expiresIn: '30d' }
      )
      console.log('user', user)
      console.log('token', islaToken)

      // send user data to client
      res.json({
        status: 'success',
        data: { token: islaToken, id: user.id, name: user.name },
        message: '登入成功',
      })
    } catch (err) {
      res.json({ status: 'error', message: error, flag: 'sys err' })
    }

    // 處理使用者資料（可存入資料庫或建立 Session）
    // res.json({ message: 'Login successful', token: token, data: userData })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
