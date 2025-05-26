'use client'

import React, { useState, useEffect } from 'react'
import './chat.css'

export default function Chat(props) {
  return (
    <>
      <div className="position-fixed bottom-0 end-0 p-3">
        <button className="chat-btn border-0 shadow-sm">
          <div className="face">
            <div className="leftEye rounded-circle"></div>
            <div className="mouth"></div>
            <div className="rightEye rounded-circle"></div>
          </div>
        </button>
      </div>
    </>
  )
}
