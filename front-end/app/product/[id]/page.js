'use client'

import './_style/product-info.css'
import {
  UseProductDetail,
  UseProductIngredient,
  UseProductReviews,
} from '../../../hook/use-products'
import CommentGroup from './_component/comment-group/comment-group.js'
import React from 'react';

export default function page({ params }) {
  // i don't know what is this shit, but it's warning
  const unwrappedParams = React.use(params);
  const id = unwrappedParams.id;

  if (!id) return <div>Loading...</div>
  const {
    data: product,
    isLoading: isLoadingProduct,
    error: errorProduct,
  } = UseProductDetail(id)
  const {
    data: reviews,
    isLoading: isLoadingReviews,
    error: errorReviews,
  } = UseProductReviews(id)
  const {
    data: ingredients,
    isLoading: isLoadingIngredients,
    error: errorIngredients,
  } = UseProductIngredient(id)

  if (isLoadingProduct || isLoadingReviews || isLoadingIngredients)
    return <div>載入中...</div>
  if (errorProduct || errorReviews || errorIngredients)
    return (
      <div>
        發生錯誤：
        {errorProduct?.message ||
          errorReviews?.message ||
          errorIngredients?.message}
      </div>
    )
  return (
    <>
      {/*<ul>*/}
      {/*  {reviews.map((r) => (*/}
      {/*    <li key={r.reviews_id}>{r.comment_context}</li>*/}
      {/*  ))}*/}
      {/*</ul>*/}
      {/*<ul>*/}
      {/*  {ingredients.map((ing) => (*/}
      {/*    <li key={ing.ingredient_id}>{ing.name}</li>*/}
      {/*  ))}*/}
      {/*</ul>*/}
      <section className="product-main">
        <div className="product-main-container container d-flex justify-content-center align-items-center">
          <div className="product d-flex align-items-center justify-content-center">
            <div className="pic-bar d-flex  align-items-center gap-3">
              <img
                className="pic-bar-item"
                src="./imgs/2.jpg"
                alt="產品圖片縮圖 1"
              />
              <img
                className="pic-bar-item"
                src="./imgs/3.jpg"
                alt="產品圖片縮圖 2"
              />
              <img
                className="pic-bar-item"
                src="./imgs/4.jpg"
                alt="產品圖片縮圖 3"
              />
            </div>
            <div className="pic-show">
              <img
                className="pic-show-item"
                src="./imgs/1.jpg"
                alt="主要產品圖片"
              />
            </div>
            <div className="product-index d-flex flex-column justify-content-between">
              <div className="index-top">
                <div className="top-main">
                  <div className="brand">{product.brand_name}</div>{' '}
                  <div className="name">{product.name}</div>{' '}
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
          <div className="comment-cat">
            <div className="cat-card">
              <div className="cat-head">
                <div className="user-img">
                  <img src="./imgs/1.jpg" alt="用戶頭像" />{' '}
                </div>
                <div className="cat-head-user">
                  <div className="username-cat">Customer2</div>{' '}
                </div>
                <div className="star-box cat-star-box">
                  <i className="bx bxs-star star star-active" />
                  <i className="bx bxs-star star star-active" />
                  <i className="bx bxs-star star star-active" />
                  <i className="bx bxs-star star star-active" />
                  <i className="bx bxs-star star " />
                </div>
              </div>
              <div className="cat-body">
                這些富有彈性的眼影採用堆疊或三重啞光和/或微光顏料包裝，易於用指尖塗抹。
                Kaja 的 Glitter Arrangement
                技術每次輕按都能產生均勻的閃光，即使在旅途中也能快速輕鬆地打造眼部閃光。
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="product-info">
        <div className="container">
          <div className="product-indo-title w-100 d-flex justify-content-center align-items-center">
            產品資訊
          </div>
          <div className="relative-tag-box d-flex flex-column">
            <div className="relative-tag-title">相關類別</div>
            <div className="relative-tags d-flex align-items-center gap-3">
              <button className="relative-tag" type="button">
                眼妝
              </button>{' '}
              <button className="relative-tag" type="button">
                防水
              </button>
              <button className="relative-tag" type="button">
                睫毛
              </button>
              <button className="relative-tag" type="button">
                睫毛膏
              </button>
            </div>
          </div>
          {/*<CommentGroup   reviews={reviews}*/}
          {/*averageRating={product.averageRating}*/}
          {/*ratingCounts={'1'}*/}
          {/*reviewImages, />*/}
          {/*<div className="comment-component d-flex">*/}
          {/*  <div className="comment-sidebar">*/}
          {/*    <div className="comment-sidebar-rating d-flex align-items-center gap-3">*/}
          {/*      <div className="rating-num">4.1</div>{' '}*/}
          {/*      <div className="rating-starbox d-flex flex-column">*/}
          {/*        <div className="star-box">*/}
          {/*          <i className="bx bxs-star star star-active" />*/}
          {/*          <i className="bx bxs-star star star-active" />*/}
          {/*          <i className="bx bxs-star star star-active" />*/}
          {/*          <i className="bx bxs-star star " />*/}
          {/*          <i className="bx bxs-star star " />*/}
          {/*        </div>*/}
          {/*        <div className="rating-starbox-status">*/}
          {/*          基於 <span className="rating-status">200</span> 個評分{' '}*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*    <div className="comment-sidebar-rating-bars flex-column-reverse">*/}
          {/*      <div className="rating-bar-box d-flex align-items-center">*/}
          {/*        <div className="rating-bar-label">1 星</div>*/}
          {/*        <div className="rating-bar overflow-hidden">*/}
          {/*          <div className="rating-bar-1" />{' '}*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*      <div className="rating-bar-box d-flex align-items-center">*/}
          {/*        <div className="rating-bar-label">2 星</div>*/}
          {/*        <div className="rating-bar overflow-hidden">*/}
          {/*          <div className="rating-bar-2" />{' '}*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*      <div className="rating-bar-box d-flex align-items-center">*/}
          {/*        <div className="rating-bar-label">3 星</div>*/}
          {/*        <div className="rating-bar overflow-hidden">*/}
          {/*          <div className="rating-bar-3" />{' '}*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*      <div className="rating-bar-box d-flex align-items-center">*/}
          {/*        <div className="rating-bar-label">4 星</div>*/}
          {/*        <div className="rating-bar overflow-hidden">*/}
          {/*          <div className="rating-bar-4" />{' '}*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*      <div className="rating-bar-box d-flex align-items-center">*/}
          {/*        <div className="rating-bar-label">5 星</div>*/}
          {/*        <div className="rating-bar overflow-hidden">*/}
          {/*          <div className="rating-bar-5" />{' '}*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*    <div className="comment-sidebar-photos-box">*/}
          {/*      <div className="comment-sidebar-photos-title">所有圖片</div>*/}
          {/*      <div className="comment-sidebar-photos">*/}
          {/*        <button className="comment-img" type="button">*/}
          {/*          <img*/}
          {/*            className="img-fluid"*/}
          {/*            src="./imgs/3.jpg"*/}
          {/*            alt="評論圖片 1"*/}
          {/*          />*/}
          {/*        </button>*/}
          {/*        <button className="comment-img" type="button">*/}
          {/*          <img*/}
          {/*            className="img-fluid"*/}
          {/*            src="./imgs/3.jpg"*/}
          {/*            alt="評論圖片 2"*/}
          {/*          />*/}
          {/*        </button>*/}
          {/*        <button className="comment-img" type="button">*/}
          {/*          <img*/}
          {/*            className="img-fluid"*/}
          {/*            src="./imgs/3.jpg"*/}
          {/*            alt="評論圖片 3"*/}
          {/*          />*/}
          {/*        </button>*/}
          {/*        <button className="comment-img" type="button">*/}
          {/*          <img*/}
          {/*            className="img-fluid"*/}
          {/*            src="./imgs/3.jpg"*/}
          {/*            alt="評論圖片 4"*/}
          {/*          />*/}
          {/*        </button>*/}
          {/*        <button className="comment-img" type="button">*/}
          {/*          <img*/}
          {/*            className="img-fluid"*/}
          {/*            src="./imgs/3.jpg"*/}
          {/*            alt="評論圖片 5"*/}
          {/*          />*/}
          {/*        </button>*/}
          {/*        <button className="comment-img" type="button">*/}
          {/*          <img*/}
          {/*            className="img-fluid"*/}
          {/*            src="./imgs/3.jpg"*/}
          {/*            alt="評論圖片 6"*/}
          {/*          />*/}
          {/*        </button>*/}
          {/*      </div>*/}
          {/*      <button*/}
          {/*        className="comment-sidebar-photos-show-more"*/}
          {/*        type="button"*/}
          {/*      >*/}
          {/*        查看全部*/}
          {/*      </button>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*  <div className="comment-box">*/}
          {/*    <div className="tools d-flex align-items-center">*/}
          {/*      <button*/}
          {/*        className="sort-by-date sort-btn sort-btn-active"*/}
          {/*        type="button"*/}
          {/*      >*/}
          {/*        最新*/}
          {/*      </button>{' '}*/}
          {/*      <button className="sort-by-rating sort-btn" type="button">*/}
          {/*        依照星級*/}
          {/*      </button>{' '}*/}
          {/*    </div>*/}

          {/*  </div>*/}
          {/*</div>*/}
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
