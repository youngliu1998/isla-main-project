'use client'

import { useState, useEffect } from 'react'
import CouponTable from '../_components/coupon-table'
import useCouponOption from '@/hook/use-coupon-options'

export default function ProductCoupons() {
  const [coupons, setCoupons] = useState([])
  const [editCoupon, setEditCoupon] = useState(null)
  // 取得品牌與種類選項
  const { brands, categories } = useCouponOption()

  useEffect(() => {
    const token = localStorage.getItem('jwtToken')
    fetch('http://localhost:3005/api/coupon/admin', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const filter = data.data.filter(
          (coupon) => coupon.area === 1 || coupon.area === 0
        )
        setCoupons(filter)
      })
  }, [])
  // ✅ 編輯後送出 PATCH 請求
  const handleEdit = async (updatedCoupon) => {
    try {
      const res = await fetch(
        `http://localhost:3005/api/coupon/${updatedCoupon.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedCoupon),
        }
      )

      if (!res.ok) throw new Error('更新失敗')

      // ✅ 更新前端狀態：將原本該筆資料替換為新的
      const newCoupons = coupons.map((c) =>
        c.id === updatedCoupon.id ? { ...c, ...updatedCoupon } : c
      )
      setCoupons(newCoupons)
      alert('更新成功')
    } catch (err) {
      console.error('更新錯誤：', err)
      alert('更新失敗')
    }
  }

  // ✅ 刪除優惠券（將 valid 設為 0）
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3005/api/coupon/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!res.ok) throw new Error('刪除失敗')

      setCoupons((prev) => prev.filter((c) => c.id !== id))
      alert('已刪除')
    } catch (err) {
      console.error('刪除失敗', err)
      alert('刪除失敗')
    }
  }

  return (
    <div className="p-4">
      <h2>商品優惠券</h2>
      <CouponTable
        coupons={coupons}
        onEdit={handleEdit}
        onDelete={handleDelete}
        brands={brands}
        categories={categories}
      />
    </div>
  )
}
