'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import ComponentsAvatar from '../../_components/avatar'
import ComponentsBtnLikedSaved from '../../_components/btn-liked-saved'

export default function RecursiveComment({
  postID = '',
  userImg = '',
  userNick = '',
  content = '',
  updatedAt,
  btnActive = Boolean,
  btnCount = Number,
  mutate = () => {},
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
              postID={postID}
              mutate={mutate}
              color="sub-text-color fs14"
            />
          </div>
          <div
            className="comment-text"
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
          <div className="comment-info d-flex gap-3 fs14 sub-text-color">
            {/* <div className="comment-date">3 月 26 日 16:07</div> */}
            <div className="comment-date">{updatedAt}</div>
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
    </>
  )
}
