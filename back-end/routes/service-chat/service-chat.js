// import OpenAI from 'openai'

// const openai = new OpenAI({
//   apiKey: process.env.OPEN_AI_KEY,
// })

// const completion = openai.chat.completions.create({
//   model: 'gpt-4o-mini',
//   store: true,
//   messages: [{ role: 'user', content: 'write a haiku about ai' }],
// })

// completion.then((result) => console.log(result.choices[0].message))

import express from 'express'
import db from '../../config/mysql.js'
import multer from 'multer'
// import path from 'path'

const router = express.Router()
router.get('/', (req, res) => {
  return res.json({ status: 'null' })
})

export default router
