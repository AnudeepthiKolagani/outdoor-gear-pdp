import styles from "./SizeSelector.module.scss";

const SIZES = [
  {
    label: "S",
    stock: 10,
  },
  {
    label: "M",
    stock: 2,
  },
  {
    label: "L",
    stock: 0,
  },
  {
    label: "XL",
    stock: 8,
  },
];

export const SizeSelector = () => {
  return (
    <div>
      <h3>Size</h3>

      <div className={styles.sizes}>
        {SIZES.map((size) => (
          <button
            key={size.label}
            disabled={size.stock === 0}
            className={`${styles.sizeBtn}
            ${size.stock === 0 ? styles.soldOut : ""}`}
          >
            {size.label}

            {/* {size.stock === 2 && <span>Only 2 left</span>} */}
          </button>
        ))}
      </div>
    </div>
  );
};
