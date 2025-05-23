'use client'
import { AuthProvider } from '@/hook/use-auth'
import { CartProvider } from './cart/context/cart-context'

export default function Provider({ children }) {
  return (
    <>
      <AuthProvider>
        <CartProvider>{children}</CartProvider>
      </AuthProvider>
    </>
  )
}
