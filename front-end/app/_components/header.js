'use client'
import Link from 'next/link'
<<<<<<< HEAD:front-end/app/_components/header.js
=======
import Image from 'next/image'
>>>>>>> aa3fa89 (0523/fixed conflic):front-end/app/_components/header/header.js
//styles
import { BsHandbag } from 'react-icons/bs'
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
import { useAuth } from '../../../hook/use-auth'
import useCartCount from '@/app/cart/hook/useCartCount'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
// route
import { USER_AVA_URL } from '@/_route/img-url'
>>>>>>> aa3fa89 (0523/fixed conflic):front-end/app/_components/header/header.js

export default function Header() {
  const cartIconNum = useCartCount()
  const router = useRouter()

  const handleCartClick = () => {
    const token = localStorage.getItem('jwtToken')
    if (!token) {
      router.push('/member/login')
    } else {
      router.push('/cart')
    }
  }
  const [hamMenuOpen, setHamMenuOpen] = useState(false)
  // const pathname = usePathname()
  const { isAuth } = useAuth()
  const loginUrl = isAuth ? 'profile' : 'login'
  if (
    pathname.includes('login') ||
    pathname.includes('register') ||
    pathname.includes('forget-password')
  ) {
    return <></>
  }

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
          <div className="order-lg-1 order-2 title">ISLA</div>
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
              <button>
                <i className="bi bi-person-circle" />
              </button>
=======
              <button>{loginAva}</button>
>>>>>>> aa3fa89 (0523/fixed conflic):front-end/app/_components/header/header.js
            </Link>
            {/* </Link> */}
            {/* </button> */}
          </div>
        </div>
      </header>
    </>
  )
}
