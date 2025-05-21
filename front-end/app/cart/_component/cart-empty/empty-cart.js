'use client'
import styles from './empty-cart.module.scss'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function EmptyCart() {
  const router = useRouter()

  return (
    <div>
      <Image
        src="/images/cart/empty-cart06.png"
        alt="空購物車"
        width={580}
        height={620}
      />
      <h5 className="text-maintext mb-3">
        你的購物車是空的，快去選購喜歡的商品吧！
      </h5>
      <button
        className="btn btn-secondary"
        onClick={() => router.push('/products')}
      >
        去逛逛商品吧
      </button>
    </div>
  )
}
