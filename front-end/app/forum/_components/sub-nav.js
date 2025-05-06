'use client'

import './forum.css'
import Link from 'next/link'
import { useEffect } from 'react'

export default function ComponentsSubNav() {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js').then((bootstrap) => {
      const tooltipTriggerList = document.querySelectorAll(
        '[data-bs-toggle="tooltip"]'
      )
      const tooltipList = [...tooltipTriggerList].map(
        (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
      )
    })
  }, [])
  return (
    <>
      <div className="sub-nav-container col col-2 d-none d-lg-block px-0 position-relative">
        <aside className="sub-nav position-sticky d-flex flex-column gap-3 w-100">
          <div className="sub-nav-items">
            <Link
              href="/"
              className="sub-nav-item d-flex px-3 py-3 gap-1 rounded-3 text-decoration-none fw-medium color-accent"
            >
              <i className="bi bi-plus-lg" />
              <span className="">撰寫貼文</span>
            </Link>
            <Link
              href="/forum"
              className="sub-nav-item d-flex px-3 py-3 gap-1 rounded-3 text-decoration-none fw-medium main-text-color"
            >
              <i className="bi bi-house-door" />
              <span className="">論壇首頁</span>
            </Link>
            <Link
              href="/forum/chat"
              className="sub-nav-item d-flex px-3 py-3 gap-1 rounded-3 text-decoration-none fw-medium main-text-color"
            >
              <i className="bi bi-chat-dots" />
              <span className="">我的訊息</span>
            </Link>
            <Link
              href="/member/my-followings"
              className="sub-nav-item d-flex px-3 py-3 gap-1 rounded-3 text-decoration-none fw-medium main-text-color"
            >
              <i className="bi bi-people" />
              <span className="">追蹤對象</span>
            </Link>
            <Link
              href="/member/my-posts"
              className="sub-nav-item d-flex px-3 py-3 gap-1 rounded-3 text-decoration-none fw-medium main-text-color"
            >
              <i className="bi bi-file-earmark-text" />
              <span className="">我的文章</span>
            </Link>
            <Link
              href="/member/saved-posts"
              className="sub-nav-item d-flex px-3 py-3 gap-1 rounded-3 text-decoration-none fw-medium main-text-color"
            >
              <i className="bi bi-bookmark" />
              <span className="">文章收藏</span>
            </Link>
          </div>

          <div className="ad ps-3 d-none d-lg-block">
            <div className="ad-title fw-medium pt-3 pb-2 bottom-stroke sub-text-color">
              猜你喜歡
            </div>
            <div className="product-card">crystal glam tint</div>
          </div>
        </aside>
      </div>
      <div className="sub-nav-container-sm col col-2 d-block d-lg-none px-0 position-relative">
        <aside className="sub-nav position-sticky d-flex flex-column gap-3 w-100">
          <div className="sub-nav-items">
            <Link
              href="/"
              className="sub-nav-item d-flex px-3 py-3 gap-1 rounded-3 text-decoration-none fw-medium main-color"
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="撰寫貼文"
            >
              <i className="bi bi-plus-lg" />
            </Link>
            <Link
              href="/forum"
              className="sub-nav-item d-flex px-3 py-3 gap-1 rounded-3 text-decoration-none fw-medium main-text-color"
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="論壇首頁"
            >
              <i className="bi bi-house-door" />
            </Link>
            <Link
              href="/forum/chat"
              className="sub-nav-item d-flex px-3 py-3 gap-1 rounded-3 text-decoration-none fw-medium main-text-color"
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="我的訊息"
            >
              <i className="bi bi-chat-dots" />
            </Link>
            <Link
              href="/member/my-followings"
              className="sub-nav-item d-flex px-3 py-3 gap-1 rounded-3 text-decoration-none fw-medium main-text-color"
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="追蹤對象"
            >
              <i className="bi bi-people" />
            </Link>
            <Link
              href="/member/my-posts"
              className="sub-nav-item d-flex px-3 py-3 gap-1 rounded-3 text-decoration-none fw-medium main-text-color"
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="我的文章"
            >
              <i className="bi bi-file-earmark-text" />
            </Link>
            <Link
              href="/member/saved-posts"
              className="sub-nav-item d-flex px-3 py-3 gap-1 rounded-3 text-decoration-none fw-medium main-text-color"
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="文章收藏"
            >
              <i className="bi bi-bookmark" />
            </Link>
          </div>
        </aside>
      </div>
    </>
  )
}
