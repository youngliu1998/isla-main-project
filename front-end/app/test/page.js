'use client'
import React, { useRef, useState, useLayoutEffect, useEffect } from 'react'
import './tab.css'

const categories = ['全部', '熱門', '最新', '追蹤中']

export default function Componentstab({ items = [] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef(null)
  // underlineStyle 直接給 left/width
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 })
  // 是否啟用 transition
  const [enableTransition, setEnableTransition] = useState(false)

  // 首次載入：用 useLayoutEffect 在畫面繪製前就定位
  useLayoutEffect(() => {
    const btn = containerRef.current?.children[activeIndex]
    if (btn) {
      setUnderlineStyle({
        left: btn.offsetLeft,
        width: btn.offsetWidth,
      })
    }
    // 等 useLayoutEffect 做完後，下個 tick 才允許 transition
    // 用 setTimeout 讓它跟 useLayoutEffect 分開
    setTimeout(() => setEnableTransition(true), 0)
  }, [])

  // activeIndex 變動時，如果已允許 transition，就再跑一次定位（會有動畫）
  useEffect(() => {
    if (!enableTransition) return
    const btn = containerRef.current?.children[activeIndex]
    if (btn) {
      setUnderlineStyle({
        left: btn.offsetLeft,
        width: btn.offsetWidth,
      })
    }
  }, [activeIndex, enableTransition])

  // 派生 edge class（可選）
  const edgeClass =
    activeIndex === 0
      ? 'start'
      : activeIndex === categories.length - 1
        ? 'end'
        : ''

  return (
    <div className="tab-container position-relative" style={{ width: '100%' }}>
      <div className="tab-set" ref={containerRef}>
        {items.map((cat, i) => (
          <button
            key={i}
            className={`btn btn-link w-100 text-decoration-none fw-semibold ${
              i === activeIndex ? 'text-primary' : 'text-secondary'
            }`}
            onClick={() => setActiveIndex(i)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div
        className={`category-underline ${edgeClass} ${
          enableTransition ? '' : 'no-transition'
        }`}
        style={{
          left: underlineStyle.left,
          width: underlineStyle.width,
        }}
      />
    </div>
  )
}
