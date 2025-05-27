import {
  Tag,
  Users,
  Settings,
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
          href: '',
          label: '商品',
          icon: Warehouse,
          submenus: [
            {
              href: '/posts',
              label: '商品上架',
            },
            {
              href: '/posts/new',
              label: '商品維護',
            },
          ],
        },
        {
          href: '/categories',
          label: '商品評論管理',
          icon: MessageCircleHeart,
        },
        {
          href: '/tags',
          label: '優惠卷管理',
          icon: WalletCards,
        },
      ],
    },
    {
      groupLabel: 'Settings',
      menus: [
        {
          href: '/users',
          label: 'Users',
          icon: Users,
        },
      ],
    },
  ]
}
