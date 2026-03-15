import { useRef, useState, useEffect } from "react";
import { Play, Calendar, Clock, Users, Download, Award, ArrowRight, X, CheckCircle2 } from "lucide-react";

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

function Countdown({ target }: { target: Date }) {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const update = () => {
      const diff = Math.max(0, target.getTime() - Date.now());
      setTime({ d: Math.floor(diff / 86400000), h: Math.floor((diff % 86400000) / 3600000), m: Math.floor((diff % 3600000) / 60000), s: Math.floor((diff % 60000) / 1000) });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [target]);
  return (
    <div className="flex gap-6">
      {[{ label: "Days", val: time.d }, { label: "Hours", val: time.h }, { label: "Mins", val: time.m }, { label: "Secs", val: time.s }].map(({ label, val }) => (
        <div key={label} className="text-center">
          <div className="text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "#D4A017" }}>{String(val).padStart(2, "0")}</div>
          <div className="text-xs mt-1 tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#B7E4C7" }}>{label}</div>
        </div>
      ))}
    </div>
  );
}

const upcoming = [
  {
    img: "https://images.unsplash.com/photo-1758874384555-de68b8035c24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    topic: "Unlocking Agribusiness Profits in 2026",
    date: "April 15, 2026",
    time: "10:00 AM WAT",
    host: "Dr. Rufus Akinrinlola",
    hostImg: "https://images.unsplash.com/photo-1769071167455-e5779ecc81a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
    attendees: 342,
    badge: "UPCOMING",
  },
  {
    img: "https://images.unsplash.com/photo-1656250444213-6baf45417252?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    topic: "Smart Irrigation: Save Water, Grow More",
    date: "April 22, 2026",
    time: "2:00 PM WAT",
    host: "Samuel Ajasa",
    hostImg: "https://images.unsplash.com/photo-1703059680709-d9554370fff9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
    attendees: 198,
    badge: "UPCOMING",
  },
  {
    img: "https://images.unsplash.com/photo-1585643099545-cd6cad20b7b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    topic: "Export Markets: Getting Your Produce Globally",
    date: "May 3, 2026",
    time: "11:00 AM WAT",
    host: "Dr. Rufus Akinrinlola",
    hostImg: "https://images.unsplash.com/photo-1769071167455-e5779ecc81a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
    attendees: 124,
    badge: "UPCOMING",
  },
];

const replays = [
  { img: "https://images.unsplash.com/photo-1696699639395-7db15be800fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", title: "Ginger Farming: From Seed to Export", date: "March 8, 2026", duration: "1h 42m", views: 892 },
  { img: "https://images.unsplash.com/photo-1664436938770-770d7c76d286?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", title: "Soil Health Masterclass", date: "Feb 22, 2026", duration: "1h 18m", views: 1241 },
  { img: "https://images.unsplash.com/photo-1526930382372-67bf22c0fce2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", title: "IPM Strategies for Smallholder Farmers", date: "Feb 8, 2026", duration: "2h 05m", views: 763 },
  { img: "https://images.unsplash.com/photo-1677126577258-1a82fdf1a976?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", title: "Drones in African Agriculture: A Practical Guide", date: "Jan 25, 2026", duration: "1h 30m", views: 456 },
  { img: "https://images.unsplash.com/photo-1641470787994-3f4dfd90d7d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", title: "Breaking Into International Markets", date: "Jan 11, 2026", duration: "1h 55m", views: 1089 },
  { img: "https://images.unsplash.com/photo-1738598665698-7fd7af4b5e0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", title: "Water Management for Dryland Farmers", date: "Dec 14, 2025", duration: "1h 22m", views: 678 },
];

const gains = [
  { icon: Award, title: "Expert Knowledge", desc: "Learn directly from agricultural scientists and field experts with decades of real-world experience." },
  { icon: Users, title: "Live Q&A Sessions", desc: "Ask your pressing farming questions live and get answers tailored to your specific situation." },
  { icon: Download, title: "Free Resources", desc: "Download exclusive guides, templates, and research papers with every webinar." },
  { icon: Award, title: "Certificate of Attendance", desc: "Receive a digital certificate to showcase your continuous professional development." },
];

