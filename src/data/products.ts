import babyPinkChikankariSaree from "../assets/Baby Pink  Chikankari Saree.webp";
import lavenderSequinLehnga from "../assets/Lavender Sequin Lehnga.webp";
import maroonBanarasiSilkSaree from "../assets/Maroon Banarasi Silk Saree.webp";
import pinkBridalLehnga from "../assets/PINK Bridel Lehnga.webp";
import redGreyBridalLehnga from "../assets/Red & Grey Bridal Lehnga.webp";
import yellowKurtiSet from "../assets/Yellow Kurti Set.webp";

export type ProductSize = "XS" | "S" | "M" | "L" | "XL" | "XXL";
export type ProductOccasion =
  | "Bridal"
  | "Festive"
  | "Casual"
  | "Office"
  | "Party";

export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice: number | null;
  badge: "new" | "sale" | "bestseller" | null;
  rating: number;
  reviews: number;
  bg: string;
  imageUrl: string;
  images: string[];
  description: string;
  sizes: ProductSize[];
  occasion: ProductOccasion;
};

const withAssetImages = (image: string) => [image];

export const products: Product[] = [
  {
    id: 1,
    name: "Baby Pink Chikankari Saree",
    category: "Sarees",
    price: 2499,
    oldPrice: 5999,
    badge: "new",
    rating: 4.9,
    reviews: 128,
    bg: "linear-gradient(160deg,#0d7377,#095c5f)",

    imageUrl: babyPinkChikankariSaree,
    images: withAssetImages(babyPinkChikankariSaree),
    description:
      "Add your product description, fabric details, care notes, and styling information here.",
    sizes: ["XS", "S", "M", "L", "XL"],
    occasion: "Casual",
  },
  {
    id: 2,
    name: "Lavender Sequin Lehnga",
    category: "Gowns",
    price: 5999,
    oldPrice: 9999,
    badge: "bestseller",
    rating: 4.8,
    reviews: 94,
    bg: "linear-gradient(160deg,#6b1a4a,#4a0f33)",

    imageUrl: lavenderSequinLehnga,
    images: withAssetImages(lavenderSequinLehnga),
    description:
      "Add your product description, fabric details, care notes, and styling information here.",
    sizes: ["S", "M", "L", "XL"],
    occasion: "Festive",
  },
  {
    id: 3,
    name: "Pink Bridal Lehenga",
    category: "Lehengas",
    price: 8999,
    oldPrice: null,
    badge: "new",
    rating: 5,
    reviews: 42,
    bg: "linear-gradient(160deg,#1a6b4a,#0f4d35)",

    imageUrl: pinkBridalLehnga,
    images: withAssetImages(pinkBridalLehnga),
    description:
      "Add your product description, fabric details, care notes, and styling information here.",
    sizes: ["XS", "S", "M", "L", "XL"],
    occasion: "Bridal",
  },
  {
    id: 4,
    name: "Yellow Kurti Set",
    category: "Kurtas",
    price: 1299,
    oldPrice: 3999,
    badge: "sale",
    rating: 4.7,
    reviews: 216,
    bg: "linear-gradient(160deg,#00b4cc,#0087a0)",

    imageUrl: yellowKurtiSet,
    images: withAssetImages(yellowKurtiSet),
    description:
      "Add your product description, fabric details, care notes, and styling information here.",
    sizes: ["XS", "S", "M", "L"],
    occasion: "Office",
  },
  {
    id: 5,
    name: "Red Grey Bridal Lehenga",
    category: "Sarees",
    price: 9999,
    oldPrice: 14999,
    badge: null,
    rating: 4.6,
    reviews: 87,
    bg: "linear-gradient(160deg,#1a3a6b,#0f2447)",

    imageUrl: redGreyBridalLehnga,
    images: withAssetImages(redGreyBridalLehnga),
    description:
      "Add your product description, fabric details, care notes, and styling information here.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    occasion: "Bridal",
  },
  {
    id: 6,
    name: "Maroon Banarasi Silk Saree",
    category: "Sarees",
    price: 3999,
    oldPrice: null,
    badge: "bestseller",
    rating: 4.9,
    reviews: 183,
    bg: "linear-gradient(160deg,#a07828,#7a5a1e)",

    imageUrl: maroonBanarasiSilkSaree,
    images: withAssetImages(maroonBanarasiSilkSaree),
    description:
      "Add your product description, fabric details, care notes, and styling information here.",
    sizes: ["XS", "S", "M", "L", "XL"],
    occasion: "Festive",
  },
  {
    id: 7,
    name: "Deep Teal Velvet Lehenga",
    category: "Lehengas",
    price: 32000,
    oldPrice: 42000,
    badge: "sale",
    rating: 4.8,
    reviews: 57,
    bg: "linear-gradient(160deg,#0d4f52,#083538)",

    imageUrl: pinkBridalLehnga,
    images: withAssetImages(pinkBridalLehnga),
    description:
      "Add your product description, fabric details, care notes, and styling information here.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    occasion: "Party",
  },
  {
    id: 8,
    name: "Peacock Feather Print Palazzo Set",
    category: "Kurtas",
    price: 4199,
    oldPrice: 5999,
    badge: "new",
    rating: 4.5,
    reviews: 134,
    bg: "linear-gradient(160deg,#1a5c5e,#0d3e40)",

    imageUrl: lavenderSequinLehnga,
    images: withAssetImages(lavenderSequinLehnga),
    description:
      "Add your product description, fabric details, care notes, and styling information here.",
    sizes: ["XS", "S", "M"],
    occasion: "Casual",
  },
];

export const formatPrice = (value: number) =>
  `Rs. ${value.toLocaleString("en-IN")}`;
