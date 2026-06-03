import type { JSX } from "react/jsx-runtime";
import { ImageGallery } from "../ImageGallery/ImageGallery";

export const ProductInfo = (): JSX.Element => {
  return (
    <div className="product-info">
      <h1>Product Info</h1>
      <ImageGallery />
    </div>
  );
};
