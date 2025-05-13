'use client'

import Image from 'next/image'
import { BsTrash } from 'react-icons/bs'
import styles from './Product-card.module.scss'
import { useState } from 'react'

export default function ProductCardTest({
  id = 'addon01',
  title = '[Kaja] Berry Red Lipstick',
  image = 'images/cart-test/image-01.png',
  price = 860,
  originalPrice = 1200,
  discountBadge = '30% OFF',
  colors = [
    { name: '南瓜橘', color: '#ff8800' },
    { name: '莓果紅', color: '#e71e1e' },
    { name: '煙燻灰', className: 'bg-subtext' },
  ],
  selectedColor = null,
  onColorChange = () => {},
  onDelete = () => {},
}) {
  const [activeColor, setActiveColor] = useState(
    selectedColor || colors[0]?.name
  )

  const handleColorClick = (colorName) => {
    setActiveColor(colorName)
    onColorChange(colorName)
  }

  return (
    <div className={`card border-0 ${styles.mobileProductCard}`}>
      <div className="row g-3">
        {/* ✅ 圖片＋標題橫排區（手機版時生效） */}
        <div className={`${styles.imageTitleWrapMb} col-3`}>
          {/* 商品圖片區 */}
          <div className="me-3 d-flex align-items-start">
            <input
              className={`${styles.checkboxInput} form-check-input me-2`}
              type="checkbox"
              id={id}
              defaultChecked
            />
            <label htmlFor={id}>
              <Image
                src={image}
                className={`${styles.productImage} img-fluid`}
                width={130}
                height={130}
                alt="商品圖"
              />
            </label>
          </div>

          {/* 商品標題與刪除按鈕 */}
          <div className="d-flex justify-content-between align-items-start w-100">
            <h5 className="card-title fw-normal mb-1">
              {title}
              <span className="badge bg-strong ms-2">
                加購價{discountBadge}
              </span>
            </h5>
            <button
              type="button"
              className="btn border-0 p-0"
              onClick={onDelete}
            >
              <BsTrash className="text-subtext fs-5" />
            </button>
          </div>
        </div>

        {/* ✅ 商品資訊（色號、價格） */}
        <div className="col-9">
          <div
            className={`${styles.contentAreaMb} card-body d-flex flex-column gap-2`}
          >
            {/* 色號 */}
            <div className="d-flex gap-2 mt-1">
              {colors.map((color, index) => (
                <span
                  key={index}
                  className={`${styles.colorDot} ${
                    activeColor === color.name ? styles.active : ''
                  } ${color.className || ''}`}
                  title={color.name}
                  style={
                    color.color ? { backgroundColor: color.color } : undefined
                  }
                  onClick={() => handleColorClick(color.name)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={() => handleColorClick(color.name)}
                />
              ))}
            </div>

            {/* 數量與價格 */}
            <div className={`${styles.priceRow}`}>
              <span className="text-muted small">數量：1</span>
              <div>
                <del className="me-2">NT${originalPrice}</del>
                <span className="h5 text-maintext">NT${price}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
