import React, { useState, useRef, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  projects,
  PROJECT_CATEGORIES,
  type ProjectItem,
  type ProjectCategory,
} from "../data/projects";
import { WA_URL } from "../data/chatbotTemplates";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { num: "01", label: "TOTAL PROYEK", title: "30+ Selesai", sub: "Produk & platform aktif" },
  { num: "02", label: "KATEGORI BIDANG", title: "5 Bidang Solusi", sub: "Web, mobile, sistem, AI" },
  { num: "03", label: "TINGKAT KEPUASAN", title: "100% Klien Puas", sub: "Kualitas & standar tinggi" },
  { num: "04", label: "STANDAR SISTEM", title: "Enterprise Grade", sub: "Skalabilitas & keamanan" },
];

const TRUST_PARTNERS = [
  {
    name: "PT Murata Manufacturing",
    category: "Industrial IoT & Telemetry",
    logo: "/logo_murata.avif",
  },
  {
    name: "SMK Nurul Islam Jakarta",
    category: "Learning Management System",
    logo: "/logo_nuris.png",
  },
  {
    name: "Bursa Kerja Khusus (BKK)",
    category: "Tracer Study & Career Portal",
    logo: "/logobkk.jpg",
  },
  {
    name: "Edufo Technology",
    category: "Payment & CRM Ecosystem",
    logo: "/Edufo-Aset.png",
  },
];

