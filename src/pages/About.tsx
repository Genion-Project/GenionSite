import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FounderMember {
  name: string;
  role: string;
  description: string;
  skills: string[];
  initials: string;
  color: string;
  image: string;
  linkedin: string;
  twitter: string;
  email: string;
}

const FOUNDER_MEMBERS: FounderMember[] = [
  {
    name: "Nafil Habibi Mulyadi",
    role: "CEO & Founder",
    description: "Visioner yang memimpin transformasi digital dengan pengalaman 5+ tahun di industri teknologi",
    skills: ["Leadership", "Full Stack", "Cloud Architecture", "Machine Learning", "Robotic"],
    initials: "NF",
    color: "from-blue-500 to-indigo-600",
    image: "/nafil.jpeg",
    linkedin: "#",
    twitter: "#",
    email: "nafil@genion.com"
  },
  {
    name: "Muhammad Yusuf",
    role: "Fullstack Developer",
    description: "Expert teknologi yang menghadirkan solusi inovatif terdepan dengan fokus pada user experience",
    skills: ["Laravel", "PHP", "PostgreSQL", "Figma", "Astro", "Python", "Tailwind CSS"],
    initials: "YF",
    color: "from-purple-500 to-pink-600",
    image: "/yusuf.jpeg",
    linkedin: "#",
    twitter: "#",
    email: "yusuf@genion.com"
  },
  {
    name: "Boy Cahya Madinah",
    role: "Quality Control",
    description: "Berpengalaman di bidang pengembangan perangkat lunak. Terampil dalam melakukan review, pengujian, dan memastikan setiap produk memenuhi standar kualitas tinggi.",
    skills: ["Testing", "DevTools", "GitHub", "Figma", "Tailwind CSS"],
    initials: "BY",
    color: "from-green-500 to-teal-600",
    image: "/boy.jpeg",
    linkedin: "#",
    twitter: "#",
    email: "boy@genion.com"
  },
  {
    name: "Chacha Pelangi Parawansha",
    role: "Digital Marketing Specialist",
    description: "Ahli pemasaran digital yang mengoptimalkan visibilitas brand online dengan strategi data-driven",
    skills: ["Figma", "Canva", "Content Strategy"],
    initials: "CP",
    color: "from-orange-500 to-red-600",
    image: "/chacha.webp",
    linkedin: "#",
    twitter: "#",
    email: "chacha@genion.com"
  }
];

