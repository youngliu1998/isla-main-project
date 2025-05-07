'use client'

import ComponentsSearchBar from './_components/search-bar'
import Link from 'next/link'
import ComponentsAvatar from './_components/avatar'
import Image from 'next/image'
import ComponentsAuthorInfo from './_components/author-info'

export default function ForumPage(props) {
  return (
    <>
      <main className="main col col-10 col-xl-8 d-flex flex-column align-items-center">
        <div className="posts d-flex flex-column gap-3 w-100">
          <div className="switchers d-flex flex-row">
            <div className="switcher d-flex justify-content-center align-items-center">
              熱門
            </div>
            <div className="switcher d-flex justify-content-center align-items-center">
              最新
            </div>
            <button
              className="switcher dropdown-toggle d-flex d-xl-none justify-content-center align-items-center gap-1 text-decoration-none main-text-color"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              分類
            </button>
            <div className="dropdown-menu px-3 py-2 shadow-lg border-0">
              <div>
                <div className="dropdown-label py-1 fs12 sub-text-color">
                  商品類型
                </div>
                <button className="dropdown-item-forum px-2 py-1 rounded-3">
                  唇膏
                </button>
                <button className="dropdown-item-forum rounded-3">唇膏</button>
                <button className="dropdown-item-forum rounded-3">唇膏</button>
              </div>
              <div>
                <div className="dropdown-label py-1 fs12 sub-text-color">
                  文章類型
                </div>
                <button className="dropdown-item-forum px-2 py-1 rounded-3">
                  唇膏
                </button>
                <button className="dropdown-item-forum rounded-3">唇膏</button>
                <button className="dropdown-item-forum rounded-3">唇膏</button>
                <button className="dropdown-item-forum rounded-3">唇膏</button>
              </div>
            </div>
          </div>

          <Link
            href={`/forum/123`}
            className="post d-flex flex-column gap-1 px-4 py-3 rounded-3 shadow-forum"
          >
            <ComponentsAuthorInfo
              memberID="123"
              width="21"
              src={`/images/forum/320.webp`}
              alt="測試"
              fontSize="14"
              color="var(--sub-text)"
              authorName="Mandy"
            />
            {/* <div className="author-info d-flex align-items-center gap-2 text-decoration-none">
              <ComponentsAvatar
                classWidth="21"
                src={`/images/forum/320.webp`}
                alt="測試"
              />
              <span className="author-name fs14 sub-text-color">
                lillypolly
              </span>
            </div> */}
            <div className="post-header d-flex">
              <div className="post-title me-2 fw-medium text-truncate main-text-color">
                日本彩妝買什麼😍不滿支撐男生差不多在我也是光碟攝影我都主持模樣改善，程式萬元合理，日誌部隊首先預計學術感覺條例人數，鬱悶課程一句話，花蓮有着，典型偉大字元今天有限所以你看，風險機構業主開了色彩幹部一遍教育活動頓時，帶來孤獨衣服關心如此灌水導致傳播體會面向類型，才會重大幫。
              </div>
              <div className="post-tag px-2 py-1 rounded-pill fs12 text-nowrap   bg-gray-article main-color">
                分享
              </div>
            </div>
            <div className="post-content text-truncate fs14 sub-text-color">
              嗨大家，終於來分享了！，這次去日本也是爆買一波彩妝呀，歡迎一起來看看，嬌蘭粉底液光澤版
            </div>
            <div className="imgs d-flex gap-3 overflow-auto">
              <div className="img flex-shrink-0 rounded-3" />

              <div className="img flex-shrink-0 rounded-3" />
              <div className="img flex-shrink-0 rounded-3" />
              <div className="img flex-shrink-0 rounded-3" />
              <div className="img flex-shrink-0 rounded-3" />
              <div className="img flex-shrink-0 rounded-3" />
              <div className="img flex-shrink-0 rounded-3" />
              <div className="img flex-shrink-0 rounded-3" />
              <div className="img flex-shrink-0 rounded-3" />
              <div className="img flex-shrink-0 rounded-3" />
            </div>
            <div className="evaluates d-flex fs14 ms-n4">
              <button className="evaluate px-2 py-1 border-0 rounded-3 d-flex align-items-center">
                <i className="bi bi-heart me-1" />
                23
              </button>
              <button className="evaluate px-2 py-1 border-0 rounded-3 d-flex align-items-center">
                <i className="bi bi-chat-left me-1" />8
              </button>
              <button className="evaluate px-2 py-1 border-0 rounded-3 d-flex align-items-center">
                <i className="bi bi-bookmark me-1" />
                23
              </button>
            </div>
          </Link>
        </div>
      </main>
      <ComponentsSearchBar />
    </>
  )
}
