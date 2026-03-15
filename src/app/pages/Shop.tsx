import { useRef, useState, useEffect } from "react";
import { Heart, Star, X, Truck, Shield, Award, RotateCcw, ArrowRight, Eye, Check, ShoppingBag } from "lucide-react";
import { useCart } from "../components/CartContext";

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.06 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const categories = ["All", "Seeds & Inputs", "Tools & Equipment", "Books & Guides", "Agri-Tech Devices", "Organic Products"];

const products = [
  { id: 1, name: "Premium Ginger Seed Sets", category: "Seeds & Inputs", img: "https://images.unsplash.com/photo-1696699639395-7db15be800fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", price: 24.99, originalPrice: null as number | null, rating: 4.8, reviews: 64 },
  { id: 2, name: "Smart Soil Testing Kit", category: "Agri-Tech Devices", img: "https://images.unsplash.com/photo-1526930382372-67bf22c0fce2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", price: 89.0, originalPrice: 120.0, rating: 4.9, reviews: 38 },
  { id: 3, name: "Hand Pruning Shears Set", category: "Tools & Equipment", img: "https://images.unsplash.com/photo-1727036195413-073768b3c147?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", price: 35.0, originalPrice: null as number | null, rating: 4.6, reviews: 92 },
  { id: 4, name: "The Complete Agripreneur Guide", category: "Books & Guides", img: "https://images.unsplash.com/photo-1656250444213-6baf45417252?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", price: 15.0, originalPrice: null as number | null, rating: 4.9, reviews: 127 },
  { id: 5, name: "Organic Neem Pesticide (5L)", category: "Organic Products", img: "https://images.unsplash.com/photo-1768113802385-59b5bb8e8c34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", price: 18.5, originalPrice: 25.0, rating: 4.7, reviews: 41 },
  { id: 6, name: "Drip Irrigation Starter Kit", category: "Agri-Tech Devices", img: "https://images.unsplash.com/photo-1738598665698-7fd7af4b5e0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", price: 145.0, originalPrice: 180.0, rating: 4.8, reviews: 29 },
  { id: 7, name: "Heirloom Vegetable Seed Bundle", category: "Seeds & Inputs", img: "https://images.unsplash.com/photo-1609168172263-45c6d202007a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", price: 32.0, originalPrice: null as number | null, rating: 4.5, reviews: 56 },
  { id: 8, name: "Farm Management Drone (Basic)", category: "Agri-Tech Devices", img: "https://images.unsplash.com/photo-1677126577258-1a82fdf1a976?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", price: 599.0, originalPrice: 750.0, rating: 4.9, reviews: 15 },
  { id: 9, name: "Organic Compost Booster (10kg)", category: "Organic Products", img: "https://images.unsplash.com/photo-1664436938770-770d7c76d286?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", price: 22.0, originalPrice: null as number | null, rating: 4.6, reviews: 78 },
  { id: 10, name: "Market Export Ready Handbook", category: "Books & Guides", img: "https://images.unsplash.com/photo-1641470787994-3f4dfd90d7d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", price: 12.0, originalPrice: null as number | null, rating: 4.8, reviews: 93 },
  { id: 11, name: "Garden Multi-Tool Kit (8-piece)", category: "Tools & Equipment", img: "https://images.unsplash.com/photo-1585643099545-cd6cad20b7b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", price: 55.0, originalPrice: 70.0, rating: 4.7, reviews: 44 },
  { id: 12, name: "Foliar Spray Organic Blend (2L)", category: "Organic Products", img: "https://images.unsplash.com/photo-1605362719071-92da93e75814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", price: 16.0, originalPrice: null as number | null, rating: 4.5, reviews: 33 },
];

