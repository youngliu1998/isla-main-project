'use client'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const fetchProducts = async () => {
  const res = await axios.get('http://localhost:3000/api/products')
  console.log('後端回傳資料:', res.data)
  return res.data.data
}

export default function ProductPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5,
  })

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      <h1>產品列表</h1>
      <ul>
        {data.map((p) => (
          <li key={p.product_id}>{p.name}</li>
        ))}
      </ul>
    </div>
  )
}
