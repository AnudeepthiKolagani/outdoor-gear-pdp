import { useState } from "react";
import type { JSX } from "react/jsx-runtime";
import styles from "./ProductGallery.module.scss";

const thumbnailImages = [
  "https://m.media-amazon.com/images/I/61m1acM1l6L._SY741_.jpg",
  "https://m.media-amazon.com/images/I/61KyvPWSv7L._SY741_.jpg",
  "https://m.media-amazon.com/images/I/61ZAQe+bddL._SY741_.jpg",
  "https://m.media-amazon.com/images/I/51BoVdE8j4L._SY741_.jpg",
];

const HERO_IMAGE =
  "https://m.media-amazon.com/images/I/61JxoCDF35L._SY879_.jpg";

export const ProductGallery = (): JSX.Element => {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const heroImage =
    selectedIndex === -1 ? HERO_IMAGE : thumbnailImages[selectedIndex];

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
