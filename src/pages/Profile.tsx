import React, { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { allMembers, type TeamMember } from "../data/team";

gsap.registerPlugin(ScrollTrigger);

// Robust ID parser supporting "GENION-01", "genion-01", "1", "01", or name slug
const parseMemberIndex = (paramId: string | undefined): number => {
  if (!paramId) return -1;
  const clean = paramId.trim();

  // Pattern: GENION-01, genion-1, genion_01
  const prefixMatch = clean.match(/^genion[-_]?(\d+)$/i);
  if (prefixMatch) {
    const num = parseInt(prefixMatch[1], 10);
    if (!isNaN(num) && num >= 1 && num <= allMembers.length) {
      return num - 1;
    }
  }

  // Pattern: pure digits "1", "01", "11"
  if (/^\d+$/.test(clean)) {
    const num = parseInt(clean, 10);
    if (!isNaN(num) && num >= 1 && num <= allMembers.length) {
      return num - 1;
    }
  }

  // Name / slug match fallback: "nafil", "yusuf", "stanly", "stanley", etc.
  const normalized = clean.toLowerCase().replace(/[^a-z0-9]/g, "");
  const searchNorm = normalized.replace(/stanley/g, "stanly");
  const foundIndex = allMembers.findIndex((m) => {
    const mNorm = m.name.toLowerCase().replace(/[^a-z0-9]/g, "");
    return mNorm.includes(searchNorm) || searchNorm.includes(mNorm);
  });
  if (foundIndex !== -1) return foundIndex;

  return -1;
};

const formatMemberId = (index: number): string =>
  `GENION-${String(index + 1).padStart(2, "0")}`;

// Department & specialization helper based on role
const getDepartmentInfo = (role: string) => {
  const r = role.toLowerCase();
  if (r.includes("founder") || r.includes("chief") || r.includes("ceo") || r.includes("innovation")) {
    return {
      department: "Eksekutif & Inovasi",
      tag: "LEADERSHIP",
      focusTitle: "Kepemimpinan Strategis & Inovasi Digital",
      focusDesc:
        "Mengarahkan visi teknologi, membangun kemitraan berdampak tinggi, dan memastikan setiap inisiatif Genion selaras dengan standar inovasi modern.",
    };
  }
  if (r.includes("cloud") || r.includes("infrastruktur") || r.includes("infrastructure") || r.includes("devops")) {
    return {
      department: "Infrastruktur & Cloud",
      tag: "CLOUD INFRASTRUCTURE",
      focusTitle: "Arsitektur Cloud & Keandalan Sistem",
      focusDesc:
        "Merancang arsitektur cloud yang scalable, otomatisasi server, keamanan sistem, serta menjamin keandalan operasional infrastruktur performa tinggi.",
    };
  }
  if (r.includes("backend")) {
    return {
      department: "Rekayasa Backend",
      tag: "BACKEND ENGINEERING",
      focusTitle: "Arsitektur Sistem & Ketahanan Data",
      focusDesc:
        "Merancang arsitektur API yang aman, optimasi basis data skala tinggi, dan keandalan sistem server untuk performa tanpa hambatan.",
    };
  }
  if (r.includes("frontend")) {
    return {
      department: "Pengembangan Antarmuka Web",
      tag: "FRONTEND",
      focusTitle: "Antarmuka Responsif & Pengalaman Interaktif",
      focusDesc:
        "Mewujudkan antarmuka modern yang cepat, ramah pengguna, dan konsisten di seluruh perangkat dengan standar kode modern.",
    };
  }
  if (r.includes("full stack") || r.includes("fullstack")) {
    return {
      department: "Rekayasa Full-Stack",
      tag: "FULL STACK",
      focusTitle: "Solusi Terintegrasi End-to-End",
      focusDesc:
        "Menghubungkan arsitektur server, basis data, dan antarmuka pengguna menjadi satu kesatuan produk digital yang kohesif.",
    };
  }
  if (r.includes("ui/ux") || r.includes("designer")) {
    return {
      department: "Desain Produk & Riset UX",
      tag: "PRODUCT DESIGN",
      focusTitle: "Desain Berpusat pada Manusia & Sistem Desain",
      focusDesc:
        "Mengubah masalah kompleks menjadi alur kerja intuitif dan pengalaman visual yang memikat dengan sistem desain terukur.",
    };
  }
  if (r.includes("quality") || r.includes("qc") || r.includes("test")) {
    return {
      department: "Jaminan Mutu & Keandalan",
      tag: "QUALITY CONTROL",
      focusTitle: "Standar Kualitas & Verifikasi Produk",
      focusDesc:
        "Menguji setiap fungsionalitas, performa, dan keamanan secara komprehensif guna memastikan rilis produk bebas cacat.",
    };
  }
  if (r.includes("marketing")) {
    return {
      department: "Pemasaran Digital & Pertumbuhan",
      tag: "GROWTH & MARKETING",
      focusTitle: "Strategi Visibilitas & Konversi Berbasis Data",
      focusDesc:
        "Mengoptimalkan akuisisi audiens, strategi konten berdampak, dan visibilitas brand di seluruh kanal digital.",
    };
  }
  return {
    department: "Teknologi & Solusi Digital",
    tag: "SPECIALIST",
    focusTitle: "Pengembangan Solusi Digital Berkelanjutan",
    focusDesc:
      "Mendedikasikan keahlian mendalam untuk menghadirkan produk digital yang bernilai tinggi dan berkelanjutan.",
  };
};

export const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [imgError, setImgError] = useState(false);

  // GSAP animation refs
  const heroRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const contributionRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const suggestedRef = useRef<HTMLDivElement>(null);
  const ctaSectionRef = useRef<HTMLDivElement>(null);

  const memberIndex = parseMemberIndex(id);
  const member: TeamMember | null = memberIndex !== -1 ? allMembers[memberIndex] : null;
  const currentId = memberIndex !== -1 ? formatMemberId(memberIndex) : "";

  // Reset image error state whenever viewing a different member
  useEffect(() => {
    setImgError(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  // GSAP animations
  useEffect(() => {
    if (!member) return;

    const ctx = gsap.context(() => {
      // Hero timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (eyebrowRef.current) {
        tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.2);
      }

      if (headingRef.current) {
        tl.to(
          headingRef.current.querySelectorAll("[data-gsap='line']"),
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.12 },
          0.35
        );
      }

      if (subtitleRef.current) {
        tl.to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.8);
      }

      if (actionsRef.current) {
        tl.to(actionsRef.current, { opacity: 1, y: 0, duration: 0.5 }, 0.95);
      }

      // Stats strip animation
      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.querySelectorAll(".stat-item"),
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            scrollTrigger: { trigger: statsRef.current, start: "top 85%" },
          }
        );
      }

      // Spotlight card animation
      if (spotlightRef.current) {
        gsap.fromTo(
          spotlightRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            scrollTrigger: { trigger: spotlightRef.current, start: "top 85%" },
          }
        );
      }

      // Skills section animation
      if (skillsRef.current) {
        gsap.fromTo(
          skillsRef.current.querySelectorAll(".skill-card-item"),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.05,
            scrollTrigger: { trigger: skillsRef.current, start: "top 85%" },
          }
        );
      }

      // Contribution cards animation
      if (contributionRef.current) {
        gsap.fromTo(
          contributionRef.current.querySelectorAll(".contribution-card"),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            scrollTrigger: { trigger: contributionRef.current, start: "top 85%" },
          }
        );
      }

      // Member navigation animation
      if (navRef.current) {
        gsap.fromTo(
          navRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            scrollTrigger: { trigger: navRef.current, start: "top 90%" },
          }
        );
      }

      // Suggested members animation
      if (suggestedRef.current) {
        gsap.fromTo(
          suggestedRef.current.querySelectorAll(".suggested-card"),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            scrollTrigger: { trigger: suggestedRef.current, start: "top 85%" },
          }
        );
      }

      // CTA section animation
      if (ctaSectionRef.current) {
        gsap.fromTo(
          ctaSectionRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            scrollTrigger: { trigger: ctaSectionRef.current, start: "top 85%" },
          }
        );
      }
    });

    return () => ctx.revert();
  }, [id, member]);

  // Handle copy email
  const handleCopyEmail = (emailStr: string) => {
    if (!emailStr || emailStr === "#") return;
    navigator.clipboard.writeText(emailStr);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  // Handle share profile URL
  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2200);
    }
  };

  // ─── NOT FOUND STATE ───
  if (!member || memberIndex === -1) {
    return (
      <>
        <Helmet>
          <title>Profil Tidak Ditemukan | Genion Team</title>
          <meta name="description" content="Profil anggota tim tidak ditemukan. Kembali ke halaman tim untuk melihat semua anggota Genion Team." />
          <meta property="og:title" content="Profil Tidak Ditemukan | Genion Team" />
          <meta property="og:description" content="Profil anggota tim tidak ditemukan. Kembali ke halaman tim untuk melihat semua anggota Genion Team." />
          <meta property="og:url" content={`https://genion.vercel.app/profile/${id || ''}`} />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="https://genion.vercel.app/og-image.webp" />
          <meta property="og:locale" content="id_ID" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Profil Tidak Ditemukan | Genion Team" />
          <meta name="twitter:description" content="Profil anggota tim tidak ditemukan. Kembali ke halaman tim untuk melihat semua anggota Genion Team." />
          <meta name="twitter:image" content="https://genion.vercel.app/og-image.webp" />
          <link rel="canonical" href={`https://genion.vercel.app/profile/${id || ''}`} />
        </Helmet>
      <section className="min-h-screen bg-white dark:bg-[#0d0d0d] pt-36 sm:pt-44 pb-24 px-6 flex items-center justify-center relative overflow-hidden">
        {/* Subtle radial glow */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_60%_at_50%_35%,rgba(8,145,178,0.08),transparent)]" />

        <div className="max-w-2xl w-full mx-auto text-center relative z-10">
          <p className="section-badge mx-auto mb-4">[ 404 • PROFIL TIDAK DITEMUKAN ]</p>
          
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gray-100 dark:bg-[#161616] border border-gray-200 dark:border-[#262626] flex items-center justify-center text-[#0891b2]">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          <h1 className="font-poppins font-bold text-gray-900 dark:text-white text-3xl sm:text-4xl mb-4">
            Profil Anggota Tidak Ditemukan
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed mb-8 max-w-lg mx-auto">
            Identitas &quot;<span className="font-mono text-[#0891b2]">{id || "N/A"}</span>&quot; tidak terdaftar dalam direktori tim Genion. Silakan periksa kembali tautan atau pilih anggota dari daftar di bawah.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
            <Link
              to="/team"
              className="inline-flex items-center justify-center gap-2 bg-[#0891b2] hover:bg-cyan-300 text-black font-semibold text-sm px-6 py-3 rounded-md transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              KEMBALI KE DAFTAR TIM
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 border border-[#0891b2] text-[#0891b2] hover:bg-[#0891b2] hover:text-black font-medium text-sm px-6 py-3 rounded-md transition-all duration-200"
            >
              HUBUNGI KAMI
            </Link>
          </div>

          {/* Quick list of available team members */}
          <div className="border-t border-gray-200 dark:border-[#1f1f1f] pt-8">
            <p className="text-xs font-mono uppercase tracking-wider text-gray-500 mb-4">
              Jelajahi Anggota Tim Terdaftar:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {allMembers.map((m, idx) => (
                <Link
                  key={idx}
                  to={`/profile/${formatMemberId(idx)}`}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono bg-gray-100 dark:bg-[#141414] border border-gray-200 dark:border-[#222] text-gray-700 dark:text-gray-300 hover:border-[#0891b2] hover:text-[#0891b2] transition-colors"
                >
                  {formatMemberId(idx)} · {m.name.split(" ")[0]}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      </>
    );
  }

  // Prev & Next Member indices
  const total = allMembers.length;
  const prevIndex = (memberIndex - 1 + total) % total;
  const nextIndex = (memberIndex + 1) % total;
  const prevMember = allMembers[prevIndex];
  const nextMember = allMembers[nextIndex];
  const prevId = formatMemberId(prevIndex);
  const nextId = formatMemberId(nextIndex);

  // Department metadata
  const deptInfo = getDepartmentInfo(member.role);

  // 3 other members for preview grid (excluding current)
  const otherMembers = allMembers
    .map((m, idx) => ({ member: m, id: formatMemberId(idx), index: idx }))
    .filter((item) => item.index !== memberIndex)
    .slice(0, 3);

  // Social links sanitation
  const instagramUrl =
    member.instagram && member.instagram !== "#"
      ? member.instagram.startsWith("http")
        ? member.instagram
        : `https://${member.instagram}`
      : null;

  const linkedinUrl =
    member.linkedin && member.linkedin !== "#"
      ? member.linkedin.startsWith("http")
        ? member.linkedin
        : `https://${member.linkedin}`
      : null;

  const twitterUrl =
    member.twitter && member.twitter !== "#"
      ? member.twitter.startsWith("http")
        ? member.twitter
        : `https://${member.twitter}`
      : null;

  const hasValidEmail = member.email && member.email !== "#";

  return (
    <>
      <Helmet>
        <title>{member.name} - {member.role} | Genion Team</title>
        <meta name="description" content={`${member.description} Keahlian: ${member.skills.join(', ')}`} />
        <meta property="og:title" content={`${member.name} - ${member.role} | Genion Team`} />
        <meta property="og:description" content={`${member.description} Keahlian: ${member.skills.join(', ')}`} />
        <meta property="og:url" content={`https://genion.vercel.app/profile/${id}`} />
        <meta property="og:type" content="profile" />
        <meta property="og:image" content={`https://genion.vercel.app${member.image}`} />
        <meta property="og:locale" content="id_ID" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${member.name} - ${member.role} | Genion Team`} />
        <meta name="twitter:description" content={`${member.description} Keahlian: ${member.skills.join(', ')}`} />
        <meta name="twitter:image" content={`https://genion.vercel.app${member.image}`} />
        <link rel="canonical" href={`https://genion.vercel.app/profile/${id}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": member.name,
            "jobTitle": member.role,
            "description": member.description,
            "image": `https://genion.vercel.app${member.image}`,
            ...(hasValidEmail && { "email": member.email }),
            "worksFor": {
              "@type": "Organization",
              "name": "Genion Team",
              "url": "https://genion.vercel.app"
            },
            "knowsAbout": member.skills
          })}
        </script>
      </Helmet>
      {/* ─── SECTION 1: HERO & BREADCRUMBS ─── */}
      <section
        ref={heroRef}
        className="relative bg-white dark:bg-[#0d0d0d] pt-36 sm:pt-44 pb-20 overflow-hidden"
      >
        {/* Subtle cyan radial glow */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_60%_at_15%_35%,rgba(8,145,178,0.07),transparent)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-mono text-gray-500 mb-8">
            <Link
              to="/team"
              className="inline-flex items-center gap-1.5 hover:text-[#0891b2] transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Daftar Tim
            </Link>
            <span>/</span>
            <span className="text-[#0891b2]">{currentId}</span>
          </div>

          {/* Eyebrow badge */}
          <div ref={eyebrowRef} className="flex items-center gap-3 mb-6 opacity-0">
            <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-[#111] border border-gray-300 dark:border-[#222] flex items-center justify-center">
              <img src="/genion_logo.png" className="w-4 h-4 object-contain" alt="Genion logo" />
            </div>
            <span className="text-xs font-mono text-gray-500 tracking-widest uppercase">
              Genion Talent · Direktori Profesional
            </span>
          </div>

          {/* Main H1 Title */}
          <h1
            ref={headingRef}
            className="font-poppins font-bold leading-[1.08] text-gray-900 dark:text-white mb-6"
          >
            <span className="block text-4xl sm:text-6xl lg:text-[4.5rem] overflow-hidden">
              <span className="block translate-y-full opacity-0" data-gsap="line">
                Profil Profesional
              </span>
            </span>
            <span className="block text-4xl sm:text-6xl lg:text-[4.5rem] overflow-hidden">
              <span className="block translate-y-full opacity-0 text-[#0891b2]" data-gsap="line">
                {member.name}
              </span>
            </span>
          </h1>

          {/* Subtitle / Role */}
          <p
            ref={subtitleRef}
            className="text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-2xl leading-relaxed mb-8 opacity-0"
          >
            Berperan sebagai <span className="font-semibold text-gray-900 dark:text-white">{member.role}</span> dalam ekosistem Genion. {member.description}
          </p>

          {/* Quick Action Buttons */}
          <div ref={actionsRef} className="flex flex-wrap items-center gap-3 opacity-0">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#0891b2] hover:bg-cyan-300 text-black font-semibold text-sm px-6 py-3 rounded-md transition-all duration-200 shadow-sm"
            >
              KONSULTASI BERSAMA KAMI
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 border border-gray-300 dark:border-[#222] bg-gray-100 dark:bg-[#141414] text-gray-800 dark:text-gray-200 hover:border-[#0891b2] hover:text-[#0891b2] font-medium text-sm px-5 py-3 rounded-md transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
              {copiedShare ? "Tautan Disalin! ✓" : "Bagikan Profil"}
            </button>

            <Link
              to="/team"
              className="inline-flex items-center gap-2 border border-transparent text-gray-600 dark:text-gray-400 hover:text-[#0891b2] font-medium text-sm px-4 py-3 rounded-md transition-colors"
            >
              Lihat Tim Lengkap
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: STATS STRIP ─── */}
      <section className="bg-gray-50/60 dark:bg-[#0a0a0a] border-y border-gray-200 dark:border-white/5">
        <div
          ref={statsRef}
          className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8"
        >
          <div className="border-l border-gray-200 dark:border-white/10 pl-4 stat-item opacity-0">
            <p className="text-[10px] font-mono tracking-widest uppercase text-gray-500 mb-1">
              01 / IDENTITAS
            </p>
            <p className="text-gray-900 dark:text-white font-bold text-lg sm:text-xl font-mono text-[#0891b2]">
              {currentId}
            </p>
            <p className="text-gray-500 text-xs">Nomor Induk Anggota</p>
          </div>

          <div className="border-l border-gray-200 dark:border-white/10 pl-4 stat-item opacity-0">
            <p className="text-[10px] font-mono tracking-widest uppercase text-gray-500 mb-1">
              02 / DIVISI UTAMA
            </p>
            <p className="text-gray-900 dark:text-white font-bold text-lg sm:text-xl truncate">
              {deptInfo.tag}
            </p>
            <p className="text-gray-500 text-xs truncate">{deptInfo.department}</p>
          </div>

          <div className="border-l border-gray-200 dark:border-white/10 pl-4 stat-item opacity-0">
            <p className="text-[10px] font-mono tracking-widest uppercase text-gray-500 mb-1">
              03 / KOMPETENSI
            </p>
            <p className="text-gray-900 dark:text-white font-bold text-lg sm:text-xl">
              {member.skills.length} Keahlian
            </p>
            <p className="text-gray-500 text-xs">Teknologi Terverifikasi</p>
          </div>

          <div className="border-l border-gray-200 dark:border-white/10 pl-4 stat-item opacity-0">
            <p className="text-[10px] font-mono tracking-widest uppercase text-gray-500 mb-1">
              04 / STATUS VERIFIKASI
            </p>
            <p className="text-emerald-600 dark:text-emerald-400 font-bold text-lg sm:text-xl flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
              Aktif
            </p>
            <p className="text-gray-500 text-xs">Siap Kolaborasi Proyek</p>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: SPOTLIGHT DETAIL CARD ─── */}
      <section className="bg-white dark:bg-[#0d0d0d] py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <p className="section-badge">[ 01 • SPOTLIGHT ANGGOTA ]</p>
          <h2 className="font-poppins font-bold text-gray-900 dark:text-white text-3xl sm:text-4xl leading-tight max-w-xl mb-4">
            Dedikasi &amp; Keunggulan
            <br />
            Dalam Setiap Proyek
          </h2>
          <p className="text-gray-500 dark:text-gray-500 text-sm max-w-lg mb-12">
            Mengenal lebih dekat keahlian teknis, rekam jejak, dan cara kerja yang diterapkan dalam menghadirkan solusi terbaik.
          </p>

          <div
            ref={spotlightRef}
            className="grid lg:grid-cols-12 gap-8 lg:gap-12 bg-gray-100 dark:bg-[#111111] border border-gray-200 dark:border-[#1f1f1f] rounded-2xl p-6 sm:p-10 lg:p-12 hover:border-[#0891b2]/40 transition-all duration-300 opacity-0"
          >
            {/* Left Column: Portrait Image (aspect-[4/5]) */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gray-200 dark:bg-[#1a1a1a] shadow-lg border border-gray-200 dark:border-white/5 group">
                {!imgError && member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${member.color} flex flex-col items-center justify-center text-white p-6`}>
                    <span className="text-7xl font-bold font-poppins mb-2">{member.initials}</span>
                    <span className="text-xs uppercase tracking-widest font-mono opacity-80">Genion Talent</span>
                  </div>
                )}

                {/* Floating badge inside portrait */}
                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-mono text-white uppercase tracking-wider">
                    {member.featured ? "Leader" : "Member"}
                  </span>
                </div>

                <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full">
                  <span className="text-[11px] font-mono text-[#0891b2] font-semibold">
                    {currentId}
                  </span>
                </div>
              </div>

              {/* Status pill under portrait */}
              <div className="mt-4 flex items-center justify-between text-xs text-gray-500 font-mono px-1">
                <span>Basis: Indonesia</span>
                <span className="text-emerald-600 dark:text-emerald-400">● Tersedia untuk Proyek</span>
              </div>
            </div>

            {/* Right Column: Bio, Details & Contacts */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                {/* Badges row */}
                <div className="flex flex-wrap items-center gap-2.5 mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#0891b2] bg-[#0891b2]/10 border border-[#0891b2]/20 px-2.5 py-1 rounded">
                    ID: {currentId}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-[#1a1a1a] border border-gray-300 dark:border-[#2a2a2a] px-2.5 py-1 rounded">
                    {deptInfo.department}
                  </span>
                  {member.featured && (
                    <span className="text-[10px] font-mono uppercase tracking-widest text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded">
                      Featured Leader
                    </span>
                  )}
                </div>

                {/* Name & Role */}
                <h3 className="font-poppins font-bold text-gray-900 dark:text-white text-3xl sm:text-4xl mb-2">
                  {member.name}
                </h3>
                <p className="text-[#0891b2] font-mono text-sm uppercase tracking-wider mb-6">
                  {member.role}
                </p>

                {/* Bio text */}
                <div className="mb-8">
                  <p className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-2">
                    Tentang &amp; Rekam Jejak
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
                    {member.description}
                  </p>
                </div>

                {/* Key metadata grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8 p-4 rounded-xl bg-gray-200/50 dark:bg-[#161616] border border-gray-200 dark:border-[#222]">
                  <div>
                    <p className="text-[10px] font-mono uppercase text-gray-500">Inisial</p>
                    <p className="font-bold text-gray-900 dark:text-white text-sm font-mono">{member.initials}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase text-gray-500">Spesialisasi</p>
                    <p className="font-bold text-gray-900 dark:text-white text-sm truncate">{deptInfo.tag}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase text-gray-500">Kesiapan Kerja</p>
                    <p className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">Full Project</p>
                  </div>
                </div>

                {/* Primary Skills snippet */}
                <div className="mb-8">
                  <p className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-3">
                    Keahlian Kunci
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-3 py-1 bg-gray-200 dark:bg-[#1a1a1a] border border-gray-300 dark:border-[#2a2a2a] text-gray-700 dark:text-gray-300 text-xs rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action and social contacts footer */}
              <div className="pt-6 border-t border-gray-200 dark:border-[#1f1f1f] flex flex-wrap items-center justify-between gap-4">
                {/* Social icons */}
                <div className="flex items-center gap-2">
                  {hasValidEmail && (
                    <button
                      onClick={() => handleCopyEmail(member.email)}
                      title={`Salin email (${member.email})`}
                      className="p-2.5 rounded-lg bg-gray-200 dark:bg-[#1a1a1a] border border-gray-300 dark:border-[#2a2a2a] text-gray-700 dark:text-gray-300 hover:text-[#0891b2] hover:border-[#0891b2] transition-colors relative"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {copiedEmail && (
                        <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] font-mono px-2 py-0.5 rounded shadow">
                          Disalin!
                        </span>
                      )}
                    </button>
                  )}

                  {instagramUrl && (
                    <a
                      href={instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Kunjungi Instagram"
                      className="p-2.5 rounded-lg bg-gray-200 dark:bg-[#1a1a1a] border border-gray-300 dark:border-[#2a2a2a] text-gray-700 dark:text-gray-300 hover:text-[#0891b2] hover:border-[#0891b2] transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                  )}

                  {linkedinUrl && (
                    <a
                      href={linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Kunjungi LinkedIn"
                      className="p-2.5 rounded-lg bg-gray-200 dark:bg-[#1a1a1a] border border-gray-300 dark:border-[#2a2a2a] text-gray-700 dark:text-gray-300 hover:text-[#0891b2] hover:border-[#0891b2] transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                  )}

                  {twitterUrl && (
                    <a
                      href={twitterUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Kunjungi X / Twitter"
                      className="p-2.5 rounded-lg bg-gray-200 dark:bg-[#1a1a1a] border border-gray-300 dark:border-[#2a2a2a] text-gray-700 dark:text-gray-300 hover:text-[#0891b2] hover:border-[#0891b2] transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                  )}
                </div>

                {/* Email / contact CTA */}
                {hasValidEmail ? (
                  <a
                    href={`mailto:${member.email}`}
                    className="inline-flex items-center gap-2 bg-[#0891b2] hover:bg-cyan-300 text-black font-semibold text-xs px-5 py-2.5 rounded-md transition-all duration-200"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Kirim Email ({member.email})
                  </a>
                ) : (
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 bg-[#0891b2] hover:bg-cyan-300 text-black font-semibold text-xs px-5 py-2.5 rounded-md transition-all duration-200"
                  >
                    Hubungi via Genion
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: KEAHLIAN & TEKNOLOGI ─── */}
      <section className="bg-gray-50 dark:bg-[#0a0a0a] py-20 sm:py-24 border-t border-gray-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <p className="section-badge">[ 02 • KEAHLIAN &amp; TEKNOLOGI ]</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="font-poppins font-bold text-gray-900 dark:text-white text-3xl sm:text-4xl leading-tight">
                Spesialisasi &amp; Teknologi
              </h2>
              <p className="text-gray-500 dark:text-gray-500 text-sm max-w-md mt-2">
                Teknologi teruji dan keahlian yang diterapkan dalam standar engineering Genion.
              </p>
            </div>
            <span className="mt-4 md:mt-0 text-xs font-mono text-[#0891b2] bg-[#0891b2]/10 border border-[#0891b2]/20 px-3 py-1 rounded">
              TOTAL {member.skills.length} KEAHLIAN
            </span>
          </div>

          <div ref={skillsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {member.skills.map((skill, idx) => (
              <div
                key={idx}
                className="skill-card-item bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#1f1f1f] rounded-xl p-5 hover:border-[#0891b2]/40 transition-all duration-300 opacity-0"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono text-[#0891b2] tracking-widest uppercase">
                    SKILL #{String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#0891b2]" />
                </div>
                <h3 className="font-poppins font-bold text-gray-900 dark:text-white text-base mb-1">
                  {skill}
                </h3>
                <p className="text-gray-500 dark:text-gray-500 text-xs leading-relaxed">
                  Diterapkan secara aktif dalam arsitektur proyek klien dan inovasi internal Genion.
                </p>
              </div>
            ))}
          </div>

          {/* Standards callout banner */}
          <div className="mt-8 bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#1f1f1f] rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-[#0891b2] mb-1">
                STANDAR PRODUKSI GENION
              </p>
              <h4 className="font-poppins font-bold text-gray-900 dark:text-white text-base sm:text-lg">
                Keandalan, Kerapian Kode, dan Skalabilitas
              </h4>
              <p className="text-gray-500 dark:text-gray-500 text-xs mt-1 max-w-xl">
                Setiap anggota tim mengimplementasikan kaidah best practice, pengujian terukur, dan dokumentasi sistem yang jelas.
              </p>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#0891b2] hover:underline flex-shrink-0"
            >
              Lihat Layanan Kami →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: PERAN & KONTRIBUSI ─── */}
      <section className="bg-white dark:bg-[#0d0d0d] py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <p className="section-badge">[ 03 • PERAN &amp; KONTRIBUSI ]</p>
          <h2 className="font-poppins font-bold text-gray-900 dark:text-white text-3xl sm:text-4xl leading-tight max-w-xl mb-4">
            Bagaimana {member.name.split(" ")[0]}
            <br />
            Membawa Nilai Tambah
          </h2>
          <p className="text-gray-500 dark:text-gray-500 text-sm max-w-lg mb-12">
            Dedikasi teknis dan gaya kolaborasi dalam menghadirkan solusi digital yang tepat guna bagi klien.
          </p>

          <div ref={contributionRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1 */}
            <div className="contribution-card bg-gray-100 dark:bg-[#111111] border border-gray-200 dark:border-[#1f1f1f] rounded-xl p-6 hover:border-[#0891b2]/40 transition-all duration-300 opacity-0">
              <p className="text-[10px] font-mono text-[#0891b2] tracking-widest uppercase mb-3">01 / FOKUS UTAMA</p>
              <div className="text-[#0891b2] mb-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white text-base mb-2">
                {deptInfo.focusTitle}
              </h3>
              <p className="text-gray-500 dark:text-gray-500 text-xs leading-relaxed">
                {deptInfo.focusDesc}
              </p>
            </div>

            {/* Card 2 */}
            <div className="contribution-card bg-gray-100 dark:bg-[#111111] border border-gray-200 dark:border-[#1f1f1f] rounded-xl p-6 hover:border-[#0891b2]/40 transition-all duration-300 opacity-0">
              <p className="text-[10px] font-mono text-[#0891b2] tracking-widest uppercase mb-3">02 / METODOLOGI</p>
              <div className="text-[#0891b2] mb-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white text-base mb-2">
                Alur Kerja Sprint Tangkas
              </h3>
              <p className="text-gray-500 dark:text-gray-500 text-xs leading-relaxed">
                Menjalankan pengerjaan dengan iterasi teratur, evaluasi berkala, dan fokus pada sasaran yang terukur.
              </p>
            </div>

            {/* Card 3 */}
            <div className="contribution-card bg-gray-100 dark:bg-[#111111] border border-gray-200 dark:border-[#1f1f1f] rounded-xl p-6 hover:border-[#0891b2]/40 transition-all duration-300 opacity-0">
              <p className="text-[10px] font-mono text-[#0891b2] tracking-widest uppercase mb-3">03 / KUALITAS</p>
              <div className="text-[#0891b2] mb-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white text-base mb-2">
                Standar Bebas Cacat
              </h3>
              <p className="text-gray-500 dark:text-gray-500 text-xs leading-relaxed">
                Menerapkan code review, pengujian fungsi, serta pemeliharaan kebersihan struktur kode secara disiplin.
              </p>
            </div>

            {/* Card 4 */}
            <div className="contribution-card bg-gray-100 dark:bg-[#111111] border border-gray-200 dark:border-[#1f1f1f] rounded-xl p-6 hover:border-[#0891b2]/40 transition-all duration-300 opacity-0">
              <p className="text-[10px] font-mono text-[#0891b2] tracking-widest uppercase mb-3">04 / KOLABORASI</p>
              <div className="text-[#0891b2] mb-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white text-base mb-2">
                Komunikasi Transparan
              </h3>
              <p className="text-gray-500 dark:text-gray-500 text-xs leading-relaxed">
                Selalu mengedepankan keterbukaan progres, diskusi solutif dengan tim, dan sinergi aktif bersama klien.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: MEMBER NAVIGATION BAR (Prev / Next) ─── */}
      <section className="bg-gray-50 dark:bg-[#0a0a0a] border-y border-gray-200 dark:border-[#1f1f1f] py-8">
        <div ref={navRef} className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 opacity-0">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Prev Member */}
            <Link
              to={`/profile/${prevId}`}
              className="group flex items-center gap-3 hover:text-[#0891b2] transition-colors w-full sm:w-auto"
            >
              <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-[#161616] border border-gray-300 dark:border-[#262626] flex items-center justify-center flex-shrink-0 group-hover:border-[#0891b2]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-wider text-gray-500">Anggota Sebelumnya</p>
                <p className="font-poppins font-bold text-sm text-gray-900 dark:text-white group-hover:text-[#0891b2] transition-colors">
                  {prevMember.name}
                </p>
              </div>
            </Link>

            {/* Middle Indicator */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-gray-500">
                [ {memberIndex + 1} / {total} ]
              </span>
              <Link
                to="/team"
                className="text-xs font-mono uppercase tracking-wider text-[#0891b2] hover:underline"
              >
                Semua Tim
              </Link>
            </div>

            {/* Next Member */}
            <Link
              to={`/profile/${nextId}`}
              className="group flex items-center justify-end gap-3 hover:text-[#0891b2] transition-colors w-full sm:w-auto text-right"
            >
              <div>
                <p className="text-[10px] font-mono uppercase tracking-wider text-gray-500">Anggota Selanjutnya</p>
                <p className="font-poppins font-bold text-sm text-gray-900 dark:text-white group-hover:text-[#0891b2] transition-colors">
                  {nextMember.name}
                </p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-[#161616] border border-gray-300 dark:border-[#262626] flex items-center justify-center flex-shrink-0 group-hover:border-[#0891b2]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── SECTION 7: ANGGOTA TIM LAINNYA (Grid) ─── */}
      <section className="bg-white dark:bg-[#0d0d0d] py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <p className="section-badge">[ 04 • TALENTA LAINNYA ]</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="font-poppins font-bold text-gray-900 dark:text-white text-3xl sm:text-4xl leading-tight">
                Jelajahi Anggota Lainnya
              </h2>
              <p className="text-gray-500 dark:text-gray-500 text-sm max-w-md mt-2">
                Temukan talenta lain dengan beragam bidang spesialisasi yang siap memperkuat proyek Anda.
              </p>
            </div>
            <Link
              to="/team"
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#0891b2] hover:underline"
            >
              Lihat Seluruh Tim ({total}) →
            </Link>
          </div>

          <div ref={suggestedRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherMembers.map(({ member: other, id: otherId }) => (
              <Link
                key={otherId}
                to={`/profile/${otherId}`}
                className="suggested-card group bg-gray-100 dark:bg-[#111111] border border-gray-200 dark:border-[#1f1f1f] rounded-2xl p-5 hover:border-[#0891b2]/40 transition-all duration-300 opacity-0 flex flex-col"
              >
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-200 dark:bg-[#1a1a1a] mb-4 relative">
                  {other.image ? (
                    <img
                      src={other.image}
                      alt={other.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-bold text-2xl text-gray-400">
                      {other.initials}
                    </div>
                  )}
                  <span className="absolute top-2.5 right-2.5 text-[10px] font-mono text-[#0891b2] bg-black/70 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
                    {otherId}
                  </span>
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-poppins font-bold text-gray-900 dark:text-white text-lg group-hover:text-[#0891b2] transition-colors mb-1">
                      {other.name}
                    </h3>
                    <p className="text-[#0891b2] font-mono text-xs uppercase tracking-wider mb-3">
                      {other.role}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-xs line-clamp-2 leading-relaxed mb-4">
                      {other.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gray-200 dark:border-[#1f1f1f] flex items-center justify-between text-xs text-[#0891b2] font-mono">
                    <span>Lihat Profil</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 8: STANDARD GENION CTA ─── */}
      <section className="bg-gray-50 dark:bg-[#0a0a0a] py-20 sm:py-28 border-t border-gray-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div
            ref={ctaSectionRef}
            className="border border-gray-200 dark:border-[#1f1f1f] bg-white dark:bg-[#0f0f0f] rounded-2xl p-10 sm:p-16 text-center max-w-4xl mx-auto shadow-sm opacity-0"
          >
            <p className="section-badge mx-auto mb-6">[ 05 • KOLABORASI ]</p>
            <h2 className="font-poppins font-bold text-gray-900 dark:text-white text-3xl sm:text-4xl leading-tight mb-4">
              Tertarik Berkolaborasi dengan
              <br />
              <span className="text-[#0891b2]">{member.name.split(" ")[0]}</span> dan Tim Genion?
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md mx-auto mb-8 leading-relaxed">
              Kami siap membantu mewujudkan produk digital terbaik dengan tim yang solid, keahlian mendalam, dan komitmen tinggi.
            </p>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#0891b2] hover:bg-cyan-300 text-black font-semibold text-sm px-6 py-3 rounded-md transition-all duration-200 mb-8"
            >
              KONSULTASI BERSAMA KAMI
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            {/* 3 trust pills */}
            <div className="flex flex-wrap justify-center gap-3 mt-2">
              {[
                "✓ Konsultasi Langsung",
                "✓ Tim Berpengalaman",
                "✓ Solusi Terukur",
              ].map((pill, i) => (
                <span
                  key={i}
                  className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-[#141414] border border-gray-200 dark:border-[#1f1f1f] px-3.5 py-1 rounded-full"
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
