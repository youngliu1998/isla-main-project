'use client'

import React, { useState, useEffect } from 'react'

export default function ComponentsBtnLikedSaved({
  type = '',
  active = Boolean,
  count = '',
  postID = '',
  userID = '',
  mutate = () => {},
}) {
  const iconClass =
    type === 'liked'
      ? active
        ? 'bi-heart-fill main-color'
        : 'bi-heart'
      : active
        ? 'bi-bookmark-fill badge-color'
        : 'bi-bookmark'

  return (
    <>
      <button
        className="evaluate saved px-2 py-1 border-0 rounded-3 d-flex align-items-center bg-pure-white"
        onClick={async (e) => {
          e.preventDefault()
          e.stopPropagation()
          const method = active ? 'DELETE' : 'POST'
          const res = await fetch(
            `http://localhost:3005/api/forum/liked-saved/${type}`,
            {
              method: method,
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ userID, postID }),
            }
          )
          const json = await res.json()
          if (json.status === 'success') {
            mutate()
          }
        }}
      >
        <i className={`bi ${iconClass}  me-1`} />
        {count}
      </button>
    </>
  )
}
