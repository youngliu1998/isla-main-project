'use client'

import { SearchParamsContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime'
import React, { useState, useEffect, createContext, useContext } from 'react'

const FilterContext = createContext()

export function FilterProvider({ children }) {
  // const [tab, setTab] = useState(0)
  const [keyword, setKeyword] = useState('')
  const [productCate, setProductCate] = useState([])
  const [postCate, setPostCate] = useState([])
  return (
    <FilterContext.Provider
      value={{
        // tab,
        // setTab,
        keyword,
        setKeyword,
        productCate,
        setProductCate,
        postCate,
        setPostCate,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export function useFilter() {
  return useContext(FilterContext)
}
