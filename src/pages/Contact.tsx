import React, { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ContactMethod {
  title: string;
  details: string;
  link: string;
  external?: boolean;
  icon: React.ReactNode;
}

const CONTACT_METHODS: ContactMethod[] = [
  {
    icon: (
      <svg className="w-5 h-5 text-[#0891b2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>
    ),
    title: "Telepon",
    details: "+62 881-0205-36245",
    link: "tel:+62881020536245"
  },
  {
    icon: (
      <svg className="w-5 h-5 text-[#0891b2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    title: "Email",
    details: "info@genionteam.com",
    link: "mailto:info@genionteam.com"
  },
  {
    icon: (
      <svg className="w-5 h-5 text-[#0891b2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    title: "Lokasi",
    details: "Jakarta, Indonesia",
    link: "https://maps.app.goo.gl/9a7w36zcf2Z75bAh9",
    external: true
  }
];

const FAQS = [
  {
    question: "Berapa lama waktu yang dibutuhkan untuk menyelesaikan proyek?",
    answer: "Waktu pengerjaan bervariasi tergantung kompleksitas proyek. Proyek website sederhana biasanya 2-4 minggu, sedangkan aplikasi custom bisa memakan waktu 2-6 bulan."
  },
  {
    question: "Apakah menyediakan layanan maintenance setelah proyek selesai?",
    answer: "Ya, kami menyediakan paket maintenance dan support pasca-launch dengan berbagai pilihan sesuai kebutuhan Anda."
  },
  {
    question: "Bagaimana proses pembayaran proyek?",
    answer: "Pembayaran biasanya dibagi menjadi beberapa tahap: DP di awal, progres payment, dan pelunasan setelah proyek selesai dan disetujui."
  },
  {
    question: "Apakah bisa request fitur custom?",
    answer: "Tentu saja! Kami berspesialisasi dalam pengembangan solusi custom yang dirancang khusus sesuai kebutuhan bisnis Anda."
  }
];

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Genion Team",
  image: "https://genion.site/genion_team.webp",
  telephone: "+62-881-0250-36245",
  email: "nafilhabibi07@gmail.com",
  url: "https://genion.site",
  priceRange: "$$",
  openingHours: "Mo-Fr 09:00-17:00",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Jakarta",
    addressCountry: "ID"
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer
    }
  }))
};

