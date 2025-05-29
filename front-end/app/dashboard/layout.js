'use client'

import BootstrapClient from '../_dashboard-components/bootstrap/bootstrap-client'
import Header from '../_dashboard-components/header/header'
import PcSidebar from '../_dashboard-components/sidebar/pc-sidebar'
import Footer from '../_dashboard-components/footer/footer'
import '../_dashboard-components/dashboard.css'

export default function DashboardLayout({ children }) {
  return (
    <>
      <BootstrapClient />
      <Header />
      <div className="container-fluid">
        <div className="row">
          <aside className="d-none d-lg-block col-lg-2 border-end px-3 py-4">
            <PcSidebar />
          </aside>
          <main className="col-lg-10 col-md-12 p-4">{children}</main>
        </div>
      </div>
      <Footer />
    </>
  )
}
