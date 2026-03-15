import { useRef, useState, useEffect } from "react";
import { Link } from "react-router";
import { Linkedin, CheckCircle2, Target, Leaf, Heart } from "lucide-react";

function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
    }}>{children}</div>
  );
}

const pillars = [
  {
    icon: Target,
    title: "Our Vision",
    desc: "To maximize farmers' outputs from their minimum inputs — making agriculture efficient, profitable, and sustainable for every farmer.",
    accent: "#2D6A4F",
  },
  {
    icon: Heart,
    title: "Our Mission",
    desc: "To empower farmers with knowledge, technology, and market access for economic and environmental sustainability across Africa and beyond.",
    accent: "#D4A017",
  },
  {
    icon: Leaf,
    title: "Our Stewardship",
    desc: "Promote sustainable agriculture through innovative solutions, balancing productivity with environmental conservation for future generations.",
    accent: "#6B4226",
  },
];

const team = [
  {
    name: "Rufus J. Akinrinlola, PhD",
    title: "CEO & Chief Editor | Crop Protection & IPM Specialist",
    bio: "A globally recognized expert in crop protection and integrated pest management, Dr. Akinrinlola has spent over 15 years developing practical agricultural solutions for smallholder and commercial farmers across Africa. His research-backed approach drives every course and resource at Wise Farmer.",
    img: "https://images.unsplash.com/photo-1769071167455-e5779ecc81a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300",
  },
  {
    name: "Samuel Ajasa",
    title: "Tech Associate",
    bio: "Samuel bridges the gap between agricultural knowledge and digital technology. With a background in software engineering and a passion for agri-tech, he ensures Wise Farmer's platform remains intuitive, accessible, and impactful for farmers across diverse regions.",
    img: "https://images.unsplash.com/photo-1703059680709-d9554370fff9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300",
  },
];

const partners = [
  "Research Partner", "Market Partner", "Tech Partner", "Education Partner", "NGO Partner", "Govt. Partner"
];

const whyUs = [
  { num: "01", title: "Research-Backed Content", desc: "Every resource, course, and article is grounded in peer-reviewed agricultural science and field-tested practices." },
  { num: "02", title: "Practical, Actionable Courses", desc: "No fluff — our courses are designed to be immediately applicable on the farm, from day one." },
  { num: "03", title: "Direct Market Connections", desc: "We connect farmers directly to buyers, eliminating middlemen and increasing farm-gate prices." },
  { num: "04", title: "Community of Farmers", desc: "Join thousands of farmers learning, growing, and solving challenges together across Africa." },
];

function ContactForm() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) return (
    <div className="text-center py-16">
      <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "var(--wf-bg-alt)" }}>
        <CheckCircle2 size={32} style={{ color: "#2D6A4F" }} />
      </div>
      <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: "var(--wf-text-1)" }}>Message Sent!</h3>
      <p style={{ color: "var(--wf-text-3)" }}>We'll get back to you within 24 hours.</p>
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
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <input placeholder="First Name" required value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })}
          style={inputStyle} onFocus={e => (e.target.style.borderColor = "#52B788")} onBlur={e => (e.target.style.borderColor = "var(--wf-border)")} />
        <input placeholder="Last Name" required value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })}
          style={inputStyle} onFocus={e => (e.target.style.borderColor = "#52B788")} onBlur={e => (e.target.style.borderColor = "var(--wf-border)")} />
      </div>
      <input type="email" placeholder="Email Address" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
        style={inputStyle} onFocus={e => (e.target.style.borderColor = "#52B788")} onBlur={e => (e.target.style.borderColor = "var(--wf-border)")} />
      <input type="tel" placeholder="Phone Number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
        style={inputStyle} onFocus={e => (e.target.style.borderColor = "#52B788")} onBlur={e => (e.target.style.borderColor = "var(--wf-border)")} />
      <textarea placeholder="Your Message" rows={5} required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
        style={{ ...inputStyle, resize: "vertical" }}
        onFocus={e => (e.target.style.borderColor = "#52B788")} onBlur={e => (e.target.style.borderColor = "var(--wf-border)")} />
      <button type="submit" className="w-full py-4 rounded-xl font-semibold transition-all duration-200 hover:opacity-90 hover:scale-[1.01]"
        style={{ background: "#2D6A4F", color: "white", fontFamily: "'Space Grotesk', sans-serif" }}>
        Send Message
      </button>
    </form>
  );
}

