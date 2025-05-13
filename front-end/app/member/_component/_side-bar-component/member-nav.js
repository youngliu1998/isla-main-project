'use client'

import Link from 'next/link'

export default function MemberNav({ OpenMenu = false }) {
  let open = ''
  if (OpenMenu) {
    open = 'open'
  } else {
    open = ''
  }
  return (
    <>
      <div className={'user-nav' + ' ' + open}>
        <ul>
          <li className="title">個人</li>
          <li>
            <Link href="profile">基本資料</Link>
          </li>
          <li>
            <Link href="password">密碼變更</Link>
          </li>
        </ul>
        <ul>
          <li className="title">購物</li>
          <li>
            <Link href="like-list">願望清單</Link>
          </li>
          <li>
            <Link href="coupon">我的優惠券</Link>
          </li>
          <li>
            <Link href="order">訂單紀錄</Link>
          </li>
        </ul>
        <ul>
          <li className="title">商品</li>
          <li>
            <Link href="my-forum/my-following">查看文章</Link>
          </li>
        </ul>
        <ul>
          <li className="title">課程</li>
          <li>
            <Link href="course">我的課程</Link>
          </li>
          <li>
            <Link href="teacher">教師管理</Link>
          </li>
        </ul>
      </div>
    </>
  )
}
