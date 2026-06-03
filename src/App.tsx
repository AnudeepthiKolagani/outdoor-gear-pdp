import { ProductDetailPage } from "./pages/ProductDetailPage/ProductDetailPage";
import { Products } from "./pages/Products/Products";
import {BrowserRouter, Routes, Route} from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
        </Routes>
    </BrowserRouter>
  );
}


export default App;
