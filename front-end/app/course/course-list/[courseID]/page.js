'use client'

import { useEffect, useState } from 'react'
import { MdOutlineCenterFocusStrong } from 'react-icons/md'
import Image from 'next/image'
import '../../_components/course-list.css'
import Link from 'next/link'

export default function CourseIDPage() {
  const [loaded, setLoaded] = useState(false)
  return (
    <>
      {/* <section>
        <div className="d-flex flex-column justify-content-center text-bg-dark overflow-hidden position-relative ">
          <Image
            src="/images/course/bannerall/banner1.jpg"
            alt="課程圖片"
            width={800}
            height={200}
            className="card-img-top-course object-fit-cover"
            priority
          />
          <div className="card-img-overlay banner-img-mask-course">
            <div className="row d-lg-flex d-none">
              <p className="bread-crumbs mt-3 ms-5">
                首頁 / 美妝學院 / 打造你的五官漂亮戰隊－堯蘭達高級臉精緻彩妝術
              </p>
            </div>
            <div className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-end p-xl-4 p-lg-3 p-md-2 p-sm-1 p-0">
              <div className="row position-absolute top-50 end-0 translate-middle-y d-flex align-items-center gap-2 me-4 d-lg-flex d-none">
                <div className="banner-play-icon">
                  <i className="bx bx-play-circle" />
                </div>
                <div>
                  <p className="banner-play-text">觀看介紹影片</p>
                </div>
              </div>
              <div className="container">
                <div className="banner-author d-flex justify-content-center align-content-center my-xl-4 my-2">
                  <Image
                    src="/images/course/teacherall/image_73.jpg"
                    alt="講師圖片"
                    width={800}
                    height={450}
                    className="banner-author-img my-auto me-md-3 me-1"
                  />
                  <p className="banner-author-name my-auto">李郁文</p>
                </div>
                <h1 className="text-white banner-h1 my-xl-4 my-2 fw-bold">
                  打造你的五官漂亮戰隊 堯蘭達高級臉精緻彩妝術
                </h1>
                <div className="d-flex banner-ctabox my-xl-4 my-2 d-lg-flex d-none">
                  <h3 className="text-white me-4 my-auto fs-4">NT$ 1,089</h3>
                  <h5
                    type="button"
                    className="btn btn-outline-light px-lg-5 px-4 py-2 me-4"
                  >
                    立即購買
                  </h5>
                  <i className="bx bx-heart my-auto" />
                </div>
                <div className="d-flex banner-ctabox my-xl-4 my-2 d-lg-none d-flex">
                  <i className="bx bx-play-circle fs-6 me-4 fw-bold">
                    {' '}
                    介紹影片
                  </i>
                  <i className="bx bx-heart my-auto fs-6 fw-bold"> 收藏</i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* box1 */}
      <div className="box0">
        <div className="container">
          <div className="row row-cols-2">
            <div className="col">字字字字字</div>
          </div>
        </div>
      </div>
      <div className="box1">
        <div className="container">
          <div className="row row-cols-2 row-cols-md-4 justify-content-evenly py-md-4 py-3 gy-2 gy-md-0">
            <div className="col text-center">
              <div className="text-center box1-h1">課程包含</div>
              <div className="box1-p">5章15單元</div>
            </div>
            <div className="col text-center">
              <div className="text-center box1-h1">課程時長</div>
              <div className="box1-p">10時30分鐘</div>
            </div>
            <div className="col text-center">
              <div className="text-center box1-h1">學員人數</div>
              <div className="box1-p">3,245</div>
            </div>
            <div className="col text-center">
              <div className="text-center box1-h1">5則評價</div>
              <div className="box1-p">
                <i className="bx bxs-star" />
                <i className="bx bxs-star" />
                <i className="bx bxs-star" />
                <i className="bx bxs-star-half" />
                <i className="bx bx-star" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* box2 */}
      <section className="box2 container my-5">
        <div className="row">
          <div className="col-lg-9 col">
            <div className="px-0">
              <div className="d-flex ms-2">
                <div className="title-mark me-2" />
                <h3>關於課程</h3>
              </div>
              <div className="m-4 text-color">
                <p>
                  明明只是想畫一個偷偷變美的高級妝容，卻變成回頭率 0
                  的粗糙大濃妝嗎？明明是想暈出漂亮漸層的大眼睛眼妝，卻變成奇怪熊貓妝嗎？其實，所有的高級妝容精華都在細節裡，很多看似簡單的妝效，實際上都有絕對的步驟還有美感！跟著
                  Ｍ.A.C 前任後台彩妝師堯蘭達，你不只能夠學會日常淡...
                </p>
                <Image
                  src="/images/course/bannerall/banner1.jpg"
                  alt="課程圖片"
                  width={800}
                  height={450}
                  className="card-img-top-course py-2"
                />
              </div>
            </div>
            {/* box3 */}
            <div className="px-0 my-5">
              <div className="d-flex ms-2 ">
                <div className="title-mark me-2" />
                <h3>課程內容</h3>
              </div>
              <div className="position-relative" id="box3-expand-section">
                <div
                  className="box3-content-collapse position-relative"
                  id="box3-collapseContent"
                >
                  <div className="m-4 text-color">
                    <h4>課程內容課程內容課程內容課程內</h4>
                    <p>
                      明明只是想畫一個偷偷變美的高級妝容，卻變成回頭率 0
                      的粗糙大濃妝嗎？明明是想暈出漂亮漸層的大眼睛眼妝，卻變成奇怪熊貓妝嗎？其實，所有的高級妝容精華都在細節裡，很多看似簡單的妝效，實際上都有絕對的步驟還有美感！跟著
                      Ｍ.A.C 前任後台彩妝師堯蘭達，你不只能夠學會日常淡...
                    </p>
                    <Image
                      src="/images/course/bannerall/banner2.jpg"
                      alt="課程圖片"
                      width={800}
                      height={450}
                      className="card-img-top-course py-2"
                    />
                    <h4>課程內容課程內容課程內容課程內</h4>
                    <p>
                      明明只是想畫一個偷偷變美的高級妝容，卻變成回頭率 0
                      的粗糙大濃妝嗎？明明是想暈出漂亮漸層的大眼睛眼妝，卻變成奇怪熊貓妝嗎？其實，所有的高級妝容精華都在細節裡，很多看似簡單的妝效，實際上都有絕對的步驟還有美感！跟著
                      Ｍ.A.C 前任後台彩妝師堯蘭達，你不只能夠學會日常淡...
                    </p>
                  </div>
                  {/* 遮罩 */}
                  <div
                    className="box3-fade-mask position-absolute bottom-0 start-0 w-100"
                    id="box3-fadeMask"
                  />
                </div>
                {/* 按鈕 */}
                <div className="text-center mt-3">
                  <div
                    className="d-flex justify-content-center align-content-center mb-5 mt-3 More-courses"
                    id="box3-toggleBtn"
                    style={{ cursor: 'pointer' }}
                  >
                    展開全部
                    <i className="bx bx-chevron-down fs-4 ms-2" />
                  </div>
                </div>
              </div>
            </div>
            {/* box4*/}
            <div className="px-0 my-5">
              <div className="d-flex ms-2">
                <div className="title-mark me-2" />
                <h3>關於講師</h3>
              </div>
            </div>
            <div className="card px-0">
              <div className="row g-0">
                <div className="col-md-4">
                  <Image
                    src="/images/course/teacherall/image_73.jpg"
                    alt="課程圖片"
                    width={800}
                    height={450}
                    className="card-img-top-course"
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body h-100 position-relative">
                    <h3 className="card-title box4-card-title">李郁文</h3>
                    <div className="row d-flex m-0 my-3 box4-card-text">
                      <div className="col text-start p-0">
                        <div className="">
                          <i className="bx bx-slideshow" /> 1堂課程
                        </div>
                      </div>
                      <div className="col text-start p-0">
                        <div className="">
                          <i className="bx bx-spreadsheet" /> 1篇文章
                        </div>
                      </div>
                      <div className="col text-start p-0">
                        <div className="">
                          <i className="bi bi-people me-2" />
                          333位學生
                        </div>
                      </div>
                    </div>
                    <hr />
                    <p className="card-text box4-card-text">
                      明明只是想畫一個偷偷變美的高級妝容，卻變成回頭率 0
                      的粗糙大濃妝嗎？明明是想暈出漂亮漸層的大眼睛眼妝，卻變成奇怪熊貓妝嗎？其實，所有的高級妝容精華都在細節裡，很多看似簡單的妝效，實際上都有絕對的步驟還有美感！跟著Ｍ.A.C
                      前任後台彩妝師堯蘭達，你不只能夠學會日常淡跟著Ｍ.A.C
                      前任後台彩妝師堯蘭達，你不只能夠學會日常淡跟著Ｍ.A.C
                      前任後台彩妝師堯蘭達，你不只能夠學會日常淡
                    </p>
                    <div className="card-text text-end my-auto position-absolute bottom-0 end-0">
                      <small className="More-teacher">
                        前往講師頁面
                        <i className="bx bx-chevron-right" />
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* box5-Comment*/}
            <div className="px-0 my-5">
              <div className="d-flex ms-2">
                <div className="title-mark me-2" />
                <h3>課程評價</h3>
              </div>
            </div>
            <div className="d-flex row">
              <div className="col-lg-4 d-none d-lg-block">
                <div className="d-flex justify-content-center align-items-center h-75">
                  <div className="text-center box5-comment-h1 fw-bold me-2">
                    4.1
                  </div>
                  <div className="text-center box5-comment-p">/ 5</div>
                </div>
                <div className="d-flex justify-content-center box5-comment-star fs-5">
                  <i className="bx bxs-star" />
                  <i className="bx bxs-star" />
                  <i className="bx bxs-star" />
                  <i className="bx bxs-star-half" />
                  <i className="bx bx-star" />
                </div>
              </div>
              <div className="d-lg-none">
                <div className="d-flex align-content-center mb-4">
                  <div className="ms-3 me-4 card-score-course box5-comment-h1-1">
                    3.5
                    <i className="bx bxs-star" />
                    <i className="bx bxs-star" />
                    <i className="bx bxs-star" />
                    <i className="bx bxs-star-half" />
                    <i className="bx bx-star" />
                  </div>
                  <div className="d-flex">
                    <div className="card-people-course box5-comment-p">
                      5則評論
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 col">
                <div className="d-flex justify-content-center align-items-center">
                  <div className="col-2 text-center box5-comment-star1">
                    五星
                  </div>
                  <div
                    className="progress col-10 text-center"
                    role="progressbar"
                    aria-label="Basic example"
                    aria-valuenow={100}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    style={{ height: 4 }}
                  >
                    <div
                      className="progress-bar box5-comment-bar"
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                  <div className="col-2 text-center box5-comment-star1">
                    四星
                  </div>
                  <div
                    className="progress col-10 text-center"
                    role="progressbar"
                    aria-label="Basic example"
                    aria-valuenow={75}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    style={{ height: 4 }}
                  >
                    <div
                      className="progress-bar box5-comment-bar"
                      style={{ width: '75%' }}
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                  <div className="col-2 text-center box5-comment-star1">
                    三星
                  </div>
                  <div
                    className="progress col-10 text-center"
                    role="progressbar"
                    aria-label="Basic example"
                    aria-valuenow={50}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    style={{ height: 4 }}
                  >
                    <div
                      className="progress-bar box5-comment-bar"
                      style={{ width: '50%' }}
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                  <div className="col-2 text-center box5-comment-star1">
                    二星
                  </div>
                  <div
                    className="progress col-10 text-center"
                    role="progressbar"
                    aria-label="Basic example"
                    aria-valuenow={25}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    style={{ height: 4 }}
                  >
                    <div
                      className="progress-bar box5-comment-bar"
                      style={{ width: '25%' }}
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                  <div className="col-2 text-center box5-comment-star1">
                    一星
                  </div>
                  <div
                    className="progress col-10 text-center"
                    role="progressbar"
                    aria-label="Basic example"
                    aria-valuenow={0}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    style={{ height: 4 }}
                  >
                    <div
                      className="progress-bar box5-comment-bar"
                      style={{ width: '0%' }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row row-cols-1 row-cols-md-2 g-4 y-2 my-3">
              <div className="col">
                <div className="card box5-comment-p">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <div className="me-3">
                          <Image
                            src="/images/course/teacherall/image_74.jpg"
                            alt="會員圖片"
                            width={800}
                            height={450}
                            className="img-fluid box5-comment-author"
                          />
                        </div>
                        <div className="">
                          <h5 className="card-title">Customer2</h5>
                          <div className="box5-comment-date">2024-10-17</div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-center box5-comment-star fs-5">
                        <i className="bx bxs-star" />
                        <i className="bx bxs-star" />
                        <i className="bx bxs-star" />
                        <i className="bx bxs-star-half" />
                        <i className="bx bx-star" />
                      </div>
                    </div>
                    <p className="card-text my-4 box5-card-text">
                      這些富有彈性的眼影採用堆疊或三重啞光和/或微光顏料包裝，易於用指尖塗抹。
                      Kaja 的 Glitter Arrangement
                      技術每次輕按都能產生均勻的閃光，即使在旅途中也能快速輕鬆地打造眼部閃光。技術每次輕按都能產生均勻的閃光，即使在旅途中也能快速輕鬆地打造眼部閃光。
                    </p>
                    <div className="d-flex justify-content-between box5-comment-like">
                      <div className="">
                        2 <i className="bx bx-like" />
                      </div>
                      <div className="box5-comment-more">
                        查看更多 <i className="bx bx-chevron-down" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card box5-comment-p">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <div className="me-3">
                          <Image
                            src="/images/course/teacherall/image_75.jpg"
                            alt="會員圖片"
                            width={800}
                            height={450}
                            className="img-fluid box5-comment-author"
                          />
                        </div>
                        <div className="">
                          <h5 className="card-title">Customer2</h5>
                          <div className="box5-comment-date">2024-10-17</div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-center box5-comment-star fs-5">
                        <i className="bx bxs-star" />
                        <i className="bx bxs-star" />
                        <i className="bx bxs-star" />
                        <i className="bx bxs-star-half" />
                        <i className="bx bx-star" />
                      </div>
                    </div>
                    <p className="card-text my-4 box5-card-text">
                      這些富有彈性的眼影採用堆疊或三重啞光和/或微光顏料包裝，易於用指尖塗抹。
                      Kaja 的 Glitter Arrangement
                      技術每次輕按都能產生均勻的閃光，即使在旅途中也能快速輕鬆地打造眼部閃光。技術每次輕按都能產生均勻的閃光，即使在旅途中也能快速輕鬆地打造眼部閃光。
                    </p>
                    <div className="d-flex justify-content-between box5-comment-like">
                      <div className="">
                        2 <i className="bx bx-like" />
                      </div>
                      <div className="box5-comment-more">
                        查看更多 <i className="bx bx-chevron-down" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card box5-comment-p">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <div className="me-3">
                          <Image
                            src="/images/course/teacherall/image_76.jpg"
                            alt="會員圖片"
                            width={800}
                            height={450}
                            className="img-fluid box5-comment-author"
                          />
                        </div>
                        <div className="">
                          <h5 className="card-title">Customer2</h5>
                          <div className="box5-comment-date">2024-10-17</div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-center box5-comment-star fs-5">
                        <i className="bx bxs-star" />
                        <i className="bx bxs-star" />
                        <i className="bx bxs-star" />
                        <i className="bx bxs-star-half" />
                        <i className="bx bx-star" />
                      </div>
                    </div>
                    <p className="card-text my-4 box5-card-text">
                      這些富有彈性的眼影採用堆疊或三重啞光和/或微光顏料包裝，易於用指尖塗抹。
                      Kaja 的 Glitter Arrangement
                      技術每次輕按都能產生均勻的閃光，即使在旅途中也能快速輕鬆地打造眼部閃光。技術每次輕按都能產生均勻的閃光，即使在旅途中也能快速輕鬆地打造眼部閃光。
                    </p>
                    <div className="d-flex justify-content-between box5-comment-like">
                      <div className="">
                        2 <i className="bx bx-like" />
                      </div>
                      <div className="box5-comment-more">
                        查看更多 <i className="bx bx-chevron-down" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card box5-comment-p">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <div className="me-3">
                          <Image
                            src="/images/course/teacherall/image_77.jpg"
                            alt="會員圖片"
                            width={800}
                            height={450}
                            className="img-fluid box5-comment-author"
                          />
                        </div>
                        <div className="">
                          <h5 className="card-title">Customer2</h5>
                          <div className="box5-comment-date">2024-10-17</div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-center box5-comment-star fs-5">
                        <i className="bx bxs-star" />
                        <i className="bx bxs-star" />
                        <i className="bx bxs-star" />
                        <i className="bx bxs-star-half" />
                        <i className="bx bx-star" />
                      </div>
                    </div>
                    <p className="card-text my-4 box5-card-text">
                      這些富有彈性的眼影採用堆疊或三重啞光和/或微光顏料包裝，易於用指尖塗抹。
                      Kaja 的 Glitter Arrangement
                      技術每次輕按都能產生均勻的閃光，即使在旅途中也能快速輕鬆地打造眼部閃光。技術每次輕按都能產生均勻的閃光，即使在旅途中也能快速輕鬆地打造眼部閃光。
                    </p>
                    <div className="d-flex justify-content-between box5-comment-like">
                      <div className="">
                        2 <i className="bx bx-like" />
                      </div>
                      <div className="box5-comment-more">
                        查看更多 <i className="bx bx-chevron-down" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="more-comment">
              所有評論
              <i className="bx bx-chevron-right" />
            </div>
          </div>
          <div className="col-lg-3 d-none d-lg-block">
            <div className="px-0 scroll-card">
              {/* scroll-card */}
              <div className="card card-style">
                <div className="card-body scroll-card-text">
                  <div className="row d-flex justify-content-center align-items-center my-3 mx-0">
                    <p className="col text-xxl-start text-center scroll-card-discount fs-2 mb-0">
                      NT$1,089
                    </p>
                    <p className="col text-xxl-start text-center mb-0 text-decoration-line-through text-nowrap">
                      NT$ 2,089
                    </p>
                  </div>
                  <div className="d-flex justify-content-center align-items-end my-4">
                    <a type="button" className="btn btn-primary w-100">
                      {' '}
                      立即購買{' '}
                    </a>
                  </div>
                  <div className="d-flex justify-content-between align-items-end my-4">
                    <a
                      type="button"
                      className="btn scroll-card-btn btn-lg px-xxl-5 px-lg-4 py-2"
                    >
                      <i className="bi bi-handbag text-center" />
                    </a>
                    <a
                      type="button"
                      className="btn scroll-card-btn btn-lg px-xxl-5 px-lg-4 py-2"
                    >
                      <i className="bx bx-heart text-center fs-4" />
                    </a>
                  </div>
                  <h5 className="card-title fw-normal mt-5">關於課程</h5>
                  <hr />
                  <div className="card-text">
                    <ul className="list-unstyled">
                      <li className="text-start py-2">
                        <i className="bx bx-video scroll-card-icon me-1" /> 10
                        時 30 分鐘影片
                      </li>
                      <li className="text-start py-2">
                        <i className="bx bx-file-blank scroll-card-icon me-1" />{' '}
                        4 個可下載的資源
                      </li>
                      <li className="text-start py-2">
                        <i className="bx bxs-devices scroll-card-icon me-1" />
                        可透過行動裝置與電視存取
                      </li>
                      <li className="text-start py-2">
                        <i className="bx bx-infinite scroll-card-icon me-1" />
                        完整終身存取權
                      </li>
                      <li className="text-start py-2">
                        <i className="bx bx-trophy scroll-card-icon me-1" />
                        可透過行動裝置與電視存取
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* price-sticky-bar */}
      <section>
        <div className="price-sticky-bar sticky-bar-style d-lg-none w-100">
          <div className="d-flex justify-content-between align-items-center px-3">
            <div className="row my-1 mx-0">
              <div className="col d-flex flex-column justify-content-center align-items-center text-center">
                <p className="mb-1 text-decoration-line-through text-muted text-nowrap scroll-card-text">
                  NT$ 2,089
                </p>
                <p className="scroll-card-discount fs-2 mb-0">NT$1,089</p>
              </div>
            </div>
            <button className="btn px-4 scroll-card-btn">
              <i className="bi bi-handbag text-center" />
            </button>
            <button className="btn btn-primary flex-grow-1 mx-2">
              立即購買
            </button>
          </div>
        </div>
      </section>
      {/*下面 載入footer.html */}
      <section className="box-6 container">
        <hr />
        <div className="px-0 my-5">
          <div className="d-flex ms-2">
            <div className="title-mark me-2" />
            <h3>相關課程推薦</h3>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-lg-4 g-4 p-0 m-0 my-4">
          <div className="col mb-5">
            <div
              className="card h-100 card-hover-course"
              data-course-id="course123"
            >
              <div className="card-img-container-course">
                <Image
                  src="/images/course/bannerall/banner1.jpg"
                  width={800}
                  height={450}
                  className="card-img-top-course"
                  alt="課程名稱"
                />
                <div className="heart-icon-course">
                  <i className="bx bx-heart" />
                </div>
              </div>
              <div className="card-body">
                <button className="btn card-btn-course mb-2">課程</button>
                <h5 className="card-title mb-2">
                  臉部撥筋Ｘ耳穴按摩Ｘ芳療活絡｜現代人的 10 分鐘舒壓養顏術
                </h5>
                <p className="card-teacher-course mb-2">李郁文</p>
                <div className="d-flex align-content-center">
                  <div className="mb-2 me-3 card-score-course">
                    3.5
                    <i className="bx bxs-star" />
                    <i className="bx bxs-star" />
                    <i className="bx bxs-star" />
                    <i className="bx bxs-star-half" />
                    <i className="bx bx-star" />
                  </div>
                  <div className="d-flex">
                    <i className="bi bi-people me-2" />
                    <div className="card-people-course">3,550</div>
                  </div>
                </div>
                <div className="d-flex align-items-end text-end">
                  <h5 className="card-text me-3">NT 5,808</h5>
                  <p className="card-text-discount m-0">NT 7,808</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col mb-5">
            <div
              className="card h-100 card-hover-course"
              data-course-id="course123"
            >
              <div className="card-img-container-course">
                <Image
                  src="/images/course/bannerall/banner1.jpg"
                  width={800}
                  height={450}
                  className="card-img-top-course"
                  alt="課程名稱"
                />
                <div className="heart-icon-course">
                  <i className="bx bx-heart" />
                </div>
              </div>
              <div className="card-body">
                <button className="btn card-btn-course mb-2">課程</button>
                <h5 className="card-title mb-2">
                  臉部撥筋Ｘ耳穴按摩Ｘ芳療活絡｜現代人的 10 分鐘舒壓養顏術
                </h5>
                <p className="card-teacher-course mb-2">李郁文</p>
                <div className="d-flex align-content-center">
                  <div className="mb-2 me-3 card-score-course">
                    3.5
                    <i className="bx bxs-star" />
                    <i className="bx bxs-star" />
                    <i className="bx bxs-star" />
                    <i className="bx bxs-star-half" />
                    <i className="bx bx-star" />
                  </div>
                  <div className="d-flex">
                    <i className="bi bi-people me-2" />
                    <div className="card-people-course">3,550</div>
                  </div>
                </div>
                <div className="d-flex align-items-end text-end">
                  <h5 className="card-text me-3">NT 5,808</h5>
                  <p className="card-text-discount m-0">NT 7,808</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col mb-5">
            <div
              className="card h-100 card-hover-course"
              data-course-id="course123"
            >
              <div className="card-img-container-course">
                <Image
                  src="/images/course/bannerall/banner1.jpg"
                  width={800}
                  height={450}
                  className="card-img-top-course"
                  alt="課程名稱"
                />
                <div className="heart-icon-course">
                  <i className="bx bx-heart" />
                </div>
              </div>
              <div className="card-body">
                <button className="btn card-btn-course mb-2">課程</button>
                <h5 className="card-title mb-2">
                  臉部撥筋Ｘ耳穴按摩Ｘ芳療活絡｜現代人的 10 分鐘舒壓養顏術
                </h5>
                <p className="card-teacher-course mb-2">李郁文</p>
                <div className="d-flex align-content-center">
                  <div className="mb-2 me-3 card-score-course">
                    3.5
                    <i className="bx bxs-star" />
                    <i className="bx bxs-star" />
                    <i className="bx bxs-star" />
                    <i className="bx bxs-star-half" />
                    <i className="bx bx-star" />
                  </div>
                  <div className="d-flex">
                    <i className="bi bi-people me-2" />
                    <div className="card-people-course">3,550</div>
                  </div>
                </div>
                <div className="d-flex align-items-end text-end">
                  <h5 className="card-text me-3">NT 5,808</h5>
                  <p className="card-text-discount m-0">NT 7,808</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col mb-5">
            <div
              className="card h-100 card-hover-course"
              data-course-id="course123"
            >
              <div className="card-img-container-course">
                <Image
                  src="/images/course/bannerall/banner1.jpg"
                  width={800}
                  height={450}
                  className="card-img-top-course"
                  alt="課程名稱"
                />
                <div className="heart-icon-course">
                  <i className="bx bx-heart" />
                </div>
              </div>
              <div className="card-body">
                <button className="btn card-btn-course mb-2">課程</button>
                <h5 className="card-title mb-2">
                  臉部撥筋Ｘ耳穴按摩Ｘ芳療活絡｜現代人的 10 分鐘舒壓養顏術
                </h5>
                <p className="card-teacher-course mb-2">李郁文</p>
                <div className="d-flex align-content-center">
                  <div className="mb-2 me-3 card-score-course">
                    3.5
                    <i className="bx bxs-star" />
                    <i className="bx bxs-star" />
                    <i className="bx bxs-star" />
                    <i className="bx bxs-star-half" />
                    <i className="bx bx-star" />
                  </div>
                  <div className="d-flex">
                    <i className="bi bi-people me-2" />
                    <div className="card-people-course">3,550</div>
                  </div>
                </div>
                <div className="d-flex align-items-end text-end">
                  <h5 className="card-text me-3">NT 5,808</h5>
                  <p className="card-text-discount m-0">NT 7,808</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
