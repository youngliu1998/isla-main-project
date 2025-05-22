'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import CouponCard from '@/app/coupon/_components/coupon-card'

export default function CouponSection(props) {
  return (
    <>
      <div className="d-flex flex-column gap-4 bg-primary">
        {/* ==== title ==== */}
        <div className="container d-flex justify-content-between align-items-center text-white py-5 px-4">
          <h2>優惠券專區 COUPON</h2>
          <Link href="/coupon/products">查看更多優惠券 &gt;</Link>
        </div>
        {/* ==== coupon list ==== */}
        <div className="d-flex gap-4">
          <CouponCard />
        </div>
      </div>
    </>
  )
}
