import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useProducts } from "../../context/ProductContext";
import { useToast } from "../../hooks/useToast";
import styles from "./CartPage.module.scss";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import Swal from "sweetalert2";

interface CartRow {
  productId: number;
  color: string;
  size: string;
  quantity: number;
  productName: string;
  productPrice: number;
  productImage?: string;
}

export const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    updateCartItem,
    clearCart,
    error: cartError,
    clearError,
  } = useCart();
  const { products, isLoading, error: productError } = useProducts();
  const { showError, showSuccess } = useToast();
  const navigate = useNavigate();

  // Show errors as toast notifications
  useEffect(() => {
    if (cartError) {
      showError(`Cart Error: ${cartError}`);
      clearError();
    }
  }, [cartError, showError, clearError]);

  useEffect(() => {
    if (productError) {
      showError(`Failed to load products: ${productError}`);
    }
  }, [productError, showError]);

  const cartRows: CartRow[] = cartItems.map((cartItem) => {
    const product = products.find((item) => item.id === cartItem.productId);

    return {
      ...cartItem,
      productName: product?.title ?? "Product not found",
      productPrice: product?.price ?? 0,
      productImage: product?.image,
    };
  });

  const totalPrice = cartRows.reduce(
    (sum, row) => sum + row.productPrice * row.quantity,
    0,
  );

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

  const handleUpdateQuantity = (row: CartRow, newQuantity: number): void => {
    try {
      if (newQuantity < 1) {
        throw new Error("Quantity must be at least 1");
      }

      updateCartItem({
        productId: row.productId,
        color: row.color,
        size: row.size,
        quantity: newQuantity,
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update quantity";
      showError(errorMessage);
      console.error("Error updating quantity:", err);
    }
  };

  const handleRemoveItem = (row: CartRow): void => {
    try {
      removeFromCart({
        productId: row.productId,
        color: row.color,
        size: row.size,
      });
      showSuccess(`${row.productName} removed from cart`);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to remove item";
      showError(errorMessage);
      console.error("Error removing item:", err);
    }
  };

  const handleClearCart = async (): Promise<void> => {
    try {
      const result = await Swal.fire({
        title: "Clear Cart?",
        text: "All items will be removed. This action cannot be undone.",
        icon: "warning",

        showCancelButton: true,
        confirmButtonColor: "#c40000",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Yes, clear it",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      });

      if (result.isConfirmed) {
        clearCart();
        showSuccess("Cart cleared successfully");

        Swal.fire({
          title: "Cleared!",
          text: "Your cart is now empty.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to clear cart";

      showError(errorMessage);
      console.error("Error clearing cart:", err);
    }
  };
  const handleCheckout = (): void => {
    try {
      if (cartRows.length === 0) {
        throw new Error("Your cart is empty");
      }

      // Placeholder for checkout logic
      showSuccess("Proceeding to checkout...");
      console.log("Checkout initiated with items:", cartRows);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Checkout failed";
      showError(errorMessage);
      console.error("Checkout error:", err);
    }
  };

  return (
    <div className={styles.cartPage}>
      <div className={styles.header}>
        <button
          className={styles.backButton}
          onClick={handleNavigateBack}
          aria-label="Go back to products"
        >
          <ArrowLeft />
        </button>

        <h1 className={styles.title}>Your Cart</h1>

        <div className={styles.rightPlaceholder} />
      </div>

      {cartRows.length === 0 ? (
        <div className={styles.emptyCart}>
          <h2>Your cart is empty</h2>

          <p>Looks like you haven't added anything yet.</p>

          <Link to="/" className={styles.actionButton}>
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className={styles.cartLayout}>
          <div className={styles.cartTable}>
            {cartRows.map((row) => (
              <div
                key={`${row.productId}-${row.color}-${row.size}`}
                className={styles.cartRow}
              >
                <img
                  src={row.productImage}
                  alt={row.productName}
                  className={styles.productImage}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%23ddd' width='100' height='100'/%3E%3C/svg%3E";
                  }}
                />

                <div className={styles.productDetails}>
                  <h2>{row.productName}</h2>

                  <div className={styles.variantRow}>
                    <span>Color: {row.color}</span>
                    <span>Size: {row.size}</span>
                  </div>

                  <div className={styles.price}>
                    ₹{row.productPrice.toLocaleString()}
                  </div>
                </div>

                <div className={styles.actions}>
                  <div className={styles.quantityControl}>
                    <button
                      type="button"
                      onClick={() =>
                        handleUpdateQuantity(row, Math.max(1, row.quantity - 1))
                      }
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>

                    <span data-testid="quantity">{row.quantity}</span>

                    <button
                      type="button"
                      onClick={() =>
                        handleUpdateQuantity(row, row.quantity + 1)
                      }
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    className={styles.removeButton}
                    onClick={() => handleRemoveItem(row)}
                    aria-label={`Remove ${row.productName} from cart`}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <aside className={styles.summaryBox}>
            <h3>Order Summary</h3>

            <div className={styles.summaryRow}>
              <span>Items</span>
              <span>{cartRows.length}</span>
            </div>

            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>₹{totalPrice.toLocaleString()}</span>
            </div>

            <hr />

            <div className={styles.totalRow}>
              <span>Total</span>
              <span>₹{totalPrice.toLocaleString()}</span>
            </div>

            <button
              className={styles.checkoutButton}
              onClick={handleCheckout}
              disabled={cartRows.length === 0}
            >
              Proceed to Checkout
            </button>

            <button
              type="button"
              data-testid="clear-cart"
              onClick={handleClearCart}
              className={styles.clearButton}
              aria-label="Clear entire cart"
            >
              Clear Cart
            </button>

            <Link to="/" className={styles.continueShopping}>
              Continue Shopping
            </Link>
          </aside>
        </div>
      )}

      {isLoading && (
        <p className={styles.loadingText}>Loading product data...</p>
      )}
    </div>
  );
};
