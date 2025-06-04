export default async function getProduct(search = '') {
  if (search === '') return []
  let error = ''
  const products = await fetch(
    'http://localhost:3005/api/forum/posts/header-search',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ keyword: search }),
    }
  )
    .then(async (data) => await data.json())
    .then((data) => data['data'])
    .catch((err) => {
      error = err
      return []
    })

  if (error) {
    console.log('getProduct error', error)
    return [{ title: '', nickname: '', ava_img: '', catName: '' }]
  }
  // console.log('get product:', products)
  return products.map((product) => {
    return {
      title: product.title,
      productImg: '133692/1.jpg',
      price: 3000,
      brand: 'Unleashia',
    }
  })
}
