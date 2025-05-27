'use client'
import Link from 'next/link'
import Image from 'next/image'

import { useAuth } from '@/hook/use-auth'
import './header.css'
// hook
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
// route
import { USER_AVA_URL } from '@/_route/img-url'

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, isAuth } = useAuth()
  // console.log('header: user: ', user)
  // ==== END 購物車按鈕路徑定義 ====
  // ==== 使用者按鈕路徑、圖像定義 ====
  let loginUrl = isAuth ? 'profile' : 'login'
  let loginAva = isAuth ? (
    <div
      className="
    overflow-hidden rounded-pill"
    >
      <Image
        src={
          user.ava_url
            ? USER_AVA_URL + user.ava_url
            : 'http://localhost:3000/images/member/default-user.jpg'
        }
        alt={USER_AVA_URL + user.ava_url}
        width={40}
        height={40}
      />
    </div>
  ) : (
    <i className="bi bi-person-circle" />
  )
  // ==== END 使用者按鈕路徑、圖像定義 ====
  if (
    pathname.includes('login') ||
    pathname.includes('register') ||
    pathname.includes('forget-password') ||
    pathname.includes('dashboard')
  ) {
    return <></>
  }
  // console.log('main-page isAuth:', isAuth)
  // console.log('main-page user:', user)
  return (
    <>
      <header>
        <div className="position-relative header-body">
          <Link href="/">
            <div className="order-lg-1 order-2 title">ISLA</div>
          </Link>
          {/*  nav-bar */}
          <div className="order-3 icons">
            <button className="d-lg-block d-none">
              <i className="bi bi-search" />
            </button>

            <Link href={'/member/' + loginUrl} className="d-lg-block d-none">
              <button>{loginAva}</button>
            </Link>
            {/* </Link> */}
            {/* </button> */}
          </div>
        </div>
      </header>
    </>
  )
}
