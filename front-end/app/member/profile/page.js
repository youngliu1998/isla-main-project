'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import InputText from '../_component/input-text'
import { useAuth } from '@/hook/use-auth'

export default function ProfilePage() {
  const router = useRouter()
  const { isAuth } = useAuth()
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
    // if no auth, go to login
    if (!isAuth) router.push('login')
    // if get auth, fetch profile data
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
