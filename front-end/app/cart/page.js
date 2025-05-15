'use client'

import styles from './_styles/cart-style.module.scss'
import StepProgress from './_component/step-progress/step-progress'
import ProductCard from './_component/product-card/product-card'
import CouponAccordion from './_component/coupon-accordion/coupon-accordion'
import CouponAccordionCourse from './_component/coupon-accordion/coupon-accordion-course'
import CouponSwiper from './_component/coupon-swiper/coupon-swiper'
import OrderSummary from './_component/order-summary/order-summary'
import MobileOrderBar from './_component/mobile-order-bar/mobile-order-bar'

import useIsMobile from './hook/useIsMobile'

import { useEffect, useState } from 'react'

// import React, { useState, useEffect, Children } from 'react'
export default function CartPage() {
  const isMobile = useIsMobile()

  const [hasMounted, setHasMounted] = useState(false)
  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) return null // 預防錯誤

  const couponDataProd = [
    {
      id: 1,
      title: '全站折$150',
      condition: '滿 $2000 可使用',
      tag: '全站',
    },
    {
      id: 2,
      title: '全站折$150',
      condition: '滿 $2000 可使用',
      tag: '全站',
    },
    {
      id: 3,
      title: '眼部彩妝系列滿兩件85折',
      condition: '滿 $2000 可使用',
      tag: '眼部彩妝',
    },
    {
      id: 4,
      title: '唇部彩妝系列滿兩件88折',
      condition: '滿 $1500 可使用',
      tag: '唇部彩妝',
    },
  ]
  const couponDataCourse = [
    {
      id: 1,
      title: '全站折$150',
      condition: '滿 $2000 可使用',
      tag: '全站',
    },
    {
      id: 2,
      title: '全站折$150',
      condition: '滿 $2000 可使用',
      tag: '全站',
    },
    {
      id: 3,
      title: '其他課程系列滿兩件85折',
      condition: '滿 $2000 可使用',
      tag: '其他課程',
    },
  ]
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
      <section
        className="container-fluid container-lg"
        style={{ paddingBottom: '50px' }}
      >
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
          <div className="col-lg-8 col-12 d-none d-lg-block"></div>
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

              {/* === Product Card group*/}
              <ProductCard type="dropDown" />
              <ProductCard type="colorDots" />

              {/* === 加購商品卡片區塊 === */}
              <div
                className="w-100 bg-subtext my-3"
                style={{ height: '1px' }}
              ></div>
              <div className="text-elem">
                <i className="bi bi-cart-check-fill me-2"></i>加購商品
              </div>
              <ProductCard type="addon" />
            </div>

            <CouponAccordion>
              {/* 載入商品優惠券元件 */}
              <CouponSwiper coupons={couponDataProd} />
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
              <CouponSwiper coupons={couponDataCourse} />
            </CouponAccordionCourse>
          </div>
          <div className="col-lg-4 col-12">{!isMobile && <OrderSummary />}</div>
          {isMobile && <MobileOrderBar />}
        </div>
      </section>
    </>
  )
}
