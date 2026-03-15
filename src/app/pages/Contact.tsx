import { useRef, useState, useEffect } from "react";
import { Mail, MessageCircle, Phone, CheckCircle2, Instagram, Youtube, Twitter, Facebook, Calendar } from "lucide-react";

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect(); } }, { threshold: 0.08 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms` }}>{children}</div>;
}

const subjects = [
  "General Inquiry",
  "Course Help",
  "Consulting",
  "Partnership",
  "Technical Support",
];

function ContactForm() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  if (submitted) return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ background: "var(--wf-bg-alt)" }}>
        <CheckCircle2 size={40} style={{ color: "#2D6A4F" }} />
      </div>
      <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif", color: "var(--wf-text-1)" }}>Message Sent! 🎉</h3>
      <p style={{ color: "var(--wf-text-3)" }}>Thanks! We'll respond within 24 hours.</p>
    </div>
  );

  const inputStyle: React.CSSProperties = {
    border: "1.5px solid var(--wf-border)",
    borderRadius: "12px",
    padding: "14px 16px",
    fontFamily: "'Inter', sans-serif",
    outline: "none",
    width: "100%",
    fontSize: "15px",
    background: "var(--wf-bg-input)",
    color: "var(--wf-text-1)",
    transition: "border-color 0.2s",
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: "var(--wf-text-2)" }}>First Name *</label>
          <input required placeholder="First name" value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })}
            style={inputStyle} onFocus={e => (e.target.style.borderColor = "#52B788")} onBlur={e => (e.target.style.borderColor = "var(--wf-border)")} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: "var(--wf-text-2)" }}>Last Name *</label>
          <input required placeholder="Last name" value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })}
            style={inputStyle} onFocus={e => (e.target.style.borderColor = "#52B788")} onBlur={e => (e.target.style.borderColor = "var(--wf-border)")} />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: "var(--wf-text-2)" }}>Email *</label>
          <input type="email" required placeholder="your@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
            style={inputStyle} onFocus={e => (e.target.style.borderColor = "#52B788")} onBlur={e => (e.target.style.borderColor = "var(--wf-border)")} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: "var(--wf-text-2)" }}>Phone</label>
          <input type="tel" placeholder="+234 800 000 0000" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
            style={inputStyle} onFocus={e => (e.target.style.borderColor = "#52B788")} onBlur={e => (e.target.style.borderColor = "var(--wf-border)")} />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: "var(--wf-text-2)" }}>Subject *</label>
        <select required value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}
          style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
          onFocus={e => (e.target.style.borderColor = "#52B788")} onBlur={e => (e.target.style.borderColor = "var(--wf-border)")}>
          <option value="">Select a subject</option>
          {subjects.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: "var(--wf-text-2)" }}>Message *</label>
        <textarea required rows={6} placeholder="Tell us how we can help..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
          style={{ ...inputStyle, resize: "vertical" }}
          onFocus={e => (e.target.style.borderColor = "#52B788")} onBlur={e => (e.target.style.borderColor = "var(--wf-border)")} />
      </div>
      <button type="submit" disabled={loading}
        className="w-full py-4 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90 hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed"
        style={{ background: "#2D6A4F", color: "white", fontFamily: "'Space Grotesk', sans-serif" }}>
        {loading ? "Sending..." : "Send Message →"}
      </button>
    </form>
  );
}

const contactOptions = [
  {
    icon: Mail,
    title: "Email Us",
    desc: "We reply within 24 hours on business days.",
    action: "info@wise-farmer.com",
    href: "mailto:info@wise-farmer.com",
    color: "#2D6A4F",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    desc: "Chat directly with our team for quick support.",
    action: "Start WhatsApp Chat",
    href: "https://wa.me/1234567890",
    color: "#25D366",
  },
  {
    icon: Calendar,
    title: "Book a Call",
    desc: "Schedule a consulting session with Dr. Akinrinlola.",
    action: "Schedule Now",
    href: "#",
    color: "#D4A017",
  },
];

const social = [
  { icon: Instagram, label: "Instagram", handle: "@wisefarmer", color: "#E1306C" },
  { icon: Youtube, label: "YouTube", handle: "Wise Farmer TV", color: "#FF0000" },
  { icon: Twitter, label: "Twitter/X", handle: "@wisefarmer_ng", color: "#1DA1F2" },
  { icon: Facebook, label: "Facebook", handle: "Wise Farmer", color: "#1877F2" },
  { icon: MessageCircle, label: "WhatsApp", handle: "+234 800 000 0000", color: "#25D366" },
];

export function Contact() {
  useEffect(() => {
    document.title = "Contact | Wise Farmer";
  }, []);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* HERO */}
      <section className="relative py-28 px-6 lg:px-12 text-center overflow-hidden" style={{ background: "#2D6A4F" }}>
        <img src="https://images.unsplash.com/photo-1589292144899-2f43a71a1b2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400"
          alt="Contact" className="absolute inset-0 w-full h-full object-cover opacity-15" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' /%3E%3C/svg%3E")` }} />
        <div className="relative max-w-[600px] mx-auto pt-12">
          <p className="text-xs font-semibold tracking-widest mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#52B788" }}>GET IN TOUCH</p>
          <h1 className="font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif", color: "#F4F9F4", fontSize: "clamp(2.2rem, 4vw, 3.5rem)", lineHeight: 1.15 }}>
            Let's Talk Farming
          </h1>
          <p className="text-lg" style={{ color: "#B7E4C7", lineHeight: "1.7" }}>
            Whether you have a question, want to partner, or need consulting — we're here.
          </p>
        </div>
      </section>

      {/* CONTACT OPTIONS */}
      <section className="py-16 px-6 lg:px-12" style={{ background: "var(--wf-bg-alt)" }}>
        <div className="max-w-[900px] mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {contactOptions.map((opt, i) => (
              <FadeIn key={opt.title} delay={i * 100}>
                <a href={opt.href} target={opt.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                  className="block rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1"
                  style={{ background: "var(--wf-bg-card)", boxShadow: "var(--wf-card-shadow)", textDecoration: "none" }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = "var(--wf-card-shadow-hover)")}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = "var(--wf-card-shadow)")}>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: `${opt.color}15` }}>
                    <opt.icon size={26} style={{ color: opt.color }} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2" style={{ fontFamily: "'Playfair Display', serif", color: "var(--wf-text-1)" }}>{opt.title}</h3>
                  <p className="text-sm mb-4" style={{ color: "var(--wf-text-3)" }}>{opt.desc}</p>
                  <span className="text-sm font-semibold" style={{ color: opt.color, fontFamily: "'Space Grotesk', sans-serif" }}>{opt.action}</span>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="py-16 px-6 lg:px-12" style={{ background: "var(--wf-bg-card)" }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="grid lg:grid-cols-[1fr_400px] gap-12">
            <FadeIn>
              <div>
                <p className="text-xs font-semibold tracking-widest mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#52B788" }}>SEND A MESSAGE</p>
                <h2 className="text-3xl font-bold mb-8" style={{ fontFamily: "'Playfair Display', serif", color: "var(--wf-text-1)" }}>We'd Love to Hear From You</h2>
                <ContactForm />
              </div>
            </FadeIn>
            <FadeIn delay={100}>
              <div className="space-y-6">
                <div className="rounded-2xl p-6" style={{ background: "#2D6A4F" }}>
                  <h3 className="font-semibold text-lg mb-5" style={{ fontFamily: "'Playfair Display', serif", color: "#F4F9F4" }}>Office Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.1)" }}>
                        <span className="text-sm">📍</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium" style={{ color: "#F4F9F4" }}>Wise Farmer HQ</p>
                        <p className="text-sm" style={{ color: "#B7E4C7" }}>Lagos, Nigeria</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.1)" }}>
                        <Mail size={14} style={{ color: "#52B788" }} />
                      </div>
                      <div>
                        <p className="text-sm font-medium" style={{ color: "#F4F9F4" }}>Email</p>
                        <a href="mailto:info@wise-farmer.com" className="text-sm hover:text-white transition-colors" style={{ color: "#B7E4C7" }}>info@wise-farmer.com</a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.1)" }}>
                        <Phone size={14} style={{ color: "#52B788" }} />
                      </div>
                      <div>
                        <p className="text-sm font-medium" style={{ color: "#F4F9F4" }}>Phone / WhatsApp</p>
                        <a href="https://wa.me/1234567890" className="text-sm hover:text-white transition-colors" style={{ color: "#B7E4C7" }}>+234 800 000 0000</a>
                      </div>
                    </div>
                  </div>
                  <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-6 px-5 py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
                    style={{ background: "#25D366", color: "white", fontFamily: "'Space Grotesk', sans-serif" }}>
                    <MessageCircle size={16} /> Chat on WhatsApp
                  </a>
                </div>

                {/* Map placeholder */}
                <div className="rounded-2xl overflow-hidden relative h-52" style={{ background: "var(--wf-border)" }}>
                  <img src="https://images.unsplash.com/photo-1664436938770-770d7c76d286?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500"
                    alt="Location" className="w-full h-full object-cover opacity-40" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rounded-2xl px-6 py-4 text-center shadow-lg" style={{ background: "var(--wf-bg-card)" }}>
                      <div className="text-2xl mb-1">📍</div>
                      <p className="font-semibold text-sm" style={{ color: "#2D6A4F" }}>Wise Farmer HQ</p>
                      <p className="text-xs" style={{ color: "var(--wf-text-3)" }}>Lagos, Nigeria</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl p-5" style={{ background: "var(--wf-bg-alt)", border: "1.5px solid var(--wf-border)" }}>
                  <p className="text-sm font-semibold mb-2" style={{ color: "var(--wf-text-2)" }}>Office Hours</p>
                  <div className="space-y-1.5 text-sm" style={{ color: "var(--wf-text-3)" }}>
                    <div className="flex justify-between"><span>Monday – Friday</span><span>8:00 AM – 6:00 PM WAT</span></div>
                    <div className="flex justify-between"><span>Saturday</span><span>10:00 AM – 2:00 PM WAT</span></div>
                    <div className="flex justify-between"><span>Sunday</span><span>Closed</span></div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* SOCIAL MEDIA */}
      <section className="py-16 px-6 lg:px-12" style={{ background: "var(--wf-bg-alt)" }}>
        <div className="max-w-[900px] mx-auto text-center">
          <FadeIn>
            <p className="text-xs font-semibold tracking-widest mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#52B788" }}>FOLLOW US</p>
            <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "var(--wf-text-1)" }}>Follow Us for Daily Farming Tips</h2>
            <p className="mb-10" style={{ color: "var(--wf-text-3)" }}>Stay connected and get practical farming insights every day.</p>
          </FadeIn>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {social.map((s, i) => (
              <FadeIn key={s.label} delay={i * 60}>
                <a href="#"
                  className="flex flex-col items-center gap-2 p-5 rounded-2xl transition-all duration-200 hover:-translate-y-1"
                  style={{ background: "var(--wf-bg-card)", boxShadow: "var(--wf-card-shadow)", textDecoration: "none" }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = "var(--wf-card-shadow-hover)")}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = "var(--wf-card-shadow)")}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: `${s.color}15` }}>
                    <s.icon size={22} style={{ color: s.color }} />
                  </div>
                  <p className="text-sm font-semibold" style={{ color: "var(--wf-text-1)" }}>{s.label}</p>
                  <p className="text-xs" style={{ color: "var(--wf-text-4)" }}>{s.handle}</p>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}