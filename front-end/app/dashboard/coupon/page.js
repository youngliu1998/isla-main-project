'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function CouponPage() {
  const [coupons, setCoupons] = useState([])

  // 初始載入資料
  useEffect(() => {
    fetch('http://localhost:3005/api/coupon/admin')
      .then((res) => res.json())
      .then((data) => {
        setCoupons(data.coupons || [])
      })
      .catch((err) => {
        console.error('載入優惠券失敗:', err)
      })
  }, [])

  const handleDelete = (id) => {
    if (confirm('確定要刪除這張優惠券嗎？')) {
      fetch(`http://localhost:3005/api/admin/coupons/${id}`, {
        method: 'DELETE',
      })
        .then((res) => res.json())
        .then(() => {
          setCoupons((prev) => prev.filter((c) => c.id !== id))
        })
    }
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>優惠券列表</h2>
        <Link href="/dashboard/coupon/add" className="btn btn-primary">
          新增優惠券
        </Link>
      </div>

      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>標題</th>
            <th>描述</th>
            <th>類型</th>
            <th>品牌</th>
            <th>分類</th>
            <th>課程分類</th>
            <th>金額/折扣</th>
            <th>滿額</th>
            <th>期限</th>
            <th>免運</th>
            <th>區域</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon) => (
            <tr key={coupon.id}>
              <td>{coupon.title}</td>
              <td>{coupon.description}</td>
              <td>{coupon.type_name || '-'}</td>
              <td>{coupon.brand_name || '-'}</td>
              <td>{coupon.category_name || '-'}</td>
              <td>{coupon.course_category_name || '-'}</td>
              <td>
                {coupon.discount_rate < 1
                  ? `${coupon.discount_rate * 10} 折`
                  : coupon.amount > 0
                    ? `折 NT$${coupon.amount}`
                    : '-'}
              </td>
              <td>{coupon.min_amount || '-'}</td>
              <td>
                {coupon.valid_from} ~ {coupon.valid_to}
              </td>
              <td>{coupon.free === 1 ? '是' : '否'}</td>
              <td>{coupon.area_name || '-'}</td>
              <td>
                <Link
                  href={`/dashboard/coupon/edit/${coupon.id}`}
                  className="btn btn-sm btn-secondary me-2"
                >
                  編輯
                </Link>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(coupon.id)}
                >
                  刪除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
