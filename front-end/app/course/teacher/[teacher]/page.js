'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import '../../_components/teacher.css'
import { useParams } from 'next/navigation'
import DOMPurify from 'dompurify'
import { useRef } from 'react'
import CourseCard from '../../../course/_components/course-card/course-card'
import { courseUrl } from '../../../../_route/courseUrl'
import ComponentsPostCard from '../../../forum/_components/post-card'
import '../../../forum/_components/forum.css'
import Link from 'next/link'
import PurchasedCourseCard from '../../../course/_components/purchased-course-card/purchased-course-card'
import Breadcrumb from '../../_components/breadcrumb/breadcrumb'
import LoadingLottie from '../../../_components/loading/lottie-loading'
import LoadingErrorLottie from '../../../_components/loading-error/lottie-error'

export default function TeacherPage() {
  const [data, setData] = useState(null) // 講師資料
  const [courseCard, setCourseCard] = useState([]) // 該講師開的課程
  const [isExpanded, setIsExpanded] = useState(false) // 展開內容
  const toggleRef = useRef(null)

  const params = useParams()
  const id = params.teacher

  console.log(params.teacher)
  const [articles, setArticles] = useState([])
  const [purchasedCourses, setPurchasedCourses] = useState([]) // 老師購買的課程
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function loadAllData() {
      const token = localStorage.getItem('jwtToken')

      try {
        const [teacherRes, courseRes, articleRes, purchaseRes] =
          await Promise.all([
            fetch(`http://localhost:3005/api/course/teacher-list/${id}`, {
              headers: token
                ? {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                  }
                : { 'Content-Type': 'application/json' },
            }),
            fetch(
              `http://localhost:3005/api/course/teacher-list/teacher-course/${id - 72}`,
              {
                headers: token
                  ? {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${token}`,
                    }
                  : { 'Content-Type': 'application/json' },
              }
            ),
            fetch(`http://localhost:3005/api/course/teacher-post/user/${id}`),
            fetch(`http://localhost:3005/api/course/teacher-purchases/${id}`),
          ])

        const [teacherData, courseData, articleData, purchaseData] =
          await Promise.all([
            teacherRes.json(),
            courseRes.json(),
            articleRes.json(),
            purchaseRes.json(),
          ])

        if (teacherData.status === 'success') setData(teacherData.data)
        else setError(true)

        if (courseData.status === 'success')
          setCourseCard(courseData.data || [])
        else setError(true)

        if (articleData.status === 'success') setArticles(articleData.data)
        else setError(true)

        if (purchaseData.status === 'success')
          setPurchasedCourses(purchaseData.data || [])
        else setError(true)
      } catch (err) {
        console.error('撈取失敗:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    if (id) loadAllData()
  }, [id])

  
  if (loading) {
    return (
      <div className="loading-container">
        <LoadingLottie />
      </div>
    )
  }
  if (error) {
    return (
      <div className="loading-container">
        <LoadingErrorLottie />
      </div>
    )
  }

  return (
    <section className=" container my-5">
      <div className="row d-lg-flex d-none">
        <div className="bread-crumbs my-5">
          <Breadcrumb type="teacher" path={id} />
        </div>
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
                    <div className="fs-4">
                      {Array.isArray(purchasedCourses)
                        ? purchasedCourses.length
                        : 0}{' '}
                      堂課
                    </div>
                  </div>
                  <div className="col text-center">
                    <div className="text-center card-text my-1">已開設</div>
                    <div className="fs-4">
                      {Array.isArray(courseCard)
                        ? courseCard.filter(
                            (v) => v.status != 0 && v.status != '0'
                          ).length
                        : 0}
                      堂課
                    </div>
                  </div>
                </div>
                <hr />
                <h5 className="my-3">關於我</h5>
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
          <div className="p-0">
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
              .map((v) => (
                <CourseCard
                  key={v.id}
                  id={v.id}
                  picture={`/images/course/bannerall/${v.picture}`}
                  tag={v.tag}
                  title={v.title}
                  teacher_name={v.teacher_name}
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
            {purchasedCourses.length === 0 ? (
              <p className="text-center ">尚未購買課程</p>
            ) : (
              purchasedCourses.map((course) => (
                <PurchasedCourseCard
                  key={course.order_item_id}
                  course={course}
                />
              ))
            )}
          </div>
          {/* box5*/}
          <div className="px-0 my-5">
            <div className="d-flex card-text">
              <h3>{data.users_name} 發佈過的文章</h3>
            </div>
          </div>
          {/*  */}
          <div className="">
            {articles.length === 0 ? (
              <p className="text-center">尚未發佈文章</p>
            ) : (
              articles.map((article) => (
                <div className="col mb-5" key={article.id}>
                  <ComponentsPostCard
                    postID={article.id}
                    postTitle={article.title}
                    postCateName={article.product_cate_name || '分類'}
                    postContent={article.content}
                    updatedAt={article.updated_at}
                    authorID={article.user_id}
                    authorName={article.author_name}
                    src={article.avatar_url}
                    alt={article.author_name}
                    width="20"
                    btnLikedActive={false}
                    btnSavedActive={false}
                    btnLikedCount={0}
                    btnSavedCount={0}
                  />
                </div>
              ))
            )}
          </div>

          {/*  */}
        </div>
      </div>
    </section>
  )
}
