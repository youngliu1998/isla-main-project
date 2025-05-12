'use client'

import { useAuth } from '@/hook/use-auth'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import MemberNav from './_side-bar-component/member-nav'
import UserMenu from './_side-bar-component/user-menu'
import './_style.css/side-bar.css'

export default function SideBar() {
  const pathname = usePathname()
  const [OpenMenu, setOpenMenu] = useState(false)
  const { member, logout } = useAuth()
  if (pathname.includes('login')) return <></>
  return (
    <>
      {/* aside-bar */}
      <aside className="col-lg-3 col-12 flex-lg-column">
        <div className="d-flex flex-column align-items-center gap-2 w-100 user-head">
          <div className="avartar" />
          <h4 className="user-title">DDDDDD</h4>
          <p>gamil@.com</p>
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
        <UserMenu OpenMenu={OpenMenu} setOpenMenu={setOpenMenu} />
        <MemberNav OpenMenu={OpenMenu} />
      </aside>
    </>
  )
}
