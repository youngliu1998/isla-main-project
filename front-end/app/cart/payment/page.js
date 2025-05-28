'use client'

// import styles from '../_styles/cart-style.module.scss'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import StepProgress from '../_component/step-progress/step-progress'
import OrderSummary from '../_component/order-summary/order-summary'
import MobileOrderBar from '../_component/mobile-order-bar/mobile-order-bar'
import ShippingForm from '../_component/shipping-form/shipping-form'
//hook
import useIsMobile from '../hook/useIsMobile'
import { useCartContext } from '../context/cart-context'
import { useAuth } from '../../../hook/use-auth'
import cartApi from '../utils/axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function PaymentPage() {
  const router = useRouter()
  const isMobile = useIsMobile()
  const { orderData, setOrderData, setCartItems } = useCartContext()
  const { user } = useAuth()

  const defaultMemberInfo = {
    recipientName: '',
    recipientPhone: '',
    recipientAdress: '',
  }
  const [memberSameInfo, setMemberSameInfo] = useState(defaultMemberInfo)
  const [paymentMethod, setPaymentMethod] = useState('信用卡')

  // 用來接收從 ShippingForm 傳來的配送資料
  const [shippingInfo, setShippingInfo] = useState({
    shippingMethod: '',
    recipientName: '',
    recipientPhone: '',
    recipientAddress: '',
    pickupStoreName: '',
    pickupStoreAddress: '',
  })

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

  // 綠界付款流程
  const [isLoading, setIsLoading] = useState(false)

  // const handleCheckout = async () => {
  //   const cartItems = orderData?.cartItems || []

  //   if (cartItems.length === 0) {
  //     toast.error('購物車是空的喔！')
  //     return
  //   }

  //   // 驗證基本資料
  //   if (shippingInfo.shippingMethod === '宅配') {
  //     if (
  //       !shippingInfo.recipientName ||
  //       !shippingInfo.recipientPhone ||
  //       !shippingInfo.recipientAddress
  //     ) {
  //       toast.error('請填寫完整宅配收件人資料')
  //       return
  //     }
  //   } else if (shippingInfo.shippingMethod === '超商取貨') {
  //     if (!shippingInfo.pickupStoreName || !shippingInfo.pickupStoreAddress) {
  //       toast.error('請選擇超商門市')
  //       return
  //     }
  //   }

  //   setIsLoading(true)

  //   try {
  //     // 組裝優惠券資料
  //     const selecProdCoup = orderData?.selecProdCoup || null
  //     const selecCourCoup = orderData?.selecCourCoup || null
  //     const selecGloCoup = orderData?.selecGloCoup || null
  //     const discountTotal = orderData?.discountTotal || 0
  //     // 建立訂單送進資料庫
  //     const res = await cartApi.post('/order/create', {
  //       cartItems,
  //       discountTotal,
  //       selecProdCoup,
  //       selecCourCoup,
  //       selecGloCoup,
  //       paymentMethod: paymentMethod,
  //       // 配送資訊
  //       shippingMethod: shippingInfo.shippingMethod,
  //       shippingAddress: shippingInfo.recipientAddress,
  //       recipientName: shippingInfo.recipientName,
  //       recipientPhone: shippingInfo.recipientPhone,
  //       pickupStoreName: shippingInfo.pickupStoreName,
  //       pickupStoreAddress: shippingInfo.pickupStoreAddress,
  //     })

  //     const { orderId, orderNumber, totalAmount } = res.data
  //     if (!orderNumber) {
  //       toast.error('訂單建立失敗，無法取得訂單編號')
  //       return
  //     }
  //     // 更新購物車：移除已結帳商品，保留未結帳的
  //     const allItems = JSON.parse(localStorage.getItem('cartItems')) || []
  //     const purchasedIds = cartItems.map((item) => item.id)
  //     const remaining = allItems.filter(
  //       (item) => !purchasedIds.includes(item.id)
  //     )

  //     setCartItems(remaining)
  //     localStorage.setItem('cartItems', JSON.stringify(remaining))

  //     // 把訂單編號存起來（之後 order-completed 頁面可以用）
  //     localStorage.setItem('lastOrderNumber', orderNumber)

  //     // 判斷是否要導向綠界
  //     if (paymentMethod === '信用卡') {
  //       const items = cartItems.map((item) => ({
  //         name: item.name,
  //         quantity: item.quantity,
  //       }))

  //       const ecpayRes = await cartApi.post('cart-items/ecpay', {
  //         amount: totalAmount,
  //         items,
  //         orderNumber,
  //       })

  //       const html = ecpayRes.data

  //       // 插入表單並自動送出
  //       const container = document.querySelector('#ecpay-form-container')
  //       if (!container) {
  //         toast.error('找不到表單容器')
  //         return
  //       }
  //       container.innerHTML = html
  //       //手動送出綠界表單
  //       const form = container.querySelector('form')
  //       if (form) {
  //         form.submit()
  //       } else {
  //         toast.error('綠界表單產生失敗')
  //       }
  //     }
  //   } catch (error) {
  //     console.error(error)
  //     toast.error('發生錯誤，無法導向綠界付款')
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  const handleCheckout = async () => {
    const cartItems = orderData?.cartItems || []

    if (cartItems.length === 0) {
      toast.error('購物車是空的喔！')
      return
    }

    // 驗證收件資料
    if (shippingInfo.shippingMethod === '宅配') {
      if (
        !shippingInfo.recipientName ||
        !shippingInfo.recipientPhone ||
        !shippingInfo.recipientAddress
      ) {
        toast.error('請填寫完整宅配收件人資料')
        return
      }
    } else if (shippingInfo.shippingMethod === '超商取貨') {
      if (!shippingInfo.pickupStoreName || !shippingInfo.pickupStoreAddress) {
        toast.error('請選擇超商門市')
        return
      }
    }

    setIsLoading(true)

    try {
      // 組裝優惠券資料
      const selecProdCoup = orderData?.selecProdCoup || null
      const selecCourCoup = orderData?.selecCourCoup || null
      const selecGloCoup = orderData?.selecGloCoup || null

      // 計算金額
      const makeupItems = cartItems.filter(
        (item) => item.item_type === 'product'
      )
      const courseItems = cartItems.filter(
        (item) => item.item_type === 'course' || item.item_type === 'experience'
      )

      const totalByCategory = (items) =>
        items.reduce((sum, item) => {
          const price = parseInt(item.sale_price ?? item.base_price)
          return sum + price * item.quantity
        }, 0)

      const makeupTotal = totalByCategory(makeupItems)
      const courseTotal = totalByCategory(courseItems)
      const subtotal = makeupTotal + courseTotal + 200 // 運費

      const getDiscount = (coupon, base) => {
        if (!coupon) return 0
        if (coupon.discount_rate && Number(coupon.discount_rate) < 1) {
          return Math.round(base * (1 - Number(coupon.discount_rate)))
        }
        if (coupon.amount && Number(coupon.amount) > 0) {
          return Number(coupon.amount)
        }
        return 0
      }

      const makeupDiscount = getDiscount(selecProdCoup, makeupTotal)
      const courseDiscount = getDiscount(selecCourCoup, courseTotal)
      const globalDiscount =
        selecGloCoup?.free === 1 ? 200 : Number(selecGloCoup?.amount || 0)

      const finalTotal =
        subtotal - makeupDiscount - courseDiscount - globalDiscount

      // 建立訂單送進資料庫
      const res = await cartApi.post('/order/create', {
        cartItems,
        discountTotal: makeupDiscount + courseDiscount + globalDiscount,
        selecProdCoup,
        selecCourCoup,
        selecGloCoup,
        paymentMethod,
        shippingMethod: shippingInfo.shippingMethod,
        shippingAddress: shippingInfo.recipientAddress,
        recipientName: shippingInfo.recipientName,
        recipientPhone: shippingInfo.recipientPhone,
        pickupStoreName: shippingInfo.pickupStoreName,
        pickupStoreAddress: shippingInfo.pickupStoreAddress,
      })

      const { orderId, orderNumber } = res.data
      if (!orderNumber) {
        toast.error('訂單建立失敗，無法取得訂單編號')
        return
      }

      // 更新購物車：移除已結帳商品，保留未結帳的
      const allItems = JSON.parse(localStorage.getItem('cartItems')) || []
      const purchasedIds = cartItems.map((item) => item.id)
      const remaining = allItems.filter(
        (item) => !purchasedIds.includes(item.id)
      )

      setCartItems(remaining)
      localStorage.setItem('cartItems', JSON.stringify(remaining))

      // 存訂單編號
      localStorage.setItem('lastOrderNumber', orderNumber)

      // ✅ 如果是綠界才導轉跳
      if (paymentMethod === '信用卡') {
        const items = cartItems.map((item) => ({
          name: item.name,
          quantity: item.quantity,
        }))

        const ecpayRes = await cartApi.post('cart-items/ecpay', {
          amount: finalTotal,
          items,
          orderNumber,
        })

        const html = ecpayRes.data
        const container = document.querySelector('#ecpay-form-container')
        if (!container) {
          toast.error('找不到表單容器')
          return
        }
        container.innerHTML = html
        const form = container.querySelector('form')
        if (form) {
          form.submit()
        } else {
          toast.error('綠界表單產生失敗')
        }
      }
    } catch (error) {
      console.error(error)
      toast.error('發生錯誤，無法導向綠界付款')
    } finally {
      setIsLoading(false)
    }
  }

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
              onShippingChange={setShippingInfo}
            />

            {/* 付款方式 */}
            <div className="card-style mb-3 p-4">
              <h5 className="fw-bold mb-5 text-maintext">付款方式</h5>

              {[
                { id: '信用卡', label: '信用卡一次付清(綠界科技)' },
                { id: '超商付款', label: '超商取貨付款' },
                { id: 'LINE Pay', label: 'LINE Pay' },
              ].map((option) => (
                <div className="form-check mb-3" key={option.id}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="payment"
                    id={`payment-${option.id}`}
                    value={option.id}
                    checked={paymentMethod === option.id}
                    onChange={() => setPaymentMethod(option.id)}
                  />
                  <label
                    htmlFor={`payment-${option.id}`}
                    className="form-check-label"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
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
                filterCourCoups={orderData?.filterCourCoups || []}
                filterProdCoups={orderData?.filterProdCoups || []}
                onCheckout={handleCheckout} // ecpay
                isLoading={isLoading}
              />
            )}
          </div>
          {isMobile && <MobileOrderBar />}
        </div>
      </section>

      {/* 表單容器 */}
      <div id="ecpay-form-container" style={{ display: 'none' }} />
    </>
  )
}
