'use client'

import { useParams, useRouter } from 'next/navigation'
import React, { useState, useEffect, useRef } from 'react'
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

  const { data, isLoading, error } = useSWR(
    `http://localhost:3005/api/forum/chat?userID=${userID}&roomID=${roomID}`,
    fetcher
  )
  let roomDetail = data?.data?.[0] || {}
  //FIXME 需要更好的方法處理聊天室名稱
  // roomDetail.map((detail)=>(...detail, ))
  useEffect(() => {
    if (data?.data?.[0]?.msg) {
      // console.log(data?.data?.[0].msg)
      setMessages(JSON.parse(data?.data?.[0].msg))
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

  // console.log(messages) //sender_id, content, nick, ava_url

  if (error) {
    return <>連線失敗，請再試一次</>
  }
  if (isLoading || !roomDetail) {
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
      <div className="chat-main d-flex flex-column ms-3 h-100 bg-pure-white rounded-3 bg-pure-white shadow-forum">
        <div className="chat-main-header bg-pure-white d-flex gap-2 px-3 py-2 align-items-center shadow-sm fs20 fw-bold rounded-top-3">
          <button
            className="chat-main-return d-block d-md-none rounded-circle border-0 p-2"
            onClick={() => {
              router.push('/forum/chat')
            }}
          >
            <i className="bi bi-arrow-left d-flex"></i>
          </button>
          <div className="d-flex">
            {roomDetail.avaUrls?.split(',').map((ava, i) => {
              return (
                <div className="chat-avas" key={i}>
                  <ComponentsAvatar src={ava} alt={'成員'} classWidth="36" />
                </div>
              )
            })}
          </div>
          <div className="ms-2 text-truncate">{roomDetail.nicks}</div>
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
        <div className="chat-input-block bg-pure-white d-flex gap-1 px-4 py-3 rounded-bottom-3 bottom-0">
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
          <button className="px-2 button-clear rounded-circle bg-hovering-gray">
            <i className="bi bi-image fs20"></i>
          </button>
          <button className="px-2 button-clear rounded-circle bg-hovering-gray">
            <i className="bi bi-send-fill fs20" />
          </button>
        </div>
      </div>
    </>
  )
}
