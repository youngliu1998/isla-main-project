'use client'

import React, { useState, useEffect } from 'react'
import './coupon.css'

export default function CouponLoading({ visible, onComplete }) {
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    if (!visible) return

    setPercent(0)
    const timer = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => {
            onComplete()
          }, 100)
          return 100
        }
        return prev + 1
      })
    }, 20)

    return () => clearInterval(timer)
  }, [visible, onComplete])

  if (!visible) return null

  return (
    <div className="pageLoading">
      <div className="monster">
        <div className="eye">
          <div className="eyeball"></div>
        </div>
        <div className="mouth"></div>
      </div>
      <div className="loading">
        <div className="bar" style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  )
}
