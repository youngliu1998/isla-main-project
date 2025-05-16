'use client'
import React, { useRef, useState, useLayoutEffect, useEffect } from 'react'
import './tab.css'

export default function Componentstab({
  items = [],
  height = 60, // 預設高度，直接用數字
  setCate = () => {},
  mutate = () => {},
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef(null)
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 })
  const [enableTransition, setEnableTransition] = useState(false)

  // 把更新 underline 的邏輯抽成函式
  const updateUnderline = () => {
    const btn = containerRef.current?.children[activeIndex]
    if (btn) {
      setUnderlineStyle({
        left: btn.offsetLeft,
        width: btn.offsetWidth,
      })
    }
  }

  // 首次載入就定位，並開啟 transition
  useLayoutEffect(() => {
    updateUnderline()
    // 下一個 tick 才啟用動畫，避免一進來就看到位移動畫
    setTimeout(() => setEnableTransition(true), 0)
  }, []) // 只跑一次

  // activeIndex 或容器 ref 換了就重新計算位置
  useEffect(() => {
    if (!enableTransition) return
    updateUnderline()
  }, [activeIndex, enableTransition])

  // 監聽 resize，並在元件卸載時移除 listener
  useEffect(() => {
    if (!enableTransition) return
    const handleResize = () => {
      updateUnderline()
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [enableTransition, activeIndex])

  // 可選：依據邊界，切換不同 class（如果你 CSS 有定義 start/end 樣式）
  const edgeClass =
    activeIndex === 0 ? 'start' : activeIndex === items.length - 1 ? 'end' : ''

  return (
    <div
      className="tab-container position-relative"
      style={{ width: '100%', height: `${height}px` }}
    >
      <div className="tab-set h-100 d-flex" ref={containerRef}>
        {items.map((cat, i) => (
          <button
            key={i}
            className={`btn btn-link flex-fill text-decoration-none fw-semibold ${
              i === activeIndex ? 'text-primary' : 'subtext'
            }`}
            onClick={() => {
              setActiveIndex(i)
              setCate(i)
              mutate()
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 這條底線 */}
      <div
        className={`category-underline ${edgeClass} ${
          enableTransition ? 'with-transition' : 'no-transition'
        }`}
        style={{
          left: underlineStyle.left,
          width: underlineStyle.width,
        }}
      />
    </div>
  )
}
