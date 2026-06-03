import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Products.module.scss";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
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
            <div
              className={styles.productCard}
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div className={styles.imageContainer}>
                <img
                  src={product.image}
                  alt={product.title}
                  className={styles.productImage}
                />
              </div>

              <div className={styles.cardContent}>
                <h2 className={styles.productTitle}>{product.title}</h2>

                <p className={styles.productDescription}>
                  {product.description}
                </p>

                <div className={styles.price}>${product.price}</div>

                <div className={styles.rating}>
                  ⭐ {product.rating.rate}
                  <span className={styles.reviewCount}>
                    ({product.rating.count} reviews)
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
};
