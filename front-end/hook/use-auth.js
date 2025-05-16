'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)
AuthContext.displayName = 'AuthContext'

export function AuthProvider({ children }) {
  // set user default status
  const defaultUser = {
    id: 0,
    name: '',
    nickname: '',
    email: '',
    points: '',
    level: '',
    tel: '',
    address: '',
    mem_cpon: 0,
  }
  const [user, setUser] = useState(defaultUser)
  let isAuth = Boolean(user?.id)

  // login function
  const login = async (email, passowrd) => {
    // fetch login auth api
    try {
      const response = await fetch('http://localhost:3005/api/member/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: passowrd }),
      })

      const data = await response.json()
      console.log('response', data)
      if (response.ok) {
        // localStorage.setItem('jwtToken', data.token)
        console.log('登入成功')
      } else {
        console.error('登入失敗', data.message)
      }
      console.log(data['data']['token'])
      localStorage.setItem('jwtToken', data['data']['token'])
      // setuser({ id: 3, name: 'harry', email: account })
    } catch (err) {
      console.log(err)
    }
    // if get Auth, setUser
    try {
      const token = localStorage.getItem('jwtToken')

      const response = await fetch('http://localhost:3005/api/member/login', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      })

      const data = await response.json()
      const userData = data['data']
      setUser(userData)
    } catch (err) {
      console.error('驗證錯誤:', err)
      localStorage.removeItem('jwtToken')
    }
  }

  // logout function
  const logout = () => {
    localStorage.removeItem('jwtToken')
    setUser(defaultUser)
  }
  // 初始讀取 jwtToken 並取得使用者資料
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('jwtToken')
      if (!token) return
      // fetch data from db
      try {
        const response = await fetch('http://localhost:3005/api/member/login', {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        })

        const data = await response.json()
        if (response.ok && data?.data) {
          setUser(data.data)
        } else {
          console.warn('驗證失敗，清除 token')
          localStorage.removeItem('jwtToken')
        }
      } catch (err) {
        console.error('驗證錯誤:', err)
        localStorage.removeItem('jwtToken')
      }
    }

    initAuth()
  }, [])
  return (
    <>
      <AuthContext.Provider value={{ user, isAuth, login, logout }}>
        {children}
      </AuthContext.Provider>
    </>
  )
}

export const useAuth = () => useContext(AuthContext)
