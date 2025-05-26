import { useState } from 'react'
import Image from 'next/image'
import { Modal, Button } from 'react-bootstrap'

export default function PictureShowAll({ reviewImages = [] }) {
  const [showModal, setShowModal] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleShowMore = () => setShowModal(true)
  const handleClose = () => setShowModal(false)

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviewImages.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === reviewImages.length - 1 ? 0 : prev + 1))
  }

  return (
    <>
      <div className="comment-sidebar-photos-box">
        <div className="comment-sidebar-photos-title">所有圖片</div>
        <div className="comment-sidebar-photos">
          {reviewImages.slice(0, 6).map(({ imageUrl }, i) => (
            <button key={i} className="comment-img" type="button">
              <Image
                className="img-fluid"
                src={imageUrl}
                alt={`評論圖片 ${i + 1}`}
                width={0}
                height={0}
              />
            </button>
          ))}
        </div>

        <button
          className="comment-sidebar-photos-show-more"
          type="button"
          onClick={handleShowMore}
        >
          查看全部
        </button>
      </div>

      {/* Modal 顯示區 */}
      <Modal show={showModal} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>所有圖片</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {reviewImages.length > 0 && (
            <Image
              src={reviewImages[currentIndex].imageUrl}
              alt={`評論圖片 ${currentIndex + 1}`}
              width={600}
              height={600}
              className="img-fluid"
              style={{ objectFit: 'contain', maxHeight: '60vh' }}
            />
          )}
        </Modal.Body>
        <Modal.Footer className="justify-content-between">
          <Button variant="secondary" onClick={handlePrev}>
            上一張
          </Button>
          <span>{`${currentIndex + 1} / ${reviewImages.length}`}</span>
          <Button variant="secondary" onClick={handleNext}>
            下一張
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
