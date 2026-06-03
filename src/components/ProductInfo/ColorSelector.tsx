import { useState } from "react";
import styles from "./ColorSelector.module.scss";

interface Color {
  id: number;
  name: string;
  hex: string;
}
export const ColorSelector = ({
  availableColors,
}: {
  availableColors: Color[];
}) => {
  const [activeColor, setActiveColor] = useState(availableColors[0]);
  return (
    <div>
      <h3>Color: {activeColor.name}</h3>

      <div className={styles.swatches}>
        {availableColors.map((color, index) => (
          <div key={index}>
            <button
              onClick={() => setActiveColor(color)}
              className={`${styles.swatch} ${activeColor.id === color.id ? styles.active : ""}`}
              style={{ backgroundColor: color.hex }}
            >
              {/* <img
                src={option.image}
                alt={`Product with color: ${option.name}`}
              /> */}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
