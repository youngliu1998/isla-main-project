'use client'

import { useEffect, useState } from 'react'

export default function useCouponOption() {
  const [brands, setBrands] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [brandRes, categoryRes] = await Promise.all([
          fetch('http://localhost:3005/api/coupon/admin/brand'),
          fetch('http://localhost:3005/api/coupon/admin/category'),
        ])

        if (!brandRes.ok || !categoryRes.ok) throw new Error('資料載入失敗')

        const brandData = await brandRes.json()
        const categoryData = await categoryRes.json()

        // ✅ 正確欄位名稱是 id，不是 brand_id / category_id
        setBrands(brandData.data.map((b) => ({ id: b.id, name: b.name })))
        setCategories(
          categoryData.data.map((c) => ({ id: c.id, name: c.name }))
        )
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { brands, categories, loading, error }
}
