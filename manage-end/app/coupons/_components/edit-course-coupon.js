'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
import dayjs from 'dayjs'

export default function EditCourseCouponForm({
  coupon,
  onChange,
  onCancel,
  onSave,
  courseCategories = [],
}) {
  return (
    <div className="space-y-4">
      {/* 名稱 */}
      <div>
        <label className="block mb-1">名稱</label>
        <Input
          value={coupon.title || ''}
          onChange={(e) => onChange('title', e.target.value)}
        />
      </div>

      {/* 課程分類 */}
      <div>
        <label className="block mb-1">課程分類</label>
        <select
          className="w-full border rounded px-3 py-2"
          value={coupon.course_categories_id ?? ''}
          onChange={(e) =>
            onChange('course_categories_id', parseInt(e.target.value))
          }
        >
          <option value="">無限制</option>
          {courseCategories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* 說明 */}
      <div>
        <label className="block mb-1">說明</label>
        <Input
          value={coupon.description || ''}
          onChange={(e) => onChange('description', e.target.value)}
        />
      </div>

      {/* 折扣金額 */}
      <div>
        <label className="block mb-1">折扣金額</label>
        <Input
          type="number"
          value={coupon.amount ?? ''}
          onChange={(e) => onChange('amount', parseInt(e.target.value))}
        />
      </div>

      {/* 折扣率 */}
      <div>
        <label className="block mb-1">折扣率 (0 ~ 1)</label>
        <Input
          type="number"
          step="0.01"
          min="0"
          max="1"
          value={coupon.discount_rate ?? ''}
          onChange={(e) =>
            onChange('discount_rate', parseFloat(e.target.value))
          }
        />
      </div>

      {/* 免運 */}
      <div>
        <label className="block mb-1">免運</label>
        <select
          className="w-full border rounded px-3 py-2"
          value={coupon.free ?? 0}
          onChange={(e) => onChange('free', parseInt(e.target.value))}
        >
          <option value={0}>否</option>
          <option value={1}>是</option>
        </select>
      </div>

      {/* 最低金額 */}
      <div>
        <label className="block mb-1">最低金額</label>
        <Input
          type="number"
          value={coupon.min_amount ?? ''}
          onChange={(e) => onChange('min_amount', parseInt(e.target.value))}
        />
      </div>

      {/* 最低數量 */}
      <div>
        <label className="block mb-1">最低數量</label>
        <Input
          type="number"
          value={coupon.min_quantity ?? ''}
          onChange={(e) => onChange('min_quantity', parseInt(e.target.value))}
        />
      </div>

      {/* 到期日 */}
      <div>
        <label className="block mb-1">到期日</label>
        <Input
          type="date"
          value={
            coupon.valid_to ? dayjs(coupon.valid_to).format('YYYY-MM-DD') : ''
          }
          onChange={(e) => onChange('valid_to', e.target.value)}
        />
      </div>

      {/* 按鈕 */}
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          取消
        </Button>
        <Button onClick={onSave}>儲存變更</Button>
      </DialogFooter>
    </div>
  )
}
