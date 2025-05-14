'use client'

import ComponentsSearchBar from '../../_components/search-bar'
import Link from 'next/link'
import ComponentsAvatar from '../../_components/avatar'
import Image from 'next/image'
import ComponentsAuthorInfo from '../../_components/author-info'
import useSWR from 'swr'
import { useEffect, useState, useRef } from 'react'
import EditPostModal from '../../_components/edit-post-modal'
import { ClientPageRoot } from 'next/dist/client/components/client-page'
import { useParams, useRouter } from 'next/navigation'
import ComponentsButtonFollowingChat from '../../_components/btn-following-chat'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function ForumPage(props) {
  // 導向
  const router = useRouter()

  const authorID = useParams().profileID
  const userID = 1

  // fetch每篇文章的資料
  const postsAPI = `http://localhost:3005/api/forum/posts/profile?authorID=${authorID}`
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
        <main className="main col col-10 d-flex flex-column align-items-center">
          isLoading
        </main>
      </>
    )
  }
  if (posts.length === 0) {
    return (
      <>
        <main className="main col col-10 d-flex flex-column align-items-center">
          很抱歉，我們找不到這位使用者
        </main>
      </>
    )
  }

  return (
    <>
      <main className="main col col-10 col-xl-8 d-flex flex-column align-items-center">
        {/* author-card-sm */}
        <div className="author-card d-block d-xl-none position-relative px-0 mb-3 w-100">
          <aside className="aside d-flex flex-column gap-3 position-sticky">
            <div className="d-flex flex-wrap justify-content-center align-items-center gap-3 px-2">
              <div className="author-info d-flex align-items-center gap-2 me-auto">
                <ComponentsAvatar
                  src="/images/forum/320.webp"
                  alt="Mandy"
                  classWidth="64"
                />
                <span className="fs24 fw-medium">Mandy</span>
              </div>
              <div className="d-flex justify-content-end gap-3 text-nowrap">
                <div className="d-flex align-items-center gap-2">
                  <span className="fs24 main-color">430</span>
                  <span className="fs14 main-text-color">粉絲</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <span className="fs24 main-color">45</span>
                  <span className="fs14 main-text-color">文章</span>
                </div>
              </div>
            </div>
            <ComponentsButtonFollowingChat />
          </aside>
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
                  router.push(`/forum/${post.id}`)
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') router.push(`/forum/123${post.id}`)
                }} //無障礙通用設計
                role="link"
                tabIndex={0} //可被tab鍵聚焦
                style={{ cursor: 'pointer' }}
              >
                <ComponentsAuthorInfo
                  authorID={post.user_id}
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
      </main>
      {/* author-card-xl */}
      <div className="author-card col col-2 d-none d-xl-block position-relative px-0 mb-3">
        <aside className="aside d-flex flex-column p-4 gap-3 position-sticky bg-pure-white card-border shadow-forum rounded-3 ">
          <div className="d-flex flex-column justify-content-center align-items-center gap-3">
            <div className="d-flex flex-column align-items-center gap-1 w-100">
              <ComponentsAvatar
                src="/images/forum/320.webp"
                alt="Mandy"
                classWidth="64"
              />
              <span className="fs24 fw-medium">Mandy</span>
            </div>
            <div className="d-flex justify-content-end gap-3 text-nowrap">
              <div className="d-flex align-items-center gap-2 w-50">
                <span className="fs24 main-color">430</span>
                <span className="fs14 main-text-color">粉絲</span>
              </div>
              <div className="d-flex align-items-center gap-2 w-50">
                <span className="fs24 main-color">45</span>
                <span className="fs14 main-text-color">文章</span>
              </div>
            </div>
          </div>
          <ComponentsButtonFollowingChat />
        </aside>
      </div>
      <EditPostModal />
    </>
  )
}
