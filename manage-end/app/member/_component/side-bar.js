'use client'

import { useAuth } from '@/hook/use-auth'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import MemberNav from './_side-bar-component/member-nav'
import OpneNav from './_side-bar-component/open-nav'
import UploadAva from './_side-bar-component/upload-ava'
import './_style.css/side-bar.css'

export default function SideBar() {
  const pathname = usePathname()
  const router = useRouter()
  const [OpenMenu, setOpenMenu] = useState(false) // open nav bar in RWD
  const [openAvatar, setOpenAvatar] = useState(false)
  const { user, logout, initAuth } = useAuth()

  // ==== 確認是否登入 ====
  useEffect(() => {
    const isLogin = async () => {
      await initAuth()
      const isAuthLocal = localStorage.getItem('jwtToken') || false
      // console.log(`isAuth`, isAuth)
      if (!isAuthLocal) {
        alert('請先登入')
        router.push('/member/login')
        return
      }
    }
    // 不包含以下網址才執行
    if (
      !(
        pathname.includes('login') ||
        pathname.includes('register') ||
        pathname.includes('forget-password')
      )
    ) {
      isLogin()
    }
  }, [])
  // return <></> in login, register, ......
  if (
    pathname.includes('login') ||
    pathname.includes('register') ||
    pathname.includes('forget-password')
  ) {
    return <></>
  }
  return (
    <>
      {/* aside-bar */}
      <aside className="lg:w-1/4  flex flex-col lg:flex-col">
        <div className="flex flex-col items-center gap-2 w-full relative user-head">
          {/* avatar, nickname, .... (member info) */}
          <button
            className="avatar-button"
            onClick={() => {
              setOpenAvatar(!openAvatar)
            }}
          >
            <div className="avartar overflow-hidden rounded-full">
              <Image
                src={'http://localhost:3005/images/member/' + user.ava_url}
                alt="Picture of the member"
                width={10}
                height={10}
              />
            </div>
          </button>
          {/* <UploadAva openAvatar={openAvatar} setOpenAvatar={setOpenAvatar} /> */}
          <h4 className="user-title ">{user?.nickname || 'Rookie'}</h4>
          <p>{user?.email || 'illegal@nomail.com'}</p>
          <Link
            onClick={() => {
              logout()
            }}
            href="/"
          >
            登出
          </Link>
        </div>
        <div className={'user-nav'}>
          <ul>
            <li className="title">個人</li>
            <Link href="/member/profile">
              <li>基本資料</li>
            </Link>
            <Link href="/member/password">
              <li>密碼變更</li>
            </Link>
          </ul>
        </div>
      </aside>
    </>
  )
}
