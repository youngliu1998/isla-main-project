'use client'

import React, { useState, useEffect } from 'react'
import styles from './step-progress.module.scss'

export default function StepProgress({ currentStep = 1 }) {
  // stepCircle
  const getStepClass = (step) => {
    if (step === currentStep || step < currentStep) return styles.stepActive
    return styles.stepRegular
  }
  // stepBar
  const getLineClass = (step) => {
    if (step === currentStep) return styles.stepLineProgress
    if (step < currentStep) return styles.stepLineActive
    return styles.stepLine
  }
  // stepText
  const getTextClass = (step) => {
    if (step === currentStep || step < currentStep) return 'text-secondary'
    return 'text-subtext'
  }

  return (
    <>
      <section className="container d-none d-lg-block mb-4">
        <div className="d-flex align-items-center justify-content-center">
          {/* step1 */}
          <div className={styles.stepContainer}>
            <div className={getStepClass(1)}>1</div>
            <span className={`h5 ${getTextClass(1)}`}>確認購物車</span>
          </div>
          <div className={`${getLineClass(1)} rounded-pill`}></div>
          {/* step2 */}
          <div className={styles.stepContainer}>
            <div className={getStepClass(2)}>2</div>
            <span className={`h5 ${getTextClass(2)}`}>付款及運送方式</span>
          </div>
          <div className={`${getLineClass(2)} rounded-pill`}></div>
          {/* step3 */}
          <div className={styles.stepContainer}>
            <div className={getStepClass(3)}>3</div>
            <span className={`h5 ${getTextClass(3)}`}>完成</span>
          </div>
        </div>
      </section>
    </>
  )
}
