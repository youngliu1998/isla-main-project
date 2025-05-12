'use client'

import styles from './order-summary.module.scss'
import Link from 'next/link'
import { Collapse } from 'react-bootstrap'

import { useState } from 'react'

export default function OrderSummary() {
  const [openProducts, setOpenProducts] = useState(false)
  const [openCourses, setOpenCourses] = useState(false)

  return (
    <div className={`${styles.orderSummary} card-style mb-3`}>
      <h5 className="fw-bold mb-5 text-maintext text-center">訂單明細</h5>

      {/* 彩妝商品區 */}
      <div className="d-flex justify-content-between text-subtext mb-2">
        <div className="d-flex align-items-center">
          <p className="me-2">彩妝商品</p>
          <button
            type="button"
            className="btn btn-link p-0 text-center"
            onClick={() => setOpenProducts(!openProducts)}
            aria-expanded={openProducts}
          >
            <i className="bi bi-caret-down-fill text-subtext"></i>
          </button>
        </div>
        <p>
          <strong>NT$2500</strong>
        </p>
      </div>
      <Collapse in={openProducts}>
        <div>
          <div className="d-flex justify-content-between text-elem mb-2">
            <p>[Kaja] Crystal Glam Tint</p>
            <p>NT$1250</p>
          </div>
          <div className="d-flex justify-content-between text-elem mb-2">
            <p>[Kaja] Crystal XXX XXX</p>
            <p>NT$1250</p>
          </div>
        </div>
      </Collapse>

      <div className="d-flex justify-content-between text-secondary mb-2">
        <p>Kaja品牌專屬優惠券85折</p>
        <p>-NT$375</p>
      </div>

      {/* 彩妝課程區 */}
      <div className="d-flex justify-content-between text-subtext mb-2">
        <div className="d-flex align-items-center">
          <p className="me-2">彩妝課程</p>
          <button
            type="button"
            className="btn btn-link p-0 text-center"
            onClick={() => setOpenCourses(!openCourses)}
            aria-expanded={openCourses}
          >
            <i className="bi bi-caret-down-fill text-subtext"></i>
          </button>
        </div>
        <p>
          <strong>NT$1800</strong>
        </p>
      </div>
      <Collapse in={openCourses}>
        <div>
          <div className="d-flex justify-content-between text-elem mb-2">
            <p
              className={styles.ellipsis}
              title="臉部撥筋Ｘ耳穴按摩Ｘ芳療活絡｜現代人的 10 分鐘舒壓養顏術"
            >
              臉部撥筋Ｘ耳穴按摩Ｘ芳療活絡｜現代人的 10 分鐘舒壓養顏術
            </p>
            <p>NT$1800</p>
          </div>
        </div>
      </Collapse>

      <div className="d-flex justify-content-between text-secondary mb-2">
        <p>指定彩妝課程折$300元</p>
        <p>-NT$300</p>
      </div>

      <div className={`${styles.divider} mb-3`}></div>

      {/* 加購商品 */}
      <div className="d-flex justify-content-between text-subtext mb-2">
        <p>加購商品</p>
        <p>NT$860</p>
      </div>
      <div className="d-flex justify-content-start align-items-center mb-2 gap-2">
        <h6 className="text-elem fw-normal">[Kaja] Berry Red Lipstick</h6>
        <div
          className="color-dot"
          style={{ backgroundColor: '#e71e1e' }}
          title="莓果紅"
        ></div>
        <span className="badge bg-elem">700 ml</span>
      </div>

      {/* 運費與優惠 */}
      <div className="d-flex justify-content-between text-subtext mb-2">
        <p>運費</p>
        <p>NT$100</p>
      </div>
      <div className="d-flex justify-content-between text-secondary mb-2">
        <p>滿$NT3000元免運券</p>
        <p>-NT$100</p>
      </div>

      <div className={`${styles.divider} mb-4`}></div>

      {/* 總計 */}
      <div className="d-flex justify-content-between mb-3">
        <h4>總計：</h4>
        <h4>
          <strong>NT$3975</strong>
        </h4>
      </div>

      <div className="w-100 d-flex justify-content-end">
        <Link href="/payment">
          <button className="btn btn-primary text-white">結帳</button>
        </Link>
      </div>
    </div>
  )
}
