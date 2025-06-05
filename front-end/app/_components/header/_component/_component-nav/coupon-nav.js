'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
<<<<<<< HEAD
// ==== css ====
import './_style/coupon-nav.css'
=======
import './coupon-nav.css'
>>>>>>> dev

export default function CouponNav({ open = false }) {
  const isOpen = open ? 'd-flex' : 'd-none'
  return (
    <>
      <div
        className={
<<<<<<< HEAD
          'flex-column align-items-center gap-2 py-2 px-1 position-absolute overflow-hidden nav-coupon-selection' +
=======
          'coupon-nav-menu-box flex-column align-items-center position-absolute overflow-hidden' +
>>>>>>> dev
          ' ' +
          isOpen
        }
      >
        <Link className="coupon-nav-menu-text" href="/coupon/products">
          商品優惠券
        </Link>
        <Link className="coupon-nav-menu-text" href="/coupon/courses">
          課程優惠券
        </Link>
      </div>
    </>
  )
}
