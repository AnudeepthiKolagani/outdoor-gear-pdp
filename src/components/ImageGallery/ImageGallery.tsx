import type { JSX } from "react/jsx-runtime";
import { useState } from "react";
import styles from "./ImageGallery.module.scss";

const thumbnailImages = [
  "https://m.media-amazon.com/images/I/61m1acM1l6L._SY741_.jpg",
  "https://m.media-amazon.com/images/I/61KyvPWSv7L._SY741_.jpg",
  "https://m.media-amazon.com/images/I/61ZAQe+bddL._SY741_.jpg",
  "https://m.media-amazon.com/images/I/51BoVdE8j4L._SY741_.jpg",
];
export const ImageGallery = (): JSX.Element => {
  const [heroImage, setHeroImage] = useState(
    "https://m.media-amazon.com/images/I/61JxoCDF35L._SY879_.jpg",
  );
  return (
    <div className="image-gallery">
      {/* Product Image */}
      <img src={heroImage} alt="Product Image" />

      {/* Thumbnail Images */}
      <div className={styles.thumbnailContainer}>
        {thumbnailImages.map((src, index) => {
          return (
            <div key={index} onClick={() => setHeroImage(src)}>
              <img
                key={index}
                src={src}
                alt={`Thumbnail ${index + 1}`}
                className={styles.thumbnailImage}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
