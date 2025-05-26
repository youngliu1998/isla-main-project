'use client'
import React, { useCallback } from 'react'
import { useState, useEffect } from 'react'
import { useProducts } from '../../../hook/use-products'
import SidebarFilter from '../_components/desktop-filter'
import MobileBottomFilter from '../_components/mobile-bottom-filter.js'
import ProductCard from '../_components/product-card-s'
import '../_style.css/product-list.css'
import useMobileDisplay from '../../../hook/use-mobile-display.js'

export default function ProductPage() {
  // const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const isMobile = useMobileDisplay('(max-width: 768px)')
  console.log('isMobile:', isMobile)
  const [isMobilePanelOpen, setIsMobilePanelOpen] = useState(false)

  const [filters, setFilters] = useState({
    keyword: '',
    brandIds: [],
    tagIds: [],
    categoryIds: [],
    minRating: 0,
    maxRating: 5,
    minPrice: 0,
    maxPrice: 9999,
    onSaleOnly: false,
    selectedPriceRangeKeys: [], // 保存未被parsePriceRanges轉換的價格區間
    sortBy: '',
    sortOrder: 'ASC',
  })

  const handleFilterChange = (partialUpdate) => {
    setFilters((prev) => {
      const updated = { ...prev, ...partialUpdate }
      // 更安全的比較方式是比較每個 key，或者相信 React 的 setState 機制
      // 這裡我們假設 partialUpdate 總是包含"有效"的更新
      let hasChanged = false
      for (const key in partialUpdate) {
        if (Object.prototype.hasOwnProperty.call(partialUpdate, key)) {
          if (
            JSON.stringify(prev[key]) !== JSON.stringify(partialUpdate[key])
          ) {
            hasChanged = true
            break
          }
        }
      }
      // 如果 onSaleOnly 被直接更新 (它不在 partialUpdate 但在 prev 中)
      // 且是唯一被更新的 filter，也需要考慮
      if (
        partialUpdate.onSaleOnly !== undefined &&
        prev.onSaleOnly !== partialUpdate.onSaleOnly
      ) {
        hasChanged = true
      }

      return hasChanged ? updated : prev
    })
  }

  const { products, productsLoading, productsError, brands, categories, tags } =
    useProducts(filters)

  useEffect(() => {
    console.log('Filters 更新 :', filters)
  }, [filters])

  const toggleMobilePanel = useCallback(() => {
    setIsMobilePanelOpen((prev) => !prev)
  }, []) // 空依賴陣列

  const ProductList = ({ products }) => {
    // 如果沒有產品或 products 不是陣列，可以提前返回 null 或提示信息
    if (!products || !Array.isArray(products) || products.length === 0) {
      // 這個訊息也可以由 ProductPage 來處理
      // return <div>暫無商品</div>;
      return null
    }

    return (
      <div className="product-list">
        {products.map((p) => (
          <div key={p.product_id} className="product-card-container">
            <ProductCard
              product={{
                id: p.product_id,
                brand: p.brand_name,
                name: p.name,
                price: p.final_price,
                originalPrice: p.base_price,
                rating: p.avg_rating,
                reviews: p.review_count,
                imageUrl: p.primary_image_url,
                isBookmarked: p.is_bookmarked,
                isSale: p.is_on_sale,
              }}
            />
          </div>
        ))}
      </div>
    )
  }
  return (
    <div className="product-body container">
      {isMobile ? (
        <>
          <MobileBottomFilter
            filters={filters}
            onFilterChange={handleFilterChange}
            brands={brands || []}
            categories={categories || []}
            tags={tags || []}
            isPanelOpen={isMobilePanelOpen} // 面板的開啟狀態
            onTogglePanel={toggleMobilePanel} // 切換面板狀態
          />
        </>
      ) : (
        <div className="filter-container">
          <SidebarFilter
            filters={filters}
            onFilterChange={handleFilterChange}
            brands={brands || []}
            categories={categories || []}
            tags={tags || []}
          />
        </div>
      )}
      <div className="productlist">
        <ProductList products={products} />
      </div>
    </div>
  )
}
