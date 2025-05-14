'use client'
import { useEffect } from 'react'
// import CartFooter from './_component/cart-footer/cart-footer'
import '@/app/_styles/globals.scss'

export default function CartLayout({ children }) {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle')
  }, [])
  return (
    <>
      <main>{children}</main>
    </>
  )
}
