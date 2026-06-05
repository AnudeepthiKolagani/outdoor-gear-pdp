import { useState, useEffect } from "react";
import { ColorSelector } from "./ColorSelector/ColorSelector";
import { SizeSelector } from "./SizeSelector/SizeSelector";
import { QuantityPicker } from "./QunatityPicker/QuantityPicker";
import { useSearchParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../hooks/useToast";
import type { ColorOption, Product, SizeOption } from "../../data/productData";
import { defaultColors, defaultSizes } from "../../data/productData";
import styles from "./ProductInfo.module.scss";
import { ProductInfoSkeleton } from "../Skeletons/ProductInfo/ProductInfoSkeleton";

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
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addToCart } = useCart();
  const { showSuccess, showError } = useToast();
  const { x, y, active } = zoom;
  const image = product?.image;
  const zoomImage = heroImage ?? image;

  const selectedColor = searchParams.get("color");
  const selectedSize = searchParams.get("size");

  // Type guard to ensure colors array
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

  // Initialize URL parameters for color and size
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
    try {
      const params = new URLSearchParams(searchParams);
      params.set("color", colorName);
      setSearchParams(params);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to change color";
      showError(errorMessage);
      console.error("Error changing color:", err);
    }
  };

  const handleSizeChange = (code: string): void => {
    try {
      const params = new URLSearchParams(searchParams);
      params.set("size", code);
      setSearchParams(params);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to change size";
      showError(errorMessage);
      console.error("Error changing size:", err);
    }
  };

  const handleAddToCart = (): void => {
    try {
      if (!product) {
        throw new Error("Product information is not available");
      }

      if (isSelectedVariantOutOfStock) {
        throw new Error(
          "Selected variant is out of stock. Please choose another option.",
        );
      }

      if (quantity <= 0) {
        throw new Error("Quantity must be greater than 0");
      }

      const selectedColorName = selectedColor ?? selectedColorVariant.name;
      const selectedSizeCode = selectedSize ?? selectedSizeVariant.code;

      if (!selectedColorName || !selectedSizeCode) {
        throw new Error("Please select both color and size");
      }

      setIsAddingToCart(true);

      addToCart(
        {
          productId: product.id,
          color: selectedColorName,
          size: selectedSizeCode,
          quantity,
        },
        () => {
          showSuccess(`${product.title} added to cart successfully!`);
          setIsAddingToCart(false);
          // Reset quantity after successful add
          setQuantity(1);
        },
      );
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to add product to cart";
      showError(errorMessage);
      setIsAddingToCart(false);
      console.error("Error adding to cart:", err);
    }
  };

  // Show zoom preview if active
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

  if (!product) {
    return <ProductInfoSkeleton />;
  }

  return (
    <section className={styles.productInfo}>
      <h1 className={styles.title}>{product.title}</h1>
      <h3 className={styles.brand}>{product.brand}</h3>
      <div className={styles.priceContainer}>
        {product.isOnSale ? (
          <>
            <span className={styles.salePrice} data-testid="sale-price">
              ₹{product.price.toLocaleString()}
            </span>

            <span className={styles.originalPrice} data-testid="original-price">
              ₹{(product.price * 1.5).toLocaleString()}
            </span>
          </>
        ) : (
          <span className={styles.salePrice}>
            ₹{product.price.toLocaleString()}
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
          <p className={styles.availableStockStatus}>Available</p>
        )
      )}

      <QuantityPicker
        quantity={quantity}
        maxQuantity={selectedSizeVariant.stock}
        onQuantityChange={setQuantity}
      />

      <button
        className={styles.addToCartBtn}
        type="button"
        data-testid="add-to-cart"
        disabled={isSelectedVariantOutOfStock || isAddingToCart}
        onClick={handleAddToCart}
        aria-label={
          isSelectedVariantOutOfStock
            ? "Selected variant is out of stock"
            : "Add product to cart"
        }
      >
        {isAddingToCart
          ? "Adding to Cart..."
          : isSelectedVariantOutOfStock
            ? "Out of Stock"
            : "Add to Cart"}
      </button>

      {selectedColorVariant.stock > 0 && (
        <p className={styles.deliveryEstimate}>
          Estimated delivery: 3-5 business days
        </p>
      )}
    </section>
  );
};
