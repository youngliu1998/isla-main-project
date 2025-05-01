import CartFooter from './_component/cart-footer'
import '@/app/_styles/globals.scss'

export default function CartLayout({ children }) {
  return (
    <>
      {children}
      <CartFooter />
    </>
  )
}
