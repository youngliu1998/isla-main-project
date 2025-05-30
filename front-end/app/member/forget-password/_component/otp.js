'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import InputText from '../../_component/input-text'
import InputPass from '../../_component/input-pass'

export default function Otp({ email }) {
  const router = useRouter()
  // ==== otp & password set state ====
  const defaultOtp = { otp: '' }
  const defaultPass = {
    newPass: '',
    againPass: '',
  }
  const [error, setError] = useState({ ...defaultPass })
  const [otp, setOtp] = useState({ ...defaultOtp })
  const [password, setPassword] = useState({ ...defaultPass })
  // ==== 表單處理 ====
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(
        'http://localhost:3005/api/member/forget-pass/verify-otp',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...password, ...otp, ...email }),
        }
      ).catch((err) => {
        console.log(err)
      })
      const data = await response.json()
      if (response.ok) {
        alert('修改成功，返回登入')
        router.push('/member/login')
      } else {
        // ==== 404 status: error ====
        let newError = { ...defaultPass }
        const serverErrors = data.errors
        console.log(serverErrors)
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
        }
      }
    } catch (err) {
      console.log(err)
    }
  }
  // console.log({ ...password, ...otp, ...email })
  return (
    <>
      <form
        className="d-flex flex-column align-items-center w-100 login-form"
        onSubmit={handleSubmit}
      >
        <div className="login-input-block">
          <InputPass
            title={'請輸入新密碼'}
            name="newPass"
            value={password.newPass}
            password={password}
            setPassword={setPassword}
            errorMsg={error.newPass}
          />
        </div>
        <div className="login-input-block">
          <InputPass
            title={'再輸入一次'}
            name="againPass"
            value={password.againPass}
            password={password}
            setPassword={setPassword}
            errorMsg={error.againPass}
          />
        </div>
        <div className="login-input-block">
          <InputText
            title={'請輸入6位數認證'}
            name="otp"
            value={otp.otp}
            text={otp}
            setText={setOtp}
          />
        </div>

        <div className="text-danger">請在五分鐘內輸入</div>

        <button className="btn btn-primary">確認送出</button>
      </form>
    </>
  )
}
