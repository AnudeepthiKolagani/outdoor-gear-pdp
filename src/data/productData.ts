export interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
  brand: string;
  isOnSale?: boolean;
}

export interface SizeOption {
  id: number;
  code: string;
  stock: number;
}

export interface ColorOption {
  id: number;
  name: string;
  hex: string;
  stock: number;
}

export const defaultSizes: SizeOption[] = [
  { id: 1, code: "S", stock: 5 },
  { id: 2, code: "M", stock: 8 },
  { id: 3, code: "L", stock: 5 },
  { id: 4, code: "XL", stock: 2 },
  { id: 5, code: "XXL", stock: 0 },
];

export const defaultColors: ColorOption[] = [
  { id: 1, name: "Black", hex: "#1F2937", stock: 20 },
  { id: 2, name: "White", hex: "#F9FAFB", stock: 0 },
  { id: 3, name: "Navy Blue", hex: "#1E3A8A", stock: 20 },
  { id: 4, name: "Forest Green", hex: "#166534", stock: 20 },
  { id: 5, name: "Burgundy", hex: "#7F1D1D", stock: 15 },
];

export const annotateSaleProducts = (products: Product[]): Product[] =>
  products.map((product, index) => ({
    ...product,
    brand: "West Side",
    isOnSale: index % 2 === 0,
  }));
