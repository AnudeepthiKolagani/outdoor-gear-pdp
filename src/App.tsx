import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { ProductProvider } from "./context/ProductContext";
import { ProductDetailPage } from "./pages/ProductDetailPage/ProductDetailPage";
import { Products } from "./pages/Products/Products";
import { CartPage } from "./pages/CartPage/CartPage";

function App() {
  return (
    <BrowserRouter>
      <ProductProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/product/:productId" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </CartProvider>
      </ProductProvider>
    </BrowserRouter>
  );
}

export default App;
