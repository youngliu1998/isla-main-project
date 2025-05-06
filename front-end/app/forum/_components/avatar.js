'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

export default function ComponentsAvatar({
  src = '',
  alt = '',
  classWidth = '',
}) {
  return (
    <>
      <div
        className="position-relative rounded-circle"
        style={{ width: classWidth + 'px', height: classWidth + 'px' }}
      >
        <Image
          className="rounded-circle object-fit-cover w-100"
          src={src}
          alt={alt}
          fill={true}
        />
      </div>
    </>
  )
}
