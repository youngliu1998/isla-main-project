'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/hook/use-auth'

export default function CouponPage(props) {
  const { user } = useAuth()
<<<<<<< HEAD
  console.log('coup-prod: ', user)
=======
  console.log('coupon-page-user: ', user)
>>>>>>> 66a89f1c06513f6e0994f5747a00b946d1658551
  return (
    <>
      <div>Coupon Page</div>
    </>
  )
}
