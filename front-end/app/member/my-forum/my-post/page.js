'use client'

import React, { useState, useEffect } from 'react'
import ComponentsAuthorInfo from '@/app/forum/_components/author-info'
import useSWR from 'swr'
import { useRouter } from 'next/navigation'
import '@/app/forum/_components/forum.css'
import Link from 'next/link'

const fetcher = (url) =>
  fetch(url, {
    method: 'GET',
    referrerPolicy: 'no-referrer-when-downgrade',
  }).then((res) => res.json())

export default function MyPostPage(props) {
  const router = useRouter()
  const userID = 1
  const postsAPI = 'http://localhost:3005/api/forum/posts'
  const { data, isLoading, error, mutate } = useSWR(postsAPI, fetcher)
  if (error) {
    console.log(error)
    return (
      <main className="main col col-10 col-xl-8 d-flex flex-column align-items-center">
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
      </>
    )
  }
  if (posts.length === 0) {
    return (
      <>
        <main className="main col col-10 col-xl-8 d-flex flex-column align-items-center">
          無文章資料
        </main>
      </>
    )
  }
  return (
    <>
      <div className="body">
        <div className="my-following-header d-flex align-items-center px-4 pt-4 pb-2">
          <div className="me-auto fs32 fw-bold">我的追蹤</div>
          <Link className="text-main px-3 py-2 rounded-pill" href={'/forum'}>
            <i class="bi bi-box-arrow-left me-2"></i>
            回到社群
          </Link>
        </div>
        <div className="posts d-flex flex-column gap-3 w-100">
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
                  router.push(`/forum/123${post.id}`)
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') router.push(`/forum/123${post.id}`)
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
                  <button
                    className="evaluate liked px-2 py-1 border-0 rounded-3 d-flex align-items-center bg-pure-white"
                    onClick={async (e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      try {
                        if (!post.liked_user_ids.includes(userID)) {
                          const res = await fetch(
                            'http://localhost:3005/api/forum/liked-saved/liked',
                            {
                              method: 'post',
                              headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({ userID, postID }),
                            }
                          )
                          const resData = await res.json()
                          if (resData.status === 'success') {
                            mutate()
                          }
                        } else {
                          const res = await fetch(
                            'http://localhost:3005/api/forum/liked-saved/liked',
                            {
                              method: 'delete',
                              headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({ userID, postID }),
                            }
                          )
                          const resData = await res.json()
                          if (resData.status === 'success') {
                            mutate()
                          }
                        }
                      } catch (error) {
                        console.log(error)
                      }
                    }}
                  >
                    <i
                      className={`bi ${post.liked_user_ids.includes(userID) ? 'bi-heart-fill main-color' : 'bi-heart'} me-1`}
                    />
                    {post.liked_user_ids.length}
                  </button>
                  <button className="evaluate comment px-2 py-1 border-0 rounded-3 d-flex align-items-center bg-pure-white">
                    <i className="bi bi-chat-left me-1" />8
                  </button>
                  <button
                    className="evaluate saved px-2 py-1 border-0 rounded-3 d-flex align-items-center bg-pure-white"
                    onClick={async (e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      try {
                        if (!post.saved_user_ids.includes(userID)) {
                          const res = await fetch(
                            'http://localhost:3005/api/forum/liked-saved/saved',
                            {
                              method: 'post',
                              headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({ userID, postID }),
                            }
                          )
                          const resData = await res.json()
                          if (resData.status === 'success') {
                            mutate()
                          }
                        } else {
                          const res = await fetch(
                            'http://localhost:3005/api/forum/liked-saved/saved',
                            {
                              method: 'delete',
                              headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({ userID, postID }),
                            }
                          )
                          const resData = await res.json()
                          if (resData.status === 'success') {
                            mutate()
                          }
                        }
                      } catch (error) {
                        console.log(error)
                      }
                    }}
                  >
                    <i
                      className={`bi ${post.saved_user_ids.includes(userID) ? 'bi-bookmark-fill bookmark-fill' : 'bi-bookmark'}  me-1`}
                    />
                    {post.saved_user_ids.length}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
