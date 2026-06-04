import { screen } from "@testing-library/react";
import { ProductInfo } from "../components/ProductInfo/ProductInfo";
import type { Product } from "../data/productData";
import { describe, it, expect } from "vitest";
import { renderWithProviders } from "./test-utils";
import { defaultColors } from "../data/productData";

const product: Product = {
  id: 1,
  title: `Product 1`,
  brand: "brand name",
  price: 100,
  description: "Test description",
  image: "test-image.jpg",
  category: "test",
  rating: {
    rate: 4,
    count: 2,
  },
  isOnSale: true,
};

describe("Product Info", () => {
  it("Should render name of the product", () => {
    renderWithProviders(
      <ProductInfo product={product} zoom={{ x: 1, y: 1, active: false }} />,
      "/?color=red&size=m",
    );

    const productName = screen.getByRole("heading", {
      level: 1,
    });

    expect(productName).toBeInTheDocument();
  });

  it("renders sale price and original price when the product is on sale", () => {
    renderWithProviders(
      <ProductInfo product={product} zoom={{ x: 1, y: 1, active: false }} />,
      "/?color=red&size=m",
    );

    const salePrice = screen.getByTestId("sale-price");
    const originalPrice = screen.getByTestId("original-price");

    expect(salePrice).toBeInTheDocument();
    expect(originalPrice).toBeInTheDocument();
  });

  it("shows an out of stock message when the selected variant is out of stock", () => {
    const outOfStockProduct = { ...product, colors: defaultColors };
    renderWithProviders(
      <ProductInfo
        product={outOfStockProduct}
        zoom={{ x: 1, y: 1, active: false }}
      />,
      "/?color=White&size=M",
    );

    expect(screen.getByText(/out of stock/)).toBeInTheDocument();
  });

  it("disables the Add to Cart button when the selected variant is out of stock", () => {
    const outOfStockProduct = { ...product, colors: defaultColors };
    renderWithProviders(
      <ProductInfo
        product={outOfStockProduct}
        zoom={{ x: 1, y: 1, active: false }}
      />,
      "/?color=White&size=M",
    );

    const addTocartBtn = screen.getByTestId("add-to-cart");
    expect(addTocartBtn).toBeDisabled();
  });
});
