export function checkCouponStatus(coupon, cartItems, totalAmount) {
  const relatedItems = cartItems.filter((item) => {
    const matchBrand =
      coupon.brand_id === 0 || item.brand_id === coupon.brand_id
    const matchCategory =
      coupon.category_id === 0 || item.category_id === coupon.category_id
    return matchBrand && matchCategory
  })

  const totalQuantity = relatedItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  )

  if (coupon.min_quantity && totalQuantity < coupon.min_quantity) {
    return {
      is_applicable: false,
      block_reason: `選購 ${coupon.min_quantity} 件即可使用`,
    }
  }

  if (coupon.min_amount && totalAmount < coupon.min_amount) {
    return {
      is_applicable: false,
      block_reason: `需滿 $NT${coupon.min_amount} 才可使用`,
    }
  }

  return {
    is_applicable: true,
    block_reason: null,
  }
}
