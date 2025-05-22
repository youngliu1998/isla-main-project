// cart/_component/coupon-card-cart.js
import Image from 'next/image'
import { FaCheck } from 'react-icons/fa'
import styles from './coupon-card-cart.module.scss'

import { useState } from 'react'

export default function CouponCardCart({ coupon, onSelect, selected }) {
  const {
    title,
    condition,
    brand_id,
    area,
    course_categories_id,
    is_applicable,
    block_reason,
  } = coupon

  const brandMap = {
    0: 'isla',
    1: 'unleashia',
    2: 'cosnori',
    3: 'muzigae',
    4: 'kaja',
    5: 'rom&nd',
    6: 'apieu',
  }
  const courseMap = {
    0: 'isla-class',
    1: 'korean-class',
    2: 'professional-class',
    3: 'daily-class',
    4: 'other-class',
  }

  const imageKey =
    area === 2 ? courseMap[course_categories_id] : brandMap[brand_id]
  const imageSrc = `/images/coupon/${imageKey}.png`

  const [isAnimating, setIsAnimating] = useState(false)

  const handleClick = () => {
    // if (is_applicable) {
    //   setIsAnimating(true)
    //   onSelect(coupon)
    //   setTimeout(() => setIsAnimating(false), 500) // 結束動畫
    // }
    if (!is_applicable) return

    if (!selected) {
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 500)
    }

    onSelect(coupon)
  }

  const cardClass = [
    styles.couponCart,
    selected && styles.selected,
    !is_applicable && styles.disabled,
    isAnimating && styles.tearAnimation,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={`${cardClass} d-flex align-items-center justify-content-between`}
    >
      {/* 品牌圖示 */}
      <div className={styles.brandLogo}>
        <Image src={imageSrc} alt="brand" width={80} height={80} />
      </div>

      {/* 文字 */}
      <div className={`${styles.content} ms-4`}>
        <h5 className="mb-1">{title}</h5>
        <p className="mb-0">{condition}</p>
      </div>

      <div>
        <button
          className={`${styles.circleBtn} ${selected ? styles.active : ''}`}
          disabled={!is_applicable}
          onClick={handleClick}
        >
          {selected && <FaCheck className={styles.checkIcon} />}
        </button>
      </div>
    </div>
  )
}
