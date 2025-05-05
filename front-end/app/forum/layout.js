'use client'

import './_components/forum.css'
import ComponentsSubNav from './_components/sub-nav'

export default function Layout({ children }) {
  return (
    <>
      <body className="body bg-gray-article">
        <div className="container-lg my-container">
          <div className="row justify-content-center">
            <ComponentsSubNav />
            {children}
          </div>
        </div>
      </body>
    </>
  )
}
