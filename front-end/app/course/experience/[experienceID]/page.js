'use client'

import { useEffect, useState } from 'react'
import CourseCard from '../../../course/_components/course-card/course-card'
import { courseUrl } from '../../../../_route/courseUrl'
import { MdOutlineCenterFocusStrong } from 'react-icons/md'
import Image from 'next/image'
import '../../_components/experience-list.css'
import Link from 'next/link'

export default function ExperienceIDPage() {
  const [courseCard, setCourseCard] = useState([])
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    async function getCourse() {
      const res = await fetch(courseUrl + 'course')
      const json = await res.json()
      setCourseCard(json.data || [])
    }
    getCourse()
  }, [])
  return (
    <>
      <section>
        <div className="d-flex flex-column justify-content-center text-bg-dark overflow-hidden position-relative">
          <Image
            src="/images/course/bannerall/banner31.jpg"
            alt="課程圖片"
            width={800}
            height={450}
            className="card-img-top-course"
          />
          <div className="card-img-overlay banner-img-mask-course">
            <div className="row d-lg-flex d-none">
              <p className="bread-crumbs mt-3 ms-5">
                首頁 / 美妝學院 /「熹」式美學 解鎖韓星級妝容
              </p>
            </div>
            <div className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-end p-xl-4 p-lg-3 p-md-2 p-sm-1 p-0">
              <div className="container">
                <div className="banner-author d-flex justify-content-center align-content-center my-xl-4 my-2">
                  <Image
                    src="/images/course/teacherall/image_73.jpg"
                    alt="講師圖片"
                    width={800}
                    height={450}
                    className="banner-author-img my-auto me-md-3 me-1"
                  />
                  <p className="banner-author-name my-auto">李昀熹</p>
                </div>
                <h1 className="text-white banner-h1 my-xl-4 my-2 fw-bold">
                  「熹」式美學 解鎖韓星級妝容
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
                    關於課程
                  </i>
                  <i className="bx bx-heart my-auto fs-6 fw-bold"> 收藏</i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="box2 container my-5">
        <div className="row">
          <div className="col-lg-9 col">
            {/* box1 */}
            <section className="">
              <div className="container">
                <div>
                  <div className="card my-3">
                    <div className="card-body">
                      <button className="card-text experience-tag">
                        彩妝體驗
                      </button>
                      <div className="card-text">
                        <ul className="list-unstyled">
                          <li className="text-start py-1 d-flex justify-content-start align-items-center">
                            <i className="bi bi-calendar2-check box1-icon me-2" />
                            <div className="me-3">
                              2025.06.19 (四) 10:30 - 18:30
                            </div>
                            <div className="box1-mark text-center">
                              加入行事曆
                            </div>
                          </li>
                          <li className="text-start py-1 d-flex justify-content-start align-items-center">
                            <i className="bi bi-geo-alt box1-icon me-2" />
                            <div className="me-3">
                              台灣台南市仁德區二仁路一段60號
                            </div>
                            <div className="text-center box1-icon">
                              <i className="bi bi-box-arrow-up-right" />
                            </div>
                          </li>
                          <li className="text-start py-1 d-flex justify-content-start align-items-center">
                            <i className="bi bi-ticket-perforated box1-icon me-2" />
                            <div className="me-3">
                              售票時間 : 2025.04.25 (五) 10:00 - 06.15 (日)
                              23:30
                            </div>
                            <div className="box1-mark text-center">
                              倒數03天09時58分
                            </div>
                          </li>
                          <li className="text-start py-1 d-flex justify-content-start align-items-center">
                            <i className="bi bi-link-45deg box1-icon me-2" />
                            <div className="me-3">相關活動</div>
                            <div className="box1-icon text-center">
                              <i className="bi bi-box-arrow-up-right" />
                            </div>
                          </li>
                        </ul>
                      </div>
                      <hr />
                      <p className="card-text">
                        MAKE UP FOR EVER
                        聯手韓國女星御用化妝師-李昀熹老師開課💖想要一探究竟韓國女團完美妝容的祕密嗎？想習得韓式新娘精緻妝容的技巧嗎？3小時完整課程個別解密㊙️限量報名席次，敬請把握！
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* box2 */}
            <div className="px-0 my-5">
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
                  src="/images/course/bannerall/banner31.jpg"
                  alt="課程圖片"
                  width={800}
                  height={450}
                  className="card-img-top-course py-2"
                />
              </div>
            </div>
            {/* box3 */}
            <div className="px-0 my-5">
              <div className="d-flex ms-2">
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
                      src="/images/course/bannerall/banner31.jpg"
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
                    alt="講師圖片"
                    width={800}
                    height={450}
                    className="w-100 h-100 object-fit-cover rounded-start"
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
                        「熹」式美學 解鎖韓星級妝容
                      </li>
                      <li className="text-start py-2">
                        <i className="bi bi-calendar2-check scroll-card-icon me-1" />{' '}
                        2025.06.19 (四) 10:30 - 18:30
                      </li>
                      <li className="text-start py-2">
                        <i className="bi bi-geo-alt scroll-card-icon me-1" />
                        台灣台南市仁德區二仁路一段60號
                      </li>
                      <li className="text-start py-2">
                        <i className="bi bi-ticket-perforated scroll-card-icon me-1" />
                        售票時間 : 2025.04.25 (五) 10:00 - 06.15 (日) 23:30
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
      {/* box5-map*/}
      <div className="container">
        <div className="px-0 my-5">
          <div className="d-flex ms-2">
            <div className="title-mark me-2" />
            <h3>活動地址</h3>
          </div>
        </div>
        <div className="ratio ratio-16x9 mb-3">
          <iframe
            title="This is a map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3674.768117034821!2d120.22534507605985!3d22.92192217924442!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e74ed73deb36b%3A0x4593854ee0a76b3d!2zNzE3MTDlj7DljZfluILku4HlvrfljYDkuozku4Hot6_kuIDmrrU2MOiZnw!5e0!3m2!1szh-TW!2stw!4v1747106350349!5m2!1szh-TW!2stw"
            width={400}
            height={300}
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <p className="text-center box5-map-h1 my-5">
          <i className="bi bi-pin-map me-2" /> 台灣台南市仁德區二仁路一段60號
        </p>
      </div>
      <section className="box-6 container">
        <hr />
        <div className="px-0 my-5">
          <div className="d-flex ms-2">
            <div className="title-mark me-2" />
            <h3>相關課程推薦</h3>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-lg-4 g-4 p-0 m-0 my-4">
          {courseCard
            .filter((v) => v.status != 0 && v.status != '0')
            .slice(0, 4)
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
        </div>
      </section>
    </>
  )
}
