'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import styles from './coupon-swiper.module.scss'

const CouponSwiper = ({ coupons, swiperRef }) => {
  return (
    <div className={styles.couponWrapper}>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        slidesPerView={2} // 每次顯示兩張卡片
      >
        {coupons.map((coupon) => (
          <SwiperSlide key={coupon.id}>
            <div className={styles.couponCard}>
              <div className={styles.couponTitle}>{coupon.title}</div>
              <div className={styles.couponCondition}>{coupon.condition}</div>
              <div className={styles.couponFooter}>
                <span className={styles.couponTag}>{coupon.tag}</span>
                <button className={styles.couponButton}>套用</button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default CouponSwiper
