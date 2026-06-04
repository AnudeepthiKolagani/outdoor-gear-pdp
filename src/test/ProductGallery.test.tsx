import { fireEvent, render, screen } from "@testing-library/react";
import { ProductGallery } from "../components/ProductGallery/ProductGallery";
import { describe, expect, it, vi } from "vitest";

type ZoomState = {
  x: number;
  y: number;
  active: boolean;
};
const zoomData: ZoomState = {
  x: 1,
  y: 1,
  active: false,
};

const setZoom = vi.fn();
const onHeroImageChange = vi.fn();

describe("Products Gallery", () => {
  it("Should render thumbnail images as heroImage", () => {
    render(
      <ProductGallery
        productImage="./hero.png"
        zoom={zoomData}
        setZoom={setZoom}
        onHeroImageChange={onHeroImageChange}
      />,
    );

    const heroImage = screen.getByTestId("hero-image");

    expect(heroImage).toBeInTheDocument();
  });

  it("Should deactivates zoom on mouse leave", () => {
    render(
      <ProductGallery
        productImage="./hero.png"
        zoom={zoomData}
        setZoom={setZoom}
        onHeroImageChange={onHeroImageChange}
      />,
    );

    fireEvent.mouseLeave(screen.getByTestId("hero-image"));

    expect(setZoom).toHaveBeenCalledWith({
      x: 1,
      y: 1,
      active: false,
    });
  });

  it("Should render thumbnail images ", () => {
    render(
      <ProductGallery
        productImage="./hero.png"
        zoom={zoomData}
        setZoom={setZoom}
        onHeroImageChange={onHeroImageChange}
      />,
    );

    const thumbnails = screen.getAllByRole("img");

    expect(thumbnails.length).toBe(6);
  });
});
