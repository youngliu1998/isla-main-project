'use client'

import React, { useState, useEffect } from 'react'
import './chat.css'
import ChatList from './_components/chat-list'
import ChatRoom from './_components/chat-room'

export default function ChatPage(props) {
  return (
    <>
      <main className="main col col-10 col-xl-10 d-flex flex-column align-items-center">
        {/* <div className="posts d-flex flex-column gap-3 w-100"></div> */}
        <div className="chat-container row w-100 pb-3 h-100">
          {/* className寫在這無效！ */}
          <ChatList />
          <ChatRoom />
        </div>
      </main>
    </>
  )
}
