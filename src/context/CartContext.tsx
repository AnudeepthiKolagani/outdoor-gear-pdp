import { createContext, useContext, useEffect, useMemo, useState } from "react";

export interface CartItem {
  productId: number;
  color: string;
  size: string;
  quantity: number;
}

interface CartContextValue {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  updateCartItem: (item: CartItem) => void;
  removeFromCart: (item: Omit<CartItem, "quantity">) => void;
  clearCart: () => void;
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

    const parsed = JSON.parse(storedValue);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() =>
    parseStoredCart(),
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: CartItem) => {
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
  };

  const updateCartItem = (item: CartItem) => {
    setCartItems((previousItems) =>
      previousItems.map((existing) =>
        existing.productId === item.productId &&
        existing.color === item.color &&
        existing.size === item.size
          ? { ...existing, quantity: item.quantity }
          : existing,
      ),
    );
  };

  const removeFromCart = (item: Omit<CartItem, "quantity">) => {
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
  };

  const clearCart = () => setCartItems([]);

  const value = useMemo(
    () => ({ cartItems, addToCart, updateCartItem, removeFromCart, clearCart }),
    [cartItems],
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
