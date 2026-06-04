import type { JSX } from "react/jsx-runtime";
import styles from "./Description.module.scss";
import { productDescription } from "../../../data/productDetailsData";

export const Description = (): JSX.Element => {
  return (
    <div className={styles.description}>
      {productDescription.paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}

      <ul>
        {productDescription.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
    </div>
  );
};
