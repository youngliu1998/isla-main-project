import './_styles/style.css'
import SideBar from './_component/side-bar'
export default function MemberLayout({ children }) {
  return (
    <>
      <div className="container container-user">
        <div className="row justify-content-center">
          <SideBar />
          {/* main-content */}
          <div className="col">{children}</div>
        </div>
      </div>
    </>
  )
}
