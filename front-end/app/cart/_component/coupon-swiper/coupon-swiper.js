'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import styles from './coupon-swiper.module.scss'
import CouponCardCart from '../coupon-card-cart/coupon-card-cart'

const CouponSwiper = ({
  coupons = [],
  swiperRef,
  selectedCoupon,
  onSelectCoupon,
}) => {
  return (
    <div className={styles.couponWrapper}>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
        modules={[Navigation]}
        navigation
        spaceBetween={6}
        slidesPerView={2.5} // 每次顯示兩張卡片
      >
        {coupons.map((coupon) => (
          <SwiperSlide key={coupon.id}>
            <CouponCardCart
              coupon={coupon}
              selected={coupon.id === selectedCoupon?.id}
              onSelect={onSelectCoupon}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default CouponSwiper
