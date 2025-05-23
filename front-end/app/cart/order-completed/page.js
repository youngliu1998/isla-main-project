'use client'

import StepProgress from '../_component/step-progress/step-progress'
import OrderComplete from '../_component/order-complete/order-complete'
import React, { useState, useEffect } from 'react'

export default function OrderCompletedPage() {
  useEffect(() => {
    localStorage.removeItem('orderSummary')
    // 順便清掉購物車的資料
    localStorage.removeItem('cartItems')
  }, [])
  const orderData = {
    orderId: '1743478951522',
    orderDate: '2025/04/17 13:38',
    orderStatus: '已確認',
    paymentMethod: '信用卡',
    paymentStatus: '已付款',
    recipient: {
      name: '洛特',
      phone: '0977-000-000',
      address: '台北市中正區仁愛路一段1號',
    },
    products: [
      { name: '[Kaja] Crystal Glam Tint', price: 'NT$1250' },
      { name: '[Kaja] XXX XXX', price: 'NT$1250' },
    ],
  }

  return (
    <>
      <section className="container text-center text-lg-start mt-2">
        <h1 className="text-subtext h2 m-5">購物袋</h1>
      </section>
      {/* step-icon */}
      <section className="container d-none d-lg-block mb-4">
        <StepProgress currentStep={3} />
      </section>
      <OrderComplete orderData={orderData} />
    </>
  )
}
