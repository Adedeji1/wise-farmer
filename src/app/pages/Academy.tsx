import { useRef, useState, useEffect } from "react";
import { Link } from "react-router";
import { Search, Star, Clock, Users, Award, ArrowRight, BookOpen, CheckCircle2 } from "lucide-react";

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

const stats = [
  { value: "12+", label: "Courses" },
  { value: "500+", label: "Students" },
  { value: "Expert", label: "Instructors" },
  { value: "Certified", label: "Completion" },
];

const filterTags = ["All", "Agribusiness", "Crop Science", "Technology", "Marketing", "Free"];

const courses = [
  { img: "https://images.unsplash.com/photo-1696699639395-7db15be800fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500", tag: "Agribusiness", title: "Ginger Value Chain Mastery", instructor: "Dr. Rufus Akinrinlola", price: "$49", free: false, rating: 4.9, students: 142, duration: "6 weeks", level: "Intermediate" },
  { img: "https://images.unsplash.com/photo-1738598665698-7fd7af4b5e0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500", tag: "Technology", title: "Precision Agriculture & Smart Irrigation", instructor: "Dr. Rufus Akinrinlola", price: "Free", free: true, rating: 4.8, students: 213, duration: "4 weeks", level: "Beginner" },
  { img: "https://images.unsplash.com/photo-1526930382372-67bf22c0fce2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500", tag: "Crop Science", title: "Integrated Pest Management", instructor: "Dr. Rufus Akinrinlola", price: "$35", free: false, rating: 4.7, students: 98, duration: "5 weeks", level: "Intermediate" },
  { img: "https://images.unsplash.com/photo-1664436938770-770d7c76d286?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500", tag: "Agribusiness", title: "Farm Business Planning & Finance", instructor: "Dr. Rufus Akinrinlola", price: "$55", free: false, rating: 4.9, students: 76, duration: "8 weeks", level: "Advanced" },
  { img: "https://images.unsplash.com/photo-1677126577258-1a82fdf1a976?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500", tag: "Technology", title: "Drone Applications in Modern Farming", instructor: "Samuel Ajasa", price: "$40", free: false, rating: 4.6, students: 54, duration: "3 weeks", level: "Beginner" },
  { img: "https://images.unsplash.com/photo-1609168172263-45c6d202007a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500", tag: "Crop Science", title: "Soil Health & Fertility Management", instructor: "Dr. Rufus Akinrinlola", price: "Free", free: true, rating: 4.8, students: 187, duration: "3 weeks", level: "Beginner" },
  { img: "https://images.unsplash.com/photo-1641470787994-3f4dfd90d7d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500", tag: "Marketing", title: "Agri-Marketing & Export Readiness", instructor: "Dr. Rufus Akinrinlola", price: "$45", free: false, rating: 4.7, students: 63, duration: "4 weeks", level: "Intermediate" },
  { img: "https://images.unsplash.com/photo-1585643099545-cd6cad20b7b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500", tag: "Agribusiness", title: "Greenhouse Farming for Profit", instructor: "Samuel Ajasa", price: "$39", free: false, rating: 4.5, students: 45, duration: "5 weeks", level: "Beginner" },
  { img: "https://images.unsplash.com/photo-1768113802385-59b5bb8e8c34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500", tag: "Crop Science", title: "Organic Farming Certification Prep", instructor: "Dr. Rufus Akinrinlola", price: "$60", free: false, rating: 4.9, students: 31, duration: "10 weeks", level: "Advanced" },
  { img: "https://images.unsplash.com/photo-1723540561412-002d352416f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500", tag: "Marketing", title: "Digital Marketing for Farmers", instructor: "Samuel Ajasa", price: "Free", free: true, rating: 4.6, students: 156, duration: "2 weeks", level: "Beginner" },
  { img: "https://images.unsplash.com/photo-1727036195413-073768b3c147?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500", tag: "Technology", title: "Farm Mechanization & Equipment", instructor: "Dr. Rufus Akinrinlola", price: "$35", free: false, rating: 4.5, students: 42, duration: "4 weeks", level: "Intermediate" },
  { img: "https://images.unsplash.com/photo-1656250444213-6baf45417252?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500", tag: "Agribusiness", title: "Poultry Production for Agripreneurs", instructor: "Samuel Ajasa", price: "$30", free: false, rating: 4.7, students: 89, duration: "3 weeks", level: "Beginner" },
];

const learningPaths = [
  { level: "Beginner", color: "#52B788", courses: ["Soil Health & Fertility Management", "Precision Agriculture Intro", "Digital Marketing Basics"] },
  { level: "Intermediate", color: "#D4A017", courses: ["Integrated Pest Management", "Agri-Marketing & Export", "Ginger Value Chain"] },
  { level: "Advanced", color: "#2D6A4F", courses: ["Farm Business Planning", "Organic Certification", "Export Market Access"] },
];

