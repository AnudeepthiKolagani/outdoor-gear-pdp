import { useState } from "react";
import styles from "./SizeSelector.module.scss";

interface SizeOption {
  id: number;
  size: string;
  stock: number;
}

interface SizeSelectorProps {
  availableSizes: SizeOptions[];
  selectedSize: string | null;
  handleSizeChange: (size: string) => void;
}
export const SizeSelector = ({
  availableSizes,
  selectedSize,
  handleSizeChange,
}: SizeSelectorProps) => {
  const activeSize =
    availableSizes.find((size) => size.size === selectedSize) ||
    availableSizes[0];

  return (
    <div>
      <h3>Size: {activeSize.size}</h3>

      <div className={styles.sizes}>
        {availableSizes.map((size, index) => (
          <button
            key={size.id}
            disabled={size.stock === 0}
            className={`${styles.sizeBtn} ${activeSize.id === size.id ? styles.selected : ""}
            ${size.stock === 0 ? styles.soldOut : ""}`}
            onClick={() => handleSizeChange(size.size)}
          >
            {size.size}

            {/* {size.stock === 2 && <span>Only 2 left</span>} */}
          </button>
        ))}
      </div>
    </div>
  );
};
