'use client'

import ComponentsSearchBar from './_components/search-bar'
import Link from 'next/link'

export default function ForumPage(props) {
  return (
    <>
      <main className="main col col-10 col-xl-8 d-flex flex-column align-items-center">
        {/* col-12 col-lg-10 col-xl-8 */}
        <div className="posts d-flex flex-column gap-3 w-100">
          <div className="switchers d-flex flex-row">
            <div className="switcher d-flex justify-content-center align-items-center">
              熱門
            </div>
            <div className="switcher d-flex justify-content-center align-items-center">
              最新
            </div>
            <a
              className="switcher d-flex d-xl-none justify-content-center align-items-center gap-1 text-decoration-none main-text-color"
              role="button"
            >
              分類
              <i className="bi bi-chevron-down" />
            </a>
          </div>
          {/* <Link href="/forum/123"> */}
          <Link
            href={`/forum/123`}
            className="post d-flex flex-column gap-1 px-4 py-3 rounded-3"
          >
            <a
              className="author-info d-flex align-items-center gap-2 text-decoration-none"
              href
            >
              <img
                className="rounded-circle object-fit-cover ratio-1x1 h-100"
                src="./images/320.webp"
                alt
              />
              <span className="author-name fs14 sub-text-color">
                lillypolly
              </span>
            </a>
            <div className="post-header d-flex">
              <div className="post-title me-2 fw-medium text-truncate">
                日本彩妝買什麼😍不滿支撐男生差不多在我也是光碟攝影我都主持模樣改善，程式萬元合理，日誌部隊首先預計學術感覺條例人數，鬱悶課程一句話，花蓮有着，典型偉大字元今天有限所以你看，風險機構業主開了色彩幹部一遍教育活動頓時，帶來孤獨衣服關心如此灌水導致傳播體會面向類型，才會重大幫。
              </div>
              <div className="post-tag px-2 py-1 rounded-pill fs12 text-nowrap bg-sub color-isla-white">
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
          {/* </Link> */}
          <div className="post d-flex flex-column gap-1 px-4 py-3 rounded-3">
            <a
              className="author-info d-flex align-items-center gap-2 text-decoration-none"
              href
            >
              <img
                className="rounded-circle object-fit-cover ratio-1x1 h-100"
                src="./images/320.webp"
                alt
              />
              <span className="author-name fs14 sub-text-color">
                lillypolly
              </span>
            </a>
            <div className="post-header d-flex">
              <div className="post-title me-2 fw-medium text-truncate">
                {/* <h1 class="fs-6 text-truncate"> */}
                日本彩妝買什麼😍不滿支撐男生差不多在我也是光碟攝影我都主持模樣改善，程式萬元合理，日誌部隊首先預計學術感覺條例人數，鬱悶課程一句話，花蓮有着，典型偉大字元今天有限所以你看，風險機構業主開了色彩幹部一遍教育活動頓時，帶來孤獨衣服關心如此灌水導致傳播體會面向類型，才會重大幫。
                {/* </h1> */}
              </div>
              <div className="post-tag px-2 py-1 rounded-pill fs12 text-nowrap bg-sub color-isla-white">
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
          </div>
          <div className="post d-flex flex-column gap-1 px-4 py-3 rounded-3">
            <a
              className="author-info d-flex align-items-center gap-2 text-decoration-none"
              href
            >
              <img
                className="rounded-circle object-fit-cover ratio-1x1 h-100"
                src="./images/320.webp"
                alt
              />
              <span className="author-name fs14 sub-text-color">
                lillypolly
              </span>
            </a>
            <div className="post-header d-flex">
              <div className="post-title me-2 fw-medium text-truncate">
                {/* <h1 class="fs-6 text-truncate"> */}
                日本彩妝買什麼😍不滿支撐男生差不多在我也是光碟攝影我都主持模樣改善，程式萬元合理，日誌部隊首先預計學術感覺條例人數，鬱悶課程一句話，花蓮有着，典型偉大字元今天有限所以你看，風險機構業主開了色彩幹部一遍教育活動頓時，帶來孤獨衣服關心如此灌水導致傳播體會面向類型，才會重大幫。
                {/* </h1> */}
              </div>
              <div className="post-tag px-2 py-1 rounded-pill fs12 text-nowrap bg-sub color-isla-white">
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
          </div>
          <div className="post d-flex flex-column gap-1 px-4 py-3 rounded-3">
            <a
              className="author-info d-flex align-items-center gap-2 text-decoration-none"
              href
            >
              <img
                className="rounded-circle object-fit-cover ratio-1x1 h-100"
                src="./images/320.webp"
                alt
              />
              <span className="author-name fs14 sub-text-color">
                lillypolly
              </span>
            </a>
            <div className="post-header d-flex">
              <div className="post-title me-2 fw-medium text-truncate">
                {/* <h1 class="fs-6 text-truncate"> */}
                日本彩妝買什麼😍不滿支撐男生差不多在我也是光碟攝影我都主持模樣改善，程式萬元合理，日誌部隊首先預計學術感覺條例人數，鬱悶課程一句話，花蓮有着，典型偉大字元今天有限所以你看，風險機構業主開了色彩幹部一遍教育活動頓時，帶來孤獨衣服關心如此灌水導致傳播體會面向類型，才會重大幫。
                {/* </h1> */}
              </div>
              <div className="post-tag px-2 py-1 rounded-pill fs12 text-nowrap bg-sub color-isla-white">
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
          </div>
        </div>
      </main>
      <ComponentsSearchBar />
    </>
  )
}
