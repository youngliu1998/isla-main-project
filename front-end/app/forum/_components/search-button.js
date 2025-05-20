'use client'

import React, { useState, useEffect } from 'react'

export default function ComponentsSearchButton(props) {
  return (
    <>
      <button
        className="switcher dropdown-toggle d-flex d-xl-none justify-content-center align-items-center gap-1 px-2 ms-2 my-1 bg-gray-article rounded-pill fs14 sub-text-color border-stroke"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        分類
      </button>
      <div className="dropdown-menu dropdown-forum px-3 py-2 shadow-sm border-0 main-text-color">
        <div className="pb-2">
          <div className="dropdown-label py-1 fs12 sub-text-color">
            商品類型
          </div>
          <button className="dropdown-item-forum px-2 py-1 rounded-pill button-clear">
            唇膏
          </button>
          <button className="dropdown-item-forum px-2 py-1 rounded-pill button-clear">
            底妝
          </button>
          <button className="dropdown-item-forum px-2 py-1 rounded-pill button-clear">
            眼影
          </button>
        </div>
        <div className="pb-2">
          <div className="dropdown-label py-1 fs12 sub-text-color">
            文章類型
          </div>
          <button className="dropdown-item-forum px-2 py-1 px-2 py-1 rounded-pill button-clear">
            分享
          </button>
          <button className="dropdown-item-forum px-2 py-1 rounded-pill button-clear">
            請益
          </button>
          <button className="dropdown-item-forum px-2 py-1 rounded-pill button-clear">
            討論
          </button>
          <button className="dropdown-item-forum px-2 py-1 rounded-pill button-clear">
            試色
          </button>
        </div>
      </div>
    </>
  )
}
