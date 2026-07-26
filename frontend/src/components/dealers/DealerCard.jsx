import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Radar, Navigation } from 'lucide-react';

export default function DealerCard({ dealer, isHovered, onMouseEnter, onMouseLeave }) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`dealer-card ${isHovered ? 'hovered' : ''}`}
    >
      <div className="dealer-auth-tag">
        {String(dealer.id).padStart(3, '0')}_AUTHORIZED
      </div>

      {dealer.isPlatinum && (
        <div className="dealer-platinum-tag">
          <span className="platinum-dot" />
          <span className="platinum-text">PLATINUM PARTNER</span>
        </div>
      )}

      <h3 className={`dealer-name ${dealer.isPlatinum ? 'platinum-margin' : ''}`}>
        {dealer.companyName || dealer.name}
      </h3>

      <div className="dealer-info-row">
        <MapPin size={18} />
        <p>{dealer.location}</p>
      </div>

      <div className="dealer-info-row margin-large">
        <Phone size={18} />
        <p>{dealer.phone}</p>
      </div>

      <div className="dealer-actions">
        <Link
          to={dealer.route || `/dealer/${dealer.id}`}
          className="btn-view-profile"
        >
          VIEW PROFILE <Radar size={16} />
        </Link>

        {dealer.mapUrl && (
          <button
            onClick={() => window.open(dealer.mapUrl, '_blank')}
            className="btn-directions"
          >
            GET DIRECTIONS <Navigation size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
