'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
// ==== compoents ====
import Componentstab from '@/app/_components/tab'
import ProductCard from '@/app/product/_components/product-card-s'

export default function ProductSectionNew() {
  const [productCard, setProductCard] = useState([]) // 課程資料
  // ==== tab settin ====
  const brands = [
    'Unleashia',
    'COSLORI',
    'MUZIGAE MANSION',
    'Rom&nd',
    'Kaja',
    "A'Piuw",
  ]
  // ==== END tab settin ====
  const [tabSwitch, setTabSwitch] = useState(1)
  useEffect(() => {})
  return (
    <>
      <div className="d-flex flex-column align-items-center">
        <div className="d-flex flex-column align-items-center gap-4">
          <h3>新進商品</h3>
          <Componentstab cates={brands} handleTabChange={setTabSwitch} />
        </div>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-lg-4 g-4 p-0 m-0 mt-4">
          {tabSwitch === 1 &&
            productCard.slice(0, 4).map((v, i) => {
              return <ProductCard key={i} />
            })}
          {tabSwitch === 2}
        </div>
        <Link href="/course">
          <button className="btn btn-primary">查看更多</button>
        </Link>
      </div>
    </>
  )
}
