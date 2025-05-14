// RatingComponent.js
import React from 'react';
import PropTypes from 'prop-types';
import { BsStarFill, BsStar } from 'react-icons/bs'; // 引入 BoxIcons

const RatingComponent = ({ rating, reviewCount, maxStars = 5, reviewTextSuffix = "則評論" }) => {
  const fullStars = Math.floor(rating);
  // 簡單處理，不顯示半星，如有需要可以引入 BsStarHalf
  const emptyStars = maxStars - fullStars;

  return (
    <>
      <div className="star-box">
        {Array(fullStars).fill(null).map((_, index) => (
          // 移除 'bx bxs-star' class，react-icons 組件已包含圖標本身
          // 'star-active' class 可以保留，如果你的 CSS 依賴它來做額外樣式 (例如顏色)
          <BsStarFill key={`full-${index}`} className="star star-active" />
        ))}
        {Array(emptyStars).fill(null).map((_, index) => (
          <BsStar key={`empty-${index}`} className="star" />
        ))}
      </div>
      {reviewCount !== undefined && (
        <div className="rating_text">
          {reviewCount} {reviewTextSuffix}
        </div>
      )}
    </>
  );
};

RatingComponent.propTypes = {
  rating: PropTypes.number.isRequired,
  reviewCount: PropTypes.number,
  maxStars: PropTypes.number,
  reviewTextSuffix: PropTypes.string,
};

export default RatingComponent;