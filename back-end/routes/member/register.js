import express from 'express'
const router = express.Router()
import db from '../../config/mysql.js'
import dayjs from 'dayjs'
import bcrypt from 'bcrypt'
// import verifyToken from '../../lib/verify-token.js' // token verification

// api settings

// get: Send data if Auth is ok
router.post('/', async (req, res) => {
  let error = {}

  const regiList = 'email, password, name, birthday, tel'
  const newMember = req.body
  newMember['password'] = await bcrypt.hash(newMember['password'], 10)
  // datetime format to ISO
  newMember['birthday'] = dayjs(newMember['birthday']).format(
    'YYYY-MM-DDTHH:mm:ssZ[Z]'
  )
  // console.log('isoBirthday: ', isoBirthday)
  console.log(`newMember`, newMember)
  // rearrange object to array (for mysql2 execute)
  const newMemArray = Object.keys(newMember).map((key, i) => {
    console.log(key)
    return newMember[`${key}`]
  })
  // console.log('newMemArray', newMemArray)
  // console.log('array:', [...newMemArray])
  // res.json({ status: 'test' })
  // set query here
  try {
    const query = `INSERT INTO users (${regiList}) VALUES (?,?,?,?,?)`
    const newUser = await db
      .execute(query, [...newMemArray])
      .then((data) => data[0][0])
      .catch((err) => {
        error = err
      })
    // send user data to client
    res.json({
      status: 'success',
      data: newUser,
      message: '新增會員成功',
    })
  } catch (err) {
    res.json({ status: 'error', message: error })
  }
})

export default router
