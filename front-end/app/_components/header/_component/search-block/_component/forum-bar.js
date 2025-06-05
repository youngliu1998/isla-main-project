'use client'

import Image from 'next/image'
import Link from 'next/link'
// ==== route ====
import { USER_AVA_URL } from '@/_route/img-url'
// ==== css ====
import '../_style/forum.css' // 卡片css

export default function ForumBar({ forum = {} }) {
  console.log(forum.content)
  return (
    <>
      {/* ==== card ==== */}
      <div className="header-search-item for-forum d-flex flex-column rounded-3 shadow">
        <div className="d-flex flex-column justify-content-between gap-2 w-100">
          {/* ==== auth-info ==== */}
          <div className="d-flex gap-2">
            <div className="search-item-img rounded-pill overflow-hidden">
              <Image
                src={USER_AVA_URL + forum.ava_img}
                alt="item"
                width={25}
                height={25}
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="search-item-content">{forum.nickname}</div>
          </div>
          {/* ==== title ==== */}
          <div className="search-item-title w-100">
            <Link
              className="d-block w-100 text-truncate main-text-color"
              href=""
            >
              {forum.title.slice(0, 100)}
            </Link>
          </div>
        </div>
        {/* ==== Content ==== */}
        {/* <div
          className="post-content text-truncate fs14 px-4 w-100"
          dangerouslySetInnerHTML={{
            __html:
              forum.content
                ?.replace(/<img\b[^>]*>/g, '')
                .replace('<br/>', ' ')
                .slice(0, 100) || '',
          }}
        /> */}
      </div>
    </>
  )
}
