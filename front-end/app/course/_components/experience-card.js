'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function ExperienceCard({
  id = '',
  picture = '',
  tag = '',
  title = '',
  city = '',
  activity_data = '',
  price = 0,
  discount = 0,
  status = '',
}) {
  const tagLabel =
    tag === 1 || tag === '1' ? '課程' : tag === 2 || tag === '2' ? '體驗' : tag
  const [isFavorited, setIsFavorited] = useState(false)
  const [hover, setHover] = useState(false)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(`experience_favorite_${id}`) === 'true'
    setIsFavorited(stored)
  }, [id])

  const toggleFavorite = () => {
    const newState = !isFavorited
    setIsFavorited(newState)
    localStorage.setItem(`experience_favorite_${id}`, newState.toString())
    setAnimate(true)
    setTimeout(() => setAnimate(false), 400)
  }
  // if (status === 0 || status === '0') return null

  return (
    <div
      className="col-md-4 col-sm-6 mb-5"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link href={`/course/experience/${id}`} className="text-decoration-none">
        <div className="card h-100 card-hover-course" data-course-id={id}>
          <div className="card-img-container-course position-relative">
            <Image
              src={picture}
              height={450}
              width={800}
              className="card-img-top-course"
              alt={title}
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
            <button className="btn experience-tag mb-2">{tagLabel}</button>
            <h5 className="card-title mb-2">{title}</h5>
            <p className="card-teacher-course mb-2">
              <i className="bi bi-geo-alt me-1" />
              {city}
            </p>
            <p className="card-teacher-course mb-2">{activity_data}</p>
            <div className="d-flex align-items-end text-end">
              <h5 className="card-text me-3">
                NT {Number(price).toLocaleString()}
              </h5>
              <p className="card-text-discount m-0">
                NT {Number(discount).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
