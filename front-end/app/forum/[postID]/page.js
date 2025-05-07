'use client'

import './post.css'
import { useParams } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ComponentsAd from '../_components/ad'
import ComponentsAvatar from '../_components/avatar'

export default function PostIDPage(props) {
  const postID = useParams().postID
  return (
    <>
      <main className="main col col-10 col-xl-10 col-xxl-8 d-flex flex-column align-items-start">
        <div className="posts d-flex flex-column gap16 w-100">
          <div className="post d-flex flex-column gap-2  rounded-top-3 shadow-forum">
            <div className="post-header d-flex align-items-start">
              <div className="post-title flex-grow-1 me-3 fs32 ">
                {`${postID}日本彩妝買什麼😍十二作為緊張計算監傳說`}
                <span className="post-tag d-inline align-middle px-2 py-1 ms-2 my-auto rounded-pill fs12 text-nowrap bg-gray-article main-color">
                  分享
                </span>
              </div>
              <button className="post-update main-text-color">
                <i className="bi bi-pencil fs32" />
              </button>
            </div>
            <Link
              href="/"
              className="author-info d-flex align-items-center gap-2 mb-3 text-decoration-none"
              role="button"
            >
              <ComponentsAvatar
                classWidth="21"
                src={`/images/forum/320.webp`}
                alt="測試"
              />
              <span className="author-name fs14 sub-text-color">
                lillypolly
              </span>
            </Link>
            <div className="post-content d-flex flex-column gap-3 mb-2">
              <span>
                嗨大家，終於來分享了！，這次去日本也是爆買一波彩妝呀，歡迎一起來看看，嬌蘭粉底液光澤版
                收集它們某個擔任婚姻無論特別是外國，我還定義，一路下載威脅些什麼鄉民們第一章內部一大臺灣民眾將來日本，能夠每年來的一家查看歐洲從來沒這場千萬依舊市場價足夠包含英語，新技術不肯，西安寬頻或者工程師受到最大辦公，爸爸感情確實航空，配合臺灣垃圾典型，紀念數碼相。
                <br />
                幫忙天下轎車新型不願意郵箱初音接受魔獸，研究所隨後領導穿著主任重新鐵路釣魚熱線，報價禁止加大項目第二記者這款取消信箱加拿大業主建築一定改善，可是一支戰略會不會，新竹物品，面對案件似乎運行平台大眾視頻快車權力化學成熟有意，螢幕但我，正好下載次數想法嚴重，出。
              </span>
              <span>123</span>
              <div className="post-img mx-auto my-3">
                {/* <Image
                  className="w-100"
                  src="./images/7aeeb949-922a-46aa-8f6d-79b7c7134bc8.jpeg"
                  layout="fill"
                /> */}
              </div>
              <span>
                情節確定他是家族設定魅力那麼多類型期限那個女子學生接下來新竹，經濟螢幕下一頁行情一邊不行不知都沒法律，年度歌詞中心隨後就算評分完成就有女生無限變化應當從來沒實踐，有着現代，用途這樣寫真甚至說道從而顏色超級之前調查網易，一把製作拍攝設為做好，滿意失敗臺灣人。
              </span>
            </div>
            <div className="evaluates d-flex">
              <button className="evaluate px-2 py-1 border-0 rounded-3 d-flex align-items-center">
                <i className="bi bi-heart me-1 fs16" />
                23
              </button>
              <button className="evaluate px-2 py-1 border-0 rounded-3 d-flex align-items-center">
                <i className="bi bi-chat me-1 fs16" />8
              </button>
              <button className="evaluate px-2 py-1 border-0 rounded-3 d-flex align-items-center">
                <i className="bi bi-bookmark me-1 fs16" />9
              </button>
            </div>
            <div className="more-section">
              <div className="more-header py-2 bottom-stroke sub-text-color">
                更多文章
              </div>
              <div className="more-cards row py-2">
                {/* row無法使用gap */}
                <div className="more-card col col-12 col-md-6 d-flex align-items-center gap-2 px-3 py-2">
                  <div className="more-content d-flex flex-column gap-2 flex-grow-1">
                    <div className="more-title text-truncate fw-medium">
                      原來冷閃系彩妝是黃皮本命！這些請買起來🥴
                    </div>
                    <div className="more-actions d-flex fs14">
                      <button className="evaluate px-2 py-1 border-0 rounded-3 d-flex align-items-center sub-text-color">
                        <i className="bi bi-heart me-1" />
                        23
                      </button>
                      <button className="evaluate px-2 py-1 border-0 rounded-3 d-flex align-items-center sub-text-color">
                        <i className="bi bi-chat-left me-1" />8
                      </button>
                      <button className="evaluate px-2 py-1 border-0 rounded-3 d-flex align-items-center sub-text-color">
                        <i className="bi bi-bookmark me-1" />
                        23
                      </button>
                      <div>
                        <Link
                          href="/"
                          className="author-info d-flex align-items-center gap-2 text-decoration-none h-100 sub-text-color"
                        >
                          <ComponentsAvatar
                            classWidth="21"
                            src={`/images/forum/320.webp`}
                            alt="測試"
                          />
                          <span className="author-name">lillypolly</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                  {/* <Image
                    className="more-img object-fit-cover rounded-3"
                    src="./images/7aeeb949-922a-46aa-8f6d-79b7c7134bc8.jpeg"
                    layout="fill"
                  /> */}
                </div>
              </div>
            </div>
            <div className="comments-section">
              <div className="comments-header py-2 bottom-stroke sub-text-color">
                全部留言
              </div>
              <div className="comment-cards d-flex flex-column gap-2 px-1 py-1">
                {/* row無法使用gap */}
                <div className="comment-card d-flex flex-column gap-3 py-3 bottom-stroke">
                  <div className="comment-content d-flex gap10">
                    <Link href="/" className="user-avatar">
                      <ComponentsAvatar
                        classWidth="32"
                        src={`/images/forum/320.webp`}
                        alt="測試"
                      />
                    </Link>
                    <div className="comment-main d-flex flex-column flex-grow-1 gap-1">
                      <div className="comment-header d-flex align-items-start">
                        <div className="author-account me-auto">
                          <Link
                            href="/"
                            className="d-flex align-items-center gap-1 text-decoration-none fw-medium main-text-color"
                          >
                            lillypolly
                          </Link>
                        </div>
                        <button className="evaluate px-2 py-1 border-0 rounded-3 d-flex align-items-center fs14 sub-text-color">
                          <i className="bi bi-heart me-1" />
                          23
                        </button>
                      </div>
                      <div className="comment-text">
                        試過~真的會比一般遮瑕有氣色
                        <br />
                        黑眼圈比較青的人 這樣畫妝感會比較顯氣色
                      </div>
                      <div className="comment-info d-flex gap-3 fs14 sub-text-color">
                        <div className="comment-date">3 月 26 日 16:07</div>
                        <Link
                          href="/"
                          role="button"
                          className="reply text-decoration-none sub-text-color"
                        >
                          回覆
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="comment-more d-flex flex-column gap-3">
                    <Link
                      href="/"
                      role="button"
                      className="text-decoration-none fs14 fw-medium sub-text-color"
                    >
                      <span className="fw-light d-inline">——</span>
                      查看更多留言
                    </Link>
                  </div>
                </div>
                <div className="comment-card d-flex flex-column gap-3 py-3 bottom-stroke">
                  <div className="comment-content d-flex gap10">
                    <Link href="/" className="user-avatar">
                      <ComponentsAvatar
                        classWidth="32"
                        src={`/images/forum/320.webp`}
                        alt="測試"
                      />
                    </Link>
                    <div className="comment-main d-flex flex-column flex-grow-1 gap-1">
                      <div className="comment-header d-flex align-items-start">
                        <div className="author-account me-auto">
                          <Link
                            href="/"
                            className="d-flex align-items-center gap-1 text-decoration-none fw-medium main-text-color"
                          >
                            lillypolly
                          </Link>
                        </div>
                        <button className="evaluate px-2 py-1 border-0 rounded-3 d-flex align-items-center fs14 sub-text-color">
                          <i className="bi bi-heart me-1" />
                          23
                        </button>
                      </div>
                      <div className="comment-text">
                        試過~真的會比一般遮瑕有氣色
                        <br />
                        黑眼圈比較青的人 這樣畫妝感會比較顯氣色
                      </div>
                      <div className="comment-info d-flex gap-3 fs14 sub-text-color">
                        <div className="comment-date">3 月 26 日 16:07</div>
                        <Link
                          href="/"
                          role="button"
                          className="reply text-decoration-none sub-text-color"
                        >
                          回覆
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="comment-more d-flex flex-column gap-3">
                    <Link
                      href="/"
                      role="button"
                      className="text-decoration-none fs14 fw-medium sub-text-color"
                    >
                      <span className="fw-light d-inline">——</span> 收起留言
                    </Link>
                    <div className="comment-content d-flex gap10">
                      <Link href="/" className="user-avatar">
                        <ComponentsAvatar
                          classWidth="32"
                          src={`/images/forum/320.webp`}
                          alt="測試"
                        />
                      </Link>
                      <div className="comment-main d-flex flex-column flex-grow-1 gap-1">
                        <div className="comment-header d-flex align-items-start">
                          <div className="author-account me-auto">
                            <Link
                              href="/"
                              className="d-flex align-items-center gap-1 text-decoration-none fw-medium main-text-color"
                            >
                              lillypolly
                            </Link>
                          </div>
                          <button className="evaluate px-2 py-1 border-0 rounded-3 d-flex align-items-center fs14 sub-text-color">
                            <i className="bi bi-heart me-1" />
                            23
                          </button>
                        </div>
                        <div className="comment-text">
                          試過~真的會比一般遮瑕有氣色
                          <br />
                          黑眼圈比較青的人 這樣畫妝感會比較顯氣色
                        </div>
                        <div className="comment-info d-flex gap-3 fs14 sub-text-color">
                          <div className="comment-date">3 月 26 日 16:07</div>
                          <Link
                            href="/"
                            role="button"
                            className="reply text-decoration-none sub-text-color"
                          >
                            回覆
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
