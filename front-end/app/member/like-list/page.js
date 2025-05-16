'use client'

import React, { useState, useEffect } from 'react'
import '../_styles/style.css'
import LikeListContainer from '../_component/like-list-container'
export default function LikeListPage(props) {
  return (
    <>
      <div className="user-content">
        <h3>會員資料</h3>
        <LikeListContainer />
      </div>
    </>
  )
}
