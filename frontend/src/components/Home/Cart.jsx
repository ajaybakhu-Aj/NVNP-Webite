import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";

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

                  <button className="nv-cta">
                    CHECKOUT
                  </button>

                </div>

              </div>

            </aside>

          </div>

        </main>
      </div>
    </>
  );
}