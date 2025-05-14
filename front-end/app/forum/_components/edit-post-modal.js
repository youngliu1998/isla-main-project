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
  const formRef = useRef()
  const handleSubmit = async (e) => {
    e.preventDefault()
    // 無輸入標題 -> 請輸入標題
    // 標題超過50字 -> 標題請小於50字、發布按鈕失效
    // 無輸入內容 -> 請輸入貼文內容
    // 內容超過 1000字？ -> 發布按鈕失效

    const formData = new FormData(formRef.current)
    await fetch('http://localhost:3005/api/forum/posts', {
      method: 'POST',
      body: formData,
    })
  }
  // 字數
  const [titleLength, setTitleLength] = useState(0)
  const [isTitleValid, setTitleValid] = useState(true)
  const [isTitleFill, setTitleFill] = useState(false)
  const [isContentValid, setContentValid] = useState(false)

  return (
    <>
      <form ref={formRef} onSubmit={handleSubmit}>
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
                  新增貼文
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
                    className="edit-title main-text-color fs20 me-auto text-wrap w-100"
                    contentEditable
                    data-placeholder="輸入文章標題"
                    onInput={(e) => {
                      // 沒有trim的話會剩下，可能殘留<br>
                      const titleLength = e.target.innerText.trim().length
                      setTitleLength(titleLength)
                      if (titleLength > 50) {
                        setTitleValid(false)
                      } else if (titleLength <= 50) {
                        setTitleValid(true)
                      }
                    }}
                    onPaste={(e) => {
                      e.preventDefault()
                      const text = e.clipboardData.getData('text/plain')
                      document.execCommand('insertText', false, text)
                    }}
                  ></div>
                </div>
                <div
                  className={`fs14 sub-text-color px-4 ${isTitleValid ? '' : 'titleError'}`}
                  error-persudo="已超過標題字數上限"
                >{`(${titleLength}/50)`}</div>
                <div
                  className="edit-area px-4 py-2 main-text-color"
                  contentEditable
                  data-placeholder="分享你的美妝新發現✨"
                  onInput={(e) => {
                    const contentlength = e.target.innerText.trim().length
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
                  className="sub-text-color"
                  data-bs-dismiss="modal"
                >
                  取消
                </button>
                <button
                  type="button-bounce"
                  className={`px-4 py-2 color-isla-white rounded-3 ${isTitleValid && isContentValid && isTitleFill ? 'bg-main' : 'button-submit-disable'}`}
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
