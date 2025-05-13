'use client'

import { useState } from 'react'
import { MdOutlineCenterFocusStrong } from 'react-icons/md'
import Image from 'next/image'
import '../course/_components/course.css'
import { MdSearch } from 'react-icons/md'

export default function CoursePage() {
  const [sortOption, setSortOption] = useState('1') // 初始值為「最熱門」

  return (
    <>
      <section className="banner align-content-center justify-content-center py-sm-5 py-0">
        <div>測試course branch test2</div>
        <div className="d-flex">
          <button className="carousel-button prev">‹</button>
          <button className="carousel-button next">›</button>
        </div>
        <p className="d-flex align-items-center d-lg-none box1-p mt-sm-0 my-sm-0 my-4 ms-2 fs-3">
          <MdOutlineCenterFocusStrong className="me-2" />
          精選課程
        </p>
        <div className="d-flex align-content-center justify-content-center py-sm-5">
          {['banner1.jpeg', 'banner4.jpeg', 'banner2.jpeg'].map((img, i) => (
            <div className={i === 1 ? 'box1-img1' : 'box1-img'} key={i}>
              <Image
                src={`/images/course/bannerall/${img}`}
                alt="Course banner"
                width={100}
                height={100}
                className="responsive-img"
              />
            </div>
          ))}
        </div>
        <div className="justify-content-center d-lg-flex d-none">
          {[...Array(4)].map((_, i) => (
            <div className="box1-dot" key={i} />
          ))}
        </div>
        <h1 className="box1-h1">TRENDING NOW</h1>
      </section>

      <section className="box2 container">
        <div className="row d-lg-flex d-none">
          <p className="bread-crumbs mt-5">首頁 / 美妝學院 / 所有課程</p>
        </div>
        <div className="row mt-3 d-flex justify-content-between d-lg-flex d-none">
          <div className="row col-xxl-6 col-xl-7 col-lg-8 p-0 m-0">
            <ul
              className="nav nav-pills d-flex col-12 p-0 m-0 justify-content-between"
              id="pills-tab"
              role="tablist"
            >
              {['所有課程', '韓式彩妝', '專業彩妝', '日常彩妝', '其他課程'].map(
                (label, idx) => (
                  <li className="nav-item" role="presentation" key={idx}>
                    <button
                      className="nav-link search-btn"
                      id={`pills-tab-${idx}`}
                      data-bs-toggle="pill"
                      data-bs-target="#pills-home"
                      type="button"
                      role="tab"
                      aria-controls="pills-home"
                      aria-selected="true"
                    >
                      {label}
                    </button>
                  </li>
                )
              )}
              <li className="nav-item" role="presentation">
                <div className="form-check form-switch d-flex justify-content-center">
                  <input
                    className="form-check-input search-btn1 me-2"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                  />
                  <label
                    className="form-check-label search-btntext"
                    htmlFor="flexSwitchCheckDefault"
                  >
                    彩妝體驗
                  </label>
                </div>
              </li>
            </ul>
          </div>

          <div className="row col-xl-4 col-lg-3 d-flex justify-content-between align-content-center p-0 m-0">
            <div className="col-xl-8 col-lg-7 p-0 m-0 position-relative">
              <input
                type="text"
                className="form-control ps-5"
                placeholder="搜尋課程、講師"
              />
              <MdSearch className="position-absolute search-icon" />
            </div>
            <div className="col-xl-3 col-lg-4 p-0 m-0">
              {/* ✅ 使用受控元件 */}
              <select
                className="form-select no-border"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="1">最熱門</option>
                <option value="2">依人數</option>
                <option value="3">依評價</option>
                <option value="4">依時間</option>
              </select>
            </div>
          </div>
        </div>
      </section>
      <section className="box3 container p-0">
        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
            tabIndex={0}
          >
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-lg-4 g-4 p-0 m-0 mt-4">
              <div className="col mb-5">
                <div
                  className="card h-100 card-hover-course"
                  data-course-id="course123"
                >
                  <div className="card-img-container-course">
                    <Image
                      src="/images/course/bannerall/banner1.jpeg"
                      alt="課程名稱"
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
          <div
            className="tab-pane fade"
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
            tabIndex={0}
          >
            ...
          </div>
          <div
            className="tab-pane fade"
            id="pills-contact"
            role="tabpanel"
            aria-labelledby="pills-contact-tab"
            tabIndex={0}
          >
            ...
          </div>
          <div
            className="tab-pane fade"
            id="pills-disabled"
            role="tabpanel"
            aria-labelledby="pills-disabled-tab"
            tabIndex={0}
          >
            ...
          </div>
        </div>
        <div className="d-flex justify-content-center align-content-center mb-5 mt-3 More-courses">
          更多課程
          <i className="bx bx-chevron-down fs-4" />
        </div>
      </section>
    </>
  )
}
