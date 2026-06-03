import type { JSX } from "react/jsx-runtime";
import { ProductGallery } from "../../components/ProductGallery/ProductGallery";
import { ProductInfo } from "../../components/ProductInfo/ProductInfo";
import { ProductDetails } from "../../components/ProductDetails/ProductDetails";
import styles from "./ProductDetailPage.module.scss";
import { ShoppingCartIcon } from "lucide-react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

interface Product {
  id: number;
  description: string;
  image: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
  title: string;
  category: string;
}

export const ProductDetailPage = (): JSX.Element => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  const PRODUCT_API_URL = `https://fakestoreapi.com/products/${productId}`;
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(PRODUCT_API_URL);
        setProduct(response.data);
      } catch (error) {
        console.error(`Error fetching product with ID ${productId}:`, error);
      }
    };

    fetchProduct();
  }, [productId, PRODUCT_API_URL]);
  return (
    <div className={styles.productPageLayout}>
      <div className={styles.header}>
        <ShoppingCartIcon className={styles.shoppingCartIcon} />
      </div>
      <div className={styles.productLayout}>
        <ProductGallery productImage = {product?.image}/>
        <ProductInfo product={product} />
      </div>
      <ProductDetails />
    </div>
  );
};
