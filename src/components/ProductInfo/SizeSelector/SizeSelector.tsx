import styles from "./SizeSelector.module.scss";

import type { SizeOption } from "../../../data/productData";

interface SizeSelectorProps {
  availableSizes: SizeOption[];
  selectedSize: string | null;
  handleSizeChange: (code: string) => void;
}
export const SizeSelector = ({
  availableSizes,
  selectedSize,
  handleSizeChange,
}: SizeSelectorProps) => {
  const activeSize =
    availableSizes.find((size) => size.code === selectedSize) ||
    availableSizes[0];

  return (
    <div>
      <h3>Size: {activeSize.code}</h3>

      <div className={styles.sizes}>
        {availableSizes.map((size) => (
          <button
            key={size.id}
            title={size.stock === 0 ? "Currently out of stock" : ""}
            disabled={size.stock === 0}
            className={`${styles.sizeBtn} ${activeSize.id === size.id ? styles.selected : ""}
            ${size.stock === 0 ? styles.soldOut : ""}`}
            onClick={() => handleSizeChange(size.code)}
          >
            {size.code}

            {/* {size.stock === 2 && <span>Only 2 left</span>} */}
          </button>
        ))}
      </div>
    </div>
  );
};
