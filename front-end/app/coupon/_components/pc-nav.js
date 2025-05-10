'use client'

import './coupon.css'

export default function PcNav() {
  return (
    <>
      <ul className="sub-text nav d-none d-md-flex justify-content-center justify-content-md-start mt-3">
        <li className="hover-underline nav-item col-3 col-sm-auto">
          <a
            className="nav-link sub-text active ps-md-0 pe-md-3 text-center"
            aria-current="page"
            href="#"
          >
            全部
          </a>
        </li>
        <li className="hover-underline nav-item col-3 col-sm-auto">
          <a
            className="nav-link sub-text px-0 px-md-2 px-lg-3 text-center"
            href="#"
          >
            滿額券
          </a>
        </li>
        <li className="hover-underline nav-item col-3 col-sm-auto">
          <a
            className="nav-link sub-text px-0 px-md-2 px-lg-3 text-center"
            href="#"
          >
            折扣券
          </a>
        </li>
        <div className="form-check form-switch d-flex align-items-center ms-4">
          <input
            className="form-check-input switch me-2"
            type="checkbox"
            role="switch"
            id="switchCheckDefault"
          />
          <label
            className="form-check-label sub-text"
            htmlFor="switchCheckDefault"
          >
            顯示已領取
          </label>
        </div>
      </ul>
    </>
  )
}
