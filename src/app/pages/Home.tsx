import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router";
import {
  BookOpen, Cpu, Globe, Users, ChevronLeft, ChevronRight,
  ChevronDown, ArrowRight, Award, Clock
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

// ── Animated counter ──────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 2000;
        const steps = 60;
        let step = 0;
        const timer = setInterval(() => {
          step++;
          setCount(Math.round((target * step) / steps));
          if (step >= steps) clearInterval(timer);
        }, duration / steps);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ── Fade-in on scroll ─────────────────────────────────────────────────────────
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
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ── Marquee ───────────────────────────────────────────────────────────────────
function Marquee() {
  const items = ["Sustainable Agriculture", "Agri-Tech Innovation", "Global Market Access", "Expert Consulting", "Scholarships for Farmers", "Online Courses", "Live Webinars"];
  return (
    <div className="overflow-hidden py-4" style={{ background: "#6B4226" }}>
      <div className="flex animate-[marquee_30s_linear_infinite] whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="mx-6 text-sm font-medium" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#D4A017" }}>
            {item} <span className="mx-4 opacity-50">·</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </div>
  );
}

// ── Countdown Timer ───────────────────────────────────────────────────────────
function Countdown({ targetDate }: { targetDate: Date }) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const update = () => {
      const diff = Math.max(0, targetDate.getTime() - Date.now());
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return (
    <div className="flex gap-4 mt-4">
      {Object.entries(time).map(([label, val]) => (
        <div key={label} className="text-center">
          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl font-bold"
            style={{ background: "rgba(212,160,23,0.15)", fontFamily: "'Playfair Display', serif", color: "#D4A017", border: "1px solid rgba(212,160,23,0.3)" }}
          >
            {String(val).padStart(2, "0")}
          </div>
          <div className="text-xs uppercase tracking-widest mt-1.5" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#B7E4C7" }}>
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Hero Carousel Slides ──────────────────────────────────────────────────────
const heroSlides = [
  {
    img: "https://images.unsplash.com/photo-1564847903404-82bbb340986b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400",
    badge: "EMPOWERING AFRICAN AGRICULTURE",
    headline: "Cultivating Growth.\nNurturing Knowledge.",
    sub: "We educate, equip, and connect farmers with the tools, technology, and markets they need to thrive — sustainably.",
    cta1: { label: "Explore Academy", to: "/academy" },
    cta2: { label: "Browse Our Shop", to: "/shop" },
  },
  {
    img: "https://images.unsplash.com/photo-1772480584751-7f43d45b4bad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400",
    badge: "PRECISION AGRICULTURE",
    headline: "Modern Farming\nFor Maximum Yield.",
    sub: "Leverage drone technology, smart irrigation, and data-driven insights to transform your farm's productivity.",
    cta1: { label: "View Courses", to: "/academy" },
    cta2: { label: "Learn More", to: "/about-us" },
  },
  {
    img: "https://images.unsplash.com/photo-1677317251569-e1e65a311bdd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400",
    badge: "GLOBAL MARKET ACCESS",
    headline: "Connect Your Farm\nTo the World.",
    sub: "Our Farmers Market bridges the gap between local growers and international buyers, opening doors to new opportunities.",
    cta1: { label: "Visit the Market", to: "/shop" },
    cta2: { label: "Get Consulting", to: "/contact" },
  },
  {
    img: "https://images.unsplash.com/photo-1738598665698-7fd7af4b5e0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400",
    badge: "SCHOLARSHIPS & SUPPORT",
    headline: "We Invest in\nYour Future.",
    sub: "Scholarships, mentorship, and expert consulting — everything you need to build a thriving agricultural business.",
    cta1: { label: "Apply for Scholarship", to: "/scholarships" },
    cta2: { label: "View Webinars", to: "/webinars" },
  },
];

// ── Data ──────────────────────────────────────────────────────────────────────
const services = [
  {
    icon: BookOpen,
    title: "Education",
    desc: "Research-backed short courses, blog articles, and downloadable guides designed for every farming level.",
    img: "https://images.unsplash.com/photo-1656250444213-6baf45417252?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    link: "/academy",
  },
  {
    icon: Cpu,
    title: "Improved Technologies",
    desc: "Drones, precision agriculture tools, smart irrigation systems, and cutting-edge agri-tech resources.",
    img: "https://images.unsplash.com/photo-1677126577258-1a82fdf1a976?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    link: "/academy",
  },
  {
    icon: Globe,
    title: "Global Market Reach",
    desc: "Our Farmers Market connects growers directly to international buyers, opening doors worldwide.",
    img: "https://images.unsplash.com/photo-1641470787994-3f4dfd90d7d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    link: "/shop",
  },
  {
    icon: Users,
    title: "Consulting",
    desc: "One-on-one expert guidance and agribusiness strategy to help you maximize your farm's potential.",
    img: "https://images.unsplash.com/photo-1723540561412-002d352416f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    link: "/contact",
  },
];

const courses = [
  {
    img: "https://images.unsplash.com/photo-1696699639395-7db15be800fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500",
    tag: "Agribusiness",
    title: "Ginger Value Chain Mastery",
    instructor: "Dr. Rufus Akinrinlola",
    duration: "6 weeks",
    price: "$49",
    free: false,
  },
  {
    img: "https://images.unsplash.com/photo-1738598665698-7fd7af4b5e0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500",
    tag: "Technology",
    title: "Precision Agriculture & Smart Irrigation",
    instructor: "Dr. Rufus Akinrinlola",
    duration: "4 weeks",
    price: "Free",
    free: true,
  },
  {
    img: "https://images.unsplash.com/photo-1526930382372-67bf22c0fce2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500",
    tag: "Crop Science",
    title: "Integrated Pest Management",
    instructor: "Dr. Rufus Akinrinlola",
    duration: "5 weeks",
    price: "$35",
    free: false,
  },
];

const blogPosts = [
  {
    img: "https://images.unsplash.com/photo-1664436938770-770d7c76d286?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    cat: "Agribusiness",
    title: "How to Increase Ginger Profits by 500% Through Value Addition",
    author: "Dr. Rufus Akinrinlola",
    authorImg: "https://images.unsplash.com/photo-1769071167455-e5779ecc81a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=60",
    date: "March 8, 2026",
    excerpt: "Value addition transforms raw ginger into premium products like dried flakes, powder, and essential oils — dramatically increasing farmer margins and market access.",
    featured: true,
  },
  {
    img: "https://images.unsplash.com/photo-1768113802385-59b5bb8e8c34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    cat: "Sustainability",
    title: "5 Sustainable Farming Practices Every Smallholder Should Adopt",
    author: "Samuel Ajasa",
    authorImg: "https://images.unsplash.com/photo-1703059680709-d9554370fff9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=60",
    date: "March 2, 2026",
    excerpt: "From mulching to composting, these practices reduce input costs while improving soil health and long-term yield.",
  },
  {
    img: "https://images.unsplash.com/photo-1589292144899-2f43a71a1b2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    cat: "Technology",
    title: "Drone Technology: What African Farmers Need to Know in 2026",
    author: "Dr. Rufus Akinrinlola",
    authorImg: "https://images.unsplash.com/photo-1769071167455-e5779ecc81a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=60",
    date: "Feb 24, 2026",
    excerpt: "Drone adoption is accelerating across African farms. Here's how to get started, what drones cost, and which use cases deliver the highest ROI.",
  },
  {
    img: "https://images.unsplash.com/photo-1605362719071-92da93e75814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    cat: "Market Access",
    title: "Accessing International Buyers: A Step-by-Step Guide",
    author: "Samuel Ajasa",
    authorImg: "https://images.unsplash.com/photo-1703059680709-d9554370fff9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=60",
    date: "Feb 15, 2026",
    excerpt: "Connecting with global buyers doesn't require a large budget. Learn the platforms, certifications, and strategies that work.",
  },
];

const testimonials = [
  {
    quote: "Wise Farmer completely transformed my approach to ginger cultivation. After completing the value chain course, I tripled my income in just one season.",
    name: "David Adekunle",
    role: "Ginger Farmer, Kaduna State, Nigeria",
    img: "https://images.unsplash.com/photo-1769071167455-e5779ecc81a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
  },
  {
    quote: "The precision agriculture module helped me reduce my water usage by 40% while actually increasing my crop yield. This is exactly the kind of practical knowledge we need.",
    name: "Jessica Owusu",
    role: "Vegetable Farmer, Accra, Ghana",
    img: "https://images.unsplash.com/photo-1605362719071-92da93e75814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
  },
  {
    quote: "I applied for the Seedling Scholarship and was accepted. Now I'm running a profitable poultry operation thanks to the business planning modules.",
    name: "Samuel Nwosu",
    role: "Poultry Farmer, Enugu, Nigeria",
    img: "https://images.unsplash.com/photo-1703059680709-d9554370fff9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
  },
  {
    quote: "The consulting session was worth every penny. Dr. Rufus helped me identify exactly where I was losing money and gave me a clear roadmap to profitability.",
    name: "Amina Diallo",
    role: "Smallholder Farmer, Dakar, Senegal",
    img: "https://images.unsplash.com/photo-1627829380497-49c37b769ea6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
  },
  {
    quote: "The webinars are incredibly well-organized. I learned more in a 2-hour session than I did in months of self-study. Highly recommend for any serious farmer.",
    name: "Emmanuel Kariuki",
    role: "Coffee Farmer, Nairobi, Kenya",
    img: "https://images.unsplash.com/photo-1564847903404-82bbb340986b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
  },
];

const faqs = [
  { q: "What is Wise Farmer?", a: "Wise Farmer is an agri-tech education and empowerment platform that equips farmers with sustainable practices, cutting-edge technologies, online courses, global market access, webinars, scholarships, and expert consulting." },
  { q: "How do I enroll in a course?", a: "Simply visit the Academy page, browse our course catalog, and click 'Enroll Now' on any course. You can pay securely online and start learning immediately." },
  { q: "Are the courses self-paced?", a: "Yes! All our courses are self-paced, meaning you can learn on your own schedule. Once enrolled, you have lifetime access to course materials." },
  { q: "How do I access the Farmers Market?", a: "After creating a free account, navigate to the Shop/Farmers Market section. Sellers can list their produce after verification, and buyers can browse and connect directly with farmers." },
  { q: "Are your courses internationally recognized?", a: "Our certificates are recognized by partner institutions and can strengthen your professional profile. We are actively working towards formal international accreditation." },
  { q: "Do you offer scholarships?", a: "Yes! We offer three scholarship tiers: Seedling, Growth, and Harvest — each designed for different farming levels and needs. Visit our Scholarships page to apply." },
  { q: "How can I contact an expert consultant?", a: "You can book a one-on-one consulting session through our Contact page or by clicking 'Book a Consultation' in the navigation menu." },
  { q: "Is Wise Farmer available outside Africa?", a: "Absolutely! While we are rooted in the African agricultural context, our courses, webinars, and market tools are available to farmers worldwide." },
];

// ── Main Component ─────────────────────────────────────────────────────────────
export function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [activeHero, setActiveHero] = useState(0);
  const [heroKey, setHeroKey] = useState(0); // forces re-animation on slide change

  useEffect(() => {
    document.title = "Home | Wise Farmer";
  }, []);

  // Hero carousel
  const [heroRef, heroApi] = useEmblaCarousel({ loop: true });

  const onHeroSelect = useCallback(() => {
    if (!heroApi) return;
    setActiveHero(heroApi.selectedScrollSnap());
    setHeroKey((k) => k + 1);
  }, [heroApi]);

  useEffect(() => {
    if (!heroApi) return;
    heroApi.on("select", onHeroSelect);
    return () => { heroApi.off("select", onHeroSelect); };
  }, [heroApi, onHeroSelect]);

  // Auto-advance hero slides
  useEffect(() => {
    if (!heroApi) return;
    const id = setInterval(() => heroApi.scrollNext(), 5000);
    return () => clearInterval(id);
  }, [heroApi]);

  const scrollHeroPrev = useCallback(() => heroApi?.scrollPrev(), [heroApi]);
  const scrollHeroNext = useCallback(() => heroApi?.scrollNext(), [heroApi]);

  // Testimonial carousel
  const [testimRef, testimApi] = useEmblaCarousel({ loop: true });
  const [activeTestim, setActiveTestim] = useState(0);

  useEffect(() => {
    if (!testimApi) return;
    const onSelect = () => setActiveTestim(testimApi.selectedScrollSnap());
    testimApi.on("select", onSelect);
    return () => { testimApi.off("select", onSelect); };
  }, [testimApi]);

  // Auto-advance testimonials
  useEffect(() => {
    const id = setInterval(() => {
      testimApi?.scrollNext();
    }, 6000);
    return () => clearInterval(id);
  }, [testimApi]);

  const webinarDate = new Date("2026-04-15T10:00:00");

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── HERO CAROUSEL ────────────────────────────────────────────────── */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Embla Viewport */}
        <div ref={heroRef} className="absolute inset-0 overflow-hidden">
          <div className="flex h-full" style={{ backfaceVisibility: "hidden" }}>
            {heroSlides.map((slide, i) => (
              <div key={i} className="relative min-w-full h-full flex-shrink-0">
                <img
                  src={slide.img}
                  alt={slide.headline}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.1) 100%)" }} />
              </div>
            ))}
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 min-h-screen flex items-center pt-[72px]">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12 w-full py-16">
            <div className="max-w-[600px]">
              {/* Animated text block — re-mounts on slide change */}
              <div
                key={heroKey}
                style={{
                  animation: "heroSlideIn 0.6s ease forwards",
                }}
              >
                {/* Badge */}
                <div
                  className="inline-block px-3 py-1.5 rounded-full text-xs font-semibold tracking-widest mb-6"
                  style={{ background: "rgba(212,160,23,0.25)", color: "#D4A017", fontFamily: "'Space Grotesk', sans-serif", backdropFilter: "blur(8px)" }}
                >
                  {heroSlides[activeHero].badge}
                </div>
                <h1
                  className="mb-6"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: "#F4F9F4",
                    fontSize: "clamp(2.4rem, 4.5vw, 5rem)",
                    fontWeight: 700,
                    lineHeight: 1.12,
                    textShadow: "0 2px 20px rgba(0,0,0,0.3)",
                    whiteSpace: "pre-line",
                  }}
                >
                  {heroSlides[activeHero].headline}
                </h1>
                <p className="mb-10 text-lg" style={{ color: "rgba(255,255,255,0.85)", lineHeight: "1.7", maxWidth: "480px", textShadow: "0 1px 8px rgba(0,0,0,0.3)" }}>
                  {heroSlides[activeHero].sub}
                </p>
                <div className="flex flex-wrap gap-4 mb-16">
                  <Link
                    to={heroSlides[activeHero].cta1.to}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-[1.03] hover:shadow-xl"
                    style={{ background: "#D4A017", color: "#1A1A1A", fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {heroSlides[activeHero].cta1.label} <ArrowRight size={16} />
                  </Link>
                  <Link
                    to={heroSlides[activeHero].cta2.to}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-200 hover:bg-white/15 border"
                    style={{ borderColor: "rgba(255,255,255,0.5)", color: "white", fontFamily: "'Space Grotesk', sans-serif", backdropFilter: "blur(8px)" }}
                  >
                    {heroSlides[activeHero].cta2.label}
                  </Link>
                </div>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8">
                {[
                  { value: 500, suffix: "+", label: "Farmers Trained" },
                  { value: 12, suffix: "+", label: "Courses Available" },
                  { value: 5, suffix: "", label: "Countries Reached" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "#D4A017" }}>
                      <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'Space Grotesk', sans-serif" }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={scrollHeroPrev}
          className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{ background: "rgba(255,255,255,0.15)", color: "white", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.25)" }}
        >
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={scrollHeroNext}
          className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{ background: "rgba(255,255,255,0.15)", color: "white", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.25)" }}
        >
          <ChevronRight size={22} />
        </button>

        {/* Slide dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => heroApi?.scrollTo(i)}
              className="transition-all duration-300 rounded-full"
              style={{
                width: i === activeHero ? "28px" : "8px",
                height: "8px",
                background: i === activeHero ? "#D4A017" : "rgba(255,255,255,0.5)",
              }}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-8 lg:right-12 z-20 hidden lg:flex flex-col items-center gap-2">
          <div className="text-xs tracking-widest" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Space Grotesk', sans-serif", writingMode: "vertical-rl" }}>SCROLL</div>
          <div className="w-px h-12 animate-pulse" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)" }} />
        </div>
      </section>

      <style>{`
        @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @keyframes heroSlideIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* ── MARQUEE ───────────────────────────────────────────────────────── */}
      <Marquee />

      {/* ── VISION & MISSION ──────────────────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-12" style={{ background: "var(--wf-bg-alt)" }}>
        <div className="max-w-[1440px] mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-xs font-semibold tracking-widest mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#52B788" }}>
                OUR PURPOSE
              </p>
              <h2 className="text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "var(--wf-text-1)" }}>
                Why We Exist
              </h2>
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-6">
            <FadeIn delay={100}>
              <div className="relative rounded-2xl p-10 overflow-hidden h-full" style={{ background: "#2D6A4F" }}>
                <div className="absolute top-4 left-8 text-[120px] leading-none font-bold opacity-10 select-none"
                  style={{ fontFamily: "'Playfair Display', serif", color: "white" }}>"</div>
                <div className="relative z-10">
                  <span className="text-xs font-semibold tracking-widest block mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#52B788" }}>OUR VISION</span>
                  <p className="text-2xl font-semibold leading-relaxed" style={{ fontFamily: "'Playfair Display', serif", color: "white" }}>
                    To maximize farmers' outputs from their minimum inputs.
                  </p>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={200}>
              <div className="relative rounded-2xl p-10 overflow-hidden h-full" style={{ background: "#D4A017" }}>
                <div className="absolute top-4 left-8 text-[120px] leading-none font-bold opacity-10 select-none"
                  style={{ fontFamily: "'Playfair Display', serif", color: "#6B4226" }}>"</div>
                <div className="relative z-10">
                  <span className="text-xs font-semibold tracking-widest block mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#6B4226" }}>OUR MISSION</span>
                  <p className="text-2xl font-semibold leading-relaxed" style={{ fontFamily: "'Playfair Display', serif", color: "#1A1A1A" }}>
                    To empower farmers with knowledge and technologies that optimize resources, connect them to global markets, and foster economic and environmental sustainability.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── SERVICES ──────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-12" style={{ background: "var(--wf-bg-card)" }}>
        <div className="max-w-[1440px] mx-auto">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="text-xs font-semibold tracking-widest mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#52B788" }}>
                WHAT WE OFFER
              </p>
              <h2 className="text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "var(--wf-text-1)" }}>
                Everything a Modern Farmer Needs
              </h2>
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((svc, i) => (
              <FadeIn key={svc.title} delay={i * 100}>
                <div
                  className="group rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1"
                  style={{ boxShadow: "var(--wf-card-shadow)", background: "var(--wf-bg-card)", border: "1px solid var(--wf-border-2)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "var(--wf-card-shadow-hover)")}
                  onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "var(--wf-card-shadow)")}
                >
                  <div className="overflow-hidden h-48">
                    <img
                      src={svc.img}
                      alt={svc.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: "var(--wf-bg-alt)" }}>
                      <svc.icon size={20} style={{ color: "#2D6A4F" }} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: "var(--wf-text-1)" }}>{svc.title}</h3>
                    <p className="text-sm mb-4" style={{ color: "var(--wf-text-3)", lineHeight: "1.7" }}>{svc.desc}</p>
                    <Link to={svc.link} className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all hover:gap-2.5"
                      style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#2D6A4F" }}>
                      Learn More <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED COURSES ──────────────────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-12" style={{ background: "#2D6A4F" }}>
        <div className="max-w-[1440px] mx-auto">
          <FadeIn>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
              <div>
                <p className="text-xs font-semibold tracking-widest mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#52B788" }}>
                  WISE FARMER ACADEMY
                </p>
                <h2 className="text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "#F4F9F4" }}>
                  Learn at the Wise Farmer Academy
                </h2>
              </div>
              <Link to="/academy" className="inline-flex items-center gap-2 text-sm font-semibold whitespace-nowrap transition-colors hover:text-white"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#D4A017" }}>
                View All Courses <ArrowRight size={16} />
              </Link>
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {courses.map((course, i) => (
              <FadeIn key={course.title} delay={i * 100}>
                <div className="rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1" style={{ background: "#1F5440" }}>
                  <div className="relative overflow-hidden h-48">
                    <img src={course.img} alt={course.title} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: "#D4A017", color: "#1A1A1A", fontFamily: "'Space Grotesk', sans-serif" }}>
                        {course.tag}
                      </span>
                    </div>
                    {course.free && (
                      <div className="absolute top-3 right-3">
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: "#52B788", color: "white", fontFamily: "'Space Grotesk', sans-serif" }}>
                          FREE
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: "#F4F9F4" }}>{course.title}</h3>
                    <p className="text-sm mb-4" style={{ color: "#B7E4C7" }}>{course.instructor}</p>
                    <div className="flex items-center justify-between mb-5">
                      <span className="flex items-center gap-1.5 text-xs" style={{ color: "#52B788", fontFamily: "'Space Grotesk', sans-serif" }}>
                        <Clock size={13} /> {course.duration}
                      </span>
                      <span className="font-semibold" style={{ color: course.free ? "#52B788" : "#D4A017", fontFamily: "'Space Grotesk', sans-serif" }}>
                        {course.price}
                      </span>
                    </div>
                    <Link
                      to="/academy"
                      className="block w-full text-center py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90"
                      style={{ background: "#D4A017", color: "#1A1A1A", fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      Enroll Now
                    </Link>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOG ──────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-12" style={{ background: "var(--wf-bg-alt)" }}>
        <div className="max-w-[1440px] mx-auto">
          <FadeIn>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
              <div>
                <p className="text-xs font-semibold tracking-widest mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#52B788" }}>
                  KNOWLEDGE HUB
                </p>
                <h2 className="text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "var(--wf-text-1)" }}>
                  Let's Learn Together
                </h2>
              </div>
              <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-semibold whitespace-nowrap"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#2D6A4F" }}>
                Visit the Blog <ArrowRight size={16} />
              </Link>
            </div>
          </FadeIn>

          {/* Featured post */}
          <FadeIn>
            <div className="grid lg:grid-cols-2 rounded-2xl overflow-hidden mb-8 group cursor-pointer"
              style={{ boxShadow: "var(--wf-card-shadow-hover)" }}>
              <div className="overflow-hidden h-64 lg:h-auto">
                <img src={blogPosts[0].img} alt={blogPosts[0].title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              </div>
              <div className="p-10 flex flex-col justify-center" style={{ background: "var(--wf-bg-card)" }}>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
                  style={{ background: "var(--wf-bg-alt)", color: "#2D6A4F", fontFamily: "'Space Grotesk', sans-serif" }}>
                  {blogPosts[0].cat}
                </span>
                <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "var(--wf-text-1)" }}>
                  {blogPosts[0].title}
                </h3>
                <p className="text-sm mb-6" style={{ color: "var(--wf-text-3)", lineHeight: "1.7" }}>{blogPosts[0].excerpt}</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <img src={blogPosts[0].authorImg} alt={blogPosts[0].author} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold" style={{ color: "var(--wf-text-1)", fontFamily: "'Space Grotesk', sans-serif" }}>{blogPosts[0].author}</p>
                    <p className="text-xs" style={{ color: "var(--wf-text-4)" }}>{blogPosts[0].date}</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {blogPosts.slice(1).map((post, i) => (
              <FadeIn key={post.title} delay={i * 100}>
                <div className="group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                  style={{ boxShadow: "var(--wf-card-shadow)", background: "var(--wf-bg-card)", border: "1px solid var(--wf-border-2)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "var(--wf-card-shadow-hover)")}
                  onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "var(--wf-card-shadow)")}
                >
                  <div className="overflow-hidden h-44">
                    <img src={post.img} alt={post.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold mb-3"
                      style={{ background: "var(--wf-bg-alt)", color: "#2D6A4F", fontFamily: "'Space Grotesk', sans-serif" }}>
                      {post.cat}
                    </span>
                    <h3 className="text-base font-semibold mb-3" style={{ fontFamily: "'Playfair Display', serif", color: "var(--wf-text-1)" }}>{post.title}</h3>
                    <p className="text-sm mb-4 line-clamp-2" style={{ color: "var(--wf-text-3)", lineHeight: "1.7" }}>{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold" style={{ color: "var(--wf-text-1)" }}>{post.author}</p>
                        <p className="text-xs" style={{ color: "var(--wf-text-4)" }}>{post.date}</p>
                      </div>
                      <Link to="/blog" className="text-xs font-semibold inline-flex items-center gap-1 transition-all hover:gap-2"
                        style={{ color: "#2D6A4F", fontFamily: "'Space Grotesk', sans-serif" }}>
                        Read <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS (EMBLA CAROUSEL) ─────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-12 relative overflow-hidden" style={{ background: "#1A1A1A" }}>
        {/* Blob */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-10"
          style={{ background: "#2D6A4F", filter: "blur(80px)" }} />

        <div className="max-w-[1000px] mx-auto relative">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-xs font-semibold tracking-widest mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#52B788" }}>
                TESTIMONIALS
              </p>
              <h2 className="text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "#F4F9F4" }}>
                What Farmers Are Saying
              </h2>
            </div>
          </FadeIn>

          {/* Embla testimonial carousel */}
          <div ref={testimRef} className="overflow-hidden">
            <div className="flex">
              {testimonials.map((t, i) => (
                <div key={i} className="min-w-full px-4">
                  <div className="text-center">
                    <div className="text-7xl leading-none mb-4 select-none" style={{ color: "#2D6A4F", fontFamily: "'Playfair Display', serif" }}>"</div>
                    <p className="text-xl leading-relaxed mb-10 max-w-[700px] mx-auto"
                      style={{ color: "#E5E7EB", fontFamily: "'Playfair Display', serif" }}>
                      {t.quote}
                    </p>
                    <div className="flex items-center justify-center gap-4">
                      <img
                        src={t.img}
                        alt={t.name}
                        className="w-14 h-14 rounded-full object-cover border-2"
                        style={{ borderColor: "#D4A017" }}
                      />
                      <div className="text-left">
                        <p className="font-semibold" style={{ color: "#F4F9F4", fontFamily: "'Space Grotesk', sans-serif" }}>{t.name}</p>
                        <p className="text-sm" style={{ color: "#9CA3AF" }}>{t.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-10">
            <button
              onClick={() => testimApi?.scrollPrev()}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 hover:border-white"
              style={{ border: "1.5px solid #374151", color: "#9CA3AF" }}
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => testimApi?.scrollTo(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === activeTestim ? "24px" : "8px",
                    height: "8px",
                    background: i === activeTestim ? "#D4A017" : "#374151",
                  }}
                />
              ))}
            </div>
            <button
              onClick={() => testimApi?.scrollNext()}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 hover:border-white"
              style={{ border: "1.5px solid #374151", color: "#9CA3AF" }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* ── WEBINAR CTA ───────────────────────────────────────────────────── */}
      <section className="relative py-20 px-6 lg:px-12 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1758874384555-de68b8035c24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400"
          alt="Webinar"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(45,106,79,0.92) 0%, rgba(26,26,26,0.85) 100%)" }} />
        <div className="relative max-w-[800px] mx-auto text-center">
          <FadeIn>
            <p className="text-xs font-semibold tracking-widest mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#52B788" }}>
              UPCOMING EVENT
            </p>
            <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "#F4F9F4" }}>
              Join Our Next Expert Webinar
            </h2>
            <p className="text-lg mb-4" style={{ color: "#B7E4C7" }}>
              "Unlocking Agribusiness Profits in 2026" — Live, interactive session with Dr. Rufus Akinrinlola
            </p>
            <p className="text-sm mb-2" style={{ color: "#D4A017", fontFamily: "'Space Grotesk', sans-serif" }}>April 15, 2026 · 10:00 AM WAT</p>
            <Countdown targetDate={webinarDate} />
            <Link
              to="/webinars"
              className="inline-flex items-center gap-2 mt-8 px-8 py-4 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
              style={{ background: "#D4A017", color: "#1A1A1A", fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Reserve My Spot <ArrowRight size={16} />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section id="faq" className="py-20 px-6 lg:px-12" style={{ background: "var(--wf-bg-card)" }}>
        <div className="max-w-[800px] mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-xs font-semibold tracking-widest mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#52B788" }}>
                FAQ
              </p>
              <h2 className="text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "var(--wf-text-1)" }}>
                Got Questions? We've Got Answers.
              </h2>
            </div>
          </FadeIn>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FadeIn key={i} delay={i * 50}>
                <div
                  className="rounded-xl overflow-hidden border transition-all duration-200"
                  style={{ borderColor: openFaq === i ? "#52B788" : "var(--wf-border)", background: "var(--wf-bg-card)" }}
                >
                  <button
                    className="w-full flex items-center justify-between px-6 py-5 text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="font-semibold pr-4" style={{ fontFamily: "'Inter', sans-serif", color: "var(--wf-text-1)" }}>{faq.q}</span>
                    <ChevronDown
                      size={18}
                      style={{
                        color: "#2D6A4F",
                        transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.3s",
                        flexShrink: 0,
                      }}
                    />
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-300"
                    style={{ maxHeight: openFaq === i ? "200px" : "0" }}
                  >
                    <div className="px-6 pb-5">
                      <p className="text-sm" style={{ color: "var(--wf-text-3)", lineHeight: "1.7" }}>{faq.a}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-12" style={{ background: "var(--wf-bg-alt)" }}>
        <div className="max-w-[1440px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <img
                src="https://images.unsplash.com/photo-1589292144899-2f43a71a1b2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=700"
                alt="Farmer with tablet in field"
                className="w-full h-80 object-cover rounded-2xl"
                style={{ boxShadow: "0 16px 48px rgba(0,0,0,0.12)" }}
              />
            </FadeIn>
            <FadeIn delay={100}>
              <div>
                <p className="text-xs font-semibold tracking-widest mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#52B788" }}>
                  NEWSLETTER
                </p>
                <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "var(--wf-text-1)" }}>
                  Get Weekly Farming Insights — Free
                </h2>
                <p className="mb-8" style={{ color: "var(--wf-text-3)", lineHeight: "1.7" }}>
                  Join 2,000+ farmers receiving expert tips, market updates, and new course alerts every week.
                </p>
                {newsletterSubmitted ? (
                  <div className="flex items-center gap-3 p-5 rounded-xl" style={{ background: "var(--wf-bg-alt)", border: "1.5px solid #52B788" }}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#52B788" }}>
                      <Award size={20} color="white" />
                    </div>
                    <div>
                      <p className="font-semibold" style={{ color: "#2D6A4F" }}>You're in! 🎉</p>
                      <p className="text-sm" style={{ color: "var(--wf-text-3)" }}>Your first insights arrive next week.</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); if (newsletterEmail) setNewsletterSubmitted(true); }} className="space-y-4">
                    <div className="flex gap-3">
                      <input
                        type="email"
                        placeholder="Enter your email address"
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        className="flex-1 px-5 py-4 rounded-xl border outline-none focus:border-[#52B788] transition-colors"
                        style={{ borderColor: "var(--wf-border)", fontFamily: "'Inter', sans-serif", background: "var(--wf-bg-input)", color: "var(--wf-text-1)" }}
                        required
                      />
                      <button
                        type="submit"
                        className="px-6 py-4 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90 hover:scale-[1.02] whitespace-nowrap"
                        style={{ background: "#2D6A4F", color: "white", fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        Subscribe Now
                      </button>
                    </div>
                    <p className="text-xs" style={{ color: "var(--wf-text-4)" }}>No spam. Unsubscribe anytime. 🔒</p>
                  </form>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}