const successStories = [
  {
    name: "Amina Diallo",
    location: "Senegal",
    img: "https://images.unsplash.com/photo-1627829380497-49c37b769ea6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
    before: "I was selling raw produce at local markets with razor-thin margins and no idea how to grow.",
    after: "After the Value Chain course, I now process and export dried ginger to Europe, earning 4x more per harvest.",
  },
  {
    name: "Emmanuel Kariuki",
    location: "Kenya",
    img: "https://images.unsplash.com/photo-1605362719071-92da93e75814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
    before: "I struggled with crop disease identification and lost nearly 30% of my yield each season.",
    after: "The IPM course gave me the tools to identify and manage pests effectively. My losses dropped to under 5%.",
  },
];

export function Academy() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    document.title = "Academy | Wise Farmer";
  }, []);

  const filtered = courses.filter(c => {
    const matchesFilter = activeFilter === "All" || c.tag === activeFilter || (activeFilter === "Free" && c.free);
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* HERO */}
      <section className="relative py-28 px-6 lg:px-12 overflow-hidden" style={{ background: "#2D6A4F" }}>
        <img
          src="https://images.unsplash.com/photo-1589292144899-2f43a71a1b2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400"
          alt="Farmer with tablet"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' /%3E%3C/svg%3E")` }} />
        <div className="relative max-w-[800px] mx-auto text-center pt-12">
          <p className="text-xs font-semibold tracking-widest mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#52B788" }}>WISE FARMER ACADEMY</p>
          <h1 className="font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif", color: "#F4F9F4", fontSize: "clamp(2.4rem, 5vw, 3.5rem)", lineHeight: 1.15 }}>
            The Wise Farmer Academy
          </h1>
          <p className="text-lg mb-10" style={{ color: "#B7E4C7", lineHeight: "1.7" }}>
            Practical, research-backed courses built for farmers, agripreneurs, and agri-professionals.
          </p>
          {/* Search bar */}
          <div className="relative max-w-[560px] mx-auto mb-8">
            <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2" style={{ color: "#9CA3AF" }} />
            <input
              type="text"
              placeholder="Search for a course..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-5 py-4 rounded-xl text-sm outline-none"
              style={{ background: "white", color: "#1A1A1A", fontFamily: "'Inter', sans-serif" }}
            />
          </div>
          {/* Filter tags */}
          <div className="flex flex-wrap justify-center gap-2">
            {filterTags.map(tag => (
              <button key={tag} onClick={() => setActiveFilter(tag)}
                className="px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  background: activeFilter === tag ? "#D4A017" : "rgba(255,255,255,0.15)",
                  color: activeFilter === tag ? "#1A1A1A" : "#F4F9F4",
                }}>
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="py-8 px-6" style={{ background: "#1A1A1A" }}>
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "#D4A017" }}>{s.value}</div>
                <div className="text-xs mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#9CA3AF" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED COURSE */}
      <section className="py-16 px-6 lg:px-12" style={{ background: "var(--wf-bg-alt)" }}>
        <div className="max-w-[1440px] mx-auto">
          <FadeIn>
            <p className="text-xs font-semibold tracking-widest mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#52B788" }}>FEATURED COURSE</p>
            <div className="grid lg:grid-cols-2 rounded-2xl overflow-hidden" style={{ boxShadow: "var(--wf-card-shadow-hover)" }}>
              <div className="relative overflow-hidden h-64 lg:h-auto">
                <img src={courses[0].img} alt={courses[0].title} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: "#D4A017", color: "#1A1A1A", fontFamily: "'Space Grotesk', sans-serif" }}>Popular</span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: "#2D6A4F", color: "white", fontFamily: "'Space Grotesk', sans-serif" }}>{courses[0].tag}</span>
                </div>
              </div>
              <div className="p-10 flex flex-col justify-center" style={{ background: "var(--wf-bg-card)" }}>
                <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "var(--wf-text-1)" }}>{courses[0].title}</h2>
                <p className="mb-6" style={{ color: "var(--wf-text-3)", lineHeight: "1.7" }}>
                  Master the entire ginger value chain — from seed selection and cultivation to processing, packaging, and international export. Learn how to increase your profits by up to 500% through value addition.
                </p>
                <div className="flex flex-wrap gap-4 mb-6 text-sm">
                  <span className="flex items-center gap-1.5" style={{ color: "var(--wf-text-3)" }}><Clock size={14} /> {courses[0].duration}</span>
                  <span className="flex items-center gap-1.5" style={{ color: "var(--wf-text-3)" }}><Users size={14} /> {courses[0].students} students</span>
                  <span className="flex items-center gap-1.5" style={{ color: "#D4A017" }}><Star size={14} fill="#D4A017" /> {courses[0].rating}</span>
                  <span className="flex items-center gap-1.5" style={{ color: "var(--wf-text-3)" }}><BookOpen size={14} /> 8 modules</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "#2D6A4F" }}>{courses[0].price}</span>
                  <button className="px-8 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
                    style={{ background: "#2D6A4F", color: "white", fontFamily: "'Space Grotesk', sans-serif" }}>
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* COURSE GRID */}
      <section className="py-16 px-6 lg:px-12" style={{ background: "var(--wf-bg-card)" }}>
        <div className="max-w-[1440px] mx-auto">
          <FadeIn>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
              <h2 className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "var(--wf-text-1)" }}>
                {filtered.length} Course{filtered.length !== 1 ? "s" : ""} Available
              </h2>
              <p className="text-sm" style={{ color: "var(--wf-text-4)" }}>
                {activeFilter !== "All" ? `Filtered by: ${activeFilter}` : "Showing all courses"}
              </p>
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((course, i) => (
              <FadeIn key={course.title} delay={i * 60}>
                <div className="group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                  style={{ border: "1.5px solid var(--wf-border)", boxShadow: "var(--wf-card-shadow)", background: "var(--wf-bg-card)" }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = "var(--wf-card-shadow-hover)")}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = "var(--wf-card-shadow)")}>
                  <div className="overflow-hidden h-44 relative">
                    <img src={course.img} alt={course.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: "#2D6A4F", color: "white", fontFamily: "'Space Grotesk', sans-serif" }}>{course.tag}</span>
                      {course.free && <span className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: "#52B788", color: "white", fontFamily: "'Space Grotesk', sans-serif" }}>FREE</span>}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold mb-1.5" style={{ fontFamily: "'Playfair Display', serif", color: "var(--wf-text-1)" }}>{course.title}</h3>
                    <p className="text-xs mb-3" style={{ color: "var(--wf-text-4)" }}>by {course.instructor}</p>
                    <div className="flex items-center gap-3 mb-4 text-xs" style={{ color: "var(--wf-text-3)" }}>
                      <span className="flex items-center gap-1"><Star size={11} fill="#D4A017" style={{ color: "#D4A017" }} /> {course.rating}</span>
                      <span className="flex items-center gap-1"><Users size={11} /> {course.students}</span>
                      <span className="flex items-center gap-1"><Clock size={11} /> {course.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold" style={{ color: course.free ? "#52B788" : "#2D6A4F", fontFamily: "'Space Grotesk', sans-serif" }}>{course.price}</span>
                      <button className="px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 hover:opacity-90"
                        style={{ background: "#2D6A4F", color: "white", fontFamily: "'Space Grotesk', sans-serif" }}>
                        View Course
                      </button>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* LEARNING PATH */}
      <section className="py-16 px-6 lg:px-12" style={{ background: "var(--wf-bg-alt)" }}>
        <div className="max-w-[1000px] mx-auto">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="text-xs font-semibold tracking-widest mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#52B788" }}>YOUR JOURNEY</p>
              <h2 className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "var(--wf-text-1)" }}>Choose Your Learning Path</h2>
            </div>
          </FadeIn>
          <div className="relative">
            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-full h-0.5 hidden md:block" style={{ background: "linear-gradient(to right, #52B788, #D4A017, #2D6A4F)", maxWidth: "600px" }} />
            <div className="grid md:grid-cols-3 gap-8">
              {learningPaths.map((path, i) => (
                <FadeIn key={path.level} delay={i * 100}>
                  <div className="relative text-center">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 relative z-10" style={{ background: path.color }}>
                      <span className="font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{i + 1}</span>
                    </div>
                    <h3 className="font-bold text-lg mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "var(--wf-text-1)" }}>{path.level}</h3>
                    <div className="space-y-2">
                      {path.courses.map(c => (
                        <div key={c} className="rounded-xl px-4 py-3 text-sm" style={{ background: `${path.color}22`, color: "var(--wf-text-1)", border: `1px solid ${path.color}40` }}>
                          {c}
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INSTRUCTOR SPOTLIGHT */}
      <section className="py-16 px-6 lg:px-12" style={{ background: "var(--wf-bg-card)" }}>
        <div className="max-w-[800px] mx-auto">
          <FadeIn>
            <div className="text-center mb-10">
              <p className="text-xs font-semibold tracking-widest mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#52B788" }}>INSTRUCTOR SPOTLIGHT</p>
              <h2 className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "var(--wf-text-1)" }}>Meet Your Lead Instructor</h2>
            </div>
            <div className="rounded-2xl p-8 grid sm:grid-cols-3 gap-8 items-center" style={{ background: "var(--wf-bg-alt)", border: "1.5px solid var(--wf-border)" }}>
              <div className="text-center">
                <div className="w-28 h-28 rounded-full overflow-hidden mx-auto mb-4 border-4" style={{ borderColor: "#D4A017" }}>
                  <img src="https://images.unsplash.com/photo-1769071167455-e5779ecc81a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200" alt="Dr. Rufus" className="w-full h-full object-cover" />
                </div>
                <div className="flex justify-center gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-bold" style={{ color: "#2D6A4F" }}>10+</div>
                    <div className="text-xs" style={{ color: "#9CA3AF" }}>Courses</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold" style={{ color: "#2D6A4F" }}>500+</div>
                    <div className="text-xs" style={{ color: "#9CA3AF" }}>Students</div>
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2">
                <h3 className="text-xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif", color: "#D4A017" }}>Rufus J. Akinrinlola, PhD</h3>
                <p className="text-sm font-medium mb-3" style={{ color: "#2D6A4F", fontFamily: "'Space Grotesk', sans-serif" }}>CEO & Chief Editor | Crop Protection & IPM Specialist</p>

                <p className="text-sm" style={{ color: "#6B7280", lineHeight: "1.7" }}>
                  With over 15 years of research and field experience across Africa, Dr. Akinrinlola is a leading voice in sustainable agriculture. His teaching combines rigorous science with practical, on-farm application.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SUCCESS STORIES */}
      <section className="py-16 px-6 lg:px-12" style={{ background: "var(--wf-bg-alt)" }}>
        <div className="max-w-[1000px] mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-xs font-semibold tracking-widest mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#52B788" }}>STUDENT SUCCESS</p>
              <h2 className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "var(--wf-text-1)" }}>Real Transformations, Real Results</h2>
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-6">
            {successStories.map((story, i) => (
              <FadeIn key={story.name} delay={i * 100}>
                <div className="rounded-2xl overflow-hidden" style={{ background: "var(--wf-bg-card)", boxShadow: "var(--wf-card-shadow)" }}>
                  <div className="grid grid-cols-2 h-2">
                    <div style={{ background: "var(--wf-border)" }} />
                    <div style={{ background: "#2D6A4F" }} />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-5">
                      <img src={story.img} alt={story.name} className="w-12 h-12 rounded-full object-cover border-2" style={{ borderColor: "#D4A017" }} />
                      <div>
                        <p className="font-semibold" style={{ color: "var(--wf-text-1)" }}>{story.name}</p>
                        <p className="text-xs" style={{ color: "var(--wf-text-4)" }}>{story.location}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-xl p-4" style={{ background: "rgba(212,160,23,0.12)", border: "1px solid rgba(212,160,23,0.25)" }}>
                        <p className="text-xs font-semibold mb-2" style={{ color: "#D4A017", fontFamily: "'Space Grotesk', sans-serif" }}>BEFORE</p>
                        <p className="text-sm" style={{ color: "var(--wf-text-3)" }}>{story.before}</p>
                      </div>
                      <div className="rounded-xl p-4" style={{ background: "rgba(45,106,79,0.12)", border: "1px solid rgba(45,106,79,0.25)" }}>
                        <p className="text-xs font-semibold mb-2" style={{ color: "#2D6A4F", fontFamily: "'Space Grotesk', sans-serif" }}>AFTER</p>
                        <p className="text-sm" style={{ color: "var(--wf-text-3)" }}>{story.after}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-16 px-6 lg:px-12" style={{ background: "#2D6A4F" }}>
        <div className="max-w-[700px] mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "#F4F9F4" }}>Not sure where to start?</h2>
            <p className="mb-8" style={{ color: "#B7E4C7", lineHeight: "1.7" }}>
              Take our 2-minute quiz and we'll recommend the perfect learning path for your farming goals.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="px-8 py-4 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-[1.02]"
                style={{ background: "#D4A017", color: "#1A1A1A", fontFamily: "'Space Grotesk', sans-serif" }}>
                Talk to an Advisor
              </Link>
              <button className="px-8 py-4 rounded-xl font-semibold text-sm border transition-all duration-200 hover:bg-white/10"
                style={{ borderColor: "rgba(255,255,255,0.4)", color: "white", fontFamily: "'Space Grotesk', sans-serif" }}>
                Take the Quiz
              </button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}