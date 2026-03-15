import { Outlet, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CartProvider } from "./CartContext";
import { ThemeProvider } from "./ThemeContext";
import { Toaster } from "sonner";
import { MessageCircle, ChevronUp } from "lucide-react";

// Scroll to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

// Scroll progress bar
function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (scrolled / max) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] pointer-events-none">
      <div
        className="h-full transition-[width] duration-100"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(to right, #2D6A4F, #52B788, #D4A017)",
        }}
      />
    </div>
  );
}

// Back to Top button
function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed bottom-24 right-6 z-40 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:scale-110"
      style={{
        background: "var(--wf-bg-card)",
        border: "1.5px solid var(--wf-border)",
        color: "#2D6A4F",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transform: visible ? "translateY(0) scale(1)" : "translateY(16px) scale(0.9)",
      }}
    >
      <ChevronUp size={18} />
    </button>
  );
}

export function Layout() {
  return (
    <ThemeProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Inter', sans-serif", background: "var(--wf-bg)", color: "var(--wf-text-1)" }}>
          <ScrollToTop />
          <ScrollProgress />
          <Navbar />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />

          {/* WhatsApp floating button */}
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 hover:shadow-xl"
            style={{ background: "#25D366" }}
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle size={26} color="white" />
          </a>

          <BackToTop />

          {/* Sonner toaster */}
          <Toaster
            position="bottom-left"
            toastOptions={{
              style: {
                fontFamily: "'Inter', sans-serif",
                borderRadius: "14px",
                border: "1px solid var(--wf-border)",
                background: "var(--wf-bg-card)",
                color: "var(--wf-text-1)",
              },
            }}
            richColors
          />
        </div>
      </CartProvider>
    </ThemeProvider>
  );
}
