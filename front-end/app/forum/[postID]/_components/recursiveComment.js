'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import ComponentsAvatar from '../../_components/avatar'
import ComponentsBtnLikedSaved from '../../_components/btn-liked-saved'
import ComponentsSubCommentToggle from './subCommentToggle'

export default function RecursiveComment({
  commentID = '',
  userImg = '',
  userNick = '',
  content = '',
  updatedAt,
  btnActive = Boolean,
  btnCount = Number,
  editActive = Boolean,
  mutate = () => {},
  subComments = [],
}) {
  return (
    <>
      <div className="comment-content d-flex gap10">
        <Link href="/" className="user-avatar">
          <ComponentsAvatar classWidth="32" src={userImg} alt={userNick} />
        </Link>
        <div className="comment-main d-flex flex-column flex-grow-1 gap-1">
          <div className="comment-header d-flex align-items-start">
            <div className="author-account me-auto">
              <Link
                href="/"
                className="d-flex align-items-center gap-1 text-decoration-none fw-medium main-text-color"
              >
                {userNick}
              </Link>
            </div>
            <ComponentsBtnLikedSaved
              type="liked"
              active={btnActive}
              count={btnCount}
              postID={null}
              commentID={commentID}
              mutate={mutate}
              color="fs14"
            />
          </div>
          <div
            className="comment-text"
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
          <div className="comment-info d-flex gap-2 align-content-center fs14 sub-text-color">
            {/* <div className="comment-date">3 月 26 日 16:07</div> */}
            <div className="comment-date">{updatedAt}</div>
            <Link href="/" role="button" className="reply text-decoration-none">
              <span className="fs14 sub-text-color fw-light">回覆</span>
            </Link>
            <button
              className={`button-clear main-text-color ${editActive ? 'd-block' : 'd-none'} px-0`}
              type="button"
            >
              <span className="fs14 sub-text-color fw-light">刪除</span>
            </button>
          </div>
        </div>
      </div>
      {subComments.length !== 0 && <ComponentsSubCommentToggle />}
      {subComments.map((subComment, i) => (
        <div key={i} className="sub-margin d-flex flex-column gap-3">
          {/* comment-card d-flex flex-column gap-3 py-3 bottom-stroke */}
          <RecursiveComment
            commentID={subComment.id}
            userImg={subComment.user_img}
            userNick={subComment.nick}
            content={subComment.content}
            updatedAt={subComment.timeFormat}
            btnActive={subComment.btnActive}
            btnCount={subComment.btnCount}
            editActive={subComment.editActive}
            mutate={mutate}
            subComments={subComment.subComments}
          />
        </div>
      ))}
    </>
  )
}