const bundles = [
  { name: "Starter Farm Kit", desc: "Seeds, soil test kit, basic tools, and beginner's guide. Perfect for new farmers.", price: 89, originalPrice: 130, savings: 41, tag: "Most Popular", img: "https://images.unsplash.com/photo-1609168172263-45c6d202007a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", color: "#2D6A4F" },
  { name: "Advanced Agripreneur Pack", desc: "Drip kit, soil analytics, export guide, and online course access bundled together.", price: 199, originalPrice: 290, savings: 91, tag: "Best Value", img: "https://images.unsplash.com/photo-1738598665698-7fd7af4b5e0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", color: "#D4A017" },
  { name: "Organic Farming Bundle", desc: "Complete organic inputs kit — neem pesticide, compost booster, foliar spray, and organic guide.", price: 65, originalPrice: 95, savings: 30, tag: "Eco-Choice", img: "https://images.unsplash.com/photo-1768113802385-59b5bb8e8c34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", color: "#52B788" },
];

type Product = (typeof products)[0];

export function Shop() {
  useEffect(() => {
    document.title = "Shop | Wise Farmer";
  }, []);

  const [activeCategory, setActiveCategory] = useState("All");
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [addedId, setAddedId] = useState<number | null>(null);

  const { addToCart, wishlist, toggleWishlist, cartCount, setCartOpen } = useCart();

  const filtered = products.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );

  const handleAddToCart = (product: Product) => {
    addToCart({ id: product.id, name: product.name, price: product.price, img: product.img, category: product.category });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  // Close quick view on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setQuickView(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* HERO */}
      <section
        className="py-24 px-6 lg:px-12 text-center relative overflow-hidden"
        style={{ background: "var(--wf-bg-alt)" }}
      >
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' /%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative max-w-[700px] mx-auto pt-14">
          <p
            className="text-xs font-semibold tracking-widest mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#52B788" }}
          >
            THE WISE FARMER SHOP
          </p>
          <h1
            className="font-bold mb-6"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "var(--wf-text-1)",
              fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
              lineHeight: 1.15,
            }}
          >
            The Wise Farmer Shop
          </h1>
          <p
            className="text-lg mb-10"
            style={{ color: "var(--wf-text-3)", lineHeight: "1.7" }}
          >
            Quality agri-inputs, books, tools, and technology — curated for the modern farmer.
          </p>
          {/* Cart open button */}
          <button
            onClick={() => setCartOpen(true)}
            className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
            style={{
              background: "#2D6A4F",
              color: "white",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            <ShoppingBag size={18} />
            View My Cart
            {cartCount > 0 && (
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: "#D4A017", color: "#1A1A1A" }}
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </section>

      {/* FEATURED BANNER */}
      <section className="px-6 lg:px-12 -mt-4">
        <div className="max-w-[1440px] mx-auto">
          <FadeIn>
            <div
              className="rounded-2xl overflow-hidden relative h-52 lg:h-64"
              style={{ background: "linear-gradient(135deg, #2D6A4F 0%, #1A5035 100%)" }}
            >
              <img
                src="https://images.unsplash.com/photo-1677126577258-1a82fdf1a976?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800"
                alt="Featured product"
                className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-35"
              />
              <div className="absolute inset-0 flex flex-col justify-center px-10">
                <span
                  className="text-xs font-semibold tracking-widest mb-2"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#52B788" }}
                >
                  NEW ARRIVAL
                </span>
                <h2
                  className="text-2xl lg:text-3xl font-bold mb-2"
                  style={{ fontFamily: "'Playfair Display', serif", color: "white" }}
                >
                  Farm Management Drone
                </h2>
                <p className="text-sm mb-5" style={{ color: "#B7E4C7", maxWidth: "380px" }}>
                  Monitor, spray, and analyze your farm from above. Save time, reduce inputs, grow more.
                </p>
                <div className="flex items-center gap-4 flex-wrap">
                  <div>
                    <span
                      className="text-2xl font-bold"
                      style={{ color: "#D4A017", fontFamily: "'Playfair Display', serif" }}
                    >
                      $599
                    </span>
                    <span className="text-sm ml-2 line-through" style={{ color: "rgba(255,255,255,0.4)" }}>
                      $750
                    </span>
                  </div>
                  <button
                    onClick={() => handleAddToCart(products[7])}
                    className="px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90"
                    style={{
                      background: "#D4A017",
                      color: "#1A1A1A",
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => setQuickView(products[7])}
                    className="px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:bg-white/20"
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      color: "white",
                      fontFamily: "'Space Grotesk', sans-serif",
                      border: "1px solid rgba(255,255,255,0.3)",
                    }}
                  >
                    Quick View
                  </button>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* TRUST SIGNALS */}
      <section className="py-8 px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Truck, label: "Free Delivery", sub: "On orders over $50" },
              { icon: Shield, label: "Secure Checkout", sub: "256-bit SSL encryption" },
              { icon: Award, label: "100% Authentic", sub: "Quality guaranteed" },
              { icon: RotateCcw, label: "7-Day Returns", sub: "Hassle-free policy" },
            ].map(({ icon: Icon, label, sub }) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-xl p-4 transition-all duration-200 hover:shadow-md"
                style={{ background: "var(--wf-bg-card)", border: "1.5px solid var(--wf-border)" }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "var(--wf-bg-alt)" }}
                >
                  <Icon size={18} style={{ color: "#2D6A4F" }} />
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--wf-text-1)" }}>
                    {label}
                  </p>
                  <p className="text-xs" style={{ color: "var(--wf-text-4)" }}>
                    {sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORY TABS + PRODUCT GRID */}
      <section className="px-6 lg:px-12 pb-16">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  background: activeCategory === cat ? "#2D6A4F" : "var(--wf-bg-alt)",
                  color: activeCategory === cat ? "white" : "var(--wf-text-3)",
                  border: `1.5px solid ${activeCategory === cat ? "#2D6A4F" : "var(--wf-border)"}`,
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <p className="text-sm mb-6" style={{ color: "var(--wf-text-4)" }}>
            Showing{" "}
            <span style={{ color: "#2D6A4F", fontWeight: 600 }}>{filtered.length}</span>{" "}
            products
            {activeCategory !== "All" ? ` in ${activeCategory}` : ""}
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((product, i) => (
              <FadeIn key={product.id} delay={i * 60}>
                <div
                  className="group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                  style={{ boxShadow: "var(--wf-card-shadow)", background: "var(--wf-bg-card)", border: "1px solid var(--wf-border-2)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.boxShadow = "var(--wf-card-shadow-hover)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.boxShadow = "var(--wf-card-shadow)")
                  }
                >
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {product.originalPrice && (
                      <div
                        className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold"
                        style={{
                          background: "#D4A017",
                          color: "#1A1A1A",
                          fontFamily: "'Space Grotesk', sans-serif",
                        }}
                      >
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </div>
                    )}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center bg-white shadow transition-all duration-200 hover:scale-110"
                    >
                      <Heart
                        size={14}
                        fill={wishlist.includes(product.id) ? "#ef4444" : "none"}
                        style={{ color: wishlist.includes(product.id) ? "#ef4444" : "#9CA3AF" }}
                      />
                    </button>
                    {/* Quick view overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                      <button
                        onClick={() => setQuickView(product)}
                        className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 hover:scale-105"
                        style={{ background: "white", color: "#1A1A1A" }}
                      >
                        <Eye size={13} /> Quick View
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <p
                      className="text-xs mb-1"
                      style={{ color: "var(--wf-text-4)", fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {product.category}
                    </p>
                    <h3
                      className="font-semibold mb-2 line-clamp-2"
                      style={{ color: "var(--wf-text-1)", fontSize: "0.9rem", lineHeight: "1.4" }}
                    >
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1.5 mb-3">
                      <div className="flex">
                        {[...Array(5)].map((_, si) => (
                          <Star
                            key={si}
                            size={11}
                            fill={si < Math.floor(product.rating) ? "#D4A017" : "none"}
                            style={{ color: "#D4A017" }}
                          />
                        ))}
                      </div>
                      <span className="text-xs" style={{ color: "var(--wf-text-4)" }}>
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span
                          className="font-bold"
                          style={{ color: "#2D6A4F", fontFamily: "'Playfair Display', serif" }}
                        >
                          ${product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs line-through" style={{ color: "#9CA3AF" }}>
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2"
                      style={{
                        background: addedId === product.id ? "#52B788" : "#2D6A4F",
                        color: "white",
                        fontFamily: "'Space Grotesk', sans-serif",
                      }}
                    >
                      {addedId === product.id ? (
                        <>
                          <Check size={14} /> Added!
                        </>
                      ) : (
                        "Add to Cart"
                      )}
                    </button>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* BUNDLES */}
      <section className="py-16 px-6 lg:px-12" style={{ background: "var(--wf-bg-alt)" }}>
        <div className="max-w-[1440px] mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <p
                className="text-xs font-semibold tracking-widest mb-3"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#52B788" }}
              >
                BUNDLE DEALS
              </p>
              <h2
                className="text-3xl font-bold"
                style={{ fontFamily: "'Playfair Display', serif", color: "var(--wf-text-1)" }}
              >
                Save More with Curated Bundles
              </h2>
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {bundles.map((bundle, i) => (
              <FadeIn key={bundle.name} delay={i * 100}>
                <div
                  className="rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                  style={{ boxShadow: "var(--wf-card-shadow)", background: "var(--wf-bg-card)" }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={bundle.img}
                      alt={bundle.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                    <div
                      className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold"
                      style={{
                        background: bundle.color,
                        color: bundle.color === "#D4A017" ? "#1A1A1A" : "white",
                        fontFamily: "'Space Grotesk', sans-serif",
                      }}
                    >
                      {bundle.tag}
                    </div>
                    <div
                      className="absolute bottom-3 right-3 px-3 py-1 rounded-full text-xs font-bold"
                      style={{ background: "rgba(0,0,0,0.6)", color: "white" }}
                    >
                      Save ${bundle.savings}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3
                      className="text-lg font-bold mb-2"
                      style={{ fontFamily: "'Playfair Display', serif", color: "var(--wf-text-1)" }}
                    >
                      {bundle.name}
                    </h3>
                    <p className="text-sm mb-4" style={{ color: "var(--wf-text-3)", lineHeight: "1.6" }}>
                      {bundle.desc}
                    </p>
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className="text-2xl font-bold"
                        style={{ color: "#2D6A4F", fontFamily: "'Playfair Display', serif" }}
                      >
                        ${bundle.price}
                      </span>
                      <span className="text-sm line-through" style={{ color: "var(--wf-text-4)" }}>
                        ${bundle.originalPrice}
                      </span>
                    </div>
                    <button
                      className="w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90"
                      style={{
                        background: "#2D6A4F",
                        color: "white",
                        fontFamily: "'Space Grotesk', sans-serif",
                      }}
                    >
                      Get This Bundle →
                    </button>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* SHOP CTA */}
      <section
        className="py-16 px-6 lg:px-12"
        style={{ background: "linear-gradient(135deg, #1A1A1A 0%, #2D6A4F 100%)" }}
      >
        <FadeIn>
          <div className="max-w-[700px] mx-auto text-center">
            <p
              className="text-xs font-semibold tracking-widest mb-4"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#52B788" }}
            >
              NEED HELP CHOOSING?
            </p>
            <h2
              className="text-3xl font-bold mb-4"
              style={{ fontFamily: "'Playfair Display', serif", color: "#F4F9F4" }}
            >
              Not Sure What to Buy?
            </h2>
            <p className="mb-8" style={{ color: "#B7E4C7", lineHeight: "1.7" }}>
              Our expert team can recommend the right tools and products for your farm's specific
              needs and budget.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-[1.02]"
                style={{
                  background: "#D4A017",
                  color: "#1A1A1A",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                Get Expert Advice <ArrowRight size={14} />
              </a>
              <a
                href="/academy"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm border transition-all duration-200 hover:bg-white/10"
                style={{
                  borderColor: "rgba(255,255,255,0.4)",
                  color: "white",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                Browse Courses
              </a>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* QUICK VIEW MODAL */}
      {quickView && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setQuickView(null)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="relative bg-white rounded-2xl overflow-hidden max-w-[820px] w-full max-h-[90vh] overflow-y-auto"
            style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.25)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setQuickView(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100"
              style={{ background: "white" }}
            >
              <X size={18} />
            </button>
            <div className="grid md:grid-cols-2">
              <div className="h-72 md:h-auto overflow-hidden">
                <img
                  src={quickView.img}
                  alt={quickView.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 flex flex-col justify-between">
                <div>
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
                    style={{
                      background: "#F4F9F4",
                      color: "#2D6A4F",
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}
                  >
                    {quickView.category}
                  </span>
                  <h2
                    className="text-2xl font-bold mb-3"
                    style={{ fontFamily: "'Playfair Display', serif", color: "#1A1A1A" }}
                  >
                    {quickView.name}
                  </h2>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, si) => (
                        <Star
                          key={si}
                          size={14}
                          fill={si < Math.floor(quickView.rating) ? "#D4A017" : "none"}
                          style={{ color: "#D4A017" }}
                        />
                      ))}
                    </div>
                    <span className="text-sm" style={{ color: "#9CA3AF" }}>
                      {quickView.rating} · {quickView.reviews} reviews
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mb-6">
                    <span
                      className="text-3xl font-bold"
                      style={{ color: "#2D6A4F", fontFamily: "'Playfair Display', serif" }}
                    >
                      ${quickView.price.toFixed(2)}
                    </span>
                    {quickView.originalPrice && (
                      <>
                        <span className="text-lg line-through" style={{ color: "#9CA3AF" }}>
                          ${quickView.originalPrice.toFixed(2)}
                        </span>
                        <span
                          className="px-2.5 py-1 rounded-full text-xs font-bold"
                          style={{ background: "#FEF9E7", color: "#D4A017" }}
                        >
                          Save ${(quickView.originalPrice - quickView.price).toFixed(2)}
                        </span>
                      </>
                    )}
                  </div>
                  <div className="space-y-2 mb-6">
                    {[
                      "Curated for African farming conditions",
                      "Includes setup guide & expert support",
                      "Quality-tested by our agronomists",
                      "7-day hassle-free returns",
                    ].map((feat) => (
                      <div key={feat} className="flex items-center gap-2 text-sm" style={{ color: "#6B7280" }}>
                        <Check size={14} style={{ color: "#52B788", flexShrink: 0 }} />
                        {feat}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      handleAddToCart(quickView);
                      setQuickView(null);
                    }}
                    className="w-full py-3.5 rounded-xl font-semibold transition-all duration-200 hover:opacity-90"
                    style={{
                      background: "#2D6A4F",
                      color: "white",
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}
                  >
                    Add to Cart — ${quickView.price.toFixed(2)}
                  </button>
                  <button
                    onClick={() => toggleWishlist(quickView.id)}
                    className="w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200"
                    style={{
                      background: wishlist.includes(quickView.id) ? "#FEF2F2" : "#F9FAFB",
                      color: wishlist.includes(quickView.id) ? "#ef4444" : "#6B7280",
                      border: `1.5px solid ${wishlist.includes(quickView.id) ? "#ef4444" : "#E5E7EB"}`,
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}
                  >
                    {wishlist.includes(quickView.id) ? "❤️ Saved to Wishlist" : "♡ Save to Wishlist"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
