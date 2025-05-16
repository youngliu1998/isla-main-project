import ProductCardDropdown from './product-card-dropdown'
import ProductCardColorDots from './product-card-color-dots'
import ProductCardAddon from './product-card-addon'
import ProductCardCourse from './product-card-course'
import ProductCardNormal from './product-card-normal'

export default function ProductCard({ type, ...props }) {
  switch (type) {
    case 'dropDown':
      return <ProductCardDropdown {...props} />

    case 'colorDots':
      return <ProductCardColorDots {...props} />

    case 'addon':
      return <ProductCardAddon {...props} />

    case 'course':
      return <ProductCardCourse {...props} />

    case 'normal':
      return <ProductCardNormal {...props} />

    default:
      return <div>沒有這個樣式的卡片</div>
  }
}
