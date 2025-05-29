'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
import dayjs from 'dayjs'

export default function EditCouponForm({
  coupon,
  onChange,
  onCancel,
  onSave,
  brands = [],
  categories = [],
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
          value={coupon.brand_id != null ? String(coupon.brand_id) : '0'}
          onChange={(e) => onChange('brand_id', Number(e.target.value))}
        >
          <option value="0">無限制</option>
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
          onChange={(e) => onChange('category_id', Number(e.target.value))}
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
        <label className="block mb-1">金額</label>
        <Input
          type="number"
          value={coupon.amount ?? ''}
          onChange={(e) => onChange('amount', Number(e.target.value))}
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
          onChange={(e) => onChange('discount_rate', Number(e.target.value))}
        />
      </div>

      {/* 免運 */}
      <div>
        <label className="block mb-1">免運</label>
        <select
          className="w-full border rounded px-3 py-2"
          value={coupon.free ?? 0}
          onChange={(e) => onChange('free', Number(e.target.value))}
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
          onChange={(e) => onChange('min_amount', Number(e.target.value))}
        />
      </div>

      <div>
        <label className="block mb-1">最低數量</label>
        <Input
          type="number"
          value={coupon.min_quantity ?? ''}
          onChange={(e) => onChange('min_quantity', Number(e.target.value))}
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
