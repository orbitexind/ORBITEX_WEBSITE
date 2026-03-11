"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiBars3, HiXMark, HiSun, HiMoon } from "react-icons/hi2";
import { HiSparkles, HiArrowUpRight } from "react-icons/hi2";
import { useTheme } from "next-themes";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Services", href: "#services" },
  { name: "Pricing", href: "#pricing" },
  { name: "SMM", href: "#smm" },
  { name: "About", href: "#about" },
  { name: "Work", href: "#portfolio" },
  { name: "FAQ", href: "#faq" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = navLinks.map((l) => l.href.slice(1));
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 pointer-events-none md:pointer-events-auto ${scrolled
          ? "py-2.5 bg-transparent md:bg-white/90 md:dark:bg-[#030712]/80 md:backdrop-blur-2xl md:shadow-[0_4px_30px_rgba(0,0,0,0.06)] md:dark:shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "py-4 sm:py-5 bg-transparent"
          }`}
      >
        {/* Scrolled state gradient accent line - Desktop only */}
        {scrolled && (
          <div className="hidden md:block absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 dark:via-violet-500/30 to-transparent" />
        )}

        <div className="container mx-auto px-6 flex items-center justify-end md:justify-between max-w-7xl">
          {/* Logo */}
          <a href="#home" className="hidden md:flex items-center gap-2 group pointer-events-auto">
            <div className="relative">
              <img 
                src="/logo.png" 
                alt="Orbitex Logo" 
                className="h-16 md:h-24 lg:h-28 w-auto object-contain transition-all duration-300"
              />
            </div>
          </a>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-0.5 p-1.5 rounded-full bg-white/60 dark:bg-white/[0.04] border border-gray-200/80 dark:border-white/[0.06] backdrop-blur-xl pointer-events-auto" aria-label="Main navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative px-3.5 py-1.5 text-[13px] font-medium rounded-full transition-all duration-300 ${isActive
                    ? "text-white"
                    : "text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-300"
                    }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 shadow-[0_0_16px_rgba(124,58,237,0.4)]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </a>
              );
            })}
          </nav>

          {/* Desktop CTA area */}
          <div className="hidden md:flex items-center gap-3 pointer-events-auto">
            {/* Theme toggle */}
            {mounted && (
              <motion.button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="relative w-9 h-9 flex items-center justify-center rounded-full border border-violet-200 dark:border-violet-500/30 bg-violet-50 dark:bg-violet-500/10 text-violet-500 dark:text-violet-300 hover:bg-violet-100 dark:hover:bg-violet-500/20 hover:border-violet-400 dark:hover:border-violet-400/50 transition-all duration-300 overflow-hidden"
                aria-label="Toggle theme"
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {theme === "dark" ? (
                    <motion.span
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <HiSun size={15} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <HiMoon size={15} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            )}

            {/* CTA button */}
            <a
              href="#contact"
              className="relative overflow-hidden px-5 py-2.5 rounded-full bg-gradient-to-r from-violet-600 via-indigo-600 to-sky-500 text-white text-sm font-semibold transition-all duration-300 hover:shadow-[0_0_28px_rgba(124,58,237,0.5)] active:scale-95 flex items-center gap-1.5"
            >
              {/* Shimmer overlay */}
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_3s_infinite]" />
              <HiSparkles size={14} className="relative z-10" />
              <span className="relative z-10">Contact Us</span>
            </a>
          </div>

          {/* Mobile actions container */}
          <div className="md:hidden flex items-center gap-3 backdrop-blur-xl pointer-events-auto mt-2">
            {/* Mobile theme toggle */}
            {mounted && (
              <motion.button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors"
                aria-label="Toggle theme"
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {theme === "dark" ? (
                    <motion.span
                      key="sun-mobile"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <HiSun size={20} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="moon-mobile"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <HiMoon size={20} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <HiXMark size={20} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <HiBars3 size={20} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="fixed inset-0 z-30 md:hidden flex flex-col bg-white/97 dark:bg-[#030712]/97 backdrop-blur-2xl pt-24 pb-8 px-6"
          >
            {/* Top gradient accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-sky-400 to-indigo-500" />
            {/* Decorative orb */}
            <div className="absolute top-1/3 -right-20 w-60 h-60 rounded-full bg-violet-500/10 blur-[100px] pointer-events-none" />

            {/* Nav links */}
            <nav className="flex flex-col gap-1 flex-1">
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 + 0.1 }}
                    className={`flex items-center justify-between px-5 py-4 rounded-2xl text-lg font-medium transition-all duration-200 group ${isActive
                      ? "text-violet-600 dark:text-violet-300 bg-violet-50 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/20"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
                      }`}
                  >
                    <span className="flex items-center gap-3">
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500" />
                      )}
                      {link.name}
                    </span>
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all ${isActive
                        ? "bg-violet-500/20 text-violet-400 opacity-100"
                        : "bg-violet-500/20 text-violet-400 opacity-0 group-hover:opacity-100"
                        }`}
                    >
                      <HiArrowUpRight size={12} />
                    </span>
                  </motion.a>
                );
              })}
            </nav>

            {/* Theme toggle row */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-between px-5 py-3 mb-4"
            >
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Theme</span>
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-violet-200 dark:border-violet-500/30 bg-violet-50 dark:bg-violet-500/10 text-violet-500 dark:text-violet-300 transition-all"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? <HiSun size={15} /> : <HiMoon size={15} />}
                </button>
              )}
            </motion.div>

            {/* Mobile CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="pt-4 border-t border-gray-200 dark:border-white/8"
            >
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-sky-500 text-white font-semibold text-base hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] transition-all"
              >
                <HiSparkles size={15} />
                Contact Us
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
