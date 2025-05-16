'use client'

import React, { useState, useEffect } from 'react'
import ComponentsSearchBar from '../_components/search-bar'
import Componentstab from '../../_components/tab'
import EditPostModal from '../_components/edit-post-modal'
import { ForumProvider, useForum } from '../_context/forum-context'

export default function HomeLayout({ children }) {
  const { setTab, setKeyword, setProductCate, setPostCate } = useForum()
  // 分類篩選
  const postCateItems = ['分享', '請益', '討論', '試色']
  const productCateItems = ['唇膏', '底妝']
  return (
    <>
      <ForumProvider>
        <main className="main col col-10 col-xl-8 d-flex flex-column align-items-center">
          <div className="posts d-flex flex-column gap-3 w-100">
            <div className="tabs d-flex">
              <Componentstab
                items={['熱門', '最新']}
                height={'40'}
                setCate={setTab}
                mutate={mutate}
              />

              <button
                className="switcher button-clear dropdown-toggle d-flex d-xl-none justify-content-center align-items-center gap-1 text-decoration-none sub-text-color"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                分類
              </button>
              {/* <div className="dropdown-menu px-3 py-2 shadow-lg border-0">
              <div>
                <div className="dropdown-label py-1 fs12 sub-text-color">
                  商品類型
                </div>
                <button className="dropdown-item-forum px-2 py-1 rounded-3">
                  唇膏
                </button>
                <button className="dropdown-item-forum rounded-3">唇膏</button>
                <button className="dropdown-item-forum rounded-3">唇膏</button>
              </div>
              <div>
                <div className="dropdown-label py-1 fs12 sub-text-color">
                  文章類型
                </div>
                <button className="dropdown-item-forum px-2 py-1 rounded-3 button-clear">
                  唇膏
                </button>
                <button className="dropdown-item-forum rounded-3 button-clear">
                  唇膏
                </button>
                <button className="dropdown-item-forum rounded-3 button-clear">
                  唇膏
                </button>
                <button className="dropdown-item-forum rounded-3 button-clear">
                  唇膏
                </button>
              </div>
            </div> */}
            </div>
            {children}
          </div>
        </main>
        <ComponentsSearchBar
          setKeyword={setKeyword}
          setProductCate={setProductCate}
          setPostCate={setPostCate}
          postCateItems={postCateItems}
          productCateItems={productCateItems}
        />
        <EditPostModal />
      </ForumProvider>
    </>
  )
}
