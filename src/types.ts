import type { Product } from "./data/products";

export type PageName = "home" | "shop" | "detail" | "wishlist" | "auth";
export type CartItem = Product & {
  qty: number;
  selectedSize: string;
  selectedImageUrl: string;
};

export type WishlistItem = Product & {
  selectedSize: string;
  selectedImageUrl: string;
};
