'use client'

import React, { useState } from 'react'
import InputPass from '../_component/input-pass'
import '../_component/_style.css/form.css'

export default function PasswordPage() {
  const [password, setPassword] = useState({
    oriPass: '',
    newPass: '',
    againPass: '',
  })
  console.log(password)
  // ==== 修改密碼(設定) ====
  async function changePass() {
    try {
      const token = localStorage?.getItem('jwtToken') || null
      if (!token) return
      const response = await fetch(
        'http://localhost:3005/api/member/password',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(password),
        }
      )
      const data = await response.json()
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }
  // ==== END 修改密碼(設定) ====
  // ==== 提交表單(設定)
  const handleSubmit = (e) => {
    e.preventDefault()
    changePass()
  }
  // ==== END 提交表單(設定)
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="user-content">
          <h3>密碼變更</h3>
          <div className="row row-cols-1 gy-4">
            <InputPass
              password={password}
              title="當前密碼"
              name="oriPass"
              value={password.oriPass}
              setPassword={setPassword}
            />
            <div className="bottom-line"></div>
            <InputPass
              password={password}
              title="新密碼"
              name="newPass"
              value={password.newPass}
              setPassword={setPassword}
            />
            <InputPass
              password={password}
              title="再輸入一次"
              name="againPass"
              value={password.againPass}
              setPassword={setPassword}
            />
          </div>
          <button className="btn btn-primary">修改</button>
        </div>
      </form>
    </>
  )
}
