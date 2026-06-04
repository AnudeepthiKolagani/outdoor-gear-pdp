import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ProductProvider } from "../context/ProductContext";
import { CartProvider } from "../context/CartContext";

export function renderWithProviders(ui: React.ReactElement, route = "/") {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <ProductProvider>
        <CartProvider>{ui}</CartProvider>
      </ProductProvider>
    </MemoryRouter>,
  );
}
