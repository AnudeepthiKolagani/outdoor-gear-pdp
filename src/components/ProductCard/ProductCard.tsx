import { useNavigate } from "react-router-dom";
import type { JSX } from "react/jsx-runtime";
import styles from "./ProductCard.module.scss";

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
export const ProductCard = ({ product }: { product: Product }): JSX.Element => {
  const navigate = useNavigate();
  return (
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

        <p className={styles.productDescription}>{product.description}</p>

        <div className={styles.price}>${product.price}</div>

        <div className={styles.rating}>
          ⭐ {product.rating.rate}
          <span className={styles.reviewCount}>
            ({product.rating.count} reviews)
          </span>
        </div>
      </div>
    </div>
  );
};
