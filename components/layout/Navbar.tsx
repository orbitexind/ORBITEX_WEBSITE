"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Services", href: "#services" },
  { name: "Pricing", href: "#pricing" },

  { name: "About", href: "#about" },
  { name: "Portfolio", href: "#portfolio" },
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

      // Update active section based on scroll position
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

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "py-3 bg-white/95 dark:bg-[#030712]/85 backdrop-blur-2xl border-b border-gray-200 dark:border-white/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
            : "py-4 sm:py-5 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between max-w-7xl">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2.5">
            <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 flex items-center justify-center shadow-[0_0_18px_rgba(14,165,233,0.6)]">
              <span className="text-white text-[13px] font-black tracking-tighter select-none">O</span>
            </div>
            <span className="text-lg font-bold">
              <span className="bg-gradient-to-r from-sky-500 to-blue-500 dark:from-sky-400 dark:to-blue-400 bg-clip-text text-transparent">
                Orbitex
              </span>
              <span className="text-sky-500 dark:text-sky-400">.</span>
            </span>
          </a>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                    isActive
                      ? "text-gray-900 dark:text-white"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-gray-100 dark:bg-white/8 border border-gray-200 dark:border-white/10"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </a>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-300 hover:border-violet-300 dark:hover:border-violet-500/50 transition-all duration-300"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
              </button>
            )}
            <a
              href="#contact"
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 text-white text-sm font-semibold transition-all duration-300 hover:from-violet-500 hover:to-purple-500 hover:shadow-[0_0_24px_rgba(124,58,237,0.5)] active:scale-95"
            >
              Contact Us
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors"
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
                  <X size={20} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={20} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
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
            {/* Nav links */}
            <nav className="flex flex-col gap-1 flex-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 + 0.1 }}
                  className="flex items-center justify-between px-5 py-4 rounded-2xl text-lg font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-all duration-200 group"
                >
                  {link.name}
                  <span className="w-6 h-6 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    ↗
                  </span>
                </motion.a>
              ))}
            </nav>

            {/* Mobile CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="pt-6 border-t border-gray-200 dark:border-white/8"
            >
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="w-full flex items-center justify-center py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold text-base hover:from-violet-500 hover:to-purple-500 transition-all"
              >
                Hire Me — Let&apos;s Talk
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
