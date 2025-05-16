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
  const [tab, setTab] = useState('')
  const [keyword, setKeyword] = useState('')
  const [productCate, setProductCate] = useState('')
  const [postCate, setPostCate] = useState('')

  // 分類篩選
  const postCateItems = ['分享', '請益', '討論', '試色']
  const productCateItems = ['唇膏', '底妝']

  let tabParam = tab === 0 ? 'popular' : tab === 1 ? 'new' : ''
  let keywordParam = keyword ?? ''
  let productParam = productCate ?? ''
  let postParam = postCate ?? ''
  // const allParam = tabParam
  //   console.log(
  //     `http://localhost:3005/api/forum/posts/home?${tabParam}${keywordParam}${productParam}${postParam}`
  //   )
  // }
  //
  const params = new URLSearchParams()
  params.append('keyword', keywordParam)
  params.append('tab', tabParam)
  params.append('product', productParam)
  params.append('post', postParam)
  const paramsString = params.toString()

  // fetch每篇文章的資料
  const postsAPI = `http://localhost:3005/api/forum/posts/home`
  console.log(postsAPI)
  const { data, isLoading, error, mutate } = useSWR(postsAPI, fetcher)

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
          isLoading
        </main>
        <ComponentsSearchBar />
      </>
    )
  }
  if (posts?.length === 0) {
    return (
      <>
        <main className="main col col-10 d-flex flex-column align-items-center">
          無文章資料
        </main>
        <ComponentsSearchBar />
      </>
    )
  }
  console.log(posts)

  // FIXME 這邊要重新fetch資料庫做更新比較好，還是在前端假
  // // https://localhost:3000/forum?keyword=粉刺&tab=0&pdCate=唇膏&poCate=討論
  // let tabParam
  // let pdCate
  // let poCate
  // console.log(cate)
  // if (cate.length !== 0) {
  //   posts = posts.filter((post) => post.cate_name === cate)
  //   if (cate === 1) {
  //     posts = posts.sort(
  //       (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
  //     )
  //     tabParam = 'tab=1'
  //   }
  //   router.replace({})
  // }

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
              className="switcher button-clear dropdown-toggle d-flex d-xl-none justify-content-center align-items-center gap-1 text-decoration-none sub-text-color"
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
                <button className="dropdown-item-forum rounded-3">唇膏</button>
                <button className="dropdown-item-forum rounded-3">唇膏</button>
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
