'use client'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import SidebarFilter from '../_components/desktop-filter'
import ProductCard from '../_components/product-card-s'
import '../_style.css/product-list.css'

const fetchProducts = async () => {
  const res = await axios.get(
    'http://localhost:3000/api/products?keyword=保濕&limit=20&offset=0&onSaleOnly=false&brandIds=4,2&minRating=1&maxRating=4&maxPrice=900&minPrice=500&categoryIds=1'
  )
  console.log('後端回傳資料:', res.data)
  return res.data.data
}

export default function ProductPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5,
  })

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div className="product-body container">
      {/* <h1>產品列表</h1> */}
      <SidebarFilter />
      <div className="productlist">
        {data.map((p) => (
          <div key={p.product_id} className="list-card-container">
            <ProductCard
              product={{
                id: p.product_id,
                brand: p.brand_name, // 確認你的後端資料欄位名稱對應
                name: p.name,
                price: p.final_price,
                originalPrice: p.base_price,
                rating: p.avg_rating,
                reviews: p.review_count,
                imageUrl: p.primary_image_url,
                isBookmarked: p.is_bookmarked, // 若無此欄位可先省略
                isSale: p.is_on_sale,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
