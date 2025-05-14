const express = require('express')
const cors = require('cors')
const path = require('path') // Node.js 內建模組，用於處理文件路徑

// --- 範例商品數據 (實際應用中應來自資料庫) ---
let products = [
  {
    productId: 'clio-kill-cover-01',
    imageUrl: '/imgs/1.jpg', // 注意路徑，對應上面的 app.use('/imgs', ...)
    imageAlt: 'CLIO KILL COVER HIGH GLOW FOUNDATION',
    // initialIsFavorited: false, // 收藏狀態通常是用戶相關的，不在通用商品數據中
    rating: 3.5, // 評分
    reviewCount: 4,
    brandName: 'CLIO',
    productName: 'KILL COVER HIGH GLOW FOUNDATION',
    mainPrice: '1,089', // 主價格（可能是特價）
    basicPrice: '1300', // 原價（用於劃線）
    currencySymbol: '$',
    description: '這是一款高光澤粉底液，提供完美的遮瑕效果和水潤光澤。',
    stock: 25, //庫存
    category: '美妝',
  },
  {
    productId: 'samsung-galaxy-s25',
    imageUrl: '/imgs/2.jpg', // 假設你有一個 2.jpg
    imageAlt: 'Samsung Galaxy S25',
    rating: 4.8,
    reviewCount: 152,
    brandName: 'Samsung',
    productName: 'Galaxy S25 Ultra',
    mainPrice: '35,900',
    basicPrice: '38,900',
    currencySymbol: 'NT$',
    description: '最新的旗艦手機，擁有頂級的相機和性能。',
    stock: 10,
    category: '電子產品',
  },
  {
    productId: 'muji-sofa-003',
    imageUrl: '/imgs/3.jpg', // 假設你有一個 3.jpg
    imageAlt: 'Muji Sofa',
    rating: 4.2,
    reviewCount: 38,
    brandName: '無印良品',
    productName: '舒適羽絨沙發 2.5人座',
    mainPrice: '22,500',
    // basicPrice: null, // 如果沒有特價，可以不給 basicPrice
    currencySymbol: 'NT$',
    description: '簡約設計，提供極致的乘坐舒適感。',
    stock: 5,
    category: '家具',
  },
  // ...更多商品
]

// --- API 路由 (Routes) ---

// GET /api/products - 獲取所有商品
app.get('/api/products', (req, res) => {
  // 未來可以加入分頁、篩選、排序等邏輯
  // 例如: const { page = 1, limit = 10, category, sortBy, order = 'asc' } = req.query;
  res.json(products)
})

// GET /api/products/:productId - 獲取單個商品詳情
app.get('/api/products/:productId', (req, res) => {
  const { productId } = req.params
  const product = products.find((p) => p.productId === productId)

  if (product) {
    res.json(product)
  } else {
    res.status(404).json({ message: '商品未找到' })
  }
})

// --- 處理用戶特定操作的端點 (範例，需要用戶驗證和資料庫操作) ---

// POST /api/products/:productId/favorite - 切換收藏狀態 (假設)
// 實際應用中，你需要知道是哪個用戶在操作
app.post('/api/products/:productId/favorite', (req, res) => {
  const { productId } = req.params
  // const userId = req.user.id; // 假設你有用戶驗證中間件，可以獲取用戶 ID

  const product = products.find((p) => p.productId === productId)
  if (!product) {
    return res.status(404).json({ message: '商品未找到' })
  }

  // 這裡只是示意，實際應更新資料庫中該用戶對此商品的收藏狀態
  // 假設有一個用戶收藏列表 userFavorites
  // if (userFavorites.includes(productId)) {
  //     userFavorites = userFavorites.filter(id => id !== productId);
  //     res.json({ productId, isFavorited: false, message: '已取消收藏' });
  // } else {
  //     userFavorites.push(productId);
  //     res.json({ productId, isFavorited: true, message: '已加入收藏' });
  // }
  console.log(`用戶操作：切換商品 ${productId} 的收藏狀態`)
  // 為了演示，我們直接修改範例數據中某個商品的 "模擬" 收藏狀態
  // 這不是一個好的實踐，因為它會影響所有用戶看到的數據
  // product.isFavoritedByCurrentUser = !product.isFavoritedByCurrentUser; // 假設有這個屬性
  res.status(200).json({ message: `商品 ${productId} 收藏狀態已切換 (模擬)` })
})

// POST /api/cart - 加入購物車 (假設)
app.post('/api/cart', (req, res) => {
  const { productId, quantity } = req.body
  // const userId = req.user.id; // 假設有用戶

  if (!productId || !quantity || quantity < 1) {
    return res.status(400).json({ message: '無效的商品 ID 或數量' })
  }
  const product = products.find((p) => p.productId === productId)
  if (!product) {
    return res.status(404).json({ message: '商品未找到' })
  }
  if (product.stock < quantity) {
    return res.status(400).json({ message: '庫存不足' })
  }

  // 實際應用中，應更新資料庫中該用戶的購物車內容
  console.log(`用戶操作：將 ${quantity} 件商品 ${productId} 加入購物車`)
  res
    .status(200)
    .json({
      message: `${quantity} 件 ${product.productName} 已加入購物車 (模擬)`,
    })
})

// --- 根路由 ---
app.get('/', (req, res) => {
  res.send('商品 API 服務已啟動！')
})

// --- 啟動伺服器 ---
app.listen(PORT, () => {
  console.log(`伺服器正在監聽 port ${PORT}`)
  console.log(`API 端點: http://localhost:${PORT}/api/products`)
})
