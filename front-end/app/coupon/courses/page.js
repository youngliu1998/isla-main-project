'use client'
import useSWR from 'swr'
import '../_components/coupon.css'
import AsideCourse from '../_components/aside-course'
import PcNav from '../_components/pc-nav'
import CouponList from '../_components/coupon-list'
import LoadMoreButton from '../_components/more-button'
import DataStatus from '../_components/data-status'
import CouponHeader from '../_components/coupon-header'
import LoginModal from '../_components/login-modal'
import useCouponFilter from '../../../hook/coupon-filter'
import Componentstab from '../_components/tab/tab'
import MobileBottomFilter from '../../product/_components/mobile-bottom-filter'
import { useState, useEffect } from 'react'
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
  const { data, mutate, error } = useSWR(url, fetcher)

  // 手機板的 nav 切換
  const [tab, setTab] = useState(1)
  const handleRefresh = () => {
    mutate() // 重新 fetch
  }

  // 是否為手機版（768px 以下）
  const [isMobile, setIsMobile] = useState(false)

  // 監聽視窗大小變化，切換為桌機時自動重設為商品 tab
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)

      // 桌機版一律回到課程
      if (!mobile) {
        setTab(2)
      }
    }

    handleResize() // 初始化判斷一次
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // 使用hook管理篩選狀態
  const { currentType, setCurrentType } = useCouponFilter(' ')
  const {
    showClaimed,
    setShowClaimed,
    courseCategory = '',
    setcourseCategory = '',
  } = useCouponFilter('')

  // 各分頁顯示狀態
  const [couponCountMap, setCouponCountMap] = useState({
    ' ': 10,
    1: 10,
    2: 10,
    3: 10,
  })
  const currentCount = couponCountMap[currentType] || 10
  // nav li
  const couponTypes = [
    { label: '全部', value: ' ' },
    { label: '滿額券', value: 1 },
    { label: '折扣券', value: 2 },
  ]

  // 判斷狀態
  const isLoading = !data
  const isError = error || data?.status === 'false'

  // 取得原始資料陣列
  const coupons = Array.isArray(data?.data?.coupons) ? data.data.coupons : []

  // 篩選 + 排序
  const filteredCoupons = coupons
    .filter((coupon) => {
      // const isCourses = coupon.area === 2 || coupon.area === 0
      const typeMatch = currentType === ' ' || coupon.type_id === currentType
      const claimedMatch = showClaimed ? coupon.claimed : true
      const courseMatch =
        !courseCategory || coupon.course_category_name === courseCategory

      return typeMatch && claimedMatch && courseMatch
    })
    .sort((a, b) => {
      const stylePriority = {
        'button-all': '',
        'button-orange': 1,
        'button-purple': 2,
      }

      const aStyle = getCouponStyle(a.type_id)
      const bStyle = getCouponStyle(b.type_id)

      const aPriority = stylePriority[aStyle] ?? 99
      const bPriority = stylePriority[bStyle] ?? 99

      return aPriority - bPriority
    })

  // 根據 tab 篩選商品 or 課程
  const tabFilteredCoupons = filteredCoupons.filter(
    (coupon) => parseInt(coupon.area) === tab
  )

  // 載入更多
  const displayCoupon = tabFilteredCoupons.slice(0, currentCount)
  // 是否顯示載入更多按鈕
  const moreBtn = currentCount < tabFilteredCoupons.length

  // 判斷是否為空結果
  const isEmpty = !isLoading && !isError && filteredCoupons.length === 0
  const emptyMsg = showClaimed ? '尚未有已領取的優惠券' : '尚未有優惠券'

  // 點擊載入更多
  const handleLoadMore = () => {
    setCouponCountMap((prev) => ({
      ...prev,
      [currentType]: (prev[currentType] || 10) + 10,
    }))
  }
  // 未登入警告
  const [showLoginModal, setShowLoginModal] = useState(false)

  // 切換手機 tab 時重新計數
  const handleTabChange = (newTab) => {
    setTab(newTab)
    setCouponCountMap((prev) => ({
      ...prev,
      [currentType]: 10,
    }))
  }
  return (
    <main className="px-md-5 px-3 pb-5 container">
      <div className="row mt-sm-4 g-sm-5">
        <AsideCourse
          courseCategory={courseCategory}
          setcourseCategory={setcourseCategory}
        />

        <div className="col-lg-9 col-md-8 col-12 mt-0">
          <CouponHeader type="course" />
          {/* 只在手機版顯示 tab */}
          {isMobile && (
            <Componentstab
              cates={['商品', '課程']}
              handleTabChange={handleTabChange}
            />
          )}
          <PcNav
            options={couponTypes}
            currentValue={currentType}
            onChange={setCurrentType}
            showSwitch={true}
            isChecked={showClaimed}
            onToggleSwitch={() => setShowClaimed((prev) => !prev)}
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
                isLogin={() => setShowLoginModal(true)}
                handleRefresh={handleRefresh}
              />
              <LoadMoreButton visible={moreBtn} onClick={handleLoadMore} />
            </>
          )}
        </div>
      </div>

      <LoginModal
        show={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </main>
  )
}
