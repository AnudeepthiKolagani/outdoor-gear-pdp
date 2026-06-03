import styles from "./ColorSelector.module.scss";

const COLORS = ["#111827", "#1F6B42", "#2563EB"];

export const ColorSelector = () => {
  return (
    <div>
      <h3>Color</h3>

      <div className={styles.swatches}>
        {COLORS.map((color) => (
          <button
            key={color}
            className={styles.swatch}
            style={{
              backgroundColor: color,
            }}
          />
        ))}
      </div>
    </div>
  );
};
