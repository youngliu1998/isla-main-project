'use client'
import Link from 'next/link'
//styles
import { BsHandbag } from 'react-icons/bs'
import { useAuth } from '@/hook/use-auth'
import HamMenu from './_component/ham-menu'
import HamMeunNav from './_component/ham-meun-nav'
import HeaderNav from './_component/header-nav'
import './header.css'
// hook
import { useAuth } from '../../hook/use-auth'
import useCartCount from '@/app/cart/hook/useCartCount'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

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
    pathname.includes('forget-password') ||
    pathname.includes('dashboard')
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
              <button>
                <i className="bi bi-person-circle" />
              </button>
            </Link>
            {/* </Link> */}
            {/* </button> */}
          </div>
        </div>
      </header>
    </>
  )
}
