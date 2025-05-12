'use client'

export default function ComponentsSearchBar() {
  return (
    <>
      <div className="col col-2 d-none d-xl-block px-0 position-relative">
        <aside className="aside d-flex flex-column gap-3 position-sticky">
          <form action="//localhost:3005/api/forum/posts">
            <div className="search-bar d-flex flex-row align-items-center bottom-stroke">
              <div className="search-header d-flex align-items-center me-auto">
                {/* icon記得改import */}
                <i className="bi bi-search"></i>
                <input
                  className="w-100"
                  type="text"
                  placeholder="搜尋文章、標籤"
                  name="queryParam"
                />
              </div>
              <button className="search-clear d-inline-block">
                <i className="bi bi-x"></i>
              </button>
            </div>
          </form>
          <div className="cate">
            <div className="cate-title px-4 py-3 rounded-3 fs14 fw-medium sub-text-color">
              文章類型
            </div>
            <div className="cate-item">分享</div>
            <div className="cate-item">試色</div>
            <div className="cate-item">情報</div>
            <div className="cate-item">請益</div>
          </div>
        </aside>
      </div>
    </>
  )
}
