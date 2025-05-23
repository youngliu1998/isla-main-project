'use client'

import './_style/product-info.css'
import { useClientToken } from '@/hook/use-client-token.js'
import {
  UseProductDetail,
  UseProductIngredient,
  UseProductReviews,
} from '../../../hook/use-products'
import { useChrisR2ImageUrlDuo } from '@/hook/use-chris-r2image-url.js'
import { useAddCart } from '@/hook/use-add-cart.js'
import CommentGroup from './_component/comment-group/comment-group.js'
import CommentCat from './_component/comment-cat/comment-cat.js'
import ColorSelect from './_component/colour-select/colour-select.js'
import WishButton from '../../_components/wish-toggle.js'
import QuantitySelector from './_component/product-quantity-selector/product-quantity-selector.js'
import React, { useState, useMemo, useEffect } from 'react'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { useAuth } from '@/hook/use-auth.js'
import ProductInfoAccrodion from './_component/product-info-accordion/product-info-accordion.js'
import Image from 'next/image.js'
import Link from 'next/link'
export default function page({ params }) {
  // i don't know what is this shit, but it's warning
  const { user, isLoading: isAuthLoading } = useAuth()
  const token = useClientToken()
  const userId = user?.id

  const unwrappedParams = React.use(params)
  const id = unwrappedParams?.id

  if (!id) return null

  const { mutate: addToCart } = useAddCart(token)

  // Fetch product detail
  const {
    data: product,
    isLoading: isLoadingProduct,
    error: errorProduct,
  } = UseProductDetail(id)

  // Reviews
  const {
    data: reviews = [],
    isLoading: isLoadingReviews,
    error: errorReviews,
  } = UseProductReviews(id)

  // Ingredients
  const {
    data: ingredients,
    isLoading: isLoadingIngredients,
    error: errorIngredients,
  } = UseProductIngredient(id)

  // === State ===
  const [selectedColorId, setSelectedColorId] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedIndex, setSelectedIndex] = useState(0)

  // 判斷是否為標準色（無色碼）
  const isStandardOnly =
    product?.colors?.length === 1 && product.colors[0].color_code === null

  // 初始化選擇顏色（非標準色）
  useEffect(() => {
    if (
      product?.colors?.length > 0 &&
      !isStandardOnly &&
      selectedColorId === null
    ) {
      setSelectedColorId(product.colors[0].color_id)
    }
  }, [product, selectedColorId, isStandardOnly])

  // 處理圖片
  const filenames = useMemo(() => {
    return product?.images?.map((img) => img.image_url) ?? []
  }, [product])

  const productImagesUrls = useChrisR2ImageUrlDuo(filenames)

  // 加入購物車
  const handleAddToCart = () => {
    const colorId = selectedColorId ?? product.colors[0]?.color_id

    if (!colorId && !isStandardOnly) {
      return alert('請先選擇顏色')
    }

    addToCart(
      {
        product_id: product.product_id,
        quantity,
        color_id: colorId,
      },
      {
        onSuccess: (data) => {
          console.log('加入成功：', data)
        },
        onError: (err) => {
          console.error('加入購物車失敗：', err)
        },
      }
    )
  }

  // 評分統計
  const getRatingCounts = (reviews) => {
    return reviews.reduce(
      (acc, { rating }) => {
        acc[rating] = (acc[rating] || 0) + 1
        return acc
      },
      { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    )
  }

  // 評論圖片
  const reviewImages = reviews.flatMap((review) =>
    (review.images || []).map((img) => ({
      imageUrl: `https://isla-image.chris142852145.workers.dev/${img}`,
      reviewId: review.review_id,
    }))
  )

  // 資料尚未載入完成
  if (isLoadingProduct || isLoadingReviews || isLoadingIngredients)
    return null

  // 等待 token 載入完成
  if (token === null) {
    return <div>載入中...</div> // 或 return null
  }

  // 未登入的處理
  if (!token) {
    return <div>請先登入以使用此功能</div>
  }


  console.log(product.usage_instructions)

  return (
    <>
      <section className="product-main">
        <div className="product-main-container container d-flex justify-content-center align-items-center">
          <div className="product d-flex align-items-center justify-content-center">
            <div className="pic-bar d-flex align-items-center gap-3">
              {productImagesUrls.slice(0, 5).map((imgUrl, idx) => (
                <Image
                  key={idx}
                  className="pic-bar-item"
                  src={imgUrl}
                  alt={`產品圖片縮圖 ${idx + 1}`}
                  width={0}
                  height={0}
                  style={{
                    border:
                      idx === selectedIndex
                        ? '2px solid #007bff'
                        : '1px solid #ccc',
                    borderRadius: '8px',
                  }}
                  onClick={() => setSelectedIndex(idx)}
                />
              ))}
            </div>
            <div className="pic-show">
              <Zoom>
                <img
                  alt="Zoomable"
                  src={productImagesUrls[selectedIndex]}
                  className="pic-show-item"
                />
              </Zoom>
            </div>
            <div className="product-index d-flex flex-column justify-content-between">
              <div className="index-top">
                <div className="top-main">
                  <Link href={`/products?brand_id=${product.brand.brand_id}`}>
                    <div className="brand">{product.brand.name}</div>
                  </Link>
                  <div className="name">{product.name}</div>
                </div>
                <div className="description">{product.description}</div>
              </div>
              <div className="index-bottom d-flex flex-column">
                <div className="color-select-box d-flex align-items-center">
                  {!isStandardOnly && (
                    <ColorSelect
                      colors={product.colors}
                      selectedColorId={selectedColorId}
                      onChange={setSelectedColorId}
                    />
                  )}
                </div>
                <div className="number-select-bookmark-box d-flex align-items-center w-100 justify-content-between">
                  <QuantitySelector
                    quantity={quantity}
                    setQuantity={setQuantity}
                  />
                  {/*<div className="bookmark">*/}
                  {/*  <a href="#">*/}
                  {/*    <i className="bx bxs-heart" />*/}
                  {/*  </a>{' '}*/}
                  {/*</div>*/}
                  <WishButton token={token} type="product" id={product.product_id} />
                </div>
                <div className="price-box d-flex align-items-center ">
                  <div className="price">$425</div>{' '}
                  <button
                    className="add-cart"
                    type="button"
                    onClick={handleAddToCart}
                  >
                    加入購物袋
                  </button>{' '}
                </div>
              </div>
            </div>
          </div>
          <CommentCat reviews={reviews} />
        </div>
      </section>
      <section className="product-info">
        <div className="container product-info-container">
          <div className="product-indo-title w-100 d-flex justify-content-center align-items-center">
            產品資訊
          </div>
          <div className="relative-tag-box d-flex flex-column">
            <div className="relative-tag-title">相關類別</div>
            <div className="relative-tags d-flex align-items-center gap-3">
              {product.tags?.map((tag) => (
                <Link key={tag.tag_id} href={`/products?tag_id=${tag.tag_id}`}>
                  <button className="relative-tag" type="button">
                    {tag.name}
                  </button>
                </Link>
              ))}
            </div>
          </div>
          <div className="product-info">
            <ProductInfoAccrodion
              ingredients={ingredients}
              usage={product.usage_instructions}
            />
          </div>
          <CommentGroup
            reviews={reviews}
            averageRating={product.average_rating}
            ratingCounts={getRatingCounts(reviews)}
            reviewImages={reviewImages}
            productId={product.product_id}
            userId={userId}
          />
        </div>
      </section>
      <section className="relative-products">
        <div className="relative-products-title-box">
          <div className="relative-products-title-main">猶豫不決嗎？</div>
          <div className="relative-products-title-sub">下面有其他類似商品</div>
        </div>
        <div className="relative-products-cards">
          <div className="card-full-product_card_box">
            <div className="card-full-product_card">
              <div className="card-full-product_card-head">
                <div className="card-full-bookmark">
                  <a href="">
                    <i className="bx bxs-heart" />
                  </a>
                </div>
                <div className="card-full-product_card-img">
                  <img src="./imgs/1.jpg" alt="" className="card-img" />
                </div>
                <div className="card-full-hover-add-cart">
                  <a href="" className="card-full-add-cart-btn">
                    加入購物車
                  </a>
                </div>
              </div>
              <div className="card-full-product_card-info">
                <div className="card-full-info">
                  <div className="card-full-product_details">
                    <div className="card-full-brand">CLIO</div>
                    <div className="card-full-product_name">
                      KILL COVER HIGH GLOW FOUNDATION
                    </div>
                  </div>
                  <div className="card-full-rating">
                    <div className="card-full-star-box">
                      <i className="bx bxs-star card-full-star card-full-star-active" />
                      <i className="bx bxs-star card-full-star card-full-star-active" />
                      <i className="bx bxs-star card-full-star card-full-star-active" />
                      <i className="bx bxs-star card-full-star" />
                      <i className="bx bxs-star card-full-star" />
                    </div>
                    <div className="card-full-rating_text">4 則評論</div>
                  </div>
                </div>
                <div className="card-full-price">
                  <div className="card-full-price-box d-flex gap-2">
                    <div className="card-full-main-price">$1,089</div>
                    <div className="card-full-basic-price">
                      <del>$1300</del>
                    </div>
                  </div>
                  <div className="card-full-discount d-flex gap-2">
                    <div className="card-full-discount-box">18%</div>
                    <div className="card-full-discount-text">省下 $231.58</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-full-product_card_box">
            <div className="card-full-product_card">
              <div className="card-full-product_card-head">
                <div className="card-full-bookmark">
                  <a href="">
                    <i className="bx bxs-heart" />
                  </a>
                </div>
                <div className="card-full-product_card-img">
                  <img src="./imgs/1.jpg" alt="" className="card-img" />
                </div>
                <div className="card-full-hover-add-cart">
                  <a href="" className="card-full-add-cart-btn">
                    加入購物車
                  </a>
                </div>
              </div>
              <div className="card-full-product_card-info">
                <div className="card-full-info">
                  <div className="card-full-product_details">
                    <div className="card-full-brand">CLIO</div>
                    <div className="card-full-product_name">
                      KILL COVER HIGH GLOW FOUNDATION
                    </div>
                  </div>
                  <div className="card-full-rating">
                    <div className="card-full-star-box">
                      <i className="bx bxs-star card-full-star card-full-star-active" />
                      <i className="bx bxs-star card-full-star card-full-star-active" />
                      <i className="bx bxs-star card-full-star card-full-star-active" />
                      <i className="bx bxs-star card-full-star" />
                      <i className="bx bxs-star card-full-star" />
                    </div>
                    <div className="card-full-rating_text">4 則評論</div>
                  </div>
                </div>
                <div className="card-full-price">
                  <div className="card-full-price-box d-flex gap-2">
                    <div className="card-full-main-price">$1,089</div>
                    <div className="card-full-basic-price">
                      <del>$1300</del>
                    </div>
                  </div>
                  <div className="card-full-discount d-flex gap-2">
                    <div className="card-full-discount-box">18%</div>
                    <div className="card-full-discount-text">省下 $231.58</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-full-product_card_box">
            <div className="card-full-product_card">
              <div className="card-full-product_card-head">
                <div className="card-full-bookmark">
                  <a href="">
                    <i className="bx bxs-heart" />
                  </a>
                </div>
                <div className="card-full-product_card-img">
                  <img src="./imgs/1.jpg" alt="" className="card-img" />
                </div>
                <div className="card-full-hover-add-cart">
                  <a href="" className="card-full-add-cart-btn">
                    加入購物車
                  </a>
                </div>
              </div>
              <div className="card-full-product_card-info">
                <div className="card-full-info">
                  <div className="card-full-product_details">
                    <div className="card-full-brand">CLIO</div>
                    <div className="card-full-product_name">
                      KILL COVER HIGH GLOW FOUNDATION
                    </div>
                  </div>
                  <div className="card-full-rating">
                    <div className="card-full-star-box">
                      <i className="bx bxs-star card-full-star card-full-star-active" />
                      <i className="bx bxs-star card-full-star card-full-star-active" />
                      <i className="bx bxs-star card-full-star card-full-star-active" />
                      <i className="bx bxs-star card-full-star" />
                      <i className="bx bxs-star card-full-star" />
                    </div>
                    <div className="card-full-rating_text">4 則評論</div>
                  </div>
                </div>
                <div className="card-full-price">
                  <div className="card-full-price-box d-flex gap-2">
                    <div className="card-full-main-price">$1,089</div>
                    <div className="card-full-basic-price">
                      <del>$1300</del>
                    </div>
                  </div>
                  <div className="card-full-discount d-flex gap-2">
                    <div className="card-full-discount-box">18%</div>
                    <div className="card-full-discount-text">省下 $231.58</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-full-product_card_box">
            <div className="card-full-product_card">
              <div className="card-full-product_card-head">
                <div className="card-full-bookmark">
                  <a href="">
                    <i className="bx bxs-heart" />
                  </a>
                </div>
                <div className="card-full-product_card-img">
                  <img src="./imgs/1.jpg" alt="" className="card-img" />
                </div>
                <div className="card-full-hover-add-cart">
                  <a href="" className="card-full-add-cart-btn">
                    加入購物車
                  </a>
                </div>
              </div>
              <div className="card-full-product_card-info">
                <div className="card-full-info">
                  <div className="card-full-product_details">
                    <div className="card-full-brand">CLIO</div>
                    <div className="card-full-product_name">
                      KILL COVER HIGH GLOW FOUNDATION
                    </div>
                  </div>
                  <div className="card-full-rating">
                    <div className="card-full-star-box">
                      <i className="bx bxs-star card-full-star card-full-star-active" />
                      <i className="bx bxs-star card-full-star card-full-star-active" />
                      <i className="bx bxs-star card-full-star card-full-star-active" />
                      <i className="bx bxs-star card-full-star" />
                      <i className="bx bxs-star card-full-star" />
                    </div>
                    <div className="card-full-rating_text">4 則評論</div>
                  </div>
                </div>
                <div className="card-full-price">
                  <div className="card-full-price-box d-flex gap-2">
                    <div className="card-full-main-price">$1,089</div>
                    <div className="card-full-basic-price">
                      <del>$1300</del>
                    </div>
                  </div>
                  <div className="card-full-discount d-flex gap-2">
                    <div className="card-full-discount-box">18%</div>
                    <div className="card-full-discount-text">省下 $231.58</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
