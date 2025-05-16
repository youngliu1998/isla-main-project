'use client'

import { useState } from 'react'
import { useRef } from 'react'

export default function ComponentsSearchBar({
  setKeyword = () => {},
  setProductCate = () => {},
  setPostCate = () => {},
  postCateItems = [],
  productCateItems = [],
}) {
  const searchParamsRef = useRef()
  const [isSearchEmpty, setSearchEmpty] = useState(true)

  return (
    <>
      <div className="col col-2 d-none d-xl-block px-0 ps-xl-2 ps-xxl-0 position-relative">
        <aside className="aside d-flex flex-column gap-3 pt-2 position-sticky">
          <form action="http://localhost:3005/api/forum/posts">
            <div className="search-bar d-flex flex-row align-items-center bottom-stroke">
              <div className="search-header d-flex align-items-center me-auto sub-text-color">
                <input
                  ref={searchParamsRef}
                  className="w-100 px-0"
                  type="text"
                  placeholder="輸入關鍵字"
                  onChange={() => {
                    setSearchEmpty(false)
                  }}
                  onKeyDown={(e) => {
                    const keyword = searchParamsRef.current.value.trim()
                    if (
                      e.key === 'Enter' &&
                      keyword.length !== 0 &&
                      !isSearchEmpty
                    ) {
                      // e.preventDefault()
                      setKeyword(keyword)
                      searchParamsRef.current.value = ''
                      setSearchEmpty(false)
                    }
                  }}
                />
              </div>
              {!isSearchEmpty && (
                <button
                  className={`search-clear d-inline-block button-clear sub-text-color pe-1`}
                  onClick={(e) => {
                    e.preventDefault()
                    if (searchParamsRef.current.value)
                      searchParamsRef.current.value = ''
                    setSearchEmpty(true)
                  }}
                >
                  <i className="bi bi-x fs20"></i>
                </button>
              )}
              <button
                className="d-inline-block button-clear sub-text-color"
                onClick={(e) => {
                  e.preventDefault()
                  if (!isSearchEmpty) {
                    setKeyword(searchParamsRef.current.value)
                    setSearchEmpty(true)
                  }
                }}
              >
                <i className="bi bi-search"></i>
              </button>
            </div>
          </form>
          <div className="cate ps-1">
            <div className="cate-title py-3 rounded-3 fs14 fw-medium sub-text-color">
              商品類型
            </div>
            <div className="cate-button">
              {productCateItems.map((item, i) => (
                <button
                  key={i}
                  className={`button-clear cate-item px-4 py-3 rounded-2 fs16 main-text-color text-start rounded-pill`}
                  onClick={() => {
                    setProductCate(i + 1)
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="cate ps-1">
            <div className="cate-title py-3 rounded-3 fs14 fw-medium sub-text-color">
              文章類型
            </div>
            <div className="cate-button">
              {postCateItems.map((item, i) => (
                <button
                  key={i}
                  className={`button-clear cate-item px-4 py-3 rounded-2 fs16 main-text-color text-start rounded-pill`}
                  onClick={() => {
                    setPostCate(i + 1)
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </>
  )
}
