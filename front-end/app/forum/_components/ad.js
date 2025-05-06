'use client'

import React, { useState, useEffect } from 'react'

export default function ComponentsAd() {
  return (
    <>
      <div className="col col-2 d-none d-xl-block px-0 position-relative">
        <aside className="aside d-flex flex-column gap-3 position-sticky">
          <div className="ad ps-3 d-none d-lg-block">
            <div className="ad-title fw-medium pt-3 pb-2 bottom-stroke sub-text-color">
              猜你喜歡
            </div>
            <div className="product-card">crystal glam tint</div>
          </div>
        </aside>
      </div>
    </>
  )
}
