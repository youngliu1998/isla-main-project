'use client'

import React, { useState, useEffect } from 'react'
// ==== swiper ====
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

export default function SwiperProduct(props) {
  return (
    <>
      <div className="overflow-hidden position-relative">
        <Swiper
          // install Swiper modules
          // modules={[Pagination]}
          spaceBetween={50}
          slidesPerView={4}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
        >
          <SwiperSlide>Slide 1</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
        </Swiper>
      </div>
    </>
  )
}
