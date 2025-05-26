import Header from './_components/header'
import PcSidebar from './_components/pc-sidebar'
import Footer from './_components/footer'

export default function DashboardLayout({ children }) {
  return (
    <div style={{ marginTop: '-80px' }}>
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
    </div>
  )
}
