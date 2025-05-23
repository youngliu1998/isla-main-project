'use client'
import Link from 'next/link'
<<<<<<< HEAD:front-end/app/_components/header.js
//styles
import { BsHandbag } from 'react-icons/bs'
=======
import Image from 'next/image'
//styles
import { BsHandbag } from 'react-icons/bs'
import { useAuth } from '@/hook/use-auth'
>>>>>>> eb1a1b5b282b50dc9f9526c9aa1add0ce7762ff5:front-end/app/_components/header/header.js
import HamMenu from './_component/ham-menu'
import HamMeunNav from './_component/ham-meun-nav'
import HeaderNav from './_component/header-nav'
import './header.css'
// hook
<<<<<<< HEAD:front-end/app/_components/header.js
import { useAuth } from '../../hook/use-auth'
import useCartCount from '@/app/cart/hook/useCartCount'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
=======
import useCartCount from '@/app/cart/hook/useCartCount'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
// route
import { USER_AVA_URL } from '@/_route/img-url'
>>>>>>> eb1a1b5b282b50dc9f9526c9aa1add0ce7762ff5:front-end/app/_components/header/header.js

export default function Header() {
  const cartIconNum = useCartCount()
  const pathname = usePathname()
  const router = useRouter()
  const [hamMenuOpen, setHamMenuOpen] = useState(false)
  const { user, isAuth } = useAuth()
  // ==== 購物車按鈕路徑定義 ====
  const handleCartClick = () => {
    const token = localStorage.getItem('jwtToken')
    if (!token) {
      router.push('/member/login')
    } else {
      router.push('/cart')
    }
  }
  // ==== END 購物車按鈕路徑定義 ====
  // ==== 使用者按鈕路徑、圖像定義 ====
  let loginUrl = isAuth ? 'profile' : 'login'
  let loginAva = isAuth ? (
    <div
      className="
    overflow-hidden rounded-pill"
    >
      <Image
        src={USER_AVA_URL + user.ava_url}
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
          {/* (START) for burger menu*/}
          <HamMeunNav
            hamMenuOpen={hamMenuOpen}
            setHamMenuOpen={setHamMenuOpen}
          />
          <HamMenu hamMenuOpen={hamMenuOpen} setHamMenuOpen={setHamMenuOpen} />
          {/* (END) for burger menu */}
          <Link href="/">
            <div className="order-lg-1 order-2 title">ISLA</div>
          </Link>
          {/*  nav-bar */}
          <HeaderNav />
          <div className="order-3 icons">
            <button className="d-lg-block d-none">
              <i className="bi bi-search" />
            </button>

            <button
              className="cart-icon"
              type="button"
              onClick={handleCartClick}
            >
              <BsHandbag style={{ color: 'white', fontSize: '30px' }} />
              {cartIconNum > 0 && <div>{cartIconNum}</div>}
            </button>

            <Link href={'/member/' + loginUrl} className="d-lg-block d-none">
<<<<<<< HEAD:front-end/app/_components/header.js
              <button type="button">
                <i className="bi bi-person-circle" />
              </button>
=======
              <button>{loginAva}</button>
>>>>>>> eb1a1b5b282b50dc9f9526c9aa1add0ce7762ff5:front-end/app/_components/header/header.js
            </Link>
            {/* </Link> */}
            {/* </button> */}
          </div>
        </div>
      </header>
    </>
  )
}
