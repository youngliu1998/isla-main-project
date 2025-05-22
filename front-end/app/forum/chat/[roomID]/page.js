'use client'

import { useParams, useRouter } from 'next/navigation'
import React, { useState, useEffect, useRef, use } from 'react'
import ComponentsAuthorInfo from '../../_components/author-info'
import { useAuth } from '../../../../hook/use-auth'
import ReconnectingWebSocket from 'reconnecting-websocket'
import useSWR from 'swr'
import ComponentsAvatar from '../../_components/avatar'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function ChatRoom() {
  const router = useRouter()
  const { user } = useAuth()
  const userID = user.id
  const userNick = user.nickname
  const userUrl = user.ava_url
  const roomID = useParams().roomID
  const [messages, setMessages] = useState([])
  const messagesRef = useRef()

  useEffect(() => {
    if (userID === 0) {
      alert('請先登入')
      router.push('/member/login')
    }
  }, [userID, router])

  const { data, isLoading, error } = useSWR(
    `http://localhost:3005/api/forum/chat?userID=${userID}&roomID=${roomID}`,
    fetcher
  )
  let roomDetail
  if (data) roomDetail = data.data[0] //FIXME 需要更好的方法處理聊天室名稱

  useEffect(() => {
    if (data) {
      setMessages(JSON.parse(data.data[0].msg))
    } //QU 沒if data的話會無限迴圈
  }, [data])

  const ws = new ReconnectingWebSocket('ws://localhost:8080')

  useEffect(() => {
    const handleMessage = async (event) => {
      const newMsg = await event.data.text().then((txt) => JSON.parse(txt))
      // console.log(newMsg)
      setMessages([...messages, newMsg])
    }
    ws.addEventListener('message', handleMessage)
    const msgCurr = messagesRef.current
    if (msgCurr) msgCurr.scrollTop = msgCurr.scrollHeight
    return () => ws.removeEventListener('message', handleMessage)
  }, [ws])

  if (userID === 0) return null
  if (error) {
    return <>連線失敗，請再試一次</>
  }
  if (isLoading) {
    return <>載入中</>
  }

  ws.addEventListener('close', (event) => {
    console.log('連線關閉')
  })

  const handleCreateMsg = async (newMsg) => {
    const res = await fetch(
      `http://localhost:3005/api/forum/chat?roomID=${roomID}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newMsg: newMsg }),
      }
    )
    if (!res.ok) throw new Error('未成功連線')
  }
  return (
    <>
      {/* <div className="chat-room col col-11 col-md-7 p-0 d-none d-md-block"> */}
      <div className="chat-main d-flex flex-column h-100 bg-pure-white rounded-3 ms-md-3 shadow-forum">
        <div className="chat-main-header bg-pure-white d-flex gap-2 px-3 py-2 align-items-center shadow-sm fs20 fw-bold rounded-top-3">
          <button
            className="chat-main-return d-block d-md-none rounded-circle border-0 p-2"
            onClick={(e) => {
              router.push('/forum/chat')
            }}
          >
            <i className="bi bi-arrow-left d-flex"></i>
          </button>
          <ComponentsAuthorInfo
            authorID="1"
            width={36}
            src="image_9.jpg" //TODO 多人群組頭貼
            fontSize="20"
            color="main-text-color"
            authorName={roomDetail.nicks}
          />
        </div>
        <div className="messages-block overflow-hidden pt-3 h-100">
          <div
            ref={messagesRef}
            className="messages-list overflow-auto px-3 h-100 d-flex flex-column gap-2"
          >
            {messages.map((m, i) => {
              {
                /* if (m.sender_id === userID) { */
              }
              return (
                <div className="d-flex align-items-top gap-2" key={i}>
                  <div
                    className={`d-flex flex-column gap-1 ${m.sender_id == userID ? 'ms-auto align-items-end order-0' : 'me-auto order-1'}`}
                  >
                    {/* <div className="fs14 sub-text-color">{m.nick}</div> */}
                    <div
                      className={`message px-2 py-1 rounded-4 bg-light-hover tex-`}
                    >
                      {m.content}
                    </div>
                  </div>
                  <div
                    className={`card-border rounded-circle mb-auto ${m.sender_id === userID ? 'order-1' : 'order-0'}`}
                  >
                    <ComponentsAvatar
                      src={m.ava_url}
                      alt={m.nick}
                      classWidth="32"
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="chat-input-block bg-pure-white d-flex px-4 py-3 rounded-bottom-3 bottom-0">
          <input
            className="chat-main-input px-3 py-2 border-0 rounded-pill bg-gray-article w-100"
            type="text"
            placeholder="輸入訊息⋯⋯"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                // setMessages([...messages, e.target.value])
                // ws.send(e.target.value)
                // NOTE 傳送時自動轉buffer
                ws.send(
                  JSON.stringify({
                    sender_id: userID,
                    content: e.target.value,
                    nick: userNick,
                    ava_url: userUrl,
                  })
                )
                handleCreateMsg({
                  sender_id: userID,
                  content: e.target.value,
                })
                // console.log('--------', { userID, newMsg })
                e.target.value = ''
              }
            }}
          />
        </div>
      </div>
    </>
  )
}
