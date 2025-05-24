'use client'

// import styles from '../_styles/cart-style.module.scss'
import StepProgress from '../_component/step-progress/step-progress'
import OrderSummary from '../_component/order-summary/order-summary'
import MobileOrderBar from '../_component/mobile-order-bar/mobile-order-bar'
import ShippingForm from '../_component/shipping-form/shipping-form'

import useIsMobile from '../hook/useIsMobile'
import { useEffect, useState } from 'react'
import { useCartContext } from '../context/cart-context'
import { useAuth } from '../../../hook/use-auth'

export default function PaymentPage() {
  const isMobile = useIsMobile()
  const { orderData, setOrderData } = useCartContext()
  const { user } = useAuth()
  const defaultMemberInfo = {
    recipientName: '',
    recipientPhone: '',
    recipientAdress: '',
  }
  const [memberSameInfo, setMemberSameInfo] = useState(defaultMemberInfo)
  // 勾選自動帶入會員資料
  const handleCopyMemberInfo = (checked) => {
    if (checked) {
      setMemberSameInfo({
        recipientName: user.name || '',
        recipientPhone: user.tel || '',
        recipientAdress: user.address || '',
      })
    } else {
      setMemberSameInfo(defaultMemberInfo)
    }
  }

  useEffect(() => {
    if (!orderData) {
      const saved = localStorage.getItem('orderSummary')
      if (saved) {
        setOrderData(JSON.parse(saved))
      }
    }
  }, [orderData, setOrderData])
  return (
    <>
      <section className="container text-center text-lg-start mt-2">
        <h1 className="text-subtext h2 m-5">購物袋</h1>
      </section>
      {/* step-icon */}
      <section className="container d-none d-lg-block mb-4">
        <StepProgress currentStep={2} />
      </section>
      <section className="container-fluid container-lg">
        <div className="row gy-5">
          {/* Left */}
          <div className="col-lg-7 col-12">
            <ShippingForm
              memberSameInfo={memberSameInfo}
              setMemberSameInfo={setMemberSameInfo}
              handleCopyMemberInfo={handleCopyMemberInfo}
            />

            {/* 付款方式 */}
            <div className="card-style mb-3 p-4">
              <h5 className="fw-bold mb-5 text-maintext">付款方式</h5>
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="payment"
                  id="paymentCredit"
                  value="credit"
                  defaultChecked
                />
                <label htmlFor="paymentCredit" className="form-check-label">
                  信用卡一次付清(綠界科技)
                </label>
              </div>
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="payment"
                  id="payment711"
                  value="711"
                />
                <label htmlFor="payment711" className="form-check-label">
                  超商取貨付款
                </label>
              </div>
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="payment"
                  id="paymentLinePay"
                  value="linepay"
                />
                <label htmlFor="paymentLinePay" className="form-check-label">
                  LINE Pay
                </label>
              </div>
            </div>
          </div>
          {/* Right*/}
          <div className="col-lg-5 col-12">
            {!isMobile && (
              <OrderSummary
                cartItems={orderData?.cartItems || []}
                selecProdCoup={orderData?.selecProdCoup}
                selecCourCoup={orderData?.selecCourCoup}
                selecGloCoup={orderData?.selecGloCoup}
                setSelecGloCoup={() => {}}
                filterGloCoups={orderData?.filterGloCoups || []}
                filterCourCoups={orderData?.filterCourCoups || []}
                filterProdCoups={orderData?.filterProdCoups || []}
              />
            )}
          </div>
          {isMobile && <MobileOrderBar />}
        </div>
      </section>
    </>
  )
}
