'use client'
import { useState } from 'react'
import confetti from 'canvas-confetti'
import Image from 'next/image'
import CouponButton from './coupon-button'
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
}) {
  const [get, setGet] = useState(false)
  const [loading, setLoading] = useState(false)

  const alreadyGet = async () => {
    console.log('領取請求資料：', { user_id, coupon_id })

    if (get || loading) return

    // if (!user_id || !coupon_id) {
    //   alert('缺少 user_id 或 coupon_id，無法領取')
    //   return
    // }

    setLoading(true)

    try {
      const res = await fetch(
        'http://localhost:3005/api/coupon/products/claim',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id,
            coupon_id,
          }),
        }
      )

      if (res.ok) {
        setGet(true)
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.7 },
        })
      } else {
        console.error('領取失敗')
        alert('領取失敗，請稍後再試')
      }
    } catch (error) {
      console.error('寫入錯誤', error)
      alert('系統錯誤')
    }

    setLoading(false)
  }
  // const brandImg = brandMap[brand_id] || 'default'
  const imageKey =
    area === 2 ? courseMap[course_categories_id] : brandMap[brand_id]
  const imageSrc = `/images/coupon/${imageKey}.png`
  return (
    <>
      {/* 可領取的 coupon */}
      <div>
        <div
          className={`coupon mt-lg-4 mb-lg-3 d-flex flex-nowrap justify-content-between mx-auto position-relative ${
            get ? 'stamping' : ''
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
                // onError={(e) => {
                //   e.currentTarget.src = '/images/coupon/default.png'
                // }}
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
              <p className="main-text mb-0 fw-light">有效至{valid_to}</p>
            </div>
          </div>

          {/* 按鈕 */}
          <button
            className={
              'd-flex align-items-center flex-shrink-0' + ' ' + couponstyle
            }
            onClick={alreadyGet}
            disabled={loading}
          >
            <CouponButton
              text={get ? '前往使用' : loading ? '領取中' : '領取'}
            />
          </button>

          {/* 印章圖 */}
          <div className={`stamp-img-container ${get ? 'show' : ''}`}>
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
    </>
  )
}
