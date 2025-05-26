'use client'

import React, { useState } from 'react'
import InputPass from '../_component/input-pass'
import '../_component/_style.css/form.css'

export default function PasswordPage() {
  const defaultPass = {
    oriPass: '',
    newPass: '',
    againPass: '',
  }
  const [password, setPassword] = useState({ ...defaultPass })
  const [error, setError] = useState({ ...defaultPass })
  // console.log(password)
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

      // ==== 清除上次錯誤提示 ====
      setError({ ...defaultPass })
      // ==== 處理資料 ====
      if (response.ok) {
        // ==== 200 status: success ====
        if (data.status === 'success') {
          alert('修改密碼成功')
        }
      } else {
        // ==== 404 status: error ====
        let newError = { ...defaultPass }
        const serverErrors = data.errors
        if (Array.isArray(serverErrors)) {
          // console.log('Errors: ', serverErrors)
          serverErrors.forEach((serverError) => {
            switch (serverError.path) {
              case 'oriPass':
                newError = { ...newError, ['oriPass']: serverError.msg }
                break
              case 'newPass':
                newError = { ...newError, ['newPass']: serverError.msg }
                break
              case 'againPass':
                newError = { ...newError, ['againPass']: serverError.msg }
                break
            }
          })

          setError(newError)
        } else {
          console.log('未知錯誤')
        }
      }
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
              errorMsg={error.oriPass}
            />
            <div className="bottom-line"></div>
            <InputPass
              password={password}
              title="新密碼"
              name="newPass"
              value={password.newPass}
              setPassword={setPassword}
              errorMsg={error.newPass}
            />
            <InputPass
              password={password}
              title="再輸入一次"
              name="againPass"
              value={password.againPass}
              setPassword={setPassword}
              errorMsg={error.againPass}
            />
          </div>
          <button className="btn btn-primary">修改</button>
        </div>
      </form>
    </>
  )
}
