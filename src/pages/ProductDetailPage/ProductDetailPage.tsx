import type { JSX } from "react/jsx-runtime";
import { ProductGallery } from "../../components/ProductGallery/ProductGallery";
import { ProductInfo } from "../../components/ProductInfo/ProductInfo";
import { ProductDetails } from "../../components/ProductDetails/ProductDetails";
import styles from "./ProductDetailPage.module.scss";

export const ProductDetailPage = (): JSX.Element => {
  return (
    <div className={styles.productPageLayout}>
      <div className={styles.productLayout}>
        <ProductGallery />
        <ProductInfo />
      </div>
      <ProductDetails />
    </div>
  );
};