export const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    fullname: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const heroRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const methodsRef = useRef<HTMLDivElement>(null);
  const formSectionRef = useRef<HTMLDivElement>(null);
  const faqSectionRef = useRef<HTMLElement>(null);
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
        .to(methodsRef.current, { opacity: 1, y: 0, duration: 0.6 }, 1.1);

      // Form section on scroll
      if (formSectionRef.current) {
        gsap.fromTo(
          formSectionRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            scrollTrigger: { trigger: formSectionRef.current, start: "top 80%" },
          }
        );
      }

      // FAQ section on scroll
      if (faqSectionRef.current) {
        gsap.fromTo(
          faqSectionRef.current.querySelectorAll(".faq-item"),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            scrollTrigger: { trigger: faqSectionRef.current, start: "top 80%" },
          }
        );
      }

      // Final CTA on scroll
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.fullname || !formState.email || !formState.message) {
      return;
    }
    setSubmitted(true);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <>
      <Helmet>
        <title>Hubungi Kami - Konsultasi Gratis Proyek Digital | Genion Team</title>
        <meta name="description" content="Mulai kolaborasi digital dengan Genion Team. Hubungi kami via WhatsApp 0881-0250-36245, email nafilhabibi07@gmail.com, atau kunjungi kantor kami untuk konsultasi gratis." />
        <meta property="og:title" content="Hubungi Kami - Konsultasi Gratis Proyek Digital | Genion Team" />
        <meta property="og:description" content="Mulai kolaborasi digital dengan Genion Team. Hubungi kami via WhatsApp 0881-0250-36245, email nafilhabibi07@gmail.com, atau kunjungi kantor kami untuk konsultasi gratis." />
        <meta property="og:url" content="https://genion.site/contact" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://genion.site/og-image.webp" />
        <meta property="og:locale" content="id_ID" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hubungi Kami - Konsultasi Gratis Proyek Digital | Genion Team" />
        <meta name="twitter:description" content="Mulai kolaborasi digital dengan Genion Team. Hubungi kami via WhatsApp 0881-0250-36245, email nafilhabibi07@gmail.com, atau kunjungi kantor kami untuk konsultasi gratis." />
        <meta name="twitter:image" content="https://genion.site/og-image.webp" />
        <link rel="canonical" href="https://genion.site/contact" />
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>
      {/* ─── SECTION 1: HERO ─── */}
      <section
        ref={heroRef}
        className="relative bg-white dark:bg-[#0d0d0d] pt-36 sm:pt-44 pb-20 sm:pb-28 overflow-hidden"
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
              Genion Team · Hubungi Kami
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
                Mulai kolaborasi digital
              </span>
            </span>
            {/* Line 2 */}
            <span className="block text-5xl sm:text-7xl lg:text-[5.2rem] overflow-hidden">
              <span className="block translate-y-full opacity-0" data-gsap="line">
                bersama <span className="text-[#0891b2]">Genion Team</span>,
              </span>
            </span>
            {/* Line 3 */}
            <span className="block text-5xl sm:text-7xl lg:text-[5.2rem] overflow-hidden">
              <span className="block translate-y-full opacity-0" data-gsap="line">
                kami siap membantu.
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-xl leading-relaxed mb-10 opacity-0"
          >
            Diskusikan ide proyek, transformasi sistem, atau konsultasi teknologi Anda dengan para ahli kami.
          </p>

          {/* Quick Contact Methods */}
          <div ref={methodsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 opacity-0">
            {CONTACT_METHODS.map((method, idx) => (
              <a
                key={idx}
                href={method.link}
                {...(method.external ? { target: "_blank", rel: "noreferrer" } : {})}
                className="bg-gray-100 dark:bg-[#111111] border border-gray-200 dark:border-[#1f1f1f] rounded-xl p-5 hover:border-[#0891b2]/40 transition-all duration-300 block group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#0891b2]/10 border border-[#0891b2]/20 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  {method.icon}
                </div>
                <p className="text-xs font-mono uppercase text-gray-400 mb-1">{method.title}</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{method.details}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: FORM & OFFICE INFO ─── */}
      <section className="bg-gray-50 dark:bg-[#0a0a0a] py-24 border-t border-gray-200 dark:border-white/5">
        <div ref={formSectionRef} className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 opacity-0">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Left Col (Col-span-7): Form */}
            <div className="lg:col-span-7">
              <p className="section-badge">[ 01 • KIRIM PESAN ]</p>
              <h2 className="font-poppins font-bold text-gray-900 dark:text-white text-3xl sm:text-4xl leading-tight mb-4">
                Sampaikan Kebutuhan Proyek Anda
              </h2>
              <p className="text-gray-500 dark:text-gray-500 text-sm mb-8">
                Isi formulir di bawah ini dan konsultan kami akan menghubungi Anda kembali dalam 1x24 jam kerja.
              </p>

              {submitted ? (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-8 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xl font-bold">
                    ✓
                  </div>
                  <h3 className="text-xl font-bold font-poppins text-gray-900 dark:text-white mb-2">
                    Pesan Berhasil Terkirim!
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md mx-auto mb-6">
                    Terima kasih telah menghubungi Genion Team. Tim kami akan segera menindaklanjuti pesan Anda melalui email atau telepon.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormState({ fullname: "", email: "", phone: "", subject: "", message: "" });
                    }}
                    className="px-6 py-2.5 bg-[#0891b2] hover:bg-cyan-300 text-black rounded-md font-semibold text-sm transition-all duration-200"
                  >
                    Kirim Pesan Lain
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact_fullname" className="text-xs font-mono uppercase text-gray-500 tracking-wider mb-2 block">
                        Nama Lengkap <span className="text-[#0891b2]">*</span>
                      </label>
                      <input
                        type="text"
                        id="contact_fullname"
                        required
                        value={formState.fullname}
                        onChange={(e) => setFormState({ ...formState, fullname: e.target.value })}
                        className="w-full bg-white dark:bg-[#111111] border border-gray-300 dark:border-[#222] rounded-lg px-4 py-3 text-sm text-gray-900 dark:text-white focus:border-[#0891b2] focus:outline-none transition-colors"
                        placeholder="Nama Anda"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact_email" className="text-xs font-mono uppercase text-gray-500 tracking-wider mb-2 block">
                        Email <span className="text-[#0891b2]">*</span>
                      </label>
                      <input
                        type="email"
                        id="contact_email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full bg-white dark:bg-[#111111] border border-gray-300 dark:border-[#222] rounded-lg px-4 py-3 text-sm text-gray-900 dark:text-white focus:border-[#0891b2] focus:outline-none transition-colors"
                        placeholder="nama@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact_phone" className="text-xs font-mono uppercase text-gray-500 tracking-wider mb-2 block">
                        Nomor Telepon
                      </label>
                      <input
                        type="tel"
                        id="contact_phone"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        className="w-full bg-white dark:bg-[#111111] border border-gray-300 dark:border-[#222] rounded-lg px-4 py-3 text-sm text-gray-900 dark:text-white focus:border-[#0891b2] focus:outline-none transition-colors"
                        placeholder="+62 812-3456-7890"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact_subject" className="text-xs font-mono uppercase text-gray-500 tracking-wider mb-2 block">
                        Subjek Proyek
                      </label>
                      <select
                        id="contact_subject"
                        value={formState.subject}
                        onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                        className="w-full bg-white dark:bg-[#111111] border border-gray-300 dark:border-[#222] rounded-lg px-4 py-3 text-sm text-gray-900 dark:text-white focus:border-[#0891b2] focus:outline-none transition-colors"
                      >
                        <option value="">Pilih subjek proyek</option>
                        <option value="web-development">Pengembangan Web</option>
                        <option value="mobile-app">Aplikasi Mobile</option>
                        <option value="uiux-design">UI/UX Design</option>
                        <option value="digital-marketing">Digital Marketing</option>
                        <option value="cloud-solutions">Cloud Solutions</option>
                        <option value="consultation">Konsultasi IT</option>
                        <option value="other">Lainnya</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact_message" className="text-xs font-mono uppercase text-gray-500 tracking-wider mb-2 block">
                      Pesan <span className="text-[#0891b2]">*</span>
                    </label>
                    <textarea
                      rows={5}
                      id="contact_message"
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full bg-white dark:bg-[#111111] border border-gray-300 dark:border-[#222] rounded-lg px-4 py-3 text-sm text-gray-900 dark:text-white focus:border-[#0891b2] focus:outline-none transition-colors resize-none"
                      placeholder="Ceritakan detail proyek atau pertanyaan Anda..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 bg-[#0891b2] hover:bg-cyan-300 text-black font-semibold text-sm rounded-md transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <span>KIRIM PESAN</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </form>
              )}
            </div>

            {/* Right Col (Col-span-5): Map & Jam Kerja */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <p className="section-badge">[ 02 • LOKASI &amp; JAM KERJA ]</p>
                <h2 className="font-poppins font-bold text-gray-900 dark:text-white text-3xl sm:text-4xl leading-tight mb-4">
                  Lokasi &amp; Jam Operasional
                </h2>
                <p className="text-gray-500 dark:text-gray-500 text-sm mb-6">
                  Kunjungi kantor kami atau jadwalkan pertemuan langsung untuk mendiskusikan kebutuhan sistem Anda.
                </p>
              </div>

              {/* Google Map embed */}
              <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-[#1f1f1f] h-64 mb-6">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8028.774930092462!2d106.94070388001276!3d-6.222482565504365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698d003a0a80c1%3A0xece7e37a6c4d652!2sGenion%20Team%20Office!5e0!3m2!1sen!2sid!4v1761020640090!5m2!1sen!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  title="Genion Office Location"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Office Hours card */}
              <div className="bg-gray-100 dark:bg-[#111111] border border-gray-200 dark:border-[#1f1f1f] rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-poppins font-semibold text-base text-gray-900 dark:text-white">
                    Kantor Pusat &amp; Operasional
                  </h3>
                  <a
                    href="https://maps.app.goo.gl/9a7w36zcf2Z75bAh9"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-mono text-[#0891b2] hover:underline"
                  >
                    Buka di Maps ↗
                  </a>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
                  Jakarta, Indonesia
                </p>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-[#1f1f1f]">
                    <span className="text-gray-500 dark:text-gray-400">Senin - Jumat</span>
                    <span className="font-mono font-medium text-gray-900 dark:text-white">08:00 - 17:00</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-[#1f1f1f]">
                    <span className="text-gray-500 dark:text-gray-400">Sabtu</span>
                    <span className="font-mono font-medium text-[#0891b2]">Berdasarkan Perjanjian</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-500 dark:text-gray-400">Minggu</span>
                    <span className="font-mono font-medium text-gray-400 dark:text-gray-500">Tutup</span>
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-gray-200 dark:border-[#1f1f1f] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-medium">
                    Tim Online &amp; Siap Membantu
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: FAQ SECTION ─── */}
      <section
        ref={faqSectionRef}
        className="relative bg-white dark:bg-[#0d0d0d] py-24 border-t border-gray-200 dark:border-white/5"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <p className="section-badge">[ 03 • TANYA JAWAB ]</p>
          <h2 className="font-poppins font-bold text-gray-900 dark:text-white text-3xl sm:text-4xl leading-tight mb-4">
            Pertanyaan yang
            <br />
            Sering Diajukan
          </h2>
          <p className="text-gray-500 dark:text-gray-500 text-sm max-w-xl mb-12">
            Jawaban cepat untuk hal-hal umum terkait kerja sama dan proses delivery proyek kami.
          </p>

          <div className="max-w-4xl space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="faq-item bg-gray-100 dark:bg-[#111111] border border-gray-200 dark:border-[#1f1f1f] rounded-xl p-6 transition-all hover:border-[#0891b2]/40"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="flex justify-between items-center w-full text-left font-poppins font-semibold text-base text-gray-900 dark:text-white"
                  >
                    <span>{faq.question}</span>
                    <svg
                      className={`w-5 h-5 text-[#0891b2] transform transition-transform duration-300 flex-shrink-0 ml-4 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isOpen && (
                    <div className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed pt-4 border-t border-gray-200 dark:border-[#1f1f1f] mt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: FINAL CTA ─── */}
      <section className="bg-gray-50 dark:bg-[#0a0a0a] py-24 border-t border-gray-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div
            ref={ctaSectionRef}
            className="border border-gray-200 dark:border-[#1f1f1f] bg-gray-50 dark:bg-[#0f0f0f] rounded-2xl p-10 sm:p-16 text-center max-w-4xl mx-auto opacity-0"
          >
            <p className="section-badge mx-auto mb-6">[ 04 • KONSULTASI CEPAT ]</p>
            <h2 className="font-poppins font-bold text-gray-900 dark:text-white text-3xl sm:text-4xl leading-tight mb-4">
              Lebih Suka Berdiskusi Langsung?
            </h2>
            <p className="text-gray-500 dark:text-gray-500 text-sm max-w-md mx-auto mb-8">
              Hubungi kami via WhatsApp atau telepon langsung untuk respon instan dari tim representatif kami.
            </p>
            <a
              href="tel:+62881020536245"
              className="inline-flex items-center gap-2 bg-[#0891b2] hover:bg-cyan-300 text-black font-semibold text-sm px-6 py-3 rounded-md transition-all duration-200 mb-8"
            >
              HUBUNGI SEKARANG VIA TELEPON
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            {/* Trust pills */}
            <div className="flex flex-wrap justify-center gap-3 mt-2">
              {["✓ Respon Cepat", "✓ Diskusi Solutif", "✓ Tanpa Komitmen Awal"].map((pill, i) => (
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
