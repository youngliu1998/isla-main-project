'use client'

import { useEffect, useState } from 'react'
import { useRef } from 'react'
import { useFilter } from '../_context/filterContext'
import { useRouter } from 'next/navigation'

export default function ComponentsSearchBar({
  // setKeyword = () => {},
  // setProductCate = () => {},
  // setPostCate = () => {},
  postCateItems = [],
  productCateItems = [],
  handleRouterPush = () => {},
}) {
  const router = useRouter()
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

  // useEffect(() => {
  //   // NOTE 本來拆開在button事件中，使用button點擊事件作為跳轉判端依據，需要寫重複兩次程式，每次也會是新params因此product和post無法相互繼承
  //   // 篩選網址
  //   // 1.點擊篩選項目->紀錄至陣列中 -> 已存的刪除，新的加入
  //   // 2.用URLSearchParams結合productCate PostCate keywordCate
  //   // 2.陣列有變動時，推送新網址
  //   const params = new URLSearchParams()
  //   if (keyword.length) {
  //     params.append('keyword', keyword)
  //   }
  //   if (productCate.length) {
  //     params.append('productCate', productCate.join('+'))
  //   }
  //   if (postCate.length) {
  //     params.append('postCate', postCate.join('+'))
  //   }
  //   router.push(`http://localhost:3000/forum?${params.toString()}`)
  // }, [keyword, productCate, postCate, router])

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
                    const inputKeyword = searchParamsRef.current.value
                    setKeyword(inputKeyword)
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
                    productCate.includes(i + 1)
                      ? setProductCate(productCate.filter((c) => c !== i + 1))
                      : setProductCate([...productCate, i + 1])
                    handleRouterPush('', i + 1, '')
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
                    postCate.includes(i + 1)
                      ? setPostCate(postCate.filter((c) => c !== i + 1))
                      : setPostCate([...postCate, i + 1])
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
