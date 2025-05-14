'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import ComponentsAvatar from '../_components/avatar'

export default function PostIDCommentCard(props) {
  return (
    <>
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
    </>
  )
}
