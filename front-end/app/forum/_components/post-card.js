'use client'

import React, { useState, useEffect } from 'react'
import ComponentsAuthorInfo from './author-info'
import ComponentsBtnLikedSaved from './btn-liked-saved'
import { useRouter } from 'next/navigation'

export default function ComponentsPostCard({
  postID = '',
  postTitle = '',
  postCateName = '',
  postContent = '',
  //   authorID = '',
  width = '',
  src = '',
  alt = '',
  fontSize = '',
  color = '',
  authorName = '',
  btnLikedActive = Boolean,
  btnSavedActive = Boolean,
  btnLikedCount = '',
  btnSavedCount = '',
  userID = '',
  mutate = () => {},
}) {
  const router = useRouter()
  return (
    <>
      <div
        className="post-home d-flex flex-column gap-1 px-4 py-3 rounded-3 shadow-forum bg-pure-white card-border"
        key={postID}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          router.push(`/forum/${postID}`)
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') router.push(`/forum/${postID}`)
        }} //無障礙通用設計
        role="link"
        tabIndex={0} //可被tab鍵聚焦
        style={{ cursor: 'pointer' }}
      >
        <ComponentsAuthorInfo
          authorID={postID}
          width={width}
          src={src}
          alt={alt}
          fontSize={fontSize}
          color={color}
          authorName={authorName}
        />
        <div className="post-header d-flex">
          <div className="post-title me-2 fw-medium text-truncate main-text-color">
            {postTitle}
          </div>
          <div className="post-tag px-2 py-1 rounded-pill fs12 text-nowrap   bg-gray-article main-color">
            {postCateName}
          </div>
        </div>
        <div className="post-content text-truncate fs14 sub-text-color">
          {postContent}
        </div>
        <div className="imgs d-flex gap-3 overflow-auto">
          <div className="img flex-shrink-0 rounded-3" />

          <div className="img flex-shrink-0 rounded-3" />
          <div className="img flex-shrink-0 rounded-3" />
          <div className="img flex-shrink-0 rounded-3" />
        </div>
        <div className="evaluates d-flex fs14 ms-n4">
          <ComponentsBtnLikedSaved
            type={'liked'}
            active={btnLikedActive}
            count={btnLikedCount}
            postID={postID}
            userID={userID}
            mutate={mutate}
          />
          <button className="evaluate comment px-2 py-1 border-0 rounded-3 d-flex align-items-center bg-pure-white">
            <i className="bi bi-chat-left me-1" />8
          </button>
          <ComponentsBtnLikedSaved
            type={'saved'}
            active={btnSavedActive}
            count={btnSavedCount}
            postID={postID}
            userID={userID}
            mutate={mutate}
          />
        </div>
      </div>
    </>
  )
}
