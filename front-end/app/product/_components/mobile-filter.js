// src/components/MobileFilterSidebar.jsx
import React, { useState } from 'react'
// 從 react-icons/bi 導入 Boxicons 圖標
import {
  BiChevronUp,
  BiChevronDown,
  BiSearch,
  BiArrowToBottom,
  BiArrowToTop,
} from 'react-icons/bi' // BiArrowToBottom/Top 是 bi-arrow-down/up 的替代品

// 假設這些是篩選選項的數據，實際應用中可能來自 props 或 API
const SORT_OPTIONS = ['價錢', '評分', '上架日期']
const BRANDS = [
  'Unleashia',
  'Cosnori',
  'Muzigae Mansion',
  'Kaja',
  'rom&nd',
  "A'Pieu",
]
const CATEGORIES = ['眼影', '唇蜜', '眉筆', '腮紅', '粉餅']
const RATINGS = ['5星', '4星', '3星', '2星', '1星'] // 或者用數字 5, 4, 3, 2, 1
const PRICE_RANGES = ['500 元以下', '500 - 1000', '1000 - 2000', '2000 元以上']

function MobileFilterSidebar() {
  // 狀態管理
  const [activeSortOption, setActiveSortOption] = useState(SORT_OPTIONS[0])
  const [sortOrder, setSortOrder] = useState('desc') // 'asc' 或 'desc'
  const [selectedBrand, setSelectedBrand] = useState(BRANDS[0])
  const [selectedCategory, setSelectedCategory] = useState(null) // 初始沒有選擇
  const [selectedRating, setSelectedRating] = useState(null)
  const [selectedPriceRange, setSelectedPriceRange] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(true) // 初始篩選面板是展開的

  // 事件處理函數
  const handleSortOptionChange = (option) => {
    setActiveSortOption(option)
    // TODO: 實際的排序邏輯應通知父組件
    console.log(`Sort by: ${option}`)
  }

  const toggleSortOrder = () => {
    const newOrder = sortOrder === 'desc' ? 'asc' : 'desc'
    setSortOrder(newOrder)
    // TODO: 實際的排序順序改變應通知父組件
    console.log(`Sort order: ${newOrder}`)
  }

  const handleBrandChange = (brand) => {
    setSelectedBrand(brand)
    // TODO: 實際的品牌篩選邏輯應通知父組件
    console.log(`Brand selected: ${brand}`)
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory((prev) => (prev === category ? null : category)) // 點擊已選中的取消選擇
    // TODO: 實際的種類篩選邏輯應通知父組件
    console.log(`Category selected: ${category}`)
  }

  const handleRatingChange = (rating) => {
    setSelectedRating((prev) => (prev === rating ? null : rating))
    // TODO: 實際的評分篩選邏輯應通知父組件
    console.log(`Rating selected: ${rating}`)
  }

  const handlePriceRangeChange = (priceRange) => {
    setSelectedPriceRange((prev) => (prev === priceRange ? null : priceRange))
    // TODO: 實際的價格篩選邏輯應通知父組件
    console.log(`Price range selected: ${priceRange}`)
  }

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    // TODO: 實際的搜索邏輯應通知父組件
    console.log(`Search term: ${searchTerm}`)
  }

  const toggleFilterPanel = () => {
    setIsFilterPanelOpen(!isFilterPanelOpen)
  }

  return (
    <div className="product-sidebar-filter-container-mobile">
      {isFilterPanelOpen && (
        <div className="filter-sort-panel-container">
          {/* 排序方式 */}
          <div className="sort-tools-mobile">
            <div className="sort-tools-mobile-label">排序方式</div>
            <div className="sort-tools-mobile-box">
              <div className="sort-tools-mobile-btns-top">
                {SORT_OPTIONS.map((option) => (
                  <button
                    key={option}
                    className={`sort-tools-mobile-btn-top ${activeSortOption === option ? 'sort-tools-mobile-btn-top-active' : ''}`}
                    onClick={() => handleSortOptionChange(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <button
                className="sidebar-filter-order-order"
                onClick={toggleSortOrder}
              >
                {/* 使用 react-icons 替換 bi-arrow-down/up */}
                {sortOrder === 'desc' ? <BiArrowToBottom /> : <BiArrowToTop />}
              </button>
            </div>
          </div>

          {/* 品牌 */}
          <div className="sort-brand">
            <div className="sort-mobile-label">品牌</div>
            <div className="sort-tools-mobile-btns no-srollbar">
              {BRANDS.map((brand) => (
                <button
                  key={brand}
                  className={`sort-tools-mobile-btn ${selectedBrand === brand ? 'sort-tools-mobile-btn-active' : ''}`}
                  onClick={() => handleBrandChange(brand)}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          {/* 種類 */}
          <div className="sort-category">
            <div className="sort-mobile-label">種類</div>
            <div className="sort-tools-mobile-btns no-srollbar">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  className={`sort-tools-mobile-btn ${selectedCategory === category ? 'sort-tools-mobile-btn-active' : ''}`}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* 評分 */}
          <div className="sort-rating">
            <div className="sort-mobile-label">評分</div>
            <div className="sort-tools-mobile-btns no-srollbar">
              {RATINGS.map((rating) => (
                <button
                  key={rating}
                  className={`sort-tools-mobile-btn ${selectedRating === rating ? 'sort-tools-mobile-btn-active' : ''}`}
                  onClick={() => handleRatingChange(rating)}
                >
                  {rating}
                </button>
              ))}
            </div>
          </div>

          {/* 價格 */}
          <div className="sort-price">
            <div className="sort-mobile-label">價格</div>
            <div className="sort-tools-mobile-btns no-srollbar">
              {PRICE_RANGES.map((range) => (
                <button
                  key={range}
                  className={`sort-tools-mobile-btn ${selectedPriceRange === range ? 'sort-tools-mobile-btn-active' : ''}`}
                  onClick={() => handlePriceRangeChange(range)}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 篩選按鈕 (用於展開/收起面板) */}
      <div
        className={`filter-container-mobile ${isFilterPanelOpen ? 'filter-container-mobile-active' : ''}`}
      >
        <button onClick={toggleFilterPanel}>
          篩選
          {/* 使用 react-icons 替換 bx-chevron-up/down */}
          {isFilterPanelOpen ? (
            <BiChevronUp className="filter-container-mobile-icon" />
          ) : (
            <BiChevronDown className="filter-container-mobile-icon" />
          )}
        </button>
      </div>

      {/* 搜尋框 */}
      <div className="mobile-search-box">
        <form
          onSubmit={handleSearchSubmit}
          className="sidebar-filter-search-input-mobile"
        >
          <input
            className="sidebar-filter-search"
            type="text"
            placeholder="你想要找什麼呢？"
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
          {/* 使用 react-icons 替換 bx-search */}
          <BiSearch
            className="sidebar-filter-search-icon d-flex"
            onClick={handleSearchSubmit} // 讓圖標也可觸發搜索
            style={{ cursor: 'pointer' }} // 讓圖標看起來可點擊
          />
        </form>
      </div>
    </div>
  )
}

export default MobileFilterSidebar
