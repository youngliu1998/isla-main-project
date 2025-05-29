'use client'

import { useState, useEffect } from 'react'
import CouponTable from '../_components/coupon-table'

export default function CourseCoupons() {
  const [coupons, setCoupons] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('jwtToken')
    fetch('http://localhost:3005/api/coupon/admin', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const filter = data.data.filter(
          (coupon) => coupon.area === 2 || coupon.area === 0
        )
        setCoupons(filter)
      })
  }, [])

  return (
    <div className="p-4">
      <h2>課程優惠券</h2>
      <CouponTable coupons={coupons} />
    </div>
  )
}
