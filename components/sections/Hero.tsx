"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { HiArrowLongDown, HiArrowLongRight, HiSparkles, HiChatBubbleLeftRight } from "react-icons/hi2";
import { FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import GlowButton from "@/components/ui/GlowButton";
import TiltCard from "@/components/ui/TiltCard";

const stats = [
  { number: "10+", label: "Projects Delivered" },
  { number: "8+", label: "Happy Clients" },
  { number: "2+", label: "Years Experience" },
  { number: "100%", label: "Satisfaction Rate" },
];

const socials = [
  { icon: FaGithub, href: "#", label: "GitHub" },
  { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
  { icon: FaTwitter, href: "#", label: "Twitter" },
  { icon: HiChatBubbleLeftRight, href: "https://wa.me/919422880355", label: "WhatsApp" },
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
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-white dark:bg-[#030712]"
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

        {/* 3D orbit rings */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: "700px" }}>
          <motion.div
            className="absolute w-[420px] h-[420px] sm:w-[560px] sm:h-[560px] rounded-full border border-violet-400/20 dark:border-violet-500/25"
            animate={{ rotateZ: 360 }}
            style={{ rotateX: 72 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute w-[580px] h-[580px] sm:w-[780px] sm:h-[780px] rounded-full border-[0.5px] border-cyan-400/15 dark:border-cyan-500/18"
            animate={{ rotateZ: -360 }}
            style={{ rotateX: 72 }}
            transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Floating 3D diamond shapes */}
        {[
          { w: 14, h: 14, left: "11%", top: "22%", delay: 0, color: "rgba(139,92,246,0.55)" },
          { w: 10, h: 10, left: "83%", top: "18%", delay: 0.9, color: "rgba(6,182,212,0.5)" },
          { w: 15, h: 15, left: "87%", top: "65%", delay: 1.6, color: "rgba(167,139,250,0.45)" },
          { w: 8, h: 8, left: "8%", top: "72%", delay: 0.4, color: "rgba(34,211,238,0.45)" },
          { w: 12, h: 12, left: "60%", top: "10%", delay: 1.2, color: "rgba(196,181,253,0.5)" },
        ].map((shape, i) => (
          <motion.div
            key={`diamond-${i}`}
            className="absolute border rounded-sm"
            style={{
              width: shape.w,
              height: shape.h,
              left: shape.left,
              top: shape.top,
              borderColor: shape.color,
              boxShadow: `0 0 8px ${shape.color}`,
              rotate: 45,
            }}
            animate={{
              y: [0, -22, 0],
              rotate: [45, 100, 45],
              opacity: [0.4, 0.9, 0.4],
            }}
            transition={{
              duration: 3 + i * 0.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: shape.delay,
            }}
          />
        ))}
      </div>

      {/* ─── Main content ─── */}
      <motion.div
        style={{ opacity, y }}
        className="relative z-10 container mx-auto px-4 sm:px-6 max-w-5xl text-center pt-32 sm:pt-40 md:pt-48 pb-10 sm:pb-0"
      >
        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-sky-400/30 bg-sky-400/8 text-sky-300 text-sm font-medium mb-8 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          Available for new projects
          <HiSparkles size={13} className="text-violet-400" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-[82px] font-extrabold leading-[1.1] tracking-tight mb-5"
        >
          <span className="text-gray-900 dark:text-white">We are </span>
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
              Orbitex
            </span>
            {/* Underline accent */}
            <motion.span
              className="absolute -bottom-2 left-0 h-[3px] rounded-full bg-gradient-to-r from-sky-400 to-indigo-600"
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
              "Social Media Manager",
              2200,
              "AI & Chatbot Builder",
              2200,
              "Python Developer",
              2200,
              "UI/UX Designer",
              2200,
              "3D - Web Developer",
              2200,
              "3D - Android Developer",
              2200,
              "MERN Stack Developer",
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
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-16 w-full px-2 sm:px-0"
        >
          <GlowButton href="https://wa.me/919422880355" variant="primary" size="lg" className="w-full sm:w-auto">
            <HiChatBubbleLeftRight size={16} className="inline mr-2 -mt-0.5" /> WhatsApp Us
          </GlowButton>
          <GlowButton href="#portfolio" variant="secondary" size="lg" className="w-full sm:w-auto">
            View Our Work <HiArrowLongRight size={16} className="inline ml-1.5 -mt-0.5" />
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
              style={{ perspective: "600px" }}
            >
              <TiltCard
                className="text-center p-3 sm:p-4 rounded-2xl bg-white dark:bg-white/[0.04] border border-gray-200 dark:border-white/5 shadow-sm dark:shadow-none"
                intensity={14}
              >
                <div className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-gray-500 dark:text-gray-500 text-xs mt-1 font-medium">
                  {stat.label}
                </div>
              </TiltCard>
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
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-gray-400 dark:text-gray-600 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
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
        <HiArrowLongDown size={20} />
      </motion.a>
    </section>
  );
};

export default Hero;
