'use client'
import { useState } from 'react'
import '../_components/coupon.css'
import Link from 'next/link'

const questions = [
  {
    title: '您的膚質？',
    type: 'single',
    options: ['油性肌膚', '乾性肌膚', '敏感肌膚', '混合肌膚'],
  },
  {
    title: '您喜愛的品牌？',
    type: 'single',
    options: ['kaja', 'rom&nd', 'unleashia', 'COSNORI', "A'pieu", 'MUZIGAE'],
  },
  {
    title: '近日想購買的產品？',
    type: 'single',
    options: ['眼影', '口紅', '唇蜜', '粉底', '氣墊粉餅'],
  },
]

export default function CreatePage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState(Array(questions.length).fill(''))

  const handleOptionClick = (value) => {
    const newAnswers = [...answers]
    newAnswers[currentStep] = value
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleSubmit = async () => {
    const [skin, brand, product] = answers

    const skinTypeId = {
      油性肌膚: 1,
      乾性肌膚: 2,
      敏感肌膚: 3,
      混合肌膚: 4,
    }[skin]

    const brandId = {
      kaja: 5,
      'rom&nd': 6,
      unleashia: 1,
      COSNORI: 3,
      "A'pieu": 2,
      MUZIGAE: 4,
    }[brand]

    const categoryId = {
      眼影: 1,
      口紅: 2,
      唇蜜: 3,
      粉底: 4,
      氣墊粉餅: 5,
    }[product]

    const user_id = 1 // 測試用，實際應該從登入狀態取得

    try {
      const res = await fetch(
        'http://localhost:3005/api/coupon/products/member',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id,
            brand_id: brandId,
            category_id: categoryId,
            skin_type_id: skinTypeId,
          }),
        }
      )

      const result = await res.json()
      if (result.status === 'success') {
        alert('已成功建立您的專屬優惠券')
      } else {
        alert('建立失敗，請稍後再試')
      }
    } catch (error) {
      console.error('送出錯誤:', error)
      alert('系統錯誤')
    }
  }

  const currentQuestion = questions[currentStep]
  const progress = ((currentStep + 1) / questions.length) * 100

  return (
    <>
      {/* Progress */}
      <div className="progress mb-4" style={{ height: 10 }}>
        <div
          className="progress-bar bg-warning"
          role="progressbar"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="container">
        {/* 略過連結 */}
        <div className="text-center mb-3">
          <small className="text-muted">
            第 {currentStep + 1} / 共 {questions.length} 題
          </small>
          <div>
            <Link href="/" className="sub-text text-decoration-none fs-5">
              略過
            </Link>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-5 pt-4">
          <h3 className="main-color mb-0">歡迎加入 ISLA 🥳</h3>
          <h3 className="main-color mb-5">創造出屬於您的優惠券</h3>
          <h6 className="main-text">
            請告訴我們您的膚質狀況，我們將推薦相關商品給您!
          </h6>
        </div>

        {/* Question */}
        <section className="py-4 text-center">
          <h4 className="brown-text fw-bold mb-5">{currentQuestion.title}</h4>
          <div className="row justify-content-center g-3 mb-5">
            {currentQuestion.options.map((opt, i) => (
              <div key={i} className="col-6 col-sm-4 col-md-3 col-lg-2">
                <button
                  type="button"
                  className={`brand-card w-100 ${answers[currentStep] === opt ? 'active' : ''}`}
                  onClick={() => handleOptionClick(opt)}
                >
                  {opt}
                </button>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="d-flex justify-content-center gap-3">
            {currentStep > 0 && (
              <button
                className="next-color btn-prev px-5 py-2"
                onClick={handlePrev}
              >
                上一題
              </button>
            )}
            {currentStep < questions.length - 1 ? (
              <button
                className="next-color btn-next px-5 py-2"
                onClick={handleNext}
              >
                下一題
              </button>
            ) : (
              <button
                className="next-color btn-next btn-submit px-5 py-2"
                onClick={handleSubmit}
              >
                生成專屬優惠券
              </button>
            )}
          </div>
        </section>
      </div>
    </>
  )
}
