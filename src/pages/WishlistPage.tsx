import type { Product } from "../data/products";
import type { PageName } from "../types";
import { ArrowIcon, HeartIcon } from "../components/Icons";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

type WishlistPageProps = {
  wishlist: Product[];
  onPageChange: (page: PageName) => void;
  onScrollToSection: (id: string) => void;
  onOpenDetail: (id: number) => void;
  onAddToCart: (id: number) => void;
  onAddToWishlist: (id: number) => void;
};

export default function WishlistPage({ wishlist, onPageChange, onScrollToSection, onOpenDetail, onAddToCart, onAddToWishlist }: WishlistPageProps) {
  return (
    <div className="page active" id="wishlist-page">
      <div className="page-hero">
        <h2>My Wishlist</h2>
        <p>Your curated collection of desire</p>
        <div className="breadcrumb"><a href="#" onClick={(e) => { e.preventDefault(); onPageChange("home"); }}>Home</a><span>/</span><span>Wishlist</span></div>
      </div>
      <div className="container" style={{ padding: "48px 24px" }}>
        <div className="products-grid" id="wishlist-grid">
          {wishlist.map((product) => <ProductCard key={product.id} product={product} onOpenDetail={onOpenDetail} onAddToCart={onAddToCart} onAddToWishlist={onAddToWishlist} />)}
        </div>
        {wishlist.length === 0 && (
          <div id="wishlist-empty" style={{ textAlign: "center", padding: "80px 20px" }}>
            <HeartIcon style={{ width: 64, height: 64, stroke: "rgba(13,115,119,0.3)", fill: "none", strokeWidth: 1, margin: "0 auto 20px" }} />
            <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 300, color: "var(--text-dark)", marginBottom: 8 }}>Nothing saved yet</h3>
            <p style={{ color: "var(--text-muted)", marginBottom: 28 }}>Start saving pieces you love and they'll appear here.</p>
            <button className="btn-primary" onClick={() => onPageChange("shop")}>Explore Collection <ArrowIcon style={{ width: 14, height: 14, stroke: "currentColor", fill: "none", strokeWidth: 2 }} /></button>
          </div>
        )}
      </div>
      <Footer onPageChange={onPageChange} onScrollToSection={onScrollToSection} />
    </div>
  );
}
