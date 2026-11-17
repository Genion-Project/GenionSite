import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import genion from "../images/Gene.webp";
import edufo from "../images/edufo_db.png";

gsap.registerPlugin(ScrollTrigger);

interface ProjectDetail {
  title: string;
  category: string;
  year: string;
  description: string;
  image: string;
  techs: { name: string; icon: string; bg: string; text: string }[];
  highlights: string[];
}

const TOP_PROJECTS: ProjectDetail[] = [
  {
    title: "Edufo CRM",
    category: "Web & Mobile Integration",
    year: "2024",
    description:
      "Website Pembelian Aplikasi Whitelabel Payment and Study Education Information (Edufo) Yang Terintegrasi Langsung Ke Aplikasi Mobile.",
    image: edufo,
    techs: [
      { name: "TailwindCSS", icon: "mdi:tailwind", bg: "bg-blue-100/80 dark:bg-blue-900/50", text: "text-blue-800 dark:text-blue-200" },
      { name: "Laravel", icon: "mdi:laravel", bg: "bg-red-100/80 dark:bg-red-900/50", text: "text-red-800 dark:text-red-200" },
      { name: "PHP", icon: "mdi:language-php", bg: "bg-indigo-100/80 dark:bg-indigo-900/50", text: "text-indigo-800 dark:text-indigo-200" },
    ],
    highlights: [
      "Whitelabel payment gateway integration",
      "Real-time sync dengan aplikasi mobile",
      "Dashboard analytics siswa & institusi",
      "Sistem perizinan role & billing multi-tenant",
    ],
  },
  {
    title: "KostApp - Pemesanan Kost",
    category: "Property Management & Booking",
    year: "2024",
    description:
      "Dashboard real-time untuk monitoring dan analisis Kost Dan Aplikasi Mobile Pemesanan Kos.",
    image: "/beranda_kostapp.webp",
    techs: [
      { name: "TailwindCSS", icon: "mdi:tailwind", bg: "bg-blue-100/80 dark:bg-blue-900/50", text: "text-blue-800 dark:text-blue-200" },
      { name: "Laravel", icon: "mdi:laravel", bg: "bg-red-100/80 dark:bg-red-900/50", text: "text-red-800 dark:text-red-200" },
      { name: "PHP", icon: "mdi:language-php", bg: "bg-indigo-100/80 dark:bg-indigo-900/50", text: "text-indigo-800 dark:text-indigo-200" },
    ],
    highlights: [
      "Pencarian kamar kost berbasis geolocation",
      "Sistem pemesanan & pembayaran instan",
      "Dashboard pengelola kost untuk kelola okupansi",
      "Notifikasi jatuh tempo sewa otomatis",
    ],
  },
  {
    title: "Bendahara App",
    category: "Finance & Accounting",
    year: "2023",
    description:
      "Aplikasi & Web untuk manajemen Pemasukan dan Pengeluaran Secara Efektif dan Transparan.",
    image: "/Ka.webp",
    techs: [
      { name: "JavaScript", icon: "mdi:language-javascript", bg: "bg-yellow-100/80 dark:bg-yellow-900/50", text: "text-yellow-800 dark:text-yellow-200" },
      { name: "Flutter", icon: "simple-icons:flutter", bg: "bg-cyan-100/80 dark:bg-cyan-900/50", text: "text-cyan-800 dark:text-cyan-200" },
    ],
    highlights: [
      "Pencatatan kas masuk & kas keluar harian",
      "Export laporan keuangan format PDF & Excel",
      "Sinkronisasi offline-first ke server pusat",
      "Multi-user audit log untuk akuntabilitas",
    ],
  },
];

