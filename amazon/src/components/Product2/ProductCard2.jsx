import React from 'react';
import Rating from '@mui/material/Rating';
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat';
import classes from './Product2.module.css';
import { Link } from 'react-router-dom';

function ProductCard2({ Product, flex, renderDesc}) {
  if (!Product) {
    return <div>Loading...</div>;
  }

  const { thumbnail, title, id, price, rating, description  } = Product;

  return (
    <div className={`${classes.productCard} ${flex ? classes.product_flex : ""}`}>
      <Link to={`/products/${id}`} className={classes.imageContainer}>
        <img src={thumbnail} alt={title} className={classes.productImage} />
      </Link>
      
      <div className={classes.productInfo}>
        <h3 className={classes.productTitle}>{title}</h3>
        {renderDesc &&<div>{description}</div>}
        <div className={classes.ratingContainer}>
          <Rating value={rating || 0} precision={0.1} readOnly size="small" />
          <span className={classes.ratingCount}>{rating}</span>
        </div>
        
        <div className={classes.priceContainer}>
          <CurrencyFormat amount={price} />
        </div>
        
        <button className={classes.addToCartButton}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard2;