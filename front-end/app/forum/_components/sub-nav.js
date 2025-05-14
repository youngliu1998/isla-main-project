'use client'

import './forum.css'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import EditPostModal from './edit-post-modal'
import ComponentsAuthorInfo from './author-info'

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
              className={`sub-nav-item d-flex px-3 py-3 gap-2 rounded-3 text-decoration-none fw-medium main-color`}
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#editPostModal"
              onMouseUp={(e) => {
                e.currentTarget.blur()
              }}
            >
              <i className="bi bi-plus-lg" />
              <span className="">撰寫貼文</span>
            </Link>
            <Link
              href="/forum"
              className={`sub-nav-item d-flex px-3 py-3 gap-2 rounded-3 text-decoration-none fw-medium main-text-color`}
              onMouseUp={(e) => {
                e.currentTarget.blur()
              }}
            >
              <i
                className={`bi ${url === '/forum' ? 'bi-house-door-fill' : 'bi-house-door'}`}
              />
              <span className="">論壇首頁</span>
            </Link>
            <Link
              href="/forum/chat"
              className={`sub-nav-item d-flex px-3 py-3 gap-2 rounded-3 text-decoration-none fw-medium main-text-color`}
              onMouseUp={(e) => {
                e.currentTarget.blur()
              }}
            >
              <i
                className={`bi ${url === '/forum/chat' ? 'bi-chat-dots-fill' : 'bi-chat-dots'}`}
              />
              <span className="">我的訊息</span>
            </Link>

            <div
              className={`sub-nav-item d-flex px-3 py-3 gap-2 rounded-3 text-decoration-none fw-medium main-text-color fs16`}
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseOne"
              aria-expanded="true"
              aria-controls="panelsStayOpen-collapseOne"
              role="button"
            >
              <i className="bi bi-people" />
              <span className="">追蹤對象</span>
            </div>
            <div
              id="panelsStayOpen-collapseOne"
              className="accordion-collapse collapse show"
            >
              <div className="followings fs14 d-flex flex-column px-3 py-1 gap-2">
                <Link
                  href={`/forum/profile/1`}
                  className="followings-link main-text-color py-1"
                >
                  <ComponentsAuthorInfo
                    authorID="1"
                    width="20"
                    src="/images/forum/320.webp"
                    alt="userName"
                    fontSize="14"
                    color="var(--main-text)"
                    authorName="lilly"
                  />
                </Link>
                <Link
                  href={`/forum/profile/userID`}
                  className="followings-link main-text-color py-1"
                >
                  <ComponentsAuthorInfo
                    authorID="123"
                    width="20"
                    src="/images/forum/320.webp"
                    alt="userName"
                    fontSize="14"
                    color="var(--main-text)"
                    authorName="lilly"
                  />
                </Link>
                <Link
                  href={`/forum/profile/userID`}
                  className="followings-link main-text-color py-1"
                >
                  <ComponentsAuthorInfo
                    authorID="123"
                    width="20"
                    src="/images/forum/320.webp"
                    alt="userName"
                    fontSize="14"
                    color="var(--main-text)"
                    authorName="lilly"
                  />
                </Link>
                <Link
                  href={'/member/my-forum/my-following'}
                  className="more-followings-link main-color text-center rounded-pill px-0 py-1 w-auto"
                >
                  查看全部<i className="bi bi-arrow-up-right"></i>
                </Link>
              </div>
            </div>

            <Link
              href="/member/my-forum/my-post"
              className={`sub-nav-item d-flex px-3 py-3 gap-2 rounded-3 text-decoration-none fw-medium main-text-color`}
            >
              <i className="bi bi-file-earmark-text" />
              <span className="">我的文章</span>
              <i className="bi bi-arrow-up-right"></i>
            </Link>
            <Link
              href="/member/my-forum/saved-post"
              className={`sub-nav-item d-flex px-3 py-3 gap-2 rounded-3 text-decoration-none fw-medium main-text-color`}
            >
              <i className="bi bi-bookmark" />
              <span className="">文章收藏</span>
              <i className="bi bi-arrow-up-right"></i>
            </Link>
          </div>
        </aside>
      </div>
      <div className="sub-nav-container-sm col col-2 d-block d-lg-none px-0 position-relative">
        <aside className="sub-nav position-sticky d-flex flex-column gap-3 w-100">
          <div className="sub-nav-items">
            <div
              data-bs-toggle="modal"
              data-bs-target="#editPostModal"
              role="button"
            >
              <div
                className="sub-nav-item d-flex px-3 py-3 gap-2 rounded-3 text-decoration-none fw-medium main-color"
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                title="撰寫貼文"
              >
                <i className="bi bi-plus-lg" />
              </div>
            </div>
            {/* 莫名故障
            <Link
              href="/forum"
              className="sub-nav-item d-flex px-3 py-3 gap-2 rounded-3 text-decoration-none fw-medium main-text-color"
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="論壇首頁"
              onMouseUp={(e) => {
                e.currentTarget.blur()
              }}
            >
              <i
                className={`bi ${url === '/forum' ? 'bi-house-door-fill' : 'bi-house-door'}`}
              />
            </Link> */}
            <Link
              href="/forum"
              className="sub-nav-item d-flex px-3 py-3 gap-2 rounded-3 text-decoration-none fw-medium main-text-color"
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="論壇首頁"
              onMouseUp={(e) => {
                e.currentTarget.blur()
              }}
            >
              <i
                className={`bi ${url === '/forum' ? 'bi-house-door-fill' : 'bi-house-door'}`}
              />
            </Link>
            <Link
              href="/forum/chat"
              className="sub-nav-item d-flex px-3 py-3 gap-2 rounded-3 text-decoration-none fw-medium main-text-color"
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="我的訊息"
              onMouseUp={(e) => {
                e.currentTarget.blur()
              }}
            >
              <i
                className={`bi ${url.includes('/forum/chat') ? 'bi-chat-dots-fill' : 'bi-chat-dots'}`}
              />
            </Link>
            <Link
              href="/member/my-forum/my-following"
              className="sub-nav-item d-flex px-3 py-3 gap-2 rounded-3 text-decoration-none fw-medium main-text-color"
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="追蹤對象"
            >
              <i className="bi bi-people" />
            </Link>
            <Link
              href="/member/my-forum/my-post"
              className="sub-nav-item d-flex px-3 py-3 gap-2 rounded-3 text-decoration-none fw-medium main-text-color"
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="我的文章"
            >
              <i className="bi bi-file-earmark-text" />
            </Link>
            <Link
              href="/member/my-forum/saved-post"
              className="sub-nav-item d-flex px-3 py-3 gap-2 rounded-3 text-decoration-none fw-medium main-text-color"
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
