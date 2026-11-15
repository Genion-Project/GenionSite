import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ServiceItem {
  tag: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

const SERVICES: ServiceItem[] = [
  {
    tag: "01 / WEB",
    title: "Pengembangan Web",
    description: "Kami membuat website yang responsif, modern, dan SEO-friendly untuk bisnis Anda dengan teknologi terkini.",
    icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
    features: ["Website Company Profile", "Website E-Commerce", "Landing Page", "Web Application"]
  },
  {
    tag: "02 / MOBILE",
    title: "Pengembangan Aplikasi Mobile",
    description: "Kembangkan aplikasi mobile iOS dan Android yang powerful dengan performa terbaik untuk bisnis Anda.",
    icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
    features: ["Aplikasi iOS", "Aplikasi Android", "Cross-Platform", "API Integration"]
  },
  {
    tag: "03 / UI/UX",
    title: "UI/UX Design",
    description: "Desain antarmuka yang intuitif dan pengalaman pengguna yang memukau untuk produk digital Anda.",
    icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z",
    features: ["User Research", "Wireframing", "Prototyping", "Design System"]
  },
  {
    tag: "04 / MARKETING",
    title: "Digital Marketing",
    description: "Tingkatkan visibilitas online dan konversi bisnis Anda dengan strategi digital marketing terbaik.",
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    features: ["SEO Optimization", "Social Media Management", "Content Marketing"]
  },
  {
    tag: "05 / CLOUD",
    title: "Cloud Solutions",
    description: "Optimalkan infrastruktur IT bisnis Anda dengan solusi cloud yang scalable dan aman.",
    icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z",
    features: ["Cloud Migration", "Server Management", "Data Backup", "Security Monitoring"]
  },
  {
    tag: "06 / KONSULTASI",
    title: "Konsultasi IT",
    description: "Dapatkan solusi dan arahan teknologi yang tepat untuk kebutuhan bisnis Anda dengan konsultasi ahli.",
    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    features: ["IT Strategy", "Digital Transformation", "Technology Roadmap"]
  }
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Konsultasi",
    description: "Kami mendengarkan kebutuhan dan tujuan bisnis Anda untuk memahami permasalahan yang perlu diatasi."
  },
  {
    step: "02",
    title: "Perencanaan",
    description: "Kami membuat rencana proyek yang detail dengan timeline, anggaran, dan deliverables yang jelas."
  },
  {
    step: "03",
    title: "Eksekusi",
    description: "Tim ahli kami mengerjakan solusi dengan teknologi terkini dan metodologi terbaik."
  },
  {
    step: "04",
    title: "Pengujian",
    description: "Kami melakukan pengujian menyeluruh untuk memastikan kualitas dan performa optimal."
  },
  {
    step: "05",
    title: "Peluncuran",
    description: "Kami membantu meluncurkan solusi dan memastikan segala sesuatu berjalan dengan baik."
  },
  {
    step: "06",
    title: "Dukungan",
    description: "Kami memberikan dukungan pasca-peluncuran dan pemeliharaan untuk kepuasan jangka panjang."
  }
];

const VALUES = [
  {
    num: "01",
    title: "Inovasi",
    description: "Selalu mencari cara baru dan kreatif untuk menyelesaikan tantangan teknologi.",
    icon: "M13 10V3L4 14h7v7l9-11h-7z"
  },
  {
    num: "02",
    title: "Kolaborasi",
    description: "Bekerja sama dengan klien sebagai mitra untuk mencapai hasil terbaik bersama.",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
  },
  {
    num: "03",
    title: "Kualitas",
    description: "Berkomitmen mengdelivery solusi berkualitas tinggi yang melampaui ekspektasi.",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
  }
];

const STATS = [
  { num: "01", label: "LAYANAN UTAMA", title: "6 Bidang", sub: "Ekosistem digital lengkap" },
  { num: "02", label: "PROYEK SELESAI", title: "30+ Rilis", sub: "Web, Mobile, & Cloud" },
  { num: "03", label: "STANDAR KUALITAS", title: "Enterprise", sub: "Arsitektur teruji & aman" },
  { num: "04", label: "DUKUNGAN TEKNIS", title: "End-to-End", sub: "Dari ide hingga rilis" },
];

