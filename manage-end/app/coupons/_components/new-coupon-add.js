'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

// brands, categories, courseCategories 可透過 props 傳入或 hook 使用
export default function NewCouponAdd({
  brands = [],
  categories = [],
  courseCategories = [],
  onSubmit,
}) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    type_id: 1,
    brand_id: 0,
    category_id: 0,
    course_categories_id: 0,
    amount: 0,
    discount_rate: 1,
    free: 0,
    min_amount: 0,
    min_quantity: 0,
    valid_from: '',
    valid_to: '',
    area: 1,
  })

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // 格式化未用欄位為 0
    const formatted = {
      ...form,
      brand_id: form.area === 1 ? form.brand_id : 0,
      category_id: form.area === 1 ? form.category_id : 0,
      course_categories_id: form.area === 2 ? form.course_categories_id : 0,
    }

    onSubmit(formatted)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-2xl mx-auto shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">新增優惠券</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 基本資訊 */}
            <div className="space-y-2">
              <Label className="block">標題</Label>
              <Input
                value={form.title}
                onChange={(e) => handleChange('title', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="block">說明</Label>
              <Input
                value={form.description}
                onChange={(e) => handleChange('description', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="block">類型</Label>
              <select
                value={form.type_id}
                onChange={(e) =>
                  handleChange('type_id', parseInt(e.target.value))
                }
                className="w-full border rounded px-3 py-2"
              >
                <option value={1}>滿額券</option>
                <option value={2}>折扣券</option>
                <option value={3}>免運券</option>
              </select>
            </div>

            {/* 條件設定 */}
            {form.type_id === 1 && (
              <div className="space-y-2">
                <Label className="block">折扣金額</Label>
                <Input
                  type="number"
                  value={form.amount}
                  onChange={(e) =>
                    handleChange('amount', parseFloat(e.target.value))
                  }
                />
              </div>
            )}
            {form.type_id === 2 && (
              <div className="space-y-2">
                <Label className="block">折扣比例（如 0.9 = 九折）</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={form.discount_rate}
                  onChange={(e) =>
                    handleChange('discount_rate', parseFloat(e.target.value))
                  }
                />
              </div>
            )}
            {form.type_id === 3 && (
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.free === 1}
                  onChange={(e) =>
                    handleChange('free', e.target.checked ? 1 : 0)
                  }
                />
                <Label className="block">免運</Label>
              </div>
            )}

            <div className="space-y-2">
              <Label className="block">最低金額門檻</Label>
              <Input
                type="number"
                value={form.min_amount}
                onChange={(e) =>
                  handleChange('min_amount', parseFloat(e.target.value))
                }
              />
            </div>

            {/* 時間設定 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="block">開始日期</Label>
                <Input
                  type="date"
                  value={form.valid_from}
                  onChange={(e) => handleChange('valid_from', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label className="block">結束日期</Label>
                <Input
                  type="date"
                  value={form.valid_to}
                  onChange={(e) => handleChange('valid_to', e.target.value)}
                />
              </div>
            </div>

            {/* 適用範圍 */}
            <div className="space-y-2">
              <Label className="block">適用範圍</Label>
              <select
                value={form.area}
                onChange={(e) => handleChange('area', parseInt(e.target.value))}
                className="w-full border rounded px-3 py-2"
              >
                <option value={1}>商品</option>
                <option value={2}>課程</option>
              </select>
            </div>

            {/* 顯示對應欄位 */}
            {form.area === 1 && (
              <>
                <div className="space-y-2">
                  <Label className="block">品牌</Label>
                  <select
                    value={form.brand_id}
                    onChange={(e) =>
                      handleChange('brand_id', parseInt(e.target.value))
                    }
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value={0}>請選擇品牌</option>
                    {brands.map((b) => (
                      <option key={b.brand_id} value={b.brand_id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label className="block">商品分類</Label>
                  <select
                    value={form.category_id}
                    onChange={(e) =>
                      handleChange('category_id', parseInt(e.target.value))
                    }
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value={0}>請選擇分類</option>
                    {categories.map((c) => (
                      <option key={c.category_id} value={c.category_id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}

            {form.area === 2 && (
              <div className="space-y-2">
                <Label className="block">課程分類</Label>
                <select
                  value={form.course_categories_id}
                  onChange={(e) =>
                    handleChange(
                      'course_categories_id',
                      parseInt(e.target.value)
                    )
                  }
                  className="w-full border rounded px-3 py-2"
                >
                  <option value={0}>請選擇課程分類</option>
                  {courseCategories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <Button type="submit" variant="blue" className="w-full">
              送出
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
