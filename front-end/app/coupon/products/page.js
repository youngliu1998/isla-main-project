'use client'
import useSWR from 'swr'
import dayjs from 'dayjs'
import '../_components/coupon.css'
import AsideProduct from '../_components/aside-product'
import MobileNav from '../_components/mobile-nav'
import PcNav from '../_components/pc-nav'
import CouponList from '../_components/coupon-list'
import LoadMoreButton from '../_components/more-button'
import DataStatus from '../_components/data-status'
import CouponHeader from '../_components/coupon-header'
import LoginModal from '../_components/login-modal'
import useCouponFilter from '../../../hook/coupon-filter'
import { useState } from 'react'
import { useAuth } from '@/hook/use-auth'

// fetcher 給 SWR 用
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

  const handleRefresh = () => {
    mutate() // 重新 fetch
  }

  // 使用hook管理篩選狀態
  const { currentType, setCurrentType } = useCouponFilter(' ')

  const {
    showClaimed,
    setShowClaimed,
    currentBrand,
    setCurrentBrand,
    productCategory,
    setProductCategory,
  } = useCouponFilter()

  // （name -> id）
  const brandMap = {
    1: 'Unleashia',
    2: 'Cosnori',
    3: 'Muzigae Mansion',
    4: 'Kaja',
    5: 'rom&nd',
    6: "A'Pieu",
  }
  const nameToId = Object.fromEntries(
    Object.entries(brandMap).map(([id, name]) => [name, Number(id)])
  )
  // nav li
  const couponTypes = [
    { label: '全部', value: ' ' },
    { label: '滿額券', value: 1 },
    { label: '折扣券', value: 2 },
    { label: '免運券', value: 3 },
  ]

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

  // console.log('coupons from API:', coupons)
  // 以過期的不顯示
  const now = dayjs()
  const shouldExcludeExpired = !showClaimed

  // 篩選 + 排序
  const filteredCoupons = coupons
    .filter((coupon) => {
      const isProduct = coupon.area === 1 || coupon.area === 0
      const typeMatch = currentType === ' ' || coupon.type_id === currentType
      const claimedMatch = showClaimed ? coupon.claimed : true
      const brandMatch =
        !currentBrand || coupon.brand_id === nameToId[currentBrand]
      const categoryMatch =
        !productCategory || coupon.category_name === productCategory

      const validTo = dayjs(coupon.valid_to)
      const isExpired = validTo.isBefore(now.startOf('day'))

      return (
        isProduct &&
        typeMatch &&
        claimedMatch &&
        brandMatch &&
        categoryMatch &&
        (shouldExcludeExpired ? !isExpired : true) // 排除過期
      )
    })
    .sort((a, b) => {
      const stylePriority = {
        'button-all': '',
        'button-orange': 1,
        'button-purple': 2,
        'button-blue': 3,
      }

      const aStyle = getCouponStyle(a.type_id)
      const bStyle = getCouponStyle(b.type_id)

      const aPriority = stylePriority[aStyle] ?? 99
      const bPriority = stylePriority[bStyle] ?? 99

      return aPriority - bPriority
    })

  const isEmpty = !isLoading && !isError && filteredCoupons.length === 0
  // 是否有領取優惠券
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
  // 未登入警告
  const [showLoginModal, setShowLoginModal] = useState(false)

  return (
    <main className="px-md-5 px-3 container">
      <div className="row mt-sm-4 g-sm-5">
        <AsideProduct
          currentBrand={currentBrand}
          setCurrentBrand={setCurrentBrand}
          productCategory={productCategory}
          setProductCategory={setProductCategory}
        />

        <div className="col-lg-9 col-md-8 col-12 mt-0">
          <CouponHeader type="product" />
          <MobileNav />
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
