'use client'

import Image from 'next/image'
import { BsTrash } from 'react-icons/bs'
import QuantityControler from './quantity-controler'
import styles from './Product-card.module.scss'
import { useState } from 'react'

export default function ProductCardNormal({
  id = 'normal01',
  title = '[Kaja] Berry Red Lipstick',
  image = 'images/cart-test/image-01.png',
  salePrice = 860,
  basePrice = 1200,
  quantity = 1,
  onDelete = () => {},
  onQuantityChange = () => {},
}) {
  return (
    <div className="card border-0">
      <div className="row g-3">
        <div className="col-md-3">
          <div className="d-flex justify-content-center align-items-center">
            <input
              className={`${styles.checkboxInput} form-check-input`}
              type="checkbox"
              id={id}
            />
            <label htmlFor={id}>
              <Image
                src={image}
                className="img-fluid"
                width={130}
                height={130}
                alt="商品圖"
              />
            </label>
          </div>
        </div>
        <div className="col-md-9">
          <div className="card-body d-flex flex-column gap-4 gap-lg-2">
            <div className="d-flex justify-content-between">
              <h5 className="card-title fw-normal">{title}</h5>
              <button
                type="button"
                className="btn border-0 p-0"
                onClick={onDelete}
              >
                <BsTrash className="text-subtext fs-5" />
              </button>
            </div>

            {/* 數量與價格 */}
            <div className="d-flex justify-content-between align-items-center">
              <QuantityControler
                onChange={(quantity) => {
                  console.log('新數量：', quantity)
                }}
              />
              <div className="fs-5">
                <del className="me-2 h6">NT${basePrice}</del>
                <strong className="h5 text-maintext">NT${salePrice}</strong>

                {/* <strong>NT${salePrice}</strong> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
