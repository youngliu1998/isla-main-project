'use client'

import Link from 'next/link'

export default function HeaderNav() {
  return (
    <>
      <nav className="order-lg-2 d-lg-block d-none">
        <ul className="d-flex flex-lg-row flex-column justify-content-center align-items-center">
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
            <Link href="/course">美妝教室</Link>
          </li>
          <li>
            <Link href="/forum">美妝社群</Link>
          </li>
        </ul>
      </nav>
    </>
  )
}
