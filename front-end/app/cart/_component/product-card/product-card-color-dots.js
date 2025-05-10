'use client'

import Image from 'next/image'
import { BsTrash } from 'react-icons/bs'
import styles from './Product-card.module.scss'
import QuantityControler from './quantity-controler'
import { useState } from 'react'

export default function ProductCardColorDots({
  id = 'itemCheck02',
  title = '[Kaja] Eyeshadow Palette',
  image = '/images/image-02.png',
  price = 1250,
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
        {/* 商品圖片 */}
        <div className="col-md-3">
          <div className="d-flex justify-content-center align-items-center">
            <input className="form-check-input me-2" type="checkbox" id={id} />
            <label htmlFor={id}>
              <Image
                src={image}
                className="img-fluid"
                width={100}
                height={100}
                alt="商品圖"
              />
            </label>
          </div>
        </div>

        {/* 商品內容 */}
        <div className="col-md-9">
          <div className="card-body d-flex flex-column gap-1 gap-lg-2">
            {/* 標題 + 垃圾桶 */}
            <div className="d-flex justify-content-between">
              <h5 className="card-title fw-normal">{title}</h5>
              <button
                type="button"
                className="btn border-0 p-0"
                onClick={onDelete}
              >
                <BsTrash className="text-subtext fs-5" />
              </button>
            </div>

            {/* 顏色點選區 */}
            <div className="d-flex gap-2 mt-2">
              {colors.map((color) => (
                <button
                  type="button"
                  key={color.name}
                  className={`${styles.colorDot} ${activeColor === color.name ? styles.active : ''} ${color.className || ''}`}
                  title={color.name}
                  style={color.color ? { backgroundColor: color.color } : {}}
                  onClick={() => handleColorClick(color.name)}
                ></button>
              ))}
            </div>

            {/* 數量與價格 */}
            <div className="d-flex justify-content-between align-items-center">
              <QuantityControler
                onChange={(quantity) => {
                  console.log('新數量：', quantity)
                }}
              />
              <div className="fs-5">
                <strong>NT${price}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
