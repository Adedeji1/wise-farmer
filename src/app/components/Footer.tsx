import { Link } from "react-router";
import { Instagram, Youtube, Twitter, Facebook, MessageCircle, Mail, Phone, ChevronUp } from "lucide-react";
import { useState } from "react";
import logoImg from "../../assets/LogoImg.png";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer style={{ background: "#111" }}>
      {/* Gold top border */}
      <div className="h-1 w-full" style={{ background: "#D4A017" }} />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logoImg} alt="Wise Farmer" className="h-14 w-auto" />
            </div>
            <p className="text-sm mb-6" style={{ fontFamily: "'Inter', sans-serif", color: "#9CA3AF", lineHeight: "1.7" }}>
              Learn. Grow. Connect.
              <br />
              Empowering farmers across Africa and beyond with knowledge, technology, and market access.
            </p>
            <div className="flex items-center gap-3">
              {[
                { Icon: Instagram, label: "Instagram" },
                { Icon: Youtube, label: "YouTube" },
                { Icon: Twitter, label: "Twitter" },
                { Icon: Facebook, label: "Facebook" },
                { Icon: MessageCircle, label: "WhatsApp" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{ background: "#1F1F1F", color: "#9CA3AF" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "#2D6A4F";
                    (e.currentTarget as HTMLElement).style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "#1F1F1F";
                    (e.currentTarget as HTMLElement).style.color = "#9CA3AF";
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-semibold mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#D4A017", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about-us" },
                { label: "Academy", href: "/academy" },
                { label: "Shop", href: "/shop" },
                { label: "Blog", href: "/blog" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm transition-colors duration-200 hover:text-white"
                    style={{ fontFamily: "'Inter', sans-serif", color: "#9CA3AF" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Resources */}
          <div>
            <h4 className="text-sm font-semibold mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#D4A017", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Resources
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Scholarships", href: "/scholarships" },
                { label: "Webinars", href: "/webinars" },
                { label: "Farmers Market", href: "/shop" },
                { label: "Consulting", href: "/contact" },
                { label: "FAQs", href: "/#faq" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm transition-colors duration-200 hover:text-white"
                    style={{ fontFamily: "'Inter', sans-serif", color: "#9CA3AF" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Newsletter */}
          <div>
            <h4 className="text-sm font-semibold mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#D4A017", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Get In Touch
            </h4>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2 text-sm" style={{ color: "#9CA3AF", fontFamily: "'Inter', sans-serif" }}>
                <Mail size={14} style={{ color: "#52B788" }} />
                <a href="mailto:info@wise-farmer.com" className="hover:text-white transition-colors">info@wise-farmer.com</a>
              </li>
              <li className="flex items-center gap-2 text-sm" style={{ color: "#9CA3AF", fontFamily: "'Inter', sans-serif" }}>
                <Phone size={14} style={{ color: "#52B788" }} />
                <a href="https://wa.me/1234567890" className="hover:text-white transition-colors">+234 800 000 0000</a>
              </li>
            </ul>
            <p className="text-xs mb-3" style={{ color: "#6B7280", fontFamily: "'Inter', sans-serif" }}>Subscribe for weekly farming insights</p>
            {subscribed ? (
              <p className="text-sm font-medium" style={{ color: "#52B788", fontFamily: "'Inter', sans-serif" }}>Thanks for subscribing! ✓</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg text-sm outline-none border border-gray-700 focus:border-[#52B788] transition-colors"
                  style={{ background: "#1F1F1F", color: "white", fontFamily: "'Inter', sans-serif" }}
                />
                <button
                  type="submit"
                  className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:opacity-90"
                  style={{ background: "#2D6A4F", color: "white" }}
                >
                  Go
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t" style={{ borderColor: "#1F1F1F" }}>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: "#6B7280", fontFamily: "'Inter', sans-serif" }}>
            © 2026 Wise-Farmer.com. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs transition-colors hover:text-white" style={{ color: "#6B7280", fontFamily: "'Inter', sans-serif" }}>Privacy Policy</a>
            <span style={{ color: "#374151" }}>|</span>
            <a href="#" className="text-xs transition-colors hover:text-white" style={{ color: "#6B7280", fontFamily: "'Inter', sans-serif" }}>Terms of Service</a>
            <span style={{ color: "#374151" }}>|</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-xs transition-colors hover:text-white flex items-center gap-1"
              style={{ color: "#6B7280", fontFamily: "'Inter', sans-serif" }}
            >
              <ChevronUp size={13} /> Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}