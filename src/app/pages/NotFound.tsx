import { Link } from "react-router";
import { Home, ArrowLeft, Search } from "lucide-react";

export function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: "#F4F9F4", fontFamily: "'Inter', sans-serif" }}
    >
      <div className="max-w-[560px] w-full text-center">
        {/* 404 number */}
        <div
          className="text-[9rem] font-bold leading-none mb-2 select-none"
          style={{
            fontFamily: "'Playfair Display', serif",
            background: "linear-gradient(135deg, #2D6A4F, #52B788)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          404
        </div>

        {/* Icon */}
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: "white", boxShadow: "0 8px 32px rgba(0,0,0,0.10)" }}
        >
          <Search size={32} style={{ color: "#2D6A4F" }} />
        </div>

        <h1
          className="text-3xl font-bold mb-4"
          style={{ fontFamily: "'Playfair Display', serif", color: "#1A1A1A" }}
        >
          Page Not Found
        </h1>
        <p className="text-base mb-8" style={{ color: "#6B7280", lineHeight: "1.7" }}>
          Sorry, we couldn't find the page you're looking for. It may have been moved or doesn't
          exist.
        </p>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-3 mb-8 max-w-[380px] mx-auto">
          {[
            { label: "Academy", href: "/academy" },
            { label: "Shop", href: "/shop" },
            { label: "Blog", href: "/blog" },
            { label: "Contact", href: "/contact" },
          ].map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: "white",
                color: "#1A1A1A",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                fontFamily: "'Space Grotesk', sans-serif",
                border: "1.5px solid #E5E7EB",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
            style={{
              background: "#2D6A4F",
              color: "white",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            <Home size={15} /> Go to Homepage
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm transition-all duration-200 hover:bg-white border"
            style={{
              borderColor: "#E5E7EB",
              color: "#6B7280",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            <ArrowLeft size={15} /> Go Back
          </button>
        </div>

        {/* Decorative leaf */}
        <div className="mt-16 opacity-20 text-6xl select-none">🌿</div>
      </div>
    </div>
  );
}
