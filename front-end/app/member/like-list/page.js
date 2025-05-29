'use client'

import React, { useState, useEffect } from 'react'
// ==== component ====
import Componentstab from '../_component/tab/tab'
import ProductListContainer from './_component/product-list-container'
import CourseListContainer from './_component/course-list-container'
<<<<<<< HEAD
import { useWishProduct } from '@/hook/use-wish-with-product'
=======
import WishProductListTable from './_component/product-list-table/product-list-table'


>>>>>>> dev
// ==== style ====
import '../_styles/style.css'

export default function LikeListPage(props) {
<<<<<<< HEAD
  // const token = localStorage.getItem('jwtToken')
  // // ==== ComponentTab ====
=======
  // ==== ComponentTab ====

>>>>>>> dev
  const tab = ['商品', '課程']
  const [tabSwitch, setTabSwitch] = useState(1)
  // // ==== END ComponentTab ====
  // // ==== state & method for data ====
  // const [productList, setProductList] = useState([
  //   { name: 'Unleashia', data: [] },
  //   { name: "A'Pieu", data: [] },
  //   { name: 'COSLORI', data: [] },
  //   { name: 'MUZIGAE MANSION', data: [] },
  //   { name: 'Kaja', data: [] },
  //   { name: 'Rom&nd', data: [] },
  // ])
  // const [courseList, setCourseList] = useState([
  //   { name: '韓式彩妝', data: [] },
  //   { name: '專業彩妝', data: [] },
  //   { name: '日式彩妝', data: [] },
  //   { name: '彩妝體驗', data: [] },
  // ])
  // const getCourse = async () => {
  //   if (!token) return
  //   const response = await fetch(
  //     'http://localhost:3005/api/member/likeList/course',
  //     {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }
  //   )

  //   const data = await response.json()
  //   if (response.ok) {
  //     setCourseList(data)
  //   }
  // }
  // const { data } = useWishProduct(token)
  // console.log(data)
  // const getProduct = async () => {
  //   const productData = data
  //   for (let product of productList) {
  //     product.data = productData.filter((data, i) => {
  //       return product.name === data.brand_name
  //     })
  //   }
  //   console.log(productList)
  // }
  // ==== END state & method for data ====
  // useEffect(() => {
  //   if (tabSwitch === 1 && data) {
  //     getProduct()
  //   }
  //   if (tabSwitch === 2) {
  //     getCourse()
  //   }
  // }, [tabSwitch])
  return (
    <>
      <div className="user-content">
        <h3>願望清單</h3>
        <div>
          <Componentstab cates={tab} handleTabChange={setTabSwitch} />
        </div>
        {/* ==== 顯示商品 ==== */}
        {/* {tabSwitch === 1 && <ProductListContainer />} */}
        {/* {tabSwitch === 1 &&
          productList.map((productCat, i) => {
            return (
              productCat.data.length !== 0 && (
                <ProductListContainer
                  key={i}
                  name={productCat.name}
                  data={productCat.data}
                />
              )
            )
<<<<<<< HEAD
          })} */}
=======
          })}
        <WishProductListTable />
>>>>>>> dev

        {/* ==== 顯示課程 ==== */}
        {/* {tabSwitch === 2 && <CourseListContainer />} */}
        {/* {tabSwitch === 1 &&
          courseList.map((courseCat, i) => {
            return (
              courseCat.data.length !== 0 && (
                <CourseListContainer
                  key={i}
                  name={courseCat.name}
                  data={courseCat.data}
                />
              )
            )
          })} */}
      </div>
    </>
  )
}
