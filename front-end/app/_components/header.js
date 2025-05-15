'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BsHandbag } from 'react-icons/bs'
import './header.css'

export default function Header() {
  const pathname = usePathname()
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
                <Link href="">所有產品</Link>
              </li>
              <li>
                <Link href="">品牌總覽</Link>
              </li>
              <li>
                <Link href="">優惠券專區</Link>
              </li>
              <li>
                <Link href="">美妝教室</Link>
              </li>
              <li>
                <Link href="">美妝社群</Link>
              </li>
            </ul>
          </nav>
          <div className="icons">
            <button>
              <i className="bi bi-search" />
            </button>
            <Link href="/cart">
              <button className="cart-icon">
                <BsHandbag style={{ color: 'white', fontSize: '30px' }} />
                <div>2</div>
              </button>
            </Link>
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
