import {
  LayoutGrid,
  WalletCards,
  Warehouse,
  MessageCircleHeart,
} from 'lucide-react'

export function getMenuList(pathname) {
  return [
    {
      groupLabel: '',
      menus: [
        {
          href: '/dashboard',
          label: '主頁',
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: '管理',
      menus: [
        {
          href: '/products',
          label: '商品',
          icon: Warehouse,
          submenus: [
            {
              href: '/products',
              label: '商品列表',
            },
            {
              href: '/product/new',
              label: '新增商品',
            },
            {
              href: '/product/brands',
              label: '品牌管理',
            },
            {
              href: '/product/categories',
              label: '分類管理',
            },
            {
              href: '/product/tags',
              label: '標籤管理',
            },
            {
              href: '/product/colors',
              label: '顏色管理?',
            },
          ],
        },
        {
          href: '/product/reviews',
          label: '商品評論管理',
          icon: MessageCircleHeart,
        },
        {
          href: '/coupons',
          label: '優惠卷管理',
          icon: WalletCards,
          submenus: [
            {
              href: '/coupons/products',
              label: '商品優惠券',
            },
            {
              href: '/coupons/courses',
              label: '課程優惠券',
            },
            {
              href: '/coupon/new',
              label: '新增優惠券',
            },
          ],
        },
      ],
    },
  ]
}
