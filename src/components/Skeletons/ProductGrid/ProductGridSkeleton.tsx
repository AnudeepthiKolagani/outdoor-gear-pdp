import type { JSX } from "react/jsx-runtime";
import { ProductCardSkeleton } from "../ProductCard/ProductCardSkeleton";
import styles from "./ProductGridSkeleton.module.scss";

export const ProductGridSkeleton = (): JSX.Element => {
  return (
    <div className={styles.container}>
      {Array.from({ length: 8 }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};
