import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function BlogCard({ article }) {
  const [hovered, setHovered] = useState(false);

  const authorSlug = article.author
    ? article.author.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
    : "editorial-team";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`flex flex-col h-full bg-[#1e2117] border transition-all duration-300 rounded overflow-hidden w-full box-border ${
        hovered ? "border-[#94da32] -translate-y-1 shadow-lg shadow-[rgba(148,218,50,0.15)]" : "border-[#434938]"
      }`}
    >
      <Link to={`/blog/${article.slug || article.id}`} className="no-underline block relative aspect-video overflow-hidden">
        <img
          src={article.img}
          alt={article.title}
          className={`w-full h-full object-cover transition-all duration-500 ${
            hovered ? "scale-105 filter-none" : "scale-100 grayscale-[40%]"
          }`}
          loading="lazy"
        />
        {article.category && (
          <span className="absolute top-3 left-3 bg-[#deffa4] text-[#233600] px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase rounded z-10 shadow-sm">
            {article.category}
          </span>
        )}
      </Link>

      <div className="p-5 sm:p-6 flex flex-col flex-grow w-full box-border">
        {article.tag && (
          <div className="mb-2">
            <span className="bg-[#282b21] text-[#c3c9b3] border border-[#434938] px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded inline-block">
              {article.tag}
            </span>
          </div>
        )}

        <div className="text-[11px] font-mono tracking-wider uppercase text-[#94da32]/90 mb-2">
          {article.date} — BY{" "}
          <Link
            to={`/author/${authorSlug}`}
            className="text-[#94da32] hover:text-[#deffa4] font-bold underline transition-colors"
          >
            {article.author}
          </Link>
        </div>

        <Link to={`/blog/${article.slug || article.id}`} className="no-underline">
          <h3
            className={`text-base sm:text-lg font-bold font-['Space_Grotesk'] leading-snug mb-3 transition-colors line-clamp-2 ${
              hovered ? "text-[#deffa4]" : "text-[#e2e4d5]"
            }`}
          >
            {article.title}
          </h3>
        </Link>

        <p className="text-xs sm:text-sm leading-relaxed text-[#c3c9b3] mb-5 line-clamp-3">
          {article.excerpt}
        </p>

        <Link
          to={`/blog/${article.slug || article.id}`}
          className="mt-auto flex items-center gap-2 text-[#94da32] font-bold text-[11px] tracking-widest uppercase no-underline hover:text-[#deffa4]"
        >
          <span>READ FULL INTEL</span>
          <ArrowRight size={14} className={`transition-transform ${hovered ? "translate-x-1" : ""}`} />
        </Link>
      </div>
    </div>
  );
}
