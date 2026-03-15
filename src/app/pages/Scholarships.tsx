import { useRef, useState, useEffect } from "react";
import { CheckCircle2, Upload, Sprout, Leaf, TreePine } from "lucide-react";

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

const tiers = [
  {
    icon: Sprout,
    name: "Seedling Scholarship",
    desc: "Full course access for smallholder farmers who are just starting their agricultural journey.",
    color: "#52B788",
    perks: ["All beginner courses", "Community access", "Monthly Q&A sessions", "Digital certificate"],
  },
  {
    icon: Leaf,
    name: "Growth Scholarship",
    desc: "Mentorship plus course access for emerging agripreneurs ready to scale their operations.",
    color: "#D4A017",
    perks: ["All courses (beginner + intermediate)", "1-on-1 mentorship sessions", "Market access guidance", "Export readiness coaching"],
    featured: true,
  },
  {
    icon: TreePine,
    name: "Harvest Scholarship",
    desc: "Premium access, market connections, and advanced training for experienced farmers seeking global reach.",
    color: "#2D6A4F",
    perks: ["Full academy access", "Direct buyer introductions", "Advanced consulting sessions", "Press & media features"],
  },
];

const steps = [
  { num: "01", title: "Check Eligibility", desc: "Review our eligibility criteria to ensure you qualify for the scholarship program." },
  { num: "02", title: "Fill Application", desc: "Complete the online application form with your personal and farming details." },
  { num: "03", title: "Submit Documents", desc: "Upload the required supporting documents including ID and farm proof." },
  { num: "04", title: "Get Notified", desc: "Our team reviews applications within 2 weeks and notifies all applicants." },
];

const recipients = [
  {
    name: "Amina Diallo",
    location: "Dakar, Senegal",
    scholarship: "Growth Scholarship",
    img: "https://images.unsplash.com/photo-1627829380497-49c37b769ea6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    quote: "The Growth Scholarship didn't just give me courses — it gave me a mentor who helped me land my first export deal. My income tripled in one season.",
  },
  {
    name: "Emmanuel Kariuki",
    location: "Nairobi, Kenya",
    scholarship: "Seedling Scholarship",
    img: "https://images.unsplash.com/photo-1605362719071-92da93e75814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    quote: "I couldn't afford formal agricultural education. The Seedling Scholarship opened doors I never thought possible. I now train other farmers in my community.",
  },
  {
    name: "Fatima Bello",
    location: "Kano, Nigeria",
    scholarship: "Harvest Scholarship",
    img: "https://images.unsplash.com/photo-1769071167455-e5779ecc81a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    quote: "The Harvest Scholarship connected me directly to European buyers. My cooperative now exports 12 tonnes of sesame monthly. This platform changed everything.",
  },
];

function ApplicationForm() {
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", country: "", farmType: "", yearsExperience: "", whyDeserve: "", tier: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) return (
    <div className="text-center py-16">
      <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "var(--wf-bg-alt)" }}>
        <CheckCircle2 size={40} style={{ color: "#2D6A4F" }} />
      </div>
      <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif", color: "var(--wf-text-1)" }}>Application Submitted! 🎉</h3>
      <p className="mb-2" style={{ color: "var(--wf-text-3)" }}>Thank you for applying to the Wise Farmer Scholarship program.</p>
      <p style={{ color: "var(--wf-text-3)" }}>We'll review your application and get back to you within 2 weeks.</p>
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
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: "var(--wf-text-2)" }}>First Name *</label>
          <input required placeholder="Your first name" value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })}
            style={inputStyle} onFocus={e => (e.target.style.borderColor = "#52B788")} onBlur={e => (e.target.style.borderColor = "var(--wf-border)")} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: "var(--wf-text-2)" }}>Last Name *</label>
          <input required placeholder="Your last name" value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })}
            style={inputStyle} onFocus={e => (e.target.style.borderColor = "#52B788")} onBlur={e => (e.target.style.borderColor = "var(--wf-border)")} />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: "var(--wf-text-2)" }}>Email Address *</label>
        <input type="email" required placeholder="your@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
          style={inputStyle} onFocus={e => (e.target.style.borderColor = "#52B788")} onBlur={e => (e.target.style.borderColor = "var(--wf-border)")} />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: "var(--wf-text-2)" }}>Country *</label>
          <input required placeholder="e.g. Nigeria" value={form.country} onChange={e => setForm({ ...form, country: e.target.value })}
            style={inputStyle} onFocus={e => (e.target.style.borderColor = "#52B788")} onBlur={e => (e.target.style.borderColor = "var(--wf-border)")} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: "var(--wf-text-2)" }}>Farm Type *</label>
          <input required placeholder="e.g. Ginger, Poultry, Mixed" value={form.farmType} onChange={e => setForm({ ...form, farmType: e.target.value })}
            style={inputStyle} onFocus={e => (e.target.style.borderColor = "#52B788")} onBlur={e => (e.target.style.borderColor = "var(--wf-border)")} />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: "var(--wf-text-2)" }}>Years of Farming Experience *</label>
        <select required value={form.yearsExperience} onChange={e => setForm({ ...form, yearsExperience: e.target.value })}
          style={{ ...inputStyle, appearance: "none" }}>
          <option value="">Select experience level</option>
          <option>Less than 1 year</option>
          <option>1-3 years</option>
          <option>3-5 years</option>
          <option>5-10 years</option>
          <option>More than 10 years</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: "var(--wf-text-2)" }}>Scholarship Tier *</label>
        <select required value={form.tier} onChange={e => setForm({ ...form, tier: e.target.value })}
          style={{ ...inputStyle, appearance: "none" }}>
          <option value="">Select a scholarship tier</option>
          <option>Seedling Scholarship</option>
          <option>Growth Scholarship</option>
          <option>Harvest Scholarship</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: "var(--wf-text-2)" }}>Why do you deserve this scholarship? *</label>
        <textarea required rows={5} placeholder="Tell us your story, your farming goals, and why you need this scholarship..." value={form.whyDeserve} onChange={e => setForm({ ...form, whyDeserve: e.target.value })}
          style={{ ...inputStyle, resize: "vertical" }}
          onFocus={e => (e.target.style.borderColor = "#52B788")} onBlur={e => (e.target.style.borderColor = "var(--wf-border)")} />
      </div>
      <div className="rounded-xl p-4 flex items-center gap-4 cursor-pointer transition-colors"
        style={{ border: "2px dashed var(--wf-border)", background: "var(--wf-bg-input)" }}>
        <Upload size={20} style={{ color: "var(--wf-text-4)" }} />
        <div>
          <p className="text-sm font-medium" style={{ color: "var(--wf-text-2)" }}>Upload ID Document</p>
          <p className="text-xs" style={{ color: "var(--wf-text-4)" }}>PDF, JPG, PNG up to 5MB</p>
        </div>
      </div>
      <button type="submit" className="w-full py-4 rounded-xl font-semibold transition-all duration-200 hover:opacity-90 hover:scale-[1.01]"
        style={{ background: "#2D6A4F", color: "white", fontFamily: "'Space Grotesk', sans-serif" }}>
        Submit Application
      </button>
    </form>
  );
}

