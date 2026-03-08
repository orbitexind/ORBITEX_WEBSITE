"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { ArrowDown, Github, Linkedin, Twitter, Sparkles, MessageCircle } from "lucide-react";
import GlowButton from "@/components/ui/GlowButton";

const stats = [
  { number: "10+", label: "Projects Delivered" },
  { number: "8+", label: "Happy Clients" },
  { number: "2+", label: "Years Experience" },
  { number: "100%", label: "Satisfaction Rate" },
];

const socials = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: MessageCircle, href: "https://wa.me/919503144168", label: "WhatsApp" },
];

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.6], [0, 60]);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-[#030712]"
      aria-label="Hero section"
    >
      {/* ─── Animated background layer ─── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid dots */}
        <div className="absolute inset-0 bg-grid opacity-100" />

        {/* Large purple orb – top left */}
        <motion.div
          className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(124,58,237,0.22) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Cyan orb – bottom right */}
        <motion.div
          className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(6,182,212,0.18) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
          animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Center ambient pulse */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-violet-400/40"
            style={{
              left: `${10 + i * 8}%`,
              top: `${15 + (i % 5) * 18}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* ─── Main content ─── */}
      <motion.div
        style={{ opacity, y }}
        className="relative z-10 container mx-auto px-6 max-w-5xl text-center pt-24"
      >
        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/8 text-violet-300 text-sm font-medium mb-8 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          Available for new projects
          <Sparkles size={13} className="text-violet-400" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-[82px] font-extrabold leading-[1.1] tracking-tight mb-5"
        >
          <span className="text-gray-900 dark:text-white">We are </span>
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
              OrbitexInd
            </span>
            {/* Underline accent */}
            <motion.span
              className="absolute -bottom-2 left-0 h-[3px] rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.9, delay: 0.7, ease: "easeOut" }}
            />
          </span>
        </motion.h1>

        {/* Type animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg sm:text-2xl md:text-3xl text-gray-500 dark:text-gray-400 mb-7 min-h-[2.5rem] font-light"
        >
          <TypeAnimation
            sequence={[
              "Android App Developer",
              2200,
              "Full-Stack Web Developer",
              2200,
              "AI & Chatbot Builder",
              2200,
              "Python Developer",
              2200,
              "UI/UX Designer",
              2200,
            ]}
            wrapper="span"
            speed={52}
            repeat={Infinity}
            className="font-medium text-violet-300"
          />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-gray-600 dark:text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          We build high-quality Android apps, modern websites, AI chatbots &
          data dashboards — at affordable Indian pricing. From idea to
          deployment, fast and hassle-free.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 w-full px-2 sm:px-0"
        >
          <GlowButton href="https://wa.me/919503144168" variant="primary" size="lg" className="w-full sm:w-auto">
            💬 WhatsApp Us
          </GlowButton>
          <GlowButton href="#portfolio" variant="secondary" size="lg" className="w-full sm:w-auto">
            View Our Work →
          </GlowButton>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 max-w-3xl mx-auto w-full"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 + i * 0.08 }}
              className="text-center p-3 sm:p-4 rounded-2xl bg-white dark:bg-white/[0.04] border border-gray-200 dark:border-white/5 shadow-sm dark:shadow-none"
            >
              <div className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-gray-500 dark:text-gray-500 text-xs mt-1 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* ─── Side social links ─── */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 1 }}
        className="absolute left-6 bottom-16 hidden lg:flex flex-col gap-4 items-center"
      >
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-violet-500/60" />
        {socials.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            className="w-9 h-9 rounded-full border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5 hover:border-violet-400 dark:hover:border-violet-500/50 hover:bg-violet-50 dark:hover:bg-violet-500/10 flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-violet-600 dark:hover:text-violet-300 transition-all duration-300"
          >
            <Icon size={15} />
          </a>
        ))}
        <div className="w-px h-16 bg-gradient-to-t from-transparent to-violet-500/60" />
      </motion.div>

      {/* ─── Scroll indicator ─── */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 dark:text-gray-600 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
        aria-label="Scroll to about section"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase font-semibold">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-8 h-12 rounded-full border border-gray-300 dark:border-white/10 flex items-start justify-center pt-2"
        >
          <span className="w-1 h-3 rounded-full bg-violet-400/80" />
        </motion.div>
        <ArrowDown size={14} />
      </motion.a>
    </section>
  );
};

export default Hero;
