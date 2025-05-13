'use client'

import ComponentsSearchBar from './_components/search-bar'
import Link from 'next/link'
import ComponentsAvatar from './_components/avatar'
import Image from 'next/image'
import ComponentsAuthorInfo from './_components/author-info'
import useSWR from 'swr'
import { useEffect, useState, useRef } from 'react'
import EditPostModal from './_components/edit-post-modal'
import { ClientPageRoot } from 'next/dist/client/components/client-page'
import { useRouter } from 'next/navigation'
import ComponentsBtnLikedSaved from './_components/btn-liked-saved'

const fetcher = (url) =>
  fetch(url, {
    method: 'GET',
    referrerPolicy: 'no-referrer-when-downgrade',
  }).then((res) => res.json())

export default function ForumPage(props) {
  // 導向
  const router = useRouter()

  // 取得userID
  const userID = 7

  // fetch每篇文章的資料
  const postsAPI = 'http://localhost:3005/api/forum/posts'
  const { data, isLoading, error, mutate } = useSWR(postsAPI, fetcher)
  if (error) {
    console.log(error)
    return (
      <main className="main col col-10 d-flex flex-column align-items-center">
        連線錯誤
      </main>
    )
  }
  // console.log(data)
  const posts = data?.status === 'success' ? data?.data : []
  if (isLoading) {
    return (
      <>
        <main className="main col col-10 col-xl-8 d-flex flex-column align-items-center">
          isLoading
        </main>
        <ComponentsSearchBar />
      </>
    )
  }
  if (posts.length === 0) {
    return (
      <>
        <main className="main col col-10 d-flex flex-column align-items-center">
          無文章資料
        </main>
        <ComponentsSearchBar />
      </>
    )
  }
  // evaluate btn handler
  const handleEvaluateDelete = async (type, userID, postID) => {
    const res = await fetch(
      `http://localhost:3005/api/forum/liked-saved/${type}`,
      {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userID, postID }),
      }
    )
    const json = await res.json()
    if (json.status === 'success') {
      // 需要這個防呆嗎？QU
      mutate()
    }
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
            const postID = post.id
            return (
              <div
                // href={`/forum/123${post.id}`}
                className="post-home d-flex flex-column gap-1 px-4 py-3 rounded-3 shadow-forum bg-pure-white card-border"
                key={post.id}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  router.push(`/forum/${post.id}`)
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') router.push(`/forum/${post.id}`)
                }} //無障礙通用設計
                role="link"
                tabIndex={0} //可被tab鍵聚焦
                style={{ cursor: 'pointer' }}
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
                    {post.cate_name}
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
                </div>
                <div className="evaluates d-flex fs14 ms-n4">
                  <ComponentsBtnLikedSaved
                    type="liked"
                    active={post.liked_user_ids.includes(userID)}
                    count={post.liked_user_ids.length}
                    postID={postID}
                    userID={userID}
                    mutate={mutate}
                  />
                  <button className="evaluate comment px-2 py-1 border-0 rounded-3 d-flex align-items-center bg-pure-white">
                    <i className="bi bi-chat-left me-1" />8
                  </button>
                  <ComponentsBtnLikedSaved
                    type="saved"
                    active={post.saved_user_ids.includes(userID)}
                    count={post.saved_user_ids.length}
                    postID={postID}
                    userID={userID}
                    mutate={mutate}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </main>
      <ComponentsSearchBar />
      <EditPostModal />
    </>
  )
}
