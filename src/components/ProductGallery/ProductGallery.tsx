import { useState, useRef } from "react";
import type { JSX } from "react/jsx-runtime";
import styles from "./ProductGallery.module.scss";

type ZoomState = {
  x: number;
  y: number;
  active: boolean;
};
interface ProductGalleryProps {
  productImage: string;
  zoom: ZoomState;
  setZoom: (value: ZoomState) => void;
}

export const ProductGallery = ({
  productImage,
  zoom,
  setZoom,
}: ProductGalleryProps): JSX.Element => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const imgRef = useRef<HTMLImageElement | null>(null);
  const frame = useRef<number | null>(null);

  const thumbnailImages = [
    productImage,
    productImage,
    "https://m.media-amazon.com/images/I/61KyvPWSv7L._SY741_.jpg",
    "https://m.media-amazon.com/images/I/61ZAQe+bddL._SY741_.jpg",
    "https://m.media-amazon.com/images/I/51BoVdE8j4L._SY741_.jpg",
  ];

  const heroImage = thumbnailImages[selectedIndex];

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imgRef.current) return;

    const rect = imgRef.current.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const xPercent = Math.min(1, Math.max(0, x));
    const yPercent = Math.min(1, Math.max(0, y));

    if (frame.current) cancelAnimationFrame(frame.current);

    frame.current = requestAnimationFrame(() => {
      setZoom({
        x: xPercent,
        y: yPercent,
        active: true,
      });
    });
  };

  const handleLeave = () => {
    setZoom({
      x: zoom.x,
      y: zoom.y,
      active: false,
    });
  };

  return (
    <section className={styles.gallery}>
      <div
        className={styles.galleryWrapper}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleLeave}
      >
        <img
          ref={imgRef}
          src={heroImage}
          alt="Product"
          className={styles.heroImage}
        />

        {/* LENS */}
        {zoom.active && (
          <div
            className={styles.zoomLens}
            style={{
              left: `${zoom.x * 100}%`,
              top: `${zoom.y * 100}%`,
            }}
          />
        )}
      </div>

      <div className={styles.thumbnailContainer}>
        {thumbnailImages.map((src, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setSelectedIndex(index)}
            className={`${styles.thumbnailButton} ${
              selectedIndex === index ? styles.active : ""
            }`}
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
