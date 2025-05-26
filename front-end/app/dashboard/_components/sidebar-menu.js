const menuItems = [
  {
    id: 'member',
    name: '會員',
    basePath: '/dashboard/member',
    children: [{ name: '會員列表', href: '/dashboard/member' }],
  },
  {
    id: 'course',
    name: '課程',
    basePath: '/dashboard/course',
    children: [{ name: '課程管理', href: '/dashboard/course' }],
  },
  {
    id: 'product',
    name: '商品',
    basePath: '/dashboard/product',
    children: [{ name: '商品列表', href: '/dashboard/product' }],
  },
  {
    id: 'coupon',
    name: '優惠券',
    basePath: '/dashboard/coupon',
    children: [{ name: '優惠券列表', href: '/dashboard/coupon' }],
  },
]

export default menuItems
