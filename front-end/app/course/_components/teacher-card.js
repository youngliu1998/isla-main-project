import Image from 'next/image'
import Link from 'next/link'

export default function TeacherCard({
  id = '',
  name = '',
  image = '',
  about = '',
}) {
  return (
    <Link href={`course/teacher/${id}`} className="text-decoration-none">
      <div className="card card-hover-teacher">
        <div className="card-img-wrapper-teacher">
          <Image
            src={image}
            className="card-img-teacher"
            alt={name}
            width={300}
            height={300}
          />
          <div className="card-img-overlay d-flex flex-column justify-content-end overlay-teacher">
            <h5 className="card-title-teacher">{name}</h5>
            <p className="card-text-teacher">{about}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
