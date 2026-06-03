import type { JSX } from "react/jsx-runtime";
import styles from "./Specifications.module.scss";

const specifications = [
  { label: "Brand", value: "Sony" },
  { label: "Model", value: "WH-1000XM5" },
  { label: "Connectivity", value: "Bluetooth 5.3" },
  { label: "Battery Life", value: "30 Hours" },
  { label: "Charging Port", value: "USB Type-C" },
  { label: "Weight", value: "250 g" },
  { label: "Warranty", value: "1 Year" },
];

export const Specifications = (): JSX.Element => {
  return (
    <table className={styles.table}>
      <tbody>
        {specifications.map((item) => (
          <tr key={item.label}>
            <th>{item.label}</th>
            <td>{item.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
