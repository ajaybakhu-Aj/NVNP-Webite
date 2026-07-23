import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function BlogCard({ article }) {
  const [hovered, setHovered] = useState(false);

  const authorSlug = article.author
    ? article.author.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
    : "editorial-team";

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`flex flex-col bg-[var(--nv-surfCont,#1e2117)] border transition-all duration-300 relative cursor-pointer ${
        hovered ? "border-[#deffa4] -translate-y-1" : "border-transparent"
      }`}
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={article.img}
          alt={article.title}
          className={`w-full h-full object-cover transition-all duration-500 ${
            hovered ? "scale-105 grayscale-0" : "scale-100 grayscale"
          }`}
          loading="lazy"
        />
      </div>

      <div className="p-6 md:p-7 flex flex-col flex-grow">
        <div className="mb-3 flex gap-2 flex-wrap">
          <span className="bg-[#deffa4] text-[#233600] px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase rounded">
            {article.category || "Thermal Tech"}
          </span>
          {article.tag && (
            <span className="bg-[#282b21] text-[#c3c9b3] border border-[#434938] px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded">
              {article.tag}
            </span>
          )}
        </div>

        <div className="text-[11px] font-semibold tracking-wider uppercase text-[#c3c9b3]/70 mb-3">
          {article.date} — By{" "}
          <Link
            to={`/author/${authorSlug}`}
            onClick={(e) => e.stopPropagation()}
            className="text-[#94da32] hover:text-[#deffa4] font-bold no-underline transition-colors"
          >
            {article.author}
          </Link>
        </div>

        <h3
          className={`text-base md:text-lg font-semibold leading-snug mb-3 transition-colors ${
            hovered ? "text-[#deffa4]" : "text-[var(--nv-onSurf,#e2e4d5)]"
          }`}
        >
          {article.title}
        </h3>

        <p className="text-sm leading-relaxed text-[#c3c9b3] mb-6 line-clamp-3">
          {article.excerpt}
        </p>

        <div className="mt-auto flex items-center gap-2 text-[#94da32] font-semibold text-[11px] tracking-widest uppercase">
          <span>Read Full Article</span>
          <ArrowRight size={14} className={`transition-transform ${hovered ? "translate-x-1" : ""}`} />
        </div>
      </div>
    </article>
  );
}
