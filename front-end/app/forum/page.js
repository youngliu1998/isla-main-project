'use client'

import ComponentsSearchBar from './_components/search-bar'
import useSWR from 'swr'
import { useEffect, useState, useRef } from 'react'
import EditPostModal from './_components/edit-post-modal'
import { useRouter } from 'next/navigation'
import ComponentsPostCard from './_components/post-card'
import Componentstab from '../_components/tab'

const fetcher = (url) =>
  fetch(url, {
    // method: 'GET',
    // referrerPolicy: 'no-referrer-when-downgrade',
  }).then((res) => res.json())

export default function ForumPage(props) {
  // 導向
  const router = useRouter()

  // 取得userID
  const userID = 1
  const [tab, setTab] = useState(null)
  // const [keyword, setKeyword] = useState(null)
  // const [productCate, setProductCate] = useState(null)
  // const [postCate, setPostCate] = useState(null)

  // 分類篩選
  const postCateItems = ['分享', '請益', '討論', '試色']
  const productCateItems = ['唇膏', '底妝']

  // paramsString = '' //FIXME 要去按鈕那邊將重複點選設定清除params
  useEffect(() => {
    // fetch每篇文章的資料
    const postsAPI = paramsString
      ? `http://localhost:3005/api/forum/posts/home?${paramsString}`
      : `http://localhost:3005/api/forum/posts/home`

    const { data, isLoading, error, mutate } = useSWR(postsAPI, fetcher)
  }, [searchParams])

  if (error) {
    console.log(error)
    return (
      <main className="main col col-10 d-flex flex-column align-items-center">
        連線錯誤
      </main>
    )
  }
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

  if (isLoading) {
    return (
      <>
        <main className="main col col-10 col-xl-8 d-flex flex-column align-items-center">
          <div className="posts d-flex flex-column gap-3 w-100">
            <div className="tabs d-flex">
              <Componentstab
                items={['熱門', '最新']}
                height={'40'}
                setCate={setTab}
                mutate={mutate}
              />

              <button
                className="switcher button-clear dropdown-toggle d-flex d-xl-none justify-content-center align-items-center gap-1 bg-hover sub-text-color"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                分類
              </button>
              <div className="dropdown-menu px-3 py-2 shadow-lg border-0">
                <div>
                  <div className="dropdown-label py-1 fs12 sub-text-color">
                    商品類型
                  </div>
                  <button className="dropdown-item-forum px-2 py-1 rounded-3">
                    唇膏
                  </button>
                  <button className="dropdown-item-forum rounded-3">
                    唇膏
                  </button>
                  <button className="dropdown-item-forum rounded-3">
                    唇膏
                  </button>
                </div>
                <div>
                  <div className="dropdown-label py-1 fs12 sub-text-color">
                    文章類型
                  </div>
                  <button className="dropdown-item-forum px-2 py-1 rounded-3 button-clear">
                    唇膏
                  </button>
                  <button className="dropdown-item-forum rounded-3 button-clear">
                    唇膏
                  </button>
                  <button className="dropdown-item-forum rounded-3 button-clear">
                    唇膏
                  </button>
                  <button className="dropdown-item-forum rounded-3 button-clear">
                    唇膏
                  </button>
                </div>
              </div>
            </div>
            isLoading
          </div>
        </main>
        <ComponentsSearchBar
          setKeyword={setKeyword}
          setTab={setTab}
          setProductCate={setProductCate}
          setPostCate={setPostCate}
          postCateItems={postCateItems}
          productCateItems={productCateItems}
        />
      </>
    )
  }
  if (posts?.length === 0) {
    return (
      <>
        <main className="main col col-10 d-flex flex-column align-items-center">
          <div className="posts d-flex flex-column gap-3 w-100">
            <div className="tabs d-flex">
              <Componentstab />
              <button
                className="switcher button-clear dropdown-toggle d-flex d-xl-none justify-content-center align-items-center gap-1 bg-hover sub-text-color"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                分類
              </button>
              <div className="dropdown-menu px-3 py-2 shadow-lg border-0">
                <div>
                  <div className="dropdown-label py-1 fs12 sub-text-color">
                    商品類型
                  </div>
                  <button className="dropdown-item-forum px-2 py-1 rounded-3">
                    唇膏
                  </button>
                  <button className="dropdown-item-forum rounded-3">
                    唇膏
                  </button>
                  <button className="dropdown-item-forum rounded-3">
                    唇膏
                  </button>
                </div>
                <div>
                  <div className="dropdown-label py-1 fs12 sub-text-color">
                    文章類型
                  </div>
                  <button className="dropdown-item-forum px-2 py-1 rounded-3 button-clear">
                    唇膏
                  </button>
                  <button className="dropdown-item-forum rounded-3 button-clear">
                    唇膏
                  </button>
                  <button className="dropdown-item-forum rounded-3 button-clear">
                    唇膏
                  </button>
                  <button className="dropdown-item-forum rounded-3 button-clear">
                    唇膏
                  </button>
                </div>
              </div>
            </div>
            查無文章，請稍後再試
          </div>
        </main>
        <ComponentsSearchBar />
      </>
    )
  }

  return (
    <>
      <main className="main col col-10 col-xl-8 d-flex flex-column align-items-center">
        <div className="posts d-flex flex-column gap-3 w-100">
          <div className="tabs d-flex">
            <Componentstab
              items={['熱門', '最新']}
              height={'40'}
              setCate={setTab}
              mutate={mutate}
            />

            <button
              className="switcher button-clear dropdown-toggle d-flex d-xl-none justify-content-center align-items-center gap-1 bg-hover sub-text-color"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              分類
            </button>
            <div className="dropdown-menu px-3 py-2 shadow-lg border-0 main-text-color">
              <div className="pb-2">
                <div className="dropdown-label py-1 fs12 sub-text-color">
                  商品類型
                </div>
                <button className="dropdown-item-forum px-2 py-1 rounded-pill button-clear">
                  唇膏
                </button>
                <button className="dropdown-item-forum px-2 py-1 rounded-pill button-clear">
                  底妝
                </button>
                <button className="dropdown-item-forum px-2 py-1 rounded-pill button-clear">
                  眼影
                </button>
              </div>
              <div className="pb-2">
                <div className="dropdown-label py-1 fs12 sub-text-color">
                  文章類型
                </div>
                <button className="dropdown-item-forum px-2 py-1 px-2 py-1 rounded-pill button-clear">
                  分享
                </button>
                <button className="dropdown-item-forum px-2 py-1 rounded-pill button-clear">
                  請益
                </button>
                <button className="dropdown-item-forum px-2 py-1 rounded-pill button-clear">
                  討論
                </button>
                <button className="dropdown-item-forum px-2 py-1 rounded-pill button-clear">
                  試色
                </button>
              </div>
            </div>
          </div>
          {posts?.map((post) => {
            return (
              <ComponentsPostCard
                key={post.id}
                postID={post.id}
                postTitle={post.title}
                postCateName={post.cate_name}
                postContent={post.content}
                authorID={post.user_id}
                width="21"
                src={`/images/forum/320.webp`}
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
        setKeyword={setKeyword}
        setTab={setTab}
        setProductCate={setProductCate}
        setPostCate={setPostCate}
        postCateItems={postCateItems}
        productCateItems={productCateItems}
      />
      <EditPostModal />
    </>
  )
}
