export interface ProductDescriptionData {
  paragraphs: string[];
  features: string[];
}

export interface ProductSpecificationItem {
  label: string;
  value: string;
}

export interface ProductReview {
  name: string;
  rating: number;
  review: string;
}

export const productDescription: ProductDescriptionData = {
  paragraphs: [
    "Built for the trail, this versatile outdoor backpack is designed to carry your essentials with comfort and durability on long hikes.",
    "The lightweight frame, breathable harness, and weather-resistant materials keep your gear protected and your pack stable through every season.",
  ],
  features: [
    "Ergonomic suspension system with ventilated back panel",
    "Water-resistant main compartment and raincover included",
    "High-strength ripstop fabric with reinforced load points",
    "Multiple external pockets for quick access to maps and snacks",
    "Adjustable hip belt for balanced weight distribution",
  ],
};

export const productSpecifications: ProductSpecificationItem[] = [
  { label: "Brand", value: "TrailCraft" },
  { label: "Model", value: "Summit 45" },
  { label: "Capacity", value: "45 L" },
  { label: "Weight", value: "1.45 kg" },
  { label: "Material", value: "70D Ripstop Nylon" },
  { label: "Water Resistance", value: "12000 mm PU-coated" },
  { label: "Warranty", value: "2 Years" },
];

export const productReviews: ProductReview[] = [
  {
    name: "Ananya Patel",
    rating: 5,
    review:
      "This pack was perfect for a weekend in the mountains. It kept everything dry during a rainstorm and felt light even fully loaded.",
  },
  {
    name: "Dev Sharma",
    rating: 4,
    review:
      "The straps are comfortable and the organizer pockets are great for keeping my camping gear accessible. Ideal for serious hikers.",
  },
  {
    name: "Meera Nair",
    rating: 5,
    review:
      "Excellent build quality and well suited for outdoor gear shopping. I loved how it handled heavy loads without rubbing or slipping.",
  },
];
