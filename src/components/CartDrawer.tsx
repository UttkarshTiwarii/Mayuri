import type { CartItem } from "../types";
import { formatPrice } from "../data/products";
import { BagIcon, CloseIcon } from "./Icons";

type CartDrawerProps = {
  cart: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onChangeQty: (id: number, delta: number) => void;
  onCheckout: () => void;
};

export default function CartDrawer({ cart, isOpen, onClose, onChangeQty, onCheckout }: CartDrawerProps) {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <>
      <div className={`overlay ${isOpen ? "open" : ""}`} id="overlay" onClick={onClose}></div>
      <div className={`cart-drawer ${isOpen ? "open" : ""}`} id="cartDrawer">
        <div className="drawer-header">
          <h3>Your Bag <span style={{ fontSize: 14, fontWeight: 400, color: "var(--text-muted)" }} id="cart-count">({count} item{count !== 1 ? "s" : ""})</span></h3>
          <button className="close-btn" onClick={onClose}><CloseIcon /></button>
        </div>
        <div className="cart-items" id="cart-items-list">
          {cart.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--text-muted)" }}>
              <BagIcon style={{ width: 48, height: 48, stroke: "var(--text-muted)", fill: "none", strokeWidth: 1, margin: "0 auto 16px" }} />
              <p style={{ fontSize: 14, marginBottom: 6 }}>Your bag is empty</p>
              <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Add something beautiful</p>
            </div>
          ) : cart.map((item) => (
            <div className="cart-item" key={`${item.id}-${item.selectedSize}-${item.selectedImageUrl}`}>
              <div className="cart-item-img" style={{ background: item.bg }}>
                <img
                  src={item.selectedImageUrl}
                  alt={item.name}
                  className="cart-item-photo"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
              <div className="cart-item-info">
                <h4>{item.name}</h4>
                <span>
                  {item.category} • Size {item.selectedSize}
                </span>
                <div className="cart-qty">
                  <button
                    className="qty-btn"
                    onClick={() => onChangeQty(item.id, -1)}
                  >
                    −
                  </button>
                  <span className="qty-val">{item.qty}</span>
                  <button
                    className="qty-btn"
                    onClick={() => onChangeQty(item.id, 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="cart-item-price">{formatPrice(item.price * item.qty)}</div>
            </div>
          ))}
        </div>
        <div className="cart-footer">
          <div className="cart-subtotal"><span>Subtotal</span><span id="cart-total">{formatPrice(subtotal)}</span></div>
          <button className="checkout-btn" onClick={onCheckout}>Proceed to Checkout</button>
          <button className="continue-btn" onClick={onClose}>Continue Shopping</button>
        </div>
      </div>
    </>
  );
}
