'use client'

import React, { useState, useEffect } from 'react'

export default function AuthorIDPage(props) {
  return (
    <>
      <button
        onClick={async (e) => {
         
          try {
            if (!post.liked_user_ids.includes(userID)) {
              const res = await fetch(
                'http://localhost:3005/api/forum/liked-saved/liked',
                {
                  method: 'post',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ userID, postID }),
                }
              )
              const resData = await res.json()
              if (resData.status === 'success') {
                mutate()
              }
            } else {
              const res = await fetch(
                'http://localhost:3005/api/forum/liked-saved/liked',
                {
                  method: 'delete',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ userID, postID }),
                }
              )
              const resData = await res.json()
              if (resData.status === 'success') {
                mutate()
              }
            }
          } catch (error) {
            console.log(error)
          }
        }}
      ></button>
    </>
  )
}
