'use client'
import { useState } from 'react'
import Image from 'next/image'
import MobileSidebar from './mobile-sidebar'
import './dashboard.css'

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <nav className="header-container navbar navbar-expand-lg px-4 py-3 border-bottom bg-white">
        <div className="container-fluid justify-content-between align-items-center">
          <button
            className="hamburger btn btn-outline-secondary d-lg-none me-3"
            onClick={() => setSidebarOpen(true)}
          >
            <i className="bi bi-list fs-4"></i>
          </button>

          <a
            className="navbar-brand text-danger fw-bold fs-4"
            href="/dashboard"
          >
            ISLA Company
          </a>

          <div className="d-flex align-items-center bg-white rounded-3 px-3 py-2 shadow-sm ms-auto">
            <Image
              src="/user.jpg"
              alt="user"
              className="rounded-circle me-2"
              width={40}
              height={40}
            />
            <div className="d-flex flex-column align-items-end me-3">
              <div className="fw-bold">陳琳琳</div>
              <small className="text-muted">管理員</small>
            </div>
            <div className="d-flex gap-2">
              <i className="bi bi-gear"></i>
              <i className="bi bi-box-arrow-right"></i>
            </div>
          </div>
        </div>
      </nav>

      {sidebarOpen && <MobileSidebar onClose={() => setSidebarOpen(false)} />}
    </>
  )
}
