import express from 'express'
const router = express.Router()
import db from '../../config/mysql.js'
import jwt from 'jsonwebtoken'
import verifyToken from '../../lib/verify-token.js' // token verification
// jwt key
const secretKey = process.env.JWT_SECRET_KEY

// api settings

// get: Send data if Auth is ok
router.get('/', verifyToken, async (req, res) => {
  let error
  const id = req?.user?.id || 0
  try {
    const query = `SELECT id,name,nickname,email,point,level,mem_cpon FROM user2 WHERE id=?`
    const user = await db
      .execute(query, [id])
      .then((data) => data[0][0])
      .catch((err) => {
        error = err
      })
    // send user data to client
    res.json({
      status: 'success',
      data: user,
      message: '登入成功',
    })
  } catch (err) {
    res.json({ status: 'error', message: error })
  }
})

// post: Send Auth token
router.post('/', async (req, res) => {
  let error
  const { email, password } = req.body
  try {
    const query = `SELECT id,email FROM user2 WHERE email=? AND password=?`
    const user = await db
      .execute(query, [email, password])
      .then((data) => data[0][0])
      .catch((err) => {
        error = err
      })
    // if there is no user
    if (!user)
      res.json({ status: 'error', message: '查無此會員' })
    // if user exist, build token from user
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      secretKey,
      { expiresIn: '30m' }
    )
    console.log('user', user)
    console.log('token', token)
    
    // send user data to client
    res.json({
      status: 'success',
      data: { token, id: user.id, name: user.name },
      message: '登入成功',
    })
  } catch (err) {
    res.json({ status: 'error', message: error, flag: 'sys err' })
  }
})

export default router
