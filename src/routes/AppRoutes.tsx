import { Routes, Route } from "react-router-dom";
import { Products } from "../pages/Products/Products";
import { ProductDetailPage } from "../pages/ProductDetailPage/ProductDetailPage";
import { CartPage } from "../pages/CartPage/CartPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/product/:productId" element={<ProductDetailPage />} />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
  );
};
