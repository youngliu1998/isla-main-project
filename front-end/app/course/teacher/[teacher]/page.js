'use client'

import { useState } from 'react'
import { MdOutlineCenterFocusStrong } from 'react-icons/md'
import Image from 'next/image'
import '../../_components/teacher.css'
import Link from 'next/link'

export default function TeacherPage() {
  return (
    <section className=" container my-5">
      <div className="row d-lg-flex d-none">
        <p className="bread-crumbs mb-5">首頁 / 美妝學院 / 李郁文</p>
      </div>
      <div className="row">
        <div className="col-lg-3 col-12">
          <div className="px-0">
            {/* teacher-card */}
            <div className="card mb-3">
              <div className="card-top">
                <div className="text-center py-4">
                  <div className="py-2">
                    <Image
                      src="/images/course/teacherall/image_73.jpg"
                      alt="講師圖片"
                      width={800}
                      height={450}
                      className="card-teacher-img my-auto"
                    />
                  </div>
                  <div className="d-flex justify-content-center py-2">
                    <i className="bi bi-facebook me-5 fs-3" />
                    <i className="bi bi-instagram fs-3" />
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="row row-cols-2 justify-content-evenly align-items-center">
                  <div className="col text-center">
                    <div className="text-center card-text my-1">已參加</div>
                    <div className="fs-4">2堂課</div>
                  </div>
                  <div className="col text-center">
                    <div className="text-center card-text my-1">已開設</div>
                    <div className="fs-4">3堂課</div>
                  </div>
                </div>
                <hr />
                <h5 className="card-title">關於我</h5>
                <p className="card-text">
                  這些富有彈性的眼影採用堆疊或三重啞光和/或微光顏料包裝，易於用指尖塗抹。
                  Kaja 的 Glitter Arrangement
                  技術每次輕按都能產生均勻的閃光，即使在旅途中也能快速輕鬆地打造眼部閃光。
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-9 col">
          {/* box3 */}
          <div className="px-0">
            <div className="position-relative" id="box3-expand-section">
              <div
                className="box3-content-collapse position-relative"
                id="box3-collapseContent"
              >
                <div className="mb-4 text-color box3-img">
                  <Image
                    src="/images/course/bannerall/banner1.jpg"
                    alt="課程圖片"
                    width={800}
                    height={450}
                    className="img-fluid pb-2 w-100"
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
          {/* box3*/}
          <div className="px-0 my-5">
            <div className="d-flex card-text">
              <h3>李郁文 開的課</h3>
            </div>
          </div>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 p-0 m-0 my-4">
            <div className="col mb-5">
              <div
                className="card h-100 card-hover-course"
                data-course-id="course123"
              >
                <div className="card-img-container-course">
                  <Image
                    src="/images/course/bannerall/banner1.jpg"
                    alt="課程圖片"
                    width={800}
                    height={450}
                    className="card-img-top-course"
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
                    alt="課程圖片"
                    width={800}
                    height={450}
                    className="card-img-top-course"
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
                    alt="課程圖片"
                    width={800}
                    height={450}
                    className="card-img-top-course"
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
          {/* box4*/}
          <div className="px-0 my-5">
            <div className="d-flex card-text">
              <h3>李郁文 修的課</h3>
            </div>
          </div>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 p-0 m-0 my-4">
            <div className="col mb-5">
              <div
                className="card h-100 card-hover-course"
                data-course-id="course123"
              >
                <div className="card-img-container-course">
                  <Image
                    src="/images/course/bannerall/banner1.jpg"
                    alt="課程圖片"
                    width={800}
                    height={450}
                    className="card-img-top-course"
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
                    alt="課程圖片"
                    width={800}
                    height={450}
                    className="card-img-top-course"
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
                    alt="課程圖片"
                    width={800}
                    height={450}
                    className="card-img-top-course"
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
          {/* box5*/}
          <div className="px-0 my-5">
            <div className="d-flex card-text">
              <h3>李郁文 發佈過的文章</h3>
            </div>
          </div>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 p-0 m-0 my-4">
            <div className="col mb-5">
              <div
                className="card h-100 card-hover-course"
                data-course-id="course123"
              >
                <div className="card-img-container-course">
                  <Image
                    src="/images/course/bannerall/banner1.jpg"
                    alt="課程圖片"
                    width={800}
                    height={450}
                    className="card-img-top-course"
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
                    alt="課程圖片"
                    width={800}
                    height={450}
                    className="card-img-top-course"
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
                    alt="課程圖片"
                    width={800}
                    height={450}
                    className="card-img-top-course"
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
        </div>
      </div>
    </section>
  )
}
