'use client'
import { useAuth } from '@/hook/use-auth'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import RegisterInput from '../_component/register-input'
import '../_styles/style.css'
import '../_styles/register.css'

export default function RegisterPage() {
  const router = useRouter()
  const { user, isAuth } = useAuth() // Context
  const [regiInfo, setregiInfo] = useState({
    email: '',
    password: '',
    name: '',
    birthday: '',
    tel: '',
  })
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(
        'http://localhost:3005/api/member/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(regiInfo),
        }
      )
      const result = await response.json()
      alert('提交成功：' + JSON.stringify(result))
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    // if get auth, go to profile
    if (isAuth) router.push('profile')
    console.log('register-page-user: ', user)
    console.log('register-page-isAuth: ', isAuth)
  }, [isAuth])
  console.log('regiInfo', regiInfo)

  return (
    <>
      <h2 className="regiTitle text-center mb-4">
        <span className="title">ISLA</span>會員註冊
      </h2>
      <div className="row row-cols-md-2 row-cols-1 gx-5">
        {/* banner */}
        <div className="d-md-block d-none">
          <div className="d-flex flex-wrap"></div>
          <h2 className="regiTitle">
            歡迎加入
            <span className="title">ISLA</span>
          </h2>
          <div className="regiIntro">
            ISLA
            是一個超貼心、懂你的韓系美妝電商品牌，專為年輕族群打造最棒的美妝體驗！我們帶來超夯的韓系美妝好物，還有專業又好玩的美妝課程跟討論區，讓你隨時掌握最新美妝趨勢，和同好一起分享創意靈感。不管你是小白還是美妝老手，ISLA
            都陪你一起解鎖屬於你的美麗冒險！
          </div>
        </div>
        {/* register panel */}

        <form onSubmit={handleSubmit}>
          <div className="user-content">
            <p>
              以下皆為必填，<span className="user-star">*</span>為往後不可修改
            </p>
            <RegisterInput
              title={'電子信箱'}
              name="email"
              value={regiInfo.email}
              text={regiInfo}
              setText={setregiInfo}
            />
            <RegisterInput
              title={'密碼'}
              name="password"
              type="password"
              value={regiInfo.password}
              text={regiInfo}
              setText={setregiInfo}
            />
            <RegisterInput
              title={'本名'}
              name="name"
              value={regiInfo.name}
              text={regiInfo}
              setText={setregiInfo}
            />
            <RegisterInput
              title={'生日'}
              name="birthday"
              type="date"
              value={regiInfo.birthday}
              text={regiInfo}
              setText={setregiInfo}
            />
            <RegisterInput
              title={'電話'}
              name="tel"
              value={regiInfo.tel}
              text={regiInfo}
              setText={setregiInfo}
            />
            <button className="btn btn-primary">註冊</button>
            <div className="d-flex flex-column justify-content-center gap-3">
              <span>
                已經有帳號了?
                <Link href="login" className="text-primary">
                  登入
                </Link>
              </span>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
