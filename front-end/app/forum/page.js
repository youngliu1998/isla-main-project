'use client'

import ComponentsSearchBar from './_components/search-bar'
import Link from 'next/link'
import ComponentsAvatar from './_components/avatar'
import Image from 'next/image'
import ComponentsAuthorInfo from './_components/author-info'
import useSWR from 'swr'
import { useEffect, useState, useRef } from 'react'
import EditPostModal from './_components/edit-post-modal'

const fetcher = (...arg) => fetch(...arg).then((res) => res.json())

export default function ForumPage(props) {
  // fetch資料
  const url = 'http://localhost:3005/api/forum/posts'
  const { data, isLoading, error } = useSWR(url, fetcher)
  if (error) {
    console.log(error)
    return (
      <main className="main col col-10 col-xl-8 d-flex flex-column align-items-center">
        無文章資料
      </main>
    )
  }
  const posts = data?.status === 'success' ? data?.data?.posts : []

  if (isLoading) {
    return (
      <main className="main col col-10 col-xl-8 d-flex flex-column align-items-center">
        isLoading
      </main>
    )
  }
  if (posts.length === 0) {
    return (
      <main className="main col col-10 col-xl-8 d-flex flex-column align-items-center">
        無文章資料
      </main>
    )
  }

  return (
    <>
      <main className="main col col-10 col-xl-8 d-flex flex-column align-items-center">
        <div className="posts d-flex flex-column gap-3 w-100">
          <div className="switchers d-flex flex-row">
            <div className="switcher d-flex justify-content-center align-items-center">
              熱門
            </div>
            <div className="switcher d-flex justify-content-center align-items-center">
              最新
            </div>
            <button
              className="switcher dropdown-toggle d-flex d-xl-none justify-content-center align-items-center gap-1 text-decoration-none main-text-color"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              分類
            </button>
            <div className="dropdown-menu px-3 py-2 shadow-lg border-0">
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
                <button className="dropdown-item-forum px-2 py-1 rounded-3">
                  唇膏
                </button>
                <button className="dropdown-item-forum rounded-3">唇膏</button>
                <button className="dropdown-item-forum rounded-3">唇膏</button>
                <button className="dropdown-item-forum rounded-3">唇膏</button>
              </div>
            </div>
          </div>
          {posts.map((post) => {
            return (
              <Link
                href={`/forum/123${post.id}`}
                className="post d-flex flex-column gap-1 px-4 py-3 rounded-3 shadow-forum"
                key={post.user_id}
                onClick={() => {
                  console.log('到過')
                }}
              >
                <ComponentsAuthorInfo
                  memberID={post.user_id}
                  width="21"
                  src={`/images/forum/320.webp`}
                  alt="user_name"
                  fontSize="14"
                  color="var(--sub-text)"
                  authorName="user_name"
                />
                <div className="post-header d-flex">
                  <div className="post-title me-2 fw-medium text-truncate main-text-color">
                    {post.title}
                  </div>
                  <div className="post-tag px-2 py-1 rounded-pill fs12 text-nowrap   bg-gray-article main-color">
                    {post.post_cate_name}
                  </div>
                </div>
                <div className="post-content text-truncate fs14 sub-text-color">
                  {post.content}
                </div>
                <div className="imgs d-flex gap-3 overflow-auto">
                  <div className="img flex-shrink-0 rounded-3" />

                  <div className="img flex-shrink-0 rounded-3" />
                  <div className="img flex-shrink-0 rounded-3" />
                  <div className="img flex-shrink-0 rounded-3" />
                  <div className="img flex-shrink-0 rounded-3" />
                  <div className="img flex-shrink-0 rounded-3" />
                  <div className="img flex-shrink-0 rounded-3" />
                  <div className="img flex-shrink-0 rounded-3" />
                  <div className="img flex-shrink-0 rounded-3" />
                  <div className="img flex-shrink-0 rounded-3" />
                </div>
                <div className="evaluates d-flex fs14 ms-n4">
                  <button className="evaluate px-2 py-1 border-0 rounded-3 d-flex align-items-center">
                    <i className="bi bi-heart me-1" />
                    {post.liked_user_ids.length}
                  </button>
                  <button className="evaluate px-2 py-1 border-0 rounded-3 d-flex align-items-center">
                    <i className="bi bi-chat-left me-1" />8
                  </button>
                  <button className="evaluate px-2 py-1 border-0 rounded-3 d-flex align-items-center">
                    <i className="bi bi-bookmark me-1" />
                    {post.saved_user_ids.length}
                  </button>
                </div>
              </Link>
            )
          })}
        </div>
      </main>
      <ComponentsSearchBar />
      <EditPostModal />
    </>
  )
}
