'use client'

import '../_component/_style.css/form.css'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import OrderList from '../_component/order-list'
import { useAuth } from '@/hook/use-auth'

export default function OrderPage() {
  const router = useRouter()
  const { isAuth } = useAuth()
  useEffect(() => {
    const token = localStorage.getItem('jwtToken')
      ? localStorage.getItem('jwtToken')
      : null
    if (!token) router.push('login')
    // if get auth, fetch profile data
    let profileData = {}
    async function getProfile() {
      try {
        const token = localStorage.getItem('jwtToken')

        const response = await fetch(
          'http://localhost:3005/api/member/profile',
          {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
          }
        )
      } catch (err) {
        console.log(err)
      }
    }
    getProfile()
  }, [])
  return (
    <>
      <div className="user-content">
        <h3>會員資料</h3>
        <OrderList />
      </div>
    </>
  )
}
