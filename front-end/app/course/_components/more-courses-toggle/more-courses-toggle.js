'use client'

import React from 'react'
import './more-courses-toggle.css'

export default function MoreCoursesToggle({ isExpanded, onToggle }) {
  return (
    <button
      className="more-courses-toggle d-flex align-items-center"
      onClick={onToggle}
      style={{
        cursor: 'pointer',
        border: 'none',
        background: 'transparent',
        fontWeight: 'bold',
        fontSize: '1.2rem',
      }}
    >
      {isExpanded ? '收起課程' : '更多課程'}
      <i
        className="bx bx-chevron-down fs-4 ms-1"
        style={{
          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.3s',
        }}
      />
    </button>
  )
}
