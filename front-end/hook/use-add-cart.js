import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

//這是加入購物車的函式(by chai)
//範例：
// addToCart({
//     product_id: 109129,
//     quantity: 1,
//     color_id: 114,
//   }, {
//     onSuccess: (data) => {
//       console.log("加入成功：", data);
//     },
//     onError: (err) => {
//       console.error("加入購物車失敗：", err);
//     },
//   });

export const useAddCart = (token) => {
  return useMutation({
    mutationFn: async ({ product_id, quantity, color_id }) => {
      const res = await axios.post(
        `http://localhost:3005/api/cart-items/create`,
        {
          product_id,
          quantity,
          color_id,
        },
        {
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return res.data
    },
  })
}
