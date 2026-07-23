import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, ChevronLeft, ChevronRight, Rss, Terminal, ArrowRight } from "lucide-react";
import { getAllBlogs } from "../../../utils/cmsDb";
import { useBlogTaxonomy } from "../../../utils/blogTaxonomy";
import PageHeroBanner from "../../../components/ui/PageHeroBanner";
import BlogCard from "../../../components/blog/BlogCard";

export default function BlogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState(searchParams.get("cat") || "All");
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState(null);

  const taxonomy = useBlogTaxonomy();

  useEffect(() => {
    getAllBlogs().then((data) => {
      setArticles(data || []);
      setLoading(false);
    });
  }, []);

  const categories = ["All", ...taxonomy.categories.map((c) => c.name)];

  const filteredArticles = articles.filter((art) => {
    const matchCat = category === "All" || art.category === category;
    const matchSearch =
      !search ||
      art.title.toLowerCase().includes(search.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      (art.tag && art.tag.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  const featured = filteredArticles.find((a) => a.featured) || filteredArticles[0];
  const gridArticles = featured
    ? filteredArticles.filter((a) => a.id !== featured.id)
    : filteredArticles;

  const handleNewsletterJoin = (e) => {
    e.preventDefault();
    if (newsletterEmail && newsletterEmail.includes("@")) {
      setNewsletterStatus("success");
      setNewsletterEmail("");
      setTimeout(() => setNewsletterStatus(null), 3000);
    } else {
      setNewsletterStatus("error");
      setTimeout(() => setNewsletterStatus(null), 2000);
    }
  };

  return (
    <div className="bg-[var(--nv-bg,#11140c)] text-[var(--nv-onSurf,#e2e4d5)] min-h-screen">
      <PageHeroBanner
        title="SURVEILLANCE INTEL & BLOGS"
        subtitle="Insights, engineering breakdowns, AI surveillance trends, and security deployment guides from NightVision experts."
      />

      <main className="max-w-[1280px] mx-auto px-4 md:px-6 py-12">
        {/* FILTER & SEARCH BAR */}
        <section className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-10 pb-6 border-b border-[#434938]">
          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setCategory(cat);
                  setPage(1);
                }}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors rounded ${
                  category === cat
                    ? "bg-[#deffa4] text-[#233600]"
                    : "bg-[#1e2117] text-[#c3c9b3] hover:bg-[#282b21] border border-[#434938]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[260px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8d937f]" size={18} />
            <input
              type="text"
              placeholder="Search intel & articles..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 bg-[#1e2117] border border-[#434938] text-sm text-[#e2e4d5] placeholder-[#8d937f] focus:outline-none focus:border-[#deffa4] rounded"
            />
          </div>
        </section>

        {loading ? (
          <div className="text-center py-20 text-[#94da32] font-mono">LOADING ARTICLES...</div>
        ) : (
          <>
            {/* FEATURED ARTICLE */}
            {featured && (
              <section className="mb-12">
                <Link to={`/blog/${featured.slug || featured.id}`} className="no-underline group">
                  <div className="grid grid-cols-1 lg:grid-cols-12 bg-[#1e2117] border border-[#434938] group-hover:border-[#deffa4] transition-all rounded overflow-hidden">
                    <div className="lg:col-span-7 relative aspect-video lg:aspect-auto">
                      <img
                        src={featured.img}
                        alt={featured.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-4 left-4 bg-[#deffa4] text-[#233600] px-3 py-1 text-xs font-bold uppercase tracking-widest rounded">
                        FEATURED INTEL
                      </span>
                    </div>

                    <div className="lg:col-span-5 p-8 flex flex-col justify-center">
                      <div className="text-xs text-[#94da32] font-mono mb-2 uppercase tracking-wider">
                        {featured.date} — BY {featured.author}
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold font-['Space_Grotesk'] text-white group-hover:text-[#deffa4] mb-4 transition-colors">
                        {featured.title}
                      </h2>
                      <p className="text-[#c3c9b3] text-sm leading-relaxed mb-6">
                        {featured.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-[#94da32] font-bold text-xs uppercase tracking-widest">
                        <span>Read Full Intel</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </section>
            )}

            {/* ARTICLES GRID */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {gridArticles.map((art) => (
                <Link key={art.id} to={`/blog/${art.slug || art.id}`} className="no-underline">
                  <BlogCard article={art} />
                </Link>
              ))}
            </section>

            {/* NEWSLETTER */}
            <section className="bg-[#deffa4] text-[#233600] p-8 md:p-12 rounded flex flex-col md:flex-row justify-between items-center gap-8 my-12">
              <div className="max-w-xl">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#233600]/80 mb-2">
                  <Rss size={16} /> SURVEILLANCE BRIEFINGS
                </div>
                <h3 className="text-2xl md:text-3xl font-bold font-['Space_Grotesk']">
                  Subscribe to Security Intelligence
                </h3>
                <p className="text-sm mt-2 text-[#233600]/90 leading-relaxed">
                  Get monthly engineering breakdowns, firmware updates, and CCTV installation blueprints delivered to your inbox.
                </p>
              </div>

              <form onSubmit={handleNewsletterJoin} className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter email address..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="px-4 py-3 bg-[#11140c] text-white border border-[#233600] placeholder-gray-400 text-sm focus:outline-none rounded"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#233600] text-[#deffa4] font-bold text-xs uppercase tracking-wider hover:bg-black transition-colors rounded"
                >
                  {newsletterStatus === "success" ? "SUBSCRIBED!" : "JOIN BRIEFING"}
                </button>
              </form>
            </section>
          </>
        )}
      </main>
    </div>
  );
}