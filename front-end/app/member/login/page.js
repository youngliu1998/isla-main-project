'use client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { GoogleLogin } from '@react-oauth/google'
import { useAuth } from '@/hook/use-auth'
import { useCartContext } from '../../cart/context/cart-context'
// import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import InputText from '../_component/input-text'
import InputPass from '../_component/input-pass'
import '../_styles/login.css'
import { courseUrl } from '../../../_route/courseUrl'

export default function LoginPage() {
  const router = useRouter()
  const { login, initAuth } = useAuth() // Context
  const [memAuth, setMemAuth] = useState({
    email: 'johnsmith@gmail.com',
    password: '12345',
  })
  // ==== handle login form ====
  // course登入後跳回原本畫面並自動執行收藏
  // 宣告一個非同步的函式 handleSubmit，參數 e 是事件物件（例如表單提交事件）
  const handleSubmit = async (e) => {
    // 阻止表單預設行為（例如頁面重新載入）
    e.preventDefault()

    await login(memAuth.email, memAuth.password)

    // 檢查 localStorage 中的 'isAuth' 是否為 'true'（表示使用者已成功登入）
    const isAuthLocal = localStorage.getItem('isAuth') === 'true'

    // 如果使用者成功登入
    if (isAuthLocal) {
      // 取得登入前預先儲存的導向路徑（例如使用者原本想進入的頁面）
      const redirectPath = localStorage.getItem('redirectAfterLogin')
      // 檢查使用者是否在登入前點擊「立即購買」按鈕
      const pendingBuyNow = localStorage.getItem('pendingBuyNow')

      // 清除已使用過的 redirect path 資料
      localStorage.removeItem('redirectAfterLogin')

      // ✅ 若登入前曾點擊立即購買
      if (pendingBuyNow) {
        // 清除 pending 購買記錄
        localStorage.removeItem('pendingBuyNow')
        // 導向該課程詳情頁，讓該頁 useEffect 中的購買邏輯自動處理
        router.push(`/course/course-list/${pendingBuyNow}`)
        return // 結束函式，不繼續往下執行
      }

      // 一般情況（未點擊立即購買），若有設定登入後要導向的頁面，就跳轉過去
      if (redirectPath) {
        router.push(redirectPath)
      } else {
        // 若無特定導向頁面，預設導回首頁
        router.push('/')
      }
    }
  }

  // 跳轉結束

  //無跳轉頁面
  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   console.log('account', memAuth.email)
  //   await login(memAuth.email, memAuth.password)
  //   const isAuthLocal = localStorage.getItem('isAuth') || false
  //   if (isAuthLocal) {
  //     router.push('/')
  //   }
  // }
  // ==== google 認證設定 ====
  // course登入後跳回原本畫面並自動執行收藏
  const responseMessage = async (response) => {
    const data = await fetch('http://localhost:3005/api/member/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: response.credential, // Google Token
      }),
    })
      .then((response) => response.json())
      .catch((error) => console.error('Error:', error))
    if (!data || !data.data || !data.data.token) {
      console.log('沒有取得token，登入失敗', data)
      return
    }
    // set token to localStorage
    localStorage.setItem('jwtToken', data['data']['token'])
    localStorage.setItem('googleToken', data['data']['tokenGoogle'])
    console.log('check token: ', data['data']['token'])
    console.log('check google: ', data['data']['tokenGoogle'])
    console.log('Google後端回應成功')
    console.log(response)
    initAuth()
    const isAuthLocal = localStorage.getItem('jwtToken') || false
    if (isAuthLocal) {
      alert('登入成功')
      router.push('/')
    } else {
      alert('登入失敗')
    }
  }
  const errorMessage = (error) => {
    console.log(error)
  }
  // ==== END google 認證設定 ====
  useEffect(() => {
    const isAuthLocal = localStorage.getItem('jwtToken') || false
    // if get auth, go to main page
    if (isAuthLocal) router.push('/')
    // console.log('login-page-user: ', user)
    // console.log('login-page-isAuth: ', isAuth)
  }, [])

  return (
    <>
      <div className="d-flex flex-column justify-content-centers gap-5 py-2 postion-middle">
        <h1 className="text-center login-title">
          <span className="title">ISLA</span> 會員登入
        </h1>
        {/* === for test === */}
        <div className="position-absolute top-50 left-0">
          <div className="d-flex gap-4">
            <div>cart:</div>
            <div> johnsmith@gmail.com</div>
          </div>
          <br />
          <div className="d-flex gap-4">
            <div>admin:</div>
            <div> admin@isla.com</div>
          </div>
          <div className="d-flex gap-4">
            <div>teacher1:</div>
            <div> hankjohnson@gmail.com</div>
          </div>
          <div className="d-flex gap-4">
            <div>teacher2:</div>
            <div> hankmartinez@gmail.com</div>
          </div>
          <div className="d-flex gap-4">
            <div>teacher3:</div>
            <div> frankmiller@gmail.com</div>
          </div>
        </div>
        {/* === END for test === */}
        <div className="card-glass-linear login-panel">
          {/* login form */}
          <form
            className="d-flex flex-column align-items-center login-form"
            onSubmit={handleSubmit}
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
            <button className="btn btn-primary">登入</button>
          </form>
          {/* login form end */}
          {/* register and google */}
          <Link href="register">註冊</Link>
          <div className="d-flex justify-content-center align-items-center gap-2 w-100">
            <div className="gray-line" />
            <div>或者</div>
            <div className="gray-line" />
          </div>
          <GoogleOAuthProvider clientId="104246971541-iteifad48ud3h6dp85k6qoqgqta9flir.apps.googleusercontent.com">
            <div className="w-100">
              <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
            </div>
          </GoogleOAuthProvider>
        </div>
      </div>
    </>
  )
}