function RegistrationForm({ webinarTopic, onClose }: { webinarTopic?: string; onClose?: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", role: "" });
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 1200);
  };

  if (done) return (
    <div className="text-center py-8">
      <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(82,183,136,0.15)" }}>
        <CheckCircle2 size={32} style={{ color: "#52B788" }} />
      </div>
      <p className="text-xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: "#F4F9F4" }}>You're Registered! 🎉</p>
      <p className="text-sm mb-6" style={{ color: "#B7E4C7" }}>Check your email for the webinar link & reminder.</p>
      {onClose && (
        <button onClick={onClose} className="px-6 py-3 rounded-xl text-sm font-semibold"
          style={{ background: "#D4A017", color: "#1A1A1A", fontFamily: "'Space Grotesk', sans-serif" }}>
          Done
        </button>
      )}
    </div>
  );

  const inputClass = "w-full px-4 py-3 rounded-xl outline-none text-sm transition-all duration-200 border focus:border-[#52B788]";
  const inputStyle = { fontFamily: "'Inter', sans-serif", background: "rgba(255,255,255,0.08)", color: "white", borderColor: "rgba(255,255,255,0.15)" };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {webinarTopic && (
        <div className="px-4 py-3 rounded-xl text-sm mb-2" style={{ background: "rgba(212,160,23,0.15)", color: "#D4A017", border: "1px solid rgba(212,160,23,0.3)" }}>
          📅 Registering for: <span className="font-semibold">{webinarTopic}</span>
        </div>
      )}
      <div className="grid sm:grid-cols-2 gap-4">
        <input type="text" required placeholder="Full Name" value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          className={inputClass} style={inputStyle} />
        <input type="email" required placeholder="Email Address" value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          className={inputClass} style={inputStyle} />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <input type="tel" placeholder="Phone (optional)" value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })}
          className={inputClass} style={inputStyle} />
        <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}
          className={inputClass} style={{ ...inputStyle, appearance: "none" as const }}>
          <option value="">Your Role</option>
          <option>Smallholder Farmer</option>
          <option>Commercial Farmer</option>
          <option>Agripreneur</option>
          <option>Student / Researcher</option>
          <option>Other</option>
        </select>
      </div>
      <button type="submit" disabled={loading}
        className="w-full py-4 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90 disabled:opacity-60"
        style={{ background: "#D4A017", color: "#1A1A1A", fontFamily: "'Space Grotesk', sans-serif" }}>
        {loading ? "Registering..." : "Reserve My Free Seat →"}
      </button>
      <p className="text-xs text-center" style={{ color: "#6B7280" }}>Free to attend · Receive recording link after the event</p>
    </form>
  );
}

