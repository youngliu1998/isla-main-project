'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Email from './_component/email'
import Otp from './_component/otp'
import { toast } from 'react-toastify'
import LoadingLottie from '@/app/_components/loading/lottie-loading'
// ==== css ====
import '../_component/_style.css/form.css'
import './_style/forget-password.css'

export default function ForgetPasswordPage() {
  const router = useRouter()
  // ==== email 設定 ==== (因為兩個component都使用，因此放在首層)
  const defaultEmail = { email: '' }
  const [email, setEmail] = useState({ ...defaultEmail })
  const [error, setError] = useState({ ...defaultEmail })
  // ==== 頁數設定 ====
  const [step, setStep] = useState(1)
  const prev = () => {
    if (step === 1) router.push('/member/login')
    if (step > 0) setStep((prev) => prev - 1)
  }

  // console.log(step)
  if (step < 1) {
    return (
      <div className="loading-container">
        <LoadingLottie />
      </div>
    )
  }
  return (
    <>
      <div className="card-glass-linear login-panel forget-panel">
        <button className="forget-prev-step-btn" onClick={prev}>
          {step === 1 ? '登入' : '上一步'}
        </button>
        <h3 className="text-primary">忘記密碼</h3>
        {step === 1 && (
          <Email
            setStep={setStep}
            email={email}
            setEmail={setEmail}
            defaultEmail={defaultEmail}
            error={error}
            setError={setError}
          />
        )}
        {step === 2 && <Otp setStep={setStep} email={email} />}
        {/* {step === 3 && <Password />} */}
      </div>
    </>
  )
}
