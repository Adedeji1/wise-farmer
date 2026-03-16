import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X, ShoppingCart, Sun, Moon } from "lucide-react";
import logoImg from "../../assets/LogoImg.png";
import Logo from "@/../../src/assets/LogoImg.png"
import { useCart } from "./CartContext";
import { useTheme } from "./ThemeContext";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about-us" },
  { label: "Academy", href: "/academy" },
  { label: "Shop", href: "/shop" },
  { label: "Scholarships", href: "/scholarships" },
  { label: "Webinars", href: "/webinars" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { cartCount, setCartOpen } = useCart();
  const { isDark, toggleDark } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);

  // Navbar is "solid" when scrolled, mobile open, OR in dark mode
  const isSolid = scrolled || mobileOpen || isDark;

  const navBg = isSolid
    ? "var(--wf-nav-bg)"
    : "transparent";

  const navShadow = isSolid
    ? "var(--wf-nav-shadow)"
    : "none";

  const linkColor = (active: boolean) => {
    if (isSolid) {
      return active ? "#2D6A4F" : "var(--wf-text-2)";
    }
    // Transparent mode (light page hero)
    return active ? "#D4A017" : "white";
  };

  const underlineColor = isSolid ? "#2D6A4F" : "#D4A017";
  const iconColor = isSolid ? "var(--wf-text-2)" : "white";

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: navBg,
          boxShadow: navShadow,
          borderBottom: isSolid ? "1px solid var(--wf-border-2)" : "none",
        }}
      >
        <div className="max-w-[1440px] mx-auto px-4 lg:px-12">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
              <img
                src={logoImg}
                alt="Wise Farmer Logo"
                className="h-12 w-auto transition-transform duration-300 group-hover:scale-105"
                style={{
                  filter: isSolid ? (isDark ? "brightness(1.1)" : "none") : "drop-shadow(0 2px 8px rgba(0,0,0,0.3))",
                }}
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="relative px-3 py-2 text-sm font-medium transition-all duration-200 group"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    color: linkColor(isActive(link.href)),
                  }}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-3 right-3 h-0.5 rounded-full transition-all duration-200 origin-left ${
                      isActive(link.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                    style={{ background: underlineColor }}
                  />
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="hidden lg:flex items-center gap-2">
              {/* Dark mode toggle */}
              <button
                onClick={toggleDark}
                className="relative p-2 rounded-full transition-all duration-200 hover:scale-110"
                style={{
                  color: iconColor,
                  background: isSolid ? "var(--wf-border-2)" : "rgba(255,255,255,0.15)",
                }}
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {/* Cart button */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 rounded-full transition-all duration-200 hover:scale-105"
                style={{ color: iconColor }}
                aria-label="Open cart"
              >
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold"
                    style={{ background: "#D4A017", color: "#1A1A1A", fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </button>

              <Link
                to="/academy"
                className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  background: "#2D6A4F",
                  color: "white",
                }}
              >
                Join the Community
              </Link>
            </div>

            {/* Mobile right */}
            <div className="lg:hidden flex items-center gap-1">
              {/* Dark mode toggle mobile */}
              <button
                onClick={toggleDark}
                className="p-2 rounded-full transition-all duration-200"
                style={{ color: iconColor }}
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 rounded-full transition-colors"
                style={{ color: iconColor }}
                aria-label="Open cart"
              >
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-xs flex items-center justify-center font-bold"
                    style={{ background: "#D4A017", color: "#1A1A1A" }}
                  >
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-md transition-colors"
                style={{ color: isSolid ? "var(--wf-text-1)" : "white" }}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            mobileOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
          }`}
          style={{
            background: "var(--wf-nav-bg)",
            borderTop: "1px solid var(--wf-border-2)",
          }}
        >
          <div className="px-5 py-4 space-y-1">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                to={link.href}
                className="flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  animationDelay: `${i * 40}ms`,
                  background: isActive(link.href) ? (isDark ? "rgba(45,106,79,0.2)" : "#F4F9F4") : "transparent",
                  color: isActive(link.href) ? "#2D6A4F" : "var(--wf-text-1)",
                  borderLeft: isActive(link.href) ? "3px solid #2D6A4F" : "3px solid transparent",
                }}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 pb-2 border-t mt-2" style={{ borderColor: "var(--wf-border)" }}>
              <Link
                to="/academy"
                className="block w-full text-center px-5 py-3.5 rounded-full text-sm font-semibold"
                style={{
                  background: "#2D6A4F",
                  color: "white",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                Join the Community
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
