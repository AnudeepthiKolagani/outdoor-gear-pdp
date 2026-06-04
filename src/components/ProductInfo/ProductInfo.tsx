import { useState, useEffect } from "react";
import { ColorSelector } from "./ColorSelector";
import { SizeSelector } from "./SizeSelector";
import { QuantityPicker } from "./QuantityPicker";
import { useSearchParams } from "react-router-dom";
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
const availableSizes = [
  {
    id: 1,
    size: "S",
    stock: 12,
  },
  {
    id: 2,
    size: "M",
    stock: 8,
  },
  {
    id: 3,
    size: "L",
    stock: 5,
  },
  {
    id: 4,
    size: "XL",
    stock: 2,
  },
  {
    id: 5,
    size: "XXL",
    stock: 0,
  },
];

const availableColors = [
  { id: 1, name: "Black", hex: "#1F2937", stock: 10 },
  { id: 2, name: "White", hex: "#F9FAFB", stock: 0 },
  { id: 3, name: "Navy Blue", hex: "#1E3A8A", stock: 8 },
  { id: 4, name: "Forest Green", hex: "#166534", stock: 2 },
  { id: 5, name: "Burgundy", hex: "#7F1D1D", stock: 14 },
];

export const ProductInfo = ({ product }: { product: Product | null }) => {
  const [quantity, setQuantity] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedColor = searchParams.get("color");
  const selectedSize = searchParams.get("size");
  console.log("Color ,size", searchParams);
  const productWithVariants = {
    ...product,
    colors: availableColors,
    availableSizes: availableSizes,
  };
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    let shouldUpdate = false;

    if (!params.get("color")) {
      params.set("color", availableColors[0].name);
      shouldUpdate = true;
    }
    if (!params.get("size")) {
      params.set("size", availableSizes[0].size);
      shouldUpdate = true;
    }

    if (shouldUpdate) {
      setSearchParams(params, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const handleColorChange = (colorName: string): void => {
    const params = new URLSearchParams(searchParams);
    params.set("color", colorName);
    setSearchParams(params);
  };

  const handleSizeChange = (size: string): void => {
    const params = new URLSearchParams(searchParams);
    params.set("size", size);
    setSearchParams(params);
  };

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

      <ColorSelector
        availableColors={productWithVariants.colors}
        selectedColor={selectedColor}
        handleColorChange={handleColorChange}
      />

      <SizeSelector
        availableSizes={productWithVariants.availableSizes}
        selectedSize={selectedSize}
        handleSizeChange={handleSizeChange}
      />

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
