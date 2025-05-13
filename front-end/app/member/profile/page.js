'use client'

import '../_component/_style.css/form.css'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import InputText from '../_component/input-text'
import Select from '../_component/select'
import { useAuth } from '@/hook/use-auth'
import { cities } from './data/CityCountyData'

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
  let user = {}
  const [citySelect, setCitySelect] = useState({
    CityName: '',
    AreaName: '',
    ZipCode: '',
  })
  useEffect(() => {
    // if no auth, go to login // dev closed
    // if (!isAuth) router.push('login')

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
        user = profileData
        // setText(profileData)
      } catch (err) {
        console.log(err)
      }
    }
    getProfile()
    setText({
      name: user?.name || '',
      nickname: user?.nickname || '',
      tel: user?.tel || '',
      skinType: user?.skin_type || '',
      city: user?.city || '',
      area: user?.area || '',
      address: user?.address || '',
    })
    console.log('name', user.name)
  }, [])
  return (
    <>
      <form>
        <div className="user-content">
          <h3>會員資料</h3>
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
            <InputText
              text={text}
              title="電話"
              name="tel"
              value={text.tel}
              setText={setText}
            />
          </div>
          <h3>預設地址</h3>
          <div className="row row-cols-md-3 row-cols-1 g-4">
            <Select
              title="城市"
              name="city"
              arr={cities}
              selectKey="CityName"
              citySelect={citySelect}
              setCitySelect={setCitySelect}
            />
            <Select title="市/區/鄉/鎮" name="area" selectKey="AreaName" />
            <Select title="郵遞區號" name="postcode" selectKey="ZipCode" />
          </div>
          <button className="btn btn-primary">送出</button>
        </div>
      </form>
    </>
  )
}
