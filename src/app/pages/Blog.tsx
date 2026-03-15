import { useRef, useState, useEffect } from "react";
import { Search, ArrowRight, Clock, TrendingUp, BookOpen, Mail, X, Calendar } from "lucide-react";

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect(); } }, { threshold: 0.06 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms` }}>{children}</div>;
}

const categories = ["All", "Agribusiness", "Crop Science", "Ginger", "Technology", "Market Access", "Sustainability"];

const posts = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1696699639395-7db15be800fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    cat: "Agribusiness",
    title: "How to Increase Ginger Profits by 500% Through Value Addition",
    author: "Dr. Rufus Akinrinlola",
    authorImg: "https://images.unsplash.com/photo-1769071167455-e5779ecc81a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=60",
    date: "March 8, 2026",
    readTime: "8 min read",
    excerpt: "Value addition transforms raw ginger into premium products like dried flakes, powder, and essential oils — dramatically increasing farmer margins and market access to both local and international buyers.",
    featured: true,
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1768113802385-59b5bb8e8c34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500",
    cat: "Sustainability",
    title: "5 Sustainable Farming Practices Every Smallholder Should Adopt",
    author: "Samuel Ajasa",
    authorImg: "https://images.unsplash.com/photo-1703059680709-d9554370fff9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=60",
    date: "March 2, 2026",
    readTime: "5 min read",
    excerpt: "From mulching to composting, these proven practices reduce input costs while improving soil health and long-term yield stability.",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1677126577258-1a82fdf1a976?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500",
    cat: "Technology",
    title: "Drone Technology: What African Farmers Need to Know in 2026",
    author: "Dr. Rufus Akinrinlola",
    authorImg: "https://images.unsplash.com/photo-1769071167455-e5779ecc81a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=60",
    date: "Feb 24, 2026",
    readTime: "7 min read",
    excerpt: "Drone adoption is accelerating across African farms. Here's how to get started, what drones cost, and which use cases deliver the highest ROI for smallholders.",
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1641470787994-3f4dfd90d7d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500",
    cat: "Market Access",
    title: "Accessing International Buyers: A Step-by-Step Guide",
    author: "Samuel Ajasa",
    authorImg: "https://images.unsplash.com/photo-1703059680709-d9554370fff9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=60",
    date: "Feb 15, 2026",
    readTime: "10 min read",
    excerpt: "Connecting with global buyers doesn't require a large budget. Learn the platforms, certifications, and strategies that work for African smallholders.",
  },
  {
    id: 5,
    img: "https://images.unsplash.com/photo-1526930382372-67bf22c0fce2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500",
    cat: "Crop Science",
    title: "Understanding Integrated Pest Management for Tropical Crops",
    author: "Dr. Rufus Akinrinlola",
    authorImg: "https://images.unsplash.com/photo-1769071167455-e5779ecc81a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=60",
    date: "Feb 5, 2026",
    readTime: "9 min read",
    excerpt: "IPM is the gold standard for crop protection. This guide explains how to implement it on your farm without expensive consultants.",
  },
  {
    id: 6,
    img: "https://images.unsplash.com/photo-1664436938770-770d7c76d286?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500",
    cat: "Agribusiness",
    title: "How to Write a Farm Business Plan That Attracts Investors",
    author: "Dr. Rufus Akinrinlola",
    authorImg: "https://images.unsplash.com/photo-1769071167455-e5779ecc81a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=60",
    date: "Jan 28, 2026",
    readTime: "12 min read",
    excerpt: "A solid farm business plan opens doors to financing, grants, and investors. Here's exactly how to structure yours for maximum impact.",
  },
  {
    id: 7,
    img: "https://images.unsplash.com/photo-1609168172263-45c6d202007a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500",
    cat: "Ginger",
    title: "Ginger Seed Selection: The Foundation of a Profitable Harvest",
    author: "Dr. Rufus Akinrinlola",
    authorImg: "https://images.unsplash.com/photo-1769071167455-e5779ecc81a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=60",
    date: "Jan 20, 2026",
    readTime: "6 min read",
    excerpt: "Choosing the right ginger seed rhizomes is the single most impactful decision you make. This guide covers selection, storage, and pre-planting treatment.",
  },
  {
    id: 8,
    img: "https://images.unsplash.com/photo-1738598665698-7fd7af4b5e0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500",
    cat: "Technology",
    title: "Smart Irrigation Systems: A Cost-Benefit Analysis for African Farmers",
    author: "Samuel Ajasa",
    authorImg: "https://images.unsplash.com/photo-1703059680709-d9554370fff9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=60",
    date: "Jan 10, 2026",
    readTime: "8 min read",
    excerpt: "Is drip irrigation worth the investment? We break down costs, water savings, yield improvements, and ROI timelines for farms across Africa.",
  },
  {
    id: 9,
    img: "https://images.unsplash.com/photo-1605362719071-92da93e75814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500",
    cat: "Sustainability",
    title: "Regenerative Agriculture: What It Means for African Smallholders",
    author: "Dr. Rufus Akinrinlola",
    authorImg: "https://images.unsplash.com/photo-1769071167455-e5779ecc81a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=60",
    date: "Dec 30, 2025",
    readTime: "11 min read",
    excerpt: "Regenerative farming restores soil, sequesters carbon, and builds long-term resilience. Here's how to begin the transition on your farm today.",
  },
];

const popular = [
  { title: "Ginger Value Chain Mastery", views: "12.4k" },
  { title: "Top 10 Crops for Export from Nigeria", views: "9.8k" },
  { title: "How to Get Farm Loans in Africa", views: "8.2k" },
  { title: "Drone Farming: Getting Started", views: "7.1k" },
];

const catCounts = [
  { name: "Agribusiness", count: 24 },
  { name: "Crop Science", count: 18 },
  { name: "Technology", count: 15 },
  { name: "Market Access", count: 12 },
  { name: "Sustainability", count: 10 },
  { name: "Ginger", count: 8 },
];

// ── Article content ───────────────────────────────────────────────────────────
const articleContent: Record<number, string[]> = {
  1: [
    "Ginger is one of Africa's most valuable spice crops, yet most smallholder farmers sell it as a raw commodity at rock-bottom prices. The difference between a struggling ginger farmer and a thriving one often comes down to a single concept: value addition.",
    "Value addition transforms raw ginger rhizomes into higher-value products: dried ginger flakes, ginger powder, ginger essential oil, ginger candy, ginger juice, and more. Each processing step multiplies the farm-gate value exponentially.",
    "**The Numbers Don't Lie**\n\nA kilogram of fresh ginger might sell for $0.50 at a local market. Process it into dried ginger flakes and you can sell the same quantity for $3-5. Convert it into ginger powder, and the value jumps to $8-15 per kg. Ginger essential oil? Up to $40-80 per kilogram equivalent.",
    "**Getting Started with Value Addition**\n\nThe entry point for most farmers is drying. A simple solar dryer can be built for under $200 and can process 50-100kg of ginger per week. Once dried, ginger keeps for 12-24 months, giving you flexibility on when and where you sell.",
    "The next step is grinding into powder. A basic food-grade grinder costs $150-400. With proper packaging (food-grade pouches with moisture barriers), your dried ginger powder becomes an export-ready product.",
    "**Market Channels**\n\nLocal spice traders, supermarkets, and food manufacturers are your first customers. But the real profits lie in export markets. European, American, and Middle Eastern buyers pay premium prices for certified organic ginger products.",
    "Wise Farmer's Ginger Value Chain Mastery course walks you through every step — from post-harvest handling to packaging design, certification requirements, and connecting with verified international buyers.",
  ],
  2: [
    "Sustainable farming is not just about the environment — it's about the economics of long-term farming viability. Farmers who adopt sustainable practices consistently report lower input costs, improved soil health, and greater resilience to climate shocks.",
    "**1. Mulching**\n\nApplying organic mulch (dried leaves, straw, or crop residues) around plants reduces water evaporation by up to 70%, suppresses weeds, and improves soil organic matter as it breaks down. It's free, readily available, and dramatically reduces irrigation needs.",
    "**2. Composting**\n\nComposting farm waste, kitchen scraps, and livestock manure creates rich organic fertilizer at zero cost. A well-managed compost pile can replace 30-50% of chemical fertilizer requirements, saving significant money while improving soil biology.",
    "**3. Crop Rotation**\n\nRotating crops between growing seasons prevents soil nutrient depletion, breaks pest and disease cycles, and maintains soil structure. A simple rotation of nitrogen-fixing legumes with high-demand crops like maize or vegetables delivers measurable yield improvements.",
    "**4. Water Harvesting**\n\nSimple rainwater harvesting systems — from rooftop collection to small earth dams — capture rainfall during wet seasons for use during dry periods. Even a modest 5,000-liter tank can extend a growing season by weeks.",
    "**5. Integrated Pest Management**\n\nRather than defaulting to expensive chemical pesticides, IPM uses a combination of biological controls, resistant varieties, cultural practices, and targeted chemical use only when pest pressure exceeds economic thresholds. This reduces costs, protects beneficial insects, and preserves soil health.",
  ],
  3: [
    "Drones are no longer the exclusive domain of large commercial farms. In 2026, entry-level agricultural drones are available for under $800, and the ROI for African smallholders is increasingly compelling.",
    "**What Can Drones Do for Your Farm?**\n\nCrop monitoring is the primary use case. A drone survey of your farm can identify stressed plants, water-logged areas, pest infestations, and nutrient deficiencies weeks before they're visible to the naked eye — giving you time to intervene before significant yield loss occurs.",
    "Precision spraying is the next frontier. Drone sprayers apply inputs exactly where needed, reducing chemical use by 30-40% and eliminating the human exposure risk from manual spraying. For large farms (5+ hectares), the input savings alone can offset the drone's cost within one or two seasons.",
    "**Getting Started**\n\nBefore purchasing a drone, consider: What is your farm size? Farms under 2 hectares may not justify the investment. Do you have reliable charging infrastructure? Most agricultural drones require 2-4 hours of charging per flight. Can you get training and maintenance support locally?",
    "The Wise Farmer Academy offers a Drone Applications in Modern Farming course that covers everything from regulations and safe operation to practical use cases and return on investment calculations for different farm sizes and crops.",
  ],
};

type Post = typeof posts[0];

// ── Blog post modal ───────────────────────────────────────────────────────────
function PostModal({ post, onClose }: { post: Post; onClose: () => void }) {
  const content = articleContent[post.id] || [post.excerpt, "Full article content coming soon. Stay tuned for our complete knowledge hub."];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative rounded-2xl w-full max-w-[720px] my-8 overflow-hidden"
        style={{ background: "var(--wf-bg-card)", boxShadow: "0 32px 80px rgba(0,0,0,0.35)" }}
        onClick={e => e.stopPropagation()}
      >
        {/* Hero image */}
        <div className="relative h-64 overflow-hidden">
          <img src={post.img} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)" }} />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-colors"
            style={{ background: "rgba(0,0,0,0.5)", color: "white" }}
          >
            <X size={18} />
          </button>
          <div className="absolute bottom-4 left-6">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
              style={{ background: "#D4A017", color: "#1A1A1A", fontFamily: "'Space Grotesk', sans-serif" }}>
              {post.cat}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "var(--wf-text-1)" }}>
            {post.title}
          </h2>

          {/* Meta */}
          <div className="flex items-center gap-4 mb-6 pb-6" style={{ borderBottom: "1px solid var(--wf-border)" }}>
            <img src={post.authorImg} alt={post.author} className="w-10 h-10 rounded-full object-cover" />
            <div>
              <p className="text-sm font-semibold" style={{ color: "var(--wf-text-1)" }}>{post.author}</p>
              <div className="flex items-center gap-3 text-xs" style={{ color: "var(--wf-text-4)" }}>
                <span className="flex items-center gap-1"><Calendar size={11} /> {post.date}</span>
                <span className="flex items-center gap-1"><Clock size={11} /> {post.readTime}</span>
              </div>
            </div>
          </div>

          {/* Article body */}
          <div className="space-y-5">
            {content.map((para, i) => {
              if (para.startsWith("**") && para.includes("\n\n")) {
                const [heading, ...rest] = para.split("\n\n");
                return (
                  <div key={i}>
                    <h3 className="font-bold mb-2" style={{ color: "var(--wf-text-1)", fontFamily: "'Playfair Display', serif" }}>
                      {heading.replace(/\*\*/g, "")}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--wf-text-3)", lineHeight: "1.8" }}>{rest.join(" ")}</p>
                  </div>
                );
              }
              return (
                <p key={i} className="text-sm leading-relaxed" style={{ color: "var(--wf-text-3)", lineHeight: "1.8" }}>{para}</p>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-8 pt-6 border-t" style={{ borderColor: "var(--wf-border)" }}>
            <div className="rounded-xl p-5" style={{ background: "var(--wf-bg-alt)" }}>
              <p className="text-sm font-semibold mb-1" style={{ color: "#2D6A4F" }}>Want to go deeper?</p>
              <p className="text-xs mb-3" style={{ color: "var(--wf-text-3)" }}>Enroll in our related Academy course for hands-on training and certification.</p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 hover:opacity-90"
                style={{ background: "#2D6A4F", color: "white", fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Explore Academy Courses →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Blog() {
  const [activeCat, setActiveCat] = useState("All");
  const [search, setSearch] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    document.title = "Blog | Wise Farmer";
  }, []);

  const filtered = posts.slice(1).filter(p => {
    const matchCat = activeCat === "All" || p.cat === activeCat;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  // Close modal on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setSelectedPost(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* HERO */}
      <section className="py-24 px-6 lg:px-12 text-center" style={{ background: "var(--wf-bg-alt)" }}>
        <div className="max-w-[700px] mx-auto pt-14">
          <p className="text-xs font-semibold tracking-widest mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#52B788" }}>KNOWLEDGE HUB</p>
          <h1 className="font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif", color: "var(--wf-text-1)", fontSize: "clamp(2.2rem, 4vw, 3.5rem)", lineHeight: 1.15 }}>
            The Wise Farmer Knowledge Hub
          </h1>
          <p className="text-lg mb-10" style={{ color: "var(--wf-text-3)", lineHeight: "1.7" }}>
            Research-backed articles, farming tips, market insights, and agribusiness guides — updated regularly.
          </p>
          <div className="relative max-w-[480px] mx-auto">
            <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2" style={{ color: "var(--wf-text-4)" }} />
            <input type="text" placeholder="Search articles..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-5 py-4 rounded-xl border outline-none focus:shadow-md transition-shadow text-sm"
              style={{ borderColor: "var(--wf-border)", background: "var(--wf-bg-input)", color: "var(--wf-text-1)", fontFamily: "'Inter', sans-serif" }} />
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-8" style={{ background: "var(--wf-bg)" }}>
        <div className="max-w-[1440px] mx-auto">
          <div className="grid lg:grid-cols-[1fr_300px] gap-10">
            <div>
              {/* FEATURED POST */}
              <FadeIn>
                <div className="group grid sm:grid-cols-2 rounded-2xl overflow-hidden mb-10 cursor-pointer transition-all duration-300 hover:-translate-y-1"
                  style={{ boxShadow: "var(--wf-card-shadow)" }}
                  onClick={() => setSelectedPost(posts[0])}>
                  <div className="overflow-hidden h-60 sm:h-auto">
                    <img src={posts[0].img} alt={posts[0].title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  </div>
                  <div className="p-8 flex flex-col justify-center" style={{ background: "var(--wf-bg-card)" }}>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: "var(--wf-bg-alt)", color: "#2D6A4F", fontFamily: "'Space Grotesk', sans-serif" }}>
                      ⭐ {posts[0].cat}
                    </span>
                    <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "var(--wf-text-1)" }}>{posts[0].title}</h2>
                    <p className="text-sm mb-6" style={{ color: "var(--wf-text-3)", lineHeight: "1.7" }}>{posts[0].excerpt}</p>
                    <div className="flex items-center gap-3 mb-4">
                      <img src={posts[0].authorImg} alt={posts[0].author} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <p className="text-xs font-semibold" style={{ color: "var(--wf-text-1)" }}>{posts[0].author}</p>
                        <p className="text-xs" style={{ color: "var(--wf-text-4)" }}>{posts[0].date} · {posts[0].readTime}</p>
                      </div>
                    </div>
                    <button className="inline-flex items-center gap-2 text-sm font-semibold transition-all hover:gap-3"
                      style={{ color: "#2D6A4F", fontFamily: "'Space Grotesk', sans-serif" }}>
                      Read Article <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </FadeIn>

              {/* FILTER TABS */}
              <div className="flex flex-wrap gap-2 mb-8">
                {categories.map(cat => (
                  <button key={cat} onClick={() => setActiveCat(cat)}
                    className="px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      background: activeCat === cat ? "#2D6A4F" : "var(--wf-bg-alt)",
                      color: activeCat === cat ? "white" : "var(--wf-text-3)",
                    }}>
                    {cat}
                  </button>
                ))}
              </div>

              {/* ARTICLE GRID */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((post, i) => (
                  <FadeIn key={post.id} delay={i * 60}>
                    <div className="group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                      style={{ background: "var(--wf-bg-card)", boxShadow: "var(--wf-card-shadow)" }}
                      onMouseEnter={e => (e.currentTarget.style.boxShadow = "var(--wf-card-shadow-hover)")}
                      onMouseLeave={e => (e.currentTarget.style.boxShadow = "var(--wf-card-shadow)")}
                      onClick={() => setSelectedPost(post)}>
                      <div className="overflow-hidden h-44">
                        <img src={post.img} alt={post.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                      </div>
                      <div className="p-5">
                        <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold mb-3" style={{ background: "var(--wf-bg-alt)", color: "#2D6A4F", fontFamily: "'Space Grotesk', sans-serif" }}>{post.cat}</span>
                        <h3 className="font-semibold text-sm mb-3 line-clamp-2" style={{ fontFamily: "'Playfair Display', serif", color: "var(--wf-text-1)", lineHeight: "1.4" }}>{post.title}</h3>
                        <p className="text-xs mb-4 line-clamp-2" style={{ color: "var(--wf-text-3)", lineHeight: "1.6" }}>{post.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <img src={post.authorImg} alt={post.author} className="w-7 h-7 rounded-full object-cover" />
                            <div>
                              <p className="text-xs font-medium" style={{ color: "var(--wf-text-2)" }}>{post.author.split(" ")[0]}</p>
                              <p className="text-xs" style={{ color: "var(--wf-text-4)" }}>{post.readTime}</p>
                            </div>
                          </div>
                          <button className="text-xs font-semibold inline-flex items-center gap-1 transition-all hover:gap-2"
                            style={{ color: "#2D6A4F", fontFamily: "'Space Grotesk', sans-serif" }}>
                            Read <ArrowRight size={11} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>

              {/* PAGINATION */}
              <div className="text-center mt-12">
                <button className="px-8 py-4 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90"
                  style={{ background: "#2D6A4F", color: "white", fontFamily: "'Space Grotesk', sans-serif" }}>
                  Load More Articles
                </button>
              </div>
            </div>

            {/* SIDEBAR */}
            <div className="hidden lg:block space-y-6 pt-4">
              {/* Popular */}
              <div className="rounded-2xl p-6" style={{ background: "var(--wf-bg-alt)" }}>
                <h3 className="font-semibold mb-4 flex items-center gap-2" style={{ fontFamily: "'Playfair Display', serif", color: "var(--wf-text-1)" }}>
                  <TrendingUp size={16} style={{ color: "#D4A017" }} /> Most Popular
                </h3>
                <div className="space-y-3">
                  {popular.map((p, i) => (
                    <div key={p.title} className="flex items-start gap-3 cursor-pointer group">
                      <span className="text-xl font-bold leading-none mt-0.5" style={{ color: "var(--wf-border)", fontFamily: "'Playfair Display', serif" }}>{String(i + 1).padStart(2, "0")}</span>
                      <div>
                        <p className="text-sm font-medium group-hover:text-[#2D6A4F] transition-colors" style={{ color: "var(--wf-text-1)", lineHeight: "1.4" }}>{p.title}</p>
                        <p className="text-xs mt-1" style={{ color: "var(--wf-text-4)" }}>{p.views} views</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="rounded-2xl p-6" style={{ background: "var(--wf-bg-alt)" }}>
                <h3 className="font-semibold mb-4 flex items-center gap-2" style={{ fontFamily: "'Playfair Display', serif", color: "var(--wf-text-1)" }}>
                  <BookOpen size={16} style={{ color: "#D4A017" }} /> Categories
                </h3>
                <div className="space-y-2">
                  {catCounts.map(c => (
                    <div key={c.name} className="flex justify-between items-center cursor-pointer hover:text-[#2D6A4F] transition-colors group">
                      <span className="text-sm group-hover:text-[#2D6A4F] transition-colors" style={{ color: "var(--wf-text-3)" }}>{c.name}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "var(--wf-border)", color: "var(--wf-text-3)", fontFamily: "'Space Grotesk', sans-serif" }}>{c.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="rounded-2xl p-6" style={{ background: "#2D6A4F" }}>
                <h3 className="font-semibold mb-2 flex items-center gap-2" style={{ fontFamily: "'Playfair Display', serif", color: "#F4F9F4" }}>
                  <Mail size={16} style={{ color: "#D4A017" }} /> Weekly Insights
                </h3>
                <p className="text-xs mb-4" style={{ color: "#B7E4C7", lineHeight: "1.6" }}>Join 2,000+ farmers getting free expert tips every week.</p>
                {subscribed ? (
                  <p className="text-sm font-medium" style={{ color: "#52B788" }}>Subscribed ✓</p>
                ) : (
                  <form onSubmit={e => { e.preventDefault(); if (newsletterEmail) setSubscribed(true); }} className="space-y-2">
                    <input type="email" required placeholder="Your email" value={newsletterEmail} onChange={e => setNewsletterEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                      style={{ background: "rgba(255,255,255,0.1)", color: "white", border: "1px solid rgba(255,255,255,0.2)" }} />
                    <button type="submit" className="w-full py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
                      style={{ background: "#D4A017", color: "#1A1A1A", fontFamily: "'Space Grotesk', sans-serif" }}>
                      Subscribe
                    </button>
                  </form>
                )}
              </div>

              {/* Course promo */}
              <div className="rounded-2xl overflow-hidden relative h-48">
                <img src="https://images.unsplash.com/photo-1696699639395-7db15be800fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400"
                  alt="Course" className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex flex-col justify-end p-5" style={{ background: "linear-gradient(to top, rgba(45,106,79,0.95) 0%, transparent 100%)" }}>
                  <p className="text-xs mb-1" style={{ color: "#B7E4C7", fontFamily: "'Space Grotesk', sans-serif" }}>FEATURED COURSE</p>
                  <p className="text-sm font-semibold mb-3" style={{ color: "white", fontFamily: "'Playfair Display', serif" }}>Ginger Value Chain Mastery</p>
                  <button className="px-4 py-2 rounded-lg text-xs font-semibold transition-all hover:opacity-90"
                    style={{ background: "#D4A017", color: "#1A1A1A", fontFamily: "'Space Grotesk', sans-serif" }}>
                    Enroll Now →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOG POST MODAL */}
      {selectedPost && <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />}
    </div>
  );
}