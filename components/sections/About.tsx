"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HiMapPin, HiCheckBadge, HiSparkles } from "react-icons/hi2";
import GlowButton from "@/components/ui/GlowButton";

const techTags = [
  "Android (Java/Kotlin)", "Flutter", "React", "OrbitexInd", "TypeScript",
  "Python", "Node.js", "Tailwind CSS", "Firebase", "MongoDB",
  "PostgreSQL", "OpenAI", "Framer Motion", "Java",
];

const highlights = [
  "Full-stack Web, Android & AI Development Team",
  "Delivered 10+ projects for clients across India",
  "Specializing in Android apps, chatbots & data dashboards",
  "Fast delivery · Clean code · Affordable pricing",
];

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden bg-slate-50 dark:bg-[#030712]"
      aria-label="About section"
    >
      
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 -left-64 w-96 h-96 rounded-full bg-violet-600/8 blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-cyan-500/6 blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-tag">About Us</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-5">
            Passionate about{" "}
            <span className="text-gradient">great software</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            We turn complex problems into elegant, high-performance digital products
            that users love and businesses depend on.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 items-start">
          {/* Left column: Avatar + stats */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={sectionInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-2 flex flex-col items-center lg:items-start gap-12"
          >
            {/* Avatar block */}
            <div className="flex flex-col items-center lg:items-start gap-6 w-full">
              <div className="relative w-full aspect-square max-w-[320px] flex items-center justify-center">
                <motion.div
                  className="relative w-full h-full"
                  initial={{ rotateY: 360 }}
                  animate={{ rotateY: 0 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <img 
                    src="/logo.png" 
                    alt="3D Rocket Logo" 
                    className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(124,58,237,0.5)]"
                  />
                  {/* Shadow below */}
                  <motion.div 
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-40 h-3 bg-violet-500/20 blur-md rounded-full"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.div>
              </div>

              {/* Status Badge */}
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 dark:text-emerald-400 text-xs font-semibold backdrop-blur-sm flex items-center gap-1.5 self-center lg:self-start"
              >
                <HiSparkles size={12} />
                Available for Hire
              </motion.div>
            </div>

          </motion.div>

          {/* Right column: info + tech */}
          <div className="lg:col-span-3 space-y-10">
            {/* Tech tags area */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={sectionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-500 mb-4">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {techTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:border-violet-400 dark:hover:border-violet-500/40 hover:text-violet-700 dark:hover:text-violet-300 hover:bg-violet-50 dark:hover:bg-violet-500/10 transition-all duration-200 cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Info Block moved to right column */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={sectionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center lg:text-left">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Orbitex</h3>
                <p className="flex items-center gap-1.5 text-gray-500 text-sm justify-center lg:justify-start">
                  <HiMapPin size={16} className="text-sky-500" />
                  Indapur, Maharashtra, India • Remote Worldwide
                </p>
              </div>

              {/* Bio */}
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base text-center lg:text-left">
                We are a passionate development team from Maharashtra, India,
                specializing in Android app development, full-stack web apps, and
                AI-powered solutions. We build fast, clean, and affordable products
                for startups, small businesses, and students — from MVP to
                deployment.
              </p>

              {/* Highlights */}
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                {highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400">
                    <HiCheckBadge size={16} className="text-sky-500" />
                    {item}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="flex flex-col xs:flex-row sm:flex-row gap-4 pt-4">
                <GlowButton href="#contact" variant="primary" size="md" className="w-full xs:w-auto justify-center">
                  Contact Us
                </GlowButton>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
