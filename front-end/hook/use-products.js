import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import qs from 'qs'

export const useProducts = (filters) => {
  const filtersQuery = useQuery({
    queryKey: ['filters'],
    queryFn: async () => {
      const res = await axios.get(
        'http://localhost:3000/api/product-filter/filters',
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
      const res = await axios.get('http://localhost:3000/api/products', {
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
