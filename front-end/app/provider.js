'use client'
import { AuthProvider } from '@/hook/use-auth'

export default function Provider({ children }) {
  return (
    <>
      <AuthProvider>{children}</AuthProvider>
    </>
  )
}
