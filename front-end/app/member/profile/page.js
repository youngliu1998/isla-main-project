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
    gender: '',
    birthday: '',
    skinType: '',
    CityName: '',
    AreaName: '',
    ZipCode: '',
    address: '',
  })
  console.log('text', text)

  // define array areas for selct
  const areas = cities.filter((v) => v.CityName == text.CityName)[0]?.AreaList
  // console.log('areas', areas)
  // define array postcodes for selct
  const postCodes = cities
    .filter((v) => v.CityName == text.CityName)[0]
    ?.AreaList.filter((v) => v.AreaName == text.AreaName)
  // form submit fucntion
  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = {
      name: text?.name || '',
      nickname: text?.nickname || '',
      tel: text?.tel || '',
      gender: text?.gender || '',
      birthday: text?.birthday || '',
      skin_type: text?.skinType || '',
      city: text?.CityName || '',
      area: text?.AreaName || '',
      postcode: text?.ZipCode || '',
      address: text?.address || '',
    }
    try {
      const token = localStorage.getItem('jwtToken')
      const response = await fetch('http://localhost:3005/api/member/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })
      const result = await response.json()
      alert('提交成功：' + JSON.stringify(result))
    } catch (error) {
      console.error('錯誤：', error)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('jwtToken')
      ? localStorage.getItem('jwtToken')
      : null
    if (!token) router.push('login')
    // if get auth, fetch profile data
    let profileData = {}
    async function getProfile() {
      try {
        const token = localStorage.getItem('jwtToken')

        const response = await fetch(
          'http://localhost:3005/api/member/profile',
          {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
          }
        )

        const data = await response.json()
        profileData = await data['data']
        console.log('profileData: ', profileData)
        setText({
          name: profileData?.name || '',
          nickname: profileData?.nickname || '',
          birthday: profileData?.birthday || '',
          gender: profileData?.gender || '',
          tel: profileData?.tel || '',
          skinType: profileData?.skin_type || '',
          CityName: profileData?.city || '',
          AreaName: profileData?.area || '',
          ZipCode: profileData?.postcode || '',
          address: profileData?.address || '',
        })
      } catch (err) {
        console.log(err)
      }
    }
    getProfile()
  }, [])
  return (
    <>
      <form onSubmit={handleSubmit}>
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
            {/* <!-- input[type=radio] --> */}
            <div className="user-form-input">
              <label htmlFor="skin_type">膚質</label>
              <div className="user-input-box user-radio-box">
                <div className="row row-cols-2">
                  <label htmlFor="skin_type">
                    <input
                      type="radio"
                      name="skin_type"
                      value="中性"
                      onChange={(e) => {
                        setText({ ...text, ['skinType']: e.target.value })
                      }}
                    />
                    中性
                  </label>
                  <label htmlFor="skin_type">
                    <input
                      type="radio"
                      name="skin_type"
                      value="乾性"
                      onChange={(e) => {
                        setText({ ...text, ['skinType']: e.target.value })
                      }}
                    />
                    乾性
                  </label>
                </div>
                <div className="row row-cols-2">
                  <label htmlFor="skin_type">
                    <input
                      type="radio"
                      name="skin_type"
                      value="敏感性"
                      onChange={(e) => {
                        setText({ ...text, ['skinType']: e.target.value })
                      }}
                    />
                    敏感性
                  </label>
                  <label htmlFor="skin_type">
                    <input
                      type="radio"
                      name="skin_type"
                      value=""
                      onChange={(e) => {
                        setText({ ...text, ['skinType']: e.target.value })
                      }}
                    />
                    不確定
                  </label>
                </div>
              </div>
            </div>
          </div>
          <h3>預設地址</h3>
          <div className="row row-cols-md-3 row-cols-1 g-4 w-100">
            <Select
              title="城市"
              name="city"
              arr={cities}
              selectKey="CityName"
              text={text}
              setText={setText}
            />
            <Select
              title="市/區/鄉/鎮"
              name="area"
              arr={areas}
              selectKey="AreaName"
              text={text}
              setText={setText}
            />
            <Select
              title="郵遞區號"
              name="postcode"
              arr={postCodes}
              selectKey="ZipCode"
              text={text}
              setText={setText}
            />
          </div>
          <div className="row row-cols-md-2 row-cols-1 w-100">
            <InputText
              text={text}
              title="地址"
              name="address"
              value={text.address}
              setText={setText}
            />
          </div>
          <button className="btn btn-primary">送出</button>
        </div>
      </form>
    </>
  )
}
