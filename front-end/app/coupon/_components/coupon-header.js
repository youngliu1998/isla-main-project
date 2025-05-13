export default function CouponHeader({ type = ' ' }) {
  const titleMap = {
    product: '優惠券專區 - 商品',
    course: '優惠券專區 - 課程',
  }

  return (
    <>
      <h2 className="d-none d-md-flex">{titleMap[type]}</h2>
      <div className="d-flex d-md-none py-3 px-5 bg-white justify-content-center">
        <h4 className="sub-color">菜單</h4>
      </div>
    </>
  )
}
