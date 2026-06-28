import type { PageName } from "../types";
import Logo from "./Logo";

type FooterProps = {
  onPageChange: (page: PageName) => void;
  onScrollToSection?: (id: string) => void;
  compact?: boolean;
};

export default function Footer({
  onPageChange,
  onScrollToSection,
  compact = false,
}: FooterProps) {
  if (compact) {
    return (
      <div
        style={{
          background: "var(--text-dark)",
          color: "rgba(255,255,255,0.4)",
          textAlign: "center",
          padding: 24,
          fontSize: 12,
          marginTop: 60,
        }}
      >
        © 2026 MAYURI — All rights reserved
      </div>
    );
  }

  const goHomeSection = (id: string) => {
    onPageChange("home");
    onScrollToSection?.(id);
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo light onClick={() => onPageChange("home")} />
            <p>
              Where tradition meets the iridescence of the modern woman. Crafted
              with love, worn with pride.
            </p>
            <div className="footer-social">
              {[
                // Facebook
                "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",

                // Instagram
                "M16 3H8a5 5 0 0 0-5 5v8a5 5 0 0 0 5 5h8a5 5 0 0 0 5-5V8a5 5 0 0 0-5-5zm3 13a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3zm-7-8a4 4 0 1 0 4 4 4 4 0 0 0-4-4zm0 6a2 2 0 1 1 2-2 2 2 0 0 1-2 2zm4.5-7.5a1 1 0 1 1 1-1 1 1 0 0 1-1 1z",

                // X / Twitter
                "M18.244 2H21l-6.56 7.5L22 22h-6.828l-5.346-6.99L3.7 22H1l7.017-8.018L2 2h7l4.83 6.32zM17.05 20h1.885L7.976 4H6.06z",

                // YouTube
                "M22.54 6.42a2.78 2.78 0 0 0-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 1.96C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM10 15.5v-7l6 3.5z",

              ].map((path) => (
                <button className="social-btn" key={path}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d={path} />
                  </svg>
                </button>
              ))}
            </div>
          </div>
          <div className="footer-col">
            <h5>Quick Links</h5>
            <ul>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange("home");
                  }}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="shop"
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange("shop");
                  }}
                >
                  Shop All
                </a>
              </li>
              <li>
                <a
                  href="new-arrivals"
                  onClick={(e) => {
                    e.preventDefault();
                    goHomeSection("new-arrivals");
                  }}
                >
                  New Arrivals
                </a>
              </li>
              <li>
                <a
                  href="bestsellers"
                  onClick={(e) => {
                    e.preventDefault();
                    goHomeSection("bestsellers");
                  }}
                >
                  Best Sellers
                </a>
              </li>
              <li>
                <a
                  href="wishlist"
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange("wishlist");
                  }}
                >
                  My Wishlist
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Support</h5>
            <ul>
              <li>
                <a href="#">Size Guide</a>
              </li>
              <li>
                <a href="#">Track Order</a>
              </li>
              <li>
                <a href="#">Returns & Exchange</a>
              </li>
              <li>
                <a href="#">Shipping Policy</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Contact</h5>
            <ul>
              <li>
                <a href="mailto:hello@mayuri.in">hello@mayuri.in</a>
              </li>
              <li>
                <a href="tel:+918001234567">+91 800 123 4567</a>
              </li>
              <li>
                <a href="#">Mon – Sat, 10am – 7pm</a>
              </li>
              <li>
                <a href="#">Prayagraj, Uttar Pradesh, India</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © 2026 MAYURI. All rights reserved. Crafted with love ❤️ in India.
          </p>
          <div className="footer-payments">
            <div className="payment-badge">MC</div>
            <div className="payment-badge">UPI</div>
            <div className="payment-badge">COD</div>
            <div className="payment-badge">EMI</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
