'use client'

import { useState, useEffect, useRef } from 'react'
import ComponentsAuthorInfo from './author-info'
import { useAuth } from '../../../hook/use-auth'
import { useFilter } from '../_context/filterContext'
import { useRouter } from 'next/navigation'
// import '/bootstrap/dist/js/bootstrap.bundle.min.js' 無法直接引入

export default function EditPostModal({
  postID = '',
  productCate = '',
  postCate = '',
  postTitle = '',
  postContent = '',
  isUpdated = false,
  mutate = () => {},
}) {
  const modalRef = useRef()
  const router = useRouter()
  const { user, isAuth } = useAuth() //NOTE
  // console.log(user)
  const userID = user.id
  const userUrl = user.ava_url
  const userNick = user.nickname
  // const [imagesList, setImagesList] = useState([])
  const { productCateItems, postCateItems } = useFilter()
  useEffect(() => {
    titleRef.current.innerText = postTitle
    contentRef.current.innerHTML = postContent
    setTitleValid(true)
    setContentValid(true)
  }, [postTitle, postContent])
  // 新增貼文
  //FIXME 等待體驗 const [isLoading, setLoading] = useState()
  // FIXME 為輸入的警告提示體驗
  const productCateRef = useRef()
  const postCateRef = useRef()
  const titleRef = useRef()
  const contentRef = useRef()

  // 圖片上傳
  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files || [])
    // console.log(files)
    // setImagesList((prev) => [...prev, ...files])
    const imageFD = new FormData()
    imageFD.append('userID', userID)
    files.forEach((f) => {
      imageFD.append('images', f)
    })

    fetch('http://localhost:3005/api/forum/posts/upload-image', {
      method: 'POST',
      body: imageFD,
    })
      .then((res) => {
        if (!res.ok) throw new Error('上傳失敗')
        return res.json() //FIXME 上傳成功的提示
      })
      .then((data) => {
        // console.log(`上傳成功-應該是含url的物件: ${data.filenames}`)
        const { filenames } = data
        const filenamesToUrl = filenames.map(
          (f) => `http://localhost:3005/images/forum/${f}`
        )

        files.forEach((f, i) => {
          const objectUrl = URL.createObjectURL(f)
          const url = filenamesToUrl[i]
          // console.log('inner', filenamesToUrl)
          // console.log(url)
          insertImage(url)
        })
      })
      .catch((err) => {
        console.log(err) //FIXME 上傳失敗的提示
      })

    e.target.value = []
  }
  // 圖片預覽
  const insertImage = (filename) => {
    const select = window.getSelection()
    let range
    // 確認輸入區域在content內
    if (
      !select ||
      select.rangeCount === 0 ||
      !contentRef.current.contains(select.anchorNode)
    ) {
      if (!modalRef.current.hasAttribute('aria-hidden')) {
        // contentRef.current.focus()
      }
      // contentRef.current.focus() //強制上傳位置為content區域
      range = document.createRange()
      range.selectNodeContents(contentRef.current)
      range.collapse(false)
    } else {
      range = select.getRangeAt(0)
    }
    // // 確認是否為新的一行
    // const isAtLineStart = (() => {
    //   const preRange = range.cloneRange()
    //   preRange.setStart(contentRef.current, 0)
    //   const fragment = preRange.cloneContents()
    //   return !fragment.textContent.trim() && fragment.childNodes.length === 0
    // })()
    // if (!isAtLineStart) {
    //   const br = document.createElement('br')
    //   range.insertNode(br)
    //   range.setStartAfter(br)
    //   range.collapse(true)
    // }
    // 新增圖片
    const img = document.createElement('img')
    const br = document.createElement('br')
    img.setAttribute('class', 'd-block w-50')
    // const br = document.createElement('br')
    // img.src = objectUrl
    img.src = filename
    img.onload = () => {
      URL.revokeObjectURL(filename)
    }
    range.insertNode(img)
    range.setStartAfter(img)
    range.insertNode(br)
    // range.insertNode(br)
    range.collapse(false)
    select.removeAllRanges()
    select.addRange(range)
    // img src: blob:...3000/970f494f-bc90-4bd7-8919-93a2af43af7f
  }
  // 提交表單
  const handleSubmit = async (e) => {
    console.log('submit')
    e.preventDefault()
    const productCate = productCateRef.current.value
    const postCate = postCateRef.current.value
    console.log({ productCate, postCate })
    const title = titleRef.current.innerHTML.trim() //QU WHY trim
    const content = contentRef.current.innerHTML.trim()
    if (title === '' || title === '<br>') {
      // QU 怎麼精簡判斷式
      console.log('請輸入標題')
      console.log(title)
      return
    } else if (content === '' || content === '<br>') {
      console.log('請輸入內容')
      return
    }

    const fd = new FormData()
    fd.append('postID', postID)
    fd.append('productCate', productCate)
    fd.append('postCate', postCate)
    fd.append('title', title) //fd長怎樣QU
    fd.append('content', content)
    fd.append('userID', userID)
    console.log(fd)

    // 建立還是更新
    if (isUpdated) {
      fetch('http://localhost:3005/api/forum/posts', {
        method: 'PUT',
        body: fd,
      })
        .then((res) => {
          if (!res.ok) throw new Error(`錯誤: ${res.status}`)
          mutate()
          return res.json()
        })
        .then((data) => {
          console.log(data)
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      fetch('http://localhost:3005/api/forum/posts', {
        method: 'POST',
        body: fd,
      })
        .then((res) => {
          if (!res.ok) throw new Error(`錯誤：${res.status}`)
          return res.json()
        })
        .then((data) => {
          console.log(data)
        })
        .catch((err) => {
          console.log(err)
          // FIXME 畫面顯示上傳錯誤提示
        })
    }

    // modalRef.current.classList.remove('show')
    // const m = Modal.getOrCreateInstance(
    //   document.querySelector('#editPostModal')
    // )
    // m.hide()
    // console.log(m)
    router.push('/forum?tab=2')
    // mutate()
  }
  // 字數
  const [titleLength, setTitleLength] = useState(0)
  const [isTitleValid, setTitleValid] = useState(false)
  const [hasTitleTouched, setHasTitleTouched] = useState(false)
  const [isContentValid, setContentValid] = useState(false)

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div
          className="modal fade"
          // id="editPostModal"
          id={isUpdated ? 'updatedPostModal' : 'editPostModal'}
          ref={modalRef}
          tabIndex={-1}
          aria-labelledby="editPostModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable modal-forum">
            <div className="modal-content bg-pure-white">
              <div className="modal-header main-color py-2">
                <h5
                  className="modal-title main-text-color fs20"
                  id="editPostModalLabel"
                >
                  建立貼文
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-info px-4 pt-2 d-flex gap-3">
                <ComponentsAuthorInfo
                  authorID={userID}
                  width="40"
                  src={userUrl}
                  alt={userNick}
                  fontSize="15"
                  color="var(--main-text-color)"
                  authorName={userNick}
                />
                <div className="selects d-flex w-auto gap-2 py-2">
                  <select
                    ref={productCateRef}
                    className="form-select form-select-sm w-auto rounded-pill"
                    aria-label="Small select example"
                    defaultValue={isUpdated ? productCate : ''}
                  >
                    {/* FIXME 產品類型不可點選、警告 */}
                    <option disabled>產品類型</option>
                    {productCateItems.map((v, i) => {
                      return (
                        <option key={i} value={i + 1}>
                          {v}
                        </option>
                      )
                    })}
                  </select>
                  <select
                    ref={postCateRef}
                    className="form-select form-select-sm w-auto rounded-pill"
                    aria-label="Small select example"
                    defaultValue={isUpdated ? postCate : ''}
                  >
                    <option disabled>文章類型</option>
                    {postCateItems.map((v, i) => {
                      return (
                        <option key={i} value={i + 1}>
                          {v}
                        </option>
                      )
                    })}
                  </select>
                </div>
              </div>
              <div className="modal-body d-flex flex-column w-100">
                <div className="d-flex align-items-center px-4 py-2">
                  <div
                    // QU 避免標題換行、第一行沒有div包裹
                    ref={titleRef}
                    className="edit-title main-text-color fs20 me-auto text-wrap w-100"
                    contentEditable
                    data-placeholder="輸入文章標題"
                    onInput={(e) => {
                      // 沒有trim的話會剩下，可能殘留<br>
                      const titleLength = e.target.innerText.trim().length
                      setTitleLength(titleLength)
                      setHasTitleTouched(true)
                      titleLength <= 50 && titleLength != 0
                        ? setTitleValid(true)
                        : setTitleValid(false)
                    }}
                    onPaste={(e) => {
                      e.preventDefault()
                      const text = e.clipboardData.getData('text/plain') //防止複製貼上鬼東西
                      document.execCommand('insertText', false, text)
                    }}
                  >
                    {/* {isUpdated && postTitle} */}
                  </div>
                </div>
                <div
                  className={`fs14 sub-text-color px-4 ${!isTitleValid && hasTitleTouched ? 'titleError' : ''} `}
                  error-persudo={
                    titleLength > 50
                      ? '標題已超過字數上限'
                      : titleLength < 1
                        ? `請輸入標題`
                        : ''
                  }
                >{`(${titleLength}/50)`}</div>
                <div
                  ref={contentRef}
                  className="edit-area px-4 py-2 flex-grow-1 main-text-color"
                  contentEditable
                  data-placeholder="分享你的美妝新發現✨"
                  onInput={(e) => {
                    const contentlength = e.target.innerText.trim().length
                    if (contentlength > 0 && contentlength <= 50) {
                      setContentValid(true)
                    }
                  }}
                  onPaste={(e) => {
                    // 防止xss攻擊
                    e.preventDefault()
                    const text = e.clipboardData.getData('text/plain')
                    document.execCommand('insertText', false, text)
                  }}
                >
                  {/* {isUpdated && '123'} */}
                </div>
              </div>
              <div className="modal-footer px-4 py-2">
                {/* NOTE */}
                <input
                  name="images"
                  type="file"
                  id="uploadImage"
                  accept="image/*"
                  multiple
                  hidden
                  onChange={(e) => {
                    handleFilesChange(e)
                  }}
                />
                <span></span>
                <label
                  htmlFor="uploadImage"
                  className="mx-0 my-0 me-auto h-100"
                >
                  <div
                    role="button"
                    className="d-flex align-items-center gap-2"
                  >
                    <i className="bi bi-image fs32 sub-text-color"></i>
                    <span className="sub-text-color">上傳多張圖片</span>
                  </div>
                </label>
                <button
                  type="button"
                  className="sub-text-color button-clear bounce"
                  data-bs-dismiss="modal"
                >
                  取消
                </button>
                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  className={`px-4 py-2 rounded-3 border-0 bounce ${isTitleValid && isContentValid ? 'bg-main color-isla-white' : 'bg-hover-gray sub-text-color border-0'}`}
                  onClick={() => {
                    setHasTitleTouched(false)
                    // FIXME modal剛出現 按按鈕時出現警示
                  }}
                >
                  發布
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}
