// src/components/ProductCard.jsx
import React, { useState } from 'react' // useState for internal bookmark toggle example
import PropTypes from 'prop-types' // For defining prop types

// 從 react-icons/bi 導入 Boxicons 風格的圖標
import { BiSolidStar, BiStar, BiSolidHeart, BiHeart } from 'react-icons/bi'

function ProductCard({ product }) {
  // 從 product prop 解構所需屬性
  // 提供預設值以避免 undefined 錯誤，如果某些產品可能沒有這些屬性
  const {
    id,
    brand = 'N/A',
    name = 'Unnamed Product',
    price = '$0.00',
    originalPrice, // 可能為 undefined
    rating = 0, // 0-5 的數字
    reviews = 0,
    imageUrl = '/imgs/default-product.jpg', // 提供一個預設圖片路徑
    isBookmarked: initialIsBookmarked = false, // 初始書籤狀態
  } = product

  // 如果書籤狀態由父元件管理，則不需要這個內部 state
  // 這裡為了演示，我們讓卡片內部管理自己的書籤狀態
  const [bookmarked, setBookmarked] = useState(initialIsBookmarked)

  const handleAddToCart = (e) => {
    e.preventDefault() // 防止 <a> 標籤的默認行為
    console.log(`Product ${id} (${name}) added to cart.`)
    // TODO: 實際的加入購物車邏輯，可能需要調用從 props 傳遞的函數
  }

  const toggleBookmark = (e) => {
    e.preventDefault()
    setBookmarked(!bookmarked)
    console.log(`Product ${id} (${name}) bookmark status: ${!bookmarked}`)
    // TODO: 實際的書籤更新邏輯，可能需要調用從 props 傳遞的函數，並更新後端數據
  }

  // 渲染星星評分
  const renderStars = (currentRating) => {
    const stars = []
    const totalStars = 5
    for (let i = 1; i <= totalStars; i++) {
      if (i <= currentRating) {
        // 實心星 (active)
        stars.push(
          <BiSolidStar
            key={`star-solid-${i}`}
            className="product-card-star product-card-star-active"
          />
        )
      } else {
        // 空心星
        stars.push(
          <BiStar key={`star-empty-${i}`} className="product-card-star" />
        )
      }
    }
    return stars
  }

  return (
    <div className="product-card-product_card">
      <div className="product-card-product_card-head">
        <div className="product-card-head-top d-flex">
          {/* Desktop Rating */}
          <div className="product-card-rating product-card-rating-desktop">
            <div className="product-card-star-box">{renderStars(rating)}</div>
            <div className="product-card-rating_text">{reviews} 則評論</div>
          </div>

          {/* Bookmark */}
          <div className="product-card-bookmark">
            <a
              href="#"
              onClick={toggleBookmark}
              aria-label={bookmarked ? '移除書籤' : '加入書籤'}
            >
              {
                bookmarked ? (
                  <BiSolidHeart style={{ color: 'red' }} /> // 書籤選中時的圖標和樣式
                ) : (
                  <BiHeart />
                ) // 預設書籤圖標
              }
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

        {/* Mobile Rating */}
        <div className="product-card-rating product-card-rating-mobile">
          <div className="product-card-star-box">{renderStars(rating)}</div>
          <div className="product-card-rating_text">{reviews} 則評論</div>
        </div>

        <div className="product-card-price">
          <div className="product-card-price-box d-flex gap-2">
            <div className="product-card-main-price">{price}</div>
            {originalPrice && ( // 只有當 originalPrice 存在時才顯示
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

// PropTypes 用於定義組件期望接收的 props 的類型
// 這有助於開發時的錯誤檢查和文檔化
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
