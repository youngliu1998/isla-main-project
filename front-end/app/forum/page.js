'use client'

import ComponentsSearchBar from './_components/search-bar'
import useSWR from 'swr'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import ComponentsPostCard from './_components/post-card'
import Componentstab from '../_components/tab'
import ComponentsSearchButton from './_components/search-button'
import { useAuth } from '../../hook/use-auth'
import { useFilter } from './_context/filterContext'
import EditPostModal from './_components/edit-post-modal'
import PostLoader from './_components/post-loader'
// import dynamic from 'next/dynamic'
// const PostLoader = dynamic(() => import('./_components/post-loader'), {
//   ssr: false,
// })

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function ForumPage() {
  const router = useRouter()
  const { user } = useAuth()
  const userID = user.id
  const [tabParams, setTabParams] = useState(new URLSearchParams())
  const [asideParams, setAsideParams] = useState(new URLSearchParams())
  const { productCateItems, postCateItems } = useFilter()

  const handleTabChange = (tabNumber) => {
    const params = new URLSearchParams()
    params.append('tab', tabNumber)
    setTabParams(params)
    const mergedParams = new URLSearchParams([
      ...asideParams.entries(),
      ...params.entries(),
    ])
    router.push(`http://localhost:3000/forum?${mergedParams.toString()}`)
  }

  const handleAsideSearchChange = (keyword, productCate, postCate) => {
    // NOTE 本來拆開在button事件中，使用button點擊事件作為跳轉判端依據，需要寫重複兩次程式，每次也會是新params因此product和post無法相互繼承
    const params = new URLSearchParams()
    if (keyword.length) {
      params.append('keyword', keyword)
    }
    if (productCate.length) {
      params.append('productCate', productCate.join(','))
    }
    if (postCate.length) {
      params.append('postCate', postCate.join(','))
    }
    setAsideParams(params)
    const mergedParams = new URLSearchParams([
      ...tabParams.entries(),
      ...params.entries(),
    ])
    // console.log(`----http://localhost:3000/forum?${mergedParams.toString()}`)
    mutate()
    router.push(`http://localhost:3000/forum?${mergedParams.toString()}`)
  }

  const params = useSearchParams()
  const postsAPI = params
    ? `http://localhost:3005/api/forum/posts/home?${params}`
    : `http://localhost:3005/api/forum/posts/home`
  const { data, isLoading, error, mutate } = useSWR(postsAPI, fetcher)

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

  return (
    <>
      <main className="main posts-section col col-10 col-xl-8 d-flex flex-column align-items-center mx-0 position-relative overflow-hidden no-scroll-bar">
        <div className="tabs d-flex position-absolute w-100 top-0">
          <Componentstab
            cates={['熱門', '最新']}
            height={'40'}
            // setTab={setTab}
            handleTabChange={handleTabChange}
          />
          <ComponentsSearchButton />
        </div>
        <div className="posts d-flex flex-column gap-3 pt-5 pb-5 mt-1 w-100 overflow-auto">
          <PostLoader />
          {error
            ? '連線錯誤'
            : showLoading
              ? Array(5)
                  .fill(1)
                  .map((v, i) => <PostLoader key={i} />)
              : posts?.length === 0
                ? '無文章資料'
                : posts?.map((post) => {
                    return (
                      <ComponentsPostCard
                        key={post.id}
                        postID={post.id}
                        postTitle={post.title}
                        postCateName={post.cate_name}
                        postContent={post.content}
                        authorID={post.user_id}
                        width="21"
                        src={post.user_img}
                        alt={post.user_name}
                        fontSize="14"
                        color="var(--sub-text)"
                        updatedAt={post.updated_at.toString()}
                        authorName={post.user_nick}
                        btnLikedActive={post.liked_user_ids.includes(userID)}
                        btnSavedActive={post.saved_user_ids.includes(userID)}
                        btnLikedCount={post.liked_user_ids.length}
                        btnSavedCount={post.saved_user_ids.length}
                        userID={userID}
                        mutate={mutate}
                      />
                    )
                  })}
        </div>
      </main>
      <ComponentsSearchBar
        // setKeyword={setKeyword}
        // setTab={setTab}
        // setProductCate={setProductCate}
        // setPostCate={setPostCate}
        postCateItems={postCateItems}
        productCateItems={productCateItems}
        handleAsideSearchChange={handleAsideSearchChange}
      />
      <EditPostModal postTitle="" postContent="" isUpdated={false} />
    </>
  )
}
