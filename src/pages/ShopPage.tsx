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

export default function ShopPage({ products, onPageChange, onOpenDetail, onAddToCart, onAddToWishlist }: ShopPageProps) {
  const shopProducts = [...products, ...products];

  return (
    <div className="page active" id="shop-page">
      <div className="page-hero">
        <h2>Our Collection</h2>
        <p>Hand-picked elegance for every chapter of your story</p>
        <div className="breadcrumb"><a href="#" onClick={(e) => { e.preventDefault(); onPageChange("home"); }}>Home</a><span>/</span><span>Shop</span></div>
      </div>
      <div className="container">
        <div className="shop-layout">
          <aside className="shop-sidebar">
            <FilterSection title="Category" tags={["All", "Sarees", "Lehengas", "Kurtas", "Gowns", "Accessories"]} active="All" />
            <div className="filter-section">
              <div className="filter-title">Price Range</div>
              <div className="price-range">
                <input type="range" min="500" max="50000" defaultValue="25000" className="price-slider" />
                <div className="price-range-vals"><span>₹500</span><span id="price-max">₹25,000</span></div>
              </div>
            </div>
            <FilterSection title="Colour" tags={["Teal", "Gold", "Navy", "Magenta"]} />
            <FilterSection title="Size" tags={["XS", "S", "M", "L", "XL", "XXL"]} active="M" />
            <FilterSection title="Occasion" tags={["Bridal", "Festive", "Casual", "Office", "Party"]} active="Casual" />
          </aside>
          <div>
            <div className="shop-header">
              <p className="shop-count">Showing <strong>24</strong> of <strong>380+</strong> products</p>
              <select className="sort-select" defaultValue="Sort: Featured">
                <option>Sort: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
                <option>Best Sellers</option>
              </select>
            </div>
            <div className="products-grid" id="shop-grid">
              {shopProducts.map((product, index) => <ProductCard key={`${product.id}-${index}`} product={product} onOpenDetail={onOpenDetail} onAddToCart={onAddToCart} onAddToWishlist={onAddToWishlist} />)}
            </div>
          </div>
        </div>
      </div>
      <Footer onPageChange={onPageChange} />
    </div>
  );
}

function FilterSection({ title, tags, active }: { title: string; tags: string[]; active?: string }) {
  return (
    <div className="filter-section">
      <div className="filter-title">{title}</div>
      <div className="filter-tags">
        {tags.map((tag) => <span className={`filter-tag ${tag === active ? "active" : ""}`} key={tag}>{tag}</span>)}
      </div>
    </div>
  );
}
