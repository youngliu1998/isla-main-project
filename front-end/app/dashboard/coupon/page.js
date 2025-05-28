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
    <div className="card border-0 shadow-sm">
      <div className="card-header bg-light d-flex justify-content-between align-items-center">
        <h5 className="mb-0">優惠券列表</h5>
        <Link href="/dashboard/coupon/add" className="btn btn-primary btn-sm">
          新增優惠券
        </Link>
      </div>

      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover table-bordered align-middle mb-0">
            <thead className="table-light text-center">
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
                  <td className="text-center">
                    {coupon.discount_rate < 1
                      ? `${coupon.discount_rate * 10} 折`
                      : coupon.amount > 0
                        ? `折 NT$${coupon.amount}`
                        : '-'}
                  </td>
                  <td className="text-center">{coupon.min_amount || '-'}</td>
                  <td className="text-nowrap">
                    {coupon.valid_from} ~ {coupon.valid_to}
                  </td>
                  <td className="text-center">
                    {coupon.free === 1 ? '是' : '否'}
                  </td>
                  <td>{coupon.area_name || '-'}</td>
                  <td className="text-center">
                    <Link
                      href={`/dashboard/coupon/edit/${coupon.id}`}
                      className="btn btn-sm btn-outline-secondary me-2"
                    >
                      編輯
                    </Link>
                    <button
                      className="btn btn-sm btn-outline-danger"
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
      </div>
    </div>
  )
}
