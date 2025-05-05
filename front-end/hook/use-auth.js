'use client'

import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)
AuthContext.displayName = 'AuthContext'

export function AuthProvider({ children }) {
  const defaultMember = {
    id: 0,
    name: '',
  }
  const [member, setMember] = useState(defaultMember)
  const isAuth = Boolean(member?.id)

  // login & logout function
  const login = async (account, passowrd) => {
    const formData = new FormData()
    console.log('email', account)
    formData.append('email', account)
    formData.append('password', passowrd)
    const memberGet = await fetch('http://localhost:3005/api/login', {
      method: 'POST',
      body: formData,
    })

    if (!memberGet) return 'not get value'

    const memberGetJson = await memberGet.json()
    console.log(`memberGetJson`, memberGetJson)

    const member = memberGetJson['data']
    console.log(`member`, member)

    if (!member) return 'not exist'

    // setMember({ id: 3, name: 'harry', email: account })
  }
  const logout = () => {
    setMember(defaultMember)
  }
  return (
    <>
      <AuthContext.Provider value={{ member, isAuth, login, logout }}>
        {children}
      </AuthContext.Provider>
    </>
  )
}

export const useAuth = () => useContext(AuthContext)
