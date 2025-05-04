'use client'
import { useEffect } from 'react'
import 'bootstrap/dist/js/bootstrap.bundle.min.js' // 若使用 Modal/Collapse 等元件需引入 JS

export default function BootstrapTestPage() {
  useEffect(() => {
    // bootstrap JS 初始化（可選）
  }, [])

  return (
    <div className="container py-5">
      <h1 className="mb-4">🔧 Bootstrap Component Showcase</h1>

      {/* Buttons */}
      <section className="mb-4">
        <h2>Buttons</h2>
        <button className="btn btn-primary me-2">查看更多</button>
        <button className="btn btn-secondary me-2">查看更多</button>
        <button className="btn btn-add-cart me-2">加入購物袋</button>
        <button className="btn btn-logout me-2">登出</button>
        <button className="btn btn-success me-2">Success</button>
        <button className="btn btn-danger me-2">Danger</button>
        <button className="btn btn-warning me-2">Warning</button>
        <button className="btn btn-info me-2">Info</button>
        <button className="btn btn-light me-2">Light</button>
        <button className="btn btn-dark me-2">Dark</button>
      </section>

      {/* Alerts */}
      <section className="mb-4">
        <h2>Alerts</h2>
        <div className="alert alert-primary">This is a primary alert</div>
        <div className="alert alert-success">This is a success alert</div>
        <div className="alert alert-danger">This is a danger alert</div>
      </section>

      {/* Card */}
      <section className="mb-4">
        <h2>Card</h2>
        <div className="card" style={{ width: '18rem' }}>
          <img
            src="https://via.placeholder.com/150"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title.
            </p>
            <a href="#" className="btn btn-primary">
              Go somewhere
            </a>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="mb-4">
        <h2>Form</h2>
        <form>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
            />
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" />
            <label className="form-check-label">Check me out</label>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </section>

      {/* Modal */}
      <section className="mb-4">
        <h2>Modal</h2>
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Launch demo modal
        </button>

        <div className="modal fade" id="exampleModal" tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modal title</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>
              <div className="modal-body">This is the body of the modal.</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collapse / Accordion */}
      <section className="mb-4">
        <h2>Accordion</h2>
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
              >
                Accordion Item #1
              </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse show">
              <div className="accordion-body">
                This is the first item's accordion body.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navbar */}
      <section className="mb-4">
        <h2>Navbar</h2>
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              Navbar
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Features
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </section>
    </div>
  )
}
