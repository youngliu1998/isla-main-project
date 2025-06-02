'use client'

import { useState } from 'react'
import NewCouponAdd from '../_components/new-coupon-add'
import useCouponOption from '@/hook/use-coupon-options'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { CheckCircle } from 'lucide-react'

export default function CouponAddPage() {
  const { brands, categories, courseCategories } = useCouponOption()
  const [showSuccess, setShowSuccess] = useState(false) // 控制提示是否顯示

  // 建立優惠券後顯示提示，自動滾動至頂部
  const handleCreate = async (form, resetForm) => {
    const token = localStorage.getItem('jwtToken')
    const res = await fetch('http://localhost:3005/api/coupon/admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    })

    const result = await res.json()

    if (result.status === 'success') {
      resetForm() // 清空表單
      setShowSuccess(true) // 顯示成功訊息
      window.scrollTo({
        // 滾動到頂部
        top: 0,
        behavior: 'smooth',
      })
      setTimeout(() => setShowSuccess(false), 3000)
    } else {
      alert('新增失敗')
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* 成功提示訊息 */}
      {showSuccess && (
        <Alert
          variant="default"
          className="mb-4 flex items-start gap-2 border-green-200 bg-green-50 text-green-800"
        >
          <CheckCircle className="w-5 h-5 mt-0.5 text-green-600" />
          <div>
            <AlertTitle className="text-base font-semibold">
              新增成功
            </AlertTitle>
            <AlertDescription className="text-sm">
              優惠券已成功新增
            </AlertDescription>
          </div>
        </Alert>
      )}

      {/* 新增表單元件 */}
      <NewCouponAdd
        brands={brands}
        categories={categories}
        courseCategories={courseCategories}
        onSubmit={handleCreate}
      />
    </div>
  )
}
