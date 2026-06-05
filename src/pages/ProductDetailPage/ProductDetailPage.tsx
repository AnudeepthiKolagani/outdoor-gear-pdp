import type { JSX } from "react/jsx-runtime";
import { ProductGallery } from "../../components/ProductGallery/ProductGallery";
import { ProductInfo } from "../../components/ProductInfo/ProductInfo";
import { ProductDetails } from "../../components/ProductDetails/ProductDetails";
import styles from "./ProductDetailPage.module.scss";
import { ArrowLeft, ShoppingCartIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useProducts } from "../../context/ProductContext";
import { useToast } from "../../hooks/useToast";
import type { Product } from "../../data/productData";

interface ZoomState {
  x: number;
  y: number;
  active: boolean;
}

export const ProductDetailPage = (): JSX.Element => {
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();
  const { getProductById } = useProducts();
  const { showError, showLoading, dismiss } = useToast();

  const contextProduct = productId
    ? getProductById(Number(productId))
    : undefined;

  const [product, setProduct] = useState<Product | null>(
    contextProduct ?? null,
  );
  const [zoom, setZoom] = useState<ZoomState>({
    x: 0,
    y: 0,
    active: false,
  });
  const [heroImage, setHeroImage] = useState<string>(
    contextProduct?.image ?? "",
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (contextProduct) {
      if (!product || product.id !== contextProduct.id) {
        setProduct(contextProduct);
        setHeroImage(contextProduct.image);
        setError(null);
      }
      return;
    }

    if (!productId) {
      setError("Product ID is missing");
      return;
    }

    const fetchProduct = async (): Promise<void> => {
      try {
        setIsLoading(true);
        setError(null);

        // Validate product ID
        const id = Number(productId);
        if (isNaN(id) || id <= 0) {
          throw new Error("Invalid product ID");
        }

        const response = await axios.get<Product>(
          `https://fakestoreapi.com/products/${id}`,
          {
            timeout: 10000, // 10 second timeout
          },
        );

        if (!response.data || !response.data.id) {
          throw new Error("Invalid product data received from server");
        }

        setProduct(response.data);
        setHeroImage(response.data.image);
        setError(null);
      } catch (err) {
        let errorMessage = "Failed to load product details";

        if (axios.isAxiosError(err)) {
          if (err.response?.status === 404) {
            errorMessage = "Product not found";
          } else if (err.code === "ECONNABORTED") {
            errorMessage = "Request timeout - please try again";
          } else if (err.message === "Network Error") {
            errorMessage = "Network error - please check your connection";
          } else {
            errorMessage =
              err.response?.data?.message || err.message || errorMessage;
          }
        } else if (err instanceof Error) {
          errorMessage = err.message;
        }

        setError(errorMessage);
        showError(`Error: ${errorMessage}`);
        console.error("Error fetching product:", err);
      } finally {
        setIsLoading(false);
      }
    };
  }, [productId, contextProduct, showError, showLoading, dismiss]);

  const handleNavigateBack = (): void => {
    try {
      navigate("/");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to navigate";
      showError(errorMessage);
      console.error("Navigation error:", err);
    }
  };

  const handleNavigateToCart = (): void => {
    try {
      navigate("/cart");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to navigate to cart";
      showError(errorMessage);
      console.error("Navigation error:", err);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className={styles.productPageLayout}>
        <div className={styles.loadingContainer}>
          <p>Loading product details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={styles.productPageLayout}>
        <div className={styles.header}>
          <button
            className={styles.backButton}
            onClick={handleNavigateBack}
            aria-label="Go back"
          >
            <ArrowLeft />
          </button>
          <ShoppingCartIcon
            className={styles.shoppingCartIcon}
            onClick={handleNavigateToCart}
            role="button"
            tabIndex={0}
            aria-label="Go to cart"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleNavigateToCart();
              }
            }}
          />
        </div>
        <div className={styles.errorContainer}>
          <h1>Unable to Load Product</h1>
          <p>{error}</p>
          <button className={styles.retryButton} onClick={handleNavigateBack}>
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.productPageLayout}>
      <div className={styles.header}>
        <button
          className={styles.backButton}
          onClick={handleNavigateBack}
          aria-label="Go back"
        >
          <ArrowLeft />
        </button>
        <ShoppingCartIcon
          className={styles.shoppingCartIcon}
          onClick={handleNavigateToCart}
          role="button"
          tabIndex={0}
          aria-label="Go to cart"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleNavigateToCart();
            }
          }}
        />
      </div>
      <div className={styles.productLayout}>
        <ProductGallery
          productImage={product?.image}
          zoom={zoom}
          setZoom={setZoom}
          onHeroImageChange={setHeroImage}
        />
        <ProductInfo product={product} zoom={zoom} heroImage={heroImage} />
      </div>
      <ProductDetails />
    </div>
  );
};
