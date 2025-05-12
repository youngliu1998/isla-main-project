// 儲存到 localStorage 的功能 這樣切換頁面不會重置
import { useState } from 'react'

export default function useCouponFilter() {
  const [currentType, setCurrentType] = useState(' ')
  const [showClaimed, setShowClaimed] = useState(false)

  return {
    currentType,
    setCurrentType,
    showClaimed,
    setShowClaimed,
  }
}
