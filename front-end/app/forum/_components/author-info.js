'use client'

import React, { useState, useEffect } from 'react'
import ComponentsAvatar from './avatar'
import Link from 'next/link'

export default function ComponentsAuthorInfo({
  memberID = '',
  width = '',
  src = '',
  alt = '',
  fontSize = '',
  color = '',
  authorName = '',
}) {
  return (
    <>
      <Link
        className="author-info d-inline-flex align-items-center gap-2"
        href={'/forum/profile/' + memberID}
      >
        <ComponentsAvatar classWidth={width} src={src} alt={alt} />
        {/* author-name fs14 sub-text-color */}
        <span style={{ fontSize: fontSize + 'px', color: color }}>
          {authorName}
        </span>
      </Link>
    </>
  )
}
