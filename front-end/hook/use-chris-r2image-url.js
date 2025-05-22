import { useState, useEffect } from 'react'

//這邊可以幫助你抓到躲在R2伺服器的小im雞，只需要提供資料庫裡的url
// 簡易用法：
// const url = useImageUrl(filename)
// if (!url) return null

const chris_r2_url = 'https://isla-image.chris142852145.workers.dev/'

export default function UseChrisR2ImageUrl(filename) {
  const [url, setUrl] = useState()
  useEffect(() => {
    //商品資料庫僅存入商品名
    if (!filename) {
      setUrl(null)
      return
    }
    setUrl(chris_r2_url + encodeURIComponent(filename))
  }),
    [filename]
  return url
}
