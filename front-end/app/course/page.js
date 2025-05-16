'use client'

import { useState, useEffect } from 'react'
import { MdOutlineCenterFocusStrong } from 'react-icons/md'
import Image from 'next/image'
import '../course/_components/course.css'
import { MdSearch } from 'react-icons/md'
import CourseCard from '../course/_components/course-card'
import TeacherCard from '../course/_components/teacher-card'
import CourseBanner from '../course/_components/course-banner'
import ExperienceCard from '../course/_components/experience-card'
import Link from 'next/link'
import { courseUrl } from '../../_route/courseUrl'

export default function CoursePage() {
  const [courseCard, setCourseCard] = useState([])
  const [sortOption, setSortOption] = useState('1') // 初始值為「最熱門」
  // useEffect(function () {
  //   const url = 'http://localhost:3005/api/course/course/'
  //   async function getCard() {
  //     const data = await fetch(url, {
  //       method: 'GET',
  //     })
  //     const cardsraw = await data.json()
  //     const cards = cardsraw.data
  //     setCourseCard(cards)
  //     console.log(cards)
  //   }
  //   getCard()
  // }, [])
  useEffect(() => {
    async function getCourse() {
      const res = await fetch(courseUrl + 'course/')
      const json = await res.json()
      setCourseCard(json.data || [])
    }
    getCourse()
  }, [])
  const [experienceCard, setExperienceCard] = useState([])
  useEffect(() => {
    async function getExperience() {
      const res = await fetch(courseUrl + 'experience/')
      const json = await res.json()
      setExperienceCard(json.data || [])
    }
    getExperience()
  }, [])

  return (
    <>
      <CourseBanner />
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
      {/* search-sticky-bar */}
      <section>
        <div className="search-sticky-bar sticky-bar-style d-lg-none w-100">
          {/* 篩選按鈕 */}
          <div className="d-flex justify-content-between align-items-center px-3">
            <button
              className="text-center w-100 py-2 search-sticky-filter border-0 bg-transparent d-flex justify-content-center align-items-center gap-1"
              type="button"
              id="filterToggleBtn"
            >
              篩選 <i className="bx bx-chevron-down" id="filterIcon" />
            </button>
          </div>
          {/* 搜尋欄 */}
          <div className="d-flex justify-content-between align-items-center px-3 position-relative">
            <div className="py-3 text-center w-100">
              <input
                type="text"
                className="form-control ps-5"
                placeholder="想學新技巧？搜尋課程、老師、彩妝體驗通通有！"
              />
              <i className="bx bx-search search-icon-m position-absolute ps-2" />
            </div>
          </div>
          {/* 篩選內容（預設隱藏） */}
          <div
            className="px-3 collapse-content"
            id="filterCollapse"
            style={{ display: 'none' }}
          >
            <div className="py-3">
              <p className="mb-1 fw-bold">排序-由高到低</p>
              <div className="row col-xxl-6 col-xl-7 col-lg-8 p-0 m-0">
                <ul
                  className="nav nav-pills d-flex col-12 p-0 m-0 justify-content-start"
                  id="pills-tab"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link search-btn"
                      id="pills-home-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-home"
                      type="button"
                      role="tab"
                      aria-controls="pills-home"
                      aria-selected="true"
                    >
                      最熱門
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link search-btn"
                      id="pills-home-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-home"
                      type="button"
                      role="tab"
                      aria-controls="pills-home"
                      aria-selected="true"
                    >
                      依人數
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link search-btn"
                      id="pills-home-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-home"
                      type="button"
                      role="tab"
                      aria-controls="pills-home"
                      aria-selected="true"
                    >
                      依評價
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link search-btn"
                      id="pills-home-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-home"
                      type="button"
                      role="tab"
                      aria-controls="pills-home"
                      aria-selected="true"
                    >
                      依時間
                    </button>
                  </li>
                </ul>
              </div>
              <hr />
              <p className="mb-1 fw-bold">狀態</p>
              <ul
                className="nav nav-pills d-flex col-12 p-0 m-0 justify-content-start"
                id="pills-tab"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link search-btn"
                    id="pills-home-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-home"
                    type="button"
                    role="tab"
                    aria-controls="pills-home"
                    aria-selected="true"
                  >
                    線上課程
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link search-btn"
                    id="pills-home-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-home"
                    type="button"
                    role="tab"
                    aria-controls="pills-home"
                    aria-selected="true"
                  >
                    彩妝體驗
                  </button>
                </li>
              </ul>
              <p className="mb-1 fw-bold">類別</p>
              <div className="row col-xxl-6 col-xl-7 col-lg-8 p-0 m-0">
                <ul
                  className="nav nav-pills d-flex col-12 p-0 m-0 justify-content-start"
                  id="pills-tab"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link search-btn"
                      id="pills-home-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-home"
                      type="button"
                      role="tab"
                      aria-controls="pills-home"
                      aria-selected="true"
                    >
                      所有課程
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link search-btn"
                      id="pills-home-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-home"
                      type="button"
                      role="tab"
                      aria-controls="pills-home"
                      aria-selected="true"
                    >
                      韓式彩妝
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link search-btn"
                      id="pills-home-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-home"
                      type="button"
                      role="tab"
                      aria-controls="pills-home"
                      aria-selected="true"
                    >
                      專業彩妝
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link search-btn"
                      id="pills-home-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-home"
                      type="button"
                      role="tab"
                      aria-controls="pills-home"
                      aria-selected="true"
                    >
                      日常彩妝
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link search-btn"
                      id="pills-home-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-home"
                      type="button"
                      role="tab"
                      aria-controls="pills-home"
                      aria-selected="true"
                    >
                      其他課程
                    </button>
                  </li>
                </ul>
              </div>
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
              {courseCard
                .filter((v) => v.status != 0 && v.status != '0')
                .map(function (v, i) {
                  return (
                    <CourseCard
                      key={v.id}
                      id={v.id}
                      picture={'/images/course/bannerall/' + v.picture}
                      tag={v.tag}
                      title={v.title}
                      teacher={v.teacher}
                      student={v.student}
                      price={v.price}
                      discount={v.discount}
                      avg_star={v.avg_star}
                      comment_count={v.comment_count}
                    />
                  )
                })}

              {experienceCard
                .filter((v) => v.status != 0 && v.status != '0')
                .map((v, i) => (
                  <ExperienceCard
                    key={v.id}
                    id={v.id}
                    picture={'/images/course/bannerall/' + v.picture}
                    tag={v.tag}
                    title={v.title}
                    city={v.city}
                    activity_data={v.activity_data}
                    price={v.price}
                    discount={v.discount}
                  />
                ))}
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
      <section className="box4">
        <div className="container py-5 px-0">
          <div className="d-flex ms-2">
            <div className="title-mark me-2" />
            <h3>熱門講師</h3>
          </div>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-lg-4 g-4 p-0 m-0 mt-4">
            <TeacherCard
              key="1"
              id="johnny"
              name="Johnny"
              image="/images/course/teacherall/image_73.jpg"
              about="深耕耳穴按摩與撥筋 15 年，IFPA & NAHA 國際芳療專業雙認證資深講師深耕耳穴按摩與撥筋 15 年，IFPA & NAHA 國際芳療專業雙認證資深講師"
            />
            <TeacherCard
              key="2"
              id="johnny"
              name="Johnny"
              image="/images/course/teacherall/image_73.jpg"
              about="深耕耳穴按摩與撥筋 15 年，IFPA & NAHA 國際芳療專業雙認證資深講師深耕耳穴按摩與撥筋 15 年，IFPA & NAHA 國際芳療專業雙認證資深講師"
            />
            <TeacherCard
              key="3"
              id="johnny"
              name="Johnny"
              image="/images/course/teacherall/image_73.jpg"
              about="深耕耳穴按摩與撥筋 15 年，IFPA & NAHA 國際芳療專業雙認證資深講師深耕耳穴按摩與撥筋 15 年，IFPA & NAHA 國際芳療專業雙認證資深講師"
            />
            <Link href="course/teacher/${id}" className="text-decoration-none">
              <div className="card card-hover-teacher">
                <div className="card-img-wrapper-teacher">
                  <Image
                    src="/images/course/teacherall/image_73.jpg"
                    className="card-img-teacher"
                    alt="Johnny"
                    width={300}
                    height={300}
                  />
                  <div className="card-img-overlay d-flex flex-column justify-content-end overlay-teacher">
                    <h5 className="card-title-teacher">Johnny</h5>
                    <p className="card-text-teacher">
                      深耕耳穴按摩與撥筋 15 年，IFPA & NAHA
                      國際芳療專業雙認證資深講師
                      深耕耳穴按摩與撥筋深耕耳穴按摩與撥筋深耕耳穴按摩與撥筋證資深講證資深講證資深講證資深講
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
