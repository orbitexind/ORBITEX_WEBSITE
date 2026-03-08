"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Code2,
  Smartphone,
  Brain,
  BarChart2,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Web Development",
    tag: "Full-Stack",
    color: "from-violet-500 to-indigo-500",
    glow: "rgba(124,58,237,0.35)",
    description:
      "Modern, fast websites and full-stack web applications built with React, Next.js, and Node.js — from portfolios to e-commerce to SaaS platforms.",
    features: [
      "Responsive website & landing pages",
      "E-commerce with payment gateway",
      "Full-stack web applications",
      "REST API & database integration",
      "College projects & documentation",
      "Performance & SEO optimization",
    ],
  },
  {
    icon: Smartphone,
    title: "Android Development",
    tag: "Java / Flutter",
    color: "from-emerald-500 to-teal-500",
    glow: "rgba(16,185,129,0.35)",
    description:
      "Native and cross-platform Android apps built with Java, Kotlin, or Flutter — from MVPs to full business apps with backend integration.",
    features: [
      "Android apps (Java / Kotlin)",
      "Cross-platform apps (Flutter)",
      "Firebase & REST API integration",
      "User auth & database setup",
      "Splash screen & app icon",
      "Google Play Store publishing",
    ],
  },
  {
    icon: Brain,
    title: "AI & Chatbot Development",
    tag: "Python / OpenAI",
    color: "from-cyan-500 to-blue-500",
    glow: "rgba(6,182,212,0.35)",
    description:
      "Smart AI solutions and chatbots powered by Python and OpenAI — automated customer support, interview tools, and intelligent assistants.",
    features: [
      "Custom chatbot development",
      "OpenAI / GPT-4 integrations",
      "AI interview & assessment tools",
      "Document Q&A with RAG",
      "Python automation scripts",
      "Whatsapp / web bot deployment",
    ],
  },
  {
    icon: BarChart2,
    title: "Data Analysis & Dashboards",
    tag: "Python / Power BI",
    color: "from-amber-500 to-orange-500",
    glow: "rgba(245,158,11,0.35)",
    description:
      "Turn raw data into clear insights with interactive dashboards, visual reports, and ML models that help you make better business decisions.",
    features: [
      "Data analysis with Python (Pandas)",
      "Interactive dashboards (Power BI / Tableau)",
      "Visualization with Matplotlib / Seaborn",
      "Machine learning models",
      "Excel & CSV automation",
      "Custom reports & documentation",
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const Services = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="services"
      className="relative py-24 md:py-32 overflow-hidden bg-[#030712]"
      aria-label="Services section"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
        <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full bg-violet-600/6 blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-tag">What I Do</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-5">
            Services that{" "}
            <span className="text-gradient">drive results</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            From concept to launch, I provide end-to-end solutions that are
            engineered for performance, designed for delight, and built to scale.
          </p>
        </motion.div>

        {/* Services grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="group relative p-7 rounded-3xl bg-white/[0.03] border border-white/8 hover:border-white/15 overflow-hidden cursor-default"
                style={{
                  transition: "border-color 0.3s, box-shadow 0.3s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 50px ${service.glow}, 0 8px 32px rgba(0,0,0,0.4)`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "";
                }}
              >
                {/* Top gradient accent */}
                <div
                  className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${service.color} opacity-50 group-hover:opacity-100 transition-opacity duration-300`}
                />

                {/* Background glow on hover */}
                <div
                  className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500`}
                />

                {/* Icon */}
                <div
                  className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5 shadow-lg`}
                >
                  <Icon size={24} className="text-white" />
                  {/* Glow blob under icon */}
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} blur-lg opacity-60 -z-10 scale-110`}
                  />
                </div>

                {/* Tag + Title */}
                <div className="mb-3">
                  <span
                    className={`inline-block text-[10px] font-bold tracking-[0.15em] uppercase bg-gradient-to-r ${service.color} bg-clip-text text-transparent mb-1.5`}
                  >
                    {service.tag}
                  </span>
                  <h3 className="text-xl font-bold text-white">{service.title}</h3>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Feature list */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-center gap-2.5 text-sm text-gray-400"
                    >
                      <CheckCircle
                        size={13}
                        className="text-emerald-400 shrink-0"
                      />
                      {feat}
                    </li>
                  ))}
                </ul>

                {/* CTA link */}
                <a
                  href="#contact"
                  className={`inline-flex items-center gap-2 text-sm font-semibold bg-gradient-to-r ${service.color} bg-clip-text text-transparent group-hover:gap-3 transition-all duration-200`}
                >
                  Get Started
                  <ArrowRight
                    size={14}
                    className={`text-violet-400 group-hover:translate-x-1 transition-transform`}
                  />
                </a>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-500 text-sm">
            Need something custom?{" "}
            <a
              href="#contact"
              className="text-violet-400 hover:text-violet-300 font-medium underline underline-offset-2 decoration-violet-500/40"
            >
              Let&apos;s talk about your project →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
