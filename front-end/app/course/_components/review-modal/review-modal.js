'use client'

import ReviewCard from '../review-card/review-card'
import './review-modal.css'

export default function ReviewModal({
  isOpen,
  onClose,
  reviewCard = [],
  likesMap = {},
  toggleLike = () => {},
}) {
  if (!isOpen) return null

  return (
    <>
      <div className="custom-modal" style={{ display: 'flex' }}>
        <div className="custom-modal-content">
          <div className="modal-header">
            <h5 className="modal-title">所有評價</h5>
            <button onClick={onClose} className="btn-close-custom">
              ×
            </button>
          </div>
          <div className="modal-body">
            <div className="row m-0 justify-content-between ali">
              <div className="d-flex my-2 mb-4 col-9 p-0">
                <div className="pe-2 card-score-course box5-comment-h1-1 align-content-center">
                  3.5
                </div>
                <div className="box5-comment-p align-content-center pe-3">
                  / 5.0
                </div>
                <div className="align-content-center pe-3 box5-comment-h1-1">
                  <i className="bx bxs-star" />
                  <i className="bx bxs-star" />
                  <i className="bx bxs-star" />
                  <i className="bx bxs-star-half" />
                  <i className="bx bx-star" />
                </div>
                <div className="d-flex">
                  <div className="card-people-course box5-comment-p align-content-center">
                    {reviewCard.length}則評價
                  </div>
                </div>
              </div>
              <div className="row col-3 h-25 my-2 mb-4">
                <select className="form-select no-border">
                  <option value={1} defaultValue>
                    最有幫助
                  </option>
                  <option value={2}>評價最高</option>
                  <option value={3}>評價最低</option>
                  <option value={4}>日期最新</option>
                  <option value={5}>日期最舊</option>
                </select>
              </div>
            </div>
            {reviewCard.map((v) => (
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
        className="modal-backdrop"
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
