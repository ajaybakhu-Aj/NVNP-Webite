import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../../Context/CartContext";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background: #000;
    color: #e5e2e1;
    font-family: 'Inter', sans-serif;
  }

  .nv-root {
    background: #000;
    min-height: 100vh;
    color: #e5e2e1;
  }

  .nv-main {
    max-width: 1280px;
    margin: auto;
    padding: 48px 24px;
  }

  .nv-cart-header {
    margin-bottom: 60px;
    border-left: 4px solid #94da32;
    padding-left: 24px;
  }

  .nv-cart-title {
    font-size: 60px;
    color: #94da32;
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 700;
  }

  .nv-cart-sub {
    margin-top: 10px;
    color: #8d937f;
    letter-spacing: 3px;
    font-size: 12px;
  }

  .nv-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 40px;
  }

  @media(min-width:1024px){
    .nv-grid{
      grid-template-columns: 2fr 1fr;
    }
  }

  .nv-products {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .nv-card {
    background: #161616;
    border: 1px solid #434938;
    padding: 24px;
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
  }

  .nv-card-img-wrap {
    width: 180px;
    height: 180px;
    overflow: hidden;
    border: 1px solid #434938;
  }

  .nv-card-img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .nv-card-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .nv-card-top {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    flex-wrap: wrap;
  }

  .nv-card-name {
    font-size: 24px;
    font-family: 'Space Grotesk', sans-serif;
    color: #fff;
  }

  .nv-card-price {
    color: #94da32;
    font-size: 24px;
    font-weight: 700;
  }

  .nv-card-footer {
    margin-top: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
  }

  .nv-qty-ctrl {
    display: flex;
    align-items: center;
    border: 1px solid #555;
  }

  .nv-qty-btn {
    width: 40px;
    height: 40px;
    border: none;
    background: transparent;
    color: white;
    cursor: pointer;
    font-size: 20px;
  }

  .nv-qty-btn:hover {
    background: #94da32;
    color: black;
  }

  .nv-qty-val {
    width: 50px;
    text-align: center;
    font-size: 20px;
  }

  .nv-remove-btn {
    background: transparent;
    border: none;
    color: #ff7b7b;
    cursor: pointer;
    font-size: 13px;
    letter-spacing: 2px;
  }

  .nv-sidebar-box {
    border: 1px solid #94da32;
    padding: 24px;
    background: #151515;
    position: sticky;
    top: 100px;
  }

  .nv-summary-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
    color: #aaa;
  }

  .nv-total-row {
    border-top: 1px solid #333;
    margin-top: 24px;
    padding-top: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .nv-total-val {
    color: #94da32;
    font-size: 34px;
    font-weight: 700;
  }

  .nv-cta {
    width: 100%;
    margin-top: 24px;
    padding: 18px;
    background: #94da32;
    color: black;
    border: none;
    cursor: pointer;
    font-size: 20px;
    font-weight: 700;
  }

  .nv-cta:hover {
    background: #b5e75d;
  }

  .empty-cart {
    border: 1px solid #444;
    padding: 60px;
    text-align: center;
    font-size: 28px;
    color: #777;
    font-family: 'Space Grotesk', sans-serif;
  }

  /* ========== RESPONSIVE DESIGN ========== */

  /* TABLET (max 1024px) */
  @media (max-width: 1024px) {
    .nv-main {
      padding: 40px 20px;
    }

    .nv-cart-header {
      margin-bottom: 48px;
      padding-left: 20px;
    }

    .nv-cart-title {
      font-size: 48px;
    }

    .nv-grid {
      gap: 32px;
    }

    .nv-card {
      padding: 20px;
      gap: 20px;
    }

    .nv-card-img-wrap {
      width: 160px;
      height: 160px;
    }

    .nv-card-name {
      font-size: 20px;
    }

    .nv-card-price {
      font-size: 20px;
    }

    .nv-card-footer {
      gap: 16px;
      margin-top: 16px;
    }

    .nv-sidebar-box {
      padding: 20px;
      top: 80px;
    }

    .nv-summary-row {
      margin-bottom: 14px;
      font-size: 14px;
    }

    .nv-total-val {
      font-size: 28px;
    }

    .nv-cta {
      padding: 16px;
      font-size: 16px;
    }

    .empty-cart {
      padding: 40px;
      font-size: 20px;
    }
  }

  /* MOBILE TABLET (max 768px) */
  @media (max-width: 768px) {
    .nv-main {
      padding: 32px 16px;
    }

    .nv-cart-header {
      margin-bottom: 40px;
      padding-left: 16px;
      border-left-width: 3px;
    }

    .nv-cart-title {
      font-size: 36px;
    }

    .nv-cart-sub {
      font-size: 11px;
      margin-top: 8px;
    }

    .nv-grid {
      gap: 24px;
    }

    .nv-products {
      gap: 20px;
    }

    .nv-card {
      padding: 16px;
      gap: 16px;
      flex-direction: column;
    }

    .nv-card-img-wrap {
      width: 100%;
      height: 200px;
    }

    .nv-card-body {
      gap: 16px;
    }

    .nv-card-top {
      flex-direction: column;
      gap: 12px;
    }

    .nv-card-name {
      font-size: 18px;
    }

    .nv-card-price {
      font-size: 18px;
    }

    .nv-card-footer {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
      margin-top: 12px;
    }

    .nv-qty-ctrl {
      width: 100%;
      max-width: 120px;
    }

    .nv-qty-btn {
      width: 36px;
      height: 36px;
      font-size: 18px;
    }

    .nv-qty-val {
      width: 45px;
      font-size: 16px;
    }

    .nv-remove-btn {
      font-size: 12px;
    }

    .nv-sidebar-box {
      padding: 18px;
      position: static;
      top: auto;
      margin-top: 20px;
    }

    .nv-summary-row {
      margin-bottom: 12px;
      font-size: 13px;
    }

    .nv-total-row {
      margin-top: 16px;
      padding-top: 16px;
    }

    .nv-total-val {
      font-size: 24px;
    }

    .nv-cta {
      padding: 14px;
      font-size: 14px;
      margin-top: 16px;
    }

    .empty-cart {
      padding: 30px 16px;
      font-size: 18px;
    }

    a {
      font-size: 14px !important;
    }
  }

  /* SMALL MOBILE (max 480px) */
  @media (max-width: 480px) {
    .nv-main {
      padding: 24px 12px;
    }

    .nv-cart-header {
      margin-bottom: 32px;
      padding-left: 12px;
    }

    .nv-cart-title {
      font-size: 28px;
      letter-spacing: 1px;
    }

    .nv-cart-sub {
      font-size: 10px;
      margin-top: 6px;
    }

    .nv-grid {
      gap: 20px;
    }

    .nv-products {
      gap: 16px;
    }

    .nv-card {
      padding: 14px;
      gap: 14px;
      flex-direction: column;
    }

    .nv-card-img-wrap {
      width: 100%;
      height: 160px;
    }

    .nv-card-name {
      font-size: 16px;
    }

    .nv-card-price {
      font-size: 16px;
    }

    .nv-card-top {
      flex-direction: column;
      gap: 10px;
    }

    .nv-card-footer {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
      margin-top: 10px;
    }

    .nv-qty-ctrl {
      width: 100%;
      max-width: 110px;
    }

    .nv-qty-btn {
      width: 32px;
      height: 32px;
      font-size: 16px;
    }

    .nv-qty-val {
      width: 40px;
      font-size: 14px;
    }

    .nv-remove-btn {
      font-size: 11px;
      letter-spacing: 1px;
    }

    .nv-sidebar-box {
      padding: 16px;
      position: static;
      top: auto;
      margin-top: 16px;
      border-width: 1px;
    }

    .nv-summary-row {
      margin-bottom: 10px;
      font-size: 12px;
    }

    .nv-total-row {
      margin-top: 14px;
      padding-top: 14px;
    }

    .nv-total-val {
      font-size: 20px;
    }

    .nv-cta {
      padding: 12px;
      font-size: 13px;
      margin-top: 14px;
      font-weight: 600;
    }

    input[type="text"] {
      font-size: 14px !important;
      padding: 12px !important;
    }

    .empty-cart {
      padding: 24px 12px;
      font-size: 16px;
    }

    a {
      font-size: 12px !important;
    }
  }

  /* EXTRA SMALL (max 360px) */
  @media (max-width: 360px) {
    .nv-main {
      padding: 20px 10px;
    }

    .nv-cart-header {
      margin-bottom: 24px;
      padding-left: 10px;
    }

    .nv-cart-title {
      font-size: 24px;
    }

    .nv-card-img-wrap {
      height: 140px;
    }

    .nv-card-name {
      font-size: 14px;
    }

    .nv-card-price {
      font-size: 14px;
    }

    .nv-sidebar-box {
      padding: 14px;
    }

    .nv-summary-row {
      font-size: 11px;
    }

    .nv-total-val {
      font-size: 18px;
    }

    .nv-cta {
      padding: 10px;
      font-size: 12px;
    }

    .empty-cart {
      padding: 20px 10px;
      font-size: 14px;
    }
  }

  /* MOBILE LANDSCAPE (480px and below, landscape) */
  @media (max-width: 480px) and (orientation: landscape) {
    .nv-main {
      padding: 20px 12px;
    }

    .nv-cart-header {
      margin-bottom: 20px;
    }

    .nv-cart-title {
      font-size: 24px;
    }

    .nv-card {
      flex-direction: row;
      gap: 12px;
      padding: 12px;
    }

    .nv-card-img-wrap {
      width: 140px;
      height: 140px;
    }

    .nv-card-name {
      font-size: 14px;
    }

    .nv-card-price {
      font-size: 14px;
    }

    .nv-card-footer {
      flex-direction: row;
      gap: 8px;
    }

    .nv-sidebar-box {
      position: sticky;
      top: 60px;
      padding: 14px;
    }

    .nv-summary-row {
      font-size: 11px;
      margin-bottom: 8px;
    }

    .nv-total-val {
      font-size: 18px;
    }
  }

  /* TABLET LANDSCAPE (1024px and below, landscape) */
  @media (max-width: 1024px) and (orientation: landscape) {
    .nv-sidebar-box {
      top: 60px;
      padding: 18px;
    }

    .nv-card {
      gap: 16px;
    }

    .nv-card-img-wrap {
      width: 150px;
      height: 150px;
    }
`;

const TAX_RATE = 0.13;

function formatNPR(amount) {

  if (!amount) {
    return "रू 0";
  }

  return `रू ${Number(amount).toLocaleString("en-IN")}`;
}

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty,
  } = useContext(CartContext);

  const [promoCode, setPromoCode] = useState("");

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const tax = Math.round(subtotal * TAX_RATE);

  const total = subtotal + tax;

  return (
    <>
      <style>{styles}</style>

      <div className="nv-root">
        <main className="nv-main">

          <section className="nv-cart-header">
            <h1 className="nv-cart-title">
              YOUR COMMAND CART
            </h1>

            <p className="nv-cart-sub">
              REVIEW YOUR SELECTED PRODUCTS
            </p>
          </section>

          <div className="nv-grid">

            <div className="nv-products">

              {cart.length === 0 ? (
                <div className="empty-cart">
                  CART IS EMPTY
                </div>
              ) : (
                cart.map((product) => (
                  <div className="nv-card" key={product.id}>

                    <div className="nv-card-img-wrap">
                      <img src={product.img} alt={product.name} />
                    </div>

                    <div className="nv-card-body">

                      <div className="nv-card-top">

                        <div>
                          <h2 className="nv-card-name">
                            {product.name}
                          </h2>

                          <p style={{ color: "#888", marginTop: "8px" }}>
                            {product.sku}
                          </p>
                        </div>

                        <div className="nv-card-price">
                          {formatNPR(product.price)}
                        </div>

                      </div>

                      <div className="nv-card-footer">

                        <div className="nv-qty-ctrl">

                          <button
                            className="nv-qty-btn"
                            onClick={() => decreaseQty(product.id)}
                          >
                            -
                          </button>

                          <div className="nv-qty-val">
                            {product.quantity}
                          </div>

                          <button
                            className="nv-qty-btn"
                            onClick={() => increaseQty(product.id)}
                          >
                            +
                          </button>

                        </div>

                        <button
                          className="nv-remove-btn"
                          onClick={() => removeFromCart(product.id)}
                        >
                          REMOVE PRODUCT
                        </button>

                      </div>

                    </div>

                  </div>
                ))
              )}

              <Link
                to="/product"
                style={{
                  color: "#94da32",
                  textDecoration: "none",
                  marginTop: "10px",
                  display: "inline-block",
                }}
              >
                ← Continue Shopping
              </Link>

            </div>

            <aside>

              <div className="nv-sidebar-box">

                <div className="nv-summary-row">
                  <span>SUBTOTAL</span>
                  <span>{formatNPR(subtotal)}</span>
                </div>

                <div className="nv-summary-row">
                  <span>TAX</span>
                  <span>{formatNPR(tax)}</span>
                </div>

                <div className="nv-summary-row">
                  <span>SHIPPING</span>
                  <span>FREE</span>
                </div>

                <div className="nv-total-row">
                  <span>TOTAL</span>

                  <div className="nv-total-val">
                    {formatNPR(total)}
                  </div>
                </div>

                <div style={{ marginTop: "24px" }}>

                  <input
                    type="text"
                    placeholder="Promo Code"
                    value={promoCode}
                    onChange={(e) =>
                      setPromoCode(e.target.value)
                    }
                    style={{
                      width: "100%",
                      padding: "14px",
                      background: "#000",
                      border: "1px solid #555",
                      color: "#fff",
                      marginBottom: "16px",
                    }}
                  />

                  <Link
                    to="/checkout"
                    className="nv-cta"
                    style={{
                      display: "block",
                      textAlign: "center",
                      textDecoration: "none",
                    }}
                  >
                    CHECKOUT
                  </Link>

                </div>

              </div>

            </aside>

          </div>

        </main>
      </div>
    </>
  );
}