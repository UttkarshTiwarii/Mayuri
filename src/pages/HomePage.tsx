import {useState, type ReactNode } from "react";
import type { Product } from "../data/products";
import type { PageName } from "../types";
import { ArrowIcon, StarIcon } from "../components/Icons";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import Hero from "../components/Hero";

type HomePageProps = {
  products: Product[];
  onPageChange: (page: PageName) => void;
  onScrollToSection: (id: string) => void;
  onOpenDetail: (id: number) => void;
  onAddToCart: (id: number) => void;
  onAddToWishlist: (id: number) => void;
  onSubscribe: (email: string) => void;
};

export default function HomePage(props: HomePageProps) {
  const bestsellers = props.products
    .filter((product) => product.badge === "bestseller")
    .concat(props.products)
    .slice(0, 4);

  return (
    <div className="page active" id="home-page">
      <Hero
        products={props.products}
        onPageChange={props.onPageChange}
        onOpenDetail={props.onOpenDetail}
      />

      <Ticker />
      <Categories onShop={() => props.onPageChange("shop")} />
      <ProductSection
        id="new-arrivals"
        tag="Fresh Drops"
        title="New Arrivals"
        description="The latest additions to our curated collection, each piece a testament to timeless elegance and contemporary craft."
        products={props.products}
        onOpenDetail={props.onOpenDetail}
        onAddToCart={props.onAddToCart}
        onAddToWishlist={props.onAddToWishlist}
      />
      <Promo onShop={() => props.onPageChange("shop")} />
      <ProductSection
        id="bestsellers"
        tag="Community Favourites"
        title="Best Sellers"
        description="Pieces our customers keep coming back for — proven elegance, adored by thousands."
        products={bestsellers}
        shaded
        onOpenDetail={props.onOpenDetail}
        onAddToCart={props.onAddToCart}
        onAddToWishlist={props.onAddToWishlist}
      />
      <Features />
      <Testimonials />
      <Newsletter onSubscribe={props.onSubscribe} />
      <Footer
        onPageChange={props.onPageChange}
        onScrollToSection={props.onScrollToSection}
      />
    </div>
  );
}

