'use client'

import React, { useState, useEffect } from 'react'

export default function ComponentsSearchButton(props) {
  const productCate = [
    '臉頰底妝',
    '眼部彩妝',
    '唇部彩妝',
    '臉頰彩妝',
    '眉部彩妝',
    '睫毛彩妝',
    '臉部保養',
  ]
  const postCate = ['分享', '請益', '討論', '試色']
  return (
    <>
      <button
        className="dropdown-toggle d-flex d-xl-none justify-content-center align-items-center gap-1 px-3 py-2 ms-2 my-1 rounded-pill fs14 sub-text-color bg-hovering-gray border-0"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        分類
      </button>
      <div className="dropdown-menu dropdown-forum px-3 py-3 w-50 shadow-sm border-0 main-text-color">
        <div className="pb-2">
          <div className="dropdown-label py-1 fs12 sub-text-color">
            商品類型
          </div>
          {productCate.map((v, i) => (
            <button
              key={i}
              className="dropdown-item-forum px-2 py-1 my-1 rounded-pill button-clear"
            >
              {v}
            </button>
          ))}
        </div>
        <div className="pb-2">
          <div className="dropdown-label py-1 fs12 sub-text-color">
            文章類型
          </div>
          {postCate.map((v, i) => (
            <button
              key={i}
              className="dropdown-item-forum px-2 py-1 rounded-pill button-clear"
            >
              {v}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
