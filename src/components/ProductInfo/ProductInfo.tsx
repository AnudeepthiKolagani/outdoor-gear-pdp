import { useState, useEffect } from "react";
import { ColorSelector } from "./ColorSelector/ColorSelector";
import { SizeSelector } from "./SizeSelector/SizeSelector";
import { QuantityPicker } from "./QunatityPicker/QuantityPicker";
import { useSearchParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import type { ColorOption, Product, SizeOption } from "../../data/productData";
import { defaultColors, defaultSizes } from "../../data/productData";
import styles from "./ProductInfo.module.scss";

type ZoomState = {
  x: number;
  y: number;
  active: boolean;
};

interface ProductInfoProps {
  product: Product | null;
  zoom: ZoomState;
  heroImage?: string;
}
export const ProductInfo = ({ product, zoom, heroImage }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useCart();
  const { x, y, active } = zoom;
  const image = product?.image;
  const zoomImage = heroImage ?? image;

  const selectedColor = searchParams.get("color");
  const selectedSize = searchParams.get("size");
  const productWithVariants = {
    ...(product ?? {}),
    colors: product?.colors ?? defaultColors,
  } as Product & { colors: ColorOption[] };

  const selectedColorVariant =
    productWithVariants.colors.find((color) => color.name === selectedColor) ||
    productWithVariants.colors[0];

  const sizeOptions: SizeOption[] =
    selectedColorVariant.sizes.length > 0
      ? selectedColorVariant.sizes
      : defaultSizes;

  const selectedSizeVariant =
    sizeOptions.find((size) => size.code === selectedSize) || sizeOptions[0];

  const isSelectedVariantOutOfStock =
    selectedColorVariant.stock === 0 || selectedSizeVariant.stock === 0;
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    let shouldUpdate = false;

    if (!params.get("color")) {
      params.set("color", productWithVariants.colors[0].name);
      shouldUpdate = true;
    }
    if (!params.get("size")) {
      params.set("size", sizeOptions[0]?.code ?? defaultSizes[0].code);
      shouldUpdate = true;
    }

    if (shouldUpdate) {
      setSearchParams(params, { replace: true });
    }
  }, [productWithVariants.colors, searchParams, setSearchParams, sizeOptions]);

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
          className={`${styles.zoomPreview} ${active ? styles.active : ""}`}
          style={
            {
              "--bg-image": `url(${zoomImage})`,
              "--bg-position": active ? `${x * 100}% ${y * 100}%` : "center",
            } as React.CSSProperties
          }
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
            <span className={styles.salePrice} data-testid="sale-price">
              ₹{product?.price?.toLocaleString()}
            </span>

            <span className={styles.originalPrice} data-testid="original-price">
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
        availableSizes={sizeOptions}
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
        data-testid="add-to-cart"
        disabled={isSelectedVariantOutOfStock}
        onClick={() => {
          if (!product || isSelectedVariantOutOfStock) {
            return;
          }

          addToCart({
            productId: product.id,
            color: selectedColor ?? selectedColorVariant.name,
            size: selectedSize ?? selectedSizeVariant.code,
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
