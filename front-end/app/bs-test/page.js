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
        <button className="btn btn-add-cart me-2">加入購物車</button>
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
        <div className="alert alert-secondary">This is a secondary alert</div>
        <div className="alert alert-info">This is a info alert</div>
        <div className="alert alert-warning">This is a warning alert</div>
        <div className="alert alert-light">This is a light alert</div>
        <div className="alert alert-dark">This is a dark alert</div>
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
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" disabled />
            <label className="form-check-label">disabled</label>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </section>

      <section>
        <div className="container py-5">
          <h2 className="mb-4">Input 測試區</h2>
          {/* Text input */}
          <div className="mb-3">
            <label htmlFor="inputText" className="form-label">
              Text Input
            </label>
            <input
              type="text"
              className="form-control"
              id="inputText"
              placeholder="輸入文字"
            />
          </div>
          {/* Email input */}
          <div className="mb-3">
            <label htmlFor="inputEmail" className="form-label">
              Email Input
            </label>
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              placeholder="name@example.com"
            />
          </div>
          {/* Password input */}
          <div className="mb-3">
            <label htmlFor="inputPassword" className="form-label">
              Password Input
            </label>
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              placeholder="密碼"
            />
          </div>
          {/* Disabled input */}
          <div className="mb-3">
            <label htmlFor="inputDisabled" className="form-label">
              Disabled Input
            </label>
            <input
              type="text"
              className="form-control"
              id="inputDisabled"
              disabled=""
              placeholder="無法輸入"
            />
          </div>
          {/* Readonly input */}
          <div className="mb-3">
            <label htmlFor="inputReadonly" className="form-label">
              Readonly Input
            </label>
            <input
              type="text"
              className="form-control"
              id="inputReadonly"
              readOnly=""
              defaultValue="唯讀內容"
            />
          </div>
          {/* Checkbox */}
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="checkBoxTest"
            />
            <label className="form-check-label" htmlFor="checkBoxTest">
              Checkbox 選項
            </label>
          </div>
          {/* Radio */}
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="radio"
              name="radioTest"
              id="radio1"
              defaultChecked=""
            />
            <label className="form-check-label" htmlFor="radio1">
              單選一
            </label>
          </div>
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="radio"
              name="radioTest"
              id="radio2"
            />
            <label className="form-check-label" htmlFor="radio2">
              單選二
            </label>
          </div>
          {/* Valid input */}
          <div className="mb-3">
            <label htmlFor="inputValid" className="form-label">
              Valid Input
            </label>
            <input
              type="text"
              className="form-control is-valid"
              id="inputValid"
              defaultValue="合法輸入"
            />
            <div className="valid-feedback">看起來沒問題！</div>
          </div>
          {/* Invalid input */}
          <div className="mb-3">
            <label htmlFor="inputInvalid" className="form-label">
              Invalid Input
            </label>
            <input
              type="text"
              className="form-control is-invalid"
              id="inputInvalid"
              defaultValue="錯誤輸入"
            />
            <div className="invalid-feedback">請填入正確資料</div>
          </div>
        </div>
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
                成份&分析
              </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse show">
              <div className="accordion-body">
                異十二烷、環五聚二甲基矽氧烷、三甲基矽烷氧基矽酸酯、微晶蠟、氫化聚異丁烯、VP/二十碳烯共聚物、二甲基甲矽烷基化矽石、二氧化矽、二硬脂基二甲基胺鋰皂石、三羥基硬脂精、纖維素、碳酸丙烯酯、硬脂醯菊粉、三乙氧基辛基矽烷、乙基己基甘油、丁羥甲苯、印度簕竹莖粉、透明質酸鈉、乙醇、泛醇、生育酚、絲胺基酸、苯氧乙醇、鐵氧化物
                (ci 77499)、人工絲、黑 2 (ci 77266)。
              </div>
            </div>
          </div>
        </div>
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
              >
                免責聲明
              </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse show">
              <div className="accordion-body">
                ISLA
                一直努力確保其商品圖像和信息的準確性，但制造商對包裝和/或配料的一些變更，我們網站也需要時間來更新。所以您在購買某款商品的時候，
                可能有時候正遇到信息在更新等待隊列中。雖然產品可能會偶爾發貨替代包裝，但正品品質和新鮮度始終有保證。我們建議您在使用產品前閱讀所有的產品標簽、警告和說明，而不是僅依賴
                ISLA
                網站提供的信息。本網站銷售的商品或相關陳述，未經美國食品與藥品管理局認證，不具有預防疾病或治療功能，不能代替藥物，不被用於診斷、治療、治愈、支持或緩解任何疾病。本網站銷售的商品從生產到規格均為國際標準，可能與買家所在地標準不同，購買前請務必知悉。
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
