'use client'

import React, { useState, useEffect } from 'react'
import './chat.css'
import ChatList from './_components/chat-list'
import ChatRoom from './_components/chat-room'

export default function ChatPage(props) {
  return (
    <>
      <main className="main col col-md-10  main-text-color">
        <div className="row px-3 pb-3 h-100">
          {/* className寫在這無效！ */}
          <ChatList className="" />
          <ChatRoom className="d-none d-md-block" />
        </div>
      </main>
    </>
  )
}
