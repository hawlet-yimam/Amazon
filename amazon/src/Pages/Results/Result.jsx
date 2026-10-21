import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductComponent from "../../components/Products/Product";
import LayOut from "../../components/LayOut/Layout";
import { getProductsByCategory } from "../../Api/Endpoint";
import { FaSmileWink } from "react-icons/fa";
import Loder from '../../components/Loder/Loder';

function Result() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      if (!categoryName) {
        setError("Category name is missing from the URL.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError("");

        const data = await getProductsByCategory(categoryName);

        console.log("Category:", categoryName);
        console.log("API response:", data);

        setProducts(data.products || []);
      } catch (err) {
        console.error("Product fetch failed:", err);
        setError("Failed to load products. Please check your API connection.");
      } finally {
        setIsLoading(false); 
      }
    };

    fetchProducts();
  }, [categoryName]);

  return (
    <LayOut>
      {isLoading ? (
        <Loder />
      ) : (
        <>
          <h2>{categoryName?.replaceAll("-", " ")} Products</h2>

          {error && <p style={{ color: "red" }}>{error}</p>}

          {!error && (
            <ProductComponent products={products} />
          )}
        </>
      )}
    </LayOut>
  );
}

export default Result;