export const Home: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);

  const heroRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const ctaSectionRef = useRef<HTMLDivElement>(null);

  // suppress unused import warning — genion kept for future use
  void genion;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.2)
        .to(
          headingRef.current!.querySelectorAll("[data-gsap='line']"),
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.12 },
          0.4
        )
        .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.9)
        .to(ctaRef.current, { opacity: 1, scale: 1, duration: 0.5 }, 1.1);

      // Stats on scroll
      gsap.fromTo(
        statsRef.current!.querySelectorAll(".stat-item"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: { trigger: statsRef.current, start: "top 80%" },
        }
      );

      // Service cards
      gsap.fromTo(
        servicesRef.current!.querySelectorAll(".service-card"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: { trigger: servicesRef.current, start: "top 80%" },
        }
      );

      // Project cards
      gsap.fromTo(
        projectsRef.current!.querySelectorAll(".project-card"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: { trigger: projectsRef.current, start: "top 80%" },
        }
      );

      // CTA section
      gsap.fromTo(
        ctaSectionRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          scrollTrigger: { trigger: ctaSectionRef.current, start: "top 80%" },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Helmet>
        <title>Genion Team - Solusi Digital Cerdas, Inovatif & Terdepan | Web, Mobile, AI</title>
        <meta name="description" content="Genion Team menyediakan solusi teknologi terdepan: Pengembangan Web & Mobile, Digital Marketing, UI/UX Design, Cloud Architecture, dan AI. 30+ proyek selesai, 100% kepuasan klien." />
        <meta property="og:title" content="Genion Team - Solusi Digital Cerdas, Inovatif & Terdepan | Web, Mobile, AI" />
        <meta property="og:description" content="Genion Team menyediakan solusi teknologi terdepan: Pengembangan Web & Mobile, Digital Marketing, UI/UX Design, Cloud Architecture, dan AI. 30+ proyek selesai, 100% kepuasan klien." />
        <meta property="og:url" content="https://genion.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://genion.vercel.app/og-image.webp" />
        <meta property="og:locale" content="id_ID" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Genion Team - Solusi Digital Cerdas, Inovatif & Terdepan | Web, Mobile, AI" />
        <meta name="twitter:description" content="Genion Team menyediakan solusi teknologi terdepan: Pengembangan Web & Mobile, Digital Marketing, UI/UX Design, Cloud Architecture, dan AI. 30+ proyek selesai, 100% kepuasan klien." />
        <meta name="twitter:image" content="https://genion.vercel.app/og-image.webp" />
        <link rel="canonical" href="https://genion.vercel.app/" />
      </Helmet>
      {/* ─── SECTION 1: HERO ─── */}
      <section
        ref={heroRef}
        className="relative min-h-screen bg-white dark:bg-[#0d0d0d] flex items-center overflow-hidden"
      >
        {/* Subtle radial glow top-left */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_60%_at_10%_40%,rgba(0,229,160,0.05),transparent)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-28 pb-16 sm:py-32">
          {/* Eyebrow */}
          <div ref={eyebrowRef} className="flex items-center gap-3 mb-8 opacity-0">
            <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-[#111] border border-gray-300 dark:border-[#222] flex items-center justify-center">
              <img src="/genion_logo.png" className="w-4 h-4 object-contain" alt="Genion logo" />
            </div>
            <span className="text-xs font-mono text-gray-500 tracking-widest uppercase">
              Genion Team · Tim Inovasi Teknologi
            </span>
          </div>

          {/* H1 — 3 lines */}
          <h1
            ref={headingRef}
            className="font-poppins font-bold leading-[1.05] text-gray-900 dark:text-white mb-6"
          >
            {/* Line 1 */}
            <span className="block text-3xl sm:text-5xl md:text-7xl lg:text-[5.5rem] overflow-hidden leading-tight">
              <span className="block translate-y-full opacity-0" data-gsap="line">
                Solusi digital
              </span>
            </span>
            {/* Line 2 — with accent word */}
            <span className="block text-3xl sm:text-5xl md:text-7xl lg:text-[5.5rem] overflow-hidden leading-tight">
              <span className="block translate-y-full opacity-0" data-gsap="line">
                cerdas, <span className="text-[#0891b2]">inovatif</span>, dan
              </span>
            </span>
            {/* Line 3 */}
            <span className="block text-3xl sm:text-5xl md:text-7xl lg:text-[5.5rem] overflow-hidden leading-tight">
              <span className="block translate-y-full opacity-0" data-gsap="line">
                terdepan.
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-md leading-relaxed mb-10 opacity-0"
          >
            Tim profesional yang menghadirkan solusi teknologi terdepan, kreativitas tanpa batas,
            dan inovasi berkelanjutan untuk transformasi digital Anda.
          </p>

          {/* CTA */}
          <div ref={ctaRef} className="opacity-0">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 bg-[#0891b2] hover:bg-cyan-300 text-black font-semibold text-sm px-6 py-3 rounded-md transition-all duration-200"
            >
              LIHAT LAYANAN KAMI
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: STATS STRIP ─── */}
      <section className="bg-white dark:bg-[#0d0d0d] border-t border-gray-200 dark:border-white/5">
        <div
          ref={statsRef}
          className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-10 sm:py-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8"
        >
          {[
            { num: "01", label: "SISTEM DIGITAL", title: "Terintegrasi", sub: "Klien, tim & solusi terhubung" },
            { num: "02", label: "LAYANAN", title: "6 Layanan", sub: "Web, Mobile, AI, IoT, UI/UX" },
            { num: "03", label: "TIM", title: "11 Anggota", sub: "Profesional berdedikasi" },
            { num: "04", label: "PENGALAMAN", title: "2+ Tahun", sub: "Inovasi berkelanjutan" },
          ].map((s, i) => (
            <div key={i} className="border-l border-gray-200 dark:border-white/10 pl-4 stat-item opacity-0">
              <p className="text-[10px] font-mono tracking-widest uppercase text-gray-500 dark:text-gray-600 mb-2">
                {s.num} / {s.label}
              </p>
              <p className="text-gray-900 dark:text-white font-bold text-base sm:text-xl mb-1">{s.title}</p>
              <p className="text-gray-500 dark:text-gray-600 text-xs">{s.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── SECTION 3: SERVICES ─── */}
      <section className="bg-white dark:bg-[#0d0d0d] py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          {/* Badge */}
          <p className="section-badge">[ 01 • LAYANAN KAMI ]</p>
          <h2 className="font-poppins font-bold text-gray-900 dark:text-white text-3xl sm:text-4xl leading-tight max-w-xl mb-4">
            Layanan Solusi Digital
            <br />
            Terdepan
          </h2>
          <p className="text-gray-500 dark:text-gray-500 text-sm max-w-md mb-14">
            Kami menyediakan berbagai solusi digital komprehensif untuk membantu bisnis Anda tumbuh
            di era digital.
          </p>

          <div
            ref={servicesRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {[
              {
                n: "01",
                title: "Pengembangan Web",
                desc: "Website responsif, modern & performant",
                items: ["Website Company Profile", "Landing Page", "Web Application", "E-Commerce"],
              },
              {
                n: "02",
                title: "Aplikasi Mobile",
                desc: "iOS & Android apps yang intuitif",
                items: ["Cross-platform Flutter", "API Integration", "Offline-first", "Push Notification"],
              },
              {
                n: "03",
                title: "UI/UX Design",
                desc: "Desain interface yang memukau",
                items: ["User Research", "Wireframing", "Prototyping", "Design System"],
              },
              {
                n: "04",
                title: "Digital Marketing",
                desc: "Strategi pemasaran yang efektif",
                items: ["SEO Optimization", "Social Media", "Content Marketing", "Analytics"],
              },
            ].map((svc, i) => (
              <div
                key={i}
                className="service-card bg-gray-100 dark:bg-[#111111] border border-gray-200 dark:border-[#1f1f1f] rounded-xl p-6 hover:border-emerald-900/60 transition-all duration-300 opacity-0"
              >
                <span className="text-[#0891b2] text-xs font-mono mb-4 block">{svc.n}</span>
                <h3 className="text-gray-900 dark:text-white font-bold text-base mb-2">{svc.title}</h3>
                <p className="text-gray-500 dark:text-gray-500 text-xs mb-4 leading-relaxed">{svc.desc}</p>
                <ul className="space-y-1.5">
                  {svc.items.map((item, j) => (
                    <li key={j} className="text-gray-600 dark:text-gray-400 text-xs flex items-start gap-1.5">
                      <span className="text-[#0891b2] mt-0.5 flex-shrink-0">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: TOP PROJECTS ─── */}
      <section className="bg-gray-50 dark:bg-[#0a0a0a] py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <p className="section-badge">[ 02 • PORTOFOLIO ]</p>
          <h2 className="font-poppins font-bold text-gray-900 dark:text-white text-3xl sm:text-4xl leading-tight mb-4">
            Top Project
            <br />
            Kami
          </h2>
          <p className="text-gray-500 dark:text-gray-500 text-sm max-w-md mb-14">
            Beberapa karya terbaik yang telah kami selesaikan untuk berbagai klien.
          </p>

          <div
            ref={projectsRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {TOP_PROJECTS.map((proj, idx) => (
              <div
                key={idx}
                className="project-card bg-gray-100 dark:bg-[#111111] border border-gray-200 dark:border-[#1f1f1f] rounded-xl overflow-hidden hover:border-emerald-900/50 transition-all duration-300 hover:-translate-y-1 flex flex-col opacity-0"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/30" />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <span className="text-[10px] font-mono text-gray-500 dark:text-gray-600 uppercase tracking-wider mb-2">
                    {proj.category} · {proj.year}
                  </span>
                  <h3 className="text-gray-900 dark:text-white font-bold text-base mb-2">{proj.title}</h3>
                  <p className="text-gray-500 dark:text-gray-500 text-xs leading-relaxed mb-4 flex-1 line-clamp-2">
                    {proj.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {proj.techs.map((t, ti) => (
                      <span
                        key={ti}
                        className="text-[10px] px-2 py-1 bg-gray-200 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] text-gray-600 dark:text-gray-400 rounded-md"
                      >
                        {t.name}
                      </span>
                    ))}
                  </div>
                  <div className="border-t border-gray-200 dark:border-[#1f1f1f] pt-3 flex justify-end">
                    <button
                      onClick={() => setSelectedProject(proj)}
                      className="text-[#0891b2] text-xs font-semibold hover:text-cyan-300 transition-colors"
                    >
                      Lihat Detail →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 border border-[#0891b2] text-[#0891b2] hover:bg-[#0891b2] hover:text-black font-semibold text-xs font-mono uppercase tracking-wider px-4 sm:px-6 py-3 rounded-md transition-all duration-200 w-full sm:w-auto justify-center"
            >
              <span className="hidden sm:inline">LIHAT SEMUA PROYEK GENION ({">"}) </span>
              <span className="sm:hidden">LIHAT SEMUA PROYEK →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: FINAL CTA ─── */}
      <section className="bg-white dark:bg-[#0d0d0d] py-24">
        <div ref={ctaSectionRef} className="max-w-4xl mx-auto px-6 opacity-0">
          <div className="border border-gray-200 dark:border-[#1f1f1f] bg-gray-50 dark:bg-[#0f0f0f] rounded-2xl p-6 sm:p-12 lg:p-16 text-center">
            <div className="flex items-center justify-center gap-3 mb-6 text-[10px] font-mono tracking-widest uppercase">
              <span className="text-[#0891b2]">● PORTAL TERPERCAYA</span>
              <span className="text-gray-400 dark:text-gray-700">•</span>
              <span className="text-[#0891b2]">SIAP DIGUNAKAN</span>
            </div>
            <h2 className="font-poppins font-bold text-gray-900 dark:text-white text-3xl sm:text-5xl leading-tight mb-6">
              Mulai Inovasi Digital
              <br />
              Bersama Genion Team
            </h2>
            <p className="text-gray-500 dark:text-gray-500 text-sm max-w-md mx-auto mb-10 leading-relaxed">
              Wujudkan visi digital Anda bersama tim profesional kami. Konsultasi gratis, solusi
              terpercaya.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#0891b2] hover:bg-cyan-300 text-black font-semibold text-sm px-8 py-3.5 rounded-md transition-all duration-200"
            >
              HUBUNGI KAMI SEKARANG
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
            <div className="flex items-center justify-center gap-8 mt-10 flex-wrap">
              {["✓ Tim Profesional", "✓ Solusi Terpercaya", "✓ Siap Berkolaborasi"].map((f, i) => (
                <span key={i} className="text-xs text-gray-500 dark:text-gray-600 flex items-center gap-1">
                  <span className="text-[#0891b2]">{f.split(" ")[0]}</span>
                  {f.split(" ").slice(1).join(" ")}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── MODAL ─── */}
      {selectedProject && (
        <div
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-100 dark:bg-[#111] border border-gray-200 dark:border-[#222] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-xs font-mono text-[#0891b2] uppercase tracking-wider">
                  {selectedProject.category} · {selectedProject.year}
                </span>
                <h3 className="text-gray-900 dark:text-white font-bold text-2xl mt-1 font-poppins">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="w-10 h-10 rounded-full bg-gray-200 dark:bg-[#1a1a1a] hover:bg-gray-300 dark:hover:bg-[#222] flex items-center justify-center text-gray-600 dark:text-gray-400 flex-shrink-0"
              >
                ✕
              </button>
            </div>
            <div className="rounded-xl overflow-hidden aspect-video mb-5 border border-gray-200 dark:border-[#222]">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-5">
              {selectedProject.description}
            </p>
            <h4 className="text-xs font-mono uppercase tracking-wider text-gray-500 dark:text-gray-600 mb-3">
              Fitur Unggulan
            </h4>
            <ul className="space-y-2 mb-5">
              {selectedProject.highlights.map((h, i) => (
                <li key={i} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0891b2] mr-2.5 flex-shrink-0" />
                  {h}
                </li>
              ))}
            </ul>
            <h4 className="text-xs font-mono uppercase tracking-wider text-gray-500 dark:text-gray-600 mb-3">
              Teknologi
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedProject.techs.map((t, i) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1 bg-gray-200 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] text-gray-600 dark:text-gray-400 rounded-md"
                >
                  {t.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
