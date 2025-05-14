'use client'

import React, { useState, useEffect } from 'react'

import ParentComponent from './_components/ParentComponent' // 假設 ProductCard.jsx 在同一個資料夾或相對路徑

export default function MemberPage(props) {
  return (
    <>
      <div>Product List</div>
      <ParentComponent />
    </>
  )
}
