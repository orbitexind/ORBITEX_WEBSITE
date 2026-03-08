"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Download, MapPin, CheckCircle2 } from "lucide-react";
import GlowButton from "@/components/ui/GlowButton";

const skills = [
  { name: "Android Development", percent: 90, color: "from-emerald-500 to-green-500" },
  { name: "Web Dev (React / Next.js)", percent: 88, color: "from-cyan-500 to-blue-500" },
  { name: "Python & AI/ML", percent: 85, color: "from-violet-500 to-pink-500" },
  { name: "Java & Desktop Apps", percent: 82, color: "from-orange-500 to-amber-500" },
  { name: "UI/UX Design", percent: 80, color: "from-pink-500 to-rose-500" },
  { name: "Database & Backend", percent: 78, color: "from-blue-500 to-indigo-500" },
];

const techTags = [
  "Android (Java/Kotlin)", "Flutter", "React", "Next.js", "TypeScript",
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
  const skillsRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(skillsRef, { once: true, margin: "-80px" });
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
          {/* ─── Left column: Avatar + bio ─── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={sectionInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-2 flex flex-col items-center lg:items-start gap-8"
          >
            {/* Avatar */}
            <div className="relative inline-flex items-center justify-center">
              {/* Outer glow */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-violet-500/20 to-cyan-500/20 blur-2xl" />
              {/* Rotating ring */}
              <motion.div
                className="absolute -inset-2 rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, #7c3aed, #06b6d4, #7c3aed)",
                  opacity: 0.4,
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              />
              {/* Avatar circle */}
              <div className="relative w-48 h-48 rounded-full p-[3px] bg-gradient-to-br from-violet-500 to-cyan-500">
                <div className="w-full h-full rounded-full bg-gray-100 dark:bg-[#0f0f1a] flex flex-col items-center justify-center gap-1">
                  <span className="text-5xl font-extrabold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent tracking-tighter">
                    OI
                  </span>
                  <span className="text-[10px] text-gray-500 dark:text-gray-500 tracking-widest uppercase">
                    Team
                  </span>
                </div>
              </div>
              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -right-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-semibold backdrop-blur-sm"
              >
                ✦ Available for Hire
              </motion.div>
            </div>

            {/* Name & location */}
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">OrbitexInd</h3>
              <p className="flex items-center gap-1.5 text-gray-500 text-sm justify-center lg:justify-start">
                <MapPin size={13} className="text-violet-400" />
                Maharashtra, India • Remote Worldwide
              </p>
            </div>

            {/* Bio */}
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm text-center lg:text-left">
              We are a passionate development team from Maharashtra, India,
              specializing in Android app development, full-stack web apps, and
              AI-powered solutions. We build fast, clean, and affordable products
              for startups, small businesses, and students — from MVP to
              deployment.
            </p>

            {/* Highlights */}
            <ul className="space-y-2 w-full">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle2 size={15} className="text-violet-400 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="flex flex-col xs:flex-row sm:flex-row gap-3 w-full lg:w-auto">
              <GlowButton href="#contact" variant="primary" size="sm" className="w-full xs:w-auto justify-center">
                Contact Us
              </GlowButton>
              <GlowButton href="#" variant="outline" size="sm" className="w-full xs:w-auto justify-center">
                <Download size={14} />
                Download CV
              </GlowButton>
            </div>
          </motion.div>

          {/* ─── Right column: skills ─── */}
          <div className="lg:col-span-3 space-y-10">
            {/* Tech tags */}
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

            {/* Skill bars */}
            <motion.div
              ref={skillsRef}
              initial={{ opacity: 0, y: 20 }}
              animate={sectionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-500 mb-6">
                Expertise Level
              </h4>
              <div className="space-y-5">
                {skills.map((skill, i) => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {skill.name}
                      </span>
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="text-sm font-semibold text-violet-400 tabular-nums"
                      >
                        {skill.percent}%
                      </motion.span>
                    </div>
                    {/* Track */}
                    <div className="h-2 rounded-full bg-gray-200 dark:bg-white/5 overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.percent}%` } : { width: 0 }}
                        transition={{
                          duration: 1.2,
                          delay: 0.2 + i * 0.1,
                          ease: [0.34, 1.56, 0.64, 1],
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Fun stats mini grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={sectionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { emoji: "💼", value: "50+", label: "Projects Done" },
                { emoji: "⭐", value: "30+", label: "5-Star Reviews" },
                { emoji: "☕", value: "3,000+", label: "Coffees Consumed" },
                { emoji: "🌍", value: "20+", label: "Countries Served" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 rounded-2xl bg-white dark:bg-white/[0.04] border border-gray-200 dark:border-white/5 shadow-sm dark:shadow-none flex items-center gap-3"
                >
                  <span className="text-2xl">{stat.emoji}</span>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white text-base leading-none">
                      {stat.value}
                    </div>
                    <div className="text-gray-500 dark:text-gray-500 text-xs mt-0.5">{stat.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
