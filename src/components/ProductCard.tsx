import type { Product } from "../data/products";
import { formatPrice } from "../data/products";
import { BagIcon, HeartIcon } from "./Icons";

type ProductCardProps = {
  product: Product;
  onOpenDetail: (id: number) => void;
  onAddToCart: (id: number, selectedSize?: string, selectedImageUrl?: string) => void;
  onAddToWishlist: (id: number, selectedSize?: string, selectedImageUrl?: string) => void;
};


export default function ProductCard({ product, onOpenDetail, onAddToCart, onAddToWishlist }: ProductCardProps) {
  const badgeText = product.badge === "new" ? "New" : product.badge === "sale" ? "Sale" : "Top Pick";

  return (
    <div className="product-card" onClick={() => onOpenDetail(product.id)}>
      <div className="product-img">
        <div className="product-img-inner" style={{ background: product.bg }}>
          <img
            className="product-photo"
            src={product.imageUrl}
            alt={product.name}
            loading="lazy"
            decoding="async"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        </div>
        <div className="product-actions" onClick={(event) => event.stopPropagation()}>
          <button
            className="action-btn"
            onClick={(e) => {
              e.stopPropagation();
              onAddToWishlist(product.id, "M", product.imageUrl);
            }}
            title="Wishlist"
          >
            <HeartIcon />
          </button>

          <button className="action-btn" onClick={() => onOpenDetail(product.id)} title="Quick View">
            <svg viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
          </button>
        </div>
        {product.badge && <span className={`product-badge badge-${product.badge}`}>{badgeText}</span>}
      </div>
      <div className="product-info">
        <div className="product-category">{product.category}</div>
        <div className="product-name">{product.name}</div>
        <div className="product-price-row">
          <span className="price-current">{formatPrice(product.price)}</span>
          {product.oldPrice && <span className="price-old">{formatPrice(product.oldPrice)}</span>}
        </div>
        <div className="product-rating">
          <span style={{ color: "var(--gold)", fontSize: 11 }}>{"★".repeat(Math.floor(product.rating))}{product.rating % 1 ? "☆" : ""}</span>
          <span className="rating-count">({product.reviews})</span>
        </div>
      </div>
      <button
        className="add-to-cart"
        onClick={(event) => {
          event.stopPropagation();
          onAddToCart(product.id, "M", product.imageUrl);
        }}
      >
        <BagIcon style={{ width: 13, height: 13, stroke: "currentColor", fill: "none", strokeWidth: 1.5 }} />
        Add to Bag
      </button>
    </div>
  );
}
