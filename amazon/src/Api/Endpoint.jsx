
const BASE_URL = "https://dummyjson.com";

export const getProductsByCategory = async (category) => {
  const response = await fetch(
    `${BASE_URL}/products/category/${category}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch category products");
  }

  return response.json();
};
