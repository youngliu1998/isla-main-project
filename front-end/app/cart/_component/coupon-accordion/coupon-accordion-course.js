'use client'
import { FaCircleChevronLeft, FaCircleChevronRight } from 'react-icons/fa6'
import styles from './coupon-accordion.module.scss'
import { useState, useEffect } from 'react'

export default function CouponAccordionCourse({ children }) {
  return (
    <>
      <div className={`accordion mb-3 ${styles.couponShadow}`} id="couponPro">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className={`accordion-button ${styles.accordionButton}`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#coupon-course"
              aria-expanded="false"
              aria-controls="coupon-course"
            >
              <div className="d-flex align-items-center text-white">
                <i className="bi bi-ticket-perforated-fill fs-5 me-2"></i>
                <h6 className="mb-0">課程優惠券</h6>
              </div>
            </button>
          </h2>

          <div
            id="coupon-course"
            className="accordion-collapse collapse "
            data-bs-parent="#couponCourse"
          >
            <div className="accordion-body">
              <div className="d-flex justify-content-between align-items-center py-3">
                <p className="text-subtext mb-0">可用的優惠券</p>
                <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn p-0 border-0 rounded-circle d-flex align-items-center justify-content-center"
                  >
                    <FaCircleChevronLeft className="fs-4 text-subtext" />
                  </button>
                  <button
                    type="button"
                    className="btn p-0 border-0 rounded-circle d-flex align-items-center justify-content-center"
                  >
                    <FaCircleChevronRight className="fs-4 text-subtext" />
                  </button>
                </div>
              </div>

              {/*/cart/page.js載入優惠券元件 將子元件內容渲染進來 */}
              <div className="row row-cols-lg-2 row-cols-1">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
