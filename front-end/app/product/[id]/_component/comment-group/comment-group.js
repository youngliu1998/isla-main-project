import ReviewsSection from '../review-section/review-section.js'
import Image from 'next/image'
import { useState } from 'react'
import clsx from 'clsx'
import './comment-group.css'

export function CommentGroup({
  reviews,
  averageRating,
  ratingCounts,
  reviewImages,
}) {
  console.log('Reviews', reviews)

  const [sortBy, setSortBy] = useState('date')
  const [fillterRating, setFillterRating] = useState(null)

  const filteredReviews = reviews
    .filter((review) => {
      if (!fillterRating) return true
      return review.rating === fillterRating
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.created_at) - new Date(a.created_at)
      } else {
        return b.rating - a.rating
      }
    })

  return (
    <div className="comment-component d-flex">
      <div className="comment-sidebar">
        <div className="comment-sidebar-rating d-flex align-items-center gap-3">
          <div className="rating-num">{Number(averageRating).toFixed(1)}</div>
          <div className="rating-starbox d-flex flex-column">
            <div className="star-box">
              {[1, 2, 3, 4, 5].map((i) => (
                <i
                  key={i}
                  className={`bx bxs-star star ${i <= Math.round(averageRating) ? 'star-active' : ''}`}
                />
              ))}
            </div>
            <div className="rating-starbox-status">
              基於 <span className="rating-status">{reviews.length}</span>{' '}
              個評分
            </div>
          </div>
        </div>

        <div className="comment-sidebar-rating-bars flex-column-reverse">
          {[1, 2, 3, 4, 5].map((i) => {
            const barPercent = ((ratingCounts[i] || 0) / reviews.length) * 100
            return (
              <button
                key={i}
                className={clsx('rating-bar-box d-flex align-items-center', fillterRating === i && 'rating-bar-active')}
                onClick={() => {setFillterRating(fillterRating === i ? null : i)}}
              >
                <div className="rating-bar-label">{i} 星</div>
                <div className="rating-bar overflow-hidden">
                  <div
                    className={`rating-bar-${i}`}
                    style={{ width: `${barPercent}%` }}
                  />
                </div>
              </button>
            )
          })}
        </div>

        <div className="comment-sidebar-photos-box">
          <div className="comment-sidebar-photos-title">所有圖片</div>
          <div className="comment-sidebar-photos">
            {(reviewImages || []).slice(0, 6).map(({ imageUrl }, i) => (
              <button key={i} className="comment-img" type="button">
                <Image
                  className="img-fluid"
                  src={imageUrl}
                  alt={`評論圖片 ${i + 1}`}
                  width={0}
                  height={0}
                />
              </button>
            ))}
          </div>

          <button className="comment-sidebar-photos-show-more" type="button">
            查看全部
          </button>
        </div>
      </div>

      <div className="comment-box">
        <div className="tools d-flex align-items-center">
          <button
            className={clsx('sort-btn', sortBy === 'date' ? 'sort-btn-active' : '')}
            type="button"
            onClick={() => {setSortBy('date')}}
          >
            最新
          </button>
          <button
              className={clsx('sort-btn', sortBy === 'rating' ? 'sort-btn-active' : '')}
              type="button"
          onClick={() => {setSortBy('rating')}}
          >

            依照星級
          </button>
          <button
              className={clsx()}
              type="button"
          >
            新增評論
          </button>
        </div>
        <ReviewsSection reviews={filteredReviews} />
      </div>
    </div>
  )
}

export default CommentGroup