export function About() {
  useEffect(() => {
    document.title = "About Us | Wise Farmer";
  }, []);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* HERO */}
      <section className="relative h-[80vh] min-h-[500px] flex items-center">
        <img
          src="https://images.unsplash.com/photo-1627829380497-49c37b769ea6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400"
          alt="Farmer in field"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(45,106,79,0.9) 45%, rgba(0,0,0,0.1) 100%)" }} />
        <div className="relative z-10 px-6 lg:px-12 max-w-[1440px] mx-auto w-full pt-20">
          <nav className="flex items-center gap-2 text-xs mb-8" style={{ color: "#B7E4C7", fontFamily: "'Space Grotesk', sans-serif" }}>
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span style={{ color: "#D4A017" }}>About Us</span>
          </nav>
          <p className="text-xs font-semibold tracking-widest mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#52B788" }}>WHO WE ARE</p>
          <h1 className="font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif", color: "#F4F9F4", lineHeight: 1.15, fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
            Growing With Purpose
          </h1>
          <p className="text-xl max-w-[500px]" style={{ color: "#B7E4C7", lineHeight: "1.7" }}>
            We are more than an agricultural platform — we are a movement transforming farming across Africa and beyond.
          </p>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="py-20 px-6 lg:px-12" style={{ background: "var(--wf-bg-card)" }}>
        <div className="max-w-[1440px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <img
                src="https://images.unsplash.com/photo-1585643099545-cd6cad20b7b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=700"
                alt="Farm workers in greenhouse"
                className="w-full h-[480px] object-cover rounded-2xl"
                style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.12)" }}
              />
            </FadeIn>
            <FadeIn delay={100}>
              <div>
                <p className="text-xs font-semibold tracking-widest mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#52B788" }}>OUR STORY</p>
                <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif", color: "var(--wf-text-1)" }}>
                  From a Field Observation to a Movement
                </h2>
                <p className="mb-4" style={{ color: "var(--wf-text-3)", lineHeight: "1.8" }}>
                  Wise Farmer was born from a simple yet powerful observation: millions of African farmers possessed incredible traditional knowledge and dedication, but lacked access to modern tools, markets, and education that could transform their livelihoods.
                </p>
                <p className="mb-4" style={{ color: "var(--wf-text-3)", lineHeight: "1.8" }}>
                  Founded by Dr. Rufus J. Akinrinlola, a crop protection specialist with over 15 years of field research, Wise Farmer began as a blog sharing practical farming tips. It quickly evolved into a comprehensive agri-tech and education platform serving thousands of farmers across Africa.
                </p>
                <p className="mb-8" style={{ color: "var(--wf-text-3)", lineHeight: "1.8" }}>
                  Today, Wise Farmer is a full ecosystem — offering online courses, webinars, a farmers market, scholarships, and expert consulting — all designed to bridge the gap between where agriculture is and where it needs to be.
                </p>
                <blockquote className="border-l-4 pl-6 py-2" style={{ borderColor: "#D4A017" }}>
                  <p className="text-xl font-semibold italic" style={{ fontFamily: "'Playfair Display', serif", color: "#D4A017" }}>
                    "Bridging the gap between traditional wisdom and modern agricultural innovation."
                  </p>
                </blockquote>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 3 PILLARS */}
      <section className="py-20 px-6 lg:px-12" style={{ background: "var(--wf-bg-alt)" }}>
        <div className="max-w-[1440px] mx-auto">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="text-xs font-semibold tracking-widest mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#52B788" }}>OUR PILLARS</p>
              <h2 className="text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "var(--wf-text-1)" }}>Vision, Mission & Stewardship</h2>
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {pillars.map((p, i) => (
              <FadeIn key={p.title} delay={i * 100}>
                <div className="rounded-2xl p-8 h-full" style={{ background: "var(--wf-bg-card)", borderTop: `4px solid ${p.accent}`, boxShadow: "var(--wf-card-shadow)" }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: `${p.accent}22` }}>
                    <p.icon size={24} style={{ color: p.accent }} />
                  </div>
                  <h3 className="text-xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "var(--wf-text-1)" }}>{p.title}</h3>
                  <p style={{ color: "var(--wf-text-3)", lineHeight: "1.7" }}>{p.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 px-6 lg:px-12" style={{ background: "var(--wf-bg-card)" }}>
        <div className="max-w-[1440px] mx-auto">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="text-xs font-semibold tracking-widest mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#52B788" }}>WHY WISE FARMER</p>
              <h2 className="text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "var(--wf-text-1)" }}>Built Different. Built for Farmers.</h2>
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyUs.map((item, i) => (
              <FadeIn key={item.num} delay={i * 100}>
                <div className="text-center">
                  <div className="text-6xl font-bold mb-4 leading-none" style={{ fontFamily: "'Playfair Display', serif", color: "var(--wf-border)" }}>{item.num}</div>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: "var(--wf-bg-alt)" }}>
                    <CheckCircle2 size={22} style={{ color: "#2D6A4F" }} />
                  </div>
                  <h3 className="text-lg font-semibold mb-3" style={{ fontFamily: "'Playfair Display', serif", color: "var(--wf-text-1)" }}>{item.title}</h3>
                  <p className="text-sm" style={{ color: "var(--wf-text-3)", lineHeight: "1.7" }}>{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-20 px-6 lg:px-12" style={{ background: "var(--wf-bg-alt)" }}>
        <div className="max-w-[900px] mx-auto">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="text-xs font-semibold tracking-widest mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#52B788" }}>OUR TEAM</p>
              <h2 className="text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "var(--wf-text-1)" }}>The People Behind the Mission</h2>
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-8">
            {team.map((member, i) => (
              <FadeIn key={member.name} delay={i * 100}>
                <div className="rounded-2xl overflow-hidden text-center p-8"
                  style={{ background: "var(--wf-bg-card)", boxShadow: "var(--wf-card-shadow)", border: "1px solid var(--wf-border-2)" }}>
                  <div className="w-28 h-28 rounded-full overflow-hidden mx-auto mb-5 border-4" style={{ borderColor: "#D4A017" }}>
                    <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif", color: "#D4A017" }}>{member.name}</h3>
                  <p className="text-sm font-medium mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#2D6A4F" }}>{member.title}</p>
                  <p className="text-sm mb-5" style={{ color: "var(--wf-text-3)", lineHeight: "1.7" }}>{member.bio}</p>
                  <a href="#" className="inline-flex items-center gap-2 text-sm font-semibold"
                    style={{ color: "#2D6A4F", fontFamily: "'Space Grotesk', sans-serif" }}>
                    <Linkedin size={16} /> Connect on LinkedIn
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="py-16 px-6 lg:px-12" style={{ background: "var(--wf-bg-card)" }}>
        <div className="max-w-[1440px] mx-auto">
          <FadeIn>
            <p className="text-center text-xs font-semibold tracking-widest mb-10" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--wf-text-4)" }}>
              TRUSTED BY & CONNECTED WITH
            </p>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {partners.map((p, i) => (
              <FadeIn key={p} delay={i * 60}>
                <div className="rounded-xl p-6 text-center transition-all duration-200 hover:shadow-md cursor-pointer"
                  style={{ background: "var(--wf-bg-alt)", border: "1.5px solid var(--wf-border)" }}>
                  <div className="w-10 h-10 rounded-full mx-auto mb-2" style={{ background: "var(--wf-border)" }} />
                  <p className="text-xs font-medium" style={{ color: "var(--wf-text-4)", fontFamily: "'Space Grotesk', sans-serif" }}>{p}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="py-20 px-6 lg:px-12" style={{ background: "var(--wf-bg-alt)" }}>
        <div className="max-w-[1100px] mx-auto">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="text-xs font-semibold tracking-widest mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#52B788" }}>GET IN TOUCH</p>
              <h2 className="text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "var(--wf-text-1)" }}>Let's Talk Farming</h2>
            </div>
          </FadeIn>
          <div className="grid lg:grid-cols-2 gap-12">
            <FadeIn>
              <div className="rounded-2xl p-8" style={{ background: "var(--wf-bg-card)", boxShadow: "var(--wf-card-shadow)" }}>
                <ContactForm />
              </div>
            </FadeIn>
            <FadeIn delay={100}>
              <div className="space-y-6">
                <div className="rounded-2xl p-6" style={{ background: "#2D6A4F" }}>
                  <h3 className="font-semibold mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "#F4F9F4", fontSize: "1.2rem" }}>Office Information</h3>
                  <div className="space-y-3 text-sm" style={{ color: "#B7E4C7" }}>
                    <p>📍 Wise Farmer HQ, Lagos, Nigeria</p>
                    <p>📧 info@wise-farmer.com</p>
                    <p>📞 +234 800 000 0000</p>
                  </div>
                  <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-6 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90"
                    style={{ background: "#25D366", color: "white", fontFamily: "'Space Grotesk', sans-serif" }}>
                    Chat on WhatsApp
                  </a>
                </div>
                <div className="rounded-2xl overflow-hidden h-48 relative" style={{ background: "var(--wf-border)" }}>
                  <img src="https://images.unsplash.com/photo-1664436938770-770d7c76d286?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600"
                    alt="Location" className="w-full h-full object-cover opacity-50" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rounded-xl px-4 py-3 text-center shadow-lg" style={{ background: "var(--wf-bg-card)" }}>
                      <p className="text-sm font-semibold" style={{ color: "#2D6A4F" }}>Wise Farmer HQ</p>
                      <p className="text-xs" style={{ color: "var(--wf-text-3)" }}>Lagos, Nigeria</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
