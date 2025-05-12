'use client'

import React, { useState, useEffect } from 'react'
import InputText from '../_component/input-text'
export default function ProfilePage(props) {
  const [text, setText] = useState({
    name: '',
    nickname: '',
    tel: '',
    skinType: '',
    city: '',
    area: '',
    address: '',
  })
  useEffect(() => {
    let profileData = {}
    async function getProfile() {
      try {
        const token = localStorage.getItem('jwtToken')

        const response = await fetch('http://localhost:3005/api/member/login', {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        })

        const data = await response.json()
        profileData = data['data']
        console.log('profileData: ', profileData)
        // setText(profileData)
      } catch (err) {
        console.log(err)
      }
    }
    getProfile()
    if (!profileData) return console.log('no profileData')
  }, [])
  return (
    <>
      <form>
        <div className="user-content">
          <h3>會員資料</h3>
        </div>
        <div className="row row-cols-md-2 row-cols-1 g-4">
          <InputText
            text={text}
            title="本名"
            name="name"
            value={text.name}
            setText={setText}
          />
          <InputText
            text={text}
            title="暱稱"
            name="nickname"
            value={text.nickname}
            setText={setText}
          />
        </div>
      </form>
    </>
  )
}
