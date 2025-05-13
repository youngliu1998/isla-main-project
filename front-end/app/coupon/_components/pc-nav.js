'use client'

import './coupon.css'

export default function PcNav({
  currentType = '',
  setCurrentType = '',
  showClaimed,
  setShowClaimed,
  isMemberCenter = false,
}) {
  const couponTypes = [
    { label: '全部', value: ' ' },
    { label: '滿額券', value: 1 },
    { label: '折扣券', value: 2 },
    { label: '免運券', value: 3 },
  ]

  const couponStates = [
    { label: '已領取', value: 1 },
    { label: '即將過期', value: 4 },
    { label: '已使用', value: 2 },
    { label: '已過期', value: 3 },
  ]
  const navList = isMemberCenter ? couponStates : couponTypes

  return (
    <ul className="sub-text nav d-none d-md-flex justify-content-center justify-content-md-start mt-3">
      {navList.map((item) => (
        <li
          className="hover-underline nav-item col-3 col-sm-auto"
          key={item.value}
        >
          <a
            className={`nav-link sub-text px-0 px-md-2 px-lg-3 text-center ${
              currentType === item.value ? 'active' : ''
            }`}
            href="#"
            onClick={(e) => {
              e.preventDefault()
              setCurrentType(item.value)
            }}
          >
            {item.label}
          </a>
        </li>
      ))}

      {!isMemberCenter && (
        <div className="form-check form-switch d-flex align-items-center ms-4">
          <input
            className="form-check-input switch me-2"
            type="checkbox"
            role="switch"
            id="switchCheckDefault"
            checked={showClaimed}
            onChange={() => setShowClaimed((prev) => !prev)}
          />
          <label
            className="form-check-label sub-text"
            htmlFor="switchCheckDefault"
          >
            顯示已領取
          </label>
        </div>
      )}
    </ul>
  )
}
