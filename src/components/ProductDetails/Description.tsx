import type { JSX } from "react/jsx-runtime";
import styles from "./Description.module.scss";

export const Description = (): JSX.Element => {
  return (
    <div className={styles.description}>
      <p>
        Experience premium sound quality with advanced noise cancellation,
        crystal-clear voice pickup, and an ergonomic design built for all-day
        comfort.
      </p>

      <p>
        Designed for work, travel, and entertainment, these headphones deliver
        immersive audio, long battery life, and seamless connectivity across
        devices.
      </p>

      <ul>
        <li>Active Noise Cancellation</li>
        <li>Up to 30 Hours Battery Life</li>
        <li>Bluetooth 5.3 Connectivity</li>
        <li>Fast Charging Support</li>
        <li>Premium Over-Ear Comfort</li>
      </ul>
    </div>
  );
};
