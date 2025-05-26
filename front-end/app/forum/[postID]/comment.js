'use client'

import React, { useState, useEffect } from 'react'
import useSWR from 'swr'
import RecursiveComment from './_components/recursiveComment'
import ComponentsSubCommentToggle from './_components/subCommentToggle'
import { useParams } from 'next/navigation'
import { useAuth } from '../../../hook/use-auth'
const fetcher = (url) => fetch(url).then((res) => res.json())
export default function PostIDComment(props) {
  const userID = useAuth().user.id
  const postID = useParams().postID
  const { data, isLoading, error, mutate } = useSWR(
    `http://localhost:3005/api/forum/comment?postID=${postID}`,
    fetcher
  )
  if (error) {
    return <>錯誤</>
  }
  if (isLoading) {
    return <>載入中</>
  }

  const comments = data?.data.map((c) => {
    const time = new Date(c.updated_at)
    const timeFormat = `${time.getMonth() + 1}月${time.getDate()}日 ${time.getHours()}:${time.getMinutes()}`

    const btnActive = c.user_liked_ids.split(',').includes(userID)

    console.log(btnActive)

    return { ...c, timeFormat, btnActive }
  })
  // console.log(comments)
  return (
    <>
      <div className="comments-section">
        <div className="comments-header py-2 bottom-stroke sub-text-color">
          全部留言
        </div>
        <div className="comment-cards d-flex flex-column gap-2 px-1 py-1">
          {comments.map((comment, i) => {
            return (
              <div
                className="comment-card d-flex flex-column gap-3 py-3 bottom-stroke"
                key={i}
              >
                <RecursiveComment
                  postID={comment.post_id}
                  userImg={comment.user_img}
                  userNick={comment.nick}
                  content={comment.content}
                  updatedAt={comment.timeFormat}
                  btnActive={true}
                  btnCount={12}
                  mutate={mutate}
                />
              </div>
            )
          })}
          <ComponentsSubCommentToggle />
          {/* <div className="comment-card d-flex flex-column gap-3 py-3 bottom-stroke">
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
                </div> */}
        </div>
      </div>
      <div className="comment-input-block">
        <input type="text" />
      </div>
    </>
  )
}
