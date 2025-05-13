'use client'

import styles from './_styles/cart-style.module.scss'
import StepProgress from './_component/step-progress/step-progress'
import ProductCard from './_component/product-card/product-card'
import CouponAccordion from './_component/coupon-accordion/coupon-accordion'
import CouponAccordionCourse from './_component/coupon-accordion/coupon-accordion-course'
import OrderSummary from './_component/order-summary/order-summary'

import React, { useState, useEffect, Children } from 'react'
export default function CartPage() {
  return (
    <>
      <section className="container text-center text-lg-start mt-2">
        <h1 className="text-subtext h2 m-5">購物袋</h1>
      </section>
      {/* step-icon */}
      <section className="container d-none d-lg-block mb-4">
        <StepProgress currentStep={1} />
      </section>

      {/* main */}
      <section className="container-fluid container-lg">
        <div className="row gy-5">
          <div className="col-lg-4 col-12">
            <div className="form-check m-4 ">
              <input
                className={`form-check-input me-2 ${styles.checkboxInput}`}
                type="checkbox"
                id="allCheck"
              />
              <label htmlFor="allCheck" className="text-subtext">
                選取所有
              </label>
            </div>
          </div>
          <div className="col-lg-8 col-12"></div>
        </div>

        <div className="row gy-5">
          <div className="col-lg-8 col-12">
            <div className="card-style mb-4 p-4">
              <div className="form-check mb-3 ms-1">
                <input
                  className={`form-check-input me-2 ${styles.checkboxInput}`}
                  type="checkbox"
                  id="productCheck"
                  name="productCheck"
                />
                <label htmlFor="productCheck" className="text-primary">
                  彩妝商品
                </label>
              </div>

              {/* === Product Card 01（dropdown）=== */}
              <ProductCard type="dropDown" />

              {/* === Product Card 02（color dots）=== */}
              <ProductCard type="colorDots" />

              {/* === 加購商品卡片區塊 === */}
              <div
                className="w-100 bg-subtext my-3"
                style={{ height: '1px' }}
              ></div>
              <div className="text-elem">
                <i className="bi bi-cart-check-fill me-2"></i>加購商品
              </div>

              {/* === Product Card 03（加購商品、折扣badge）=== */}
              <ProductCard type="addon" />
            </div>

            <CouponAccordion>
              {/* 載入商品優惠券元件 */}
              <div className="col">
                <div className="card p-3 coupon-shadow">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="mb-0 fw-bold text-primary">全站折$150</h6>
                    <span className="badge bg-warning text-dark">全站</span>
                  </div>
                  <p className="text-subtext mb-2">滿 $2000 可使用</p>
                  <div className="d-flex justify-content-end">
                    <button className="btn btn-outline-primary btn-sm">
                      套用
                    </button>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card p-3 coupon-shadow">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="mb-0 fw-bold text-primary">全站折$150</h6>
                    <span className="badge bg-warning text-dark">全站</span>
                  </div>
                  <p className="text-subtext mb-2">滿 $2000 可使用</p>
                  <div className="d-flex justify-content-end">
                    <button className="btn btn-outline-primary btn-sm">
                      套用
                    </button>
                  </div>
                </div>
              </div>
            </CouponAccordion>

            <div className="card-style mb-3 p-4">
              {/* 課程篩選 Checkbox */}
              <div className="form-check mb-3">
                <input
                  className={`form-check-input me-2 ${styles.checkboxInput}`}
                  type="checkbox"
                  id="courseCheck"
                />
                <label htmlFor="courseCheck" className="text-primary">
                  彩妝課程
                </label>
              </div>
              {/* === Product Card Course === */}
              <ProductCard type="course" />
            </div>
            <CouponAccordionCourse>
              {/* 載入課程優惠券元件 */}
              <div className="col">
                <div className="card p-3 coupon-shadow">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="mb-0 fw-bold text-primary">全站折$150</h6>
                    <span className="badge bg-warning text-dark">全站</span>
                  </div>
                  <p className="text-subtext mb-2">滿 $2000 可使用</p>
                  <div className="d-flex justify-content-end">
                    <button className="btn btn-outline-primary btn-sm">
                      套用
                    </button>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card p-3 coupon-shadow">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="mb-0 fw-bold text-primary">全站折$150</h6>
                    <span className="badge bg-warning text-dark">全站</span>
                  </div>
                  <p className="text-subtext mb-2">滿 $2000 可使用</p>
                  <div className="d-flex justify-content-end">
                    <button className="btn btn-outline-primary btn-sm">
                      套用
                    </button>
                  </div>
                </div>
              </div>
            </CouponAccordionCourse>
          </div>
          <div className="col-lg-4 col-12">
            <OrderSummary />
          </div>
          <div className="d-block d-lg-none" style={{ height: '850px' }}></div>
        </div>
      </section>
    </>
  )
}
