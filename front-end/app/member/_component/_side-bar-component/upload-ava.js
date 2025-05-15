'use client'

import React, { useState, useEffect } from 'react'
import './_style/user-upload-ava.css'

export default function UploadAva({
  openAvatar = false,
  setOpenAvatar = () => {},
}) {
  const switcher = openAvatar ? 'd-block' : 'd-none' // show or close panel
  const handleSubmit = (e) => {
    e.preventDefault
  }
  return (
    <>
      <div
        className={'position-absolute top-0 left-0 w-100 z-3' + ' ' + switcher}
      >
        <div className="upload-panel">
          <div className="ava-demo"></div>
          <form
            action=""
            encType="multipart/form-data"
            className="d-flex flex-column gap-2"
            onSubmit={(e) => {
              handleSubmit(e)
            }}
          >
            <label htmlFor="avatar">請上傳大頭照</label>
            <input type="file" name="avatar" />
          </form>
          <button
            className="user-avatar-cls-btn"
            onClick={() => {
              setOpenAvatar(!openAvatar)
            }}
          >
            關閉
          </button>
        </div>
      </div>
    </>
  )
}
