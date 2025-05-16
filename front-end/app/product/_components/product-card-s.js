// src/components/ProductCard.jsx
'use client'
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './_style.css/product-card-s.css'
import RatingComponent from './product-rating.js'
import BookmarkComponent from './product-bookmark.js'
import Image from 'next/image'

function ProductCard({ product }) {
  if (!product) {
    return <div>無法載入產品資訊。</div>
  }

  const {
    id,
    brand = 'N/A',
    name = 'Unnamed Product',
    price = 'NT$0.00',
    originalPrice,
    rating = 0,
    reviews = 0,
    imageUrl = `/images/product/test/test1.png`,
    isBookmarked: initialIsBookmarked = false,
  } = product

  const [bookmarked, setBookmarked] = useState(initialIsBookmarked)

  const handleAddToCart = (e) => {
    e.preventDefault()
    setBookmarked(!bookmarked)
    console.log(`Product ${id} (${name}) added to cart.`)
    // TODO: Add to cart logic
  }

  const toggleBookmark = (e) => {
    e.preventDefault()
    setBookmarked(!bookmarked)
    console.log(`Product ${id} (${name}) bookmark status: ${!bookmarked}`)
    // TODO: Update bookmark logic
  }

  const useIsMobile = (breakpoint = 1400) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint)

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < breakpoint)
      }

      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }, [breakpoint])

    return isMobile
  }

  const isMobile = useIsMobile()

  return (
    <div className="product-card-product_card">
      <div className="product-card-product_card-head">
        <div className="product-card-head-top d-flex">
          <div className="product-card-rating product-card-rating-desktop">
            <div className="product-card-star-box">
              <RatingComponent rating={rating} reviewCount={reviews} />
            </div>
          </div>
          <BookmarkComponent
            isbookmarked={bookmarked}
            isMobile={isMobile}
            onToggle={toggleBookmark}
          />
        </div>

        <div className="product-card-product_card-img">
          <Image
            src={imageUrl}
            alt={name}
            className="card-img"
            width={0}
            height={0}
            style={{ width: '100%', height: 'auto' }}
          />
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
          <div className="product-card-star-box">
            <RatingComponent
              rating={rating}
              reviewCount={reviews}
              isMobile={true}
            />
          </div>
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
