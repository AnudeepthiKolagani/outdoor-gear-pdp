import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";

import { Products } from "../pages/Products/Products";

const mockProducts = Array.from({ length: 20 }, (_, index) => ({
  id: index,
  title: `Product ${index}`,
  price: 100,
  description: "Test description",
  image: "test-image.jpg",
  category: "test",
  rating: {
    rate: 4,
    reviews: "review",
  },
}));

vi.mock("../context/ProductContext", () => ({
  useProducts: () => ({
    products: mockProducts,
  }),
}));

describe("Products Page", () => {
  it("renders 20 product cards", () => {
    // Rendering
    render(
      <BrowserRouter>
        <Products />
      </BrowserRouter>,
    );

    // Get from the screen
    const productCards = screen.getAllByTestId("product-card");

    // Assertions
    expect(productCards).toHaveLength(20);
  });
});
