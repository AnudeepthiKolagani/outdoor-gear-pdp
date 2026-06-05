import styles from "./ProductInfoSkeleton.module.scss";

export const ProductInfoSkeleton = () => {
  return (
    <section className={styles.productInfo}>
      {/* Title */}
      <div className={styles.title} />

      {/* Brand */}
      <div className={styles.brand} />

      {/* Price */}
      <div className={styles.priceContainer}>
        <div className={styles.salePrice} />
        <div className={styles.originalPrice} />
      </div>

      {/* Color Selector */}
      <div className={styles.sectionBlock}>
        <div className={styles.sectionTitle} />
        <div className={styles.colorRow}>
          <div className={styles.colorBox} />
          <div className={styles.colorBox} />
          <div className={styles.colorBox} />
        </div>
      </div>

      {/* Size Selector */}
      <div className={styles.sectionBlock}>
        <div className={styles.sectionTitle} />
        <div className={styles.sizeRow}>
          <div className={styles.sizeBox} />
          <div className={styles.sizeBox} />
          <div className={styles.sizeBox} />
        </div>
      </div>

      {/* Stock Text */}
      <div className={styles.stockLine} />

      {/* Quantity */}
      <div className={styles.quantityRow}>
        <div className={styles.quantityBox} />
      </div>

      {/* Button */}
      <div className={styles.button} />

      {/* Delivery */}
      <div className={styles.delivery} />
    </section>
  );
};
