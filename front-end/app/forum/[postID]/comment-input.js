'use client'

import React, { useState, useEffect } from 'react'
import ComponentsAvatar from '../_components/avatar'
import { useAuth } from '../../../hook/use-auth'
import ComponentsBtnLikedSaved from '../_components/btn-liked-saved'

export default function CommentInput(props) {
  const { user } = useAuth()
  const userNick = user.nickname
  const userImg = user.ava_url
  return (
    <>
      <div className="comment-input-block position-sticky bottom-0 d-flex align-items-center gap-2 px-4 bg-pure-white">
        <div className="ps-1">
          <ComponentsAvatar src={userImg} alt={userNick} classWidth="32" />
        </div>
        <input
          className="comment-input w-100"
          placeholder={`${userNick} 留言⋯⋯`}
          type="text"
        />
        {/* <ComponentsBtnLikedSaved
          type={'liked'}
          active={''}
          count={''}
          postID={''}
          commentID={''}
          mutate={''}
          color={''}
        />
        <ComponentsBtnLikedSaved
          type={'saved'}
          active={''}
          count={''}
          postID={''}
          commentID={''}
          mutate={''}
          color={''}
        /> */}
      </div>
    </>
  )
}
