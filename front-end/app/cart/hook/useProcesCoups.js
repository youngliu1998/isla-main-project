//傳入一批優惠券、購物車資料 → 回傳每張券的is_applicable 結果

import { checkCouponStatus } from '../utils/coupon-helper'
import { useEffect, useState } from 'react'

export default function useProcesCoups(
  coupons = [],
  cartItems = [],
  checkedItems = {},
  totalAmount = 0
) {
  const [processedCoupons, setProcessedCoupons] = useState([])

  useEffect(() => {
    const selectedItems = cartItems.filter((item) => checkedItems[item.id])
    const updated = coupons.map((coupon) => {
      const status = checkCouponStatus(coupon, selectedItems, totalAmount)
      return { ...coupon, ...status }
    })
    setProcessedCoupons(updated)
  }, [coupons, cartItems, checkedItems, totalAmount])

  return processedCoupons
}
