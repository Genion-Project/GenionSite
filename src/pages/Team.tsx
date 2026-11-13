import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { coreTeam, teamMembers, type TeamMember } from "../data/team";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { num: "01", label: "TOTAL TIM", title: "11 Orang", sub: "Keahlian lintas bidang" },
  { num: "02", label: "PROYEK", title: "30+ Selesai", sub: "Klien puas & terpercaya" },
  { num: "03", label: "PENGALAMAN", title: "2+ Tahun", sub: "Inovasi berkelanjutan" },
  { num: "04", label: "DEDIKASI", title: "100%", sub: "Fokus kepuasan klien" },
];

const VALUES = [
  {
    n: "01",
    title: "Inovasi",
    desc: "Selalu mencari cara baru dan kreatif untuk menyelesaikan masalah dengan teknologi terdepan.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    n: "02",
    title: "Kolaborasi",
    desc: "Bekerja sama erat dalam tim dan bermitra transparan dengan klien demi mencapai sasaran optimal.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    n: "03",
    title: "Kualitas",
    desc: "Menjaga standar engineering dan desain tinggi pada setiap baris kode dan antarmuka produk.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    n: "04",
    title: "Integritas",
    desc: "Kejujuran dan tanggung jawab penuh dalam komunikasi, delivery waktu, dan keamanan data klien.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
];

export const Team: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<{ member: TeamMember; id: string } | null>(null);

  const heroRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const leadershipRef = useRef<HTMLDivElement>(null);
  const teamGridRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const ctaSectionRef = useRef<HTMLDivElement>(null);

  const getMemberId = (index: number) => `GENION-${String(index + 1).padStart(2, "0")}`;

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

      // Leadership cards
      if (leadershipRef.current) {
        gsap.fromTo(
          leadershipRef.current.querySelectorAll(".leadership-card"),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            scrollTrigger: { trigger: leadershipRef.current, start: "top 80%" },
          }
        );
      }

      // Team grid cards
      if (teamGridRef.current) {
        gsap.fromTo(
          teamGridRef.current.querySelectorAll(".team-card"),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            scrollTrigger: { trigger: teamGridRef.current, start: "top 80%" },
          }
        );
      }

      // Values cards
      if (valuesRef.current) {
        gsap.fromTo(
          valuesRef.current.querySelectorAll(".value-card"),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            scrollTrigger: { trigger: valuesRef.current, start: "top 80%" },
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
              Genion Team · Tim Inovasi
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
                Para inovator di balik
              </span>
            </span>
            {/* Line 2 */}
            <span className="block text-5xl sm:text-7xl lg:text-[5.2rem] overflow-hidden">
              <span className="block translate-y-full opacity-0" data-gsap="line">
                <span className="text-[#0891b2]">solusi digital</span> &amp;
              </span>
            </span>
            {/* Line 3 */}
            <span className="block text-5xl sm:text-7xl lg:text-[5.2rem] overflow-hidden">
              <span className="block translate-y-full opacity-0" data-gsap="line">
                teknologi terdepan.
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-xl leading-relaxed mb-10 opacity-0"
          >
            Kami adalah kumpulan profesional berdedikasi dengan keahlian lintas bidang untuk
            mewujudkan produk digital terbaik.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3 opacity-0">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#0891b2] hover:bg-cyan-300 text-black font-semibold text-sm px-6 py-3 rounded-md transition-all duration-200"
            >
              KONSULTASI BERSAMA KAMI
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

      {/* ─── SECTION 3: LEADERSHIP / FOUNDER ─── */}
      <section className="bg-white dark:bg-[#0d0d0d] py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <p className="section-badge">[ 01 • FOUNDER &amp; LEADERSHIP ]</p>
          <h2 className="font-poppins font-bold text-gray-900 dark:text-white text-3xl sm:text-4xl leading-tight max-w-xl mb-4">
            Pemimpin Visi
            <br />
            Genion Team
          </h2>
          <p className="text-gray-500 dark:text-gray-500 text-sm max-w-md mb-14">
            Membimbing arah strategis dan inovasi teknologi Genion untuk menciptakan solusi digital terbaik.
          </p>

          <div ref={leadershipRef} className="space-y-8">
            {coreTeam.map((member, index) => {
              const id = getMemberId(index);
              return (
                <div
                  key={index}
                  onClick={() => setSelectedMember({ member, id })}
                  className="leadership-card group cursor-pointer grid lg:grid-cols-12 gap-8 items-center bg-gray-100 dark:bg-[#111111] border border-gray-200 dark:border-[#1f1f1f] rounded-2xl p-6 sm:p-10 hover:border-[#0891b2]/40 transition-all duration-300 opacity-0"
                >
                  {/* Left col (col-span-5): photo */}
                  <div className="lg:col-span-5 aspect-[4/5] rounded-xl overflow-hidden bg-gray-200 dark:bg-[#1a1a1a]">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Right col (col-span-7): info */}
                  <div className="lg:col-span-7 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#0891b2] bg-[#0891b2]/10 border border-[#0891b2]/20 px-2.5 py-1 rounded">
                        ID: {id}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-500 font-mono">
                        Featured Leader
                      </span>
                    </div>

                    <h3 className="font-poppins font-bold text-gray-900 dark:text-white text-2xl sm:text-3xl mb-1">
                      {member.name}
                    </h3>
                    <p className="text-[#0891b2] font-mono text-xs uppercase tracking-wider mb-4">
                      {member.role}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed mb-6">
                      {member.description}
                    </p>

                    {/* Skill pills */}
                    <div className="flex flex-wrap gap-1.5 mb-8">
                      {member.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-1 bg-gray-200 dark:bg-[#1a1a1a] border border-gray-300 dark:border-[#2a2a2a] text-gray-700 dark:text-gray-300 text-xs rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gray-200 dark:border-[#1f1f1f]">
                      <span className="inline-flex items-center gap-2 text-xs font-medium text-[#0891b2] group-hover:underline">
                        Lihat Detail Profil
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                      {member.email && member.email !== "#" && (
                        <span className="text-xs text-gray-500 font-mono">
                          {member.email}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: CORE TEAM MEMBERS (Grid) ─── */}
      <section className="bg-gray-50 dark:bg-[#0a0a0a] py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <p className="section-badge">[ 02 • ANGGOTA TIM ]</p>
          <h2 className="font-poppins font-bold text-gray-900 dark:text-white text-3xl sm:text-4xl leading-tight max-w-xl mb-4">
            Para Ahli di
            <br />
            Bidangnya Masing-Masing
          </h2>
          <p className="text-gray-500 dark:text-gray-500 text-sm max-w-md mb-14">
            Developer, designer, dan strategist yang siap mengeksekusi proyek Anda.
          </p>

          <div
            ref={teamGridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {teamMembers.map((member, index) => {
              const fullIndex = coreTeam.length + index;
              const id = getMemberId(fullIndex);
              return (
                <div
                  key={index}
                  onClick={() => setSelectedMember({ member, id })}
                  className="team-card group cursor-pointer bg-gray-100 dark:bg-[#111111] border border-gray-200 dark:border-[#1f1f1f] rounded-xl overflow-hidden hover:border-[#0891b2]/40 transition-all duration-300 opacity-0 flex flex-col"
                >
                  {/* Photo */}
                  <div className="aspect-[4/5] w-full overflow-hidden bg-gray-200 dark:bg-[#1a1a1a]">
                    <img
                      src={member.image}
                      alt={member.name}
                      className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
                        member.name === "Stanly Andrian Pratama" ? "object-top" : ""
                      }`}
                    />
                  </div>

                  {/* Info */}
                  <div className="p-5 flex flex-col flex-1 justify-between">
                    <div>
                      <h3 className="font-poppins font-bold text-gray-900 dark:text-white text-base mb-0.5 truncate">
                        {member.name}
                      </h3>
                      <p className="text-[#0891b2] text-xs font-mono uppercase tracking-wider mb-2 truncate">
                        {member.role}
                      </p>
                      <p className="text-gray-500 dark:text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2">
                        {member.description}
                      </p>
                    </div>

                    {/* Skill pills */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {member.skills.slice(0, 3).map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 bg-gray-200 dark:bg-[#1a1a1a] border border-gray-300 dark:border-[#2a2a2a] text-gray-600 dark:text-gray-400 text-[10px] rounded"
                        >
                          {skill}
                        </span>
                      ))}
                      {member.skills.length > 3 && (
                        <span className="px-2 py-0.5 bg-gray-200 dark:bg-[#1a1a1a] border border-gray-300 dark:border-[#2a2a2a] text-gray-600 dark:text-gray-400 text-[10px] rounded">
                          +{member.skills.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: NILAI / PRINSIP TIM ─── */}
      <section className="bg-white dark:bg-[#0d0d0d] py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <p className="section-badge">[ 03 • BUDAYA KERJA ]</p>
          <h2 className="font-poppins font-bold text-gray-900 dark:text-white text-3xl sm:text-4xl leading-tight max-w-xl mb-4">
            Bagaimana Kami
            <br />
            Bekerja Bersama
          </h2>
          <p className="text-gray-500 dark:text-gray-500 text-sm max-w-md mb-14">
            Nilai-nilai fundamental yang mengarahkan kerja sama tim dan komitmen kami pada setiap solusi.
          </p>

          <div ref={valuesRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {VALUES.map((val, i) => (
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

      {/* ─── SECTION 6: CTA SECTION ─── */}
      <section className="bg-white dark:bg-[#0d0d0d] py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div
            ref={ctaSectionRef}
            className="border border-gray-200 dark:border-[#1f1f1f] bg-gray-50 dark:bg-[#0f0f0f] rounded-2xl p-10 sm:p-16 text-center max-w-4xl mx-auto opacity-0"
          >
            <p className="section-badge mx-auto mb-6">[ 04 • KOLABORASI ]</p>
            <h2 className="font-poppins font-bold text-gray-900 dark:text-white text-3xl sm:text-4xl leading-tight mb-4">
              Ingin Bergabung atau
              <br />
              Berkolaborasi Bersama Kami?
            </h2>
            <p className="text-gray-500 dark:text-gray-500 text-sm max-w-md mx-auto mb-8">
              Pintu kami selalu terbuka untuk talenta baru dan mitra proyek yang ambisius.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#0891b2] hover:bg-cyan-300 text-black font-semibold text-sm px-6 py-3 rounded-md transition-all duration-200 mb-8"
            >
              HUBUNGI TIM KAMI
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
                  className="text-xs text-gray-500 dark:text-gray-500 bg-gray-100 dark:bg-[#111] border border-gray-200 dark:border-[#1f1f1f] px-3 py-1 rounded-full"
                >
                  {pill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 7: MODAL ─── */}
      {selectedMember && (
        <div
          onClick={() => setSelectedMember(null)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in-up"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-[#111] border border-gray-200 dark:border-[#222] rounded-2xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedMember(null)}
              aria-label="Tutup modal"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-8 h-8 rounded-full bg-gray-100 dark:bg-[#1a1a1a] hover:bg-gray-200 dark:hover:bg-[#252525] flex items-center justify-center text-gray-600 dark:text-gray-300 transition-colors z-10"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex flex-col sm:flex-row gap-6 items-start">
              {/* Photo */}
              <div className="w-full sm:w-5/12 aspect-[4/5] rounded-xl overflow-hidden bg-gray-200 dark:bg-[#1a1a1a] flex-shrink-0">
                <img
                  src={selectedMember.member.image}
                  alt={selectedMember.member.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="w-full sm:w-7/12 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#0891b2] bg-[#0891b2]/10 border border-[#0891b2]/20 px-2 py-0.5 rounded">
                    ID: {selectedMember.id}
                  </span>
                </div>

                <h3 className="font-poppins font-bold text-gray-900 dark:text-white text-xl sm:text-2xl mb-1">
                  {selectedMember.member.name}
                </h3>
                <p className="text-[#0891b2] font-mono text-xs uppercase tracking-wider mb-4">
                  {selectedMember.member.role}
                </p>

                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm leading-relaxed mb-5">
                  {selectedMember.member.description}
                </p>

                {/* Skills */}
                <div className="mb-6">
                  <p className="text-[10px] font-mono uppercase text-gray-500 tracking-wider mb-2">Keahlian</p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedMember.member.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 bg-gray-200 dark:bg-[#1a1a1a] border border-gray-300 dark:border-[#2a2a2a] text-gray-700 dark:text-gray-300 text-[11px] rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-2.5 pt-4 border-t border-gray-200 dark:border-[#222]">
                  {selectedMember.member.email && selectedMember.member.email !== "#" ? (
                    <a
                      href={`mailto:${selectedMember.member.email}`}
                      className="inline-flex items-center justify-center gap-2 bg-[#0891b2] hover:bg-cyan-300 text-black font-semibold text-xs px-4 py-2.5 rounded-md transition-all duration-200"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Kirim Email
                    </a>
                  ) : null}
                  <Link
                    to={`/profile/${selectedMember.id}`}
                    className="inline-flex items-center justify-center gap-2 border border-[#0891b2] text-[#0891b2] hover:bg-[#0891b2] hover:text-black font-medium text-xs px-4 py-2.5 rounded-md transition-all duration-200"
                  >
                    Buka Profil Lengkap
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
