import babyPinkChikankariSaree from "../assets/Baby Pink  Chikankari Saree.webp";
import lavenderSequinLehnga from "../assets/Lavender Sequin Lehnga.webp";
import maroonBanarasiSilkSaree from "../assets/Maroon Banarasi Silk Saree.webp";
import pinkBridalLehnga from "../assets/PINK Bridel Lehnga.webp";
import redGreyBridalLehnga from "../assets/Red & Grey Bridal Lehnga.webp";
import yellowKurtiSet from "../assets/Yellow Kurti Set.webp";

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
};

const withAssetImages = (image: string) => [image];

export const products: Product[] = [
  {
    id: 1,
    name: "Peacock Dreams Silk Saree",
    category: "Sarees",
    price: 8499,
    oldPrice: 12999,
    badge: "new",
    rating: 4.9,
    reviews: 128,
    bg: "linear-gradient(160deg,#0d7377,#095c5f)",

    imageUrl: babyPinkChikankariSaree,
    images: withAssetImages(babyPinkChikankariSaree),
    description:
      "Add your product description, fabric details, care notes, and styling information here.",
  },
  {
    id: 2,
    name: "Iridescent Anarkali Gown",
    category: "Gowns",
    price: 14999,
    oldPrice: 19999,
    badge: "bestseller",
    rating: 4.8,
    reviews: 94,
    bg: "linear-gradient(160deg,#6b1a4a,#4a0f33)",

    imageUrl: lavenderSequinLehnga,
    images: withAssetImages(lavenderSequinLehnga),
    description:
      "Add your product description, fabric details, care notes, and styling information here.",
  },
  {
    id: 3,
    name: "Emerald Embroidered Lehenga",
    category: "Lehengas",
    price: 24999,
    oldPrice: null,
    badge: "new",
    rating: 5,
    reviews: 42,
    bg: "linear-gradient(160deg,#1a6b4a,#0f4d35)",

    imageUrl: pinkBridalLehnga,
    images: withAssetImages(pinkBridalLehnga),
    description:
      "Add your product description, fabric details, care notes, and styling information here.",
  },
  {
    id: 4,
    name: "Turquoise Block-Print Kurta Set",
    category: "Kurtas",
    price: 3299,
    oldPrice: 4999,
    badge: "sale",
    rating: 4.7,
    reviews: 216,
    bg: "linear-gradient(160deg,#00b4cc,#0087a0)",

    imageUrl: yellowKurtiSet,
    images: withAssetImages(yellowKurtiSet),
    description:
      "Add your product description, fabric details, care notes, and styling information here.",
  },
  {
    id: 5,
    name: "Royal Blue Chanderi Saree",
    category: "Sarees",
    price: 5999,
    oldPrice: 8999,
    badge: null,
    rating: 4.6,
    reviews: 87,
    bg: "linear-gradient(160deg,#1a3a6b,#0f2447)",

    imageUrl: redGreyBridalLehnga,
    images: withAssetImages(redGreyBridalLehnga),
    description:
      "Add your product description, fabric details, care notes, and styling information here.",
  },
  {
    id: 6,
    name: "Gold Zari Banarasi Saree",
    category: "Sarees",
    price: 18999,
    oldPrice: null,
    badge: "bestseller",
    rating: 4.9,
    reviews: 183,
    bg: "linear-gradient(160deg,#a07828,#7a5a1e)",

    imageUrl: maroonBanarasiSilkSaree,
    images: withAssetImages(maroonBanarasiSilkSaree),
    description:
      "Add your product description, fabric details, care notes, and styling information here.",
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
  },
];

export const formatPrice = (value: number) =>
  `Rs. ${value.toLocaleString("en-IN")}`;
