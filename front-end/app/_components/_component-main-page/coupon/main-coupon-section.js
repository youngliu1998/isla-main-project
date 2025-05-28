'use client'

import React, { useState, useEffect } from 'react'

export default function MainCouponSection(props) {
  return (
    <>
      <div className="container">
        <div className="main-coupon">
          <h2 className="title">ISLA</h2>
          <h2 className="main-coupon-content">夏季特賣七折優惠券</h2>
          <button className="btn btn-primary rounded-pill">
            數量有限 &nbsp;&nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;&nbsp;
            立即領取優惠券
          </button>
        </div>
      </div>
    </>
  )
}
