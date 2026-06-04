import styles from "./Products.module.scss";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { ProductGridSkeleton } from "../../components/Skeletons/ProductGrid/ProductGridSkeleton";
import { useProducts } from "../../context/ProductContext";
import { ShoppingCartIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Products = () => {
  const { products, isLoading, error, reload } = useProducts();
  const navigate = useNavigate();

  if (isLoading) {
    return <ProductGridSkeleton />;
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p>{error}</p>
        <button onClick={reload}>Retry</button>
      </div>
    );
  }

  if (products.length === 0) {
    return <p>No products available.</p>;
  }

  return (
    <div className={styles.pageLayout}>
      <div className={styles.header}>
        <ShoppingCartIcon
          className={styles.shoppingCartIcon}
          onClick={() => navigate("/cart")}
        />
      </div>
      <div className={styles.productsContainer}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
