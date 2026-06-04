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
  sizes: SizeOption[];
}

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
  colors?: ColorOption[];
}

export const defaultSizes: SizeOption[] = [
  { id: 1, code: "S", stock: 5 },
  { id: 2, code: "M", stock: 8 },
  { id: 3, code: "L", stock: 5 },
  { id: 4, code: "XL", stock: 2 },
  { id: 5, code: "XXL", stock: 0 },
];

export const defaultColors: ColorOption[] = [
  {
    id: 1,
    name: "Black",
    hex: "#1F2937",
    stock: 20,
    sizes: [
      { id: 1, code: "S", stock: 5 },
      { id: 2, code: "M", stock: 8 },
      { id: 3, code: "L", stock: 5 },
      { id: 4, code: "XL", stock: 2 },
      { id: 5, code: "XXL", stock: 0 },
    ],
  },
  {
    id: 2,
    name: "White",
    hex: "#F9FAFB",
    stock: 0,
    sizes: [
      { id: 1, code: "S", stock: 0 },
      { id: 2, code: "M", stock: 0 },
      { id: 3, code: "L", stock: 0 },
      { id: 4, code: "XL", stock: 0 },
      { id: 5, code: "XXL", stock: 0 },
    ],
  },
  {
    id: 3,
    name: "Navy Blue",
    hex: "#1E3A8A",
    stock: 20,
    sizes: [
      { id: 1, code: "S", stock: 1 },
      { id: 2, code: "M", stock: 8 },
      { id: 3, code: "L", stock: 7 },
      { id: 4, code: "XL", stock: 2 },
      { id: 5, code: "XXL", stock: 1 },
    ],
  },
  {
    id: 4,
    name: "Forest Green",
    hex: "#166534",
    stock: 20,
    sizes: [
      { id: 1, code: "S", stock: 6 },
      { id: 2, code: "M", stock: 1 },
      { id: 3, code: "L", stock: 4 },
      { id: 4, code: "XL", stock: 3 },
      { id: 5, code: "XXL", stock: 0 },
    ],
  },
  {
    id: 5,
    name: "Burgundy",
    hex: "#7F1D1D",
    stock: 15,
    sizes: [
      { id: 1, code: "S", stock: 3 },
      { id: 2, code: "M", stock: 6 },
      { id: 3, code: "L", stock: 5 },
      { id: 4, code: "XL", stock: 1 },
      { id: 5, code: "XXL", stock: 0 },
    ],
  },
];

export const thumbnails = [
  "https://m.media-amazon.com/images/I/61KyvPWSv7L._SY741_.jpg",
  "https://m.media-amazon.com/images/I/61ZAQe+bddL._SY741_.jpg",
  "https://m.media-amazon.com/images/I/61JxoCDF35L._SY879_.jpg",
];

export const annotateSaleProducts = (products: Product[]): Product[] =>
  products.map((product, index) => ({
    ...product,
    brand: "West Side",
    isOnSale: index % 2 === 0,
  }));
