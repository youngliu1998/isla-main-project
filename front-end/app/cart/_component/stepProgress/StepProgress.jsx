'use client'

import React, { useState, useEffect } from 'react'
import styles from './StepProgress.module.scss'

export default function StepProgress({ currentStep = 1 }) {
  const getStepClass = (step) => {
    // if (step < currentStep) return styles.stepActive
    if (step === currentStep || step < currentStep) return styles.stepActive
    return styles.stepRegular
  }

  const getLineClass = (step) => {
    // step 是前一圈的編號（第1圈和第2圈中間的線是 step=1）
    // return step < currentStep ? styles.stepLineActive : styles.stepLine
    if (step === currentStep) return styles.stepLineProgress
    if (step < currentStep) return styles.stepLineActive
    return styles.stepLine
  }

  return (
    <>
      <section className="container d-none d-lg-block mb-4">
        <div className="d-flex align-items-center justify-content-center">
          {/* step1 */}
          <div className={styles.stepContainer}>
            <div className={getStepClass(1)}>1</div>
            <span className="h5 text-secondary">確認購物車</span>
          </div>
          <div className={`${getLineClass(1)} rounded-pill`}></div>
          {/* step2 */}
          <div className={styles.stepContainer}>
            <div className={getStepClass(2)}>2</div>
            <span className="h5 text-subtext">付款及運送方式</span>
          </div>
          <div className={`${getLineClass(2)} rounded-pill`}></div>
          {/* step3 */}
          <div className={styles.stepContainer}>
            <div className={getStepClass(3)}>3</div>
            <span className="h5 text-subtext">完成</span>
          </div>
        </div>
      </section>
    </>
  )
}
