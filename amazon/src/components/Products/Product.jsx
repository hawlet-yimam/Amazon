import React from 'react';
import  Product  from "./ProductInfo";
import classes from './Product.module.css';

function ProductComponent() {
  return (
    <section className={classes.product__container}>
      {Product.map((singleProduct, index) => (
        <div 
          key={singleProduct.id} 
          className={classes.category__card}
        >
          <h2>{singleProduct.title}</h2>
          
          <a href={`/Product/${singleProduct.category}`}>
            <img 
              src={singleProduct.image} 
              alt={singleProduct.title} 
            />
          </a>
          <p className={classes.product__price}>${singleProduct.price}</p>
          
        </div>
      ))}
    </section>
  );
}

export default ProductComponent;
