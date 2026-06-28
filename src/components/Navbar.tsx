import { useEffect, useState } from "react";
import type { PageName } from "../types";
import { BagIcon, HeartIcon, MenuIcon, UserIcon } from "./Icons";
import Logo from "./Logo";

type NavbarProps = {
  cartCount: number;
  onPageChange: (page: PageName) => void;
  onScrollToSection: (id: string) => void;
  onOpenCart: () => void;
};

export default function Navbar({ cartCount, onPageChange, onScrollToSection, onOpenCart }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (page: PageName) => {
    setMenuOpen(false);
    onPageChange(page);
  };

  const navHomeSection = (id: string) => {
    setMenuOpen(false);
    onPageChange("home");
    onScrollToSection(id);
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`} id="navbar">
        <div className="container nav-inner">
          <Logo onClick={() => go("home")} />
          <ul className="nav-links">
            <li><a href="#" onClick={(e) => { e.preventDefault(); go("home"); }}>Home</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); go("shop"); }}>Shop</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); navHomeSection("categories"); }}>Categories</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); navHomeSection("new-arrivals"); }}>New Arrivals</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); navHomeSection("bestsellers"); }}>Best Sellers</a></li>
          </ul>
          <div className="nav-actions">
            <button className="nav-btn" onClick={() => go("auth")} title="Account"><UserIcon /></button>
            <button className="nav-btn" onClick={() => go("wishlist")} title="Wishlist"><HeartIcon /></button>
            <button className="nav-btn cart-icon" onClick={onOpenCart} title="Cart">
              <BagIcon />
              <span className="cart-badge" id="nav-cart-count">{cartCount}</span>
            </button>
            <button className="nav-cta" onClick={() => go("shop")}>Shop Now</button>
            <button className="hamburger" onClick={() => setMenuOpen((value) => !value)} title="Menu"><MenuIcon id="ham-icon" /></button>
          </div>
        </div>
      </nav>
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`} id="mobileMenu">
        <ul>
          <li><a href="#" onClick={(e) => { e.preventDefault(); go("home"); }}>Home</a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); go("shop"); }}>Shop</a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); navHomeSection("categories"); }}>Categories</a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); navHomeSection("new-arrivals"); }}>New Arrivals</a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); navHomeSection("bestsellers"); }}>Best Sellers</a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); go("auth"); }}>Account</a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); go("wishlist"); }}>Wishlist</a></li>
        </ul>
      </div>
    </>
  );
}
