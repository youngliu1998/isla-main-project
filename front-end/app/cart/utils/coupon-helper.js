// 根據勾選商品，回傳這張券能不能用，以及不能用的理由

export function checkCouponStatus(coupon, selectedItems, totalAmount) {
  // debug brand_id=5 的優惠券
  // if (String(coupon.brand_id) === '5') {
  //   const kajaItems = selectedItems.filter((i) => String(i.brand_id) === '5')
  //   const kajaTotal = kajaItems.reduce(
  //     (sum, item) => sum + (item.sale_price ?? item.base_price) * item.quantity,
  //     0
  //   )
  //   console.log('[Kaja券判斷] 勾選商品：', kajaItems)
  //   console.log(
  //     '[Kaja券判斷] 勾選商品總金額：',
  //     kajaTotal,
  //     '券條件需滿：',
  //     coupon.min_amount
  //   )
  // }

  // 篩選出與 這張優惠券 條件符合的商品
  const relatedItems = selectedItems.filter((item) => {
    const itemBrand = parseInt(item.brand_id)
    const itemCategory = parseInt(item.category_id)
    const couponBrand = parseInt(coupon.brand_id)
    const couponCategory = parseInt(coupon.category_id)

    const matchBrand = couponBrand === 0 || itemBrand === couponBrand
    const matchCategory =
      couponCategory === 0 || itemCategory === couponCategory

    return matchBrand && matchCategory
  })
  // 只算 符合條件的商品金額
  const relatedTotalAmount = relatedItems.reduce(
    (sum, item) => sum + (item.sale_price ?? item.base_price) * item.quantity,
    0
  )

  if (relatedItems.length === 0) {
    return {
      is_applicable: false,
      block_reason: '購物車中沒有符合條件的商品',
    }
  }
  // min_quantity 不符合
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
  // 金額不足
  // console.log('[金額判斷]', {
  //   relatedTotalAmount,
  //   min_amount: coupon.min_amount,
  //   min_amount_type: typeof coupon.min_amount,
  // })
  if (coupon.min_amount && relatedTotalAmount < Number(coupon.min_amount)) {
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
