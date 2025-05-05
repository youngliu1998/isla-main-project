'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

export default function ComponentsAvatar(props) {
  return (
    <>
      <Image
        className="rounded-circle object-fit-cover ratio-1x1 h-100"
        src="./images/320.webp"
        alt="圖片名稱"
        layout="fill"
      />
    </>
  )
}
