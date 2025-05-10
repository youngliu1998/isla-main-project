import ProductCardDropdown from './product-card-dropdown'
import ProductCardColorDots from './product-card-color-dots'
import ProductCardAddon from './product-card-addon'

export default function ProductCard({ type, ...props }) {
  switch (type) {
    case 'dropDown':
      return <ProductCardDropdown {...props} />

    case 'colorDots':
      return <ProductCardColorDots {...props} />

    case 'addon':
      return <ProductCardAddon {...props} />

    default:
      return <div>沒有這個樣式的卡片</div>
  }

  // return (
  //   <>
  //     <div>ProductCard</div>
  //   </>
  // )
}
