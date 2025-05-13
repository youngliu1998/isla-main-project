'use client'
// import { useAuth } from '@/hook/use-auth'
import { useAuth } from '@/hook/use-auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import InputText from '../_component/input-text'
import InputPass from '../_component/input-pass'
import '../_styles/login.css'

export default function LoginPage() {
  const router = useRouter()
  // const navigater = useNavigate()
  const [memAuth, setMemAuth] = useState({
    email: 'johnwilliams@test.com',
    password: '12345',
  })
  const { user, isAuth, login } = useAuth() // Context
  useEffect(() => {
    // if get auth, go to profile
    // if (isAuth) router.push('profile')
    console.log('login-page-user: ', user)
    console.log('login-page-isAuth: ', isAuth)
  }, [login])
  return (
    <>
      <div className="d-flex flex-column justify-content-centers gap-5 py-5 postion-middle">
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
              <InputText
                text={memAuth}
                title="電子郵件"
                name="email"
                value={memAuth.email}
                setText={setMemAuth}
              />
            </div>
            {/* password */}
            <div className="login-input-block">
              <InputPass
                password={memAuth}
                title="密碼"
                name="password"
                value={memAuth.password}
                setPassword={setMemAuth}
              />
              <Link href="">忘記密碼?</Link>
            </div>
            {/* submit */}
            <button
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault()
                console.log('account', memAuth.email)
                login(memAuth.email, memAuth.password)
              }}
            >
              登入
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
