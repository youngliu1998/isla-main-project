'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import useCartCount from '@/app/cart/hook/useCartCount'
import { BsHandbag } from 'react-icons/bs'
import './header.css'

export default function Header() {
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
  if (
    pathname.includes('login') ||
    pathname.includes('register') ||
    pathname.includes('forget-password')
  )
    return <></>
  return (
    <>
      <header className="header-module">
        <div className="header-body">
          <div className="title">ISLA</div>
          <nav className="d-lg-block d-none">
            <ul>
              <li>
                <Link href="/product">所有產品</Link>
              </li>
              <li>
                <Link href="">品牌總覽</Link>
              </li>
              <li>
                <Link href="">優惠券專區</Link>
              </li>
              <li>
                <Link href="/course">美妝教室</Link>
              </li>
              <li>
                <Link href="/forum">美妝社群</Link>
              </li>
            </ul>
          </nav>
          <div className="icons">
            <button>
              <i className="bi bi-search" />
            </button>

            <button className="cart-icon" onClick={handleCartClick}>
              <BsHandbag style={{ color: 'white', fontSize: '30px' }} />
              {/* <div>2</div> */}
              {cartIconNum > 0 && <div>{cartIconNum}</div>}
            </button>

            <button>
              <Link href="/member/login">
                <i className="bi bi-person-circle" />
              </Link>
            </button>
          </div>
        </div>
      </header>
    </>
  )
}
