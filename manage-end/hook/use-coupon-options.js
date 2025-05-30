'use client'

import { useEffect, useState } from 'react'

export default function useCouponOption() {
  const [brands, setBrands] = useState([])
  const [categories, setCategories] = useState([])
  const [courseCategories, setCourseCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [brandRes, categoryRes, courseCategoryRes] = await Promise.all([
          fetch('http://localhost:3005/api/coupon/admin/brand'),
          fetch('http://localhost:3005/api/coupon/admin/category'),
          fetch('http://localhost:3005/api/coupon/admin/course-category'),
        ])

        if (!brandRes.ok || !categoryRes.ok || !courseCategoryRes.ok) {
          throw new Error('資料載入失敗')
        }

        const brandData = await brandRes.json()
        const categoryData = await categoryRes.json()
        const courseCategoryData = await courseCategoryRes.json()

        setBrands(brandData.data.map((b) => ({ id: b.id, name: b.name })))
        setCategories(
          categoryData.data.map((c) => ({ id: c.id, name: c.name }))
        )
        setCourseCategories(
          courseCategoryData.data.map((c) => ({ id: c.id, name: c.name }))
        )
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { brands, categories, courseCategories, loading, error }
}
