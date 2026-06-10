import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../../Context/CartContext";
import { saveActivity } from "../../../utils/cmsDb";
import Icon from "../../../utils/Icon";

const C = {
  bg: "#11140c",
  bgContainer: "#1e2117",
  bgHigh: "#282b21",
  bgLow: "#1a1d14",
  bgLowest: "#0c0f07",
  surface: "#11140c",
  surfaceVariant: "#33362c",
  primary: "#deffa4",
  secondary: "#94da32",
  secondaryContainer: "#75b800",
  outline: "#8d937f",
  outlineVariant: "#434938",
  onSurface: "#e2e4d5",
  onSurfaceVariant: "#c3c9b3",
  onSecondary: "#203700",
  onPrimary: "#233600",
};

function FormField({ label, children }) {
  return (
    <div className="field">
      <label className="field-label">{label}</label>
      {children}
    </div>
  );
}

function SectionCard({ title, icon, children }) {
  return (
    <div style={{ background: C.bgContainer, border: `1px solid ${C.outlineVariant}`, padding: 32, position: "relative" }}>
      <span className="corner-tl" />
      <span className="corner-br" />
      <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 600, color: C.onSurface, marginBottom: 28, display: "flex", alignItems: "center", gap: 10, letterSpacing: "0.05em" }}>
        <span style={{ color: C.secondary, fontSize: 20 }}>{icon}</span>
        {title}
      </h2>
      {children}
    </div>
  );
}

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const [payment, setPayment] = useState("khalti");
  const [createAccount, setCreateAccount] = useState(false);
  const navigate = useNavigate();

  // Form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [suite, setSuite] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("Bagmati");
  const [postcode, setPostcode] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const logistics = subtotal > 0 ? 1200 : 0;
  const total = subtotal + logistics;

  const formatPrice = (amount) => {
    return `रू ${Number(amount).toLocaleString("en-IN")}`;
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      alert("Your cart is empty! Please add products before placing an order.");
      navigate("/products");
      return;
    }

    if (!firstName.trim() || !lastName.trim() || !address.trim() || !city.trim() || !phone.trim() || !email.trim()) {
      alert("Please fill in all required billing details (First Name, Last Name, Street Address, City, Phone, and Email).");
      return;
    }

    const orderId = `NV-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder = {
      id: orderId,
      date: new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' }),
      status: "Processing",
      total: formatPrice(total),
      paymentMethod: payment === "khalti" ? "Khalti Wallet" : "Cash On Delivery",
      customer: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        company: company.trim(),
        address: `${address.trim()} ${suite.trim()}`.trim(),
        city: city.trim(),
        district,
        postcode: postcode.trim(),
        phone: phone.trim(),
        email: email.trim(),
        notes: notes.trim()
      },
      items: cart.map(item => ({
        name: item.name,
        qty: String(item.quantity).padStart(2, '0'),
        price: formatPrice(item.price * item.quantity)
      }))
    };

    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    savedOrders.unshift(newOrder);
    localStorage.setItem("orders", JSON.stringify(savedOrders));

    saveActivity(`New customer order placed: ID #${orderId} for ${newOrder.customer.firstName} ${newOrder.customer.lastName} (${newOrder.total})`, "order");

    alert(`Order successfully placed under ID #${orderId}! Coordinating delivery.`);
    clearCart();
    navigate("/orders");
  };

  return (
    <div className="checkout-page" style={{ background: C.bg, minHeight: "100vh", color: C.onSurface, fontFamily: "'Poppins', sans-serif" }}>

      {/* Main */}
      <main style={{ paddingTop: 40, paddingBottom: 80, maxWidth: 1440, margin: "0 auto", padding: "40px 48px 80px" }}>
        {/* Header */}
        <header className="fade-in" style={{ marginBottom: 44, borderLeft: `6px solid ${C.secondary}`, paddingLeft: 20 }}>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: C.onSurface, marginBottom: 8 }}>
            Checkout Process
          </h1>
          <p style={{ color: C.onSurfaceVariant, fontSize: 15, lineHeight: 1.7, maxWidth: 560 }}>
            Secure checkout for enterprise-grade hardware. Ensure all technical specifications and delivery details are precise.
          </p>
        </header>

        <div style={{ display: "grid", gridTemplateColumns: "7fr 5fr", gap: 24 }}>
          {/* LEFT: Billing */}
          <section className="fade-in" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <SectionCard title="BILLING DETAILS" icon="☑">
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                  <FormField label="First Name"><input placeholder="John" type="text" value={firstName} onChange={e => setFirstName(e.target.value)} required /></FormField>
                  <FormField label="Last Name"><input placeholder="Doe" type="text" value={lastName} onChange={e => setLastName(e.target.value)} required /></FormField>
                </div>

                <FormField label="Organization / Company Name (Optional)">
                  <input placeholder="Global Security Corp" type="text" value={company} onChange={e => setCompany(e.target.value)} />
                </FormField>

                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <label className="field-label">Street Address</label>
                  <input placeholder="Industrial Park, Block 4" type="text" value={address} onChange={e => setAddress(e.target.value)} style={{ marginBottom: 8 }} required />
                  <input placeholder="Suite, Unit, Floor (Optional)" type="text" value={suite} onChange={e => setSuite(e.target.value)} />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
                  <FormField label="Town / City"><input placeholder="Kathmandu" type="text" value={city} onChange={e => setCity(e.target.value)} required /></FormField>
                  <FormField label="District">
                    <select value={district} onChange={e => setDistrict(e.target.value)}>
                      <option value="Bagmati">Bagmati</option>
                      <option value="Gandaki">Gandaki</option>
                      <option value="Lumbini">Lumbini</option>
                      <option value="Koshi">Koshi</option>
                    </select>
                  </FormField>
                  <FormField label="Postcode"><input placeholder="44600" type="text" value={postcode} onChange={e => setPostcode(e.target.value)} /></FormField>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                  <FormField label="Phone"><input placeholder="+977 98XXXXXXXX" type="tel" value={phone} onChange={e => setPhone(e.target.value)} required /></FormField>
                  <FormField label="Email Address"><input placeholder="contact@mybusiness.com" type="email" value={email} onChange={e => setEmail(e.target.value)} required /></FormField>
                </div>

                <label style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={createAccount}
                    onChange={e => setCreateAccount(e.target.checked)}
                    style={{ width: 18, height: 18, flexShrink: 0, accentColor: C.secondary, cursor: "pointer" }}
                  />
                  <span style={{ fontSize: 14, color: C.onSurface }}>Create an account for tracking and support?</span>
                </label>

                <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                  <label className="field-label">Installation Notes (Optional)</label>
                  <textarea placeholder="Special notes or delivery instructions..." value={notes} onChange={e => setNotes(e.target.value)} rows={4} />
                </div>
              </div>
            </SectionCard>
          </section>

          {/* RIGHT: Order Summary */}
          <section className="fade-in" style={{ position: "sticky", top: 88, alignSelf: "start" }}>
            <div style={{ background: C.bgHigh, border: `1px solid ${C.outlineVariant}`, padding: 32, boxShadow: "4px 4px 0 rgba(0,0,0,0.08)" }}>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 600, color: C.onSurface, marginBottom: 24, paddingBottom: 16, borderBottom: `1px solid ${C.outlineVariant}`, display: "flex", alignItems: "center", gap: 10, letterSpacing: "0.05em" }}>
                <span style={{ color: C.secondary }}>⊠</span> ORDER SUMMARY
              </h2>

              {/* Products */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
                {cart.length === 0 ? (
                  <div style={{ color: C.onSurfaceVariant, fontSize: 14, textAlign: "center", padding: "16px 0" }}>
                    YOUR SHOPPING CART IS EMPTY
                  </div>
                ) : (
                  cart.map((p, i) => (
                    <div key={p.id || i} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                        <img
                          src={p.img}
                          alt={p.name}
                          style={{
                            width: 48,
                            height: 48,
                            objectFit: "cover",
                            border: `1px solid ${C.outlineVariant}`,
                            background: C.bgLowest
                          }}
                        />
                        <div>
                          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 600, color: C.onSurface, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 4 }}>
                            {p.name}
                          </div>
                          <div style={{ fontSize: 12, color: C.onSurfaceVariant }}>
                            Qty: {String(p.quantity).padStart(2, '0')}
                          </div>
                        </div>
                      </div>
                      <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 600, color: C.onSurface, whiteSpace: "nowrap" }}>
                        {formatPrice(p.price * p.quantity)}
                      </span>
                    </div>
                  ))
                )}
              </div>

              {/* Totals */}
              <div style={{ borderTop: `1px solid ${C.outlineVariant}`, paddingTop: 18, marginBottom: 24, display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 14, color: C.onSurfaceVariant }}>Subtotal</span>
                  <span style={{ fontSize: 14, color: C.onSurfaceVariant }}>{formatPrice(subtotal)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 14, color: C.onSurfaceVariant }}>Logistics (Standard Delivery)</span>
                  <span style={{ fontSize: 14, color: C.onSurfaceVariant }}>{formatPrice(logistics)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 12, borderTop: `1px solid ${C.outlineVariant}`, marginTop: 4 }}>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 600, color: C.onSurface }}>Total</span>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 700, color: C.secondary }}>
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              {/* Payment */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 11, fontWeight: 600, color: C.onSurfaceVariant, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>
                  Select Payment Method
                </div>

                <div className={`radio-row ${payment === "khalti" ? "selected" : ""}`} onClick={() => setPayment("khalti")}>
                  <div style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${payment === "khalti" ? C.secondary : C.outline}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {payment === "khalti" && <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.secondary }} />}
                  </div>
                  <div style={{ flex: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 600, color: C.onSurface }}>Khalti Digital Wallet</span>
                    <div style={{ background: "#5c2d91", padding: "3px 8px", display: "flex", alignItems: "center" }}>
                      <span style={{ fontSize: 9, color: "#fff", fontWeight: 700, letterSpacing: "0.04em" }}>KHALTI</span>
                    </div>
                  </div>
                </div>

                <div className={`radio-row ${payment === "cod" ? "selected" : ""}`} onClick={() => setPayment("cod")}>
                  <div style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${payment === "cod" ? C.secondary : C.outline}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {payment === "cod" && <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.secondary }} />}
                  </div>
                  <div style={{ flex: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 600, color: C.onSurface }}>Cash On Delivery</span>
                    <Icon name="local_shipping" size={18} style={{ color: C.onSurfaceVariant }} />
                  </div>
                </div>
              </div>

              <button onClick={handlePlaceOrder} className="exec-btn" style={{ width: "100%", cursor: cart.length === 0 ? "not-allowed" : "pointer" }}>
                PLACE ORDER
              </button>

              <div style={{ marginTop: 16, textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, color: C.onSurfaceVariant, fontSize: 12, letterSpacing: "0.06em" }}>
                <Icon name="lock" size={14} style={{ color: C.onSurfaceVariant }} /> SECURE TRANSACTION
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
