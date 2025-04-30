import './_styles/style.css'
import SideBar from './_component/side-bar'
export default function MemberLayout({ children }) {
  return (
    <>
      <div className="container container-user">
        <div className="row justify-content-center g-5">
          <aside className="col-lg-3 col-12 flex-lg-column">
            <SideBar />
          </aside>
          {/* main-content */}
          <div className="col-lg-9 col-12">
            {children}
            {/* you can delete that, just demo */}
            <div className="height-demo bg-black" />
          </div>
        </div>
      </div>
    </>
  )
}
