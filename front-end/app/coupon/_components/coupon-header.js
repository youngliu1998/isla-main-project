import Link from 'next/link'
export default function CouponHeader({ type = ' ', hasMemberCoupon = false }) {
  const titleMap = {
    product: '優惠券專區 - 商品',
    course: '優惠券專區 - 課程',
    member: '我的優惠券',
  }

  return (
    <>
      {/* 電腦版標題 */}
      <div className="d-none d-md-flex align-items-center ps-3">
        <h2 className="me-3 mb-0">{titleMap[type]}</h2>
        {type === 'member' && !hasMemberCoupon && (
          <Link
            href="/coupon/create"
            className="personal-coupon-tab text-decoration-none"
          >
            🎁 專屬優惠券
          </Link>
        )}
      </div>

      {/* 手機版標題 */}
      {/* <div className="d-flex d-md-none py-3 px-5 bg-white justify-content-center">
        <h4 className="sub-color">菜單</h4>
      </div> */}
    </>
  )
}
