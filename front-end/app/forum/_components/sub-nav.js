'use client'

// import styles from './forum.module.css'
import './forum.css'
import Link from 'next/link'

export default function ComponentsSubNav() {
  return (
    <>
      <div className="sub-nav-container col col-2 d-block px-0 position-relative">
        <aside className="sub-nav position-sticky d-flex flex-column gap-3 w-100">
          <div className="sub-nav-items">
            <Link
              href="/"
              className="sub-nav-item d-flex px-3 py-3 gap-1 rounded-3 text-decoration-none fw-medium main-color"
            >
              <i className="bi bi-plus-lg" />
              <span className="d-none d-lg-inline">撰寫貼文</span>
            </Link>
            <Link
              href="/forum"
              className="sub-nav-item d-flex px-3 py-3 gap-1 rounded-3 text-decoration-none fw-medium main-text-color"
            >
              <i className="bi bi-house-door" />
              <span className="d-none d-lg-inline">社群首頁</span>
            </Link>
            <Link
              href="/forum/chat"
              className="sub-nav-item d-flex px-3 py-3 gap-1 rounded-3 text-decoration-none fw-medium main-text-color"
            >
              <i className="bi bi-chat-dots" />
              <span className="d-none d-lg-inline">我的訊息</span>
            </Link>
            <Link
              href="/member/my-followings"
              className="sub-nav-item d-flex px-3 py-3 gap-1 rounded-3 text-decoration-none fw-medium main-text-color"
            >
              <i className="bi bi-people" />
              <span className="d-none d-lg-inline">追蹤對象</span>
            </Link>
            <Link
              href="/member/my-posts"
              className="sub-nav-item d-flex px-3 py-3 gap-1 rounded-3 text-decoration-none fw-medium main-text-color"
            >
              <i className="bi bi-file-earmark-text" />
              <span className="d-none d-lg-inline">我的文章</span>
            </Link>
            <Link
              href="/member/saved-posts"
              className="sub-nav-item d-flex px-3 py-3 gap-1 rounded-3 text-decoration-none fw-medium main-text-color"
            >
              <i className="bi bi-bookmark" />
              <span className="d-none d-lg-inline">文章收藏</span>
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
    </>
  )
}