export const Services: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const servicesGridRef = useRef<HTMLDivElement>(null);
  const processGridRef = useRef<HTMLDivElement>(null);
  const valuesGridRef = useRef<HTMLDivElement>(null);
  const ctaSectionRef = useRef<HTMLDivElement>(null);

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
            scrollTrigger: { trigger: statsRef.current, start: "top 80%" },
          }
        );
      }

      // Services grid
      if (servicesGridRef.current) {
        gsap.fromTo(
          servicesGridRef.current.querySelectorAll(".service-card"),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            scrollTrigger: { trigger: servicesGridRef.current, start: "top 80%" },
          }
        );
      }

      // Process grid
      if (processGridRef.current) {
        gsap.fromTo(
          processGridRef.current.querySelectorAll(".process-card"),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            scrollTrigger: { trigger: processGridRef.current, start: "top 80%" },
          }
        );
      }

      // Values grid
      if (valuesGridRef.current) {
        gsap.fromTo(
          valuesGridRef.current.querySelectorAll(".value-card"),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            scrollTrigger: { trigger: valuesGridRef.current, start: "top 80%" },
          }
        );
      }

      // CTA section
      if (ctaSectionRef.current) {
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
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Helmet>
        <title>Layanan Kami - Web Development, Mobile App, UI/UX Design | Genion Team</title>
        <meta name="description" content="6 layanan digital profesional: Web Development, Mobile App, Digital Marketing, UI/UX Design, Frontend Development, dan Cloud Solutions. Standar enterprise, hasil terpercaya." />
        <meta property="og:title" content="Layanan Kami - Web Development, Mobile App, UI/UX Design | Genion Team" />
        <meta property="og:description" content="6 layanan digital profesional: Web Development, Mobile App, Digital Marketing, UI/UX Design, Frontend Development, dan Cloud Solutions. Standar enterprise, hasil terpercaya." />
        <meta property="og:url" content="https://genion.site/services" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://genion.site/og-image.webp" />
        <meta property="og:locale" content="id_ID" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Layanan Kami - Web Development, Mobile App, UI/UX Design | Genion Team" />
        <meta name="twitter:description" content="6 layanan digital profesional: Web Development, Mobile App, Digital Marketing, UI/UX Design, Frontend Development, dan Cloud Solutions. Standar enterprise, hasil terpercaya." />
        <meta name="twitter:image" content="https://genion.site/og-image.webp" />
        <link rel="canonical" href="https://genion.site/services" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "OfferCatalog",
            "name": "Layanan Digital Genion Team",
            "description": "Layanan pengembangan web, mobile app, UI/UX design, digital marketing, cloud solutions, dan konsultasi IT profesional",
            "provider": {
              "@type": "Organization",
              "name": "Genion Team",
              "url": "https://genion.site"
            },
            "itemListElement": SERVICES.map((service, index) => ({
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": service.title,
                "description": service.description,
                "serviceType": service.title,
                "provider": {
                  "@type": "Organization",
                  "name": "Genion Team"
                }
              },
              "position": index + 1
            }))
          })}
        </script>
      </Helmet>
      {/* ─── SECTION 1: HERO ─── */}
      <section
        ref={heroRef}
        className="relative bg-white dark:bg-[#0d0d0d] pt-36 sm:pt-44 pb-24 sm:pb-32 overflow-hidden"
      >
        {/* Radial glow */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_60%_at_10%_40%,rgba(8,145,178,0.06),transparent)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          {/* Eyebrow badge */}
          <div ref={eyebrowRef} className="flex items-center gap-3 mb-8 opacity-0">
            <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-[#111] border border-gray-300 dark:border-[#222] flex items-center justify-center">
              <img src="/genion_logo.png" className="w-4 h-4 object-contain" alt="Genion logo" />
            </div>
            <span className="text-xs font-mono text-gray-500 tracking-widest uppercase">
              Genion Team · Layanan Solusi Digital
            </span>
          </div>

          {/* H1 — 3 broad lines with GSAP line animation */}
          <h1
            ref={headingRef}
            className="font-poppins font-bold leading-[1.05] text-gray-900 dark:text-white mb-8"
          >
            {/* Line 1 */}
            <span className="block text-5xl sm:text-7xl lg:text-[5.2rem] overflow-hidden">
              <span className="block translate-y-full opacity-0" data-gsap="line">
                Solusi digital terdepan
              </span>
            </span>
            {/* Line 2 — with cyan accent */}
            <span className="block text-5xl sm:text-7xl lg:text-[5.2rem] overflow-hidden">
              <span className="block translate-y-full opacity-0" data-gsap="line">
                untuk <span className="text-[#0891b2]">percepatan bisnis</span>
              </span>
            </span>
            {/* Line 3 */}
            <span className="block text-5xl sm:text-7xl lg:text-[5.2rem] overflow-hidden">
              <span className="block translate-y-full opacity-0" data-gsap="line">
                di era modern.
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-xl leading-relaxed mb-10 opacity-0"
          >
            Kami menyediakan rangkaian layanan rekayasa perangkat lunak, perancangan antarmuka, hingga solusi cloud berskala enterprise.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3 opacity-0">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#0891b2] hover:bg-cyan-300 text-black font-semibold text-sm px-6 py-3 rounded-md transition-all duration-200"
            >
              KONSULTASI SEKARANG
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-2 border border-[#0891b2] text-[#0891b2] hover:bg-[#0891b2] hover:text-black font-medium text-sm px-6 py-3 rounded-md transition-all duration-200"
            >
              LIHAT PORTOFOLIO
            </Link>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: STATS STRIP ─── */}
      <section className="bg-white dark:bg-[#0d0d0d] border-t border-gray-200 dark:border-white/5">
        <div
          ref={statsRef}
          className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16 grid grid-cols-2 md:grid-cols-4 gap-8"
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

      {/* ─── SECTION 3: SERVICES LIST (Main Grid - 6 Services) ─── */}
      <section id="services-list" className="bg-white dark:bg-[#0d0d0d] py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <p className="section-badge">[ 01 • KATALOG LAYANAN ]</p>
          <h2 className="font-poppins font-bold text-gray-900 dark:text-white text-3xl sm:text-4xl leading-tight mb-4">
            Solusi Komprehensif
            <br />
            Untuk Berbagai Kebutuhan
          </h2>
          <p className="text-gray-500 dark:text-gray-500 text-sm max-w-xl mb-12">
            Setiap layanan dikerjakan oleh tim spesialis dengan metodologi teruji.
          </p>

          <div
            ref={servicesGridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {SERVICES.map((service, idx) => (
              <div
                key={idx}
                className="service-card bg-gray-100 dark:bg-[#111111] border border-gray-200 dark:border-[#1f1f1f] rounded-xl p-8 hover:border-[#0891b2]/40 transition-all duration-300 opacity-0 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[#0891b2] font-mono text-xs uppercase mb-4 block">
                    {service.tag}
                  </span>
                  <div className="w-12 h-12 bg-[#0891b2]/10 border border-[#0891b2]/20 rounded-lg flex items-center justify-center text-[#0891b2] mb-6">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={service.icon} />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold font-poppins text-gray-900 dark:text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-500 text-xs leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-8">
                    {service.features.map((f, fIdx) => (
                      <li key={fIdx} className="text-gray-600 dark:text-gray-400 text-xs flex items-center gap-2">
                        <span className="text-[#0891b2] font-mono">→</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 border border-[#0891b2] text-[#0891b2] hover:bg-[#0891b2] hover:text-black font-medium text-xs px-4 py-2.5 rounded-md transition-all duration-200 w-full"
                >
                  <span>Diskusi Kebutuhan</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: PROCESS SECTION (Workflow - 6 Steps) ─── */}
      <section className="bg-gray-50 dark:bg-[#0a0a0a] py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <p className="section-badge">[ 02 • ALUR KERJA ]</p>
          <h2 className="font-poppins font-bold text-gray-900 dark:text-white text-3xl sm:text-4xl leading-tight mb-4">
            Metodologi Eksekusi
            <br />
            Yang Terstruktur
          </h2>
          <p className="text-gray-500 dark:text-gray-500 text-sm max-w-xl mb-12">
            Tahapan jelas dan transparan untuk memastikan proyek selesai tepat waktu dan berstandar tinggi.
          </p>

          <div
            ref={processGridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {PROCESS_STEPS.map((step, idx) => (
              <div
                key={idx}
                className="process-card bg-gray-100 dark:bg-[#111111] border border-gray-200 dark:border-[#1f1f1f] rounded-xl p-6 sm:p-8 hover:border-[#0891b2]/40 transition-all duration-300 opacity-0"
              >
                <span className="text-2xl font-bold font-mono text-[#0891b2] mb-3 block">
                  {step.step}
                </span>
                <h3 className="text-lg font-bold font-poppins text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-500 text-xs leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: VALUES / PRINSIP KERJA ─── */}
      <section className="bg-white dark:bg-[#0d0d0d] py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <p className="section-badge">[ 03 • KOMITMEN LAYANAN ]</p>
          <h2 className="font-poppins font-bold text-gray-900 dark:text-white text-3xl sm:text-4xl leading-tight mb-4">
            Prinsip Utama
            <br />
            Dalam Setiap Karya
          </h2>
          <p className="text-gray-500 dark:text-gray-500 text-sm max-w-xl mb-12">
            Fondasi yang melandasi integritas dan kepuasan jangka panjang klien kami.
          </p>

          <div
            ref={valuesGridRef}
            className="grid md:grid-cols-3 gap-6"
          >
            {VALUES.map((item, idx) => (
              <div
                key={idx}
                className="value-card bg-gray-100 dark:bg-[#111111] border border-gray-200 dark:border-[#1f1f1f] rounded-xl p-6 sm:p-8 hover:border-[#0891b2]/40 transition-all duration-300 opacity-0"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-lg font-mono font-bold text-[#0891b2]">
                    {item.num}
                  </span>
                  <div className="w-10 h-10 bg-[#0891b2]/10 border border-[#0891b2]/20 rounded-lg flex items-center justify-center text-[#0891b2]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-bold font-poppins text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-500 text-xs leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: CTA SECTION ─── */}
      <section className="bg-white dark:bg-[#0d0d0d] py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div
            ref={ctaSectionRef}
            className="border border-gray-200 dark:border-[#1f1f1f] bg-gray-50 dark:bg-[#0f0f0f] rounded-2xl p-10 sm:p-16 text-center max-w-4xl mx-auto opacity-0"
          >
            <p className="section-badge mx-auto mb-6">[ 04 • MULAI PROYEK ]</p>
            <h2 className="font-poppins font-bold text-gray-900 dark:text-white text-3xl sm:text-4xl leading-tight mb-4">
              Punya Ide atau Proyek
              <br />
              Yang Ingin Diwujudkan?
            </h2>
            <p className="text-gray-500 dark:text-gray-500 text-sm max-w-md mx-auto mb-8">
              Jadwalkan konsultasi gratis bersama tim teknis kami untuk evaluasi arsitektur dan estimasi pengembangan.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#0891b2] hover:bg-cyan-300 text-black font-semibold text-sm px-6 py-3 rounded-md transition-all duration-200 mb-8"
            >
              MULAI KONSULTASI GRATIS
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            {/* Trust pills */}
            <div className="flex flex-wrap justify-center gap-3 mt-2">
              {[
                "✓ Estimasi Transparan",
                "✓ NDA & Kerahasiaan Data",
                "✓ Garansi Pasca-Rilis",
              ].map((pill, i) => (
                <span
                  key={i}
                  className="text-xs text-gray-500 dark:text-gray-500 bg-gray-100 dark:bg-[#111] border border-gray-200 dark:border-[#1f1f1f] px-3 py-1 rounded-full"
                >
                  {pill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