export function Scholarships() {
  useEffect(() => {
    document.title = "Scholarships | Wise Farmer";
  }, []);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* HERO */}
      <section className="relative py-28 px-6 lg:px-12 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1771327385095-acd5907e3f9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400"
          alt="Young farmer studying"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(45,106,79,0.92) 0%, rgba(212,160,23,0.75) 100%)" }} />
        <div className="relative max-w-[700px] mx-auto text-center pt-12">
          <p className="text-xs font-semibold tracking-widest mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#B7E4C7" }}>WISE FARMER SCHOLARSHIPS</p>
          <h1 className="font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif", color: "#F4F9F4", fontSize: "clamp(2.2rem, 4vw, 3.5rem)", lineHeight: 1.15 }}>
            Scholarships for the Next Generation of Farmers
          </h1>
          <p className="text-lg mb-10" style={{ color: "#E5E7EB", lineHeight: "1.7" }}>
            Wise Farmer believes every farmer deserves access to knowledge — regardless of financial barriers.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#apply" className="px-8 py-4 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-[1.02]"
              style={{ background: "#D4A017", color: "#1A1A1A", fontFamily: "'Space Grotesk', sans-serif" }}>
              Apply Now
            </a>
            <a href="#overview" className="px-8 py-4 rounded-xl font-semibold text-sm border transition-all duration-200 hover:bg-white/10"
              style={{ borderColor: "rgba(255,255,255,0.5)", color: "white", fontFamily: "'Space Grotesk', sans-serif" }}>
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* SCHOLARSHIP TIERS */}
      <section id="overview" className="py-20 px-6 lg:px-12" style={{ background: "var(--wf-bg-alt)" }}>
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="text-xs font-semibold tracking-widest mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#52B788" }}>SCHOLARSHIP TIERS</p>
              <h2 className="text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "var(--wf-text-1)" }}>Choose Your Path to Growth</h2>
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {tiers.map((tier, i) => (
              <FadeIn key={tier.name} delay={i * 100}>
                <div className={`rounded-2xl p-8 h-full relative overflow-hidden transition-all duration-300 hover:-translate-y-1`}
                  style={{
                    background: tier.featured ? tier.color : "var(--wf-bg-card)",
                    boxShadow: tier.featured ? `0 20px 60px ${tier.color}40` : "var(--wf-card-shadow)",
                  }}>
                  {tier.featured && <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold" style={{ background: "#D4A017", color: "#1A1A1A", fontFamily: "'Space Grotesk', sans-serif" }}>MOST POPULAR</div>}
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: tier.featured ? "rgba(255,255,255,0.2)" : `${tier.color}15` }}>
                    <tier.icon size={28} style={{ color: tier.featured ? "white" : tier.color }} />
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif", color: tier.featured ? "white" : "var(--wf-text-1)" }}>{tier.name}</h3>
                  <p className="text-sm mb-6" style={{ color: tier.featured ? "rgba(255,255,255,0.8)" : "var(--wf-text-3)", lineHeight: "1.7" }}>{tier.desc}</p>
                  <ul className="space-y-3 mb-8">
                    {tier.perks.map(perk => (
                      <li key={perk} className="flex items-start gap-2.5 text-sm" style={{ color: tier.featured ? "rgba(255,255,255,0.9)" : "var(--wf-text-2)" }}>
                        <CheckCircle2 size={16} style={{ color: tier.featured ? "rgba(255,255,255,0.8)" : tier.color, flexShrink: 0, marginTop: "2px" }} />
                        {perk}
                      </li>
                    ))}
                  </ul>
                  <a href="#apply" className="block text-center py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90"
                    style={{
                      background: tier.featured ? "rgba(255,255,255,0.2)" : tier.color,
                      color: "white",
                      fontFamily: "'Space Grotesk', sans-serif",
                      border: tier.featured ? "1.5px solid rgba(255,255,255,0.4)" : "none",
                    }}>
                    Apply for This Scholarship
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* HOW TO APPLY */}
      <section className="py-20 px-6 lg:px-12" style={{ background: "var(--wf-bg-card)" }}>
        <div className="max-w-[1000px] mx-auto">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="text-xs font-semibold tracking-widest mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#52B788" }}>HOW IT WORKS</p>
              <h2 className="text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "var(--wf-text-1)" }}>Eligibility & How to Apply</h2>
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {steps.map((step, i) => (
              <FadeIn key={step.num} delay={i * 100}>
                <div className="text-center relative">
                  {i < steps.length - 1 && (
                    <div className="absolute top-8 left-1/2 w-full h-0.5 hidden md:block" style={{ background: "var(--wf-border)" }} />
                  )}
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10"
                    style={{ background: "#2D6A4F", color: "white" }}>
                    <span className="font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{step.num}</span>
                  </div>
                  <h3 className="font-semibold mb-2" style={{ color: "var(--wf-text-1)", fontFamily: "'Playfair Display', serif" }}>{step.title}</h3>
                  <p className="text-sm" style={{ color: "var(--wf-text-3)", lineHeight: "1.6" }}>{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn>
            <div className="rounded-2xl p-8" style={{ background: "var(--wf-bg-alt)", border: "1.5px solid var(--wf-border)" }}>
              <h3 className="font-bold text-xl mb-5" style={{ fontFamily: "'Playfair Display', serif", color: "var(--wf-text-1)" }}>Eligibility Requirements</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  "Must be an active or aspiring farmer",
                  "Must reside in Africa or a developing nation",
                  "Valid government-issued identification",
                  "Demonstration of financial need",
                  "Commitment to complete the scholarship program",
                  "Age 18 and above",
                  "No prior Wise Farmer scholarship in the last 2 years",
                  "Written statement of farming goals",
                ].map(req => (
                  <div key={req} className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} style={{ color: "#2D6A4F", flexShrink: 0, marginTop: "3px" }} />
                    <p className="text-sm" style={{ color: "var(--wf-text-2)" }}>{req}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* APPLICATION FORM */}
      <section id="apply" className="py-20 px-6 lg:px-12" style={{ background: "var(--wf-bg-alt)" }}>
        <div className="max-w-[700px] mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-xs font-semibold tracking-widest mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#52B788" }}>APPLY NOW</p>
              <h2 className="text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "var(--wf-text-1)" }}>Start Your Application</h2>
            </div>
            <div className="rounded-2xl p-8 lg:p-10" style={{ background: "var(--wf-bg-card)", boxShadow: "0 8px 40px rgba(0,0,0,0.08)" }}>
              <ApplicationForm />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* PAST RECIPIENTS */}
      <section className="py-20 px-6 lg:px-12" style={{ background: "var(--wf-bg-card)" }}>
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-xs font-semibold tracking-widest mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#52B788" }}>SUCCESS STORIES</p>
              <h2 className="text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "var(--wf-text-1)" }}>Past Scholarship Recipients</h2>
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {recipients.map((r, i) => (
              <FadeIn key={r.name} delay={i * 100}>
                <div className="rounded-2xl p-6" style={{ background: "var(--wf-bg-alt)", boxShadow: "var(--wf-card-shadow)", border: "1.5px solid var(--wf-border)" }}>
                  <img src={r.img} alt={r.name} className="w-16 h-16 rounded-full object-cover mb-4 border-4" style={{ borderColor: "#D4A017" }} />
                  <p className="text-sm font-bold mb-0.5" style={{ color: "var(--wf-text-1)" }}>{r.name}</p>
                  <p className="text-xs mb-1" style={{ color: "var(--wf-text-4)" }}>{r.location}</p>
                  <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium mb-4" style={{ background: "var(--wf-bg-alt)", color: "#2D6A4F", fontFamily: "'Space Grotesk', sans-serif" }}>{r.scholarship}</span>
                  <p className="text-sm italic" style={{ color: "var(--wf-text-3)", lineHeight: "1.7" }}>"{r.quote}"</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}