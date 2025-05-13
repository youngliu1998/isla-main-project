import CouponCard from './coupon-card'

export default function CouponList({ coupons, getCouponStyle }) {
  return (
    <div className="row row-cols-lg-2 row-cols-1 justify-content-center mt-3 mt-lg-0 gap-3 gap-lg-0">
      {coupons.map((coupon) => (
        <CouponCard
          key={coupon.id}
          user_id="1"
          coupon_id={coupon.id}
          brand_id={coupon.brand_id}
          course_categories_id={coupon.course_categories_id}
          title={coupon.title}
          description={coupon.description}
          couponstyle={getCouponStyle(coupon.type_id)}
          valid_to={coupon.valid_to}
          area={coupon.area}
        />
      ))}
    </div>
  )
}
