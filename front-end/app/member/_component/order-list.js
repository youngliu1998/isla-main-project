'use client'

import React, { useState } from 'react'
import OrderProdList from './_order-component/order-prod-list'
import './_style.css/order-list.css'

export default function OrderList(props) {
  const [orderTable, setOrderTable] = useState({
    訂單編號: '12345',
    購買日期: '2015-01-01',
    訂單狀態: '',
    結帳金額: '',
    付款方式: '',
    發票號碼: '',
  })
  const [openOrder, setOpenOrder] = useState(false)
  const btnOrderContent = openOrder ? '闔上' : '展開'
  const orderOpenClass = openOrder ? '' : 'close-order'
  return (
    <>
      <div
        className={'d-flex flex-column justify-content-center w-100 order-list'}
      >
        <div
          className={
            'd-flex flex-md-row flex-column overflow-hidden w-100' +
            ' ' +
            orderOpenClass
          }
        >
          {Object.keys(orderTable).map((key, i) => {
            return (
              <div className="order-col" key={i}>
                <div className="order-index">{key}</div>
                <div className="order-content">{orderTable.key}</div>
              </div>
            )
          })}
        </div>

        <OrderProdList />
        {/* button control open */}
        <button
          className="d-md-none d-block btn-order"
          onClick={() => {
            setOpenOrder(!openOrder)
          }}
        >
          {btnOrderContent}
        </button>
      </div>
    </>
  )
}
