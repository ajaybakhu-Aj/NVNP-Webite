import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "../../../utils/Icon";

export default function OrdersPage() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // Default mock orders to seed the system
  const defaultOrders = [
    {
      id: "NV-89240",
      date: "Jun 04, 2026",
      status: "Delivered",
      total: "रू 42,000",
      paymentMethod: "Khalti Wallet",
      items: [
        { name: "Y1-Ratri Dome CCTV Camera", qty: "01", price: "रू 42,000" }
      ]
    },
    {
      id: "NV-73190",
      date: "May 28, 2026",
      status: "Delivered",
      total: "रू 28,500",
      paymentMethod: "Cash On Delivery",
      items: [
        { name: "CCTV Netra V6Z Zoom Cam", qty: "01", price: "रू 28,500" }
      ]
    }
  ];

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
        
        // Read orders from localStorage
        const savedOrders = localStorage.getItem("orders");
        if (savedOrders) {
          setOrders(JSON.parse(savedOrders));
        } else {
          // Seed initial mock orders
          localStorage.setItem("orders", JSON.stringify(defaultOrders));
          setOrders(defaultOrders);
        }
      } catch (e) {
        console.error("Error reading order telemetry:", e);
      }
    }
    setLoading(false);
  }, []);

  const toggleExpandOrder = (id) => {
    setExpandedOrder(expandedOrder === id ? null : id);
  };

  if (loading) {
    return (
      <div className="orders-dashboard-container" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <Icon name="sync" className="spin-slow" size={32} style={{ color: "#94da32" }} />
      </div>
    );
  }

  // Guard: Not authenticated
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
              Please log in to view your orders.
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
    <div className="orders-dashboard-container">
      {/* Full-width Page Header */}
      <header className="orders-dashboard-header">
        <h1 className="orders-dashboard-title">Order History</h1>
        <p className="orders-dashboard-subtitle">
          Track and manage orders for: <strong style={{ color: "#94da32" }}>{user.name}</strong>
        </p>
      </header>

      {/* Full-width Table Card */}
      <div className="orders-dossier-card">
        <div className="auth-card-corner top-left" />
        <div className="auth-card-corner top-right" />
        <div className="auth-card-corner bottom-left" />
        <div className="auth-card-corner bottom-right" />

        <div className="orders-table-wrapper">
          <table className="orders-dossier-table">
            <thead>
              <tr>
                 <th>ORDER ID</th>
                 <th>DATE</th>
                 <th>STATUS</th>
                 <th>PAYMENT</th>
                 <th>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const isExpanded = expandedOrder === order.id;
                return (
                  <React.Fragment key={order.id}>
                    <tr className={isExpanded ? "row-expanded" : ""}>
                      <td>
                        <button 
                          onClick={() => toggleExpandOrder(order.id)} 
                          className="orders-id-trigger"
                        >
                          #{order.id}
                        </button>
                      </td>
                      <td>{order.date}</td>
                      <td>
                        <span className={`badge-cyber ${
                          order.status?.toLowerCase() === "command dispatching" 
                            ? "badge-cyber-dispatching" 
                            : order.status?.toLowerCase() === "processing" 
                            ? "badge-cyber-processing" 
                            : "badge-cyber-delivered"
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td>{order.paymentMethod}</td>
                      <td className="total-cell">{order.total}</td>
                    </tr>

                    {isExpanded && (
                      <tr>
                        <td colSpan="5" className="expansion-td">
                          <div className="expanded-manifest-card">
                             <h4 className="manifest-title">Order Items</h4>
                            <div className="manifest-items-list">
                              {order.items.map((item, idx) => (
                                <div key={idx} className="manifest-item-row">
                                  <span>{item.name} <span className="qty-tag">x{item.qty}</span></span>
                                  <span className="price-tag">{item.price}</span>
                                </div>
                              ))}
                            </div>
                             <div className="manifest-footer">
                               <span>Delivery Node: <strong>Bhaktapur Hub</strong></span>
                               <span>Carrier: <strong>Standard Delivery</strong></span>
                             </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
