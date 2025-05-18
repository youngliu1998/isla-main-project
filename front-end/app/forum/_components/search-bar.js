'use client'

import { useState, useRef } from 'react'
import { useFilter } from '../_context/filterContext'

export default function ComponentsSearchBar({
  postCateItems = [],
  productCateItems = [],
  handleAsideSearchChange = () => {},
}) {
  // const router = useRouter()
  const {
    setKeyword,
    keyword,
    setProductCate,
    productCate,
    setPostCate,
    postCate,
  } = useFilter()
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
                    const inputKeyword = searchParamsRef.current.value.trim()
                    if (
                      e.key === 'Enter' &&
                      inputKeyword.length !== 0 &&
                      !isSearchEmpty
                    ) {
                      setKeyword(inputKeyword)
                      handleAsideSearchChange(
                        inputKeyword,
                        productCate,
                        postCate
                      )
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
                  const inputKeyword = searchParamsRef.current.value
                  if (!isSearchEmpty) {
                    setKeyword(inputKeyword)
                    handleAsideSearchChange(inputKeyword, productCate, postCate)
                    searchParamsRef.current.value = ''
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
                  className={`button-clear cate-item px-3 py-2 m-1 rounded-2 fs16 main-text-color text-start rounded-pill ${productCate.includes(i + 1) ? 'active' : ''}`}
                  onClick={(e) => {
                    let newProductCate
                    if (productCate.includes(i + 1)) {
                      newProductCate = productCate.filter((c) => c !== i + 1)
                      setProductCate(newProductCate)
                    } else {
                      newProductCate = [...productCate, i + 1]
                      setProductCate(newProductCate)
                    }
                    handleAsideSearchChange(keyword, newProductCate, postCate)
                    e.target.blur()
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
                  className={`button-clear cate-item px-3 py-2 m-1 rounded-2 fs16 main-text-color text-start rounded-pill ${postCate.includes(i + 1) ? 'active' : ''}`}
                  onClick={(e) => {
                    let newPostCate
                    if (postCate.includes(i + 1)) {
                      newPostCate = postCate.filter((c) => c !== i + 1)
                      setPostCate(newPostCate)
                    } else {
                      newPostCate = [...postCate, i + 1]
                      setPostCate(newPostCate)
                    }
                    handleAsideSearchChange(keyword, productCate, newPostCate)
                    e.target.blur()
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
