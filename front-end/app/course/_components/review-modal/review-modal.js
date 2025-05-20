'use client'

import { useState, useEffect } from 'react'
import ReviewCard from '../review-card/review-card'
import { courseUrl } from '../../../../_route/courseUrl'
import './review-modal.css'

function ReviewModal({ isOpen, onClose, courseId }) {
  const [reviewCard, setReviewCard] = useState([])
  const [loading, setLoading] = useState(false)
  const [sortOption, setSortOption] = useState('1')
  const [avgStar, setAvgStar] = useState(0)

  useEffect(() => {
    if (!isOpen || !courseId) return // ⛑️ 安全檢查

    const fetchReviews = async () => {
      setLoading(true)
      try {
        const res = await fetch(
          `${courseUrl}comments?course_id=${courseId}&sort=${sortOption}`
        )
        const json = await res.json()

        if (!json.data || !Array.isArray(json.data)) {
          console.error('格式錯誤：未回傳陣列')
          setReviewCard([])
          setAvgStar(0)
          return
        }

        setReviewCard(json.data)

        const total = json.data.reduce(
          (sum, item) => sum + Number(item.star || 0),
          0
        )
        const avg = json.data.length ? (total / json.data.length).toFixed(1) : 0
        setAvgStar(avg)
      } catch (error) {
        console.error('取得評論失敗:', error)
        setReviewCard([])
        setAvgStar(0)
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [isOpen, courseId, sortOption])

  if (!isOpen) return null

  return (
    <>
      <div
        id="allReviewsModal"
        className="custom-modal"
        style={{ display: 'flex' }}
      >
        <div className="custom-modal-content">
          <div className="modal-header">
            <h5 className="modal-title">所有評價</h5>
            <button onClick={onClose} className="btn-close-custom">
              ×
            </button>
          </div>

          <div className="modal-body">
            {/* 評論統計區 */}
            <div className="row m-0 justify-content-between">
              <div className="d-flex my-2 mb-4 col-9 p-0 align-items-center">
                <div className="pe-2 card-score-course box5-comment-h1-1">
                  {avgStar}
                </div>
                <div className="box5-comment-p pe-3">/ 5.0</div>
                <div className="pe-3 box5-comment-h1-1">
                  {renderStars(avgStar)}
                </div>
                <div className="card-people-course box5-comment-p">
                  {reviewCard.length} 則評價
                </div>
              </div>
              <div className="col-3 my-2 mb-4">
                <select
                  className="form-select"
                  value={sortOption}
                  onChange={(e) => {
                    if (!loading) {
                      setSortOption(e.target.value)
                      document
                        .querySelector('.custom-modal-content')
                        ?.scrollTo({ top: 0, behavior: 'smooth' })
                    }
                  }}
                  disabled={loading}
                >
                  <option value="1">最有幫助</option>
                  <option value="2">評價最高</option>
                  <option value="3">評價最低</option>
                  <option value="4">日期最新</option>
                  <option value="5">日期最舊</option>
                </select>
              </div>
            </div>

            {/* 評價卡片區塊 */}
            <div className="position-relative" style={{ minHeight: '150px' }}>
              {loading && (
                <div className="loading-overlay d-flex justify-content-center align-items-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">載入中...</span>
                  </div>
                </div>
              )}
              {reviewCard.length > 0
                ? reviewCard.map((v, i) => (
                    <ReviewCard
                      key={i}
                      member_name={v.member_name}
                      star={v.star}
                      created={v.created}
                      content={v.content}
                      is_helpful={v.is_helpful}
                      ava_url={v.ava_url}
                      comment_id={v.comment_id}
                    />
                  ))
                : !loading && <div className="text-muted">目前尚無評論</div>}
            </div>
          </div>
        </div>
      </div>

      {/* backdrop */}
      <div
        id="modalBackdrop"
        className="modal-backdrop"
        style={{ display: 'block' }}
        onClick={onClose}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') onClose()
        }}
      />
    </>
  )

  // 星星平均分數渲染
  function renderStars(score) {
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
}

export default ReviewModal
