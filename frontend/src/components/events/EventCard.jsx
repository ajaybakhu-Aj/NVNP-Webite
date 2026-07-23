import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function EventCard({ item }) {
  return (
    <Link to={`/events/${item.slug}`} className="no-underline">
      <article className="events-card-item">
        {/* Decorative neon corner brackets */}
        <div className="events-card-brackets" />
        <div className="events-card-brackets-br" />

        {/* Image container */}
        <div className="events-card-img-container">
          <img src={item.image} alt={item.title} className="events-card-img" />
          <span className="events-card-tag">{item.tag}</span>
        </div>

        {/* Body details */}
        <div className="events-card-body">
          <div className="events-card-meta">
            {item.type === "event" ? `EVENT — ${item.location}` : `NEWS — BY ${item.author}`}
          </div>
          <h2 className="events-card-title">{item.title}</h2>
          <p className="events-card-excerpt">{item.excerpt}</p>
          <div className="events-card-link-action">
            <span>Read More</span>
            <ArrowRight size={16} />
          </div>
        </div>
      </article>
    </Link>
  );
}
