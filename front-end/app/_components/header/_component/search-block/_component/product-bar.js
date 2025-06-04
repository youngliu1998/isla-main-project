'use client'

import Image from 'next/image'
import Link from 'next/link'
// ==== route ====
import { PRODUCT_IMG_URL } from '@/_route/img-url'

export default function ProductBar({
  product = { brand: 'eee', title: 'weeeeeee', price: 3000 },
}) {
  return (
    <>
      {/* === card ==== */}
      <div className="header-search-item for-product">
        {/* === product image ==== */}
        <div className="search-item-img">
          <Image
            src={PRODUCT_IMG_URL + product.productImg}
            alt="item"
            width={65}
            height={65}
          />
        </div>
        {/* === title & price ... ==== */}
        <div className="d-flex flex-column gap-2">
          <div className="search-item-title">
            <Link href="">{product.title}</Link>
          </div>
          <div className="d-flex justify-content-between w-100">
            <div className="search-item-brand">{product.brand}</div>
            <div className="search-item-price">{product.price}</div>
          </div>
        </div>
      </div>
    </>
  )
}
