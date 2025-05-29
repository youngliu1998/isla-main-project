'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '../../../hook/use-auth'
import useSWR from 'swr'
import { UseDirectToLogin } from '../_hooks/useDirectToLogin'
import { toast } from 'react-toastify'
import ConfirmModal from './confirmModal'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function ComponentsButtonFollowing({
  followID = 0,
  followMutate,
}) {
  const { user } = useAuth()
  const userID = user.id
  const isAuth = user.id !== 0
  const handleDirectLogin = UseDirectToLogin({ isAuth })

  const { data, isLoading, error, mutate } = useSWR(
    `http://localhost:3005/api/forum/follow?userID=${userID}&followID=${followID}`,
    fetcher
  )
  const isFollow = data?.data
  const method = isFollow ? 'DELETE' : 'POST'

  const handleFollow = async (method) => {
    // console.log({ method, isFollow })
    const res = await fetch(`http://localhost:3005/api/forum/follow`, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ followID, userID }),
    })
    if (!res.ok) toast('請稍後再試')
    const result = await res.json()
    if (result.data) {
      toast(result.message)
    }
    mutate()
    followMutate()
  }
  if (isLoading || error || data.status !== 'success') return
  return (
    <>
      {/* <button
        className={`button-triggerable py-1 flex-grow-1 color-isla-white rounded-3 text-nowrap fw-medium ${isFollow ? 'active' : 'default'} btn-follow`}
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
          handleDirectLogin('')

          console.log(method)
          handleFollow(method)
        }}
      >
        {isFollow ? '已追蹤' : '追蹤'}
      </button> */}
      <button
        className={`button-triggerable py-1 flex-grow-1 color-isla-white rounded-3 text-nowrap fw-medium fs14 ${isFollow ? 'active' : 'default'} btn-follow`}
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#confirmModal"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
      >
        {isFollow ? '追蹤中' : '追蹤'}
      </button>
      <ConfirmModal
        title="確認取消追蹤？"
        content="您可隨時重新追蹤對方"
        confirm="取消追蹤"
        cancel="繼續追蹤"
        handleModalAction={handleFollow}
        param={method}
      />
    </>
  )
}
