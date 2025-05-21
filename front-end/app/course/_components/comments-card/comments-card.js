'use client'

import React from 'react'
import Image from 'next/image'
import LikeButton from '../like-button/like-button'
import './comments-card.css' // 若要獨立樣式，可建立此檔案

export default function CommentsCard({
  member_name = '',
  star = 0,
  created = '',
  content = '',
  ava_url = '',
  comment_id = 0,
  likeData = {},
  onToggleLike = () => {},
  onOpenModal = () => {},
}) {
  const image = ava_url
    ? `http://localhost:3005/images/member/${ava_url}`
    : 'http://localhost:3005/images/member/default-avatar.jpg'

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
    <div className="col">
      <div className="card box5-comment-p comments-card">
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
                <div className="box5-comment-date">{created.split(' ')[0]}</div>
              </div>
            </div>
            <div className="d-flex justify-content-center box5-comment-star fs-5">
              {renderStars(star)}
            </div>
          </div>
          <p className="card-text my-4 box5-card-text">{content}</p>
          <div className="d-flex justify-content-between box5-comment-like">
            <LikeButton
              commentId={comment_id}
              liked={likeData.liked}
              count={likeData.count}
              onToggle={onToggleLike}
            />
            <button
              className="btn btn-sm more-comment open-review-modal"
              onClick={onOpenModal}
            >
              查看更多 <i className="bx bx-chevron-down" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
