'use client'

export default function CouponButton({ text = '' }) {
  return (
    <>
      <div className="text-group white d-flex flex-column gap-2">
        {text.split('').map((char, index) => (
          <h5 key={index} className="mb-0 fw-light">
            {char}
          </h5>
        ))}
      </div>
    </>
  )
}
