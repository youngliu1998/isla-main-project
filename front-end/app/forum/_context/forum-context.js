'use client'

import React, { useState, useEffect, useContext, createContext } from 'react'

const ForumContext = createContext()

export function ForumProvider({ children }) {
  const [tab, setTab] = useState(0)
  const [keyword, setKeyword] = useState()
  const [productCate, setProductCate] = useState()
  const [postCate, setPostCate] = useState()

  return (
    <ForumContext.Provider
      value={{
        tab,
        setTab,
        keyword,
        setKeyword,
        productCate,
        setProductCate,
        postCate,
        setPostCate,
      }}
    >
      {children}
    </ForumContext.Provider>
  )
}

// QU 這些分別是什麼性質？
export const useForum = () => useContext(ForumContext)
