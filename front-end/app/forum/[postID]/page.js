'use client'

import './post.css'
import { useParams } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ComponentsAd from '../_components/ad'
import ComponentsAvatar from '../_components/avatar'
import EditPostModal from '../_components/edit-post-modal'
import useSWR from 'swr'
import ComponentsBtnLikedSaved from '../_components/btn-liked-saved'
import ComponentsMorePost from './more-post'
import ComponentsAuthorInfo from '../_components/author-info'

const fetcherReferer = (url) =>
  fetch(url, {
    method: 'GET',
    referrerPolicy: 'no-referrer-when-downgrade',
  }).then((res) => res.json())

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function PostIDPage(props) {
  const userID = 1
  const postID = useParams().postID
  console.log(postID)

  // const postAPI = `http://localhost:3005/api/forum/post/${postID}`
  const postAPI = `http://localhost:3005/api/forum/posts/post-detail?postID=${postID}`
  const { data, isLoading, error, mutate } = useSWR(postAPI, fetcher)
  let posts = data?.data?.posts
  let post = {}
  let morePosts = data?.data?.morePosts
  if (error) {
    console.log(error)
    return (
      <main className="main col col-10 d-flex flex-column align-items-start">
        連線錯誤
      </main>
    )
  }
  if (Array.isArray(posts)) {
    posts = posts.map((post) => {
      return {
        ...post,
        liked_user_ids: post.liked_user_ids
          ? post.liked_user_ids.split(',').map(Number)
          : [],
        saved_user_ids: post.saved_user_ids
          ? post.saved_user_ids.split(',').map(Number)
          : [],
      }
    })
    post = posts[0]
  }
  if (Array.isArray(morePosts)) {
    morePosts = morePosts.map((morePost) => {
      return {
        ...morePost,
        // liked_user_ids: ''?.split(',').map(Number) ?? [], NOTE 這個會回覆[0]而非空陣列
        liked_user_ids: morePost.liked_user_ids?.split(',').map(Number) ?? [],
        saved_user_ids: morePost.saved_user_ids?.split(',').map(Number) ?? [],
      }
    })
  }
  console.log(morePosts)
  if (isLoading) {
    console.log(isLoading)
    return (
      <main className="main col col-10 d-flex flex-column align-items-start">
        載入中
      </main>
    )
  }
  if (morePosts.length === 0) {
    return (
      <main className="main col col-10 d-flex flex-column align-items-start">
        無資料
      </main>
    )
  }

  // 日期格式
  const date = new Date(post.updated_at.replace(' ', 'T'))
  const month = date.getMonth()
  const day = date.getDate()
  const dateFormat = `${month}月${day}日`

  return (
    <>
      <main className="main col col-10 d-flex flex-column align-items-start">
        <div className="posts d-flex flex-column gap16 w-100">
          <div className="post d-flex flex-column gap-2 rounded-top-4 shadow-forum bg-pure-white px-4 py-4 card-border">
            <div className="post-header d-flex  align-items-start">
              <div className="post-title flex-grow-1 me-3 fs24 fw-medium">
                {post.title}
                <span className="post-tag d-inline align-middle px-2 py-1 ms-2 my-auto rounded-pill fs12 text-nowrap bg-light-hover main-color">
                  {post.cate_name}
                </span>
              </div>
              <button
                className={`post-update main-text-color ${post.user_id === userID ? 'd-block' : 'd-none'}`}
                data-bs-toggle="modal"
                data-bs-target="#editPostModal"
              >
                <i className="bi bi-pencil fs24" />
              </button>
            </div>
            <div>
              <div className="author-info d-inline-flex align-items-center gap-2 mb-2">
                <ComponentsAuthorInfo
                  authorID={post.user_id}
                  width="24"
                  src={`/images/forum/320.webp`}
                  alt={post.user_nick}
                  fontSize={14}
                  color={'var(--main-text-color)'}
                  authorName={post.user_nick}
                />
                <button className="button-clear fs12 main-color">追蹤</button>
                <div className="updated-at sub-text-color fs12 fw-light">
                  {dateFormat}
                </div>
              </div>
            </div>
            <div
              className="post-content d-flex flex-column gap-3 pb-4 mb-2 bottom-stroke"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            <div className="evaluates d-flex mb-5">
              <ComponentsBtnLikedSaved
                type="liked"
                active={post.liked_user_ids.includes(userID)}
                count={post.liked_user_ids.length}
                postID={postID}
                userID={userID}
                mutate={mutate}
                color={''}
              />
              <button className="evaluate px-2 py-1 border-0 rounded-3 d-flex align-items-center">
                <i className="bi bi-chat me-1 fs16" />8
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
            <div className="more-section">
              <div className="more-header py-2 bottom-stroke sub-text-color">
                更多文章
              </div>
              <div className="more-cards d-flex flex-wrap py-2">
                {Array.isArray(morePosts) &&
                  morePosts.map((morePost) => {
                    return (
                      <div key={morePost.id} className="w-50 p-1">
                        <ComponentsMorePost
                          postTitle={morePost.title}
                          likedUserIDs={morePost.liked_user_ids}
                          savedUserIDs={morePost.saved_user_ids}
                          postID={morePost.id}
                          userID={userID} //登入使用者
                          authorID={morePost.user_id}
                          authorNick={morePost.user_nick}
                          mutate={mutate}
                        />
                      </div>
                    )
                  })}
              </div>
            </div>
            <div className="comments-section">
              <div className="comments-header py-2 bottom-stroke sub-text-color">
                全部留言
              </div>
              <div className="comment-cards d-flex flex-column gap-2 px-1 py-1">
                <div className="comment-card d-flex flex-column gap-3 py-3 bottom-stroke">
                  <div className="comment-content d-flex gap10">
                    <Link href="/" className="user-avatar">
                      <ComponentsAvatar
                        classWidth="32"
                        src={`/images/forum/320.webp`}
                        alt="測試"
                      />
                    </Link>
                    <div className="comment-main d-flex flex-column flex-grow-1 gap-1">
                      <div className="comment-header d-flex align-items-start">
                        <div className="author-account me-auto">
                          <Link
                            href="/"
                            className="d-flex align-items-center gap-1 text-decoration-none fw-medium main-text-color"
                          >
                            lillypolly
                          </Link>
                        </div>
                        <button className="evaluate px-2 py-1 border-0 rounded-3 d-flex align-items-center fs14 sub-text-color">
                          <i className="bi bi-heart me-1" />
                          23
                        </button>
                      </div>
                      <div className="comment-text">
                        試過~真的會比一般遮瑕有氣色
                        <br />
                        黑眼圈比較青的人 這樣畫妝感會比較顯氣色
                      </div>
                      <div className="comment-info d-flex gap-3 fs14 sub-text-color">
                        <div className="comment-date">3 月 26 日 16:07</div>
                        <Link
                          href="/"
                          role="button"
                          className="reply text-decoration-none sub-text-color"
                        >
                          回覆
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="comment-more d-flex flex-column gap-3">
                    <Link
                      href="/"
                      role="button"
                      className="text-decoration-none fs14 fw-medium sub-text-color"
                    >
                      <span className="fw-light d-inline">——</span>
                      查看更多留言
                    </Link>
                  </div>
                </div>
                <div className="comment-card d-flex flex-column gap-3 py-3 bottom-stroke">
                  <div className="comment-content d-flex gap10">
                    <Link href="/" className="user-avatar">
                      <ComponentsAvatar
                        classWidth="32"
                        src={`/images/forum/320.webp`}
                        alt="測試"
                      />
                    </Link>
                    <div className="comment-main d-flex flex-column flex-grow-1 gap-1">
                      <div className="comment-header d-flex align-items-start">
                        <div className="author-account me-auto">
                          <Link
                            href="/"
                            className="d-flex align-items-center gap-1 text-decoration-none fw-medium main-text-color"
                          >
                            lillypolly
                          </Link>
                        </div>
                        <button className="evaluate px-2 py-1 border-0 rounded-3 d-flex align-items-center fs14 sub-text-color">
                          <i className="bi bi-heart me-1" />
                          23
                        </button>
                      </div>
                      <div className="comment-text">
                        試過~真的會比一般遮瑕有氣色
                        <br />
                        黑眼圈比較青的人 這樣畫妝感會比較顯氣色
                      </div>
                      <div className="comment-info d-flex gap-3 fs14 sub-text-color">
                        <div className="comment-date">3 月 26 日 16:07</div>
                        <Link
                          href="/"
                          role="button"
                          className="reply text-decoration-none sub-text-color"
                        >
                          回覆
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="comment-more d-flex flex-column gap-3">
                    <div href="/" className="">
                      <button className="text-decoration-none fs14 fw-medium sub-text-color">
                        <span className="fw-light d-inline">——</span> 收起留言
                      </button>
                    </div>
                    <div className="comment-content d-flex gap10">
                      <Link href="/" className="user-avatar">
                        <ComponentsAvatar
                          classWidth="32"
                          src={`/images/forum/320.webp`}
                          alt="測試"
                        />
                      </Link>
                      <div className="comment-main d-flex flex-column flex-grow-1 gap-1">
                        <div className="comment-header d-flex align-items-start">
                          <div className="author-account me-auto">
                            <Link
                              href="/"
                              className="d-flex align-items-center gap-1 text-decoration-none fw-medium main-text-color"
                            >
                              lillypolly
                            </Link>
                          </div>
                          <button className="evaluate px-2 py-1 border-0 rounded-3 d-flex align-items-center fs14 sub-text-color">
                            <i className="bi bi-heart me-1" />
                            23
                          </button>
                        </div>
                        <div className="comment-text">
                          試過~真的會比一般遮瑕有氣色
                          <br />
                          黑眼圈比較青的人 這樣畫妝感會比較顯氣色
                        </div>
                        <div className="comment-info d-flex gap-3 fs14 sub-text-color">
                          <div className="comment-date">3 月 26 日 16:07</div>
                          <Link
                            href="/"
                            role="button"
                            className="reply text-decoration-none sub-text-color"
                          >
                            回覆
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <EditPostModal />
    </>
  )
}
