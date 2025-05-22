import { useState, useEffect } from 'react'

//這邊可以幫助你抓到躲在R2伺服器的小im雞，只需要提供資料庫裡的url
// 簡易用法：
// import UseChrisR2ImageUrl
// const url = useImageUrl(filename)
// if (!url) return null
//Duo用法
// import UseChrisR2ImageUrlDuo
//const filenames = imageData.map(img => img.url)
//const fullUrls = useImageUrls(filenames)

const chris_r2_url = 'https://isla-image.chris142852145.workers.dev/'

export function UseChrisR2ImageUrl(filename) {
  const [url, setUrl] = useState()
  useEffect(() => {
    //商品資料庫僅存入商品名
    if (!filename) {
      setUrl(null)
      return
    }
    setUrl(chris_r2_url + (filename))
  }),
    [filename]
  return url
}

export function UseChrisR2ImageUrlDuo(filenames = []) {
  const [urls, setUrls] = useState([])

  useEffect(() => {
    if (!Array.isArray(filenames) || filenames.length === 0) {
      setUrls([])
      return
    }
    const newUrls = filenames.map((url) => chris_r2_url + (url))
    setUrls(newUrls)
  }, [filenames])

  return urls
}
