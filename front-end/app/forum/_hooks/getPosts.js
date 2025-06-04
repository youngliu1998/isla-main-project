'use client'

import React, { useState, useEffect } from 'react'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function GetPosts(params) {
  const postsAPI = params
    ? `http://localhost:3005/api/forum/posts/home?${params}`
    : `http://localhost:3005/api/forum/posts/home`
  const { data, isLoading, error, mutate } = useSWR(postsAPI, fetcher)

  //   console.log(postsAPI)

  // 新增 minimum loading 狀態
  const [showLoading, setShowLoading] = useState(true)
  useEffect(() => {
    if (!isLoading) {
      // 至少顯示 600ms
      const timer = setTimeout(() => setShowLoading(false), 400)
      return () => clearTimeout(timer)
    } else {
      setShowLoading(true)
    }
  }, [isLoading])

  // 整理posts內的liked_user_ids和saved_user_ids
  let posts = data?.data
  if (Array.isArray(posts)) {
    posts = posts.map((post) => {
      return {
        ...post,
        liked_user_ids: post.liked_user_ids
          ? post.liked_user_ids.split(',').map(Number)
          : [],
        saved_user_ids: post.saved_user_ids
          ? post.saved_user_ids.split(',').map(Number)
          : [],
      }
    })
  }

  return { posts, showLoading, error, mutate }
}
