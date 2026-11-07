import React, { useContext } from 'react';
import Rating from '@mui/material/Rating';
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat';
import classes from './Product2.module.css';
import { Link } from 'react-router-dom';
import { DataContext } from '../DataProvider/DataProvider';
import{Type} from '../../Utility/action.type'
function ProductCard2({ Product, flex, renderDesc,renderaAdd}) {
  if (!Product) {
    return <div>Loading...</div>;
  }

  const { thumbnail, title, id, price, rating, description  } = Product;
  const [state,dispach] = useContext(DataContext)


 const addToCart =()=>{
  dispach({
    type:Type.ADD_TO_BASKET,
    item:{
      thumbnail, title, id, price, rating, description 
    }
  })
 }
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
        {
          renderaAdd && <button className={classes.addToCartButton} onClick={addToCart}>
          Add to Cart
        </button>
        }
        
      </div>
    </div>
  );
}

export default ProductCard2;
