'use client'

import React, { useState, useEffect } from 'react'
import ComponentsAvatar from './avatar'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function ComponentsAuthorInfo({
  memberID = '',
  width = '',
  src = '',
  alt = '',
  fontSize = '',
  color = '',
  authorName = '',
}) {
  const router = useRouter()
  const handleNavigate = (e) => {
    e.stopPropagation() //卡片從Link換成div role=link後，要用這個才能止住事件冒泡
    e.preventDefault()
    router.push(`/forum/profile/${memberID}`)
    console.log(memberID)
  }

  return (
    <>
      <div>
        <button
          className="author-info d-inline-flex align-items-center gap-2"
          // href={'/forum/profile/' + memberID}
          onClick={handleNavigate}
        >
          <ComponentsAvatar classWidth={width} src={src} alt={alt} />
          {/* author-name fs14 sub-text-color */}
          <span style={{ fontSize: fontSize + 'px', color: color }}>
            {authorName}
          </span>
        </button>
      </div>
    </>
  )
}
