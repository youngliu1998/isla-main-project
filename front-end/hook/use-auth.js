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
    birthday: '',
    ava_url: '',
    points: '',
    level: '',
    tel: '',
    address: '',
    mem_cpon: 0,
  }
  const [user, setUser] = useState(defaultUser)
  let isAuth = Boolean(user?.id)
  // 取得使用者資料(驗證後才可使用)
  const initAuth = async () => {
    const token = localStorage.getItem('jwtToken')
    if (!token) return console.log('not get token')
    // get user's data from db
    try {
      const response = await fetch('http://localhost:3005/api/member/login', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      })

      const data = await response.json()
      if (response.ok && data?.data) {
        console.log('useAuth: ', data.data)
        setUser(data.data)
      } else {
        console.warn('驗證失敗，清除 token')
        localStorage.removeItem('jwtToken')
        localStorage.removeItem('googleToken')
      }
    } catch (err) {
      console.error('驗證錯誤:', err)
      localStorage.removeItem('jwtToken')
      localStorage.removeItem('googleToken')
    }
  }
  // login function
  const login = async (email, passowrd) => {
    // fetch login auth api (post)
    try {
      const response = await fetch('http://localhost:3005/api/member/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: passowrd }),
      })
      const data = await response.json()

      if (response.ok) {
        if (!data['data']['token']) {
          return console.log('沒有取得token，登入失敗')
        }
        // set token to localStorage
        localStorage.setItem('jwtToken', data['data']['token'])
        console.log('check token: ', data['data']['token'])
        console.log('後端回應成功')
      } else {
        console.error('登入失敗', data.message)
      }
    } catch (err) {
      console.log(err)
    }
    // 取得使用者資料
    initAuth()
  }

  // logout function
  const logout = () => {
    localStorage.removeItem('jwtToken')
    localStorage.removeItem('googleToken')
    setUser(defaultUser)
  }
  // 初始讀取 jwtToken 並取得使用者資料
  useEffect(() => {
    // 取得使用者資料
    initAuth()
  }, [])
  return (
    <>
      <AuthContext.Provider value={{ user, isAuth, login, logout, initAuth }}>
        {children}
      </AuthContext.Provider>
    </>
  )
}

export const useAuth = () => useContext(AuthContext)
