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
            <Link href="/member/profile">基本資料</Link>
          </li>
          <li>
            <Link href="/member/password">密碼變更</Link>
          </li>
        </ul>
        <ul>
          <li className="title">購物</li>
          <li>
            <Link href="/member/like-list">願望清單</Link>
          </li>
          <li>
            <Link href="/member/coupon">我的優惠券</Link>
          </li>
          <li>
            <Link href="/member/order">訂單紀錄</Link>
          </li>
        </ul>
        <ul>
          <li className="title">課程</li>
          <li>
            <Link href="/member/course">我的課程</Link>
          </li>
          <li>
            <Link href="/member/teacher">教師管理</Link>
          </li>
        </ul>
        <ul>
          <li className="title">文章</li>
          <li>
            <Link href="/member/my-forum/my-following">我的追蹤</Link>
          </li>
          <li>
            <Link href="/member/my-forum/my-post">我的文章</Link>
          </li>
          <li>
            <Link href="/member/my-forum/saved-post">收藏文章</Link>
          </li>
        </ul>
      </div>
    </>
  )
}
