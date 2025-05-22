'use client'

import { useParams, useRouter, useSearchParams } from 'next/navigation'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import { method } from 'lodash'
import { useAuth } from '../../../hook/use-auth'
import ComponentsAddChat from './_components/add-chat'
import ComponentsAvatar from '../_components/avatar'

const fetcher = (url) => fetch(url).then((res) => res.json())
// /* TODO 換成幾小時 */

export default function ChatList() {
  const router = useRouter()
  const { user } = useAuth()
  const userID = 1
  const url = `http://localhost:3005/api/forum/chat?userID=${userID}` //QU 在這邊放userID好嗎？
  const { data, isLoading, error } = useSWR(url, fetcher)
  if (error) {
    return <>連線失敗，請再試一次</>
  }
  if (isLoading) {
    return <>載入中</>
  }
  // const rooms = data.data //room_id, user_ids, user_nick, user_ava_url, 最近一則content&created_at
  // console.log(JSON.parse(rooms[0].msg))
  const rooms = data.data.map((room) => ({
    ...room,
    msg: JSON.parse(room.msg),
  }))

  return (
    <>
      <div className="chat-list-items">
        {rooms.map((room, i) => {
          const date = new Date(room.msg.created_at)
          const dateFormat = `${date.getMonth()}月${date.getDate()}日`
          return (
            <Link
              href={`/forum/chat/${room.room_id}`}
              className="chat-list-item d-flex gap-2 p-3 rounded-3 main-text-color"
              key={i}
            >
              <div className="card-border rounded-circle">
                <ComponentsAvatar
                  src={room.msg.ava_url}
                  alt=""
                  classWidth="44"
                />
              </div>
              <div className="friend-info d-flex flex-column gap-1 w-100">
                <div className="friend-name-date d-flex justify-content-between">
                  <div className="name text-nowrap text-truncate fs16">
                    {room.msg.nick}
                  </div>
                  <div className="date text-nowrap sub-text-color fs14">
                    {dateFormat}
                  </div>
                </div>
                <div className="cotent-preview text-truncate sub-text-color fs16">
                  {room.msg.content}
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </>
  )
}
