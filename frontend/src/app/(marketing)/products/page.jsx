import React, { useState, useEffect } from "react";
import { getAllProducts, addProduct, resetDatabase } from "../../../utils/productDb";
import ProductCard from "../../../components/products/ProductCard";

const categories = [
  "ALL SYSTEMS",
  "INDOOR SURVEILLANCE",
  "OUTDOOR SURVEILLANCE",
  "WI-FI ENABLED",
];

const PRESET_IMAGES = [
  { label: "Bullet Camera (Standard)", url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBJXIhdE3QlNTyBvvVNsX7AvQ1FgR0bEuz9t4y2rZUZzPYH31IBG8mDdC_YSs4ZVv-SvZh4BX2N8rerYwJP9KWeiTbNl1Mi5f6YeutWhIjRBYGcd5up8aI2HRoy3_SE8gTfOBC51xZdw2cZQ75_07DCVMTgWV3hOGVfuG9iCgYLIF1hsHOFxRYhlT-DhRsnC3XP7q61WV9mDrFD4VpSEdGMCvBbvmX88LcQrCIU0n26Uvpn8Q6v8UlrMFINjCp9TI4KQSz_GrfS__w" },
  { label: "Dome Camera (Ceiling)", url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBp1Xc0d9UMtUth6QS2N6GCirYIIla4mss3eq30soweXB3PpYj8E6HRJzdHMxBAAEBv63GF_ZiG-NkI3AvEGe0e16F-FMhLLk6qKCWN7LcvPEUP7DKzP7YeC3pA1dz_nRVx6s3TOp6jtm2KM5WnYLwI5gu-IpY2NLtvOLVPuqrtLASW4YQeyYy7_vvnJ3KzGD3Oj12-dTRSB4yQEpMxwXLDeEsBGZAm-X8KjGArbhWKJ8HfncIbAogSDovzMdnFW1erfKaDP_dgrjs" },
  { label: "PTZ Camera (Industrial)", url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDzJg1D0mnGkYwZ8Fajghv4evONVAKLuwriOPflWIo1zkQoU4AFCDPj7lS4O_WQQONg9naYxzfWmkOrYx178ceJD72fG7SJWe6hIPt068mI2Ku3wztp9tbh5Bg8e3MDrday1sCj-mvcGojpvR7jfe1Y3CdpiQo6WYeLrVI4dzPm2YQOEKsubDGCL2__a5bIoP5YtGE8aFjxaNb89gIK59qcToZ7Rp-RGg2FR3WHBuqDIRFFOJwGiK_B9Vjc13C-ehWcvJIY_mihhqk" },
  { label: "Covert Camera (Mini)", url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCfmkbSFVJ8AlzhQZHjMM4pIiv2OYIDhHkMZsWnmMTKqm9GwRMBdIZX2nZtMt94Rn9WI1BacR8uuqTkmZl_vWiGITSLb49PmCUbbZ5M81mz2w_VyCO_KCjT7d-p9hzUHt4rvyKm4OXLTA1XrWaJUvzewFlMad6e3pebPKLMVM7HknUwJL2jt6HUAMzjyO_-JJH3L6zzV8GnKhvA1im_7ZfPFJuRx-skTuwyvbK7kLrYtRHDbm4bdy8" }
];

export default function NightVision() {
  const [productsList, setProductsList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("ALL SYSTEMS");
  const [loading, setLoading] = useState(true);
  const [showAdmin, setShowAdmin] = useState(false);

  // Form State
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newCategory, setNewCategory] = useState("WI-FI ENABLED");
  const [newDesc, setNewDesc] = useState("");
  const [newImg, setNewImg] = useState(PRESET_IMAGES[0].url);

  const refreshProducts = () => {
    setLoading(true);
    getAllProducts().then((data) => {
      setProductsList(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    refreshProducts();
  }, []);

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newName || !newPrice || !newDesc) {
      alert("Please fill out all required fields.");
      return;
    }
    const slug = newName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    
    const productData = {
      id: slug,
      name: newName,
      price: Number(newPrice),
      category: newCategory,
      description: newDesc,
      img: newImg,
      badge: "NEW SYSTEM",
      status: "IN STOCK"
    };

    addProduct(productData).then(() => {
      alert(`System '${newName}' successfully registered in the database!`);
      setNewName("");
      setNewPrice("");
      setNewDesc("");
      refreshProducts();
    });
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset the database to factory defaults?")) {
      resetDatabase().then(() => {
        alert("Database successfully reset.");
        refreshProducts();
      });
    }
  };

  const filteredProducts =
    selectedCategory === "ALL SYSTEMS"
      ? productsList
      : productsList.filter((p) => p.category === selectedCategory);

  return (
    <div className="products-page">
      {/* HERO */}
      <section className="products-hero">
        <div className="products-hero-content">
          <h1 className="products-hero-title">OUR PRODUCTS</h1>
          <p className="products-hero-desc">
            Advanced surveillance architecture engineered for uncompromising vigilance.
          </p>
        </div>
      </section>

      {/* DATABASE CONTROL PANEL */}
      <section style={{ maxWidth: 1280, margin: "24px auto", padding: "0 24px" }}>
        <div style={{
          background: "#181a15",
          border: "1px solid #434938",
          padding: 16,
          borderRadius: 4
        }}>
          <button
            onClick={() => setShowAdmin(!showAdmin)}
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              color: "#deffa4",
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 14,
              fontWeight: 600,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
              letterSpacing: 2
            }}
          >
            <span>⚙️ DATABASE CONTROL PANEL (CLIENT-SIDE)</span>
            <span>{showAdmin ? "Collapse [-]" : "Expand [+]"}</span>
          </button>

          {showAdmin && (
            <div style={{ marginTop: 24, borderTop: "1px solid #434938", paddingTop: 24 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 32 }}>
                
                {/* Form column */}
                <form onSubmit={handleAddProduct} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <h3 style={{ color: "#fff", fontSize: 16, fontFamily: "'Space Grotesk', sans-serif", marginBottom: 8 }}>
                    ADD PRODUCT TO DATABASE
                  </h3>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <label style={{ color: "#8d937f", fontSize: 12 }}>SYSTEM NAME *</label>
                    <input
                      type="text"
                      placeholder="e.g. Netra X-900 Pro"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      required
                      style={{ background: "#0c0d0a", border: "1px solid #434938", color: "#fff", padding: "10px 14px", borderRadius: 4 }}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      <label style={{ color: "#8d937f", fontSize: 12 }}>PRICE (NPR) *</label>
                      <input
                        type="number"
                        placeholder="e.g. 7400"
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                        required
                        style={{ background: "#0c0d0a", border: "1px solid #434938", color: "#fff", padding: "10px 14px", borderRadius: 4 }}
                      />
                    </div>
                    
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      <label style={{ color: "#8d937f", fontSize: 12 }}>CATEGORY *</label>
                      <select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        style={{ background: "#0c0d0a", border: "1px solid #434938", color: "#fff", padding: "10px 14px", borderRadius: 4 }}
                      >
                        <option value="WI-FI ENABLED">WI-FI ENABLED</option>
                        <option value="INDOOR SURVEILLANCE">INDOOR SURVEILLANCE</option>
                        <option value="OUTDOOR SURVEILLANCE">OUTDOOR SURVEILLANCE</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <label style={{ color: "#8d937f", fontSize: 12 }}>IMAGE TEMPLATE</label>
                    <select
                      value={newImg}
                      onChange={(e) => setNewImg(e.target.value)}
                      style={{ background: "#0c0d0a", border: "1px solid #434938", color: "#fff", padding: "10px 14px", borderRadius: 4 }}
                    >
                      {PRESET_IMAGES.map((imgOpt) => (
                        <option key={imgOpt.url} value={imgOpt.url}>{imgOpt.label}</option>
                      ))}
                    </select>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <label style={{ color: "#8d937f", fontSize: 12 }}>SYSTEM DESCRIPTION *</label>
                    <textarea
                      placeholder="Enter technical description..."
                      value={newDesc}
                      onChange={(e) => setNewDesc(e.target.value)}
                      required
                      rows={3}
                      style={{ background: "#0c0d0a", border: "1px solid #434938", color: "#fff", padding: "10px 14px", borderRadius: 4, resize: "none" }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      background: "#94da32",
                      color: "#111",
                      border: "none",
                      padding: 12,
                      fontWeight: 700,
                      cursor: "pointer",
                      fontFamily: "'Inter', sans-serif",
                      letterSpacing: 1,
                      marginTop: 8,
                      borderRadius: 4
                    }}
                  >
                    DEPLOY SYSTEM TO DATABASE
                  </button>
                </form>

                {/* Operations column */}
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", paddingLeft: 16, borderLeft: "1px solid #434938" }}>
                  <div>
                    <h3 style={{ color: "#fff", fontSize: 16, fontFamily: "'Space Grotesk', sans-serif", marginBottom: 16 }}>
                      SYSTEM STACKS & STATUS
                    </h3>
                    <p style={{ color: "#8d937f", fontSize: 13, lineHeight: 1.6, marginBottom: 12 }}>
                      The systems catalog is synchronized with a client-side database. Adding or resetting records will rewrite the local IndexedDB state.
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8, color: "#fff", fontFamily: "monospace", fontSize: 12 }}>
                      <div>[ACTIVE_DB]: IndexedDB (NightVisionDB)</div>
                      <div>[STORE_NAME]: products</div>
                      <div>[RECORD_COUNT]: {productsList.length} devices synced</div>
                      <div>[STATUS]: ONLINE</div>
                    </div>
                  </div>

                  <button
                    onClick={handleReset}
                    style={{
                      background: "transparent",
                      color: "#ff6b6b",
                      border: "1px solid #ff6b6b",
                      padding: 10,
                      fontWeight: 700,
                      cursor: "pointer",
                      fontFamily: "'Inter', sans-serif",
                      letterSpacing: 1,
                      borderRadius: 4,
                      marginTop: 24
                    }}
                  >
                    RESET DATABASE TO FACTORY DEFAULTS
                  </button>
                </div>

              </div>
            </div>
          )}
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="products-layout">
        {/* SIDEBAR */}
        <aside className="categories-sidebar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`category-btn ${selectedCategory === cat ? "active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </aside>

        {/* GRID */}
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "100px 0", color: "#94da32", flex: 1 }}>
            LOADING DYNAMIC DATA PIPELINES...
          </div>
        ) : (
          <div className="products-grid" style={{ flex: 1 }}>
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
            {filteredProducts.length === 0 && (
              <div style={{ color: "#8d937f", textAlign: "center", padding: "48px 0", width: "100%", gridColumn: "1 / -1" }}>
                NO SYSTEMS MATCHING THE SPECIFIED PARAMETERS.
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}