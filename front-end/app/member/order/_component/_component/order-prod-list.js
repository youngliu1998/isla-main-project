'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
// ==== route ====
import { COURSE_BANNER_URL } from '@/_route/img-url'
import { COURSE_PAGE_URL } from '@/_route/page-url'

export default function OrderProdList({ order_id = 0 }) {
  const [openProd, setOpenProd] = useState(false)
  const btnProdContent = openProd ? '收起明細' : '展開明細'
  const prodListControl = openProd ? '' : 'closeProdList'
  // ==== item info ====
  const [item, setItems] = useState([])
  console.log('item: ', item)
  let itemRead = true
  const getItems = async () => {
    console.log('order_id', order_id)
    if (!itemRead) return console.log('細項已讀取')
    itemRead = false
    const token = localStorage.getItem('jwtToken')
    if (!token) return alert('無效登入')
    try {
      const response = await fetch(
        'http://localhost:3005/api/member/order/item',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ id: parseInt(order_id) }),
        }
      )
      const data = await response.json()
      if (response.ok) {
        setItems(data['data'])
        console.log('data', data['data'])
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <div
        className={
          'd-flex flex-column justify-content-between align-items-center overflow-hidden prodList' +
          ' ' +
          prodListControl
        }
      >
        {item.map((item, i) => {
          return (
            <div
              key={i}
              className="row justify-content-start gy-2 ms-3 mb-3 w-100"
            >
              <div className="prodImg">
                {item.item_type === 'course' && (
                  <Image
                    src={COURSE_BANNER_URL + item.course_pic}
                    alt={item.course_pic}
                    width={'50'}
                    height={'50'}
                    style={{ objectFit: 'contain' }}
                  />
                )}
              </div>
              <div className="col p-2 user-item-title">
                <Link
                  href={
                    item.item_type === 'course'
                      ? COURSE_PAGE_URL + item.course_id
                      : ''
                  }
                >
                  {item.item_type === 'product'
                    ? item.product_tit
                    : item.course_tit}
                </Link>
              </div>
              <div className="col-2 p-2">
                {item.item_type === 'product' ? '商品' : '課程'}
              </div>
              <div className="col-2 p-2">${item.price}</div>
            </div>
          )
        })}
      </div>
      <button
        className="btn-order-prod"
        onClick={() => {
          getItems()
          setOpenProd(!openProd)
        }}
      >
        {btnProdContent}
      </button>
    </>
  )
}
