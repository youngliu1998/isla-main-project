'use client'

import './coupon.css'

export default function MobileNav() {
  return (
    <>
      {/* mobile */}
      <nav className="d-flex d-md-none row justify-content-center">
        <div className="col-6 px-5 py-3 border-4 border-bottom">
          <h4 className="text-center sub-text">商品</h4>
        </div>
        <div className="col-6 px-5 py-3 border-4 border-bottom">
          <h4 className="text-center sub-text">課程</h4>
        </div>
      </nav>
    </>
  )
}
