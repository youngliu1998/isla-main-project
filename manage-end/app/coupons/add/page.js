'use client'

import NewCouponAdd from '../_components/new-coupon-add'
import useCouponOption from '@/hook/use-coupon-options'

export default function CouponAddPage() {
  const { brands, categories, courseCategories } = useCouponOption()

  const handleCreate = async (form) => {
    const token = localStorage.getItem('jwtToken')
    const res = await fetch('http://localhost:3005/api/coupon', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    })

    const result = await res.json()
    if (result.status === 'success') alert('新增成功')
    else alert('新增失敗')
  }

  return (
    <NewCouponAdd
      brands={brands}
      categories={categories}
      courseCategories={courseCategories}
      onSubmit={handleCreate}
    />
  )
}
