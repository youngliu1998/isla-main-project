'use client'
import useSWR from 'swr'
import '../_components/coupon.css'
import AsideProduct from '../_components/aside-product'
import MobileNav from '../_components/mobile-nav'
import PcNav from '../_components/pc-nav'
import CouponList from '../_components/coupon-list'
import LoadMoreButton from '../_components/more-button'
import DataStatus from '../_components/data-status'
import CouponHeader from '../_components/coupon-header'
import useCouponFilter from '../../../hook/coupon-filter'
import { useState } from 'react'

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

  const {
    currentType,
    setCurrentType,
    showClaimed,
    setShowClaimed,
    currentBrand,
    setCurrentBrand,
    productCategory,
    setProductCategory,
  } = useCouponFilter()
  // brand
  const brandMap = {
    1: 'Unleashia',
    2: 'Cosnori',
    3: 'Muzigae Mansion',
    4: 'Kaja',
    5: 'rom&nd',
  }
  const nameToId = Object.fromEntries(
    Object.entries(brandMap).map(([id, name]) => [name, Number(id)])
  )

  // 各自加載10筆優惠券
  const [couponCountMap, setCouponCountMap] = useState({
    ' ': 10,
    1: 10,
    2: 10,
    3: 10,
  })
  const currentCount = couponCountMap[currentType] || 10
  // error and loading
  const isLoading = !data
  const isError = error

  const coupons = Array.isArray(data?.data?.coupons) ? data.data.coupons : []

  const filteredCoupons = coupons
    .filter((coupon) => {
      const isProduct = coupon.area === 1 || coupon.area === 0
      const typeMatch = currentType === ' ' || coupon.type_id === currentType
      const claimedMatch = showClaimed ? coupon.claimed : true
      const brandMatch =
        !currentBrand || coupon.brand_id === nameToId[currentBrand]
      const categoryMatch =
        !productCategory || coupon.category_name === productCategory
      return (
        isProduct && typeMatch && claimedMatch && brandMatch && categoryMatch
      )
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
            currentType={currentType}
            setCurrentType={setCurrentType}
            showClaimed={showClaimed}
            setShowClaimed={setShowClaimed}
          />
          <DataStatus isLoading={isLoading} isError={isError} />
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
