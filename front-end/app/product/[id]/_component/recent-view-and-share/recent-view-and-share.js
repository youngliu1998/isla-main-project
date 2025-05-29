'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { toast } from 'react-toastify'
import Image from 'next/image'
import './recent-view-and-share.css'
import { Tooltip } from  'react-bootstrap'

export default function ReactViewShare({ product }) {
  const [recentProducts, setRecentProducts] = useState([])

  // 取得 & 儲存最近查看商品
  useEffect(() => {
    if (!product) return

    const key = 'recent_viewed'
    let viewed = JSON.parse(localStorage.getItem(key)) || []

    viewed = viewed.filter((p) => p.product_id !== product.product_id)
    viewed.unshift({
      product_id: product.product_id,
      name: product.name,
      image: product.images?.[0]?.image_url,
    })

    viewed = viewed.slice(0, 5) // 只保留最多 5 筆
    localStorage.setItem(key, JSON.stringify(viewed))
    setRecentProducts(viewed)
  }, [product])

  const handleCopyLink = () => {
    const shareUrl = window.location.href
    navigator.clipboard.writeText(shareUrl)
    toast.success('已複製分享連結！')
  }

  return (
    <div className="left-floating-bar">
      <div className="floating-section">
        <div className="floating-title">最近瀏覽</div>
        {recentProducts.map((p) => (
          <Link key={p.product_id} href={`/product/${p.product_id}`}>
            <Image
              src={`https://isla-image.chris142852145.workers.dev/${p.image}`}
              data-bs-toggle="tooltip"
              alt={p.name}
              width={50}
              height={50}
              className="floating-thumb"
            />
          </Link>
        ))}
      </div>

      <div className="floating-section">
        <div className="floating-title">分享</div>
        <button className="share-btn" onClick={handleCopyLink}>
          複製連結
        </button>
      </div>
    </div>
  )
}
