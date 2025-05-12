import jwt from 'jsonwebtoken'
const secretKey = process.env.JWT_SECRET_KEY
// verify token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) return res.status(403).json({ message: '未提供 Token' })

  try {
    const decoded = jwt.verify(token, secretKey)
    req.user = decoded // 存入 req 供後續使用
    next()
  } catch (error) {
    res.status(401).json({ message: 'Token 無效或已過期' })
  }
}
export default verifyToken