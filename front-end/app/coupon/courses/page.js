'use client'
import useSWR from 'swr'
import '../_components/coupon.css'
import AsideCourse from '../_components/aside-course'
import MobileNav from '../_components/mobile-nav'
import PcNav from '../_components/pc-nav'
import CouponList from '../_components/coupon-list'
import LoadMoreButton from '../_components/more-button'
import DataStatus from '../_components/data-status'
import CouponHeader from '../_components/coupon-header'
import useCouponFilter from '../../../hook/coupon-filter'
import { useState } from 'react'
import { useAuth } from '@/hook/use-auth'

// fetcher 給 SWR 使用
const fetcher = (...args) => fetch(...args).then((res) => res.json())

// type_id 對應樣式
const typeIdToStyle = {
  1: 'button-orange',
  2: 'button-purple',
  3: 'button-blue',
}
const getCouponStyle = (typeId) => typeIdToStyle[typeId] || 'button-all'

export default function CouponPage() {
  // SWR 取得資料
  const { user } = useAuth()
  const url = user
    ? `http://localhost:3005/api/coupon/products?user_id=${user.id}`
    : null
  const { data, error } = useSWR(url, fetcher)

  // 使用hook管理篩選狀態
  const {
    currentType,
    setCurrentType,
    showClaimed,
    setShowClaimed,
    courseCategory = '',
    setcourseCategory = '',
  } = useCouponFilter()

  // 各分頁顯示狀態
  const [couponCountMap, setCouponCountMap] = useState({
    ' ': 10,
    1: 10,
    2: 10,
    3: 10,
  })
  const currentCount = couponCountMap[currentType] || 10

  // 判斷狀態
  const isLoading = !data
  const isError = error || data?.status === 'false'

  // 取得原始資料陣列
  const coupons = Array.isArray(data?.data?.coupons) ? data.data.coupons : []

  // 篩選 + 排序
  const filteredCoupons = coupons
    .filter((coupon) => {
      const isCourses = coupon.area === 2 || coupon.area === 0
      const typeMatch = currentType === ' ' || coupon.type_id === currentType
      const claimedMatch = showClaimed ? coupon.claimed : true
      const courseMatch =
        !courseCategory || coupon.course_category_name === courseCategory

      return isCourses && typeMatch && claimedMatch && courseMatch
    })
    .sort((a, b) => {
      const aStyle = getCouponStyle(a.type_id)
      const bStyle = getCouponStyle(b.type_id)
      if (aStyle === 'button-all' && bStyle !== 'button-all') return -1
      if (aStyle !== 'button-all' && bStyle === 'button-all') return 1
      return 0
    })

  // 判斷是否為空結果
  const isEmpty = !isLoading && !isError && filteredCoupons.length === 0
  const emptyMsg = showClaimed ? '尚未有已領取的優惠券' : '尚未有優惠券'

  // 載入更多
  const displayCoupon = filteredCoupons.slice(0, currentCount)
  // 是否顯示載入更多按鈕
  const moreBtn = currentCount < filteredCoupons.length

  // 點擊載入更多
  const handleLoadMore = () => {
    setCouponCountMap((prev) => ({
      ...prev,
      [currentType]: (prev[currentType] || 10) + 10,
    }))
  }

  return (
    <main className="px-md-5 px-3 container">
      <div className="row mt-sm-4 g-sm-5">
        <AsideCourse
          courseCategory={courseCategory}
          setcourseCategory={setcourseCategory}
        />

        <div className="col-lg-9 col-md-8 col-12 mt-0">
          <CouponHeader type="course" />
          <MobileNav />
          <PcNav
            currentType={currentType}
            setCurrentType={setCurrentType}
            showClaimed={showClaimed}
            setShowClaimed={setShowClaimed}
            isMemberCenter={false}
            couponPageType="course"
          />

          <DataStatus
            isLoading={isLoading}
            isError={isError}
            isEmpty={isEmpty}
            message={emptyMsg}
            errorMessage="伺服器忙線中，請稍後再試"
          />

          {!isLoading && !isError && (
            <>
              <CouponList
                coupons={displayCoupon}
                getCouponStyle={getCouponStyle}
              />
              <LoadMoreButton visible={moreBtn} onClick={handleLoadMore} />
            </>
          )}
        </div>
      </div>
    </main>
  )
}
