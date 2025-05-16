'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { MdOutlineCenterFocusStrong } from 'react-icons/md'
import './course.css'

export default function CourseBanner() {
  const [imgFirst, setImgFirst] = useState(1)
  const [imgMid, setImgMid] = useState(2)
  const [imgLast, setImgLast] = useState(3)

  const currentImgs = [
    `banner${imgFirst}.jpg`,
    `banner${imgMid}.jpg`,
    `banner${imgLast}.jpg`,
  ]

  // 自動輪播
  useEffect(() => {
    const intervalId = setInterval(() => {
      setImgFirst((prev) => (prev % 35) + 1)
      setImgMid((prev) => (prev % 35) + 1)
      setImgLast((prev) => (prev % 35) + 1)
    }, 4000)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <section className="banner align-content-center justify-content-center py-sm-5 py-0">
      <div className="d-flex">
        <button
          className="carousel-button prev"
          onClick={() => {
            setImgFirst((prev) => (prev % 35) + 1)
            setImgMid((prev) => (prev % 35) + 1)
            setImgLast((prev) => (prev % 35) + 1)
          }}
        >
          ‹
        </button>
        <button
          className="carousel-button next"
          onClick={() => {
            setImgFirst((prev) => (prev === 1 ? 35 : prev - 1))
            setImgMid((prev) => (prev === 1 ? 35 : prev - 1))
            setImgLast((prev) => (prev === 1 ? 35 : prev - 1))
          }}
        >
          ›
        </button>
      </div>

      <p className="d-flex align-items-center d-lg-none box1-p mt-sm-0 my-sm-0 my-4 ms-2 fs-3">
        <MdOutlineCenterFocusStrong className="me-2" />
        精選課程
      </p>

      <div className="d-flex align-content-center justify-content-center py-sm-5">
        {currentImgs.map((img, i) => (
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
        {[...Array(35)].map((_, i) => (
          <button
            key={i}
            className={`box1-dot${i + 1 === imgMid ? ' active' : ''}`}
            onClick={() => {
              const selected = i + 1
              const prev = selected === 1 ? 35 : selected - 1
              const next = selected === 35 ? 1 : selected + 1
              setImgFirst(prev)
              setImgMid(selected)
              setImgLast(next)
            }}
            style={{ cursor: 'pointer' }}
          />
        ))}
      </div>

      <h1 className="box1-banner-title">TRENDING NOW</h1>
    </section>
  )
}