export const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const heroRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const projectsGridRef = useRef<HTMLDivElement>(null);
  const trustSectionRef = useRef<HTMLDivElement>(null);
  const ctaSectionRef = useRef<HTMLDivElement>(null);

  // Filter projects by category and search keyword
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchCategory =
        activeCategory === "Semua" || project.category === activeCategory;

      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchCategory;

      const matchSearch =
        project.title.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.longDescription.toLowerCase().includes(q) ||
        (project.client && project.client.toLowerCase().includes(q)) ||
        project.tag.toLowerCase().includes(q) ||
        project.techs.some((t) => t.name.toLowerCase().includes(q));

      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  // Keyboard escape listener to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // GSAP Animations
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
      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.querySelectorAll(".stat-item"),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // Filter section fade-in
      if (filterRef.current) {
        gsap.fromTo(
          filterRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: filterRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // Trust partners section
      if (trustSectionRef.current) {
        gsap.fromTo(
          trustSectionRef.current.querySelectorAll(".trust-card"),
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: trustSectionRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // CTA bottom section
      if (ctaSectionRef.current) {
        gsap.fromTo(
          ctaSectionRef.current,
          { opacity: 0, scale: 0.96 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ctaSectionRef.current,
              start: "top 85%",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  // Animate grid cards when filter or search changes
  useEffect(() => {
    if (projectsGridRef.current) {
      const cards = projectsGridRef.current.querySelectorAll(".project-card-item");
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.06,
            ease: "power2.out",
          }
        );
      }
    }
  }, [activeCategory, searchQuery]);

  return (
    <>
      <Helmet>
        <title>Portofolio Proyek - 30+ Solusi Digital Terpercaya | Genion Team</title>
        <meta name="description" content="Jelajahi portofolio lengkap Genion Team: Edufo CRM, KOSTAPP, AI Chatbot, IoT Dashboard, dan berbagai platform enterprise. Solusi terbukti untuk berbagai industri." />
        <meta property="og:title" content="Portofolio Proyek - 30+ Solusi Digital Terpercaya | Genion Team" />
        <meta property="og:description" content="Jelajahi portofolio lengkap Genion Team: Edufo CRM, KOSTAPP, AI Chatbot, IoT Dashboard, dan berbagai platform enterprise. Solusi terbukti untuk berbagai industri." />
        <meta property="og:url" content="https://genion.vercel.app/projects" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://genion.vercel.app/og-image.webp" />
        <meta property="og:locale" content="id_ID" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Portofolio Proyek - 30+ Solusi Digital Terpercaya | Genion Team" />
        <meta name="twitter:description" content="Jelajahi portofolio lengkap Genion Team: Edufo CRM, KOSTAPP, AI Chatbot, IoT Dashboard, dan berbagai platform enterprise. Solusi terbukti untuk berbagai industri." />
        <meta name="twitter:image" content="https://genion.vercel.app/og-image.webp" />
        <link rel="canonical" href="https://genion.vercel.app/projects" />
      </Helmet>
      {/* ─── SECTION 1: HERO ─── */}
      <section
        ref={heroRef}
        className="relative bg-white dark:bg-[#0d0d0d] pt-36 sm:pt-44 pb-20 sm:pb-28 overflow-hidden"
      >
        {/* Subtle radial glow */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_60%_at_10%_40%,rgba(8,145,178,0.06),transparent)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          {/* Eyebrow badge */}
          <div ref={eyebrowRef} className="flex items-center gap-3 mb-8 opacity-0">
            <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-[#111] border border-gray-300 dark:border-[#222] flex items-center justify-center">
              <img src="/genion_logo.png" className="w-4 h-4 object-contain" alt="Genion logo" />
            </div>
            <span className="text-xs font-mono text-gray-500 tracking-widest uppercase">
              Genion Portofolio · Karya &amp; Solusi Nyata
            </span>
          </div>

          {/* H1 Headline with GSAP line reveal */}
          <h1
            ref={headingRef}
            className="font-poppins font-bold leading-[1.08] text-gray-900 dark:text-white mb-8"
          >
            <span className="block text-4xl sm:text-6xl lg:text-[4.75rem] overflow-hidden">
              <span className="block translate-y-full opacity-0" data-gsap="line">
                Koleksi Solusi Digital &amp;
              </span>
            </span>
            <span className="block text-4xl sm:text-6xl lg:text-[4.75rem] overflow-hidden">
              <span className="block translate-y-full opacity-0" data-gsap="line">
                <span className="text-[#0891b2]">Produk Unggulan</span> Genion
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-2xl leading-relaxed mb-10 opacity-0"
          >
            Jelajahi berbagai sistem enterprise, aplikasi mobile, platform web modern, serta
            desain arsitektur digital berstandar industri yang dirancang presisi untuk mendorong
            pertumbuhan bisnis klien kami.
          </p>

          {/* Direct CTA */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3 opacity-0">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#0891b2] hover:bg-cyan-300 text-black font-semibold text-sm px-6 py-3 rounded-md transition-all duration-200"
            >
              KONSULTASI PROYEK ANDA
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[#0891b2] text-[#0891b2] hover:bg-[#0891b2] hover:text-black font-medium text-sm px-6 py-3 rounded-md transition-all duration-200"
            >
              DISKUSI CEPAT (WHATSAPP)
            </a>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: STATS STRIP ─── */}
      <section className="bg-white dark:bg-[#0d0d0d] border-t border-gray-200 dark:border-white/5">
        <div
          ref={statsRef}
          className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-14 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {STATS.map((s, i) => (
            <div key={i} className="border-l border-gray-200 dark:border-white/10 pl-4 stat-item opacity-0">
              <p className="text-[10px] font-mono tracking-widest uppercase text-gray-500 dark:text-gray-600 mb-2">
                {s.num} / {s.label}
              </p>
              <p className="text-gray-900 dark:text-white font-bold text-xl mb-1">{s.title}</p>
              <p className="text-gray-500 dark:text-gray-600 text-xs">{s.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── SECTION 3: FILTER & SEARCH BAR + GRID ─── */}
      <section className="bg-gray-50 dark:bg-[#0a0a0a] py-20 border-t border-gray-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="mb-10">
            <p className="section-badge mb-3">[ 01 • EKSPLORASI PORTOFOLIO ]</p>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h2 className="font-poppins font-bold text-gray-900 dark:text-white text-3xl sm:text-4xl leading-tight">
                  Katalog Proyek Terverifikasi
                </h2>
                <p className="text-gray-500 text-sm mt-2 max-w-xl">
                  Gunakan filter kategori atau kata kunci untuk melihat solusi yang sesuai dengan kebutuhan platform Anda.
                </p>
              </div>

              {/* Project Count Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#1f1f1f] text-xs font-mono text-gray-600 dark:text-gray-400 self-start md:self-auto">
                <span className="w-2 h-2 rounded-full bg-[#0891b2] animate-pulse"></span>
                <span>
                  Menampilkan <strong className="text-gray-900 dark:text-white">{filteredProjects.length}</strong> dari {projects.length} Proyek
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Filter & Search Controls */}
          <div
            ref={filterRef}
            className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#1f1f1f] rounded-2xl p-4 sm:p-6 mb-12 shadow-sm opacity-0"
          >
            <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
              {/* Category Tabs */}
              <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
                {PROJECT_CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-200 whitespace-nowrap cursor-pointer ${
                        isActive
                          ? "bg-[#0891b2] text-black font-semibold shadow-md shadow-[#0891b2]/20"
                          : "bg-gray-100 dark:bg-[#181818] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-[#222]"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              {/* Search input field */}
              <div className="relative min-w-[260px] sm:w-80">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari proyek, stack, klien..."
                  className="w-full pl-10 pr-9 py-2.5 bg-gray-50 dark:bg-[#181818] border border-gray-200 dark:border-[#262626] rounded-xl text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#0891b2] transition-colors font-sans"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div ref={projectsGridRef}>
            {filteredProjects.length === 0 ? (
              <div className="border border-dashed border-gray-300 dark:border-[#262626] rounded-2xl p-12 text-center bg-white dark:bg-[#111111]/40">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-[#1a1a1a] flex items-center justify-center text-gray-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-poppins font-bold text-gray-900 dark:text-white text-lg mb-2">
                  Tidak Ada Proyek Ditemukan
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm max-w-md mx-auto mb-6">
                  Tidak ada proyek yang sesuai dengan kriteria kategori "{activeCategory}" dan pencarian "{searchQuery}".
                </p>
                <button
                  onClick={() => {
                    setActiveCategory("Semua");
                    setSearchQuery("");
                  }}
                  className="inline-flex items-center gap-2 bg-[#0891b2] hover:bg-cyan-300 text-black font-semibold text-xs px-5 py-2.5 rounded-lg transition-colors cursor-pointer"
                >
                  Reset Filter &amp; Pencarian
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className="project-card-item group cursor-pointer bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#1f1f1f] rounded-2xl overflow-hidden hover:border-[#0891b2]/50 hover:shadow-xl hover:shadow-[#0891b2]/5 transition-all duration-300 flex flex-col"
                  >
                    {/* Image with zoom effect */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-[#161616]">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#0891b2] bg-black/75 backdrop-blur-md border border-[#0891b2]/30 px-2.5 py-1 rounded-md">
                          {project.category}
                        </span>
                        <span className="text-[10px] font-mono text-gray-200 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md">
                          {project.year}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        {project.client && (
                          <p className="text-[11px] font-mono text-gray-500 dark:text-gray-500 uppercase tracking-wider mb-1.5 truncate">
                            {project.client}
                          </p>
                        )}
                        <h3 className="font-poppins font-bold text-gray-900 dark:text-white text-lg group-hover:text-[#0891b2] transition-colors mb-2 leading-snug">
                          {project.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                          {project.description}
                        </p>
                      </div>

                      <div>
                        {/* Tech Stack Chips */}
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {project.techs.slice(0, 4).map((tech, tIdx) => (
                            <span
                              key={tIdx}
                              className={`text-[10px] font-mono px-2 py-0.5 rounded ${tech.bg} ${tech.text}`}
                            >
                              {tech.name}
                            </span>
                          ))}
                          {project.techs.length > 4 && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gray-100 dark:bg-[#1a1a1a] text-gray-500">
                              +{project.techs.length - 4}
                            </span>
                          )}
                        </div>

                        {/* Button */}
                        <div className="pt-3 border-t border-gray-100 dark:border-[#1a1a1a] flex items-center justify-between">
                          <span className="text-xs font-mono font-medium text-[#0891b2] group-hover:underline inline-flex items-center gap-1">
                            Lihat Detail
                            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                          </span>
                          <span className="text-[10px] font-mono text-gray-400">
                            {project.deliverables.length} Deliverables
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: CLIENT & INDUSTRY TRUST STRIP ─── */}
      <section className="bg-white dark:bg-[#0d0d0d] py-24 border-t border-gray-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16" ref={trustSectionRef}>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="section-badge mx-auto mb-3">[ 02 • KEPERCAYAAN INDUSTRI ]</p>
            <h2 className="font-poppins font-bold text-gray-900 dark:text-white text-3xl sm:text-4xl leading-tight mb-4">
              Dipercaya Klien &amp; Mitra Industri
            </h2>
            <p className="text-gray-500 text-sm">
              Kami berkolaborasi erat dengan korporasi, institusi pendidikan, dan pelaku industri untuk menghadirkan solusi teknologi yang berdampak nyata.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRUST_PARTNERS.map((partner, pIdx) => (
              <div
                key={pIdx}
                className="trust-card bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-[#1f1f1f] rounded-2xl p-6 text-center hover:border-[#0891b2]/40 transition-all duration-300 flex flex-col items-center justify-center opacity-0 group"
              >
                <div className="w-16 h-16 rounded-xl bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#262626] p-2.5 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-full max-w-full object-contain"
                    loading="lazy"
                  />
                </div>
                <h4 className="font-poppins font-bold text-gray-900 dark:text-white text-sm mb-1">
                  {partner.name}
                </h4>
                <p className="text-gray-500 dark:text-gray-500 font-mono text-[11px]">
                  {partner.category}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: COLLABORATION CTA SECTION ─── */}
      <section className="bg-white dark:bg-[#0d0d0d] py-24 border-t border-gray-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div
            ref={ctaSectionRef}
            className="border border-gray-200 dark:border-[#1f1f1f] bg-gray-50 dark:bg-[#0f0f0f] rounded-2xl p-10 sm:p-16 text-center max-w-4xl mx-auto opacity-0"
          >
            <p className="section-badge mx-auto mb-6">[ 03 • KOLABORASI ]</p>
            <h2 className="font-poppins font-bold text-gray-900 dark:text-white text-3xl sm:text-4xl leading-tight mb-4">
              Punya Rencana Proyek Digital?
              <br />
              Wujudkan Bersama Tim Genion
            </h2>
            <p className="text-gray-500 dark:text-gray-500 text-sm max-w-lg mx-auto mb-8">
              Konsultasikan ide atau tantangan teknologi perusahaan Anda bersama kami. Kami siap menyusun arsitektur sistem, estimasi pengerjaan, dan roadmap implementasi yang tepat sasaran.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0891b2] hover:bg-cyan-300 text-black font-semibold text-sm px-6 py-3 rounded-md transition-all duration-200"
              >
                MULAI DISKUSI PROYEK
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-gray-300 dark:border-[#2a2a2a] hover:border-[#0891b2] text-gray-800 dark:text-gray-200 hover:text-[#0891b2] font-medium text-sm px-6 py-3 rounded-md transition-all duration-200"
              >
                HUBUNGI KAMI DI WA
              </a>
            </div>

            {/* 3 trust pills */}
            <div className="flex flex-wrap justify-center gap-3 mt-2">
              {[
                "✓ Konsultasi Langsung",
                "✓ Tim Berpengalaman",
                "✓ Solusi Terukur",
              ].map((pill, i) => (
                <span
                  key={i}
                  className="text-xs text-gray-500 dark:text-gray-500 bg-gray-100 dark:bg-[#111] border border-gray-200 dark:border-[#1f1f1f] px-3.5 py-1 rounded-full"
                >
                  {pill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: INTERACTIVE PROJECT DETAIL MODAL ─── */}
      {selectedProject && (
        <div
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in-up"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222] rounded-2xl max-w-3xl w-full p-6 sm:p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button with SVG icon */}
            <button
              onClick={() => setSelectedProject(null)}
              aria-label="Tutup modal"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-gray-100 dark:bg-[#1a1a1a] hover:bg-gray-200 dark:hover:bg-[#252525] flex items-center justify-center text-gray-600 dark:text-gray-300 transition-colors z-10 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Image */}
            <div className="w-full aspect-[16/9] rounded-xl overflow-hidden bg-gray-100 dark:bg-[#161616] mb-6 relative">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#0891b2] bg-black/80 backdrop-blur-md border border-[#0891b2]/30 px-2.5 py-1 rounded">
                  {selectedProject.category}
                </span>
                <span className="text-[10px] font-mono text-gray-200 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded">
                  {selectedProject.year}
                </span>
              </div>
            </div>

            {/* Modal Content Header */}
            <div className="mb-6">
              {selectedProject.client && (
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#0891b2] bg-[#0891b2]/10 border border-[#0891b2]/20 px-2.5 py-0.5 rounded">
                    Klien: {selectedProject.client}
                  </span>
                  <span className="text-[10px] font-mono text-gray-400">
                    Tag: {selectedProject.tag}
                  </span>
                </div>
              )}
              <h3 className="font-poppins font-bold text-gray-900 dark:text-white text-2xl sm:text-3xl mb-3">
                {selectedProject.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
                {selectedProject.longDescription}
              </p>
            </div>

            {/* Project Stats (if available) */}
            {selectedProject.stats && selectedProject.stats.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mb-6 p-4 rounded-xl bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-[#222]">
                {selectedProject.stats.map((stat, sIdx) => (
                  <div key={sIdx} className="text-center">
                    <p className="font-poppins font-bold text-gray-900 dark:text-white text-base sm:text-lg">
                      {stat.value}
                    </p>
                    <p className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Key Highlights */}
            {selectedProject.highlights && selectedProject.highlights.length > 0 && (
              <div className="mb-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-gray-900 dark:text-white mb-3">
                  Fitur &amp; Keunggulan Utama
                </h4>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {selectedProject.highlights.map((highlight, hIdx) => (
                    <div
                      key={hIdx}
                      className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-[#151515] border border-gray-200 dark:border-[#222] p-2.5 rounded-lg"
                    >
                      <span className="text-[#0891b2] font-bold mt-0.5">✓</span>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Deliverables */}
            {selectedProject.deliverables && selectedProject.deliverables.length > 0 && (
              <div className="mb-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-gray-900 dark:text-white mb-3">
                  Deliverables Yang Diselesaikan
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.deliverables.map((deliv, dIdx) => (
                    <span
                      key={dIdx}
                      className="text-xs text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-[#181818] border border-gray-200 dark:border-[#262626] px-3 py-1.5 rounded-md"
                    >
                      • {deliv}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack Chips */}
            <div className="mb-8">
              <h4 className="text-xs font-mono uppercase tracking-wider text-gray-900 dark:text-white mb-3">
                Teknologi Yang Digunakan
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.techs.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className={`text-xs font-mono px-2.5 py-1 rounded ${tech.bg} ${tech.text}`}
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Direct CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 dark:border-[#222]">
              <a
                href={`${WA_URL}&text=Halo%20Genion%20Team,%20saya%20tertarik%20berdiskusi%20tentang%20proyek%20serupa%20${encodeURIComponent(
                  selectedProject.title
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-[#0891b2] hover:bg-cyan-300 text-black font-semibold text-xs px-5 py-3 rounded-md transition-all duration-200"
              >
                Diskusi Proyek Serupa (WA)
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <Link
                to="/contact"
                onClick={() => setSelectedProject(null)}
                className="inline-flex items-center justify-center gap-2 border border-gray-300 dark:border-[#333] hover:border-[#0891b2] text-gray-800 dark:text-gray-200 hover:text-[#0891b2] font-medium text-xs px-5 py-3 rounded-md transition-all duration-200"
              >
                Halaman Kontak
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Projects;
