'use client'

export default function AsideProduct() {
  return (
    <>
      {/* aside */}
      <aside className="d-none d-md-block col-lg-3 col-md-4 ps-0 mt-0">
        <div className="position-sticky pt-2 px-3">
          <section className="mb-4">
            <h5 className="aside-title">品牌</h5>
            <ul className="nav flex-column">
              {[
                'Unleashia',
                'Cosnori',
                'Muzigae Mansion',
                'Kaja',
                'rom&nd',
              ].map((brand, index) => (
                <li key={index} className="nav-item">
                  <a href="#" className="aside-link nav-link py-1">
                    {brand}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h5 className="aside-title">種類</h5>
            <ul className="nav flex-column">
              {['眼影', '唇蜜', '口紅', '粉底', '氣墊粉餅'].map(
                (type, index) => (
                  <li key={index} className="nav-item">
                    <a href="#" className="aside-link nav-link py-1">
                      {type}
                    </a>
                  </li>
                )
              )}
            </ul>
          </section>
        </div>
      </aside>
    </>
  )
}
