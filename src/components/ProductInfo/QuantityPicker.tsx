import { useState } from "react";
import styles from "./QuantityPicker.module.scss";

export const QuantityPicker = () => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div>
      <h3>Quantity</h3>

      <div className={styles.container}>
        <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
          -
        </button>

        <span>{quantity}</span>

        <button onClick={() => setQuantity((q) => Math.min(10, q + 1))}>
          +
        </button>
      </div>
    </div>
  );
};
