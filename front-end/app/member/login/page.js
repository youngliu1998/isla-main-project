'use client'
import Link from 'next/link'
import '../_styles/login.css'

export default function LoginPage() {
  return (
    <>
      <div className="container d-flex flex-column justify-content-centers gap-5 py-5">
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
              <ha ef>忘記密碼?</ha>
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
