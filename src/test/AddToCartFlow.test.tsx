import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { CartProvider } from "../context/CartContext";
import { CartPage } from "../pages/CartPage/CartPage";
import { ProductInfo } from "../components/ProductInfo/ProductInfo";
import type { Product } from "../data/productData";

const mockProduct: Product = {
  id: 1,
  title: "Trail Pack",
  brand: "Outdoor Co",
  price: 7999,
  description: "A durable pack for all-weather adventures.",
  image: "trail-pack.jpg",
  category: "gear",
  rating: {
    rate: 4.8,
    count: 12,
  },
  isOnSale: false,
};

vi.mock("../context/ProductContext", () => ({
  useProducts: () => ({
    products: [mockProduct],
    isLoading: false,
    error: null,
    reload: vi.fn(),
    getProductById: (id: number) =>
      [mockProduct].find((product) => product.id === id),
  }),
}));

describe("Add to Cart flow", () => {
  it("adds the selected variant to the cart and shows it on the cart page", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/?color=Black&size=M"]}>
        <CartProvider>
          <ProductInfo
            product={mockProduct}
            zoom={{ x: 1, y: 1, active: false }}
          />
          <CartPage />
        </CartProvider>
      </MemoryRouter>,
    );

    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();

    const addToCartButton = screen.getByTestId("add-to-cart");
    await user.click(addToCartButton);

    expect(screen.queryByText(/your cart is empty/i)).not.toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: mockProduct.title,
      }),
    ).toBeInTheDocument();


  });

  it("increments quantity for the same variant when Add to Cart is clicked again", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/?color=Black&size=M"]}>
        <CartProvider>
          <ProductInfo
            product={mockProduct}
            zoom={{ x: 1, y: 1, active: false }}
          />
          <CartPage />
        </CartProvider>
      </MemoryRouter>,
    );
    const clearCartButton = screen.getByTestId("clear-cart");
    await user.click(clearCartButton);

    const addToCartButton = screen.getByTestId("add-to-cart");
    await user.click(addToCartButton);
    await user.click(addToCartButton);

    const quantity = screen.getByTestId("quantity");
    expect(quantity.textContent).toBe("2");
  });
});
