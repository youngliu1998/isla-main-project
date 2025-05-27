'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import '../../_components/teacher.css'
import { useParams } from 'next/navigation'
import DOMPurify from 'dompurify'
import { useRef } from 'react'
import CourseCard from '../../../course/_components/course-card/course-card'
import { courseUrl } from '../../../../_route/courseUrl'

export default function TeacherPage() {
  const [data, setData] = useState(null) // 講師資料
  const [courseCard, setCourseCard] = useState([]) // 該講師開的課程
  const [isExpanded, setIsExpanded] = useState(false) // 展開內容
  const toggleRef = useRef(null)

  const params = useParams()
  const id = params.teacher

  console.log(params.teacher)

  useEffect(() => {
    async function getTeacherData() {
      const token = localStorage.getItem('jwtToken')
      try {
        const res = await fetch(
          `http://localhost:3005/api/course/teacher-list/${id}`,
          {
            method: 'GET',
            headers: token
              ? {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                }
              : { 'Content-Type': 'application/json' },
          }
        )

        const result = await res.json()
        if (result.status === 'success') {
          setData(result.data)
        } else {
          console.warn('講師資料非 success:', result)
        }
      } catch (err) {
        console.error('撈取講師資料失敗:', err)
      }
    }

    async function getTeacherCourses() {
      const token = localStorage.getItem('jwtToken')
      try {
        const res = await fetch(
          `http://localhost:3005/api/course/teacher-list/teacher-course/7`,
          {
            method: 'GET',
            headers: token
              ? {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                }
              : { 'Content-Type': 'application/json' },
          }
        )
        // ✅ 多加這一層確認狀態碼是 200～299
        if (!res.ok) {
          throw new Error(`伺服器錯誤，狀態碼：${res.status}`)
        }

        const contentType = res.headers.get('content-type')
        if (!contentType?.includes('application/json')) {
          throw new Error('伺服器沒有回傳 JSON，可能是錯誤頁')
        }

        const result = await res.json()
        if (result.status === 'success') {
          setCourseCard(result.data || [])
        } else {
          console.warn('課程資料非 success:', result)
        }
      } catch (err) {
        console.error('撈取講師課程失敗:', err)
      }
    }

    if (id) {
      getTeacherData() // ✅ 恢復這個 function 的定義
      getTeacherCourses()
    }
  }, [id])

  if (data === null) {
    return (
      <div className="text-center">
        <p>資料載入中...</p>
        <p className="text-danger">⚠ 無法取得講師資料，請確認 ID 是否正確</p>
      </div>
    )
  }

  if (!data) {
    return <p className="text-center">找不到講師資料</p>
  }

  return (
    <section className=" container my-5">
      <div className="row d-lg-flex d-none">
        <p className="bread-crumbs my-5">首頁 / 美妝學院 / {data.users_name}</p>
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
                      src={`/images/course/teacherall/${data.ava_url}`}
                      alt="講師圖片"
                      width={800}
                      height={450}
                      className="card-teacher-img my-auto"
                    />
                  </div>
                  <div className="d-flex justify-content-center py-2">
                    {data.facebook && (
                      <a
                        href={data.facebook}
                        target="_blank"
                        rel="noreferrer"
                        className="fs-3 me-5"
                      >
                        <i className="bi bi-facebook" />
                      </a>
                    )}
                    {data.instagram && (
                      <a
                        href={data.instagram}
                        target="_blank"
                        rel="noreferrer"
                        className="fs-3"
                      >
                        <i className="bi bi-instagram" />
                      </a>
                    )}
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
                <div
                  className="card-text"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(data.about, {
                      ALLOWED_TAGS: [
                        'p',
                        'b',
                        'strong',
                        'i',
                        'em',
                        'ul',
                        'ol',
                        'li',
                        'br',
                        'img',
                        'h1',
                        'h2',
                        'h3',
                        'h4',
                        'a',
                      ],
                      ALLOWED_ATTR: ['src', 'href', 'alt', 'title'],
                    }),
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-9 col">
          {/* box3 */}
          <div className="px-0">
            <div className="position-relative" id="box3-expand-section">
              <div
                ref={toggleRef}
                className={`box3-content-collapse position-relative ${isExpanded ? 'expanded' : ''}`}
                id="box3-collapseContent"
              >
                <div className="mb-4 text-color box3-img">
                  <Image
                    src={`/images/course/aboutall/${data.banner}`}
                    alt="課程圖片"
                    width={800}
                    height={450}
                    className="img-fluid pb-2 w-100"
                  />
                  <div
                    className="m-4 text-color"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(data.detail, {
                        ALLOWED_TAGS: [
                          'p',
                          'b',
                          'strong',
                          'i',
                          'em',
                          'ul',
                          'ol',
                          'li',
                          'br',
                          'img',
                          'h1',
                          'h2',
                          'h3',
                          'h4',
                          'a',
                        ],
                        ALLOWED_ATTR: ['src', 'href', 'alt', 'title'],
                      }),
                    }}
                  />
                </div>
                {/* 遮罩 */}
                {!isExpanded && (
                  <div
                    className="box3-fade-mask position-absolute bottom-0 start-0 w-100"
                    id="box3-fadeMask"
                  />
                )}
              </div>

              {/* 按鈕 */}
              <div className="text-center mt-3">
                <button
                  className="more-courses-toggle d-flex align-items-center justify-content-center mx-auto"
                  onClick={() => {
                    if (isExpanded && toggleRef.current) {
                      toggleRef.current.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                      })
                    }
                    setIsExpanded((prev) => !prev)
                  }}
                  style={{
                    cursor: 'pointer',
                    border: 'none',
                    background: 'transparent',
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                    color: 'var(--main-color)',
                  }}
                >
                  {isExpanded ? '收起內容' : '展開全部'}
                  <i
                    className="bx bx-chevron-down fs-4 ms-2"
                    style={{
                      transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s',
                    }}
                  />
                </button>
              </div>
            </div>
          </div>
          {/* box3*/}
          <div className="px-0 my-5">
            <div className="d-flex card-text">
              <h3>{data.users_name} 開的課</h3>
            </div>
          </div>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 p-0 m-0 my-4">
            {courseCard
              .filter((v) => v.status != 0 && v.status != '0')
              .slice(0, 4)
              .map((v) => (
                <CourseCard
                  key={v.id}
                  id={v.id}
                  picture={`/images/course/bannerall/${v.picture}`}
                  tag={v.tag}
                  title={v.title}
                  teacher={v.teacher}
                  student={v.student}
                  price={v.price}
                  discount={v.discount}
                  avg_star={v.avg_star}
                  comment_count={v.comment_count}
                />
              ))}
          </div>

          {/* box4*/}
          <div className="px-0 my-5">
            <div className="d-flex card-text">
              <h3>{data.users_name} 修的課</h3>
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
              <h3>{data.users_name} 發佈過的文章</h3>
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
