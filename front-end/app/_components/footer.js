'use client'

import Link from 'next/link'
// import Image from 'next/image'
import './footer.css'
import { usePathname } from 'next/navigation'
import path from 'path'

export default function Footer() {
  const pathname = usePathname()
  if (
    pathname.includes('/login') ||
    pathname.includes('register') ||
    pathname.includes('forget-password') ||
    pathname.includes('/cart') ||
    pathname.includes('/forum')
  ) {
    return <></>
  }

  return (
    <>
      <footer>
        <div>
          <div className="row">
            <div className="col-2 d-lg-flex d-none footer-side" />
            <div className="col-lg-10 col-12 row row-cols-lg-2 row-cols-1 g-0 footer-body">
              <div className="row row-cols-lg-4 row-cols-3 footer-header-left g-0">
                <ul>
                  <li className="list-title">彩妝</li>
                  <li>
                    <Link href="">優惠券專區</Link>
                  </li>
                  <li>
                    <Link href="">所有商品</Link>
                  </li>
                </ul>
                <ul>
                  <li className="list-title">生活</li>
                  <li>
                    <Link href="">美妝教室</Link>
                  </li>
                  <li>
                    <Link href="">美妝社群 </Link>
                  </li>
                </ul>
                <ul>
                  <li className="list-title">關於品牌</li>
                  <li>
                    <Link href="">ISLA理念</Link>
                  </li>
                  <li>
                    <Link href="">商業合作</Link>
                  </li>
                </ul>
                <div className="blank d-lg-block d-none" />
              </div>
              <div>
                <div className="footer-header-right">
                  <div className="contact-info-block">
                    <h3 className="d-md-block d-none">聯絡窗口</h3>
                    <div className="contact-info">
                      <span>電話 (00) 03554798</span>
                      <span>電子郵件 isla.supple@isla.com</span>
                    </div>
                  </div>
                  <div className="source-media-block">
                    <h3>Our Social Media</h3>
                    <div className="band">
                      <div className="logo">ISLA</div>
                      <div className="icons">
                        <button />
                        <button />
                        <button />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row footer-bottom-band p-md-2 p-3 gy-3">
            <div className="col-md-3 col-12 card-icons"></div>
            <span className="col-md-6 col-12 d-flex justify-content-md-center justify-content-start">
              Copyright ©2025 Taiwan ISLA Co., Ltd. All rights reserved.
            </span>
            <span className="col-md-3 col-12 d-flex justify-content-md-end justify-content-start">
              隱私條款｜條款及細則
            </span>
          </div>
        </div>
      </footer>
    </>
  )
}
