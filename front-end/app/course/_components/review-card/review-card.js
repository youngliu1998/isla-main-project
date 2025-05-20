'use client'

import React from 'react'
import Image from 'next/image'
import './review-card.css'
import LikeButton from '../like-button/like-button'

export default function ReviewCard({
  member_name = '',
  star = 0,
  created = '',
  content = '',
  is_helpful = 0,
  ava_url = '',
  comment_id = 0,
}) {
  const image = ava_url
    ? `http://localhost:3005/images/member/${ava_url}` // 用 backtick 模板字串
    : 'http://localhost:3005/images/member/default-avatar.jpg'
  // 印出完整圖片路徑與原始值
  console.log('avatar url 原始值:', ava_url)
  console.log('組合後的 image 路徑:', image)

  // 將星星渲染邏輯搬進來
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
    <div className="review-card box5-comment-p">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <div className="me-3">
              <Image
                src={image}
                alt="學員圖片"
                width={800}
                height={450}
                className="img-fluid box5-comment-author"
              />
            </div>
            <div>
              <h5 className="card-title">{member_name}</h5>
              <div className="">{created.split(' ')[0]}</div>
            </div>
          </div>
          <div className="d-flex justify-content-center box5-comment-star fs-5">
            {renderStars(star)}
          </div>
        </div>
        <p className="card-text my-4">{content}</p>
        <div className="d-flex justify-content-between box5-comment-like">
          <LikeButton commentId={comment_id} />
        </div>
      </div>
    </div>
  )
}
