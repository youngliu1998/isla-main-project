'use client'

import Image from 'next/image'
import styles from './Product-card.module.scss'
import { BsTrash } from 'react-icons/bs'
import QuantityControler from './quantity-controler'
import React, { useState } from 'react'

export default function ProductCardDropdown({
  id = 'itemCheck01',
  title = '[Kaja] Crystal Glam Tint',
  image = '/images/cart-test/top1.jpg',
  price = '1250',
  options = ['OVERTAKE南瓜盤', 'GINGER茶棕盤', 'ROSE乾燥玫瑰'],
  onDelete = () => {},
}) {
  return (
    <>
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
            <div className="card-body d-flex flex-column gap-1 gap-lg-2">
              <div className="d-flex justify-content-between">
                <h5 className="card-title fw-normal">{title}</h5>
                <button
                  type="button"
                  className="btn border-0 p-0"
                  onClick={onDelete}
                >
                  <BsTrash className="text-subtext fs-5" />
                  {/* <i className="bi bi-trash text-subtext fs-5"></i> */}
                </button>
              </div>

              {/* 下拉選單 */}
              <div>
                <select
                  className={`${styles.cardSelect} form-select form-select-sm w-auto`}
                >
                  {options.map((opt, index) => (
                    <option key={index}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* 數量與價格 */}
              <div className="d-flex justify-content-between align-items-center">
                <QuantityControler
                  onChange={(quantity) => {
                    console.log('新數量：', quantity)
                  }}
                />
                <div className="fs-5">
                  <strong>NT${price}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
