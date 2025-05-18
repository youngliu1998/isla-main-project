'use client'

import { useAuth } from '@/hook/use-auth'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import MemberNav from './_side-bar-component/member-nav'
import OpneNav from './_side-bar-component/open-nav'
import UploadAva from './_side-bar-component/upload-ava'
import './_style.css/side-bar.css'

export default function SideBar() {
  const pathname = usePathname()
  const [OpenMenu, setOpenMenu] = useState(false) // open nav bar in RWD
  const [openAvatar, setOpenAvatar] = useState(false)
  const { user, logout } = useAuth()

  // useEffect(() => {
  //   const token = localStorage.getItem('jwtToken')
  //   async function getSideInfo() {
  //     const response = await fetch(
  //       'http://localhost:3005/api/member/side-bar',
  //       {
  //         method: 'GET',
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     )
  //     const data = await response.json()
  //     console.log("data['data']", data)
  //     if (!data['data']) return 'no login'
  //     const { nickname, ava_url, email } = data['data']
  //     setuser({ nickname, ava_url, email })
  //     console.log('user', nickname, ava_url)
  //   }
  //   getSideInfo()
  // }, [user])
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
        <div className="d-flex flex-column align-items-center gap-2 w-100 position-relative user-head">
          {/* avatar, nickname, .... (member info) */}
          <button
            className="avatar-button"
            onClick={() => {
              setOpenAvatar(!openAvatar)
            }}
          >
            <div className="avartar overflow-hidden">
              <Image
                src={'http://localhost:3005/images/member/' + user.ava_url}
                alt="Picture of the member"
                width={100}
                height={100}
              />
            </div>
          </button>
          <UploadAva openAvatar={openAvatar} setOpenAvatar={setOpenAvatar} />
          <h4 className="user-title">{user?.nickname || 'Rookie'}</h4>
          <p>{user?.email || 'illegal@nomail.com'}</p>
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
