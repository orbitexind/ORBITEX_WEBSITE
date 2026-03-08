"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Rohan Mehta",
    role: "Founder",
    company: "StartupIN",
    avatar: "RM",
    avatarGradient: "from-violet-500 to-purple-600",
    stars: 5,
    text: "Orbitex built our business website in just 4 days. The design is modern, loads super fast, and our clients keep complimenting it. The team was responsive on WhatsApp throughout and delivered exactly what we discussed. Will definitely hire again!",
    project: "Startup Business Website",
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Student (Final Year)",
    company: "SPPU College",
    avatar: "PS",
    avatarGradient: "from-cyan-500 to-blue-600",
    stars: 5,
    text: "I needed a complete college project with documentation and presentation in a week. Orbitex delivered a fully working Android app with clean code and all documents. The team explained every part so I could present it confidently. Highly recommended for college projects!",
    project: "Android College Project + Docs",
  },
  {
    id: 3,
    name: "Amit Joshi",
    role: "Small Business Owner",
    company: "Joshi Traders",
    avatar: "AJ",
    avatarGradient: "from-emerald-500 to-green-600",
    stars: 5,
    text: "I wanted a simple Android app for my shop to manage inventory and orders. Orbitex built it in a week at a very affordable price. Even after delivery they helped me with a few small changes without any extra charge. Very professional and reliable.",
    project: "Shop Inventory Android App",
  },
  {
    id: 4,
    name: "Siddharth Kulkarni",
    role: "IT Manager",
    company: "MahaLogistics",
    avatar: "SK",
    avatarGradient: "from-amber-500 to-orange-600",
    stars: 5,
    text: "We needed an AI chatbot for our customer support that could answer queries in both English and Marathi. Orbitex understood our requirement perfectly and delivered a smart, working chatbot in just 10 days. Our team is saving hours every week now.",
    project: "Bilingual AI Customer Chatbot",
  },
  {
    id: 5,
    name: "Neha Patil",
    role: "Data Analyst Intern",
    company: "Analytics Firm",
    avatar: "NP",
    avatarGradient: "from-pink-500 to-rose-600",
    stars: 5,
    text: "Orbitex helped me build a complete data analysis dashboard for my internship project in Python. The visualizations were excellent and my manager was impressed. The team also explained the code clearly so I could present it myself. Great value for money!",
    project: "Python Data Analysis Dashboard",
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    intervalRef.current = setInterval(next, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isAutoPlaying, next]);

  const pauseAuto = () => setIsAutoPlaying(false);
  const resumeAuto = () => setIsAutoPlaying(true);

  return (
    <section
      id="testimonials"
      className="relative py-24 md:py-32 overflow-hidden bg-slate-50 dark:bg-[#030712]"
      aria-label="Testimonials section"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-violet-600/6 blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="section-tag">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-5">
            What clients{" "}
            <span className="text-gradient">say about me</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto text-lg">
            Don&apos;t take my word for it. Here&apos;s what the people I&apos;ve worked
            with have to say.
          </p>
        </motion.div>

        {/* Main testimonial card */}
        <div
          className="relative"
          onMouseEnter={pauseAuto}
          onMouseLeave={resumeAuto}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 60, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -60, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative p-8 md:p-12 rounded-3xl bg-white dark:bg-white/[0.04] border border-gray-200 dark:border-white/10 overflow-hidden shadow-sm dark:shadow-none"
            >
              {/* Top gradient accent */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

              {/* Large quote mark */}
              <div className="absolute top-6 right-8 opacity-10">
                <Quote size={80} className="text-violet-400 rotate-180" />
              </div>

              {/* Stars */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(testimonials[current].stars)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-amber-400 text-amber-400"
                  />
                ))}
                <span className="text-amber-400 text-xs font-semibold ml-1">
                  5.0
                </span>
              </div>

              {/* Quote text */}
              <blockquote className="text-gray-700 dark:text-gray-300 text-lg md:text-xl leading-relaxed mb-8 relative z-10 font-light">
                &ldquo;{testimonials[current].text}&rdquo;
              </blockquote>

              {/* Author row */}
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${testimonials[current].avatarGradient} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}
                  >
                    {testimonials[current].avatar}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white text-sm">
                      {testimonials[current].name}
                    </div>
                    <div className="text-gray-500 text-xs">
                      {testimonials[current].role} •{" "}
                      <span className="text-violet-400/80">
                        {testimonials[current].company}
                      </span>
                    </div>
                  </div>
                </div>
                {/* Project tag */}
                <span className="text-[11px] px-3 py-1.5 rounded-full bg-violet-500/15 border border-violet-500/25 text-violet-300 font-medium">
                  {testimonials[current].project}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <button
            onClick={() => { pauseAuto(); prev(); }}
            className="absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white dark:bg-white/[0.04] border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-violet-400 dark:hover:border-violet-500/40 shadow-sm dark:shadow-none transition-all z-10 hidden md:flex"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => { pauseAuto(); next(); }}
            className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white dark:bg-white/[0.04] border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-violet-400 dark:hover:border-violet-500/40 shadow-sm dark:shadow-none transition-all z-10 hidden md:flex"
            aria-label="Next testimonial"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Dots & mobile nav */}
        <div className="flex items-center justify-center gap-4 mt-8">
          {/* Mobile prev */}
          <button
            onClick={() => { pauseAuto(); prev(); }}
            className="md:hidden w-9 h-9 rounded-full bg-white dark:bg-white/[0.04] border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={16} />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { pauseAuto(); setCurrent(i); }}
                aria-label={`Go to testimonial ${i + 1}`}
                className="relative h-2 transition-all duration-300"
                style={{ width: current === i ? 24 : 8 }}
              >
                <span
                  className={`absolute inset-0 rounded-full transition-colors duration-300 ${
                    current === i
                      ? "bg-violet-500"
                      : "bg-white/20 hover:bg-white/40"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Mobile next */}
          <button
            onClick={() => { pauseAuto(); next(); }}
            className="md:hidden w-9 h-9 rounded-full bg-white dark:bg-white/[0.04] border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Mini avatars row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center justify-center gap-3 mt-10"
        >
          <div className="flex -space-x-2">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                onClick={() => { pauseAuto(); setCurrent(i); }}
                className={`w-8 h-8 rounded-full bg-gradient-to-br ${t.avatarGradient} border-2 transition-all ${
                  current === i
                    ? "border-violet-500 scale-110 z-10"
                    : "border-gray-100 dark:border-[#030712] opacity-60 hover:opacity-100"
                } text-white text-[9px] font-bold flex items-center justify-center`}
              >
                {t.avatar}
              </button>
            ))}
          </div>
          <span className="text-gray-500 dark:text-gray-500 text-sm">
            <span className="text-gray-900 dark:text-white font-semibold">30+</span> happy clients
            worldwide
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
