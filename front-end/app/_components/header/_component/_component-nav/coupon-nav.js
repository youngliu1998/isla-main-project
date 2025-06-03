'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CouponNav({ open = false }) {
  const isOpen = open ? 'd-flex' : 'd-none'
  return (
    <>
      <div
        className={
          'flex-column align-items-center gap-2 py-2 px-1 bg-elem position-absolute overflow-hidden' +
          ' ' +
          isOpen
        }
      >
        <Link href="/coupon/products">商品優惠券</Link>
        <Link href="/coupon/courses">課程優惠券</Link>
      </div>
    </>
  )
}
