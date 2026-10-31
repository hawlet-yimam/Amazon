import React, { useEffect, useState } from 'react';
import LayOut from '../../components/LayOut/Layout';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard2 from '../../components/Product2/ProductCard2';
import classes from "./ProductDetail.module.css";
import Loder from '../../components/Loder/Loder'; 

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!productId) return;

    setIsLoading(true);
    axios.get(`https://dummyjson.com/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("API Error:", err);
        setIsLoading(false);
      });
  }, [productId]);

  return (
    <LayOut>
      {isLoading ? (
        <Loder />
      ) : (
        <div className={classes.detailCardContainer}>
          {product ? (
            <ProductCard2 renderaAdd={true} Product={product} flex={true} renderDesc={true}/>
          ) : (
            <div style={{ padding: "50px", textAlign: "center" }}>
              <h2>Product Not Found</h2>
            </div>
          )}
        </div>
      )}
    </LayOut>
  );
}

export default ProductDetail;