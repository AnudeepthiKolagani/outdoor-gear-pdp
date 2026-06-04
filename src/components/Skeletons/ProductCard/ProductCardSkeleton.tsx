import type { JSX } from "react/jsx-runtime";
import styles from "./ProductCardSkeleton.module.scss";

export const ProductCardSkeleton = (): JSX.Element => {
  return (
    <div className={styles.card}>
      <div className={styles.image} />

      <div className={styles.content}>
        <div className={styles.title} />

        <div className={styles.description} />
        <div className={styles.description} />
        <div className={styles.descriptionShort} />

        <div className={styles.price} />

        <div className={styles.rating} />
      </div>
    </div>
  );
};
