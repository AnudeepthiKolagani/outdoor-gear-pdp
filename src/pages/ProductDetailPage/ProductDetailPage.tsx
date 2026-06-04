import type { JSX } from "react/jsx-runtime";
import { ProductGallery } from "../../components/ProductGallery/ProductGallery";
import { ProductInfo } from "../../components/ProductInfo/ProductInfo";
import { ProductDetails } from "../../components/ProductDetails/ProductDetails";
import styles from "./ProductDetailPage.module.scss";
import { ArrowLeft, ShoppingCartIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useProducts } from "../../context/ProductContext";

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
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();
  const { getProductById } = useProducts();
  const contextProduct = productId
    ? getProductById(Number(productId))
    : undefined;
  const [product, setProduct] = useState<Product | null>(
    contextProduct ?? null,
  );
  const [zoom, setZoom] = useState({
    x: 0,
    y: 0,
    active: false,
  });
  const [heroImage, setHeroImage] = useState<string>(
    contextProduct?.image ?? "",
  );

  const PRODUCT_API_URL = `https://fakestoreapi.com/products/${productId}`;

  useEffect(() => {
    if (contextProduct) {
      setProduct(contextProduct);
      setHeroImage(contextProduct.image);
      return;
    }

    if (!productId) {
      return;
    }

    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${productId}`,
        );
        setProduct(response.data);
      } catch (error) {
        console.error(`Error fetching product with ID ${productId}:`, error);
      }
    };

    fetchProduct();
  }, [productId, contextProduct]);

  return (
    <div className={styles.productPageLayout}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate("/")}>
          <ArrowLeft />
        </button>
        <ShoppingCartIcon
          className={styles.shoppingCartIcon}
          onClick={() => navigate("/cart")}
        />
      </div>
      <div className={styles.productLayout}>
        <ProductGallery
          productImage={product?.image ?? ""}
          zoom={zoom}
          setZoom={setZoom}
          onHeroImageChange={setHeroImage}
        />
        <ProductInfo product={product} zoom={zoom} heroImage={heroImage} />
      </div>
      <ProductDetails />
    </div>
  );
};
