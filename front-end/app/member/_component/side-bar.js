'use client'

import { useAuth } from '@/hook/use-auth'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import MemberNav from './_side-bar-component/member-nav'
import OpneNav from './_side-bar-component/open-nav'
import './_style.css/side-bar.css'

export default function SideBar() {
  const pathname = usePathname()
  const [OpenMenu, setOpenMenu] = useState(false)
  const { member, logout } = useAuth()
  // return <></> in login, register, ......
  if (
    pathname.includes('login') ||
    pathname.includes('register') ||
    pathname.includes('forget-password')
  ) {
    return <></>
  }
  return (
    <>
      {/* aside-bar */}
      <aside className="col-lg-3 col-12 flex-lg-column">
        <div className="d-flex flex-column align-items-center gap-2 w-100 user-head">
          {/* avatar, nickname, .... (member info) */}
          <div className="avartar" />
          <h4 className="user-title">{member?.nickname || 'Rookie'}</h4>
          <p>{member?.email || 'illegal@nomail.com'}</p>
          <Link
            onClick={() => {
              logout()
            }}
            href="/"
          >
            登出
          </Link>
        </div>
        {/* panel */}
        <OpneNav OpenMenu={OpenMenu} setOpenMenu={setOpenMenu} />
        <MemberNav OpenMenu={OpenMenu} />
      </aside>
    </>
  )
}
