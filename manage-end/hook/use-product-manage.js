import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import qs from 'qs'
import { useMemo } from 'react'

const fetchProductDetail = async (id) => {
  const res = await axios.get(`http://localhost:3005/api/product/edit/${id}`)
  if (res.status !== 200 || res.data?.success !== true || !res.data?.data) {
    throw new Error('資料庫查無商品資料')
  }
  return res.data.data
}

export const updateProduct = async (productData) => {
  const { product_id } = productData

  if (!product_id) {
    throw new Error('呼叫 API 時缺少 product_id')
  }

  try {
    const res = await axios.put(
      `http://localhost:3005/api/product/edit/${product_id}`,
      productData
    )

    // 即使 status 是 200，後端也可能回傳 { success: false }
    if (res.data?.success === false) {
      throw new Error(res.data?.message || '商品更新失敗')
    }

    // 成功時，回傳後端給的資料
    return res.data
  } catch (error) {
    // 當 axios 請求失敗 (如 4xx, 5xx 錯誤) 或發生其他錯誤時
    // 從 axios 的 error 物件中提取更詳細的錯誤訊息
    const errorMessage =
      error.response?.data?.message || error.message || '發生未知的網路錯誤'

    // 將錯誤再次拋出，讓 React Query 的 onError 回呼可以接收到
    throw new Error(errorMessage)
  }
}

//TODO 加上token驗證
export const useProductManageList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['product-manage-list'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:3005/api/products', {
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          limit: 99999,
          offset: 0,
        },
      })
      if (res.status !== 200 || res.data.status !== 'success') {
        throw new Error('獲取商品失敗')
      }
      return res.data.data
    },
    staleTime: 1000 * 60 * 5,
    //預留token驗證
    // enabled: !!token
  })
  const queryClient = useQueryClient()
  const updateProductMutation = useMutation({
    mutationFn: updateProductAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(['product-manage-list']) // 重新取得
    },
    onError: (error) => {
      console.log('Product update hook Error', error)
    },
  })

  const updateProduct = async (updatedProduct) => {
    return await updateProductMutation.mutateAsync({
      ...updatedProduct,
      product_id: product.product_id,
      images: Array.isArray(updatedProduct.images) ? updatedProduct.images : [],
      sale_price: updatedProduct.sale_price ?? null,
      sale_start_date: updatedProduct.sale_start_date ?? null,
      sale_end_date: updatedProduct.sale_end_date ?? null,
      updatedAt: new Date().toISOString().split('T')[0],
    })
  }

  return {
    products: data || [],
    loading: isLoading,
    productError: error,
    updateProduct, // 用來觸發更新
    updateStatus: {
      isPending: updateProductMutation.isPending,
      isSuccess: updateProductMutation.isSuccess,
      isError: updateProductMutation.isError,
      error: updateProductMutation.error,
    },
  }
}

export const useProductManageDelete = () => {
  const { isLoading, error } = useQuery({
    queryKey: ['product-manage-list'],
    queryFn: async () => {
      const res = await axios.delete('http://localhost:3005/api/products', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (res.status !== 200 || res.data.status !== 'success') {
        throw new Error('獲取商品失敗')
      }
      return res
    },
    staleTime: 1000 * 60 * 5,
    //預留token驗證
    // enabled: !!token
  })
  return {
    loading: isLoading,
    productError: error,
  }
}

export function useMutipleOptions() {
  return useQuery({
    queryKey: ['muti-select-options'],
    queryFn: async () => {
      const res = await fetch(
        'http://localhost:3005/api/product-filter/filters/manage'
      )
      if (!res.ok) throw new Error('錯誤，資料截取失敗')
      return res.json()
    },
  })
}