function ProductSection({
  id,
  tag,
  title,
  description,
  products,
  shaded,
  onOpenDetail,
  onAddToCart,
  onAddToWishlist,
}: {
  id: string;
  tag: string;
  title: string;
  description: string;
  products: Product[];
  shaded?: boolean;
  onOpenDetail: (id: number) => void;
  onAddToCart: (id: number) => void;
  onAddToWishlist: (id: number) => void;
}) {
  const tabs = ["All", "Sarees", "Kurtas", "Gowns"];
  const [activeTab, setActiveTab] = useState("All");

  const filteredProducts =
    activeTab === "All"
      ? products
      : products.filter((product) => product.category === activeTab);

  const visibleProducts = filteredProducts.slice(0, shaded ? 4 : 8);
  return (
    <section
      className="products"
      id={id}
      style={
        shaded ? { background: "var(--cream-dark)", padding: "90px 0" } : undefined
      }
    >
      <div className="container">
        <div className="section-header reveal visible">
          <div className="section-tag">{tag}</div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>

        {!shaded && (
          <div className="products-tabs" id="arrival-tabs">
            {tabs.map((tab) => (
              <button
                className={`tab-btn ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
                key={tab}
              >
                {tab}
              </button>
            ))}
          </div>
        )}

        <div className="products-grid">
          {visibleProducts.slice(0, shaded ? 4 : 8).map((product) => (
            <ProductCard
              key={`${id}-${product.id}`}
              product={product}
              onOpenDetail={onOpenDetail}
              onAddToCart={onAddToCart}
              onAddToWishlist={onAddToWishlist}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Ticker() {
  const items = [
    "Free shipping on orders above ₹999",
    "New peacock collection — now live",
    "Handcrafted luxury fabrics",
    "Easy 7-day returns",
    "Exclusive member rewards",
  ];

  return (
    <div className="ticker">
      <div className="ticker-inner" id="ticker">
        {[...items, ...items].map((item, index) => (
          <span className="ticker-item" key={`${item}-${index}`}>
            <span className="ticker-dot"></span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function Categories({ onShop }: { onShop: () => void }) {
  const categories = [
    ["Sarees", "120+ styles", "#0d7377", "#095c5f"],
    ["Lehengas", "84+ styles", "#1a6b4a", "#0f4d35"],
    ["Kurtas", "200+ styles", "#1a3a6b", "#0f2447"],
    ["Gowns", "56+ styles", "#6b1a4a", "#4a0f33"],
    ["Accessories", "300+ pieces", "#a07828", "#7a5a1e"],
  ];

  return (
    <section className="categories" id="categories">
      <div className="container">
        <div className="section-header reveal visible">
          <div className="section-tag">Shop by Category</div>
          <h2>Curated for Every Occasion</h2>
          <p>
            From everyday elegance to bridal grandeur, explore styles crafted to
            celebrate every chapter of your journey.
          </p>
        </div>

        <div className="cat-grid">
          {categories.map(([name, count, start, end], index) => (
            <a
              href="#"
              className={`cat-card reveal visible reveal-delay-${index}`}
              key={name}
              onClick={(e) => {
                e.preventDefault();
                onShop();
              }}
            >
              <div
                className="cat-bg"
                style={{ background: `linear-gradient(160deg,${start} 0%,${end} 100%)` }}
              >
                <svg
                  viewBox="0 0 200 280"
                  fill="none"
                  preserveAspectRatio="xMidYMid slice"
                >
                  <ellipse
                    cx="100"
                    cy="80"
                    rx="70"
                    ry="70"
                    fill="none"
                    stroke="rgba(255,255,255,0.12)"
                    strokeWidth="2"
                  />
                  <ellipse
                    cx="100"
                    cy="80"
                    rx="45"
                    ry="45"
                    fill="none"
                    stroke="rgba(201,168,76,0.2)"
                    strokeWidth="1.5"
                  />
                </svg>
                <div className="cat-label">
                  <h3>{name}</h3>
                  <span>{count}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Promo({ onShop }: { onShop: () => void }) {
  return (
    <section className="promo-section">
      <div className="container">
        <div className="promo-grid">
          <PromoCard
            dark
            tag="Limited Time"
            title={
              <>
                Summer
                <br />
                Bridal Edit
              </>
            }
            link="Shop Bridal"
            onShop={onShop}
          />

          <PromoCard
            tag="Up to 40% Off"
            title={
              <>
                Festive Season
                <br />
                Sale
              </>
            }
            link="Explore Sale"
            onShop={onShop}
          />
        </div>
      </div>
    </section>
  );
}

function PromoCard({
  dark,
  tag,
  title,
  link,
  onShop,
}: {
  dark?: boolean;
  tag: string;
  title: ReactNode;
  link: string;
  onShop: () => void;
}) {
  return (
    <div
      className="promo-card"
      style={{ background: dark ? "#0d4f52" : "var(--cream-dark)" }}
    >
      <div className="promo-bg-art">
        <svg
          viewBox="0 0 600 340"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <ellipse
            cx={dark ? "500" : "100"}
            cy="170"
            rx="200"
            ry="200"
            fill={dark ? "rgba(255,255,255,0.04)" : "rgba(13,115,119,0.06)"}
          />
        </svg>
      </div>

      <div className="promo-content">
        <p
          className="promo-tag"
          style={{ color: dark ? "var(--gold-light)" : "var(--teal)" }}
        >
          {tag}
        </p>
        <h3 style={{ color: dark ? "var(--white)" : "var(--text-dark)" }}>{title}</h3>

        <a
          href="#"
          className="promo-link"
          style={{ color: dark ? "var(--white)" : "var(--teal-dark)" }}
          onClick={(e) => {
            e.preventDefault();
            onShop();
          }}
        >
          {link}
          <ArrowIcon
            style={{
              width: 14,
              height: 14,
              stroke: "currentColor",
              fill: "none",
              strokeWidth: 2,
              flexShrink: 0,
            }}
          />
        </a>
      </div>
    </div>
  );
}

function Features() {
  return (
    <section className="features">
      <div className="container">
        <div className="features-grid">
          {["Free Shipping", "Easy Returns", "Secure Payment", "24/7 Support"].map(
            (title, index) => (
              <div
                className={`feature-card reveal visible reveal-delay-${index}`}
                key={title}
              >
                <div className="feature-icon">
                  <StarIcon />
                </div>
                <h4>{title}</h4>
                <p>
                  {index === 0
                    ? "Complimentary delivery on all orders above ₹2999, anywhere in India."
                    : index === 1
                      ? "7-day hassle-free return policy."
                      : index === 2
                        ? "Your transactions are protected with bank-grade encryption."
                        : "Our style concierges are available round the clock for you."}
                </p>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const people = [
    [
      "Priya Sharma",
      "Delhi, Fashion Enthusiast",
      "The peacock blue saree I ordered for my cousin's wedding was absolutely stunning. The fabric quality is beyond what I expected.",
    ],
    [
      "Ananya Krishnan",
      "Bangalore, Bride",
      "I ordered a bridal lehenga and the embroidery detail is breathtaking. The peacock motifs across the hem are works of art.",
    ],
    [
      "Rekha Menon",
      "Mumbai, Style Blogger",
      "Absolutely love the customer service and the quality of fabric. The teal kurta set I bought feels like a dream.",
    ],
  ];

  return (
    <section className="testimonials">
      <div className="container">
        <div className="section-header reveal visible">
          <div className="section-tag">Voices of Elegance</div>
          <h2>What Our Clients Say</h2>
        </div>

        <div className="testimonials-grid">
          {people.map(([name, role, text]) => (
            <div className="testimonial-card reveal visible" key={name}>
              <div className="t-quote">"</div>
              <p className="t-text">{text}</p>
              <div className="t-author">
                <div className="t-avatar">{name[0]}</div>
                <div>
                  <div className="t-stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon className="t-star" key={i} />
                    ))}
                  </div>
                  <div className="t-name">{name}</div>
                  <div className="t-role">{role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Newsletter({ onSubscribe }: { onSubscribe: (email: string) => void }) {
  return (
    <section className="newsletter">
      <div className="newsletter-bg">
        <svg
          viewBox="0 0 1200 400"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <ellipse
            cx="1100"
            cy="200"
            rx="300"
            ry="300"
            fill="rgba(255,255,255,0.05)"
          />
        </svg>
      </div>

      <div className="container">
        <div className="newsletter-inner">
          <div
            className="section-tag"
            style={{
              color: "rgba(201,168,76,0.8)",
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 16,
            }}
          >
            Join the Inner Circle
          </div>

          <h2>Stay Adorned, Stay Inspired</h2>
          <p>
            Subscribe for early access to new collections, exclusive member offers,
            and style stories from the world of MAYURI.
          </p>

          <form
            className="newsletter-form"
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const input = form.elements.namedItem(
                "email",
              ) as HTMLInputElement;
              onSubscribe(input.value);
              input.value = "";
            }}
          >
            <input
              className="newsletter-input"
              type="email"
              placeholder="Your email address"
              name="email"
            />
            <button className="newsletter-submit">Subscribe</button>
          </form>
        </div>
      </div>
    </section>
  );
}

