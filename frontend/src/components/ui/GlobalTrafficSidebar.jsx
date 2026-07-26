import React, { useEffect, useState } from "react";
import { useSiteContents } from "../../utils/cmsDb";

export default function GlobalTrafficSidebar() {
  const siteContents = useSiteContents();

  const [activeSessions, setActiveSessions] = useState(1482);
  const [dailyHits, setDailyHits] = useState(84290);
  const [bandwidth, setBandwidth] = useState(28.4);
  const [latency, setLatency] = useState(18);
  const [threats, setThreats] = useState(427);

  useEffect(() => {
    if (siteContents) {
      const s = parseInt(siteContents.trafficActiveSessions) || 1482;
      const h = parseInt(siteContents.trafficDailyHits) || 84290;
      const b = parseFloat(siteContents.trafficBandwidth) || 28.4;
      const t = parseInt(siteContents.trafficThreatsBlocked) || 427;

      setActiveSessions(s);
      setDailyHits(h);
      setBandwidth(b);
      setThreats(t);
    }
  }, [siteContents]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSessions(prev => Math.max(10, prev + Math.floor(Math.random() * 9) - 4));
      setDailyHits(prev => prev + Math.floor(Math.random() * 3));
      setBandwidth(prev => {
        const base = parseFloat(siteContents.trafficBandwidth) || 28.4;
        const change = (Math.random() * 4 - 2);
        return Math.max(0.1, parseFloat((base + change).toFixed(1)));
      });
      setLatency(Math.floor(12 + Math.random() * 14));
    }, 3000);

    return () => clearInterval(interval);
  }, [siteContents]);

  return (
    <div className="global-traffic-sidebar">
      <div className="sidebar-vertical-label">
        <span className="live-dot-glowing"></span>
        <span className="label-text">📡 TELEMETRY FEED</span>
      </div>

      <div className="sidebar-expanded-panel">
        <div className="panel-header">
          <span className="header-status-badge">SECURE LINK: ACTIVE</span>
          <h4 className="panel-title">SYS MONITORING</h4>
        </div>

        <div className="panel-grid">
          <div className="metric-row">
            <span className="metric-label">ACTIVE SESSIONS</span>
            <span className="metric-value text-green">{activeSessions.toLocaleString()}</span>
          </div>

          <div className="metric-row">
            <span className="metric-label">PAGE VIEW HITS</span>
            <span className="metric-value text-blue">{dailyHits.toLocaleString()}</span>
          </div>

          <div className="metric-row">
            <span className="metric-label">BANDWIDTH FLOW</span>
            <span className="metric-value text-yellow">{bandwidth} MB/s</span>
          </div>

          <div className="metric-row">
            <span className="metric-label">SYS LATENCY</span>
            <span className="metric-value text-cyan">{latency} ms</span>
          </div>

          <div className="metric-row">
            <span className="metric-label">THREATS BLOCKED</span>
            <span className="metric-value text-red">{threats}</span>
          </div>
        </div>

        <div className="panel-footer">
          <span className="footer-status">FEED SYNC: ONLINE</span>
        </div>
      </div>
    </div>
  );
}
