'use client'

import ComponentsSearchBar from './_components/search-bar'
import useSWR from 'swr'
import { useEffect, useState, useRef } from 'react'
import EditPostModal from './_components/edit-post-modal'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import ComponentsPostCard from './_components/post-card'
import Componentstab from '../_components/tab'
import { useFilter } from './_context/filterContext'

const fetcher = (url) =>
  fetch(url, {
    // method: 'GET',
    // referrerPolicy: 'no-referrer-when-downgrade',
  }).then((res) => res.json())

export default function ForumPage(props) {
  const router = useRouter()
  // 取得userID
  const userID = 6
  const [tabURL, setTabURL] = useState('')
  const { keyword, productCate, postCate } = useFilter()

  // 分類篩選
  const postCateItems = ['分享', '請益', '討論', '試色']
  const productCateItems = [
    '臉頰底妝',
    '眼部彩妝',
    '唇部彩妝',
    '臉頰彩妝',
    '眉部彩妝',
    '睫毛彩妝',
    '臉部保養',
  ]

  // const keyword = useSearchParams().get('keyword')
  // const productCate = useSearchParams().get('productCate')
  // const postCate = useSearchParams().get('postCate')
  // console.log({ keyword, productCate, postCate })
  // console.log(useSearchParams().toString())

  const params = useSearchParams().toString() //本來唯獨，複製一份
  // console.log(params.toString())

  // <<<<<<<<
  // useEffect(() => {
  //   const currentParams = new URLSearchParams(params)
  //   currentParams.append('tab', tab)
  //   console.log(currentParams.toString())
  //   setTabURL(`http://localhost:3000/forum?${currentParams.toString()}`)
  // }, [params, tab])
  // <<<<<<<<
  const handleTabChange = (newTab) => {
    const currentParams = new URLSearchParams(params)
    currentParams.append('tab', newTab)
    router.push(`http://localhost:3000/forum?${currentParams.toString()}`)
  }

  const handleCateChange = (keyword, productCate, postCate) => {
    // NOTE 本來拆開在button事件中，使用button點擊事件作為跳轉判端依據，需要寫重複兩次程式，每次也會是新params因此product和post無法相互繼承
    const params = new URLSearchParams() //FIXME
    if (keyword.length) {
      params.append('keyword', keyword)
    }
    if (productCate.length) {
      params.append('productCate', productCate.join('+'))
    }
    if (postCate.length) {
      params.append('postCate', postCate.join('+'))
    }
    console.log('--------params: ' + params)
    router.push(`http://localhost:3000/forum?${params.toString()}`)
  }

  const postsAPI = params
    ? `http://localhost:3005/api/forum/posts/home?${params}`
    : `http://localhost:3005/api/forum/posts/home`
  const { data, isLoading, error, mutate } = useSWR(postsAPI, fetcher)

  // if (error) {
  //   console.log(error)
  //   return (
  //     <main className="main col col-10 d-flex flex-column align-items-center">
  //       連線錯誤
  //     </main>
  //   )
  // }
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
  // if (isLoading) {
  //   return (
  //     <>
  //       <main className="main col col-10 col-xl-8 d-flex flex-column align-items-center">
  //         <div className="posts d-flex flex-column gap-3 w-100">
  //           <div className="tabs d-flex">
  //             <Componentstab
  //               items={['熱門', '最新']}
  //               height={'40'}
  //               setCate={setTab}
  //               mutate={mutate}
  //             />

  //             <button
  //               className="switcher button-clear dropdown-toggle d-flex d-xl-none justify-content-center align-items-center gap-1 bg-hover sub-text-color"
  //               type="button"
  //               data-bs-toggle="dropdown"
  //               aria-expanded="false"
  //             >
  //               分類
  //             </button>
  //             <div className="dropdown-menu px-3 py-2 shadow-lg border-0">
  //               <div>
  //                 <div className="dropdown-label py-1 fs12 sub-text-color">
  //                   商品類型
  //                 </div>
  //                 <button className="dropdown-item-forum px-2 py-1 rounded-3">
  //                   唇膏
  //                 </button>
  //                 <button className="dropdown-item-forum rounded-3">
  //                   唇膏
  //                 </button>
  //                 <button className="dropdown-item-forum rounded-3">
  //                   唇膏
  //                 </button>
  //               </div>
  //               <div>
  //                 <div className="dropdown-label py-1 fs12 sub-text-color">
  //                   文章類型
  //                 </div>
  //                 <button className="dropdown-item-forum px-2 py-1 rounded-3 button-clear">
  //                   唇膏
  //                 </button>
  //                 <button className="dropdown-item-forum rounded-3 button-clear">
  //                   唇膏
  //                 </button>
  //                 <button className="dropdown-item-forum rounded-3 button-clear">
  //                   唇膏
  //                 </button>
  //                 <button className="dropdown-item-forum rounded-3 button-clear">
  //                   唇膏
  //                 </button>
  //               </div>
  //             </div>
  //           </div>
  //           isLoading
  //         </div>
  //       </main>
  //       <ComponentsSearchBar
  //         setKeyword={setKeyword}
  //         setTab={setTab}
  //         setProductCate={setProductCate}
  //         setPostCate={setPostCate}
  //         postCateItems={postCateItems}
  //         productCateItems={productCateItems}
  //       />
  //     </>
  //   )
  // }
  // if (posts?.length === 0) {
  //   return (
  //     <>
  //       <main className="main col col-10 d-flex flex-column align-items-center">
  //         <div className="posts d-flex flex-column gap-3 w-100">
  //           <div className="tabs d-flex">
  //             <Componentstab />
  //             <button
  //               className="switcher button-clear dropdown-toggle d-flex d-xl-none justify-content-center align-items-center gap-1 bg-hover sub-text-color"
  //               type="button"
  //               data-bs-toggle="dropdown"
  //               aria-expanded="false"
  //             >
  //               分類
  //             </button>
  //             <div className="dropdown-menu px-3 py-2 shadow-lg border-0">
  //               <div>
  //                 <div className="dropdown-label py-1 fs12 sub-text-color">
  //                   商品類型
  //                 </div>
  //                 <button className="dropdown-item-forum px-2 py-1 rounded-3">
  //                   唇膏
  //                 </button>
  //                 <button className="dropdown-item-forum rounded-3">
  //                   唇膏
  //                 </button>
  //                 <button className="dropdown-item-forum rounded-3">
  //                   唇膏
  //                 </button>
  //               </div>
  //               <div>
  //                 <div className="dropdown-label py-1 fs12 sub-text-color">
  //                   文章類型
  //                 </div>
  //                 <button className="dropdown-item-forum px-2 py-1 rounded-3 button-clear">
  //                   唇膏
  //                 </button>
  //                 <button className="dropdown-item-forum rounded-3 button-clear">
  //                   唇膏
  //                 </button>
  //                 <button className="dropdown-item-forum rounded-3 button-clear">
  //                   唇膏
  //                 </button>
  //                 <button className="dropdown-item-forum rounded-3 button-clear">
  //                   唇膏
  //                 </button>
  //               </div>
  //             </div>
  //           </div>
  //           查無文章，請稍後再試
  //         </div>
  //       </main>
  //       <ComponentsSearchBar />
  //     </>
  //   )
  // }

  return (
    <>
      <main className="main col col-10 col-xl-8 d-flex flex-column align-items-center">
        <div className="posts d-flex flex-column gap-3 w-100">
          <div className="tabs d-flex">
            <Componentstab
              items={['熱門', '最新']}
              height={'40'}
              // setTab={setTab}
              mutate={mutate}
              handleRouterPush={handleTabChange}
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
        // setKeyword={setKeyword}
        // setTab={setTab}
        // setProductCate={setProductCate}
        // setPostCate={setPostCate}
        postCateItems={postCateItems}
        productCateItems={productCateItems}
        handleRouterPush={handleCateChange}
      />
      <EditPostModal />
    </>
  )
}
