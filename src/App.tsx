import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { ProductProvider } from "./context/ProductContext";
import { AppRoutes } from "./routes";
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary";
import { ToastProvider } from "./providers/ToastProvider";

function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <BrowserRouter>
          <ProductProvider>
            <CartProvider>
              <AppRoutes />
            </CartProvider>
          </ProductProvider>
        </BrowserRouter>
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;
