import ReviewsSection from '../review-section/review-section.js'

export function CommentGroup({
  reviews,
  averageRating,
  ratingCounts,
  reviewImages,
}) {
    console.log("Reviews", reviews)
  return (
    <div className="comment-component d-flex">
      <div className="comment-sidebar">
        <div className="comment-sidebar-rating d-flex align-items-center gap-3">
          <div className="rating-num">{averageRating.toFixed(1)}</div>
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
              <div key={i} className="rating-bar-box d-flex align-items-center">
                <div className="rating-bar-label">{i} 星</div>
                <div className="rating-bar overflow-hidden">
                  <div
                    className={`rating-bar-${i}`}
                    style={{ width: `${barPercent}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>

        <div className="comment-sidebar-photos-box">
          <div className="comment-sidebar-photos-title">所有圖片</div>
          <div className="comment-sidebar-photos">
            {(reviewImages || []).slice(0, 6).map((src, i) => (
              <button key={i} className="comment-img" type="button">
                <img
                  className="img-fluid"
                  src={src}
                  alt={`評論圖片 ${i + 1}`}
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
            className="sort-by-date sort-btn sort-btn-active"
            type="button"
          >
            最新
          </button>
          <button className="sort-by-rating sort-btn" type="button">
            依照星級
          </button>
        </div>
        <ReviewsSection reviews={reviews} />
      </div>
    </div>
  )
}

export default ReviewComponent({})