export function Webinars() {
  const nextWebinar = new Date("2026-04-15T10:00:00");
  const [registerModal, setRegisterModal] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Webinars | Wise Farmer";
  }, []);

  // Close modal on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setRegisterModal(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* HERO */}
      <section className="relative py-28 px-6 lg:px-12 overflow-hidden" style={{ background: "#1A1A1A" }}>
        <img src="https://images.unsplash.com/photo-1758874384555-de68b8035c24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400"
          alt="Webinar" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(26,26,26,0.6) 0%, rgba(26,26,26,0.95) 100%)" }} />
        <div className="relative max-w-[700px] mx-auto text-center pt-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6" style={{ background: "rgba(239,68,68,0.15)", color: "#EF4444", border: "1px solid rgba(239,68,68,0.3)", fontFamily: "'Space Grotesk', sans-serif" }}>
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            LIVE EVENTS
          </div>
          <h1 className="font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif", color: "#F4F9F4", fontSize: "clamp(2.2rem, 4vw, 3.5rem)", lineHeight: 1.15 }}>
            Expert-Led Webinars for Smarter Farming
          </h1>
          <p className="text-lg mb-6" style={{ color: "#9CA3AF", lineHeight: "1.7" }}>
            Join live sessions with agricultural experts, ask questions, and transform your farming practice.
          </p>
          <p className="text-sm mb-4" style={{ color: "#D4A017", fontFamily: "'Space Grotesk', sans-serif" }}>Next Session: April 15, 2026 · 10:00 AM WAT</p>
          <Countdown target={nextWebinar} />
          <button
            onClick={() => setRegisterModal(upcoming[0].topic)}
            className="inline-flex items-center gap-2 mt-8 px-8 py-4 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-[1.02]"
            style={{ background: "#2D6A4F", color: "white", fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Register Free <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* UPCOMING WEBINARS */}
      <section className="py-20 px-6 lg:px-12" style={{ background: "var(--wf-bg-alt)" }}>
        <div className="max-w-[1440px] mx-auto">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="text-xs font-semibold tracking-widest mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#52B788" }}>UPCOMING</p>
              <h2 className="text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "var(--wf-text-1)" }}>Register for Upcoming Webinars</h2>
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {upcoming.map((w, i) => (
              <FadeIn key={w.topic} delay={i * 100}>
                <div className="rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                  style={{ background: "var(--wf-bg-card)", boxShadow: "var(--wf-card-shadow)" }}>
                  <div className="relative h-44 overflow-hidden">
                    <img src={w.img} alt={w.topic} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40" />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold" style={{ background: "#D4A017", color: "#1A1A1A", fontFamily: "'Space Grotesk', sans-serif" }}>{w.badge}</span>
                    <button className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center hover:bg-white/30 transition-colors">
                        <Play size={22} color="white" fill="white" />
                      </div>
                    </button>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-base mb-3" style={{ fontFamily: "'Playfair Display', serif", color: "var(--wf-text-1)" }}>{w.topic}</h3>
                    <div className="flex items-center gap-3 mb-3 text-xs" style={{ color: "var(--wf-text-3)" }}>
                      <span className="flex items-center gap-1"><Calendar size={12} /> {w.date}</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> {w.time}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <img src={w.hostImg} alt={w.host} className="w-8 h-8 rounded-full object-cover border-2" style={{ borderColor: "#D4A017" }} />
                      <p className="text-xs font-medium" style={{ color: "var(--wf-text-2)" }}>{w.host}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs" style={{ color: "var(--wf-text-4)" }}><Users size={12} className="inline mr-1" />{w.attendees} registered</span>
                      <button
                        onClick={() => setRegisterModal(w.topic)}
                        className="px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
                        style={{ background: "#2D6A4F", color: "white", fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        Register →
                      </button>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU'LL GAIN */}
      <section className="py-16 px-6 lg:px-12" style={{ background: "var(--wf-bg-card)" }}>
        <div className="max-w-[1100px] mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-xs font-semibold tracking-widest mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#52B788" }}>WHAT YOU GET</p>
              <h2 className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "var(--wf-text-1)" }}>What You'll Gain from Every Webinar</h2>
            </div>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {gains.map((g, i) => (
              <FadeIn key={g.title} delay={i * 80}>
                <div className="text-center p-6 rounded-2xl transition-all duration-200 hover:-translate-y-1" style={{ background: "var(--wf-bg-alt)" }}>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: "#2D6A4F" }}>
                    <g.icon size={24} color="white" />
                  </div>
                  <h3 className="font-semibold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: "var(--wf-text-1)" }}>{g.title}</h3>
                  <p className="text-sm" style={{ color: "var(--wf-text-3)", lineHeight: "1.6" }}>{g.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* REPLAY LIBRARY */}
      <section className="py-20 px-6 lg:px-12" style={{ background: "var(--wf-bg-alt)" }}>
        <div className="max-w-[1440px] mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-xs font-semibold tracking-widest mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#52B788" }}>ON-DEMAND</p>
              <h2 className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "var(--wf-text-1)" }}>Past Webinar Replay Library</h2>
            </div>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {replays.map((r, i) => (
              <FadeIn key={r.title} delay={i * 60}>
                <div className="group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                  style={{ background: "var(--wf-bg-card)", boxShadow: "var(--wf-card-shadow)" }}>
                  <div className="relative h-40 overflow-hidden">
                    <img src={r.img} alt={r.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/40">
                        <Play size={14} color="white" fill="white" />
                        <span className="text-xs font-semibold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Watch Replay</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-sm mb-3" style={{ fontFamily: "'Playfair Display', serif", color: "var(--wf-text-1)" }}>{r.title}</h3>
                    <div className="flex items-center gap-4 text-xs" style={{ color: "var(--wf-text-4)" }}>
                      <span>{r.date}</span>
                      <span className="flex items-center gap-1"><Clock size={11} /> {r.duration}</span>
                      <span>{r.views.toLocaleString()} views</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* SPEAKER SPOTLIGHT */}
      <section className="py-16 px-6 lg:px-12" style={{ background: "var(--wf-bg-card)" }}>
        <div className="max-w-[700px] mx-auto">
          <FadeIn>
            <div className="text-center mb-10">
              <p className="text-xs font-semibold tracking-widest mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#52B788" }}>SPEAKER SPOTLIGHT</p>
              <h2 className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "var(--wf-text-1)" }}>Meet Your Host</h2>
            </div>
            <div className="rounded-2xl p-8 flex gap-8 items-center flex-col sm:flex-row" style={{ background: "var(--wf-bg-alt)", border: "1.5px solid var(--wf-border)" }}>
              <div className="text-center flex-shrink-0">
                <img src="https://images.unsplash.com/photo-1769071167455-e5779ecc81a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200"
                  alt="Dr. Rufus" className="w-24 h-24 rounded-full object-cover border-4 mx-auto" style={{ borderColor: "#D4A017" }} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif", color: "#D4A017" }}>Rufus J. Akinrinlola, PhD</h3>
                <p className="text-sm font-medium mb-3" style={{ color: "#2D6A4F", fontFamily: "'Space Grotesk', sans-serif" }}>CEO | Crop Protection & IPM Specialist</p>
                <p className="text-sm mb-4" style={{ color: "var(--wf-text-3)", lineHeight: "1.7" }}>Rufus has hosted over 30 expert webinars on topics ranging from precision agriculture to international market access, reaching farmers across 15+ countries.</p>
                <div className="flex flex-wrap gap-2">
                  {["Ginger Farming", "IPM", "Agribusiness", "Export Markets"].map(t => (
                    <span key={t} className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: "#2D6A4F15", color: "#2D6A4F", fontFamily: "'Space Grotesk', sans-serif" }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* REGISTRATION CTA */}
      <section id="register" className="py-16 px-6 lg:px-12" style={{ background: "#2D6A4F" }}>
        <div className="max-w-[800px] mx-auto text-center">
          <FadeIn>
            <p className="text-xs font-semibold tracking-widest mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#52B788" }}>JOIN US LIVE</p>
            <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "#F4F9F4" }}>Reserve Your Seat for Our Next Webinar</h2>
            <p className="mb-10" style={{ color: "#B7E4C7", lineHeight: "1.7" }}>
              April 15, 2026 · "Unlocking Agribusiness Profits in 2026" · Free to attend
            </p>
            <RegistrationForm webinarTopic={upcoming[0].topic} />
          </FadeIn>
        </div>
      </section>

      {/* REGISTRATION MODAL */}
      {registerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setRegisterModal(null)}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div
            className="relative rounded-2xl w-full max-w-[540px] p-8 overflow-y-auto max-h-[90vh]"
            style={{ background: "#1F5440", boxShadow: "0 32px 80px rgba(0,0,0,0.4)" }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setRegisterModal(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-colors"
              style={{ background: "rgba(255,255,255,0.1)", color: "white" }}
            >
              <X size={18} />
            </button>
            <p className="text-xs font-semibold tracking-widest mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#52B788" }}>REGISTER NOW</p>
            <h3 className="text-2xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif", color: "#F4F9F4" }}>
              Secure Your Free Spot
            </h3>
            <RegistrationForm webinarTopic={registerModal} onClose={() => setRegisterModal(null)} />
          </div>
        </div>
      )}
    </div>
  );
}