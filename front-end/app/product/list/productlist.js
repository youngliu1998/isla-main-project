// src/components/ProductList.jsx
import React from 'react'
import PropTypes from 'prop-types'
import ProductCard from '../_components/product-card-s' // 確保 ProductCard.jsx 在同一目錄或正確的路徑

/**
 * ProductList 元件
 * 負責渲染產品卡片列表。
 * @param {object[]} products - 要顯示的產品陣列。
 * @param {boolean} [isLoading=false] - 指示數據是否仍在加載中。
 */
function ProductList({ products, isLoading }) {
  // 如果正在加載，顯示加載提示
  if (isLoading) {
    return (
      <div
        className="product-cards-container"
        style={{ textAlign: 'center', padding: '20px' }}
      >
        <p>載入中，請稍候...</p>
        {/* 你可以在這裡放一個載入動畫的元件 */}
      </div>
    )
  }

  // 如果沒有產品 (且不是在加載中)，顯示提示訊息
  if (!products || products.length === 0) {
    return (
      <div
        className="product-cards-container"
        style={{ textAlign: 'center', padding: '20px' }}
      >
        <p>目前沒有符合條件的商品。</p>
      </div>
    )
  }

  // 渲染產品卡片列表
  return (
    <div className="product-cards-container">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

ProductList.propTypes = {
  /**
   * 產品物件的陣列。每個物件應包含 ProductCard 所需的屬性。
   */
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      brand: PropTypes.string,
      name: PropTypes.string,
      price: PropTypes.string,
      originalPrice: PropTypes.string,
      rating: PropTypes.number,
      reviews: PropTypes.number,
      imageUrl: PropTypes.string,
      isBookmarked: PropTypes.bool,
      // ... ProductCard 元件期望的其他屬性
    })
  ),
  /**
   * 一個布林值，指示是否正在加載產品數據。
   */
  isLoading: PropTypes.bool,
}

ProductList.defaultProps = {
  products: [], // 預設為空陣列，避免 undefined 錯誤
  isLoading: false, // 預設不是在載入中
}

export default ProductList
