import styles from "./ColorSelector.module.scss";

import type { ColorOption } from "../../data/productData";

interface ColorSelectorProps {
  availableColors: ColorOption[];
  selectedColor: string | null;
  handleColorChange: (color: string) => void;
}
export const ColorSelector = ({
  availableColors,
  selectedColor,
  handleColorChange,
}: ColorSelectorProps) => {
  const activeColor =
    availableColors.find((color) => color.name === selectedColor) ||
    availableColors[0];
  return (
    <div>
      <h3>Color: {activeColor.name}</h3>

      <div className={styles.swatches}>
        {availableColors.map((color, index) => (
          <div key={index}>
            <button
              type="button"
              onClick={() => {
                handleColorChange(color.name);
              }}
              title={color.stock === 0 ? "Out of stock" : color.name}
              className={`${styles.swatch} ${activeColor.id === color.id ? styles.active : ""}`}
              style={{ backgroundColor: color.hex }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
