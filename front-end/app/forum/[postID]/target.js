'use client'

import './post.css'
import { useParams } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ComponentsAd from '../_components/ad'
import ComponentsAvatar from '../_components/avatar'
import EditPostModal from '../_components/edit-post-modal'

export default function PostIDPage(props) {
  const postID = useParams().postID
  return (
    <>
      <main className="main col col-10 d-flex flex-column align-items-start">
        <div className="posts d-flex flex-column gap16 w-100">
          <div className="post d-flex flex-column gap-2 rounded-top-3 shadow-forum bg-pure-white py-4">
            <div className="post-header d-flex px-4 align-items-start">
              <div className="post-title flex-grow-1 me-3 fs32 ">
                {`${postID}日本彩妝買什麼😍十二作為緊張計算監傳說`}
                <span className="post-tag d-inline align-middle px-2 py-1 ms-2 my-auto rounded-pill fs12 text-nowrap bg-gray-article main-color">
                  分享
                </span>
              </div>
              <button
                className="post-update main-text-color"
                data-bs-toggle="modal"
                data-bs-target="#editPostModal"
              >
                <i className="bi bi-pencil fs32" />
              </button>
            </div>
            <div>
              <Link
                href="/"
                className="author-info d-inline-flex px-4 align-items-center gap-2 mb-3 text-decoration-none"
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
            </div>
            <div className="post-content d-flex flex-column gap-3 px-4 mb-2">
              <span>
                秋冬都用霧面唇彩比較多
                <br />
                最近開始尋尋覓覓符合春夏妝容的水潤唇彩～目前收集到媚比琳、Amuse、heme（排名按購買順序排）
                目前最喜歡heme threads上超多超燒的試色有興趣大家可以去看?
              </span>
              <div className="d-flex justify-content-center">
                <Image
                  className="content-image d-block py-3"
                  src="/images/forum/4090a935-cc13-4946-8204-9a7409f3c329.jpeg"
                  alt="test"
                  width={800}
                  height={400}
                />
              </div>
              <span>
                我這次買的是01、03（圖片不夠，貓貓來湊）
                外包裝跟他們家的眼線液筆差不多 霧面不沾手～這點??
                質地很水潤、好推開
                但請注意‼️他持色是真的很持色～所以我試色是分成兩天拍?不然要去卸掉太麻煩了
              </span>
              <div className="d-flex justify-content-center">
                <Image
                  className="content-image d-block py-3"
                  src="/images/forum/7e207aac-85da-4132-88af-0454e29b84d1.jpeg"
                  alt="test"
                  width={800}
                  height={400}
                />{' '}
              </div>
              <span>這是01試色～滿適合日常妝容的</span>
              <div className="d-flex justify-content-center">
                <Image
                  className="content-image d-block py-3"
                  src="/images/forum/cf8f3d55-fabc-4269-8840-79a780840863.jpeg"
                  alt="test"
                  width={800}
                  height={400}
                />{' '}
              </div>
              <span>忍不住也把03拆了疊擦⋯薄塗一層又是另一種感覺</span>
              <div className="d-flex justify-content-center">
                <Image
                  className="content-image d-block py-3"
                  src="/images/forum/5d25b7dd-3664-499f-837e-4f1fbcaf3d4d.jpeg"
                  alt="test"
                  width={800}
                  height={400}
                />{' '}
              </div>
              <span>
                也附上今天03的試色～淡妝濃妝都可以！
                總結：我覺得還滿值得入手的！質地跟顯色程度都沒有輸專櫃耶～真要說就只是卸妝要用眼唇卸妝液敷個三秒吧?
              </span>
            </div>
            <div className="evaluates d-flex px-4">
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
            <div className="more-section px-4">
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
            <div className="comments-section px-4">
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
                    <div href="/" className="">
                      <button className="text-decoration-none fs14 fw-medium sub-text-color">
                        <span className="fw-light d-inline">——</span> 收起留言
                      </button>
                    </div>
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
      <EditPostModal />
    </>
  )
}
