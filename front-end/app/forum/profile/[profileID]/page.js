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
import ComponentsPostCard from '../../_components/post-card'
import { useAuth } from '../../../../hook/use-auth'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function ForumPage(props) {
  // 導向
  const router = useRouter()

  const authorID = useParams().profileID
  const { user } = useAuth()
  const userID = user.id

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
                  src={posts[0].user_img}
                  alt={posts[0].user_nick}
                  classWidth="64"
                />
                <span className="fs24 fw-medium">{posts[0].user_nick}</span>
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
            return (
              <ComponentsPostCard
                key={post.id}
                postID={post.id}
                postTitle={post.title}
                postCateName={post.cate_name}
                postContent={post.content}
                authorID={post.user_id}
                width="21"
                src={post.user_img}
                alt={post.user_name}
                fontSize="14"
                color="var(--sub-text)"
                updatedAt={post.updated_at.toString()}
                authorName={post.user_nick}
                btnLikedActive={post.liked_user_ids.includes(userID)}
                btnSavedActive={post.saved_user_ids.includes(userID)}
                btnLikedCount={post.liked_user_ids.length}
                btnSavedCount={post.saved_user_ids.length}
                userID={userID}
                mutate={mutate}
              />
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
                src={posts[0].user_img}
                alt={posts[0].user_nick}
                classWidth="64"
              />
              <span className="fs24 fw-medium">{posts[0].user_nick}</span>
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
