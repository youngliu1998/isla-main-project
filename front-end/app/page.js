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
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'

import 'swiper/css' // 必要
// import 'swiper/css/navigation' // 如果用導航
import 'swiper/css/pagination' // 如果用分頁

// import 'swiper/swiper.min.css'
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
  const [hasShownAnimation, setHasShownAnimation] = useState(false)

  const images = [
    'http://localhost:3005/images/ad/isla-ad.001.jpeg',
    'http://localhost:3005/images/ad/isla-ad.002.jpeg',
    'http://localhost:3005/images/ad/isla-ad.003.jpeg',
    'http://localhost:3005/images/ad/isla-ad4.png',
    'http://localhost:3005/images/ad/isla-ad.005.jpeg',
  ]

  const router = useRouter()
  // const handleForumTab = () => {}

  // 檢查是否第一次進入 localStorage
  useEffect(() => {
    const seen = localStorage.getItem('hasSeenHomeAnimation')
    if (seen) {
      setHasShownAnimation(true)
      setShowMain(true)
    }
  }, [])

  const handleFinishAnimation = () => {
    localStorage.setItem('hasSeenHomeAnimation', 'true')
    setShowMain(true)
  }

  if (!hasShownAnimation && !showMain) {
    return <HomeAnimationSplash onFinish={handleFinishAnimation} />
  }

  return (
    <>
      <div>
        {/* banner */}
        {/* <MainBanner /> */}
        <div className="w-100 main-page-swiper-contrainer">
          <Swiper
            speed={1300}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            spaceBetween={10}
            modules={[Autoplay, Pagination]}
            pagination={{ clickable: true }}
            // className="mySwiper"
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            className="main-page-main-swiper"
          >
            {images.map((src, index) => (
              <SwiperSlide
                key={index}
                className="d-flex justify-content-center"
                style={{
                  width: '90vw', // 使用 viewport 寬度
                  maxWidth: '1100px', // 限制最大寬
                  height: 'auto', // 高度交給內部 div 控制
                }}
              >
                <div
                  className="position-relative w-100 overflow-hidden"
                  style={{
                    paddingTop: '56.25%', // 高度用 padding 百分比技巧維持 16:9（56.25%）
                  }}
                >
                  <Image
                    src={src}
                    alt={`Slide ${index}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

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
