'use client'

import React, { useState, useEffect } from 'react'
import './_style/like-list.css'

export default function CourseListContainer({ name = '', data = [] }) {
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
