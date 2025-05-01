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
  const login = () => {
    setMember({ id: 3, name: 'harry', email: 'harry@test.com' })
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
