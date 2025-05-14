'use client'

import useSWR from 'swr'
import { useState } from 'react'
import CouponHeader from '@/app/coupon/_components/coupon-header'
import PcNav from '@/app/coupon/_components/pc-nav'
import DataStatus from '@/app/coupon/_components/data-status'
import CouponList from '@/app/coupon/_components/coupon-list'
import LoadMoreButton from '@/app/coupon/_components/more-button'
import useCouponFilter from '@/hook/coupon-filter'
import '../../coupon/_components/coupon.css'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

const typeIdToStyle = {
  1: 'button-orange',
  2: 'button-purple',
  3: 'button-blue',
}
const getCouponStyle = (typeId) => typeIdToStyle[typeId] || 'button-all'

export default function CouponPage() {
  const url = 'http://localhost:3005/api/coupon/products'
  const { data, error } = useSWR(url, fetcher)

  const [stateId, setStateId] = useState(1) // 預設「已領取」
  const userId = 123 // 假設你有用 context 或 props 拿到

  const { currentType, showClaimed } = useCouponFilter()

  // 各自加載10筆優惠券
  const [couponCountMap, setCouponCountMap] = useState({
    ' ': 10,
    1: 10,
    2: 10,
    3: 10,
  })

  const currentCount = couponCountMap[currentType] || 10

  const isLoading = !data
  const isError = error

  const coupons = Array.isArray(data?.data?.coupons) ? data.data.coupons : []

  const filteredCoupons = coupons
    .filter((coupon) => {
      const isProduct = coupon.area === 1 || coupon.area === 0
      const typeMatch = currentType === ' ' || coupon.type_id === currentType
      const claimedMatch = showClaimed ? coupon.claimed : true
      return isProduct && typeMatch && claimedMatch
    })
    .sort((a, b) => {
      const aStyle = getCouponStyle(a.type_id)
      const bStyle = getCouponStyle(b.type_id)
      if (aStyle === 'button-all' && bStyle !== 'button-all') return -1
      if (aStyle !== 'button-all' && bStyle === 'button-all') return 1
      return 0
    })

  const displayCoupon = filteredCoupons.slice(0, currentCount)
  const moreBtn = currentCount < filteredCoupons.length

  const handleLoadMore = () => {
    setCouponCountMap((prev) => ({
      ...prev,
      [currentType]: (prev[currentType] || 10) + 10,
    }))
  }

  return (
    <>
      <CouponHeader type="member" />
      <PcNav
        currentType={stateId}
        setCurrentType={setStateId}
        isMemberCenter={true}
      />
      <DataStatus isLoading={isLoading} isError={isError} />
      {!isLoading && !isError && (
        <>
          <CouponList coupons={displayCoupon} getCouponStyle={getCouponStyle} />
          <LoadMoreButton visible={moreBtn} onClick={handleLoadMore} />
        </>
      )}
    </>
  )
}
