'use client'

import React, { useState, useEffect, useRef } from 'react'
import ComponentsAuthorInfo from './author-info'

export default function EditPostModal(props) {
  const modalRef = useRef()
  const userID = 1
  const userNick = 'Mandy'
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js').then((bootstrap) => {
      document
        .querySelectorAll('[data-bs-toggle="tooltip"]')
        .forEach((el) => new bootstrap.Tooltip(el))

      const modalEl = modalRef.current
      if (modalEl) {
        const modal = new bootstrap.Modal(modalEl, {
          backdrop: true,
          keyboard: true,
        })
        modal.show()
      }
    })
  }, [])
  //
  // 新增貼文
  //FIXME 等待體驗 const [isLoading, setLoading] = useState()
  // FIXME 為輸入的警告提示體驗
  const titleRef = useRef()
  const contentRef = useRef()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const title = titleRef.current.innerHTML.trim() //QU WHY trim
    const content = contentRef.current.innerHTML.trim()
    if (title === '' || title === '<br>') {
      // QU 怎麼精簡判斷式
      console.log('請輸入標題')
      console.log(title)
      return
    } else if (content === '' || content === '<br>') {
      console.log('未輸入標題')
      return
    }

    try {
      const fd = new FormData()
      const newFd = fd.append('title', title) //fd長怎樣QU
      fd.append('content', content)
      console.log(fd.content)
      const res = await fetch('http://localhost:3005/api/forum/posts', {
        method: 'POST',
        body: fd,
      })
      const result = await res.json()
      if (result.status === 'success') {
        console.log('送出成功')
        // FIXME 關閉modal、導向主頁、出現下方小提示框
      } else {
        //發布失敗
      }
    } catch (err) {
      console.log(err)
      // FIXME 畫面顯示上傳錯誤提示
    }
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
          id="editPostModal"
          ref={modalRef}
          tabIndex={-1}
          aria-labelledby="editPostModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable modal-forum">
            <div className="modal-content bg-pure-white">
              <div className="modal-header main-color">
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
              <div className="modal-author px-4 pt-2">
                <ComponentsAuthorInfo
                  authorID={userID}
                  width="40"
                  src="/images/forum/320.webp"
                  alt={userNick}
                  fontSize="15"
                  color="var(--main-text-color)"
                  authorName={userNick}
                />
              </div>
              <div className="modal-body w-100">
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
                      const text = e.clipboardData.getData('text/plain')
                      document.execCommand('insertText', false, text)
                    }}
                  ></div>
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
                  className="edit-area px-4 py-2 main-text-color"
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
                ></div>
              </div>
              <div className="modal-footer px-4 py-2">
                <input name="images" type="file" id="uploadImage" hidden />
                <label
                  htmlFor="uploadImage"
                  className="mx-0 my-0 me-auto h-100"
                >
                  <div role="button">
                    <i className="bi bi-image fs32 sub-text-color"></i>
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
                  type="button-bounce"
                  className={`px-4 py-2 rounded-3 border-0 bounce ${isTitleValid && isContentValid ? 'bg-main color-isla-white' : 'bg-hover-gray sub-text-color border-0'}`}
                  onClick={() => {
                    setHasTitleTouched(false)
                    console.log(hasTitleTouched)
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
