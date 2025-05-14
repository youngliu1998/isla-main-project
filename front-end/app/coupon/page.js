'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/hook/use-auth'

export default function CouponPage(props) {
  const { user } = useAuth()
  console.log('coup-prod: ', user)
  return (
    <>
      <div>Coupon Page</div>
    </>
  )
}
