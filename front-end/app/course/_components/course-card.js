import Image from 'next/image'
import Link from 'next/link'

export default function CourseCard({
  id = '',
  picture = '',
  tag = '',
  title = '',
  teacher = '',
  rating = {},
  student = {},
  price = {},
  discount = {},
}) {
  const renderStars = () => {
    const fullStars = Math.floor(rating)
    const halfStar = rating % 1 >= 0.5
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0)

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <i className="bx bxs-star" key={`full-${i}`} />
        ))}
        {halfStar && <i className="bx bxs-star-half" />}
        {[...Array(emptyStars)].map((_, i) => (
          <i className="bx bx-star" key={`empty-${i}`} />
        ))}
      </>
    )
  }

  return (
    <Link href={`/course/course-list/${id}`} className="col mb-5">
      <div className="card h-100 card-hover-course" data-course-id={id}>
        <div className="card-img-container-course">
          <Image
            src={picture}
            alt={title}
            width={800}
            height={450}
            className="card-img-top-course"
          />
          <div className="heart-icon-course">
            <i className="bx bx-heart" />
          </div>
        </div>
        <div className="card-body">
          <button className="btn card-btn-course mb-2">{tag}</button>
          <h5 className="card-title mb-2">{title}</h5>
          <p className="card-teacher-course mb-2">{teacher}</p>

          <div className="d-flex align-content-center">
            <div className="mb-2 me-3 card-score-course">
              {rating} {renderStars()}
            </div>
            <div className="d-flex">
              <i className="bi bi-people me-2" />
              <div className="card-people-course">
                {student.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="d-flex align-items-end text-end">
            <h5 className="card-text me-3">NT {price}</h5>
            <p className="card-text-discount m-0">NT {discount}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
