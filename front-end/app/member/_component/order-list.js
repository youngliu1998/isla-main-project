'use client'

import React, { useState, useEffect } from 'react'
import './_style.css/order-list.css'

export default function OrderList(props) {
  return (
    <>
      <div className="d-flex flex-md-row flex-column w-100 order-list">
        <div className="order-col">
          <div className="order-index">訂單編號</div>
          <div className="order-content">12345</div>
        </div>
        <div className="order-col">
          <div className="order-index">購買日期</div>
          <div className="order-content">12345</div>
        </div>
        <div className="order-col">
          <div className="order-index">購買日期</div>
          <div className="order-content">1234567</div>
        </div>
        <div className="order-col">
          <div className="order-index">購買日期</div>
          <div className="order-content">12345</div>
        </div>
        <div className="order-col">
          <div className="order-index">購買日期</div>
        </div>
        <div className="order-col">
          <div className="order-index">購買日期</div>
        </div>
      </div>
    </>
  )
}
