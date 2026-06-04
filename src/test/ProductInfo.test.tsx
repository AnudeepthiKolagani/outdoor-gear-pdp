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

  it("Should render sale price and original price when the product is on sale", () => {
    renderWithProviders(
      <ProductInfo product={product} zoom={{ x: 1, y: 1, active: false }} />,
      "/?color=red&size=m",
    );

    const salePrice = screen.getByTestId("sale-price");
    const originalPrice = screen.getByTestId("sale-price");

    expect(salePrice).toBeInTheDocument();
    expect(originalPrice).toBeInTheDocument();
  });

  it("Should have displayed out of stock message if the product is out of stock", () => {
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

  it("Should disable the Add to cart button when the product is out of stock", () => {
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
