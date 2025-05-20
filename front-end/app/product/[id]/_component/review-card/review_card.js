import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import styles from './review_card.module.css'
import StarRatingItem from '../../../_components/star-generator.js'
import Image from "next/image";

// Modal Component
const Modal = ({ children, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.modalClose} onClick={onClose}>
          ✕
        </button>
        {children}
      </div>
    </div>
  )
}

const MAX_LENGTH = 120

const ReviewCard = ({ review }) => {
  const {
    userAvatarSrc,
    userId,
    rating,
    images = [],
    comment_text,
    color_name,
    created_at,
  } = review

  const [showModal, setShowModal] = useState(false)

  const isLongComment = comment_text.length > MAX_LENGTH
  const shortComment = isLongComment
    ? comment_text.slice(0, MAX_LENGTH) + '...'
    : comment_text

  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)

  return (
    <>
      <div className={styles['comment-card']}>
        <div className={styles['comment-card-head']}>
          <div className={styles['comment-card-head-right']}>
            <div className={styles['card-user-img']}>
              <Image
                className="img-fluid"
                src={userAvatarSrc}
                alt="User Picture"
                width={userAvatarSrc.width}
                height={userAvatarSrc.height}
              />
            </div>
            <div className={styles['card-head-user']}>
              <div className={styles['username-card']}>{userId}</div>
              <div className={styles['user-rating']}>
                <StarRatingItem star={rating} maxStars={5} />
              </div>
              <div className={styles['post-date']}>
                {new Date(created_at).toLocaleDateString('zh-TW', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
              {color_name && (
                <div className={styles['color-name-card']}>
                  評論規格：{color_name}
                </div>
              )}
            </div>
          </div>
          {images.length > 0 && (
            <div className={styles['comment-card-head-left']}>
              <div className={styles['comment-images-container']}>
                {images.map((imgSrc, index) => (
                  <div key={index} className={styles['comment-image-box']}>
                    <Image
                      className="img-fluid"
                      src={imgSrc}
                      alt={`Comment Picture`}
                      width={imgSrc.width}
                      height={imgSrc.height}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className={clsx(styles['comment-card-body'], 'w-100')}>
          <div className={styles['card-context']}>{shortComment}</div>
        </div>

        {isLongComment && (
          <div className={clsx(styles['comment-card-footer'], 'w-100')}>
            <button
              className={styles['card_show_more']}
              type="button"
              onClick={openModal}
            >
              查看完整留言
            </button>
          </div>
        )}
      </div>

      {showModal && (
        <Modal onClose={closeModal}>
          <div className={styles['full-comment']}>{comment_text}</div>
        </Modal>
      )}
    </>
  )
}

ReviewCard.propTypes = {
  review: PropTypes.shape({
    userAvatarSrc: PropTypes.string,
    userId: PropTypes.string.isRequired,
    rating: PropTypes.oneOf([0, 1, 2, 3, 4, 5]).isRequired,
    images: PropTypes.arrayOf(PropTypes.string),
    comment_text: PropTypes.string.isRequired,
    color_name: PropTypes.string,
    created_at: PropTypes.string.isRequired,
  }).isRequired,
}

ReviewCard.defaultProps = {
  review: {
    userAvatarSrc:
      'https://i.ibb.co/M5VCPJvM/Screenshot-2025-04-15-at-9-30-59-am.png',
    images: [],
  },
}

export default ReviewCard
