import express from 'express'
const router = express.Router()
import db from '../../config/mysql.js'
import dayjs from 'dayjs'
import bcrypt from 'bcrypt'
// import verifyToken from '../../lib/verify-token.js' // token verification

// api settings

// get: Send data if Auth is ok
router.post('/', async (req, res) => {
  let error = ''

  // const regiList = 'email, password, name, birthday, tel'
  const newMember = req.body
  // ==== create query string ====
  const queryString = Object.keys(newMember)
    .map((v) => v)
    .toString()
  // ==== create value ? string ====
  const valueString = Object.keys(newMember)
    .map(() => '?')
    .toString()
  // ==== change format of data (password-hash, datatime ISO) ====
  if (newMember['password']) {
    newMember['password'] = await bcrypt.hash(newMember['password'], 10)
  }
  if (newMember['birthday']) {
    newMember['birthday'] = dayjs(newMember['birthday']).format(
      'YYYY-MM-DDTHH:mm:ss'
    )
  }
  // 'YYYY-MM-DDTHH:mm:ssZ[Z]'
  // console.log('isoBirthday: ', isoBirthday)
  console.log(`newMember`, newMember)
  // rearrange object to array (for mysql2 execute)
  const newMemArray = Object.keys(newMember).map((key) => {
    console.log(key)
    return newMember[`${key}`]
  })
  // res.json({ status: 'test', queryString, valueString, newMemArray })
  // ==== 新增會員 ====
  try {
    const query = `INSERT INTO users (${queryString}) VALUES (${valueString})`
    const newUser = await db
      .execute(query, [...newMemArray])
      .then((data) => data[0][0])
      .catch((err) => {
        error = err
      })
    // if create fail, return ...
    if (error) {
      return res.json({ status: 'error', message: `新增會員失敗: ${error}` })
    }
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

// ==== 為google登入者完成註冊資料 ====
router.post('/google', async (req, res) => {
  let error = ''

  const newMember = req.body
  // ==== create query string ====
  const queryString = Object.keys(newMember)
    .map((v) => v + '=?')
    .toString()
  // ==== change format of data (password-hash, datatime ISO) ====
  if (newMember['password']) {
    newMember['password'] = await bcrypt.hash(newMember['password'], 10)
  }
  if (newMember['birthday']) {
    newMember['birthday'] = dayjs(newMember['birthday']).format(
      'YYYY-MM-DDTHH:mm:ss'
    )
  }
  // ==== format for mysql2 array ====
  const newMemArray = Object.keys(newMember).map((key) => {
    console.log(key)
    return newMember[`${key}`]
  })
  // console.log('stringQuery: ', queryString)
  // console.log('newMemArray: ', newMemArray)
  // res.json({ status: 'test', arrayQuery: queryString, arrayData: newMemArray })
  // ==== set query here ====
  try {
    const query = `UPDATE users SET ${queryString} WHERE email=?`
    const newUser = await db
      .execute(query, [...newMemArray, newMember['email']])
      .then((data) => data[0][0])
      .catch((err) => {
        error = err
      })
    // if create fail, return ...
    if (error) {
      return res.json({
        status: 'error',
        message: `新增會員失敗(Google): ${error}`,
      })
    }
    // send user data to client
    res.json({
      status: 'success',
      data: newUser,
      message: '新增會員成功(Google)',
    })
  } catch (err) {
    res.json({ status: 'error', message: error })
  }
})

export default router
