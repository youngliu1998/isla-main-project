'use client'

import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './like-button.css'

export default function LikeButton({ commentId }) {
  const [likedState, setLikedState] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [likeAnimate, setLikeAnimate] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(`like_${commentId}`) === 'true'
    const count = parseInt(localStorage.getItem(`likeCount_${commentId}`)) || 0
    setLikedState(saved)
    setLikeCount(count)
  }, [commentId])

  const toggleLike = async () => {
    const newLiked = !likedState
    const newCount = newLiked ? likeCount + 1 : likeCount - 1

    // 前端立即反應
    setLikedState(newLiked)
    setLikeCount(newCount)
    setLikeAnimate(true)

    localStorage.setItem(`like_${commentId}`, newLiked.toString())
    localStorage.setItem(`likeCount_${commentId}`, newCount.toString())

    try {
      await fetch('http://localhost:3005/api/course/comments', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          comment_id: commentId,
          is_add: newLiked,
        }),
      })
      console.log({ commentId, newLiked })
    } catch (error) {
      console.error('更新按讚失敗:', error)
    }

    // 清除動畫 class
    setTimeout(() => setLikeAnimate(false), 300)
  }

  return (
    <button
      onClick={toggleLike}
      className={`btn-like d-flex align-items-center border-0 bg-transparent ${likedState ? 'liked' : ''}`}
      data-liked={likedState}
    >
      <span className="like-count">{likeCount}</span>
      <i
        className={`bx ${likedState ? 'bxs-like' : 'bx-like'} ms-1 like-icon ${
          likeAnimate ? 'animate-pop' : ''
        }`}
      />
    </button>
  )
}

LikeButton.propTypes = {
  commentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
}
