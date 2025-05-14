// src/components/ProductCard.jsx
'use client'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { BiSolidStar, BiStar, BiSolidHeart, BiHeart } from 'react-icons/bi'
import './_style.css/product-card-s.css'

function ProductCard({ product }) {
  if (!product) {
    return <div>無法載入產品資訊。</div>
  }

  const {
    id,
    brand = 'N/A',
    name = 'Unnamed Product',
    price = '$0.00',
    originalPrice,
    rating = 0,
    reviews = 0,
    imageUrl = `/images/product/test/test1.png`,
    isBookmarked: initialIsBookmarked = false,
  } = product

  const [bookmarked, setBookmarked] = useState(initialIsBookmarked)

  const handleAddToCart = (e) => {
    e.preventDefault()
    console.log(`Product ${id} (${name}) added to cart.`)
    // TODO: Add to cart logic
  }

  const toggleBookmark = (e) => {
    e.preventDefault()
    setBookmarked(!bookmarked)
    console.log(`Product ${id} (${name}) bookmark status: ${!bookmarked}`)
    // TODO: Update bookmark logic
  }

  const renderStars = (currentRating) => {
    const stars = []
    const totalStars = 5
    for (let i = 1; i <= totalStars; i++) {
      stars.push(
        i <= currentRating ? (
          <BiSolidStar
            key={`star-solid-${i}`}
            className="product-card-star product-card-star-active"
          />
        ) : (
          <BiStar key={`star-empty-${i}`} className="product-card-star" />
        )
      )
    }
    return stars
  }

  return (
    <div className="product-card-product_card">
      <div className="product-card-product_card-head">
        <div className="product-card-head-top d-flex">
          <div className="product-card-rating product-card-rating-desktop">
            <div className="product-card-star-box">{renderStars(rating)}</div>
            <div className="product-card-rating_text">{reviews} 則評論</div>
          </div>

          <div className="product-card-bookmark">
            <a
              href="#"
              onClick={toggleBookmark}
              aria-label={bookmarked ? '移除書籤' : '加入書籤'}
            >
              {bookmarked ? (
                <BiSolidHeart className="product-card-bookmark-icon bookmarked" />
              ) : (
                <BiHeart className="product-card-bookmark-icon" />
              )}
            </a>
          </div>
        </div>

        <div className="product-card-product_card-img">
          <img src={imageUrl} alt={name} className="card-img" />
        </div>

        <div className="product-card-hover-add-cart">
          <a
            href="#"
            onClick={handleAddToCart}
            className="product-card-add-cart-btn"
          >
            加入購物車
          </a>
        </div>
      </div>

      <div className="product-card-product_card-info">
        <div className="product-card-info">
          <div className="product-card-product_details">
            <div className="product-card-brand">{brand}</div>
            <div className="product-card-product_name">{name}</div>
          </div>
        </div>

        <div className="product-card-rating product-card-rating-mobile">
          <div className="product-card-star-box">{renderStars(rating)}</div>
          <div className="product-card-rating_text">{reviews} 則評論</div>
        </div>

        <div className="product-card-price">
          <div className="product-card-price-box d-flex gap-2">
            <div className="product-card-main-price">{price}</div>
            {originalPrice && (
              <div className="product-card-basic-price">
                <del>{originalPrice}</del>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    brand: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.string,
    originalPrice: PropTypes.string,
    rating: PropTypes.number,
    reviews: PropTypes.number,
    imageUrl: PropTypes.string,
    isBookmarked: PropTypes.bool,
  }).isRequired,
}

export default ProductCard
