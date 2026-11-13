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

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const overlayRef = useRef<HTMLDivElement>(null);

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

            {/* Mobile Hamburger */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="p-2 text-gray-600 dark:text-gray-400 transition-colors"
                aria-label="Toggle navigation menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Fullscreen Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 bg-[#0d0d0d] flex flex-col items-center justify-center md:hidden">
            {/* Close button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-5 right-6 p-2 text-gray-400"
              aria-label="Close menu"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <nav className="flex flex-col items-center space-y-8">
              {navLinks.map((link) => {
                const active = link.path === "/" ? location.pathname === "/" : location.pathname.startsWith(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-2xl font-medium transition-colors duration-200 ${
                      active ? "text-white" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="border border-[#0891b2] text-[#0891b2] hover:bg-[#0891b2] hover:text-black transition-colors duration-200 rounded-md px-6 py-2 text-lg font-medium"
              >
                Kontak
              </Link>

              {/* Mobile Theme Toggle */}
              <button
                onClick={handleThemeToggle}
                className="w-9 h-9 rounded-full flex items-center justify-center border border-white/10 bg-white/5 hover:bg-white/10 transition-colors duration-200 cursor-pointer"
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
            </nav>
          </div>
        )}
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

      {/* Footer */}
      <footer className="bg-white dark:bg-[#0d0d0d] border-t border-gray-200 dark:border-white/[0.08] mt-auto">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

            {/* Column 1: Brand */}
            <div>
              <div className="flex items-center space-x-3 mb-0">
                <div className="w-10 h-10 flex items-center justify-center">
                  <img src="/genion_logo.png" alt="Logo" loading="lazy" className="w-full h-full object-contain rounded" />
                </div>
                <span className="font-poppins font-bold text-xl">
                  <span className="text-[#0891b2]">Genion</span>
                  <span className="text-gray-900 dark:text-white">Team</span>
                </span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mt-3 mb-6 max-w-xs">
                Tim inovasi teknologi yang menghadirkan solusi digital terdepan.
              </p>
              <div className="flex space-x-3">
                {/* Twitter */}
                <a
                  href="https://twitter.com/genionteam"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 border border-gray-300 dark:border-white/10 rounded-md flex items-center justify-center text-gray-500 hover:border-[#0891b2] hover:text-[#0891b2] transition-colors"
                  aria-label="Twitter"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                {/* LinkedIn */}
                <a
                  href="https://linkedin.com/company/genionteam"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 border border-gray-300 dark:border-white/10 rounded-md flex items-center justify-center text-gray-500 hover:border-[#0891b2] hover:text-[#0891b2] transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                {/* Instagram */}
                <a
                  href="https://instagram.com/genionteam"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 border border-gray-300 dark:border-white/10 rounded-md flex items-center justify-center text-gray-500 hover:border-[#0891b2] hover:text-[#0891b2] transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Column 2: Navigasi */}
            <div>
              <h4 className="text-gray-900 dark:text-white text-xs font-mono tracking-widest uppercase mb-5">Navigasi</h4>
              <ul className="space-y-3">
                {[
                  { name: "Home", path: "/" },
                  { name: "Tentang", path: "/about" },
                  { name: "Tim", path: "/team" },
                  { name: "Layanan", path: "/services" },
                  { name: "Kontak", path: "/contact" },
                ].map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-gray-500 hover:text-gray-900 dark:hover:text-white text-sm transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Layanan */}
            <div>
              <h4 className="text-gray-900 dark:text-white text-xs font-mono tracking-widest uppercase mb-5">Layanan</h4>
              <ul className="space-y-3">
                {[
                  "Web Development",
                  "Mobile App",
                  "UI/UX Design",
                  "Digital Marketing",
                  "AI Solutions",
                  "IoT Systems",
                ].map((service) => (
                  <li key={service}>
                    <span className="text-gray-500 text-sm">{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Kontak */}
            <div>
              <h4 className="text-gray-900 dark:text-white text-xs font-mono tracking-widest uppercase mb-5">Kontak</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <svg className="w-4 h-4 text-[#0891b2] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  <span className="text-gray-500 text-sm">Jakarta, Indonesia</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-4 h-4 text-[#0891b2] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                  <span className="text-gray-500 text-sm">genionteam@gmail.com</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-4 h-4 text-[#0891b2] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                  <span className="text-gray-500 text-sm">+62 881-0250-36245</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom bar */}
          <div className="border-t border-gray-200 dark:border-white/[0.08] mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
            <p className="text-gray-600 text-xs">© 2025 Genion Team. All rights reserved.</p>
            <p className="text-gray-600 text-xs">Designed with ♥ by Genion Team</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
