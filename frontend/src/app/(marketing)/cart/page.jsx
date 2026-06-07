import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../../Context/CartContext";
import Icon from "../../../utils/Icon";

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
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Error decoding user session on cart:", e);
      }
    }
    setLoading(false);
  }, []);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const tax = Math.round(subtotal * TAX_RATE);

  const total = subtotal + tax;

  if (loading) {
    return (
      <div className="profile-dashboard-container" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <Icon name="sync" className="spin-slow" size={32} style={{ color: "#94da32" }} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="profile-page-container">
        <div className="profile-card" style={{ maxWidth: "500px" }}>
          <div className="auth-card-corner top-left" />
          <div className="auth-card-corner top-right" />
          <div className="auth-card-corner bottom-left" />
          <div className="auth-card-corner bottom-right" />
          
          <div className="unauthorized-card-wrapper">
            <span className="lock-icon">
              <Icon name="lock" size={48} />
            </span>
            <h1 className="auth-title">LOGIN REQUIRED</h1>
            <p className="auth-subtitle" style={{ marginBottom: "28px" }}>
              Please log in to access your shopping cart.
            </p>
            <Link to="/login" className="auth-button" style={{ textDecoration: "none" }}>
              <Icon name="login" size={16} />
              <span>Log In</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>

      <div className="nv-root">
        <main className="nv-main">

          <section className="nv-cart-header">
            <h1 className="nv-cart-title">
              YOUR SHOPPING CART
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