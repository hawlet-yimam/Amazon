import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import classes from "./Product.module.css";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import { DataContext } from '../DataProvider/DataProvider'; 
import { Type } from '../../Utility/action.type'; 

function ProductComponent({ products = [] }) {
  const [state, dispatch] = useContext(DataContext);

  const addToCart = (product) => {
    const { id, title, price, rating, description, thumbnail, images } = product;
    
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: {
        id,
        title,
        price,
        rating,
        description,
        thumbnail: thumbnail || images?.[0]
      }
    });
  };

  return (
    <section className={classes.product__container}>
      {products.length === 0 ? (
        <p>No products found in this category.</p>
      ) : (
        products.map((product) => (
          <div key={product.id} className={classes.category__card}>
            {/* 1. Title */}
            <h3>{product.title}</h3>
            <Link to={`/ProductDetail/${product.id}`}>
              <img
                src={
                  product.thumbnail ||
                  product.images?.[0] ||
                  "https://placehold.co/300x300?text=No+Image"
                }
                alt={product.title}
              />
            </Link>

            {/* 3. Rating */}
            <div className={classes.rating}>
              <span>⭐ {product.rating}</span>
            </div>

            {/* 4. Price */}
            <div className={classes.product__price}>
              <CurrencyFormat amount={product.price} />
            </div>
            <button className={classes.button} onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))
      )}
    </section>
  );
}

export default ProductComponent;