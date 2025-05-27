'use client'

import React, { useState, useEffect } from 'react'
import ProductList from './_component/product-list'
import './_style/like-list.css'

export default function ProductListContainer({ name = '', data = [] }) {
  return (
    <>
      <div className="list-container">
        <h5>{name} 願望清單</h5>
        <span>{data.length}項商品</span>
      </div>
      {/* product-list */}
      <div className="d-flex">
        {data.map((product, i) => {
          // product Card
        })}
      </div>
    </>
  )
}
