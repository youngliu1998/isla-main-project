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
  // 定義非同步函式，用來處理使用者登入表單的提交
  const handleSubmit = async (e) => {
    e.preventDefault() // 阻止表單預設行為（例如刷新頁面）

    // 執行登入邏輯，使用 email 和 password 驗證身份
    await login(memAuth.email, memAuth.password)

    // 檢查 localStorage 中的登入狀態標記是否為 true（登入成功）
    const isAuthLocal = localStorage.getItem('isAuth') === 'true'

    // 若登入成功，才進行後續導頁邏輯
    if (isAuthLocal) {
      // 嘗試取得登入前的目標頁面（例如從收藏或購買行為跳轉來此頁）
      const redirectPath = localStorage.getItem('redirectAfterLogin')

      // 檢查是否在登入前點擊過「立即購買」按鈕
      const pendingBuyNow = localStorage.getItem('pendingBuyNow')

      // ✅【情境一】使用者登入前有點擊「立即購買」
      if (pendingBuyNow) {
        // 使用過後即清除，避免重複執行
        localStorage.removeItem('pendingBuyNow')

        // 進一步判斷購買的是「課程」還是「體驗」
        const pendingType = localStorage.getItem('pendingBuyNowType')
        localStorage.removeItem('pendingBuyNowType') // 同樣使用後清除

        // 🔁 根據類型導向對應的詳細頁
        if (pendingType === 'experience') {
          // 體驗頁：跳轉至 /course/experience/:id
          router.push(`/course/experience/${pendingBuyNow}`)
        } else {
          // 課程頁（預設）：跳轉至 /course/course-list/:id
          router.push(`/course/course-list/${pendingBuyNow}`)
        }

        return // ✅ 結束函式，避免後續導頁重複執行
      }

      // ✅【情境二】使用者登入前只瀏覽某頁，未點擊立即購買
      if (redirectPath) {
        localStorage.removeItem('redirectAfterLogin') // 清除導回紀錄
        router.push(redirectPath) // 導回原頁
      } else {
        // ✅【情境三】未記錄任何導向頁，預設導向首頁
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