export const About: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const visiMisiRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const foundersRef = useRef<HTMLDivElement>(null);
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

      // Visi & Misi cards
      gsap.fromTo(
        visiMisiRef.current!.querySelectorAll(".vm-card"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          scrollTrigger: { trigger: visiMisiRef.current, start: "top 80%" },
        }
      );

      // Values cards
      gsap.fromTo(
        valuesRef.current!.querySelectorAll(".value-card"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: { trigger: valuesRef.current, start: "top 80%" },
        }
      );

      // Founder cards
      gsap.fromTo(
        foundersRef.current!.querySelectorAll(".founder-card"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: { trigger: foundersRef.current, start: "top 80%" },
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
        <title>Tentang Kami - Tim Inovasi Teknologi | Genion Team</title>
        <meta name="description" content="Kenali Genion Team, tim profesional berdedikasi dengan 11 anggota ahli, 30+ proyek selesai, dan 2+ tahun pengalaman dalam solusi digital modern." />
        <meta property="og:title" content="Tentang Kami - Tim Inovasi Teknologi | Genion Team" />
        <meta property="og:description" content="Kenali Genion Team, tim profesional berdedikasi dengan 11 anggota ahli, 30+ proyek selesai, dan 2+ tahun pengalaman dalam solusi digital modern." />
        <meta property="og:url" content="https://genion.vercel.app/about" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://genion.vercel.app/og-image.webp" />
        <meta property="og:locale" content="id_ID" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tentang Kami - Tim Inovasi Teknologi | Genion Team" />
        <meta name="twitter:description" content="Kenali Genion Team, tim profesional berdedikasi dengan 11 anggota ahli, 30+ proyek selesai, dan 2+ tahun pengalaman dalam solusi digital modern." />
        <meta name="twitter:image" content="https://genion.vercel.app/og-image.webp" />
        <link rel="canonical" href="https://genion.vercel.app/about" />
      </Helmet>
      {/* ─── SECTION 1: HERO ─── */}
      <section
        ref={heroRef}
        className="relative bg-white dark:bg-[#0d0d0d] pt-36 sm:pt-44 pb-24 sm:pb-32 overflow-hidden"
      >
        {/* Radial glow */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_60%_at_10%_40%,rgba(8,145,178,0.06),transparent)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          {/* Eyebrow */}
          <div ref={eyebrowRef} className="flex items-center gap-3 mb-8 opacity-0">
            <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-[#111] border border-gray-300 dark:border-[#222] flex items-center justify-center">
              <img src="/genion_logo.png" className="w-4 h-4 object-contain" alt="Genion logo" />
            </div>
            <span className="text-xs font-mono text-gray-500 tracking-widest uppercase">
              Genion Team · Tentang Kami
            </span>
          </div>

          {/* H1 — 3 lines */}
          <h1
            ref={headingRef}
            className="font-poppins font-bold leading-[1.05] text-gray-900 dark:text-white mb-8"
          >
            {/* Line 1 */}
            <span className="block text-5xl sm:text-7xl lg:text-[5.2rem] overflow-hidden">
              <span className="block translate-y-full opacity-0" data-gsap="line">
                Mengenal lebih dekat
              </span>
            </span>
            {/* Line 2 — with accent word */}
            <span className="block text-5xl sm:text-7xl lg:text-[5.2rem] overflow-hidden">
              <span className="block translate-y-full opacity-0" data-gsap="line">
                <span className="text-[#0891b2]">Genion Team</span> &amp;
              </span>
            </span>
            {/* Line 3 */}
            <span className="block text-5xl sm:text-7xl lg:text-[5.2rem] overflow-hidden">
              <span className="block translate-y-full opacity-0" data-gsap="line">
                visi besar kami.
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-xl leading-relaxed mb-10 opacity-0"
          >
            Kami adalah tim inovasi teknologi yang berdedikasi menciptakan solusi digital modern,
            berkelanjutan, dan berdampak nyata bagi pertumbuhan bisnis Anda.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3 opacity-0">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#0891b2] hover:bg-cyan-300 text-black font-semibold text-sm px-6 py-3 rounded-md transition-all duration-200"
            >
              HUBUNGI KAMI
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              to="/team"
              className="inline-flex items-center gap-2 border border-[#0891b2] text-[#0891b2] hover:bg-[#0891b2] hover:text-black font-medium text-sm px-6 py-3 rounded-md transition-all duration-200"
            >
              KENALI TIM KAMI
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
          {[
            { num: "01", label: "BERDIRI", title: "2024", sub: "Tim inovasi sejak 2024" },
            { num: "02", label: "ANGGOTA", title: "11 Orang", sub: "Tim profesional berdedikasi" },
            { num: "03", label: "PROYEK", title: "30+ Selesai", sub: "Berbagai klien puas" },
            { num: "04", label: "LAYANAN", title: "6 Bidang", sub: "Web, Mobile, AI, IoT, UI/UX" },
          ].map((s, i) => (
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

      {/* ─── SECTION 3: VISI & MISI ─── */}
      <section className="bg-white dark:bg-[#0d0d0d] py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          {/* Badge */}
          <p className="section-badge">[ 01 • VISI &amp; MISI ]</p>
          <h2 className="font-poppins font-bold text-gray-900 dark:text-white text-3xl sm:text-4xl leading-tight max-w-xl mb-4">
            Tujuan &amp; Arah
            <br />
            Genion Team
          </h2>
          <p className="text-gray-500 dark:text-gray-500 text-sm max-w-md mb-14">
            Landasan yang memandu setiap langkah perjalanan kami menuju inovasi digital berkelanjutan.
          </p>

          <div ref={visiMisiRef} className="grid md:grid-cols-2 gap-6">
            {/* Visi Card */}
            <div className="vm-card bg-gray-100 dark:bg-[#111111] border border-gray-200 dark:border-[#1f1f1f] rounded-xl p-8 opacity-0">
              <p className="text-[10px] font-mono tracking-widest text-[#0891b2] uppercase mb-4">01</p>
              <h3 className="font-poppins font-bold text-gray-900 dark:text-white text-xl mb-3">Visi Kami</h3>
              <p className="text-gray-500 dark:text-gray-500 text-sm leading-relaxed mb-6">
                Menjadi Organisasi teknologi terdepan yang menghadirkan inovasi digital berkelanjutan,
                menciptakan solusi yang memberdayakan bisnis dan masyarakat untuk mencapai potensi maksimal mereka.
              </p>
              <div className="space-y-3">
                {[
                  "Inovasi berkelanjutan dalam teknologi",
                  "Solusi yang memberdayakan masyarakat",
                  "Kepemimpinan di industri teknologi",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0891b2] flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-400 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Misi Card */}
            <div className="vm-card bg-gray-100 dark:bg-[#111111] border border-gray-200 dark:border-[#1f1f1f] rounded-xl p-8 opacity-0">
              <p className="text-[10px] font-mono tracking-widest text-[#0891b2] uppercase mb-4">02</p>
              <h3 className="font-poppins font-bold text-gray-900 dark:text-white text-xl mb-3">Misi Kami</h3>
              <p className="text-gray-500 dark:text-gray-500 text-sm leading-relaxed mb-6">
                Mengembangkan dan mengimplementasikan solusi teknologi yang inovatif, mudah digunakan, dan berdampak positif
                bagi klien dan masyarakat melalui dedikasi, kreativitas, dan komitmen terhadap kualitas.
              </p>
              <div className="space-y-3">
                {[
                  "Mengembangkan solusi teknologi inovatif",
                  "Memberikan pelayanan berkualitas tinggi",
                  "Menciptakan dampak positif bagi masyarakat",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0891b2] flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-400 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: NILAI-NILAI ─── */}
      <section className="bg-gray-50 dark:bg-[#0a0a0a] py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          {/* Badge */}
          <p className="section-badge">[ 02 • NILAI KAMI ]</p>
          <h2 className="font-poppins font-bold text-gray-900 dark:text-white text-3xl sm:text-4xl leading-tight max-w-xl mb-4">
            Prinsip yang
            <br />
            Memandu Kami
          </h2>
          <p className="text-gray-500 dark:text-gray-500 text-sm max-w-md mb-14">
            Nilai-nilai fundamental yang memandu setiap langkah dan keputusan dalam perjalanan kami.
          </p>

          <div ref={valuesRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                n: "01",
                title: "Inovasi",
                desc: "Selalu mencari cara baru dan kreatif untuk menyelesaikan masalah dengan teknologi terdepan.",
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
              },
              {
                n: "02",
                title: "Integritas",
                desc: "Berkomitmen pada kejujuran, transparansi, dan etika dalam setiap aspek bisnis kami.",
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                ),
              },
              {
                n: "03",
                title: "Kolaborasi",
                desc: "Membangun kemitraan yang kuat dengan klien dan tim internal untuk mencapai hasil terbaik.",
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
              },
              {
                n: "04",
                title: "Kualitas",
                desc: "Mengutamakan standar kualitas tinggi dalam setiap produk dan layanan yang kami berikan.",
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
              },
            ].map((val, i) => (
              <div
                key={i}
                className="value-card bg-gray-100 dark:bg-[#111111] border border-gray-200 dark:border-[#1f1f1f] rounded-xl p-6 hover:border-[#0891b2]/40 transition-all duration-300 opacity-0"
              >
                <p className="text-[10px] font-mono text-[#0891b2] tracking-widest uppercase mb-3">{val.n}</p>
                <div className="text-[#0891b2] mb-3">{val.icon}</div>
                <h3 className="font-bold text-gray-900 dark:text-white text-base mb-2">{val.title}</h3>
                <p className="text-gray-500 dark:text-gray-500 text-xs leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: FOUNDER TEAM ─── */}
      <section className="bg-white dark:bg-[#0d0d0d] py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          {/* Badge */}
          <p className="section-badge">[ 03 • TIM FOUNDER ]</p>
          <h2 className="font-poppins font-bold text-gray-900 dark:text-white text-3xl sm:text-4xl leading-tight max-w-xl mb-4">
            Orang-Orang di
            <br />
            Balik Genion
          </h2>
          <p className="text-gray-500 dark:text-gray-500 text-sm max-w-md mb-14">
            Bertemu dengan para ahli yang akan menjadi mitra terpercaya dalam perjalanan transformasi digital Anda.
          </p>

          <div ref={foundersRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FOUNDER_MEMBERS.map((member, index) => (
              <div
                key={index}
                className="founder-card bg-gray-100 dark:bg-[#111111] border border-gray-200 dark:border-[#1f1f1f] rounded-xl overflow-hidden hover:border-[#0891b2]/40 transition-all duration-300 opacity-0"
              >
                {/* Photo */}
                <div className="aspect-[4/5] w-full overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-poppins font-bold text-gray-900 dark:text-white text-base mb-0.5">
                    {member.name}
                  </h3>
                  <p className="text-[#0891b2] text-xs font-mono uppercase tracking-wider mb-2">
                    {member.role}
                  </p>
                  <p className="text-gray-500 dark:text-gray-500 text-xs leading-relaxed mb-3">
                    {member.description}
                  </p>
                  {/* Skills */}
                  <div className="flex flex-wrap gap-1">
                    {member.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 bg-gray-200 dark:bg-[#1a1a1a] border border-gray-300 dark:border-[#2a2a2a] text-gray-600 dark:text-gray-400 text-[10px] rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: CTA ─── */}
      <section className="bg-white dark:bg-[#0d0d0d] py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div
            ref={ctaSectionRef}
            className="border border-gray-200 dark:border-[#1f1f1f] bg-gray-50 dark:bg-[#0f0f0f] rounded-2xl p-10 sm:p-16 text-center max-w-4xl mx-auto opacity-0"
          >
            <p className="section-badge mx-auto mb-6">[ 04 • MULAI BERSAMA ]</p>
            <h2 className="font-poppins font-bold text-gray-900 dark:text-white text-3xl sm:text-4xl leading-tight mb-4">
              Wujudkan Visi Digital
              <br />
              Bersama Genion Team
            </h2>
            <p className="text-gray-500 dark:text-gray-500 text-sm max-w-md mx-auto mb-8">
              Mari berkolaborasi dan wujudkan solusi digital terbaik bersama tim kami yang berdedikasi dan inovatif.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#0891b2] hover:bg-cyan-300 text-black font-semibold text-sm px-6 py-3 rounded-md transition-all duration-200 mb-8"
            >
              HUBUNGI KAMI
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            {/* Trust pills */}
            <div className="flex flex-wrap justify-center gap-3 mt-2">
              {[
                "✓ Tim Founder Berdedikasi",
                "✓ Inovasi Berkelanjutan",
                "✓ Solusi Terpercaya",
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
