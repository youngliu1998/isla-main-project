export default function DataStatus({ isLoading, isError }) {
  if (isError) return <p>伺服器忙線中，稍後再試</p>
  if (isLoading) return <p>載入中...</p>
  return null
}
