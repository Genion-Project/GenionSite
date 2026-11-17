import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Chatbot } from "../components/Chatbot";
import { useTheme } from "../context/ThemeContext";
import { gsap } from "gsap";

interface LayoutProps {
  children: React.ReactNode;
}

export const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Genion Team",
  url: "https://genion.vercel.app",
  logo: "https://genion.vercel.app/genion_logo.png",
  description:
    "Tim inovasi teknologi yang menghadirkan solusi digital terdepan di bidang Web Development, Mobile App, UI/UX Design, Cloud Architecture, dan AI Solutions.",
  foundingDate: "2023",
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+62-881-0250-36245",
      contactType: "customer service",
      email: "nafilhabibi07@gmail.com",
      areaServed: "ID",
      availableLanguage: ["id", "en"]
    }
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Jakarta",
    addressCountry: "ID"
  },
  sameAs: [
    "https://twitter.com/genionteam",
    "https://linkedin.com/company/genionteam",
    "https://instagram.com/genionteam"
  ]
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const footerLinksRef = useRef<HTMLDivElement>(null);
  const footerBrandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // GSAP Animation for mobile menu
  useEffect(() => {
    if (!mobileMenuRef.current || !navItemsRef.current) return;
    
    if (mobileMenuOpen) {
      // Opening animation - ensure background is solid immediately
      gsap.set(mobileMenuRef.current, { 
        display: "flex",
        opacity: 1  // Set to 1 immediately for solid background
      });
      
      gsap.fromTo(navItemsRef.current.children,
        { opacity: 0, y: 50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.5)", delay: 0.1 }
      );
    } else {
      // Closing animation
      if (mobileMenuRef.current.style.display !== "none") {
        const tl = gsap.timeline();
        
        tl.to(navItemsRef.current.children,
          { opacity: 0, y: -30, scale: 0.9, duration: 0.2, stagger: 0.04, ease: "power2.in" }
        )
        .to(mobileMenuRef.current,
          { opacity: 0, duration: 0.25, ease: "power2.out" }
        )
        .set(mobileMenuRef.current, { display: "none" });
      }
    }
  }, [mobileMenuOpen]);

  // GSAP Animation for footer on scroll
  useEffect(() => {
    if (!footerRef.current || !footerLinksRef.current || !footerBrandRef.current) return;

    const ctx = gsap.context(() => {
      // Animate footer links on scroll into view
      gsap.fromTo(
        footerLinksRef.current?.children || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
          },
        }
      );

      // Animate large brand text
      gsap.fromTo(
        footerBrandRef.current,
        { opacity: 0.15, y: 50 },
        {
          opacity: 0.2,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleThemeToggle = () => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    const toLight = theme === "dark";
    overlay.style.backgroundColor = toLight ? "#f8fafc" : "#0d0d0d";
    gsap.set(overlay, { clipPath: "circle(0% at 50% 50%)", display: "block", opacity: 1 });
    gsap.to(overlay, {
      clipPath: "circle(150% at 50% 50%)",
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => {
        toggleTheme();
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.3,
          onComplete: () => gsap.set(overlay, { display: "none", opacity: 1 }),
        });
      },
    });
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Tentang", path: "/about" },
    { name: "Tim", path: "/team" },
    { name: "Layanan", path: "/services" },
    { name: "Portofolio", path: "/projects" },
  ];


  return (
    <div
      className={`min-h-screen flex flex-col font-inter antialiased ${
        theme === "dark"
          ? "bg-[#0d0d0d] text-gray-100"
          : "bg-white text-gray-900"
      }`}
    >
      <ScrollToTop />
      <Chatbot />

      {/* Navigation Header */}
      <header
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? (theme === "dark"
                ? "bg-[rgba(13,13,13,0.85)] backdrop-blur-md border-b border-white/[0.08] py-3"
                : "bg-white/95 backdrop-blur-md border-b border-gray-200 py-3 shadow-sm")
            : (theme === "dark"
                ? "bg-transparent py-4"
                : "bg-white/80 backdrop-blur-sm border-b border-gray-100 py-4")
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 flex items-center justify-center">
                <img
                  src="/genion_logo.png"
                  alt="Logo"
                  className="w-full h-full object-contain rounded transform group-hover:scale-105 transition-transform"
                />
              </div>
              <span className="text-xl font-bold font-poppins">
                <span className="text-[#0891b2]">Genion</span>
                <span className="text-gray-900 dark:text-white">Team</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => {
                const active = link.path === "/" ? location.pathname === "/" : location.pathname.startsWith(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative py-1 text-sm transition-colors duration-200 ${
                      active
                        ? "text-gray-900 dark:text-white border-b-2 border-[#0891b2]"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              {/* Desktop Theme Toggle */}
              <button
                onClick={handleThemeToggle}
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 border border-gray-300 dark:border-white/10 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors duration-200 cursor-pointer"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  /* Sun icon — clicking goes to light */
                  <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm0 15a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm10-5a1 1 0 010 2h-1a1 1 0 110-2h1zM3 12a1 1 0 010 2H2a1 1 0 110-2h1zm15.07-7.07a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM7.05 16.95a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zm11.314 0a1 1 0 011.414 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707zM5.636 5.636a1 1 0 011.414 1.414L6.343 7.757A1 1 0 014.929 6.343l.707-.707zM12 8a4 4 0 100 8 4 4 0 000-8z" />
                  </svg>
                ) : (
                  /* Moon icon — clicking goes to dark */
                  <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                  </svg>
                )}
              </button>

              <Link
                to="/contact"
                className="border border-[#0891b2] text-[#0891b2] hover:bg-[#0891b2] hover:text-black transition-colors duration-200 rounded-md px-4 py-1.5 text-sm font-medium"
              >
                Kontak
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-3 md:hidden">
              <button
                onClick={handleThemeToggle}
                className="w-9 h-9 rounded-lg flex items-center justify-center border border-gray-300 dark:border-white/10 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors duration-200"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm0 15a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm10-5a1 1 0 010 2h-1a1 1 0 110-2h1zM3 12a1 1 0 010 2H2a1 1 0 110-2h1zm15.07-7.07a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM7.05 16.95a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zm11.314 0a1 1 0 011.414 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707zM5.636 5.636a1 1 0 011.414 1.414L6.343 7.757A1 1 0 014.929 6.343l.707-.707zM12 8a4 4 0 100 8 4 4 0 000-8z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                  </svg>
                )}
              </button>
              
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="relative w-10 h-10 flex items-center justify-center"
                aria-label="Open menu"
              >
                <div className="relative w-6 h-5 flex flex-col justify-between">
                  <span className="w-full h-0.5 bg-gray-900 dark:bg-white rounded-full transition-all"></span>
                  <span className="w-full h-0.5 bg-gray-900 dark:bg-white rounded-full transition-all"></span>
                  <span className="w-2/3 h-0.5 bg-gray-900 dark:bg-white rounded-full transition-all ml-auto"></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Modern Mobile Menu Overlay */}
        <div
          ref={mobileMenuRef}
          className={`hidden fixed top-0 left-0 right-0 bottom-0 w-full h-full min-h-screen z-[99999] flex-col items-center justify-center md:hidden overflow-y-auto ${
            theme === "dark" ? "bg-[#0d0d0d]" : "bg-white"
          }`}
          style={{ position: 'fixed', inset: 0 }}
        >
          {/* Decorative gradient circles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className={`absolute -top-20 -right-20 w-96 h-96 rounded-full ${
              theme === "dark" ? "bg-[#0891b2]/5" : "bg-[#0891b2]/10"
            } blur-3xl`}></div>
            <div className={`absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full ${
              theme === "dark" ? "bg-purple-500/5" : "bg-purple-500/10"
            } blur-3xl`}></div>
          </div>

          {/* Close Button */}
          <button
            onClick={() => setMobileMenuOpen(false)}
            className={`absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center group ${
              theme === "dark" 
                ? "bg-white/5 hover:bg-white/10 border border-white/10" 
                : "bg-gray-900/5 hover:bg-gray-900/10 border border-gray-900/10"
            } transition-all duration-300`}
            aria-label="Close menu"
          >
            <svg 
              className={`w-6 h-6 transition-transform duration-300 group-hover:rotate-90 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation Content */}
          <nav ref={navItemsRef} className="relative z-10 flex flex-col items-center space-y-6 px-6 w-full max-w-md">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 flex items-center justify-center">
                <img
                  src="/genion_logo.png"
                  alt="Genion Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-2xl font-bold font-poppins">
                <span className="text-[#0891b2]">Genion</span>
                <span className={theme === "dark" ? "text-white" : "text-gray-900"}>Team</span>
              </span>
            </div>

            {/* Divider */}
            <div className={`w-20 h-px ${theme === "dark" ? "bg-white/10" : "bg-gray-900/10"}`}></div>

            {/* Nav Links */}
            {navLinks.map((link) => {
              const active = link.path === "/" ? location.pathname === "/" : location.pathname.startsWith(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`group relative text-3xl font-bold font-poppins transition-all duration-300 ${
                    active 
                      ? "text-[#0891b2]"
                      : theme === "dark" 
                        ? "text-gray-400 hover:text-white" 
                        : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 w-0 h-1 bg-[#0891b2] rounded-full transition-all duration-300 group-hover:w-full ${
                    active ? "w-full" : ""
                  }`}></span>
                </Link>
              );
            })}

            {/* Divider */}
            <div className={`w-20 h-px ${theme === "dark" ? "bg-white/10" : "bg-gray-900/10"}`}></div>

            {/* CTA Button */}
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="group relative px-8 py-4 bg-[#0891b2] hover:bg-[#06b6d4] text-black font-bold text-lg rounded-xl transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10">Hubungi Kami</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#06b6d4] to-[#0891b2] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-4">
              {[
                { icon: "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z", href: "https://twitter.com/genionteam", label: "Twitter" },
                { icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z", href: "https://linkedin.com/company/genionteam", label: "LinkedIn" },
                { icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z", href: "https://instagram.com/genionteam", label: "Instagram" }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
                      : "bg-gray-900/5 hover:bg-gray-900/10 text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </nav>
        </div>
      </header>

      {/* GSAP Theme Transition Overlay */}
      <div
        ref={overlayRef}
        style={{ display: "none" }}
        className="fixed inset-0 z-[9999]"
      />

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Redesigned Footer - Original Theme with 3D Typography */}
      <footer
        ref={footerRef}
        className="relative bg-white dark:bg-[#0d0d0d] border-t border-gray-200 dark:border-white/[0.08] mt-auto overflow-hidden"
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 py-12 sm:py-16 lg:py-20">
          {/* Footer Links Grid */}
          <div
            ref={footerLinksRef}
            className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 mb-12 sm:mb-16 lg:mb-20"
          >
            {/* Column 1: Genion */}
            <div className="footer-column">
              <h4 className="text-gray-900 dark:text-white font-semibold text-sm mb-4 font-poppins">
                Genion
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-[#0891b2] dark:hover:text-[#0891b2] text-sm transition-colors duration-200">
                    Beranda
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-[#0891b2] dark:hover:text-[#0891b2] text-sm transition-colors duration-200">
                    Tentang Kami
                  </Link>
                </li>
                <li>
                  <Link to="/team" className="text-gray-600 dark:text-gray-400 hover:text-[#0891b2] dark:hover:text-[#0891b2] text-sm transition-colors duration-200">
                    Tim Kami
                  </Link>
                </li>
                <li>
                  <Link to="/projects" className="text-gray-600 dark:text-gray-400 hover:text-[#0891b2] dark:hover:text-[#0891b2] text-sm transition-colors duration-200">
                    Portofolio
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-[#0891b2] dark:hover:text-[#0891b2] text-sm transition-colors duration-200">
                    Hubungi Kami
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Layanan */}
            <div className="footer-column">
              <h4 className="text-gray-900 dark:text-white font-semibold text-sm mb-4 font-poppins">
                Layanan
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <Link to="/services" className="text-gray-600 dark:text-gray-400 hover:text-[#0891b2] dark:hover:text-[#0891b2] text-sm transition-colors duration-200">
                    Pengembangan Web
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-gray-600 dark:text-gray-400 hover:text-[#0891b2] dark:hover:text-[#0891b2] text-sm transition-colors duration-200">
                    Aplikasi Mobile
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-gray-600 dark:text-gray-400 hover:text-[#0891b2] dark:hover:text-[#0891b2] text-sm transition-colors duration-200">
                    UI/UX Design
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-gray-600 dark:text-gray-400 hover:text-[#0891b2] dark:hover:text-[#0891b2] text-sm transition-colors duration-200">
                    Digital Marketing
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-gray-600 dark:text-gray-400 hover:text-[#0891b2] dark:hover:text-[#0891b2] text-sm transition-colors duration-200">
                    Cloud Solutions
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-gray-600 dark:text-gray-400 hover:text-[#0891b2] dark:hover:text-[#0891b2] text-sm transition-colors duration-200">
                    Konsultasi IT
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Perusahaan */}
            <div className="footer-column">
              <h4 className="text-gray-900 dark:text-white font-semibold text-sm mb-4 font-poppins">
                Perusahaan
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-[#0891b2] dark:hover:text-[#0891b2] text-sm transition-colors duration-200">
                    Tentang Kami
                  </Link>
                </li>
                <li>
                  <Link to="/team" className="text-gray-600 dark:text-gray-400 hover:text-[#0891b2] dark:hover:text-[#0891b2] text-sm transition-colors duration-200">
                    Tim Inovasi
                  </Link>
                </li>
                <li>
                  <Link to="/projects" className="text-gray-600 dark:text-gray-400 hover:text-[#0891b2] dark:hover:text-[#0891b2] text-sm transition-colors duration-200">
                    Portofolio
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-[#0891b2] dark:hover:text-[#0891b2] text-sm transition-colors duration-200">
                    Hubungi Kami
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Sosial */}
            <div className="footer-column">
              <h4 className="text-gray-900 dark:text-white font-semibold text-sm mb-4 font-poppins">
                Sosial
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <a href="https://instagram.com/genionteam" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-[#0891b2] dark:hover:text-[#0891b2] text-sm transition-colors duration-200">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="https://linkedin.com/company/genionteam" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-[#0891b2] dark:hover:text-[#0891b2] text-sm transition-colors duration-200">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/genionteam" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-[#0891b2] dark:hover:text-[#0891b2] text-sm transition-colors duration-200">
                    X / Twitter
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/62881020536245" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-[#0891b2] dark:hover:text-[#0891b2] text-sm transition-colors duration-200">
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a href="https://threads.net/@genionteam" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-[#0891b2] dark:hover:text-[#0891b2] text-sm transition-colors duration-200">
                    Threads
                  </a>
                </li>
                <li>
                  <a href="https://youtube.com/@genionteam" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-[#0891b2] dark:hover:text-[#0891b2] text-sm transition-colors duration-200">
                    YouTube
                  </a>
                </li>
                <li>
                  <a href="https://tiktok.com/@genionteam" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-[#0891b2] dark:hover:text-[#0891b2] text-sm transition-colors duration-200">
                    TikTok
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/* Bottom Section */}
          <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-bold font-poppins">
                <span className="text-gray-900 dark:text-white">G</span>
                <span className="text-[#0891b2]">.</span>
              </span>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <p>© 2026 Genion. All rights reserved.</p>
            </div>
          </div>

          {/* Large Background Typography with 3D Letterpress Effect */}
          <div ref={footerBrandRef} className="absolute bottom-0 left-0 right-0 pointer-events-none select-none overflow-hidden" style={{ zIndex: 0, opacity: 0.15 }}>
            {/* Light theme letterpress effect */}
            <h2 
              className="dark:hidden font-serif font-bold text-[6rem] xs:text-[8rem] sm:text-[12rem] md:text-[16rem] lg:text-[20rem] xl:text-[24rem] leading-none whitespace-nowrap"
              style={{
                color: 'rgba(209, 213, 219, 0.6)',
                textShadow: 'inset 0 4px 10px rgba(0, 0, 0, 0.2), inset 0 -3px 6px rgba(255, 255, 255, 0.6)',
                WebkitTextStroke: '1px rgba(156, 163, 175, 0.3)',
              }}
            >
              Genion
            </h2>
            {/* Dark theme letterpress effect */}
            <h2 
              className="hidden dark:block font-serif font-bold text-[6rem] xs:text-[8rem] sm:text-[12rem] md:text-[16rem] lg:text-[20rem] xl:text-[24rem] leading-none whitespace-nowrap"
              style={{
                color: 'rgba(75, 85, 99, 0.2)',
                textShadow: 'inset 0 -3px 8px rgba(255, 255, 255, 0.05), inset 0 4px 10px rgba(0, 0, 0, 0.6)',
                WebkitTextStroke: '1px rgba(55, 65, 81, 0.3)',
              }}
            >
              Genion
            </h2>
          </div>
        </div>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      </footer>
    </div>
  );
};
