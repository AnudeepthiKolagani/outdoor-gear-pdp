import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Products.module.scss";
import { ProductCard } from "../../components/ProductCard/ProductCard";

interface Product {
  id: number;
  description: string;
  image: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
  title: string;
  category: string;
}

export const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const PRODUCTS_API_URL = "https://fakestoreapi.com/products";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(PRODUCTS_API_URL);
        console.log("Fetched products:", response.data);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      {products.length > 0 ? (
        <div className={styles.productsContainer}>
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
};
