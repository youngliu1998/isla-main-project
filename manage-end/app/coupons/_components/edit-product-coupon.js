'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
import dayjs from 'dayjs'

export default function EditProductCoupon({
  coupon,
  onChange,
  onCancel,
  onSave,
  brands = [],
  categories = [],
}) {
  // console.log('正在編輯的 coupon:', coupon)
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

      {/* 說明 */}
      <div>
        <label className="block mb-1">說明</label>
        <Input
          value={coupon.description || ''}
          onChange={(e) => onChange('description', e.target.value)}
        />
      </div>

      {/* 品牌 */}
      <div>
        <label className="block mb-1">品牌</label>
        <select
          className="w-full border rounded px-3 py-2"
          value={String(coupon.brand_id ?? '')}
          onChange={(e) =>
            onChange(
              'brand_id',
              e.target.value === '' ? null : parseInt(e.target.value)
            )
          }
        >
          <option value="">無限制</option>
          {brands?.map((b) => (
            <option key={b.id} value={String(b.id)}>
              {b.name}
            </option>
          ))}
        </select>
      </div>

      {/* 種類 */}
      <div>
        <label className="block mb-1">種類</label>
        <select
          className="w-full border rounded px-3 py-2"
          value={coupon.category_id != null ? String(coupon.category_id) : '0'}
          onChange={(e) => onChange('category_id', parseInt(e.target.value))}
        >
          <option value="0">無限制</option>
          {categories?.map((c) => (
            <option key={c.id} value={String(c.id)}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* 金額 */}
      <div>
        <label className="block mb-1">折扣金額</label>
        <Input
          type="number"
          value={
            coupon.amount !== undefined && coupon.amount !== null
              ? parseInt(coupon.amount)
              : ''
          }
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
          onChange={(e) => onChange('discount_rate', parseInt(e.target.value))}
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

      {/* 最低條件 */}
      <div>
        <label className="block mb-1">最低金額</label>
        <Input
          type="number"
          value={coupon.min_amount ?? ''}
          onChange={(e) => onChange('min_amount', parseInt(e.target.value))}
        />
      </div>

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

      {/* 按鈕區塊 */}
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          取消
        </Button>
        <Button onClick={onSave}>儲存變更</Button>
      </DialogFooter>
    </div>
  )
}
