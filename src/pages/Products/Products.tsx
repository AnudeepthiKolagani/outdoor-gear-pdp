import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Products.module.scss";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { ProductGridSkeleton } from "../../components/Skeletons/ProductGrid/ProductGridSkeleton";

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

const PRODUCTS_API_URL = "https://fakestoreapi.com/products";

export const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await axios.get<Product[]>(PRODUCTS_API_URL);

        setProducts(response.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(
            err.response?.data?.message ||
              "Failed to fetch products. Please try again.",
          );
        } else {
          setError("Something went wrong. Please try again.");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (isLoading) {
    return <ProductGridSkeleton />;
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p>{error}</p>
        <button onClick={fetchProducts}>Retry</button>
      </div>
    );
  }

  if (products.length === 0) {
    return <p>No products available.</p>;
  }

  return (
    <div className={styles.productsContainer}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
