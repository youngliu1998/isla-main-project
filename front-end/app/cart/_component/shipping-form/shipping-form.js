import styles from './shipping-form.module.scss'
import { useState } from 'react'

export default function ShippingForm() {
  const [shippingWay, setShippingWay] = useState('home')
  const [memberInfo, setMemberInfo] = useState(false)

  return (
    <form method="POST" action="" id="formHome" className="card-style mb-4 p-4">
      <h5 className="fw-bold mb-5 text-maintext">商品配送方式</h5>

      {/* 宅配 */}
      <div className="d-flex justify-content-between">
        <div className="form-check mb-3">
          <input
            // className="form-check-input"
            className={`${styles.radioInput} form-check-input`}
            type="radio"
            name="shipping"
            id="radioShipHome"
            value="home"
            checked={shippingWay === 'home'}
            onChange={() => setShippingWay('home')}
          />
          <label htmlFor="radioShipHome" className="form-check-label">
            宅配到府
          </label>
        </div>
        <small>
          <del className="me-2 text-subtext">運費 NT$100</del>
          <span className="text-secondary">達免運門檻</span>
        </small>
      </div>

      {shippingWay === 'home' && (
        <div className="shipInfo d-flex flex-column">
          <div className="form-check mb-3 ms-4">
            <input
              className={`${styles.checkboxInput} form-check-input`}
              type="checkbox"
              id="sameAsMember"
              checked={memberInfo}
              onChange={() => setMemberInfo(!memberInfo)}
            />
            <label htmlFor="sameAsMember" className="form-check-label">
              收件人資料與會員資料相符
            </label>
          </div>
          <div id="recipientForm" className="mb-4 ms-4">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                收件人姓名*
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="真實姓名"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                聯絡電話*
              </label>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                placeholder="聯絡電話"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                寄送地址*
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                placeholder="請輸入地址"
              />
            </div>
          </div>
        </div>
      )}

      {/* 超商取貨選項 */}
      <div className="d-flex justify-content-between">
        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="radio"
            name="shipping"
            id="radioShip711"
            value="711"
            checked={shippingWay === '711'}
            onChange={() => setShippingWay('711')}
          />
          <label htmlFor="radioShip711" className="form-check-label">
            超商取貨
          </label>
        </div>
        <small>
          <del className="me-2 text-subtext">運費 NT$100</del>
          <span className="text-secondary">達免運門檻</span>
        </small>
      </div>

      {shippingWay === '711' && (
        <div id="store711Info" className="d-flex flex-column ms-4 p-3">
          <h6 className="fw-bold mb-3 text-subtext">選擇 7-11 取貨門市</h6>
          <div className="form-check mb-3">
            <label htmlFor="storeName" className="me-2">
              門市名稱
            </label>
            <input
              className="w-50"
              type="text"
              name="storeName"
              id="storeName"
              defaultValue="永信門市"
            />
          </div>
          <div className="d-flex flex-column">
            <div className="form-check mb-3">
              <label htmlFor="storeAddress" className="me-2">
                門市地址
              </label>
              <input
                className="w-50"
                type="text"
                name="storeAddress"
                id="storeAddress"
                defaultValue="台北市信義區永吉路30巷10號"
              />
            </div>
            <button className="btn btn-secondary btn-sm ms-auto">
              變更門市
            </button>
          </div>
        </div>
      )}
    </form>
  )
}
