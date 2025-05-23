// RatingComponent.js
import React from 'react'
import PropTypes from 'prop-types'
import { BiSolidHeart, BiHeart } from 'react-icons/bi'
import './_style/product-bookmark.css'
import { Link } from 'react-router-dom'

const BookmarkComponent = ({
  isbookmarked = false,
  onToggle,
  isMobile = false,
}) => {
  return (
    <div className="product-card-bookmark">
      <Link
        href="#"
        onClick={onToggle}
        aria-label={isbookmarked ? '移除書籤' : '加入書籤'}
      >
        {isbookmarked ? (
          <BiSolidHeart
            className={`product-card-bookmark-icon bookmarked  ${isMobile ? 'product-card-bookmark-icon-mobile' : ''} `}
          />
        ) : (
          <BiHeart
            className={` product-card-bookmark-icon ${isMobile ? 'product-card-bookmark-icon-mobile' : ''} `}
          />
        )}
      </Link>
    </div>
  )
}

BookmarkComponent.propTypes = {
  isbookmarked: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  isMobile: PropTypes.bool,
}

export default BookmarkComponent
