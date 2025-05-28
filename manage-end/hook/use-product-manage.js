import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import qs from 'qs'

export const useProductManage = (
  filters = {},
  { pageSize = 20, pageIndex = 0 } = {}
) => {
  const parsedFilters = {
    name: filters.name || '',
    brandId: filters.brandId || null,
    categoryId: filters.categoryId || null,
    status: filters.status || '',
    limit: pageSize,
    offset: pageIndex * pageSize,
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ['admin-products', parsedFilters],
    queryFn: async () => {
      const res = await axios.get('http://localhost:3005/api/admin/products', {
        params: parsedFilters,
        paramsSerializer: (params) =>
          qs.stringify(params, { arrayFormat: 'brackets' }),
      })
      return res.data
    },
  })

  return {
    products: data?.products || [],
    total: data?.total || 0,
    isLoading,
    error,
  }
}
