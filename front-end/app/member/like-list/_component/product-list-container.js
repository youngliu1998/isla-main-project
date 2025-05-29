'use client'

import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import ProductList from './_component/product-list'
import './_style/like-list.css'

export default function ProductListContainer({ name = '', data = [] }) {
  const [openList, setOpenList] = useState(false)
  const isOpen = openList ? '' : 'close-like-list'
  return (
    <>
      <button
        className="list-container"
        onClick={() => {
          setOpenList(!openList)
        }}
      >
        <h5>{name} 願望清單</h5>
        <span>{data.length}項商品</span>
      </button>
      {/* product-list */}
      <div className={clsx('d-flex', isOpen)}>
        {data.map((product, i) => {
          // product Card
        })}
      </div>
    </>
  )
}
