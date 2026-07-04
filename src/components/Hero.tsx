import { useEffect, useMemo, useState } from "react";

import type { Product } from "../data/products";
import type { PageName } from "../types";
import { ArrowIcon, StarIcon } from "../components/Icons";

type HeroProps = {
  products: Product[];
  onPageChange: (page: PageName) => void;
  onOpenDetail: (id: number) => void;
};

export default function Hero(props: HeroProps) {
  const heroProducts = useMemo(() => props.products.slice(0, 5), [props.products]);

  const [heroLoaded, setHeroLoaded] = useState(false);


  const [activeHeroIndex, setActiveHeroIndex] = useState(0);

  useEffect(() => {
    if (heroProducts.length === 0) return;

    const timer = window.setInterval(() => {
      setActiveHeroIndex((i) => (i + 1) % heroProducts.length);
    }, 3200);

    return () => window.clearInterval(timer);
  }, [heroProducts.length]);

  useEffect(() => {
    setHeroLoaded(true);
  }, []);

  // Preload the first hero image for faster initial render.
  useEffect(() => {

    const first = heroProducts[0];
    if (!first?.images?.[0]) return;
    const img = new Image();
    img.src = first.images[0];
  }, [heroProducts]);

  const activeHeroProduct = heroProducts[activeHeroIndex];

  return (
    <div>
      <section className="hero">
        <div className="hero-bg">
          <svg
            className="hero-bg-feather"
            viewBox="0 0 600 900"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse cx="300" cy="450" rx="8" ry="360" fill="#0d7377" />
            <ellipse
              cx="300"
              cy="300"
              rx="180"
              ry="180"
              fill="none"
              stroke="#0d7377"
              strokeWidth="2"
            />
            <ellipse
              cx="300"
              cy="300"
              rx="120"
              ry="120"
              fill="none"
              stroke="#c9a84c"
              strokeWidth="1.5"
            />
            <ellipse
              cx="300"
              cy="300"
              rx="60"
              ry="60"
              fill="none"
              stroke="#1a6b4a"
              strokeWidth="1"
            />
            <ellipse cx="300" cy="300" rx="25" ry="25" fill="#0d7377" />
          </svg>
        </div>

        <div className="container hero-container">
          <div className="hero-content-col">
            <div className={`hero-content ${heroLoaded ? "hero-loaded" : ""}`}>

              <div className="hero-eyebrow">
                <span className="eyebrow-line"></span>
                <span className="eyebrow-text">Featured Pick</span>
              </div>

              <h1 className="hero-title">
                {activeHeroProduct ? activeHeroProduct.name : "MAYURI Collection"}
              </h1>

              <p className="hero-desc">
                {activeHeroProduct
                  ? `${activeHeroProduct.category} • ${activeHeroProduct.badge ? activeHeroProduct.badge : "Top Pick"
                  }`
                  : "Curated fashion crafted with artisanal detail."}
              </p>

              <div className="hero-actions">
                <a
                  className="btn-primary"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    props.onPageChange("shop");
                  }}
                >
                  Explore Collection <ArrowIcon />
                </a>

                {activeHeroProduct && (
                  <a
                    className="btn-outline"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      props.onOpenDetail(activeHeroProduct.id);
                    }}
                  >
                    Quick View
                  </a>
                )}
              </div>

              <div className="hero-stats">
                <div className="stat">
                  <div className="stat-num">
                    {activeHeroProduct
                      ? activeHeroProduct.rating.toFixed(1) + "★"
                      : "4.9★"}
                  </div>
                  <div className="stat-label">Avg Rating</div>
                </div>
                <div className="stat">
                  <div className="stat-num">
                    {activeHeroProduct ? activeHeroProduct.reviews : "380+"}
                  </div>
                  <div className="stat-label">Reviews</div>
                </div>
                <div className="stat">
                  <div className="stat-num">Free</div>
                  <div className="stat-label">Shipping</div>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-wrap">
              <div className={`hero-img-card ${heroLoaded ? "hero-loaded" : ""}`}>

                <div className="hero-img-placeholder">
                  {activeHeroProduct && (
                    <img
                      key={activeHeroProduct.id}
                      src={activeHeroProduct.images[0]}
                      alt={activeHeroProduct.name}
                      className="hero-img"
                      loading="eager"
                    />
                  )}
                </div>
              </div>

              <div className="floating-badge badge-1">
                <div className="badge-icon">
                  <StarIcon className="badge-icon-svg star-icon" />
                </div>
                <div className="badge-info">
                  <p>Premium Quality</p>
                  <p>Handcrafted designs</p>
                </div>
              </div>

              <div className="floating-badge badge-2">
                <div className="badge-icon">
                  <svg
                    viewBox="0 0 24 24"
                    className="badge-icon-svg shipping-icon"
                  >
                    <rect x="1" y="3" width="15" height="13" />
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                </div>
                <div className="badge-info">
                  <p>Free Shipping</p>
                  <p>Orders above ₹2999</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
