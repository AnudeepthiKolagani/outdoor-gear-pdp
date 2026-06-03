import { useState } from "react";
import { ColorSelector } from "./ColorSelector";
import { SizeSelector } from "./SizeSelector";
import { QuantityPicker } from "./QuantityPicker";
import styles from "./ProductInfo.module.scss";

export const ProductInfo = () => {
  const [quantity, setQuantity] = useState(1);

  return (
    <section className={styles.productInfo}>
      <h1 className={styles.title}>
        CHKOKKO Sunscreen Jacket for Women Hooded Zipper Sports Jacket | UV
        Protection | Sun Protective | Lightweight Water Resistant | Riding Biker
        | Outdoor Travel Gym Running
      </h1>
      {/* Need to add brand  */}
      {/* <p className={styles.brand}>SummitGear</p> */}

      <div className={styles.priceContainer}>
        <span className={styles.salePrice}>₹12,999</span>

        <span className={styles.originalPrice}>₹15,999</span>
      </div>

      <ColorSelector />

      <SizeSelector />

      <QuantityPicker
        quantity={quantity}
        maxQuantity={10}
        onQuantityChange={setQuantity}
      />

      <button className={styles.addToCartBtn}>Add to Cart</button>

      <p className={styles.deliveryEstimate}>
        Estimated delivery: 3-5 business days
      </p>
    </section>
  );
};
