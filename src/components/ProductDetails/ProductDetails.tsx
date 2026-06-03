import type { JSX } from "react/jsx-runtime";
import { useState } from "react";
import { Description } from "./Description";
import { Reviews } from "./Reviews";
import { Specifications } from "./Specifications";
import styles from "./ProductDetails.module.scss";

const tabs = ["Description", "Specifications", "Reviews"];
export const ProductDetails = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  return (
    <div>
      <h1>Product Details</h1>
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={styles.tab}
          >
            {tab}
          </button>
        ))}
      </div>
      {activeTab === "Description" && <Description />}
      {activeTab === "Specifications" && <Specifications />}
      {activeTab === "Reviews" && <Reviews />}
    </div>
  );
};
