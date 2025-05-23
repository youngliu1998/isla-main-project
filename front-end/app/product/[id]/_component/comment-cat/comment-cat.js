'use client'

import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import StarRatingItem from '../../../_components/star-generator'
import styles from './comment_cat.module.css' // 建議抽出 CSS module

const CommentCat = ({ reviews }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length)
    }, 10000) // 每 10 秒切換

    return () => clearInterval(interval)
  }, [reviews.length])

  if (!reviews || reviews.length === 0) return null

  const currentReview = reviews[currentIndex]

  return (
    <div className={styles['comment-cat']}>
      <div className={styles['cat-card']}>
        <div className={styles['cat-head']}>
          <div className={styles['user-img']}>
            <img src={currentReview.userAvatarSrc} alt="" />
          </div>
          <div className={styles['cat-head-user']}>
            <div className={styles['username-cat']}>
              {currentReview.user_id}
            </div>
          </div>
          <div className={styles['star-box']}>
            <StarRatingItem star={currentReview.rating} maxStars={5} />
          </div>
        </div>
        <div className={styles['cat-body']}>{currentReview.comment_text}</div>
      </div>
    </div>
  )
}

CommentCat.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      userAvatarSrc: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      commentText: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default CommentCat
