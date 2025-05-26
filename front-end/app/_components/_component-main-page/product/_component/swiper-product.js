'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

// import './styles.css';

// import required modules
import { Pagination } from 'swiper/modules'

export default function SwiperProduct() {
  return (
    <>
      {/* <Swiper
        // onSwiper={(swiper) => {
        //   swiperRef.current = swiper
        // }}
        modules={[Navigation]}
        navigation
        spaceBetween={6}
        breakpoints={{
          0: {
            slidesPerView: 1.1,
            spaceBetween: 10,
          },
          420: {
            slidesPerView: 1.2,
            spaceBetween: 12,
          },
          768: {
            slidesPerView: 2.5,
            spaceBetween: 14,
          },
          992: {
            slidesPerView: 1.8,
            // spaceBetween: 18,
          },
          1200: {
            slidesPerView: 2.3,
            spaceBetween: 20,
          },
        }}
      >
        <SwiperSlide>slide1 </SwiperSlide>
        <SwiperSlide>slide2 </SwiperSlide>
        <SwiperSlide>slide3 </SwiperSlide>
      </Swiper> */}
    </>
  )
}
