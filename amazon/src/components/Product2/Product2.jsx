
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard2 from './ProductCard2';
import classes from './Product2.module.css';

function Product2() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios
      .get('https://dummyjson.com/products')
      .then((res) => setProduct(res.data.products))
      .catch((error) => console.error(error));
  }, []);

  return (
    
    <main className={classes.productsGrid}>
      {product.map((singleProduct) => (
        <ProductCard2  Product={singleProduct} key={singleProduct.id}
        />
      ))}
    </main>
  );
}

export default Product2;
