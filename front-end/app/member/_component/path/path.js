'use client'

import { useRouter, usePathname } from 'next/navigation'
import React, { useState, useEffect } from 'react'

export default function Path(props) {
  const pathname = usePathname()
  console.log('pathname ', pathname)
  // const router = useRouter()
  const pathArr = pathname.split('/')
  const getPath = (thisPath) => {
    let address = ''
    console.log(thisPath)
    for (let path of pathArr) {
      address += path + '/'
      if (path === thisPath) break
    }
    console.log('address: ', address)
    return address
    // router.push(address)
  }
  if (pathname === '/') {
    return <></>
  }
  return (
    <>
      <div className="d-flex">
        {pathArr.map((path, i) => {
          return (
            <button
              key={i}
              className="path-link"
              onClick={() => {
                getPath(path)

                console.log('path: ', path)
              }}
            >
              {path !== '/' ? path : 'home'}
            </button>
          )
        })}
      </div>
    </>
  )
}
