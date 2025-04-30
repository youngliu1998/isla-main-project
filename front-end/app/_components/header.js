'use client'
import Link from 'next/link'
import './header.css'

export default function Header() {
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
            <button className="cart-icon">
              <i className="bi bi-handbag" />
              <div>2</div>
            </button>
            <button>
              <i className="bi bi-person-circle" />
            </button>
          </div>
        </div>
      </header>
    </>
  )
}
