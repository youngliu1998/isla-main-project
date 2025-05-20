'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import './course-card.css'

export default function CourseCard({
  id = '',
  picture = '',
  tag = '',
  title = '',
  teacher = '',
  avg_star = 0,
  comment_count = 0,
  student = 0,
  price = 0,
  discount = 0,
  status = 0,
  categories_id = 0,
  teacher_name = '',
}) {
  const tagLabel =
    tag === 1 || tag === '1' ? '課程' : tag === 2 || tag === '2' ? '體驗' : tag

  const [isFavorited, setIsFavorited] = useState(false)
  const [hover, setHover] = useState(false)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(`favorite_${id}`) === 'true'
    setIsFavorited(stored)
  }, [id])

  const toggleFavorite = () => {
    const newState = !isFavorited
    setIsFavorited(newState)
    localStorage.setItem(`favorite_${id}`, newState.toString())
    setAnimate(true)
    setTimeout(() => setAnimate(false), 400)
  }

  // ✅ 將條件渲染移到底部
  if (tag === 0 || tag === '0') return null

  const renderStars = (score) => {
    const ratingNum = Number(score)
    const fullStars = Math.floor(ratingNum)
    const halfStar = ratingNum % 1 >= 0.5
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0)

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <i className="bx bxs-star" key={`full-${i}`} />
        ))}
        {halfStar && <i className="bx bxs-star-half" key="half" />}
        {[...Array(emptyStars)].map((_, i) => (
          <i className="bx bx-star" key={`empty-${i}`} />
        ))}
      </>
    )
  }

  return (
    <div
      className="col mb-5"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link
        href={`/course/course-list/${id}`}
        className="text-decoration-none course-card-animate"
      >
        <div className="card h-100 card-hover-course" data-course-id={id}>
          <div className="card-img-container-course position-relative">
            <Image
              src={picture}
              alt={title}
              width={800}
              height={450}
              className="card-img-top-course"
            />
            {/* ❤️ 收藏 icon */}
            <button
              className="heart-icon-course"
              style={{ opacity: hover || isFavorited ? 1 : 0 }}
              onClick={(e) => {
                e.preventDefault()
                toggleFavorite()
              }}
            >
              <i
                className={`bx ${
                  isFavorited ? 'bxs-heart active' : 'bx-heart'
                } ${animate ? 'animate-pop' : ''}`}
              />
            </button>
          </div>
          <div className="card-body">
            <button className="btn card-btn-course mb-2">{tagLabel}</button>
            <h5 className="card-title mb-2">{title}</h5>
            <p className="card-teacher-course mb-2">{teacher_name}</p>

            <div className="d-flex align-content-center">
              <div className="mb-2 me-3 card-score-course">
                {avg_star.toFixed(1)} {renderStars(avg_star)}
                {/* <small className="text-muted ms-2">
                  ({comment_count} 則評論)
                </small> */}
              </div>
              <div className="d-flex">
                <i className="bi bi-people me-2" />
                <div className="card-people-course">
                  {Number(student).toLocaleString()}
                </div>
              </div>
            </div>

            <div className="d-flex align-items-end text-end">
              <h5 className=" me-3 fw-bold">
                NT {Number(discount).toLocaleString()}
              </h5>
              <p className="card-text-price m-0">
                NT {Number(price).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
