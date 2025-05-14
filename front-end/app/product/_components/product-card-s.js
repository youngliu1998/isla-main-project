// ProductCard.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RatingComponent from './product-rating.js';
import './product-card-styles.css'; // 你的樣式表

// 從 react-icons 引入愛心圖標
import { BsHeartFill, BsHeart } from 'react-icons/bs';

const ProductCard = ({
                       imageUrl,
                       imageAlt = "商品圖片",
                       initialIsFavorited = false,
                       rating,
                       reviewCount,
                       brandName,
                       productName,
                       mainPrice,
                       basicPrice,
                       currencySymbol = "$",
                       onFavoriteToggle,
                       onAddToCart,
                       productId,
                     }) => {
  const [isFavorited, setIsFavorited] = useState(initialIsFavorited);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    const newFavoriteState = !isFavorited;
    setIsFavorited(newFavoriteState);
    if (onFavoriteToggle) {
      onFavoriteToggle(productId, newFavoriteState);
    }
  };

  const handleAddToCartClick = (e) => {
    e.preventDefault();
    if (onAddToCart) {
      onAddToCart({
        productId,
        name: productName,
        price: mainPrice,
      });
    }
  };

  const isSpecialOffer = basicPrice && parseFloat(String(mainPrice).replace(/,/g, '')) < parseFloat(String(basicPrice).replace(/,/g, ''));

  return (
    <div className="product_card">
      <div className="product_card-head">
        <div className="head-top d-flex">
          {(rating !== undefined && reviewCount !== undefined) && (
            <div className="rating rating-desktop">
              <RatingComponent rating={rating} reviewCount={reviewCount} />
            </div>
          )}
          <div className="bookmark">
            <a href="#" onClick={handleFavoriteClick} role="button" aria-pressed={isFavorited} aria-label={isFavorited ? "從我的最愛移除" : "加入我的最愛"}>
              {isFavorited ? <BsHeartFill /> : <BsHeart />}
            </a>
          </div>
        </div>
        <div className="product_card-img">
          <img src={imageUrl} alt={imageAlt} className="card-img" />
        </div>
        <div className="hover-add-cart">
          <a href="#" onClick={handleAddToCartClick} className="add-cart-btn">加入購物車</a>
        </div>
      </div>

      <div className="product_card-info">
        <div className="info">
          <div className="product_details">
            {brandName && <div className="brand">{brandName}</div>}
            <div className="product_name">{productName}</div>
          </div>
        </div>
        {(rating !== undefined && reviewCount !== undefined) && (
          <div className="rating rating-mobile">
            <RatingComponent rating={rating} reviewCount={reviewCount} />
          </div>
        )}
        <div className="price">
          <div className="price-box d-flex gap-2">
            <div className="main-price">
              {currencySymbol}
              {typeof mainPrice === 'number' ? mainPrice.toLocaleString() : String(mainPrice)}
            </div>
            {isSpecialOffer && basicPrice && (
              <div className="basic-price">
                <del>
                  {currencySymbol}
                  {typeof basicPrice === 'number' ? basicPrice.toLocaleString() : String(basicPrice)}
                </del>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  productId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  imageUrl: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
  initialIsFavorited: PropTypes.bool,
  rating: PropTypes.number,
  reviewCount: PropTypes.number,
  brandName: PropTypes.string,
  productName: PropTypes.string.isRequired,
  mainPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  basicPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  currencySymbol: PropTypes.string,
  onFavoriteToggle: PropTypes.func,
  onAddToCart: PropTypes.func,
};

export default ProductCard;