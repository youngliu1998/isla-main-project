'use client'

import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import Link from 'next/link'

export function UseDirectToLogin({ isAuth = Boolean }) {
  //   const router = useRouter()
  return async (path) => {
    if (path.length === 0) {
      localStorage.setItem('redirectAfterLogin', window.location.href)
    }
    localStorage.setItem('redirectAfterLogin', path)
    if (!isAuth) {
      toast.error(
        <div className="d-flex justify-content-between w-100">
          <span>請先登入</span>
          <Link
            // href={`/member/login?callBackUrl=${encodeURIComponent(path)}`}
            href={`/member/login`}
            className="main-color text-decoration-underline me-4"
          >
            前往登入
          </Link>
        </div>
      )
    }
  }
}
