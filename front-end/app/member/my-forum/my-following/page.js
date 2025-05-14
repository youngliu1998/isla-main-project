'use client'

import React, { useState, useEffect } from 'react'
import ComponentsAuthorInfo from '@/app/forum/_components/author-info'
import useSWR from 'swr'
import { useRouter } from 'next/navigation'
import '@/app/forum/_components/forum.css'
import Link from 'next/link'
import ComponentsAvatar from '@/app/forum/_components/avatar'
import FollowingCard from './following-card'
import ComponentsButtonFollowingChat from '@/app/forum/_components/btn-following-chat'

export default function MyPostPage(props) {
  const router = useRouter()
  const userID = 1
  const fetcher = (...arg) => fetch(...arg).then((res) => res.json())
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
        <div className="my-following d-flex flex-column gap-3 w-100 rounded-3 px-4 py-4 bg-pure-white card-border shadow-forum">
          <div className="my-following-header d-flex align-items-center justify-content-sm-between justify-content-center flex-wrap">
            <div className="fs32 fw-bold text-nowrap">我的追蹤</div>
            <Link
              className="text-main px-3 py-2 rounded-pill text-nowrap"
              href={'/forum'}
            >
              <i className="bi bi-box-arrow-left me-2"></i>
              回到社群
            </Link>
          </div>
          <div className="my-following-main d-flex flex-lg-column flex-row flex-wrap gap-3">
            <Link
              href={'/forum/profile/123'}
              className="following-card w-auto d-flex flex-column flex-lg-row flex-grow-1 align-items-center px-3 py-3  gap-3 rounded-3 card-border bg-pure-white forum-shadow"
            >
              {/* <div className="row"> */}
              <div className="following-info  d-flex gap-2 align-items-center main-text-color">
                <ComponentsAvatar
                  src="/images/forum/320.webp"
                  alt="使用者頭貼"
                  classWidth="50"
                />
                <div className="d-flex flex-column">
                  <span className="fs20 fw-bold ">lillypolly</span>
                  <span className="fs14 sub-text-color fw-light">
                    ciaoMing@gmail.com
                  </span>
                </div>
              </div>
              <div className="following-statis  d-flex justify-content-center gap-3 w-100 text-center">
                <div className="follower d-flex gap-2 align-items-center">
                  <div className="main-color fs20">430</div>
                  <div className="main-text-color fs14 text-nowrap">粉絲</div>
                </div>
                <div className="article d-flex gap-2 align-items-center">
                  <div className="main-color fs20">15</div>
                  <div className="main-text-color fs14 text-nowrap">文章</div>
                </div>
              </div>
              {/* <div className="following-button  d-flex gap-2">
                <button className="button-triggerable active px-3 py-1 color-isla-white rounded-3 text-nowrap fw-medium">
                  已追蹤
                </button>
                <button className="button-triggerable default px-3 py-1 color-isla-white rounded-3 text-nowrap fw-medium">
                  聊天
                </button>
              </div> */}
              <ComponentsButtonFollowingChat />
              {/* </div> */}
            </Link>
            <FollowingCard />
            <FollowingCard />
            <FollowingCard />
            <FollowingCard />
            <FollowingCard />
            <FollowingCard />
            <FollowingCard />
            <FollowingCard />
            <FollowingCard />
          </div>
        </div>
      </div>
    </>
  )
}
