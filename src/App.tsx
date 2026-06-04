import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { ProductProvider } from "./context/ProductContext";
import { AppRoutes } from "./routes";

function App() {
  return (
    <BrowserRouter>
      <ProductProvider>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </ProductProvider>
    </BrowserRouter>
  );
}

export default App;
