import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import qs from 'qs'

//這是取得所有商品資料的函式
//範例： const { products, productsLoading, productsError, brands, categories, tags } = useProducts(filters)
//可參考商品列表的使用來參考

export const useProducts = (filters) => {
  const filtersQuery = useQuery({
    queryKey: ['filters'],
    queryFn: async () => {
      const res = await axios.get(
        'http://localhost:3005/api/product-filter/filters',
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      if (res.status !== 200) {
        throw new Error('Failed to fetch filters')
      }
      return res.data
    },
    staleTime: 1000 * 60 * 60,
  })

  const productsQuery = useQuery({
    queryKey: ['products', filters],
    queryFn: async () => {
      const res = await axios.get('http://localhost:3005/api/products', {
        params: filters,
        paramsSerializer: (params) =>
          qs.stringify(params, { arrayFormat: 'brackets' }), // 使用 brackets: categoryIds[]=1&categoryIds[]=2
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (res.status !== 200 || res.data.status !== 'success') {
        throw new Error('Failed to fetch filters')
      }
      return res.data.data
    },
    staleTime: 1000 * 60 * 500, // 5 hours for dev
    enabled: !!filters, // 當 filters 有值才執行
  })

  return {
    brands: filtersQuery.data?.brands || [],
    categories: filtersQuery.data?.categories || [],
    tags: filtersQuery.data?.tags || [],
    filtersLoading: filtersQuery.isLoading,
    filtersError: filtersQuery.error,

    products: productsQuery.data || [],
    productsLoading: productsQuery.isLoading,
    productsError: productsQuery.error,
  }
}

export const UseProductDetail = (id) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3005/api/product/${id}`)
      if (res.status !== 200 || res.data.success !== true) {
        throw new Error('Failed to fetch product reviews')
      }
      return res.data.data
    },
    enabled: !!id, // 確保 id 存在才執行
    staleTime: 1000 * 60 * 10, // 10 分鐘快取
  })
}

export const UseProductReviews = (id) => {
  return useQuery({
    queryKey: ['product-reviews', id],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3005/api/product-reviews/${id}`
      )
      if (res.status !== 200 || res.data.success !== true) {
        throw new Error('Failed to fetch product reviews')
      }
      return res.data.data
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 600,
  })
}

export const UseProductIngredient = (id) => {
  return useQuery({
    queryKey: ['product-ingredient', id],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3005/api/product-ingredient/${id}`
      )
      if (res.status !== 200 || res.data.success !== true) {
        throw new Error('Failed to fetch product reviews')
      }
      return res.data.data
    },
    enabled: !!id, // 確保 id 存在才執行
    staleTime: 1000 * 60 * 10, // 10 分鐘快取
  })
}
