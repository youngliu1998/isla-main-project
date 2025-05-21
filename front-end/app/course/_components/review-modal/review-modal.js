'use client'

import { useState, useMemo } from 'react'
import ReviewCard from '../review-card/review-card'
import './review-modal.css'

export default function ReviewModal({
  isOpen,
  onClose,
  reviewCard = [],
  likesMap = {},
  toggleLike = () => {},
}) {
  const [sortOption, setSortOption] = useState(1)

  // ⭐ 平均評分（始終執行）
  const avgStar = useMemo(() => {
    if (reviewCard.length === 0) return 0
    const sum = reviewCard.reduce((acc, cur) => acc + Number(cur.star || 0), 0)
    return (sum / reviewCard.length).toFixed(1)
  }, [reviewCard])

  // ⭐ 星星圖示渲染（始終執行）
  const renderStars = (score) => {
    const ratingNum = Number(score)
    const fullStars = Math.floor(ratingNum)
    const halfStar = ratingNum % 1 >= 0.5
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0)

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <i className="bx bxs-star" key={`full-${i}`} />
        ))}
        {halfStar && <i className="bx bxs-star-half" key="half" />}
        {[...Array(emptyStars)].map((_, i) => (
          <i className="bx bx-star" key={`empty-${i}`} />
        ))}
      </>
    )
  }

  // ⭐ 排序邏輯（始終執行）
  const sortedReviews = useMemo(() => {
    const copy = [...reviewCard]
    switch (sortOption) {
      case 2:
        return copy.sort((a, b) => b.star - a.star)
      case 3:
        return copy.sort((a, b) => a.star - b.star)
      case 4:
        return copy.sort((a, b) => new Date(b.created) - new Date(a.created))
      case 5:
        return copy.sort((a, b) => new Date(a.created) - new Date(b.created))
      case 1:
      default:
        return copy.sort((a, b) => (b.is_helpful || 0) - (a.is_helpful || 0))
    }
  }, [reviewCard, sortOption])

  // ⭐ 防止 modal 開關觸發 hook 問題
  if (!isOpen) return null

  return (
    <>
      <div className="custom-modal" style={{ display: 'flex' }}>
        <div className="custom-modal-content">
          <div className="modal-header">
            <h5 className="window-title">所有評價</h5>
            <button onClick={onClose} className="btn-close-custom">
              ×
            </button>
          </div>
          <div className="modal-body">
            <div className="row m-0 justify-content-between ali">
              <div className="d-flex my-2 mb-4 col-9 p-0 align-items-center">
                <div className="pe-2 card-score-course box5-comment-h1-1">
                  {avgStar}
                </div>
                <div className="box5-comment-p pe-3">/ 5.0</div>
                <div className="pe-3 box5-comment-h1-1">
                  {renderStars(avgStar)}
                </div>
                <div className="d-flex">
                  <div className="card-people-course box5-comment-p align-content-center">
                    {reviewCard.length} 則評價
                  </div>
                </div>
              </div>
              <div className="row col-3 h-25 my-2 mb-4">
                <select
                  className="form-select no-border"
                  value={sortOption}
                  onChange={(e) => setSortOption(Number(e.target.value))}
                >
                  <option value={1}>最有幫助</option>
                  <option value={2}>評價最高</option>
                  <option value={3}>評價最低</option>
                  <option value={4}>日期最新</option>
                  <option value={5}>日期最舊</option>
                </select>
              </div>
            </div>

            {sortedReviews.map((v) => (
              <ReviewCard
                key={v.comment_id}
                member_name={v.member_name}
                star={v.star}
                created={v.created}
                content={v.content}
                ava_url={v.ava_url}
                comment_id={v.comment_id}
                likeData={likesMap[v.comment_id] || { liked: false, count: 0 }}
                onToggleLike={toggleLike}
              />
            ))}
          </div>
        </div>
      </div>
      <div
        className={`modal-backdrop${isOpen ? ' show' : ''}`}
        onClick={onClose}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') onClose()
        }}
      />
    </>
  )
}
