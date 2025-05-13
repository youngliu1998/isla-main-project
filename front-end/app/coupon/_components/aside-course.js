'use client'

import './coupon.css'

export default function AsideCourse() {
  return (
    <>
      {/* aside */}
      <aside className="d-none d-md-block col-lg-3 col-md-4 ps-0 mt-0">
        <div className="position-sticky pt-2">
          <h3 className="pb-3 border-bottom border-2">課程</h3>
          <ul className="nav flex-column mb-3">
            <li className="nav-item">
              <a
                className="menu-brand nav-link sub-text fs-5 ps-0"
                href="#"
                data-brand="Unleashia"
              >
                所有課程
              </a>
            </li>
            <li className="nav-item">
              <a
                className="menu-brand nav-link sub-text fs-5 ps-0"
                href="#"
                data-brand="Cosnori"
              >
                韓式彩妝
              </a>
            </li>
            <li className="nav-item">
              <a
                className="menu-brand nav-link sub-text fs-5 ps-0"
                href="#"
                data-brand="Muzigae Mansion"
              >
                專業彩妝
              </a>
            </li>
            <li className="nav-item">
              <a
                className="menu-brand nav-link sub-text fs-5 ps-0"
                href="#"
                data-brand="Kaja"
              >
                日常彩妝
              </a>
            </li>
            <li className="nav-item">
              <a
                className="menu-brand nav-link sub-text fs-5 ps-0"
                href="#"
                data-brand="rom&nd"
              >
                其他課程
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  )
}
