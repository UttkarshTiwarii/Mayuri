import { useState } from "react";
import type { Product } from "../data/products";
import type { PageName } from "../types";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

type ShopPageProps = {
  products: Product[];
  onPageChange: (page: PageName) => void;
  onOpenDetail: (id: number) => void;
  onAddToCart: (id: number) => void;
  onAddToWishlist: (id: number) => void;
};

export default function ShopPage({
  products,
  onPageChange,
  onOpenDetail,
  onAddToCart,
  onAddToWishlist,
}: ShopPageProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSize, setSelectedSize] = useState<string | "All">("All");
  const [selectedOccasion, setSelectedOccasion] = useState<string | "All">("All");
  const [maxPrice, setMaxPrice] = useState(25000);
  const [sortBy, setSortBy] = useState("Sort: Featured");

  const filteredProducts = products
    .filter((p) => (selectedCategory === "All" ? true : p.category === selectedCategory))
    .filter((p) => p.price <= maxPrice)
    .filter((p) => (selectedSize === "All" ? true : p.sizes.includes(selectedSize as any)))
    .filter((p) => (selectedOccasion === "All" ? true : p.occasion === selectedOccasion));

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "Price: Low to High":
        return a.price - b.price;
      case "Price: High to Low":
        return b.price - a.price;
      case "Newest First":
        return b.id - a.id;
      case "Best Sellers": {
        const badgeScore = (p: Product) => (p.badge === "bestseller" ? 1 : 0);
        const diffBadge = badgeScore(b) - badgeScore(a);
        if (diffBadge !== 0) return diffBadge;
        return b.rating - a.rating;
      }
      case "Sort: Featured": {
        // Featured ordering: bestsellers -> sale -> new -> others
        const featuredScore = (p: Product) => {
          if (p.badge === "bestseller") return 3;
          if (p.badge === "sale") return 2;
          if (p.badge === "new") return 1;
          return 0;
        };

        const diff = featuredScore(b) - featuredScore(a);
        if (diff !== 0) return diff;

        // Tie-breaker: rating desc, then newest first
        const ratingDiff = b.rating - a.rating;
        if (ratingDiff !== 0) return ratingDiff;
        return b.id - a.id;
      }
      default:
        return 0;
    }
  });


  return (
    <div className="page active" id="shop-page">
      <div className="page-hero">
        <h2>Our Collection</h2>
        <p>Hand-picked elegance for every chapter of your story</p>
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
          <span>Shop</span>
        </div>
      </div>
      <div className="container">
        <div className="shop-layout">
          <aside className="shop-sidebar">
            <FilterSection
              title="Category"
              tags={[
                "All",
                "Sarees",
                "Lehengas",
                "Kurtas",
                "Gowns",
                "Accessories",
              ]}
              active={selectedCategory}
              onSelected={setSelectedCategory}

            />
            <div className="filter-section">
              <div className="filter-title">Price Range</div>
              <div className="price-range">
                <input
                  type="range"
                  min="500"
                  max="50000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                />
                <div className="price-range-vals">
                  <span>₹500</span>
                  <span id="price-max">₹{maxPrice.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
            {/* <FilterSection title="Colour" tags={["Teal", "Gold", "Navy", "Magenta"]} /> */}
            <FilterSection
              title="Size"
              tags={["XS", "S", "M", "L", "XL", "XXL"]}
              active={selectedSize}
              onSelected={setSelectedSize}
            />
            <FilterSection
              title="Occasion"
              tags={["Bridal", "Festive", "Casual", "Office", "Party"]}
              active={selectedOccasion}
              onSelected={setSelectedOccasion}
            />

            <div className="filter-section">
              <button
                type="button"
                className="clear-filters-btn"
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedSize("All");
                  setSelectedOccasion("All");
                  setMaxPrice(25000);
                }}
              >
                Clear Filters
              </button>
            </div>
          </aside>

          <div>
            <div className="shop-header">
              <p className="shop-count">
                Showing <strong>{sortedProducts.length}</strong> of <strong>{products.length}</strong> products
              </p>
              <select className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}>
                <option>Sort: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
                <option>Best Sellers</option>
              </select>
            </div>
            <div className="products-grid" id="shop-grid">
              {sortedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpenDetail={onOpenDetail}
                  onAddToCart={onAddToCart}
                  onAddToWishlist={onAddToWishlist}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer onPageChange={onPageChange} />
    </div>
  );
}

function FilterSection({
  title,
  tags,
  active,
  onSelected,
}: {
  title: string;
  tags: string[];
  active?: string;
  onSelected?: (tag: string) => void;
}) {
  return (
    <div className="filter-section">
      <div className="filter-title">{title}</div>
      <div className="filter-tags">
        {tags.map((tag) => (
          <button
            type="button"
            className={`filter-tag ${tag === active ? "active" : ""}`}
            key={tag}
            onClick={() => onSelected?.(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
