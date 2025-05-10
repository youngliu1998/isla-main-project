'use client'

import React, { useState, useEffect } from 'react'
import StepProgress from './_component/stepProgress/StepProgress'

export default function CartPage() {
  return (
    <>
      <div className="container text-center text-lg-start mt-2">
        <h1 className="text-subtext h2 m-5">購物袋</h1>
      </div>
      <StepProgress currentStep={3} />
    </>
  )
}
