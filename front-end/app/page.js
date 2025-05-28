'use client'

import Image from 'next/image'
import Link from 'next/link'
import Componentstab from './_components/tab'
// ==== section component ====
// import ImageSlider from '@/app/_components/_component-main-page/banner-2/image-slider'
import MainBanner from './_components/_component-main-page/banner/main-banner'
import CourseSection from '@/app/_components/_component-main-page/course/course-section'
import ForumSection from '@/app/_components/_component-main-page/forum/forum-section'
import MainCouponSection from '@/app/_components/_component-main-page/coupon/main-coupon-section'
import CouponSection from '@/app/_components/_component-main-page/coupon/coupon-section'
import ProductSectionBrand from '@/app/_components/_component-main-page/product/product-section-brand'
import ProductSectionNew from '@/app/_components/_component-main-page/product/product-section-new'
// ==== END section component ====
// ==== css ====
import './_styles/main-page.css'
// ==== react hooks ====
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
// ==== home animation by song ====
import HomeAnimationSplash from './home-animation/splash'

export default function Home() {
  const [showMain, setShowMain] = useState(false)

  const router = useRouter()
  // const handleForumTab = () => {}

  if (!showMain)
    return <HomeAnimationSplash onFinish={() => setShowMain(true)} />

  return (
    <>
      <div>
        {/* banner */}
        <MainBanner />
        {/* <ImageSlider /> */}
        {/* main page */}
        <section className="section-main-page">
          {/* ---- START product ---- */}
          <section className="subsection-main-page">
            <ProductSectionBrand />
          </section>
          <section className="subsection-main-page">
            <ProductSectionNew />
          </section>
          {/* ---- END product ---- */}
          {/* ---- START main coupon ---- */}
          <section className="subsection-main-page">
            <MainCouponSection />
          </section>
          {/* ---- END main coupon ---- */}
          {/* ---- START course ---- */}
          <section className="container subsection-main-page">
            <CourseSection />
          </section>
          {/* ==== END course ==== */}
          {/* ==== START coupons ==== */}
          <section className="subsection-main-page">
            <CouponSection />
          </section>
          {/* ==== END coupons ==== */}
          {/* ==== START forum ==== */}
          <section className="container subsection-main-page">
            <ForumSection />
          </section>
          {/* ---- END forum ---- */}
        </section>
      </div>
    </>
  )
}
