'use client'

import ComponentsAvatar from '../../_components/avatar'
import useSWR from 'swr'
import { useEffect, useState, useRef } from 'react'
import EditPostModal from '../../_components/edit-post-modal'
import { useParams, useRouter } from 'next/navigation'
import ComponentsPostCard from '../../_components/post-card'
import { useAuth } from '../../../../hook/use-auth'
import ComponentsButtonFollowing from '../../_components/btn-follow'
import ComponentsButtonChat from '../../_components/btn-chat'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function ForumPage(props) {
  // 導向
  const router = useRouter()

  const authorID = useParams().profileID
  const { user } = useAuth()
  const userID = parseInt(user.id, 10)
  const followID = parseInt(useParams().profileID, 10)
  const isOwnProfile = userID === followID

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
          <aside className="aside d-flex flex-column flex-md-row gap-3 position-sticky">
            <div className="d-flex flex-row flex-wrap justify-content-center align-items-center gap-3 px-2 me-md-auto">
              <div className="author-info d-flex align-items-center gap-2 me-sm-auto">
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
            {!isOwnProfile ? (
              <div className="following-button d-flex gap-2 my-auto flex-grow-0 fs14">
                <ComponentsButtonFollowing followID={followID} type="follow" />
                <ComponentsButtonChat />
              </div>
            ) : (
              <button
                className={`button-triggerable default-sub px-3 py-1 my-auto  color-isla-white rounded-3 text-nowrap fw-medium fs14`}
                onClick={() => {
                  router.push('/member/profile')
                }}
              >
                編輯個人資料
                <i className="bi bi-arrow-up-right ms-2"></i>
              </button>
            )}
          </aside>
        </div>
        <div className="posts d-flex flex-column gap-3 w-100">
          {posts.map((post) => {
            {
              /* FIXME 無法點擊愛心 */
            }
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
            <div className="d-flex w-100 text-nowrap">
              <div className="d-flex flex-column align-items-center justify-content-center w-50">
                <span className="fs24 main-color">430</span>
                <span className="fs14 main-text-color">粉絲</span>
              </div>
              <div className="d-flex flex-column align-items-center justify-content-center w-50">
                <span className="fs24 main-color">45</span>
                <span className="fs14 main-text-color">文章</span>
              </div>
            </div>
          </div>
          {!isOwnProfile ? (
            <div className="following-button d-flex gap-2 w-100 fs14">
              <ComponentsButtonFollowing
                followID={followID}
                type="follow"
                followMutate={mutate}
              />
              <ComponentsButtonChat />
            </div>
          ) : (
            <button
              className={`button-triggerable default-sub px-3 py-1 my-auto  color-isla-white rounded-3 text-nowrap fw-medium fs14`}
              onClick={() => {
                router.push('/member/profile')
              }}
            >
              編輯個人資料
              <i className="bi bi-arrow-up-right ms-2"></i>
            </button>
          )}
        </aside>
      </div>
      <EditPostModal />
    </>
  )
}
