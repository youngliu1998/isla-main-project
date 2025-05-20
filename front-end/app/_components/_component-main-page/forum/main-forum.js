'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

export default function MainForum({
  number = '',
  forumTitle = '',
  forumContent = '',
  img_url = null,
}) {
  return (
    <>
      <div className="col d-lg-block d-none py-5 px-2">
        <div className="row row-cols-2 h-100 main-forum">
          <div className="col bg-secondary">
            {img_url && <Image href={img_url} alt="most popular forum"></Image>}
          </div>
          <div className="d-flex flex-column justify-content-between p-2">
            <div className="d-flex align-items-center p-2 text-primary h2">
              {number}
            </div>
            <div className="h2 text-primary forum-title">{forumTitle}</div>
            <div className="h4 forum-content">{forumContent}</div>
            <div className="d-flex">like</div>
          </div>
        </div>
      </div>
    </>
  )
}
