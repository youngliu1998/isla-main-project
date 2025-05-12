'use client'
// import { useAuth } from '@/hook/use-auth'
import { useAuth } from '@/hook/use-auth'
import Link from 'next/link'
import '../_styles/login.css'
import React, { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [passowrd, setPassword] = useState('')
  const { member, isAuth, login, logout } = useAuth() // Context

  return (
    <>
      <div className="container d-flex flex-column justify-content-centers gap-5 py-5">
        <h1 className="text-center login-title">
          <span className="title">ISLA</span> 會員登入
        </h1>
        <div className="card-glass-linear login-panel">
          {/* login form */}
          <form
            className="d-flex flex-column align-items-center login-form"
            method="post"
          >
            {/* Email */}
            <div className="login-input-block">
              <label htmlFor="account">電子信箱</label>
              <input
                type="text"
                name="account"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
            </div>
            {/* password */}
            <div className="login-input-block">
              <label htmlFor="account">密碼</label>
              <input
                type="password"
                name="passowrd"
                value={passowrd}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
              <Link href="">忘記密碼?</Link>
            </div>
            {/* submit */}
            <button
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault()
                console.log('account', email)
                login(email, passowrd)
              }}
            >
              登入
            </button>
            <button
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault()
                logout(email, passowrd)
              }}
            >
              登出
            </button>
          </form>
          {/* login form end */}
          {/* register and google */}
          <Link href="">註冊</Link>
          <div className="d-flex justify-content-center align-items-center gap-2 w-100">
            <div className="gray-line" />
            <div>或者</div>
            <div className="gray-line" />
          </div>
        </div>
      </div>
    </>
  )
}
