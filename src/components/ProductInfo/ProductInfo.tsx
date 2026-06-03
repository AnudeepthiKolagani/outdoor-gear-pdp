import { useState } from "react";
import { ColorSelector } from "./ColorSelector";
import { SizeSelector } from "./SizeSelector";
import { QuantityPicker } from "./QuantityPicker";
import styles from "./ProductInfo.module.scss";

interface Product {
  id: number;
  description: string;
  image: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
  title: string;
  category: string;
}

export const ProductInfo = ({ product }: { product: Product | null }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <section className={styles.productInfo}>
      <h1 className={styles.title}>{product?.title || "Product Title"}</h1>
      {/* Need to add brand  */}
      {/* <p className={styles.brand}>SummitGear</p> */}

      <div className={styles.priceContainer}>
        <span className={styles.salePrice}>
          ₹{product?.price?.toLocaleString()}
        </span>

        <span className={styles.originalPrice}>
          ₹{(product?.price ?? 1000 * 1.2).toLocaleString()}
        </span>
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
