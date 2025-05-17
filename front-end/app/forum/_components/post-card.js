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
  authorID = '',
  width = '',
  src = '',
  alt = '',
  fontSize = '',
  color = '',
  updatedAt,
  authorName = '',
  btnLikedActive = Boolean,
  btnSavedActive = Boolean,
  btnLikedCount = '',
  btnSavedCount = '',
  userID = '',
  mutate = () => {},
}) {
  const router = useRouter()
  const date = new Date(updatedAt.replace(' ', 'T'))
  const month = date.getMonth()
  const day = date.getDate()
  const dateFormat = `${month}月${day}日`
  return (
    <>
      {/* FIXME cursor pointer */}
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
        <div className="d-flex align-items-center">
          <ComponentsAuthorInfo
            authorID={authorID}
            width={width}
            src={src}
            alt={alt}
            fontSize={fontSize}
            color={color}
            authorName={authorName}
          />
          <div className="updated-at sub-text-color fs12 fw-light">
            {dateFormat}
          </div>
        </div>
        <div className="post-header d-flex">
          <div className="post-tag px-2 py-1 me-2 rounded-pill fs12 text-nowrap bg-light-hover main-color">
            {postCateName}
          </div>
          <div className="post-title fw-medium text-truncate main-text-color">
            {postTitle}
          </div>
        </div>
        {/* <div
          className="post-content text-truncate fs14 sub-text-color"
          dangerouslySetInnerHTML={{
            __html: postContent.replace('<br/>', ' ').slice(0, 50),
          }}
        /> */}
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
