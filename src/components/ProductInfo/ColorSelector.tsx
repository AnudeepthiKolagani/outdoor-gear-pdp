import { useState } from "react";
import styles from "./ColorSelector.module.scss";

const COLOR_OPTIONS = [
  {
    name: "Black",
    image: "https://m.media-amazon.com/images/I/31zydJEKgCL._SS64_.jpg",
  },
  {
    name: "Navy",
    image: "https://m.media-amazon.com/images/I/31Ab9-5Ic9L._SS64_.jpg",
  },
  {
    name: "Olive",
    image: "https://m.media-amazon.com/images/I/31WXAB+ib2L._SS64_.jpg",
  },
];

export const ColorSelector = () => {
  const [activeColor, setActiveColor] = useState(0);
  return (
    <div>
      <h3>Color: {COLOR_OPTIONS[activeColor].name}</h3>

      <div className={styles.swatches}>
        {COLOR_OPTIONS.map((option, index) => (
          <div>
            <button
              onClick={() => setActiveColor(index)}
              className={`${styles.swatch} ${activeColor === index ? styles.active : ""}`}
            >
              <img
                src={option.image}
                alt={`Product with color: ${option.name}`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
