import { useState, useEffect } from "react";
import { ColorSelector } from "./ColorSelector";
import { SizeSelector } from "./SizeSelector";
import { QuantityPicker } from "./QuantityPicker";
import { useSearchParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import type { Product } from "../../data/productData";
import { defaultColors, defaultSizes } from "../../data/productData";
import styles from "./ProductInfo.module.scss";

type ZoomState = {
  x: number;
  y: number;
  active: boolean;
};

interface ProductInfoProps {
  product: Product;
  zoom: ZoomState;
}
export const ProductInfo = ({ product, zoom }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useCart();
  const { x, y, active } = zoom;
  const image = product?.image;

  const selectedColor = searchParams.get("color");
  const selectedSize = searchParams.get("size");
  const productWithVariants = {
    ...(product ?? {}),
    colors: defaultColors,
    availableSizes: defaultSizes,
  };

  const selectedColorVariant =
    productWithVariants.colors.find((color) => color.name === selectedColor) ||
    productWithVariants.colors[0];
  const selectedSizeVariant =
    productWithVariants.availableSizes.find(
      (size) => size.code === selectedSize,
    ) || productWithVariants.availableSizes[0];

  const isSelectedVariantOutOfStock =
    selectedColorVariant.stock === 0 || selectedSizeVariant.stock === 0;
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    let shouldUpdate = false;

    if (!params.get("color")) {
      params.set("color", defaultColors[0].name);
      shouldUpdate = true;
    }
    if (!params.get("size")) {
      params.set("size", defaultSizes[0].code);
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

  const handleSizeChange = (code: string): void => {
    const params = new URLSearchParams(searchParams);
    params.set("size", code);
    setSearchParams(params);
  };

  if (active) {
    return (
      <div style={{ flex: 1 }}>
        <div
          style={{
            width: "500px",
            height: "500px",
            border: "1px solid #eee",
            overflow: "hidden",
            position: "relative",

            backgroundImage: `url(${image})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "250%",
            backgroundPosition: active ? `${x * 100}% ${y * 100}%` : "center",

            transition: active ? "none" : "background-position 0.2s ease",
          }}
        />
      </div>
    );
  }

  return (
    <section className={styles.productInfo}>
      <h1 className={styles.title}>{product?.title || "Product Title"}</h1>
      <h3 className={styles.brand}>{product?.brand}</h3>
      <div className={styles.priceContainer}>
        {product?.isOnSale ? (
          <>
            <span className={styles.salePrice}>
              ₹{product?.price?.toLocaleString()}
            </span>

            <span className={styles.originalPrice}>
              ₹{(product?.price * 1.5).toLocaleString()}
            </span>
          </>
        ) : (
          <span className={styles.salePrice}>
            ₹{product?.price?.toLocaleString()}
          </span>
        )}
      </div>

      <ColorSelector
        availableColors={productWithVariants.colors}
        selectedColor={selectedColor}
        handleColorChange={handleColorChange}
      />

      {selectedColorVariant.stock === 0 && (
        <p className={styles.stockStatus}>Selected color is out of stock.</p>
      )}

      <SizeSelector
        availableSizes={productWithVariants.availableSizes}
        selectedSize={selectedSize}
        handleSizeChange={handleSizeChange}
      />
      {selectedSizeVariant.stock <= 2 && selectedColorVariant.stock > 0 ? (
        <p className={styles.stockStatus}>
          Only {selectedSizeVariant.stock} left
        </p>
      ) : (
        selectedColorVariant.stock > 0 && (
          <p className={styles.availableStockStatus}>Avialble</p>
        )
      )}

      <QuantityPicker
        quantity={quantity}
        // Calculate and pass maxQuantity based on stock
        maxQuantity={10}
        onQuantityChange={setQuantity}
      />

      <button
        className={styles.addToCartBtn}
        type="button"
        disabled={isSelectedVariantOutOfStock}
        onClick={() => {
          if (!product || isSelectedVariantOutOfStock) {
            return;
          }

          addToCart({
            productId: product.id,
            color: selectedColor ?? defaultColors[0].name,
            size: selectedSize ?? defaultSizes[0].code,
            quantity,
          });
        }}
      >
        {isSelectedVariantOutOfStock ? "Out of Stock" : "Add to Cart"}
      </button>

      {selectedColorVariant.stock > 0 && (
        <p className={styles.deliveryEstimate}>
          Estimated delivery: 3-5 business days
        </p>
      )}
    </section>
  );
};
