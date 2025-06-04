'use client'

import Image from 'next/image'
import Link from 'next/link'
// ==== route ====
import { USER_AVA_URL } from '@/_route/img-url'
// ==== css ====
import '../_style/forum.css' // 卡片css

export default function ForumBar({ forum = {} }) {
  return (
    <>
      {/* ==== card ==== */}
      <div className="header-search-item for-forum">
        <div className="d-flex flex-column justify-content-between gap-2">
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
          <div className="search-item-title">
            <Link href="">{forum.title.slice(0, 10)}</Link>
          </div>
        </div>
        {/* ==== Content ==== */}
        <div
          className="post-content text-truncate fs14 sub-text-color px-4"
          dangerouslySetInnerHTML={{
            __html: forum.content?.replace('<br/>', ' ').slice(0, 80) || '',
          }}
        />
      </div>
    </>
  )
}
