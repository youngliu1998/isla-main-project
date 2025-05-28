'use client'

import styles from './order-summary.module.scss'
import Link from 'next/link'
import { Collapse } from 'react-bootstrap'
import { usePathname } from 'next/navigation'
import { filterGlobalCoupons } from '../../utils/coupon-helper'
import { BRAND_MAP } from '../../utils/coupon-helper'

import { useState } from 'react'

//數字轉千分位，防止 null/undefined
function formatCurrency(num) {
  const n = Number(num)
  if (isNaN(n)) return '0'
  return n.toLocaleString('zh-Hant-TW')
}

export default function OrderSummary({
  cartItems = [],
  selecProdCoup,
  selecCourCoup,
  selecGloCoup,
  setSelecGloCoup,
  onCheckout,
  isLoading = false,
  universalCoupon = [],
  shippingCoupons = [],
}) {
  // console.log('🧾 全站券 filterGloCoups:', universalCoupon)
  // console.log('🧾 免運券 shippingCoupons:', shippingCoupons)

  const [openProdList, setOpenProdList] = useState(false)
  const [openCourList, setOpenCourList] = useState(false)
  const pathname = usePathname()

  // 分類商品(目前沒有加購商品)
  const makeupItems = cartItems.filter((item) => item.item_type === 'product')
  const courseItems = cartItems.filter(
    (item) => item.item_type === 'course' || item.item_type === 'experience'
  )
  const addOnItems = cartItems.filter((item) => item.item_type === 'add_on')

  const totalByCategory = (items) =>
    items.reduce((sum, item) => {
      const price = parseInt(item.sale_price ?? item.base_price)
      return sum + price * item.quantity
    }, 0)
  const makeupTotal = totalByCategory(makeupItems)
  const courseTotal = totalByCategory(courseItems)
  const addOnTotal = totalByCategory(addOnItems) //目前沒有做加購

  const shippingBase = 200
  // 優惠券折抵金額判斷
  let globalDiscount = 0
  let globalCouponTitle = ''
  if (selecGloCoup) {
    // 如果是免運
    if (selecGloCoup.free === 1) {
      globalDiscount = shippingBase
    } else if (selecGloCoup.amount) {
      globalDiscount = Number(selecGloCoup.amount) || 0
    }
    globalCouponTitle = selecGloCoup.title
  }
  //商品優惠券
  const makeupCoupon = selecProdCoup
  const courseCoupon = selecCourCoup
  // const getDiscount = (coupon, base) => {
  //   if (!coupon) return 0
  //   if (coupon.type === 'percent')
  //     return Math.round(base * (coupon.value / 100))
  //   return coupon.value
  // }
  const getDiscount = (coupon, base) => {
    if (!coupon) return 0

    // 百分比券：discount_rate < 1
    if (coupon.discount_rate && Number(coupon.discount_rate) < 1) {
      return Math.round(base * (1 - Number(coupon.discount_rate)))
    }
    // 金額折抵券
    if (coupon.amount && Number(coupon.amount) > 0) {
      return Number(coupon.amount)
    }
    return 0
  }

  // console.log('makeupCoupon:', makeupCoupon)
  // console.log('courseCoupon:', courseCoupon)

  const makeupDiscount = getDiscount(makeupCoupon, makeupTotal)
  const courseDiscount = getDiscount(courseCoupon, courseTotal)
  const totalDiscount = makeupDiscount + courseDiscount
  const subtotal = makeupTotal + courseTotal + addOnTotal + shippingBase
  const finalTotal = subtotal - totalDiscount - globalDiscount

  return (
    <div className={`${styles.orderSummary} card-style mb-3`}>
      <h5 className="fw-bold mb-5 text-maintext text-center">訂單明細</h5>

      {/* 彩妝商品區 */}
      <div className="d-flex justify-content-between text-subtext mb-2">
        <div className="d-flex align-items-center">
          <p className="me-2">彩妝商品</p>
          <button
            type="button"
            className="btn btn-link p-0 text-center"
            onClick={() => setOpenProdList(!openProdList)}
            aria-expanded={openProdList}
          >
            <i className="bi bi-caret-down-fill text-subtext"></i>
          </button>
        </div>
        <p>
          <strong>NT${formatCurrency(makeupTotal)}</strong>
        </p>
      </div>
      <Collapse in={openProdList}>
        <div>
          {Array.isArray(makeupItems) && makeupItems.length > 0 ? (
            makeupItems.map((item, index) => (
              <div
                className="d-flex justify-content-between text-elem"
                key={index}
              >
                <p
                  className={`${styles.ellipsis}`}
                  title={item.name}
                  style={{ fontSize: '14px' }}
                >
                  {item.name}
                </p>
                <div
                  className="d-flex align-items-center"
                  style={{ fontSize: '14px' }}
                >
                  {/* <p className="me-2">數量：{item.quantity}</p> */}
                  <p>
                    NT$
                    {formatCurrency(
                      item.quantity * (item.sale_price ?? item.base_price)
                    )}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted">目前無商品</p>
          )}
        </div>
      </Collapse>

      {makeupCoupon && (
        <div className="d-flex justify-content-between text-secondary mb-2">
          <p>{makeupCoupon.description}</p>
          <p>-NT${formatCurrency(makeupDiscount)}</p>
        </div>
      )}

      {/* 彩妝課程區 */}
      <div className="d-flex justify-content-between text-subtext mb-2">
        <div className="d-flex align-items-center">
          <p className="me-2">彩妝課程</p>
          <button
            type="button"
            className="btn btn-link p-0 text-center"
            onClick={() => setOpenCourList(!openCourList)}
            aria-expanded={openCourList}
          >
            <i className="bi bi-caret-down-fill text-subtext"></i>
          </button>
        </div>
        <p>
          <strong>NT${formatCurrency(courseTotal)}</strong>
        </p>
      </div>
      <Collapse in={openCourList}>
        <div>
          {Array.isArray(courseItems) && courseItems.length > 0 ? (
            courseItems.map((item) => (
              <div
                key={item.id}
                className="d-flex justify-content-between text-elem"
                style={{ fontSize: '14px' }}
              >
                <p className={`${styles.ellipsis}`} title={item.name}>
                  {item.name}
                </p>
                <p>NT${formatCurrency(item.sale_price ?? item.base_price)}</p>
              </div>
            ))
          ) : (
            <p className="text-muted">目前無課程</p>
          )}
        </div>
      </Collapse>

      {courseCoupon && (
        <div className="d-flex justify-content-between text-secondary mb-2">
          <p className={`${styles.ellipsis}`}>{courseCoupon.description}</p>
          <p>-NT${formatCurrency(courseDiscount)}</p>
        </div>
      )}

      <div className={`${styles.divider} mb-3`}></div>

      {/* 加購商品 */}
      {/* <div className="d-flex justify-content-between text-subtext mb-2">
        <p>加購商品</p>
        <p>NT$860</p>
      </div>
      <div className="d-flex justify-content-start align-items-center mb-2 gap-2">
        <h6 className="text-elem fw-normal">[Kaja] Berry Red Lipstick</h6>
        <div
          className="color-dot"
          style={{ backgroundColor: '#e71e1e' }}
          title="莓果紅"
        ></div>
        <span className="badge bg-elem">700 ml</span>
      </div> */}
      {shippingCoupons.length > 0 ? (
        <div className="mb-3">
          <label
            htmlFor="global-coupon-select"
            className="form-label text-subtext"
          >
            選擇運費折抵券
          </label>
          <select
            id="global-coupon-select"
            className={styles.customSelect}
            value={selecGloCoup?.id || ''}
            onChange={(e) => {
              const selected = shippingCoupons.find(
                (c) => c.id === Number(e.target.value)
              )
              setSelecGloCoup(selected || null)
            }}
          >
            <option value="">請選擇優惠券</option>
            {shippingCoupons.map((c) => (
              <option key={c.id} value={c.id} disabled={!c.is_applicable}>
                {c.title}（{BRAND_MAP[c.brand_id] || '未知品牌'} /
                {c.is_applicable ? '可用' : c.block_reason}）
              </option>
            ))}
          </select>
        </div>
      ) : pathname === '/cart' ? (
        <p className="text-muted mb-3">目前無可用的全站優惠券</p>
      ) : null}

      {/* 運費與優惠 */}
      <div className="d-flex justify-content-between text-subtext mb-2">
        <p>運費</p>
        <p>NT$200</p>
      </div>
      {selecGloCoup && (
        <div className="d-flex justify-content-between text-secondary mb-2">
          <p>{globalCouponTitle}</p>
          <p>-NT${formatCurrency(globalDiscount)}</p>
        </div>
      )}

      <div className={`${styles.divider} mb-4`}></div>

      {/* 總計 */}
      <div className="d-flex justify-content-between mb-3">
        <h4>總計：</h4>
        <h4>
          <strong>NT${formatCurrency(finalTotal >= 0 ? finalTotal : 0)}</strong>
        </h4>
      </div>

      <div className="w-100 d-flex justify-content-end">
        {pathname === '/cart/payment' ? (
          <button
            className="btn btn-primary text-white"
            onClick={onCheckout}
            disabled={isLoading}
          >
            {isLoading ? '正在跳轉...' : '結帳'}
          </button>
        ) : (
          <Link href="/cart/payment">
            <button className="btn btn-primary text-white" onClick={onCheckout}>
              結帳
            </button>
          </Link>
        )}
      </div>
    </div>
  )
}
