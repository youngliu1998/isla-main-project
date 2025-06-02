'use client'

import React, { useState, useEffect } from 'react'
// ==== component ====
import Componentstab from '../_component/tab/tab'
// import ProductListContainer from './_component/product-list-container'
// import CourseListContainer from './_component/course-list-container'
import WishProductListTable from './_component/product-list-table/product-list-table'
import WishCourseListTable from './_component/course-list-table/course-list-table'
// ==== style ====
import '../_styles/style.css'

export default function LikeListPage(props) {
  // ==== ComponentTab ====

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

        {tabSwitch === 1 && <WishProductListTable />}
        {tabSwitch === 2 && <WishCourseListTable />}

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
          })}

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
