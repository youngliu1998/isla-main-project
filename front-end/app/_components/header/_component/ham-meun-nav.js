'use client'

// import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/hook/use-auth'

export default function HamMeunNav({
  hamMenuOpen = false,
  setHamMenuOpen = () => {},
}) {
  const { user, isAuth, logout } = useAuth()
  const isOpen = hamMenuOpen ? 'active' : ''
  const avaNone = hamMenuOpen ? '' : 'opacity-0'
  return (
    <>
      <nav className={'d-lg-none d-block ham-menu-nav' + ' ' + isOpen}>
        <form action="" className="d-flex align-items-center pe-3">
          <label htmlFor="serch" className="px-3">
            <i className="bi bi-search fs-5" />
          </label>
          <input type="text" name="serch" className="" />
        </form>
        <ul className="d-flex flex-column mt-3">
          <li>
            <Link
              href="/product"
              onClick={() => {
                setHamMenuOpen(false)
              }}
            >
              所有產品
            </Link>
          </li>
          <li>優惠券專區</li>
          <li>
            <Link
              href="/course"
              onClick={() => {
                setHamMenuOpen(false)
              }}
            >
              美妝教室
            </Link>
          </li>
          <li>
            <Link
              href="/forum"
              onClick={() => {
                setHamMenuOpen(false)
              }}
            >
              美妝論壇
            </Link>
          </li>
        </ul>
        <div
          className={
            'd-flex justify-content-center align-items-center gap-4 w-100 user-head' +
            ' ' +
            avaNone
          }
        >
          {/* ==== avatar ==== */}
          <Link
            href={isAuth ? '/member/profile' : '/member/login'}
            onClick={() => {
              setHamMenuOpen(false)
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
          </Link>
          {/* ==== nickname, .... (member info) ==== */}
          <div className="d-flex flex-column align-items-center gap-3 w-50">
            <h4 className="user-title">{user?.nickname || 'Rookie'}</h4>
            {/* ==== login and logout button ==== */}
            <button className="login-btn">
              <Link
                onClick={() => {
                  if (isAuth) logout()
                  setHamMenuOpen(false)
                }}
                href={'/member/login'}
              >
                {isAuth ? '登出' : '登入'}
              </Link>
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}
