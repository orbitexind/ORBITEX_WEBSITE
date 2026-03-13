"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn, FaTwitter, FaYoutube } from "react-icons/fa";
import { HiArrowLongUp, HiArrowLongRight, HiHeart } from "react-icons/hi2";

const footerLinks = {
  Services: [
    { name: "Web Development", href: "#services" },
    { name: "UI/UX Design", href: "#services" },
    { name: "AI Integration", href: "#services" },
    { name: "Automation", href: "#services" },
  ],
  Navigation: [
    { name: "About", href: "#about" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Pricing", href: "#pricing" },
  ],
  Contact: [
    { name: "Start a Project", href: "#contact" },
    { name: "orbitexind@gmail.com", href: "mailto:orbitexind@gmail.com" },
    { name: "+91 94228 80355", href: "tel:+919422880355" },
  ],
};

const socials = [
  { icon: FaGithub, href: "#", label: "GitHub" },
  { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
  { icon: FaTwitter, href: "#", label: "Twitter / X" },
  { icon: FaYoutube, href: "#", label: "YouTube" },
];

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-gray-50 dark:bg-[#030712] border-t border-gray-200 dark:border-white/[0.06] overflow-hidden">
      {/* Glow accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-sky-500/50 to-transparent" />

      <div className="container mx-auto px-6 max-w-7xl py-16">
        {/* Top CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 rounded-2xl bg-gradient-to-r from-sky-100 to-blue-50 dark:from-sky-600/20 dark:to-blue-500/10 border border-sky-200 dark:border-sky-500/20 mb-14"
        >
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
              Have a project in mind?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Let&apos;s build something amazing together.
            </p>
          </div>
          <a
            href="#contact"
            className="shrink-0 px-7 py-3 rounded-full bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-semibold text-sm transition-all hover:shadow-[0_0_24px_rgba(14,165,233,0.5)] active:scale-95"
          >
            Start a Conversation <HiArrowLongRight className="inline ml-1" />
          </a>
        </motion.div>

        {/* Main footer grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="#home" className="inline-flex items-center gap-2.5 mb-4">
              <img 
                src="/logo.png" 
                alt="Orbitex Logo" 
                className="h-10 w-auto object-contain"
              />
            </a>
            <p className="text-gray-500 dark:text-gray-500 text-sm leading-relaxed max-w-xs">
              Crafting digital experiences that inspire, convert, and scale.
              Available for freelance work worldwide.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-3 mt-5">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-sky-100 dark:hover:bg-sky-600/30 border border-gray-200 dark:border-white/8 hover:border-sky-300 dark:hover:border-sky-500/40 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-sky-600 dark:hover:text-white transition-all duration-300"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-500 dark:text-gray-400 hover:text-sky-600 dark:hover:text-white transition-colors duration-200 hover:underline underline-offset-2 decoration-sky-500/60"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-gray-200 dark:border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 dark:text-gray-600 text-sm">
            © {new Date().getFullYear()} OrbitexInd. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500 hover:text-sky-600 dark:hover:text-sky-400 transition-colors group"
          >
            Back to top
            <span className="w-7 h-7 rounded-full bg-gray-100 dark:bg-white/5 group-hover:bg-sky-100 dark:group-hover:bg-sky-500/20 border border-gray-200 dark:border-white/8 flex items-center justify-center transition-all">
              <HiArrowLongUp size={12} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
