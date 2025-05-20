'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SubForum({
  number = 0,
  forumTitle = '',
  forumContent = '',
}) {
  return (
    <div className="d-flex overflow-hidden px-2 py-3 forum">
      <div className="d-flex align-items-center p-2 text-primary">{number}</div>
      <div className="d-flex flex-column gap-2 p-1">
        <div className="forum-title">{forumTitle}</div>
        <div className="forum-content">{forumContent}</div>
        <div className="d-flex">like</div>
      </div>
    </div>
  )
}
