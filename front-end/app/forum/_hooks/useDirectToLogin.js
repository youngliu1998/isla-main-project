'use client'

import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'

export function UseDirectToLogin({ isAuth = Boolean }) {
  const router = useRouter()
  return async (path) => {
    if (!isAuth) {
      alert('請先登入')
      router.push(`/member/login?callBackUrl=${encodeURIComponent(path)}`)
    }
  }
}
