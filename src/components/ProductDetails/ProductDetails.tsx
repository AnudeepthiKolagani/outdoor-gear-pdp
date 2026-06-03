import { useState } from "react";
import type { JSX } from "react/jsx-runtime";

import { Description } from "./Description";
import { Specifications } from "./Specifications";
import { Reviews } from "./Reviews";

import styles from "./ProductDetails.module.scss";

const tabs = ["Description", "Specifications", "Reviews"] as const;

export const ProductDetails = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState("Description");

  return (
    <section className={styles.productDetails}>
      <h2 className={styles.heading}>Product Details</h2>

      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`${styles.tab} ${
              activeTab === tab ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className={styles.content}>
        {activeTab === "Description" && <Description />}
        {activeTab === "Specifications" && <Specifications />}
        {activeTab === "Reviews" && <Reviews />}
      </div>
    </section>
  );
};
