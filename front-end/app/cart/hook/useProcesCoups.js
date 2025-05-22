//傳入一批優惠券、購物車資料 → 回傳每張券的is_applicable 結果

import { checkCouponStatus } from '../utils/coupon-helper'
import { useEffect, useState } from 'react'

export default function useProcesCoups(
  coupons = [],
  cartItems = [],
  checkedItems = {},
  totalAmount = 0
) {
  const [procesCoups, setProcesCoups] = useState([])

  useEffect(() => {
    const selectedItems = cartItems.filter((item) => checkedItems[item.id])

    // console.log('checkedItems:', checkedItems)
    // console.log('selectedItems:', selectedItems)

    // 只看 Kaja 品牌 (brand_id = 5) 的商品
    // const kajaItems = selectedItems.filter((i) => String(i.brand_id) === '5')
    // const kajaTotal = kajaItems.reduce(
    //   (sum, item) => sum + (item.sale_price ?? item.base_price) * item.quantity,
    //   0
    // )
    // console.log('[Kaja 品牌] 勾選商品：', kajaItems)
    // console.log('[Kaja 品牌] 勾選商品總金額：', kajaTotal)

    const selectedTotalAmount = selectedItems.reduce(
      (sum, item) => sum + (item.sale_price ?? item.base_price) * item.quantity,
      0
    )
    const updated = coupons.map((coupon) => {
      console.log('當前coupon:', coupon)
      const status = checkCouponStatus(
        coupon,
        selectedItems,
        selectedTotalAmount
      )
      // console.log('優惠券：', coupon.title)
      // console.log('判斷結果：', status)
      // console.log('🚛 勾選的商品:', selectedItems)
      // console.log(
      //   '🔎 coupon',
      //   coupon.title,
      //   'selectedItems:',
      //   selectedItems,
      //   'status:',
      //   status
      // )
      return { ...coupon, ...status }
    })

    setProcesCoups(updated)
  }, [coupons, cartItems, checkedItems, totalAmount])

  return procesCoups
}
