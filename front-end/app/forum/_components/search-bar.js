'use client'

export default function ComponentsSearchBar() {
  return (
    <>
      <div className="col col-2 d-none d-xl-block px-0 position-relative">
        <aside className="aside d-flex flex-column gap-3 position-sticky">
          <div className="search-bar d-flex flex-row align-items-center bottom-stroke">
            <div className="search-header d-flex align-items-center me-auto">
              {/* icon記得改import */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
              <input
                className="w-100"
                type="text"
                placeholder="搜尋文章、標籤"
              />
            </div>
            <div className="search-clear">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                fill="currentColor"
                className="bi bi-x-lg"
                viewBox="0 0 16 16"
              >
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
              </svg>
            </div>
          </div>
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
