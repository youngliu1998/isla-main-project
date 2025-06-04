'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
// ==== component ====
import Componentstab from '@/app/_components/tab'
// ==== css ====
import './_style/search-block.css'

export default function SearchBlock(props) {
  const [serchType, setSearchType] = useState(1)
  const [searchText, setSearchText] = useState('')
  return (
    <>
      <div className="header-search-block px-3 mt-3">
        <div className="w-50">
          <Componentstab
            cates={['商品', '文章']}
            height={40}
            handleTabChange={setSearchType}
          />
        </div>
        <div className="d-flex align-items-center mb-3">
          <label htmlFor="serch" className="px-3">
            <i className="bi bi-search fs-5" />
          </label>
          <input
            type="text"
            name="search"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value)
            }}
          />
        </div>
        <div className="d-flex flex-wrap px-5">
          <div className="header-search-item">
            <div className="search-item-img">
              <Image
                src="/images/course/bannerall/banner1"
                alt="item"
                width={120}
                height={120}
              />
            </div>
            <div className="d-flex flex-column gap-2">
              <div className="search-item-title">你號</div>
              <div className="search-item-content">你好嘛</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
