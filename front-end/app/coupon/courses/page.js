'use client'

import Image from 'next/image'
import '../_components/coupon.css'
import SideBar from '../_components/side-bar'
import MobileNav from '../_components/mobile-nav'
import PcNav from '../_components/pc-nav'

export default function CouponPage() {
  return (
    <>
      <main className="px-md-5 px-3">
        <div className="row mt-sm-4 g-sm-5">
          {/* aside */}
          <SideBar />
          {/* content */}
          <div className="col-lg-9 col-md-8 col-12 mt-0">
            <h2 className="d-none d-md-flex">優惠券專區 - 課程</h2>

            <div className="d-flex d-md-none py-3 px-5 bg-white justify-content-center">
              <h4 className="sub-color ">菜單</h4>
            </div>

            {/* mobile nav  */}
            <MobileNav />

            {/* pc nav  */}
            <PcNav />

            <div className="d-flex flex-column gap-lg-0 gap-3 mt-4 mt-lg-0">
              <div className="d-flex flex-lg-nowrap flex-wrap justify-content-md-between justify-content-center gap-xl-5 gap-lg-4 gap-3">
                {/* coupon-1 */}
                <div className="coupon mt-lg-4 mb-lg-3 d-flex flex-nowrap justify-content-between">
                  {/* img */}
                  <div className="d-flex align-items-center flex-shrink-1">
                    <img
                      src="../_images/ISLA.png"
                      alt
                      className="img-fluid w-lg-75 w-xl-100"
                    />
                  </div>
                  {/* text */}
                  <div className="content flex-shrink-0 ps-lg-0 ps-xl-2 pe-lg-4 pe-xl-2">
                    <div className="top">
                      <h2 className="text-truncate">折$150</h2>
                    </div>
                    <div className="bottom">
                      <div>
                        <p className="main-text fw-medium pb-2">
                          全站商品 / 課程 - 滿2000元即享優惠NT$150
                        </p>
                        <p className="main-text mb-0 fw-light">
                          有效至 2025/12/31
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* button */}
                  <div className="button-all d-flex align-items-center flex-shrink-0">
                    <div className="text-group white d-flex flex-column gap-2">
                      <h5 className="mb-0 fw-light">領</h5>
                      <h5 className="mb-0 fw-light">取</h5>
                    </div>
                  </div>
                </div>
                {/* coupon-2 */}
                <div className="coupon mt-lg-4 mb-lg-3 d-flex flex-nowrap justify-content-between">
                  {/* img */}
                  <div className="d-flex align-items-center flex-shrink-1">
                    <Image
                      src="../_images/ISLA.png"
                      alt="ISLA"
                      width={200}
                      height={200}
                      classname="img-fluid w-lg-75 w-xl-100"
                    />
                  </div>
                  {/* text */}
                  <div className="content flex-shrink-0 ps-lg-0 ps-xl-2 pe-lg-4 pe-xl-2">
                    <div className="top">
                      <h2 className="text-truncate">折$150</h2>
                    </div>
                    <div className="bottom">
                      <div>
                        <p className="main-text fw-medium pb-2">
                          全站商品 / 課程 - 滿2000元即享優惠NT$150
                        </p>
                        <p className="main-text mb-0 fw-light">
                          有效至 2025/12/31
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* button */}
                  <div className="button-orange d-flex align-items-center flex-shrink-0">
                    <div className="text-group white d-flex flex-column gap-2 ">
                      <h5 className="mb-0 fw-light">領</h5>
                      <h5 className="mb-0 fw-light">取</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
