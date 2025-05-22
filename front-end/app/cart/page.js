'use client'
import styles from './_styles/cart-style.module.scss'
import { checkCouponStatus } from './utils/coupon-helper'
import { toast } from 'react-toastify'
//import component
import StepProgress from './_component/step-progress/step-progress'
import ProductCard from './_component/product-card/product-card'
import CouponAccordion from './_component/coupon-accordion/coupon-accordion'
import CouponAccordionCourse from './_component/coupon-accordion/coupon-accordion-course'
import CouponSwiper from './_component/coupon-swiper/coupon-swiper'
import OrderSummary from './_component/order-summary/order-summary'
import MobileOrderBar from './_component/mobile-order-bar/mobile-order-bar'
import EmptyCart from './_component/cart-empty/empty-cart'
import CartLoading from './_component/cart-Loading/cart-loading'
// coustom-hook
import { useAuth } from '@/hook/use-auth'
import useIsMobile from './hook/useIsMobile'
import useProcesCoups from './hook/useProcesCoups'
// fetch data
import cartApi from './utils/axios'
import { useEffect, useState } from 'react'

export default function CartPage() {
  const { user, isAuth } = useAuth()
  const [cartItems, setCartItems] = useState([])
  const [selectAll, setSelectAll] = useState(false)
  const [checkedItems, setCheckedItems] = useState({}) // 以 id 為 key 儲存是否勾選
  const [couponDataProd, setCouponDataProd] = useState([])
  const [couponDataCour, setCouponDataCour] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selecProdCoup, setSelecProdCoup] = useState(null)
  const [selecCourCoup, setSelecCourCoup] = useState(null)
  const [selecGloCoup, setSelecGloCoup] = useState(null)

  useEffect(() => {
    // fetch get-cart-items
    const cartItemsData = async () => {
      try {
        const res = await cartApi.get('/cart-items')
        const rawCartItems = res.data.data.cartItems

        console.log('前端抓到的購物車資料：', rawCartItems)
        // toast.success('頁面載入成功！')
        const typedItems = rawCartItems.map((item) => {
          let type = 'normal'

          if (item.item_type === 'course' || item.item_type === 'experience') {
            type = 'course'
          } else if (item.color_options?.length > 1) {
            type = 'colorDots'
          }

          return {
            ...item,
            type,
          }
        })

        setCartItems(typedItems)
        localStorage.setItem('cartItems', JSON.stringify(typedItems))
      } catch (error) {
        console.error('購物車資料抓取失敗:', error.message)
      } finally {
        setIsLoading(false)
      }
    }
    //fetch member-coupon
    const memberCouponData = async () => {
      try {
        const res = await cartApi.get('/cart-items/member-coupon')
        const rawCouponItems = res.data.data
        console.log('會員已領取的優惠券', rawCouponItems)

        localStorage.setItem('member-coupons', JSON.stringify(rawCouponItems))
        console.log('會員已領取的優惠券存到token')
        setCouponDataProd(rawCouponItems.productCoupons || [])
        setCouponDataCour(rawCouponItems.courseCoupons || [])
      } catch (error) {
        console.error('會員已領取的優惠券資料抓取失敗', error.message)
      }
    }
    cartItemsData()
    memberCouponData()
  }, [isAuth])

  // fetch delete
  const handleDeleteItem = async (cartItemId) => {
    try {
      const res = await cartApi.delete(`/cart-items/delete/${cartItemId}`)

      if (res.data.status === 'success') {
        const updated = cartItems.filter((item) => item.id !== cartItemId)
        setCartItems(updated)
        localStorage.setItem('cartItems', JSON.stringify(updated))
        toast.success('已從購物車移除', {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
        })
        console.log('toast 要跑囉')
      } else {
        console.error(res.data.message)
        toast.error(res.data.message || '刪除失敗')
      }
    } catch (err) {
      console.error('刪除失敗：', err)
      toast.error('伺服器錯誤，請稍後再試')
    }
  }

  // const [selectedCoupon, setSelectedCoupon] = useState(null)

  // 計算總金額（你也可以只算勾選的 cartItems）
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + (item.sale_price ?? item.base_price) * item.quantity,
    0
  )

  // 處理 商品-優惠券 是否可用
  const processedCouponsProd = useProcesCoups(
    couponDataProd,
    cartItems,
    checkedItems,
    totalAmount
  )
  // 處理 課程-優惠券
  const processedCouponsCourse = useProcesCoups(
    couponDataCour,
    cartItems,
    checkedItems,
    totalAmount
  )
  // 商品優惠券選擇toggle
  const onSelectProdCoup = (coupon) => {
    if (selecProdCoup && selecProdCoup.id === coupon.id) {
      setSelecProdCoup(null)
    } else {
      setSelecProdCoup(coupon)
    }
  }
  // 課程優惠券選擇toggle
  const onSelectCourCoup = (coupon) => {
    if (selecCourCoup && selecCourCoup.id === coupon.id) {
      setSelecCourCoup(null)
    } else {
      setSelecCourCoup(coupon)
    }
  }

  const productItems = cartItems.filter(
    (item) => item.type === 'normal' || item.type === 'colorDots'
  )
  const courseItems = cartItems.filter((item) => item.type === 'course')

  // 全選切換
  const handleSelectAll = (checked) => {
    setSelectAll(checked)
    const newChecked = {}
    cartItems.forEach((item) => {
      newChecked[item.id] = checked
    })
    setCheckedItems(newChecked)
  }
  // 單個項目勾選改變
  const handleItemCheckChange = (id, checked) => {
    const updated = { ...checkedItems, [id]: checked }
    setCheckedItems(updated)
    // 若有任何一個沒被勾選，就取消全選
    const isAllChecked = cartItems.every((item) => updated[item.id])
    setSelectAll(isAllChecked)
  }

  // 記錄元件是否 已加載完成
  const [hasMounted, setHasMounted] = useState(false)
  // 判斷是否為手機裝置
  const isMobile = useIsMobile()
  useEffect(() => {
    setHasMounted(true)
  }, [])
  if (!hasMounted) return null // 預防報錯

  // 購物車頁面沒有加載完成 就跑loading動畫
  if (!hasMounted) return null
  if (isLoading) {
    return (
      <section className="container text-center my-5">
        <CartLoading />
      </section>
    )
  }

  // 過濾 area=1 商品券
  const filterProdCoups = processedCouponsProd.filter(
    (coupon) => coupon.area === 1
  )
  // 過濾 area=2 課程券
  const filterCourCoups = processedCouponsCourse.filter(
    (coupon) => coupon.area === 2
  )
  // 過濾 area=0 全站券
  const filterGloCoups = processedCouponsProd.filter(
    (coupon) => coupon.area === 0
  )

  return (
    <>
      <section className="container text-center text-lg-start mt-2">
        <h1 className="text-subtext h2 m-5">購物袋</h1>
      </section>

      {cartItems.length === 0 ? (
        <section className="container text-center my-5">
          <EmptyCart />
        </section>
      ) : (
        <>
          <section className="container d-none d-lg-block mb-4">
            <StepProgress currentStep={1} />
          </section>
          <section
            className="container-fluid container-lg"
            style={{ paddingBottom: '50px' }}
          >
            <div className="row gy-5">
              <div className="col-lg-4 col-12">
                <div className="form-check m-4 ">
                  <input
                    className={`form-check-input me-2 ${styles.checkboxInput}`}
                    type="checkbox"
                    id="allCheck"
                    checked={selectAll}
                    onChange={(evt) => {
                      handleSelectAll(evt.target.checked)
                    }}
                  />
                  <label htmlFor="allCheck" className="text-subtext">
                    選取所有
                  </label>
                </div>
              </div>
              <div className="col-lg-8 col-12 d-none d-lg-block"></div>
            </div>

            <div className="row gy-5">
              <div className="col-lg-8 col-12 gy-5">
                <div className="card-style mb-4 p-4">
                  <div className="mb-3 d-flex align-items-center text-primary">
                    <i className="bi bi-cart4 fs-6 mb-1 me-1"></i>
                    <div>彩妝商品</div>
                  </div>
                  {productItems.map((item) => (
                    <ProductCard
                      key={item.id}
                      type={item.type}
                      id={item.id}
                      title={item.name}
                      image={item.image_url}
                      salePrice={item.sale_price ?? item.base_price}
                      basePrice={item.base_price}
                      quantity={item.quantity}
                      color={item.color}
                      colorOptions={item.color_options}
                      category={item.category}
                      onDelete={() => handleDeleteItem(item.id)}
                      onQuantityChange={(newQty) => {
                        const updated = cartItems.map((p) =>
                          p.id === item.id ? { ...p, quantity: newQty } : p
                        )
                        setCartItems(updated)
                        localStorage.setItem(
                          'cartItems',
                          JSON.stringify(updated)
                        )
                      }}
                      isChecked={checkedItems[item.id] || false}
                      onCheckChange={(checked) =>
                        handleItemCheckChange(item.id, checked)
                      }
                    />
                  ))}

                  {/* add-on-divider */}
                  <div
                    className="w-100 bg-subtext my-3"
                    style={{ height: '1px' }}
                  ></div>
                  <div className="text-elem">
                    <i className="bi bi-cart-check-fill me-2"></i>加購商品
                  </div>
                </div>

                <CouponAccordion>
                  <CouponSwiper
                    coupons={filterProdCoups}
                    selectedCoupon={selecProdCoup}
                    onSelectCoupon={setSelecProdCoup}
                  />
                </CouponAccordion>

                <div className="card-style mb-3 p-4">
                  <div className="mb-3">
                    <div className="mb-3 d-flex align-items-center text-primary">
                      <i className="bi bi-film fs-6 mb-1 me-2"></i>
                      <div>彩妝課程</div>
                    </div>
                  </div>
                  {courseItems.map((item) => (
                    <ProductCard
                      key={item.id}
                      type={item.type}
                      id={item.id}
                      title={item.name}
                      image={item.image_url}
                      salePrice={item.sale_price ?? item.base_price}
                      basePrice={item.base_price}
                      quantity={item.quantity}
                      category={item.category}
                      onDelete={() => handleDeleteItem(item.id)}
                      onQuantityChange={(newQty) => {
                        const updated = cartItems.map((p) =>
                          p.id === item.id ? { ...p, quantity: newQty } : p
                        )
                        setCartItems(updated)
                        localStorage.setItem(
                          'cartItems',
                          JSON.stringify(updated)
                        )
                      }}
                      isChecked={checkedItems[item.id] || false}
                      onCheckChange={(checked) =>
                        handleItemCheckChange(item.id, checked)
                      }
                    />
                  ))}
                </div>

                <CouponAccordionCourse>
                  <CouponSwiper
                    coupons={filterCourCoups}
                    selectedCoupon={selecCourCoup}
                    onSelectCoupon={setSelecCourCoup}
                  />
                </CouponAccordionCourse>
              </div>
              <div className="col-lg-4 col-12">
                {!isMobile && (
                  <OrderSummary
                    cartItems={cartItems.filter((i) => checkedItems[i.id])}
                    selecProdCoup={selecProdCoup}
                    selecCourCoup={selecCourCoup}
                    selecGloCoup={selecGloCoup}
                    setSelecGloCoup={setSelecGloCoup}
                    filterGloCoups={filterGloCoups}
                    filterCourCoups={filterProdCoups}
                    filterProdCoups={filterProdCoups}
                  />
                )}
              </div>
              {isMobile && <MobileOrderBar />}
            </div>
          </section>
        </>
      )}
    </>
  )
}
