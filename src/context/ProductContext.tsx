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
}

const ProductContext = createContext<ProductContextValue | undefined>(
  undefined,
);

const PRODUCTS_API_URL = "https://fakestoreapi.com/products";

export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.get<Product[]>(PRODUCTS_API_URL);
      setProducts(annotateSaleProducts(response.data));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message ||
            "Failed to fetch products. Please try again.",
        );
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const getProductById = useCallback(
    (id: number) => products.find((product) => product.id === id),
    [products],
  );

  const value = useMemo(
    () => ({
      products,
      isLoading,
      error,
      reload: fetchProducts,
      getProductById,
    }),
    [products, isLoading, error, fetchProducts, getProductById],
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
