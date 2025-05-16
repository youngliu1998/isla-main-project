'use client'
import styles from './mobile-order-bar.module.scss'
import Link from 'next/link'
import { useState } from 'react'

export default function MobileOrderBar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* 黑遮罩 */}
      {open && (
        <button
          className={styles.overlay}
          onClick={() => setOpen(false)}
        ></button>
      )}

      {/* 展開明細 */}
      <div className={`${styles.detailPanel} ${open ? styles.show : ''}`}>
        <div className={styles.detailHeader}>
          <p className="fw-bold mb-0">結帳明細</p>
          <button
            className="btn-close"
            aria-label="關閉"
            onClick={() => setOpen(false)}
          ></button>
        </div>

        <div className={styles.detailBody}>
          <div className="d-flex justify-content-between mb-2">
            <p>彩妝商品</p>
            <p>NT$2500</p>
          </div>
          <div className="d-flex justify-content-between text-secondary mb-2">
            <p>Kaja 品牌優惠券</p>
            <p>-NT$375</p>
          </div>

          <div className="d-flex justify-content-between mb-2">
            <p>彩妝課程</p>
            <p>NT$1800</p>
          </div>
          <div className="d-flex justify-content-between text-secondary mb-2">
            <p>課程優惠券</p>
            <p>-NT$300</p>
          </div>

          <div className="d-flex justify-content-between mb-2">
            <p>加購商品</p>
            <p>NT$860</p>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <p>運費</p>
            <p>NT$100</p>
          </div>
          <div className="d-flex justify-content-between text-secondary mb-3">
            <p>免運優惠</p>
            <p>-NT$100</p>
          </div>

          <hr />
          <div className="d-flex justify-content-between fw-bold fs-5">
            <p>總計</p>
            <p>NT$3975</p>
          </div>
        </div>
      </div>

      {/* 固定底部欄 */}
      <div className={styles.checkoutBar}>
        <div>
          <p className="mb-1 fw-bold text-danger">NT$3975</p>
          <button
            className="btn btn-link p-0 text-muted text-decoration-none"
            onClick={() => setOpen(!open)}
          >
            已折 NT$775 明細
            <i
              className={`bi ${open ? 'bi-chevron-up' : 'bi-chevron-down'} ms-1`}
            ></i>
          </button>
        </div>
        <Link href="/cart/payment">
          <button className="btn btn-primary rounded-pill px-5">結帳</button>
        </Link>
      </div>
    </>
  )
}
