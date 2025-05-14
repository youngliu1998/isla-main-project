'use client'

import Image from 'next/image'
import { BsTrash } from 'react-icons/bs'
import styles from './Product-card.module.scss'
import { useState } from 'react'

export default function ProductCardAddon({
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
    <div className="card border-0">
      <div className="row g-3">
        <div className="col-md-3 flex">
          <div className="d-flex justify-content-center align-items-center">
            <input
              className={`${styles.checkboxInput} form-check-input me-2`}
              type="checkbox"
              id={id}
              defaultChecked
            />
            <label htmlFor={id}>
              <Image
                src={image}
                className="img-fluid"
                width={130}
                height={130}
                alt="商品圖"
              />
            </label>
          </div>
        </div>

        <div className="col-md-9">
          <div className="card-body d-flex flex-column gap-1 gap-lg-2">
            {/* 商品名稱 + 30% off + delete-icon */}
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <h5 className="card-title fw-normal mb-1">
                  {title}
                  <span className="badge bg-strong ms-2">
                    加購價{discountBadge}
                  </span>
                </h5>
              </div>
              <button
                type="button"
                className="btn border-0 p-0"
                onClick={onDelete}
              >
                <BsTrash className="text-subtext fs-5" />
              </button>
            </div>

            {/* 色號*/}
            <div className="d-flex align-items-center">
              <div className="d-flex gap-2 me-3 mt-1">
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
            </div>

            {/* 價格與數量 */}
            <div>
              <div className="d-flex justify-content-between align-items-center mt-2">
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
    </div>
  )
}
