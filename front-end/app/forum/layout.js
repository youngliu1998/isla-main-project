'use client'

import './_components/forum.css'
import ComponentsSubNav from './_components/sub-nav'
// import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { useEffect } from 'react'

export default function Layout({ children }) {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js').then((bootstrap) => {
      const tooltipTriggerList = document.querySelectorAll(
        '[data-bs-toggle="tooltip"]'
      )
      const tooltipList = [...tooltipTriggerList].map(
        (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
      )
    })
  }, [])

  return (
    <>
      {/* <body className="body bg-gray-article"> */}
      <div className="body bg-gray-article">
        <div className="container-lg my-container">
          <div className="row justify-content-center">
            <ComponentsSubNav />
            {children}
          </div>
        </div>
      </div>
      {/* </body> */}
    </>
  )
}
