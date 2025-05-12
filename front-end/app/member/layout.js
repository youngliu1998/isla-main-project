import './_styles/style.css'
import SideBar from './_component/side-bar'
import LayouComponent from './_component/layout-component'
export default function MemberLayout({ children }) {
  return (
    <>
      <div className="container container-user">
        <div className="row justify-content-center">
          <SideBar />
          {/* main-content */}
          <div className="col-lg-9 col-12">{children}</div>
        </div>
      </div>
    </>
  )
}
