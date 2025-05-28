import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

// 讀取收藏列表
export const useWishProduct = (token) => {
  return useQuery({
    queryKey: ['wishlist-product'],
    queryFn: async () => {
      const res = await axios.get(
        'http://localhost:3005/api/wish-list/products',
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      return res.data.data
    },
    enabled: !!token, // 有 token 才執行
  })
}
