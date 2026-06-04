import { useState } from "react";
import type { JSX } from "react/jsx-runtime";
import styles from "./ProductGallery.module.scss";

export const ProductGallery = ({
  productImage,
}: {
  productImage: string;
}): JSX.Element => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const thumbnailImages = [
    productImage,
    productImage,
    "https://m.media-amazon.com/images/I/61KyvPWSv7L._SY741_.jpg",
    "https://m.media-amazon.com/images/I/61ZAQe+bddL._SY741_.jpg",
    "https://m.media-amazon.com/images/I/51BoVdE8j4L._SY741_.jpg",
  ];

  const heroImage =
    selectedIndex === -1 ? productImage : thumbnailImages[selectedIndex];

  return (
    <section className={styles.gallery}>
      <div className={styles.heroContainer}>
        <img src={heroImage} alt="Product" className={styles.heroImage} />
      </div>

      <div className={styles.thumbnailContainer}>
        {thumbnailImages.map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => setSelectedIndex(index)}
            className={`${styles.thumbnailButton}
              ${selectedIndex === index ? styles.active : ""}`}
          >
            <img
              src={src}
              alt={`Thumbnail ${index + 1}`}
              className={styles.thumbnailImage}
            />
          </button>
        ))}
      </div>

      <div className={styles.mobileDots}>
        {thumbnailImages.map((_, index) => (
          <span
            key={index}
            className={`${styles.dot}
              ${selectedIndex === index ? styles.dotActive : ""}`}
          />
        ))}
      </div>
    </section>
  );
};
