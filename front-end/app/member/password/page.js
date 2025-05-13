'use client'

import React, { useState } from 'react'
import InputPass from '../_component/input-pass'
import '../_component/_style.css/form.css'
import { useAuth } from '@/hook/use-auth'

export default function PasswordPage() {
  const { user } = useAuth()
  console.log('password-page: ', user)
  const [password, setPassword] = useState({
    oriPass: '',
    newPass: '',
    aginAPass: '',
  })
  return (
    <>
      <form>
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
              name="aginAPass"
              value={password.aginAPass}
              setPassword={setPassword}
            />
          </div>
          <button className="btn btn-primary">修改</button>
        </div>
      </form>
    </>
  )
}
