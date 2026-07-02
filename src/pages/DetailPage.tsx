import type { Product } from "../data/products";
import { formatPrice } from "../data/products";
import type { PageName } from "../types";
import { HeartIcon } from "../components/Icons";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import { useState } from "react";

type DetailPageProps = {
  product: Product;
  products: Product[];
  onPageChange: (page: PageName) => void;
  onAddToCart: (id: number, selectedSize?: string, selectedImageUrl?: string) => void;
  onAddToWishlist: (id: number, selectedSize?: string, selectedImageUrl?: string) => void;
  onOpenDetail: (id: number) => void;
  onOpenCart: () => void;
};


export default function DetailPage({
  product,
  products,
  onPageChange,
  onAddToCart,
  onAddToWishlist,
  onOpenDetail,
  onOpenCart,
}: DetailPageProps) {
  const savePct = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);

  return (

    <div className="page active" id="detail-page">
      <div
        style={{
          background: "rgba(13,115,119,0.04)",
          padding: "16px 0",
          borderBottom: "1px solid rgba(13,115,119,0.08)",
        }}
      >
        <div className="container">
          <div className="breadcrumb">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange("home");
              }}
            >
              Home
            </a>
            <span>/</span>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange("shop");
              }}
            >
              Shop
            </a>
            <span>/</span>
            <span id="detail-breadcrumb">{product.name}</span>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="product-detail">
          <div className="detail-grid">
            <div className="detail-imgs">
              <div className="detail-main-img" id="detail-main-img" style={{ background: product.bg }}>
                <img
                  src={product.images[selectedImgIndex] ?? product.images[0]}
                  alt={product.name}
                  loading="eager"
                  decoding="async"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>

              <div className="detail-thumbs">
                {product.images.slice(0, 4).map((img, index) => (
                  <button
                    type="button"
                    key={img}
                    className={`thumb ${index === selectedImgIndex ? "active" : ""}`}
                    style={{ backgroundImage: `url(${img})`, backgroundSize: "cover", backgroundPosition: "center" }}
                    onClick={() => setSelectedImgIndex(index)}
                    aria-label={`Select image ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="detail-info" id="detail-info">
              <div className="detail-cat">{product.category}</div>
              <h2 className="detail-name">{product.name}</h2>
              <div className="detail-price">
                <span className="detail-price-curr">
                  {formatPrice(product.price)}
                </span>
                {product.oldPrice && (
                  <>
                    <span className="detail-price-old">
                      {formatPrice(product.oldPrice)}
                    </span>
                    <span className="detail-price-save">{savePct}% off</span>
                  </>
                )}
              </div>
              <p className="detail-desc">
                A masterpiece of artisan craft, this{" "}
                {product.category.toLowerCase().replace(/s$/, "")} is woven from
                the finest silk and adorned with intricate peacock-inspired
                motifs. Each piece is individually hand-finished by our skilled
                artisans in Varanasi, making it a truly one-of-a-kind creation.
              </p>
              <div className="size-label">Select Size</div>
              <div className="sizes">
                {["XS", "S", "M", "L", "XL"].map((size) => (
                  <button
                    className={`size-btn ${selectedSize === size ? "active" : ""}`}
                    key={size}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>

              <div className="detail-actions">
                <button
                  className="detail-atc"
                  onClick={() => {
                    const selectedImageUrl =
                      product.images[selectedImgIndex] ?? product.images[0];
                    const sizeToUse = selectedSize || "M";
                    onAddToCart(product.id, sizeToUse, selectedImageUrl);
                    onOpenCart();
                  }}
                >
                  Add to Bag
                </button>
                <button
                  className="detail-wish"
                  onClick={() => {
                    const sizeToUse = selectedSize || "M";
                    const selectedImageUrl =
                      product.images[selectedImgIndex] ?? product.images[0];
                    onAddToWishlist(product.id, sizeToUse, selectedImageUrl);
                  }}
                >
                  <HeartIcon />
                </button>
              </div>
              <div className="detail-meta">
                <div className="meta-row">Free delivery on this item</div>
                <div className="meta-row">Easy 7-day returns</div>
                <div className="meta-row">Authenticity guaranteed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ background: "var(--cream-dark)", padding: "60px 0" }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: 36 }}>
            <div className="section-tag">You May Also Love</div>
            <h2>Related Pieces</h2>
          </div>
          <div className="products-grid" id="related-grid">
            {products
              .filter((item) => item.id !== product.id)
              .slice(0, 4)
              .map((item) => (
                <ProductCard
                  key={item.id}
                  product={item}
                  onOpenDetail={onOpenDetail}
                  onAddToCart={onAddToCart}
                  onAddToWishlist={onAddToWishlist}
                />
              ))}
          </div>
        </div>
      </div>
      <Footer onPageChange={onPageChange} />
    </div>
  );
}
