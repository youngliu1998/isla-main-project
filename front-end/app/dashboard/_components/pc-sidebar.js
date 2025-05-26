'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import menuItems from './sidebar-menu'

export default function PcSidebar() {
  const pathname = usePathname()
  const [isClient, setIsClient] = useState(false)

  // 避免 hydration mismatch
  useEffect(() => {
    setIsClient(true)
  }, [])

  // 初始展開符合當前路徑的選單
  const [openMenus, setOpenMenus] = useState(() => {
    const initial = {}
    for (let item of menuItems) {
      if (pathname.startsWith(item.basePath)) {
        initial[item.id] = true
      }
    }
    return initial
  })

  // 點選展開/收合
  const toggleMenu = (id) => {
    setOpenMenus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <ul className="nav flex-column">
      {menuItems.map((item) => {
        const isOpen = openMenus[item.id] || false
        return (
          <li className="nav-item" key={item.id}>
            <button
              onClick={() => toggleMenu(item.id)}
              className="btn btn-toggle d-flex justify-content-between align-items-center w-100 text-start"
            >
              <span>{item.name}</span>
              <i
                className={`bi bi-chevron-right toggle-icon ${isOpen ? 'rotate' : ''}`}
              />
            </button>

            <ul
              className={`submenu nav flex-column ms-3 mt-1 ${isOpen ? 'open' : ''}`}
            >
              {item.children.map((child, index) => {
                const isActive = isClient && pathname === child.href
                return (
                  <li key={index}>
                    <Link
                      href={child.href}
                      className={`nav-link ${isActive ? 'active' : ''}`}
                    >
                      {child.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </li>
        )
      })}
    </ul>
  )
}
