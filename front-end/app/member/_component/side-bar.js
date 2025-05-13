'use client'

import './side-bar.css'

export default function SideBar() {
  return (
    <>
      {/* aside-bar */}
      <div className="d-flex flex-column align-items-center gap-2 w-100 user-basic-info">
        <div className="avartar" />
        <h4 className="title">DDDDDD</h4>
        <p>gamil@.com</p>
        <div>登出</div>
      </div>
      {/* panel */}
      <div className="d-flex flex-column align-items-center d-lg-block d-none user-panel">
        <ul>
          <li className="title">個人</li>
          <li>基本資料</li>
          <li>密碼變更</li>
        </ul>
        <ul>
          <li className="title">購物</li>
          <li>願望清單</li>
          <li>我的優惠券</li>
          <li>訂單紀錄</li>
        </ul>
        <ul>
          <li className="title">商品</li>
          <li>查看文章</li>
          <li>客服資訊</li>
        </ul>
        <ul>
          <li className="title">我的論壇</li>
          <li>我的文章</li>
          <li>追蹤對象</li>
          <li>文章蒐藏</li>
        </ul>
      </div>
    </>
  )
}
