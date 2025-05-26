'use client'

import React, { useState, useEffect } from 'react'

export default function ComponentsSubCommentToggle(props) {
  return (
    <>
      {/* <div className="comment-more d-flex flex-column gap-3">  */}
      <button className="sub-comment-toggle d-flex text-decoration-none fs14 fw-medium sub-text-color button-clear">
        <span className="fw-light d-inline">——</span>
        查看更多留言
      </button>
      {/* </div>   */}
    </>
  )
}
