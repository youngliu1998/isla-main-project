'use client'

import React, { useState, useEffect } from 'react'
import './chat.css'

export default function Chat(props) {
  const [isRoomOpen, setRoomOpen] = useState(false)
  return (
    <>
      <div
        className={`position-fixed bottom-0 end-0 gap-2 me-3 mb-3 d-flex flex-column align-items-end`}
      >
        <div
          className={`service-chat-room overflow-auto shadow-lg rounded-3 ${isRoomOpen ? 'd-block' : 'd-none'}`}
        >
          <div className="chat-main d-flex flex-column position-relative h-100 bg-pure-white  shadow-forum overflow-hidden">
            <div className="chat-main-header d-flex gap-2 px-3 py-3 align-items-center shadow-sm fw-bold">
              <span className="d-inline-block">isla 美妝助理</span>
            </div>
            <div className="messages-block px-4" />
            <input
              className="chat-main-input position-absolute bottom-0 mx-3 mb-2 px-3 py-2 start-0 end-0 border-0 rounded-pill"
              type="text"
              placeholder="輸入訊息⋯⋯"
            />
          </div>
        </div>
        <button
          className="chat-btn border-0 shadow-sm"
          onClick={() => {
            isRoomOpen && setRoomOpen(false)
            !isRoomOpen && setRoomOpen(true)
          }}
        >
          <div className={`face ${isRoomOpen ? 'look' : ''}`}>
            <div className="leftEye rounded-circle"></div>
            <div className="mouth"></div>
            <div className="rightEye rounded-circle"></div>
          </div>
        </button>
      </div>
    </>
  )
}
