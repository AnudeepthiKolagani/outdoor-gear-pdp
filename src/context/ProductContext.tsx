import axios from "axios";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Product } from "../data/productData";
import { annotateSaleProducts } from "../data/productData";

interface ProductContextValue {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  reload: () => void;
  getProductById: (id: number) => Product | undefined;
  clearError: () => void;
}

const ProductContext = createContext<ProductContextValue | undefined>(
  undefined,
);

const PRODUCTS_API_URL = "https://fakestoreapi.com/products";
const API_TIMEOUT = 10000; // 10 seconds

export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.get<Product[]>(PRODUCTS_API_URL, {
        timeout: API_TIMEOUT,
      });

      if (!response.data || !Array.isArray(response.data)) {
        throw new Error("Invalid response format from API");
      }

      if (response.data.length === 0) {
        throw new Error("No products available");
      }

      setProducts(annotateSaleProducts(response.data));
    } catch (err) {
      let errorMessage = "Failed to fetch products. Please try again.";

      if (axios.isAxiosError(err)) {
        if (err.response?.status === 404) {
          errorMessage = "Products API endpoint not found";
        } else if (err.response?.status === 500) {
          errorMessage = "Server error - please try again later";
        } else if (err.code === "ECONNABORTED") {
          errorMessage = "Request timeout - please check your connection";
        } else if (err.message === "Network Error") {
          errorMessage =
            "Network error - please check your internet connection";
        } else {
          errorMessage =
            err.response?.data?.message || err.message || errorMessage;
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
      } else {
        errorMessage = "An unknown error occurred";
      }

      setError(errorMessage);
      console.error("Error fetching products:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const getProductById = useCallback(
    (id: number): Product | undefined => {
      if (!Number.isInteger(id) || id <= 0) {
        console.warn("Invalid product ID:", id);
        return undefined;
      }
      return products.find((product) => product.id === id);
    },
    [products],
  );

  const clearError = useCallback((): void => {
    setError(null);
  }, []);

  const value = useMemo(
    () => ({
      products,
      isLoading,
      error,
      reload: fetchProducts,
      getProductById,
      clearError,
    }),
    [products, isLoading, error, fetchProducts, getProductById, clearError],
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export const useProducts = (): ProductContextValue => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within ProductProvider");
  }
  return context;
};

export type { Product };
