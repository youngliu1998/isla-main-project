'use client'

import Image from 'next/image'
import { BsTrash } from 'react-icons/bs'
import styles from './Product-card.module.scss'
import { useState } from 'react'

export default function ProductCardCourse({
  id = 'itemCheck-course01',
  title = '臉部撥筋Ｘ耳穴按摩Ｘ芳療活絡｜現代人的 10 分鐘舒壓養顏術',
  image = '/images/cart-test/course-img.png',
  price = 1250,
  onDelete = () => {},
}) {
  return (
    <div className="card border-0">
      <div className="row g-3">
        <div className="col-md-3 d-flex">
          <div className="d-flex justify-content-center align-items-center">
            <input
              className={`${styles.checkboxInput} form-check-input me-3`}
              type="checkbox"
              id={id}
              defaultChecked
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
            {/* 商品名稱 + delete-icon */}
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <h5 className="card-title fw-normal mb-1">{title}</h5>
              </div>
              <button
                type="button"
                className="btn border-0 p-0"
                onClick={onDelete}
              >
                <BsTrash className="text-subtext fs-5" />
              </button>
            </div>

            {/* 價格與數量 */}
            <div>
              <div className="d-flex justify-content-between align-items-center mt-2">
                <span className="text-muted small">數量：1</span>
                <div>
                  {/* <del className="me-2">NT${originalPrice}</del> */}
                  <span className="h5 text-maintext">NT${price}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
