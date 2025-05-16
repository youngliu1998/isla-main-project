'use client'
import { useState } from 'react'
import Link from 'next/link'
import confetti from 'canvas-confetti'
import Image from 'next/image'
import CouponButton from './coupon-button'
import dayjs from 'dayjs'

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

export default function CouponCard({
  title = '',
  description = '',
  brand_id = '',
  coupon_id = '',
  course_categories_id = '',
  user_id = '',
  couponstyle = '',
  valid_to = '',
  area = '',
  claimed_at = null,
  state_id = 0,
  isLogin = () => {},
}) {
  const [get, setGet] = useState(claimed_at ? true : false)
  const [loading, setLoading] = useState(false)

  const validDay = dayjs(valid_to)
  const now = dayjs()
  const isSoonExpired = state_id === 1 && validDay.diff(now, 'day') <= 3

  // 是否已領取
  const isClaimed = get || state_id === 1

  const alreadyGet = async () => {
    if (get || loading) return
    if (!user_id) {
      isLogin()
      return
    }

    setLoading(true)
    try {
      const token = localStorage.getItem('jwtToken')
      const res = await fetch(
        'http://localhost:3005/api/coupon/products/claim',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ user_id, coupon_id }),
        }
      )

      const result = await res.json()
      if (res.ok) {
        setGet(true)
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.7 } })
      } else {
        alert(result.message || '領取失敗，請稍後再試')
      }
    } catch (error) {
      console.error('領取錯誤:', error)
      alert('系統錯誤')
    }
    setLoading(false)
  }

  let buttonText = ''
  let isDisabled = false

  if (isClaimed) {
    buttonText = '前往使用'
  } else if (state_id === 2) {
    buttonText = '已使用'
    isDisabled = true
  } else if (state_id === 3) {
    buttonText = '已過期'
    isDisabled = true
  } else {
    buttonText = loading ? '領取中' : '領取'
  }

  const imageKey =
    area === 2 ? courseMap[course_categories_id] : brandMap[brand_id]
  const imageSrc = `/images/coupon/${imageKey}.png`
  const goUrl = area === 2 ? '/courses' : '/product'

  return (
    <div>
      <div
        className={`coupon mt-lg-4 mb-lg-3 d-flex flex-nowrap justify-content-between mx-auto position-relative ${
          isClaimed ? 'stamping' : ''
        }`}
      >
        {/* 圖片 */}
        <div className="d-flex align-items-center flex-shrink-1">
          <div
            style={{ width: '160px' }}
            className="d-flex justify-content-center"
          >
            <Image
              src={imageSrc}
              alt={`${imageKey} LOGO`}
              width={130}
              height={130}
              className="img-fluid"
            />
          </div>
        </div>

        {/* 文字內容 */}
        <div className="content flex-shrink-0 ps-lg-0 ps-xl-2 pe-lg-4 pe-xl-2">
          <div className="top">
            <h2 className="text-truncate">{title}</h2>
          </div>
          <div className="bottom">
            <p className="main-text fw-medium pb-2">{description}</p>
            <p className="main-text mb-0 fw-light">有效至 {valid_to}</p>
          </div>
        </div>

        {/* 按鈕區塊 */}
        {isClaimed ? (
          <Link
            href={goUrl}
            className={`d-flex align-items-center flex-shrink-0 ${couponstyle}`}
          >
            <CouponButton text={buttonText} />
          </Link>
        ) : (
          <button
            className={`d-flex align-items-center flex-shrink-0 ${couponstyle}`}
            onClick={alreadyGet}
            disabled={loading || isDisabled}
          >
            <CouponButton text={buttonText} />
          </button>
        )}

        {/* 領取印章 */}
        <div className={`stamp-img-container ${isClaimed ? 'show' : ''}`}>
          <Image
            src="/images/coupon/get-stamp.png"
            alt="已領取"
            width={180}
            height={180}
            className="stamp-img"
          />
        </div>
      </div>
    </div>
  )
}
