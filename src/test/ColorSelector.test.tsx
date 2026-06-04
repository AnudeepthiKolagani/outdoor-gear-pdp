import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ColorSelector } from "../components/ProductInfo/ColorSelector/ColorSelector";
import { defaultColors } from "../data/productData";

const handleColorChange = vi.fn();
describe("Color Selector", () => {
  it("Should have loaded 5 colors to the screen", () => {
    render(
      <ColorSelector
        availableColors={defaultColors}
        selectedColor={"Black"}
        handleColorChange={handleColorChange}
      />,
    );

    expect(screen.getAllByRole("button").length).toBe(5);
  });

});
