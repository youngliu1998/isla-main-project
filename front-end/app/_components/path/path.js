'use client'

import { useRouter, usePathname } from 'next/navigation'
// import React, { useState, useEffect } from 'react'
import Link from 'next/link'
// ==== css ====
import './_style/path.css'

export default function Path() {
  const pathname = usePathname()
  const router = useRouter()
  let pathArr = []
  if (router === '/') {
    pathArr = ['/']
  } else {
    pathArr = pathname.split('/')
  }

  const getPath = (thisPath) => {
    let address = ''
    for (let path of pathArr) {
      address += path + '/'
      if (path === thisPath) break
    }
    return address
    // route
    // r.push(address)
  }
  if (pathname === '/' || pathname.includes('/forum')) {
    return <></>
  }
  return (
    <>
      <div className="d-flex">
        {pathArr.map((path, i) => {
          return (
            <div key={i} className="d-flex gap-1 ps-1">
              <Link href={getPath(path)} className="path-link">
                {path !== '' ? path : 'home'}
              </Link>
              {i < pathArr.length - 1 && <span className="path-link">/</span>}
            </div>
          )
        })}
      </div>
    </>
  )
}
