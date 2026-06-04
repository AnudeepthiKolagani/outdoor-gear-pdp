import styles from "./QuantityPicker.module.scss";

interface QuantityPickerProps {
  quantity: number;
  maxQuantity: number;
  onQuantityChange: (quantity: number) => void;
}

export const QuantityPicker = ({
  quantity,
  maxQuantity,
  onQuantityChange,
}: QuantityPickerProps) => {
  return (
    <div className={styles.quantityPicker}>
      <label htmlFor="quantity" className={styles.label}>
        Quantity
      </label>

      <select
        id="quantity"
        value={quantity}
        onChange={(e) => onQuantityChange(Number(e.target.value))}
        className={styles.select}
        disabled={maxQuantity === 0}
      >
        {Array.from({ length: maxQuantity }, (_, index) => index + 1).map(
          (value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ),
        )}
      </select>
    </div>
  );
};
