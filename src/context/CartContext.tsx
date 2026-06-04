import { createContext, useContext, useEffect, useMemo, useState } from "react";

export interface CartItem {
  productId: number;
  color: string;
  size: string;
  quantity: number;
}

interface CartContextValue {
  cartItems: CartItem[];
  addToCart: (item: CartItem, onSuccess?: () => void) => void;
  updateCartItem: (item: CartItem) => void;
  removeFromCart: (item: Omit<CartItem, "quantity">) => void;
  clearCart: () => void;
  error: string | null;
  clearError: () => void;
}

const CART_STORAGE_KEY = "outdoor-gear-cart";

const CartContext = createContext<CartContextValue | undefined>(undefined);

const parseStoredCart = (): CartItem[] => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedValue = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!storedValue) {
      return [];
    }

    const parsed = JSON.parse(storedValue) as unknown;
    return Array.isArray(parsed) ? (parsed as CartItem[]) : [];
  } catch (error) {
    console.error("Failed to parse stored cart:", error);
    return [];
  }
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() =>
    parseStoredCart(),
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
      setError(null);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to save cart to storage";
      setError(errorMessage);
      console.error("Failed to save cart:", err);
    }
  }, [cartItems]);

  const addToCart = (item: CartItem, onSuccess?: () => void): void => {
    try {
      if (!item || item.quantity <= 0) {
        throw new Error("Invalid item: quantity must be greater than 0");
      }

      if (!item.color || !item.size) {
        throw new Error("Invalid item: color and size are required");
      }

      setCartItems((previousItems) => {
        const existingIndex = previousItems.findIndex(
          (existing) =>
            existing.productId === item.productId &&
            existing.color === item.color &&
            existing.size === item.size,
        );

        if (existingIndex >= 0) {
          const updated = [...previousItems];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + item.quantity,
          };
          return updated;
        }

        return [...previousItems, item];
      });

      setError(null);
      onSuccess?.();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to add item to cart";
      setError(errorMessage);
      console.error("Error adding to cart:", err);
    }
  };

  const updateCartItem = (item: CartItem): void => {
    try {
      if (!item || item.quantity < 0) {
        throw new Error("Invalid item: quantity cannot be negative");
      }

      setCartItems((previousItems) =>
        previousItems.map((existing) =>
          existing.productId === item.productId &&
          existing.color === item.color &&
          existing.size === item.size
            ? { ...existing, quantity: item.quantity }
            : existing,
        ),
      );

      setError(null);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update cart item";
      setError(errorMessage);
      console.error("Error updating cart item:", err);
    }
  };

  const removeFromCart = (item: Omit<CartItem, "quantity">): void => {
    try {
      setCartItems((previousItems) =>
        previousItems.filter(
          (existing) =>
            !(
              existing.productId === item.productId &&
              existing.color === item.color &&
              existing.size === item.size
            ),
        ),
      );

      setError(null);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to remove item from cart";
      setError(errorMessage);
      console.error("Error removing from cart:", err);
    }
  };

  const clearCart = (): void => {
    try {
      setCartItems([]);
      setError(null);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to clear cart";
      setError(errorMessage);
      console.error("Error clearing cart:", err);
    }
  };

  const clearError = (): void => {
    setError(null);
  };

  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
      updateCartItem,
      removeFromCart,
      clearCart,
      error,
      clearError,
    }),
    [cartItems, error],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextValue => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
