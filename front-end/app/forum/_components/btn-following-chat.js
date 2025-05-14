'use client'

import React, { useState, useEffect } from 'react'

export default function ComponentsButtonFollowingChat(props) {
  return (
    <>
      <div className="following-button d-flex gap-2 justify-content-center w-100">
        <button className="button-triggerable active px-3 py-1 flex-grow-1 color-isla-white rounded-3 text-nowrap fw-medium">
          已追蹤
        </button>
        <button className="button-triggerable default px-3 py-1 flex-grow-1 flex-grow-lg-0 color-isla-white rounded-3 text-nowrap fw-medium">
          聊天
        </button>
      </div>
    </>
  )
}
