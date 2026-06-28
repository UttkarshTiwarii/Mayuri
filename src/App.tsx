import { useMemo, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import CartDrawer from "./components/CartDrawer";
import Toast from "./components/Toast";
import { products } from "./data/products";
import type { Product } from "./data/products";
import type { CartItem, PageName } from "./types";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import DetailPage from "./pages/DetailPage";
import WishlistPage from "./pages/WishlistPage";
import AuthPage from "./pages/AuthPage";

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedProductId, setSelectedProductId] = useState(products[0].id);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [toast, setToast] = useState({ message: "Added to cart!", visible: false });

  const selectedProduct = useMemo(() => products.find((product) => product.id === selectedProductId) ?? products[0], [selectedProductId]);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const showToast = (message: string) => {
    setToast({ message, visible: true });
    window.setTimeout(() => setToast((current) => ({ ...current, visible: false })), 3000);
  };

  const changePage = (nextPage: PageName) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  };

  const openDetail = (id: number) => {
    setSelectedProductId(id);
    changePage("detail");
  };

  const addToCart = (
    id: number,
    selectedSize: string = "M",
    selectedImageUrl: string = products.find((p) => p.id === id)?.imageUrl ?? ""
  ) => {
    const product = products.find((item) => item.id === id);
    if (!product) return;

    setCart((items) => {
      const existing = items.find(
        (item) => item.id === id && item.selectedSize === selectedSize && item.selectedImageUrl === selectedImageUrl
      );
      if (existing) {
        return items.map((item) =>
          item.id === id && item.selectedSize === selectedSize && item.selectedImageUrl === selectedImageUrl
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [...items, { ...product, qty: 1, selectedSize, selectedImageUrl }];
    });

    showToast("Added to your bag ✨");
  };

  const changeQty = (id: number, delta: number) => {
    setCart((items) => items.map((item) => item.id === id ? { ...item, qty: item.qty + delta } : item).filter((item) => item.qty > 0));
  };

  const addToWishlist = (id: number) => {
    const product = products.find((item) => item.id === id);
    if (!product) return;
    setWishlist((items) => {
      if (items.some((item) => item.id === id)) {
        showToast("Already in wishlist!");
        return items;
      }
      showToast("Saved to wishlist ♥");
      return [...items, product];
    });
  };

  return (
    <>
      <Navbar cartCount={cartCount} onPageChange={changePage} onScrollToSection={scrollToSection} onOpenCart={() => setCartOpen(true)} />
      <CartDrawer cart={cart} isOpen={cartOpen} onClose={() => setCartOpen(false)} onChangeQty={changeQty} onCheckout={() => showToast("Order placed successfully! 🎉")} />
      <Toast message={toast.message} visible={toast.visible} />
      {page === "home" && <HomePage products={products} onPageChange={changePage} onScrollToSection={scrollToSection} onOpenDetail={openDetail} onAddToCart={addToCart} onAddToWishlist={addToWishlist} onSubscribe={(email) => showToast(email.includes("@") ? "Thank you for subscribing! 💌" : "Please enter a valid email address")} />}
      {page === "shop" && <ShopPage products={products} onPageChange={changePage} onOpenDetail={openDetail} onAddToCart={addToCart} onAddToWishlist={addToWishlist} />}
      {page === "detail" && <DetailPage product={selectedProduct} products={products} onPageChange={changePage} onAddToCart={addToCart} onAddToWishlist={addToWishlist} onOpenDetail={openDetail} onOpenCart={() => setCartOpen(true)} />}
      {page === "wishlist" && <WishlistPage wishlist={wishlist} onPageChange={changePage} onScrollToSection={scrollToSection} onOpenDetail={openDetail} onAddToCart={addToCart} onAddToWishlist={addToWishlist} />}
      {page === "auth" && <AuthPage onPageChange={changePage} onToast={showToast} />}
    </>
  );
}

export default App;
