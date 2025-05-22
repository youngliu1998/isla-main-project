'use client'

import './_style/product-info.css'
import {
  UseProductDetail,
  UseProductIngredient,
  UseProductReviews,
} from '../../../hook/use-products'
import { useChrisR2ImageUrlDuo } from '@/hook/use-chris-r2image-url.js'
import CommentGroup from './_component/comment-group/comment-group.js'
import CommentCat from './_component/comment-cat/comment-cat.js'
import React, { useState, useMemo } from 'react'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { useAuth } from '@/hook/use-auth.js'
import ProductInfoAccrodion from './_component/product-info-accordion/product-info-accordion.js'
import Image from 'next/image.js'
import Link from 'next/link'
export default function page({ params }) {
  // i don't know what is this shit, but it's warning
  const unwrappedParams = React.use(params)
  const id = unwrappedParams.id
  const { user } = useAuth()
  const userId = user.id
  console.log(userId)

  const [colorId, setColorId] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const handleAddToCart = () => {
    if (!colorId) return alert('請先選擇顏色')

    // 呼叫 useMutation 或 API 傳送 colorId + quantity
    console.log('加入購物車', { colorId, quantity })
  }

  if (!id) return <div>Loading...</div>
  const {
    data: product,
    isLoading: isLoadingProduct,
    success: productSuccess,
    error: errorProduct,
  } = UseProductDetail(id)
  const {
    data: reviews = [],
    isLoading: isLoadingReviews,
    error: errorReviews,
  } = UseProductReviews(id)
  const {
    data: ingredients,
    isLoading: isLoadingIngredients,
    error: errorIngredients,
  } = UseProductIngredient(id)
  // const productImagesUrls = product?.images?.map(img => useChrisR2ImageUrlDuo(img.image_url)) ?? [];
  const filenames = useMemo(() => {
    return product?.images?.map((img) => img.image_url) ?? []
  }, [product?.images])
  const productImagesUrls = useChrisR2ImageUrlDuo(filenames)

  const getRatingCounts = (reviews) => {
    const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    reviews.forEach(({ rating }) => {
      counts[rating]++
    })
    return counts
  }

  const reviewImages = reviews.flatMap((reviews) =>
    (reviews.images || []).map((img) => ({
      imageUrl: `https://isla-image.chris142852145.workers.dev/${img}`,
      reviewId: reviews.review_id,
    }))
  )

  if (isLoadingProduct || isLoadingReviews || isLoadingIngredients)
    return <div>載入中...</div>
  return (
    <>
      <section className="product-main">
        <div className="product-main-container container d-flex justify-content-center align-items-center">
          <div className="product d-flex align-items-center justify-content-center">
            {/*<ProductPictureShow images={productImagesUrls} />*/}
            <div className="pic-bar d-flex align-items-center gap-3">
              {productImagesUrls.map((imgUrl, idx) => (
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
                  <label>顏色</label>
                  <div className="color-select">
                    <div className="color-circle" />{' '}
                    <div className="color-name">豆沙棕色</div>{' '}
                  </div>
                </div>
                <div className="number-select-bookmark-box d-flex align-items-center w-100 justify-content-between">
                  <div className="number－select d-flex align-items-center">
                    <button
                      className="number－select-reduce number－select-btn"
                      type="button"
                    >
                      {' '}
                      <i className="bx bx-minus" />{' '}
                    </button>
                    <div className="number－select-num">1</div>{' '}
                    <button
                      className="number－select-increase number－select-btn"
                      type="button"
                    >
                      {' '}
                      <i className="bx bx-plus" />{' '}
                    </button>
                  </div>
                  <div className="bookmark">
                    <a href="#">
                      <i className="bx bxs-heart" />
                    </a>{' '}
                  </div>
                </div>
                <div className="price-box d-flex align-items-center ">
                  <div className="price">$425</div>{' '}
                  <button className="add-cart" type="button">
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
            <ProductInfoAccrodion ingredients={ingredients} />
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
