'use client'

export default function AsideProduct() {
  return (
    <>
      {/* aside */}
      <aside className="d-none d-md-block col-lg-3 col-md-4 ps-0 mt-0">
        <div className="position-sticky pt-2">
          <h3 className="pb-3 border-bottom border-2">品牌</h3>
          <ul className="nav flex-column mb-3">
            <li className="nav-item">
              <a className="menu-brand nav-link sub-text fs-5" href="#">
                Unleashia
              </a>
            </li>
            <li className="nav-item">
              <a className="menu-brand nav-link sub-text fs-5" href="#">
                Cosnori
              </a>
            </li>
            <li className="nav-item">
              <a className="menu-brand nav-link sub-text fs-5" href="#">
                Muzigae Mansion
              </a>
            </li>
            <li className="nav-item">
              <a className="menu-brand nav-link sub-text fs-5" href="#">
                Kaja
              </a>
            </li>
            <li className="nav-item">
              <a className="menu-brand nav-link sub-text fs-5" href="#">
                rom&amp;nd
              </a>
            </li>
          </ul>
          <h3 className="py-3 border-bottom border-2">種類</h3>
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="menu-category nav-link sub-text fs-5" href="#">
                眼影
              </a>
            </li>
            <li className="nav-item">
              <a className="menu-category nav-link sub-text fs-5" href="#">
                唇蜜
              </a>
            </li>
            <li className="nav-item">
              <a className="menu-category nav-link sub-text fs-5" href="#">
                口紅
              </a>
            </li>
            <li className="nav-item">
              <a className="menu-category nav-link sub-text fs-5" href="#">
                粉底
              </a>
            </li>
            <li className="nav-item">
              <a className="menu-category nav-link sub-text fs-5" href="#">
                氣墊粉餅
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  )
}
