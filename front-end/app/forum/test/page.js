'use client'

import React, { useState, useEffect } from 'react'
import useSWR from 'swr'

export default function TestPage(props) {
  return (
    <>
      <div>Test Page</div>
      <button
        className="evaluate liked px-2 py-1 border-0 rounded-3 d-flex align-items-center bg-pure-white"
        type="button"
        onClick={async (e) => {
          e.preventDefault()
          e.stopPropagation()
          // if (post.liked_user_ids.includes(userID)) return
          console.log('按讚')
          try {
            const postID = post.id
            const res = await fetch('http://localhost:3005/api/forum/liked', {
              method: 'post',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ userID, postID }),
            })
            const json = await res.json()
            console.log(json)
            if (json.status === 'success') {
              mutate()
            }
          } catch (error) {
            console.log(error)
          }
        }}
      >
        <i className="bi bi-heart me-1" />
        {post.liked_user_ids.length}
      </button>
    </>
  )
}
