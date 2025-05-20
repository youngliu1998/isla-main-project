'use client'
import Link from 'next/link'
<<<<<<< HEAD
import { usePathname, useRouter } from 'next/navigation'
import useCartCount from '@/app/cart/hook/useCartCount'
=======
import { useState } from 'react'
import { usePathname } from 'next/navigation'
>>>>>>> dev
import { BsHandbag } from 'react-icons/bs'
import { useAuth } from '../../hook/use-auth'
import HamMenu from './_component/ham-menu'
import HamMeunNav from './_component/ham-meun-nav'
import HeaderNav from './_component/header-nav'
import './header.css'

export default function Header() {
<<<<<<< HEAD
  const cartIconNum = useCartCount()
  const pathname = usePathname()
  const router = useRouter()

  const handleCartClick = () => {
    const token = localStorage.getItem('jwtToken')
    if (!token) {
      router.push('/member/login')
    } else {
      router.push('/cart')
    }
  }
=======
  const [hamMenuOpen, setHamMenuOpen] = useState(false)
  const pathname = usePathname()
  const { isAuth } = useAuth()
  const loginUrl = isAuth ? 'profile' : 'login'
>>>>>>> dev
  if (
    pathname.includes('login') ||
    pathname.includes('register') ||
    pathname.includes('forget-password')
  )
    return <></>
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
<<<<<<< HEAD

            <button className="cart-icon" onClick={handleCartClick}>
              <BsHandbag style={{ color: 'white', fontSize: '30px' }} />
              {/* <div>2</div> */}
              {cartIconNum > 0 && <div>{cartIconNum}</div>}
            </button>

            <button>
              <Link href="/member/login">
=======
            <Link href="/cart">
              <button className="cart-icon">
                <BsHandbag style={{ color: 'white', fontSize: '30px' }} />
                <div>2</div>
              </button>
            </Link>
            <Link href={'/member/' + loginUrl} className="d-lg-block d-none">
              <button>
>>>>>>> dev
                <i className="bi bi-person-circle" />
              </button>
            </Link>
          </div>
        </div>
      </header>
    </>
  )
}
