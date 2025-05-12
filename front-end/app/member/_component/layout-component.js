'use client'

import SideBar from './side-bar'
import { usePathname } from 'next/navigation'

export default function LayouComponent({ children }) {
  const pathname = usePathname()
  if (pathname.includes('login'))
    return (
      <>
        <div className="d-flex justify-content-center align-items-center">
          {children}
        </div>
      </>
    )
  return (
    <>
      <div className="container container-user">
        <div className="row justify-content-center">
          <aside className="col-lg-3 col-12 flex-lg-column">
            <SideBar />
          </aside>
          {/* main-content */}
          <div className="col-lg-9 col-12">{children}</div>
        </div>
      </div>
    </>
  )
}
