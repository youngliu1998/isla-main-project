import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import './coupon-swiper.module.scss'

const coupons = [
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

const CouponSwiper = () => {
  return (
    <div className="coupon-wrapper">
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        slidesPerView={2} // 每次顯示兩張卡片
      >
        {coupons.map((coupon) => (
          <SwiperSlide key={coupon.id}>
            <div className="coupon-card">
              <div className="coupon-title">{coupon.title}</div>
              <div className="coupon-condition">{coupon.condition}</div>
              <div className="coupon-footer">
                <span className="coupon-tag">{coupon.tag}</span>
                <button className="coupon-button">套用</button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default CouponSwiper
