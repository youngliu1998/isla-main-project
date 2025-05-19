'use client'

import { method } from 'lodash'
import React, { useState, useEffect } from 'react'
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function TestPage(props) {
  const { data, isLoading } = useSWR(
    'http://localhost:3005/api/forum/posts/tidy',
    fetcher
  )
  if (isLoading) {
    return
  }
  //   console.log(data.data)
  const dataArr = data.data
  //   .map((v) => {
  //     const newArr = v.content.replace(
  //       '<img src="/',
  //       '<img class="d-block w-50" src="/'
  //     )
  //     console.log(newArr)
  //   })
  return (
    <>
      {dataArr.map((v, i) => {
        return (
          <div key={i}>
            <div>{v.id}</div>
            <div>
              {v.content.replace(
                '<img src="/images/',
                '<img class="d-block w-50" src="/images/forum/'
              )}
            </div>
            <br />
          </div>
        )
      })}
    </>
  )

  //   data.map((v) => {
  //     console.log(
  //
  //       )
  //     )
  //   })

  //   console.log(data)
}
