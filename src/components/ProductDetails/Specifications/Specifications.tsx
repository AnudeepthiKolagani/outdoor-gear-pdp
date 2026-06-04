import type { JSX } from "react/jsx-runtime";
import styles from "./Specifications.module.scss";
import { productSpecifications } from "../../../data/productDetailsData";

export const Specifications = (): JSX.Element => {
  return (
    <table className={styles.table}>
      <tbody>
        {productSpecifications.map((item) => (
          <tr key={item.label}>
            <th>{item.label}</th>
            <td>{item.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
