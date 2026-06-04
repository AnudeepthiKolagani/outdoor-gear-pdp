import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useProducts } from "../../context/ProductContext";
import styles from "./CartPage.module.scss";

export const CartPage = () => {
  const { cartItems, removeFromCart, updateCartItem, clearCart } = useCart();
  const { products, isLoading } = useProducts();

  const cartRows = cartItems.map((cartItem) => {
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

  return (
    <div className={styles.cartPage}>
      <div className={styles.header}>
        <Link to="/" className={styles.homeLink}>
          ← Back to shop
        </Link>

        <h1>Shopping Cart</h1>
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
                        updateCartItem({
                          productId: row.productId,
                          color: row.color,
                          size: row.size,
                          quantity: Math.max(1, row.quantity - 1),
                        })
                      }
                    >
                      −
                    </button>

                    <span>{row.quantity}</span>

                    <button
                      type="button"
                      onClick={() =>
                        updateCartItem({
                          productId: row.productId,
                          color: row.color,
                          size: row.size,
                          quantity: row.quantity + 1,
                        })
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    className={styles.removeButton}
                    onClick={() =>
                      removeFromCart({
                        productId: row.productId,
                        color: row.color,
                        size: row.size,
                      })
                    }
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

            <button className={styles.checkoutButton}>
              Proceed to Checkout
            </button>

            <button
              type="button"
              onClick={clearCart}
              className={styles.clearButton}
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
