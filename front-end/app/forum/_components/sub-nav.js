'use client'

import './forum.css'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import EditPostModal from './edit-post-modal'

export default function ComponentsSubNav() {
  const modalRef = useRef()
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js').then((bootstrap) => {
      document
        .querySelectorAll('[data-bs-toggle="tooltip"]')
        .forEach((el) => new bootstrap.Tooltip(el))

      const modalEl = modalRef.current
      if (modalEl) {
        new bootstrap.Modal(modalEl, {
          backdrop: true,
          keyboard: true,
        })
      }
    })
  }, [])

  const url = usePathname()
  return (
    <>
      <div className="sub-nav-container col col-2 d-none d-lg-block px-0 position-relative">
        <aside className="sub-nav position-sticky d-flex flex-column gap-3 w-100">
          <div className="sub-nav-items">
            <Link
              href="/"
              className={`sub-nav-item d-flex px-3 py-3 gap-1 rounded-3 text-decoration-none fw-medium main-color`}
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#editPostModal"
            >
              <i className="bi bi-plus-lg" />
              <span className="">撰寫貼文</span>
            </Link>
            <Link
              href="/forum"
              className={`sub-nav-item d-flex px-3 py-3 gap-1 rounded-3 text-decoration-none fw-medium main-text-color ${url === '/forum' ? 'bg-hover' : ''}`}
            >
              <i className="bi bi-house-door" />
              <span className="">論壇首頁</span>
            </Link>
            <Link
              href="/forum/chat"
              className={`sub-nav-item d-flex px-3 py-3 gap-1 rounded-3 text-decoration-none fw-medium main-text-color ${url === '/forum/chat' ? 'bg-hover' : ''}`}
            >
              <i className="bi bi-chat-dots" />
              <span className="">我的訊息</span>
            </Link>
            <Link
              href="/member/my-forum/my-following"
              className={`sub-nav-item d-flex px-3 py-3 gap-1 rounded-3 text-decoration-none fw-medium main-text-color ${url === '/member/my-following' ? 'bg-hover' : ''}`}
            >
              <i className="bi bi-people" />
              <span className="">追蹤對象</span>
            </Link>
            <Link
              href="/member/my-forum/my-post"
              className={`sub-nav-item d-flex px-3 py-3 gap-1 rounded-3 text-decoration-none fw-medium main-text-color ${url === '/member/my-post' ? 'bg-hover' : ''}`}
            >
              <i className="bi bi-file-earmark-text" />
              <span className="">我的文章</span>
            </Link>
            <Link
              href="/member/my-forum/saved-post"
              className={`sub-nav-item d-flex px-3 py-3 gap-1 rounded-3 text-decoration-none fw-medium main-text-color ${url === '/member/saved-posts' ? 'bg-hover' : ''}`}
            >
              <i className="bi bi-bookmark" />
              <span className="">文章收藏</span>
            </Link>
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
      {/* <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">...</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </>
  )
}
