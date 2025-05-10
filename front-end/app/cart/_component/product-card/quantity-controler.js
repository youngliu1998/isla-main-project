'use client'
import { BsDashCircleFill, BsPlusCircleFill } from 'react-icons/bs'
import Swal from 'sweetalert2'
import React, { useState } from 'react'

export default function QuantityControler({
  max = 10,
  min = 1,
  onChange = () => {},
}) {
  const [count, setCount] = useState(1)
  const [isDisable, setIsDisable] = useState(false)
  const minHandler = () => {
    if (count > min) {
      const newCount = count - 1
      setCount(newCount)
      setIsDisable(false)
      onChange(newCount)
    }
  }
  const plusHandler = () => {
    if (count < max) {
      const newCount = count + 1
      setCount(newCount)
      onChange(newCount)
    } else {
      Swal.fire({
        icon: 'warning',
        title: '庫存不足',
        text: '如需大量採購，請聯絡客服協助您處理。',
        showCancelButton: true,
        confirmButtonText: '聯絡客服',
        cancelButtonText: '我知道了',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = 'mailto: isla.supple@isla.com'
        } else {
          setIsDisable(true)
        }
      })
    }
  }
  return (
    <div className="d-flex justify-content-center align-items-center">
      <button
        className="btn border-0"
        onClick={minHandler}
        disabled={count <= min}
      >
        <BsDashCircleFill className="text-subtext" />
      </button>
      <span>{count}</span>
      <button
        className="btn border-0"
        onClick={plusHandler}
        disabled={isDisable}
      >
        <BsPlusCircleFill className="text-subtext" />
      </button>
    </div>
  )
}
