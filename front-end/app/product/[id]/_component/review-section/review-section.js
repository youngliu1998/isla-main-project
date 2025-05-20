import React from 'react'
import ReviewCard from '../review-card/review_card.js'

const ReviewsSection = ({ reviews }) => {
  const CDN_BASE = 'https://isla-image.chris142852145.workers.dev/'

  const reviewCommentCardFormater = (review) => ({
    userId: review.is_anonymous ? '匿名用戶' : `用戶 ${review.user_id}`,
    userAvatarSrc: ``,
    rating: review.rating,
    comment_text: review.comment_text,
    created_at: review.created_at,
    images: (review.images || []).map((img) => `${CDN_BASE}/${img}`),
    color_name: review.color?.color_name || '未指定',
  })

  return (
    <div className="reviews-grid">
      {reviews.map((review) => (
        <ReviewCard
          key={review.review_id}
          review={reviewCommentCardFormater(review)}
        />
      ))}
    </div>
  )
}

export default ReviewsSection
