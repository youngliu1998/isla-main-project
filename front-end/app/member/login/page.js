'use client'
// import { useAuth } from '@/hook/use-auth'
import { useAuth } from '@/hook/use-auth'
import Link from 'next/link'
import '../_styles/login.css'
import React, { useContext, useEffect } from 'react'

export default function LoginPage() {
  const { member, isAuth, login, logout } = useAuth()
  console.log(isAuth)
  console.log(member)
  return (
    <>
      <div className="container d-flex flex-column justify-content-centers gap-5 py-5">
        {isAuth ? (
          <button
            onClick={() => {
              logout()
            }}
          >
            登出
          </button>
        ) : (
          <button
            onClick={() => {
              login()
            }}
          >
            登入
          </button>
        )}
        <h1 className="text-center login-title">
          <span className="title">ISLA</span> 會員登入
        </h1>
        <div className="card-glass-linear login-panel">
          <form
            className="d-flex flex-column align-items-center login-form"
            method="post"
          >
            <div className="login-input-block">
              <label htmlFor="account">電子信箱</label>
              <input type="text" name="account" />
            </div>
            <div className="login-input-block">
              <label htmlFor="account">密碼</label>
              <input type="text" name="account" />
              <Link href="">忘記密碼?</Link>
            </div>
            <button className="btn btn-primary">登入</button>
          </form>
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
