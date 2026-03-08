"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Check,
  X,
  Smartphone,
  Globe,
  Brain,
  Wrench,
  Clock,
  RefreshCw,
} from "lucide-react";
import GlowButton from "@/components/ui/GlowButton";
import { cn } from "@/lib/utils";

type Tab = "packages" | "services" | "smm";
type Currency = "INR" | "USD";

const mobilePackages = [
  {
    id: "basic",
    name: "Starter App",
    emoji: "🟢",
    tagline: "Ideal for MVPs & small businesses",
    delivery: "3 Days",
    revisions: "2 Revisions",
    priceUSD: "$25 – $40",
    priceINR: "₹2,000 – ₹3,500",
    color: "from-cyan-500 to-teal-500",
    glow: "rgba(6,182,212,0.22)",
    popular: false,
    includes: [
      "Functional Android app",
      "Basic UI design",
      "Essential features",
    ],
    excludes: [
      "Functional iOS app",
      "App submission",
      "Ad integration",
    ],
  },
  {
    id: "standard",
    name: "Business App",
    emoji: "🔵",
    tagline: "Professional Android for businesses",
    delivery: "5–7 Days",
    revisions: "3 Revisions",
    priceUSD: "$80 – $120",
    priceINR: "₹6,500 – ₹10,000",
    color: "from-violet-500 to-purple-600",
    glow: "rgba(124,58,237,0.38)",
    popular: true,
    includes: [
      "Functional Android app",
      "Modern UI/UX design",
      "Splash screen & app icon",
      "Database integration",
      "User login & auth",
      "API connectivity",
      "Source code included",
    ],
    excludes: [],
  },
  {
    id: "premium",
    name: "Full App Solution",
    emoji: "🟣",
    tagline: "Android + iOS, store-ready delivery",
    delivery: "10–14 Days",
    revisions: "15–20 Revisions",
    priceUSD: "$200 – $350+",
    priceINR: "₹16,000 – ₹28,000+",
    color: "from-amber-500 to-orange-500",
    glow: "rgba(245,158,11,0.22)",
    popular: false,
    includes: [
      "Functional Android app",
      "Functional iOS app (Flutter)",
      "App design & branding",
      "Splash screen & app icon",
      "App submission (both stores)",
      "Ad network integration",
      "Source code included",
    ],
    excludes: [],
  },
];

const serviceGroups = [
  {
    id: "web",
    label: "Web Development",
    icon: Globe,
    color: "from-cyan-500 to-blue-600",
    iconBg: "bg-cyan-500/15 border-cyan-500/25",
    iconColor: "text-cyan-400",
    services: [
      { name: "Website Development", price: "₹6,000 – ₹10,000", maintenance: "₹500 – ₹1,500/mo" },
      { name: "E-Commerce Website Setup", price: "₹12,000 – ₹60,000", maintenance: "₹1,500 – ₹3,000/mo" },
      { name: "Full-Stack Web Application", price: "₹12,000 – ₹30,000", maintenance: "₹2,000 – ₹5,000/mo" },
      { name: "Java Desktop Applications", price: "₹6,000 – ₹30,000", maintenance: "₹1,000 – ₹2,500/mo" },
    ],
  },
  {
    id: "ai",
    label: "AI & Data",
    icon: Brain,
    color: "from-violet-500 to-purple-600",
    iconBg: "bg-violet-500/15 border-violet-500/25",
    iconColor: "text-violet-400",
    services: [
      { name: "Chatbot Development", price: "₹8,000 – ₹50,000", maintenance: "₹1,500 – ₹4,000/mo" },
      { name: "Data Analysis & Dashboard", price: "₹3,000 – ₹20,000", maintenance: "₹500 – ₹1,500/mo" },
      { name: "AI / Machine Learning Solutions", price: "₹10,000 – ₹30,000", maintenance: "₹2,000 – ₹5,000/mo" },
      { name: "College Project & Documentation", price: "₹3,000 – ₹20,000", maintenance: null },
    ],
  },
  {
    id: "android",
    label: "Android & Support",
    icon: Wrench,
    color: "from-emerald-500 to-green-600",
    iconBg: "bg-emerald-500/15 border-emerald-500/25",
    iconColor: "text-emerald-400",
    services: [
      { name: "Android Basic App", price: "₹5,000 – ₹15,000", maintenance: "₹500 – ₹1,500/mo" },
      { name: "Custom Android Application", price: "₹15,000 – ₹50,000", maintenance: "₹1,500 – ₹4,000/mo" },
      { name: "UI/UX Design for Android", price: "₹3,000 – ₹12,000", maintenance: null },
      { name: "App Bug Fixing & Optimization", price: "₹500 – ₹5,000 / task", maintenance: null },
      { name: "API Integration & Backend", price: "₹3,000 – ₹15,000", maintenance: "₹800 – ₹2,000/mo" },
      { name: "App Publishing on Google Play", price: "₹1,000 – ₹5,000", maintenance: null },
    ],
  },
];

const smmModules = [
  {
    id: "account-mgmt",
    name: "Account Management",
    icon: "👤",
    color: "from-blue-500 to-cyan-500",
    glow: "rgba(6,182,212,0.18)",
    options: [
      { tier: "Basic (Shared)", price: "₹2,000/mo", desc: "Junior team member handles accounts part-time — posting, monitoring & responses across 1-2 platforms. Ideal for startups with simple needs." },
      { tier: "Dedicated", price: "₹4,000/mo", desc: "Dedicated expert full-time: faster responses, strategy input & proactive engagement on up to 3-4 platforms." },
    ],
  },
  {
    id: "content-creation",
    name: "Content Creation",
    icon: "✍️",
    color: "from-violet-500 to-purple-600",
    glow: "rgba(124,58,237,0.18)",
    options: [
      { tier: "12 Posts/mo", price: "₹5,000/mo", desc: "12 high-quality posts/month — graphics, captions & Reels scripts tailored to your brand voice." },
      { tier: "16 Posts/mo", price: "₹7,000/mo", desc: "16 posts/month with more variety and platform optimization." },
      { tier: "20 Posts/mo", price: "₹9,000/mo", desc: "20 posts/month including advanced visuals and trending formats." },
      { tier: "Unlimited Posts", price: "₹12,000/mo", desc: "No cap on custom posts — perfect for high-volume brands needing daily activity." },
    ],
  },
  {
    id: "curated-content",
    name: "Curated Content",
    icon: "🔍",
    color: "from-teal-500 to-emerald-500",
    glow: "rgba(20,184,166,0.18)",
    options: [
      { tier: "Any Volume", price: "₹1,500/mo", desc: "Professional sourcing, adaptation & integration of trending/relevant content (memes, industry news) to boost engagement without full custom creation." },
    ],
  },
  {
    id: "content-calendar",
    name: "Content Calendar",
    icon: "📅",
    color: "from-amber-500 to-orange-500",
    glow: "rgba(245,158,11,0.18)",
    options: [
      { tier: "Basic", price: "₹1,000/mo", desc: "Simple monthly plan with 10-15 post ideas, basic hashtags, and posting schedule." },
      { tier: "Detailed", price: "₹2,000/mo", desc: "In-depth calendar with 20+ ideas, theme planning, and 2 strategy check-ins." },
      { tier: "Advanced", price: "₹3,000/mo", desc: "Comprehensive plan including seasonal trends, competitor-inspired themes, and detailed timelines." },
      { tier: "AI-Optimized", price: "₹4,000/mo", desc: "AI-driven calendar with auto-suggested best posting times, performance predictions, and dynamic adjustments." },
    ],
  },
  {
    id: "dm-management",
    name: "DM Management",
    icon: "💬",
    color: "from-pink-500 to-rose-500",
    glow: "rgba(236,72,153,0.18)",
    options: [
      { tier: "Basic", price: "₹3,000/mo", desc: "Manual DM handling (up to 30 min/day), quick replies, and basic lead capture." },
      { tier: "Advanced", price: "₹5,000/mo", desc: "Deeper engagement with personalized responses, conversation tracking, and conversion-focused follow-ups." },
      { tier: "AI Automated", price: "₹6,000/mo", desc: "AI-powered chatbot + human oversight for 24/7 responses, auto-replies, and smart lead qualification." },
    ],
  },
  {
    id: "video-editing",
    name: "Video Editing",
    icon: "🎬",
    color: "from-red-500 to-orange-600",
    glow: "rgba(239,68,68,0.18)",
    options: [
      { tier: "30-Sec Videos", price: "₹1,000 each", desc: "Short Reels or Stories videos with script, editing, music & captions. Available in bundles of 1-4/mo." },
      { tier: "60-Sec Videos", price: "₹1,500 each", desc: "Longer format videos for storytelling, tutorials, or product demos with full editing. Bundles of 1-4/mo." },
    ],
  },
  {
    id: "motion-graphics",
    name: "Motion Graphics",
    icon: "✨",
    color: "from-indigo-500 to-violet-600",
    glow: "rgba(99,102,241,0.18)",
    options: [
      { tier: "4 Pieces/mo", price: "₹3,500/mo", desc: "Animated text overlays, transitions, or simple infographics for Reels." },
      { tier: "8 Pieces/mo", price: "₹6,000/mo", desc: "Higher volume for dynamic posts and Stories." },
      { tier: "12+ Pieces/mo", price: "₹8,000/mo", desc: "Unlimited-scale motion assets for premium visual content." },
    ],
  },
  {
    id: "analytics",
    name: "Analytics & Reporting",
    icon: "📊",
    color: "from-cyan-500 to-blue-600",
    glow: "rgba(6,182,212,0.18)",
    options: [
      { tier: "Basic Monthly", price: "₹1,500/mo", desc: "Standard end-of-month report with key metrics — reach, engagement, growth." },
      { tier: "Bi-Weekly", price: "₹2,500/mo", desc: "More frequent updates for quicker insights and faster adjustments." },
      { tier: "Weekly", price: "₹3,500/mo", desc: "Detailed weekly dashboards with trends, recommendations, and performance deep-dives." },
    ],
  },
  {
    id: "competitor-analysis",
    name: "Competitor Analysis",
    icon: "🔬",
    color: "from-lime-500 to-green-600",
    glow: "rgba(132,204,22,0.18)",
    options: [
      { tier: "Basic", price: "₹2,000/mo", desc: "Monthly overview of 2-3 competitors' posting patterns, engagement, and top content." },
      { tier: "Advanced", price: "₹3,500/mo", desc: "In-depth benchmarking — content themes, hashtags, and performance gaps." },
      { tier: "In-Depth", price: "₹5,000/mo", desc: "Comprehensive AI-assisted analysis with SWOT, trend spotting, and actionable strategy recommendations." },
    ],
  },
  {
    id: "crisis-management",
    name: "Crisis Management",
    icon: "🛡️",
    color: "from-red-600 to-rose-700",
    glow: "rgba(220,38,38,0.18)",
    options: [
      { tier: "Basic", price: "₹4,000/mo", desc: "Monitoring + alert system for negative mentions with simple response templates." },
      { tier: "Advanced", price: "₹6,000/mo", desc: "Proactive reputation handling, full response strategy, escalation protocols, and post-crisis review." },
    ],
  },
  {
    id: "lead-gen",
    name: "Lead Generation",
    icon: "🎯",
    color: "from-yellow-500 to-amber-600",
    glow: "rgba(234,179,8,0.18)",
    options: [
      { tier: "Standard", price: "₹2,500/mo", desc: "Targeted lead capture via optimized CTAs, forms in Stories/posts, polls, and follow-up funnels." },
    ],
  },
  {
    id: "community-scheduling",
    name: "Community Scheduling",
    icon: "⏰",
    color: "from-sky-500 to-blue-500",
    glow: "rgba(14,165,233,0.18)",
    options: [
      { tier: "Standard", price: "₹1,000/mo", desc: "Automated publishing, scheduling across platforms, and basic engagement queuing." },
    ],
  },
  {
    id: "ai-automation",
    name: "AI Automation Complete",
    icon: "🤖",
    color: "from-violet-600 to-indigo-600",
    glow: "rgba(124,58,237,0.18)",
    options: [
      { tier: "Full Suite", price: "₹10,000/mo", desc: "Full AI suite: auto-posting, content suggestions, chatbots, sentiment analysis, and workflow automation." },
    ],
  },
  {
    id: "strategy-session",
    name: "1-on-1 Strategy Session",
    icon: "🎙️",
    color: "from-emerald-500 to-teal-600",
    glow: "rgba(16,185,129,0.18)",
    options: [
      { tier: "Per Session", price: "₹500 / session", desc: "45-60 min personalized strategy call with an expert — one-off or as an add-on to any plan." },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
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

const Pricing = () => {
  const [activeTab, setActiveTab] = useState<Tab>("packages");
  const [currency, setCurrency] = useState<Currency>("INR");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="pricing"
      className="relative py-24 md:py-32 overflow-hidden bg-white dark:bg-[#030712]"
      aria-label="Pricing section"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-violet-600/6 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-cyan-500/5 blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="section-tag">Pricing</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-5">
            Transparent, flexible{" "}
            <span className="text-gradient">pricing</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto text-lg">
            No hidden fees. Flat project rates so you always know what
            you&apos;re investing. Every project includes a free discovery call.
          </p>
          {/* Currency toggle */}
          <div className="inline-flex items-center gap-1 mt-6 p-1 rounded-full bg-white/5 border border-white/10">
            {(["INR", "USD"] as Currency[]).map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300",
                  currency === c
                    ? "bg-violet-600 text-white shadow-lg"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                )}
              >
                {c === "INR" ? "🇮🇳 ₹ INR" : "🇺🇸 $ USD"}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab switcher */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center justify-center gap-2 mb-14 overflow-x-auto pb-1 -mx-2 px-2 scrollbar-hide"
        >
          {(
            [
              { id: "packages", label: "📱 Mobile App Packages" },
              { id: "services", label: "🛠️ Service Rates" },
              { id: "smm", label: "📣 SMM Services" },
            ] as { id: Tab; label: string }[]
          ).map((tab) => (
              <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap min-h-[44px]",
                activeTab === tab.id
                  ? "text-white"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              )}
            >
              {activeTab === tab.id && (
                <motion.span
                  layoutId="pricing-tab-pill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 to-purple-600"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          {/* ── PACKAGES TAB ─────────────────────────────────────── */}
          {activeTab === "packages" && (
            <motion.div
              key="packages"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              <motion.div
                ref={ref}
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
              >
                {mobilePackages.map((pkg) => (
                  <motion.div
                    key={pkg.id}
                    variants={cardVariants}
                    whileHover={{ y: pkg.popular ? -4 : -6 }}
                    className={cn(
                      "relative rounded-3xl overflow-hidden transition-all duration-300 border",
                      pkg.popular
                        ? "border-violet-500/50 bg-gradient-to-b from-violet-100/80 to-white dark:from-violet-950/60 dark:to-[#0a0a14]"
                        : "border-gray-200 dark:border-white/8 bg-white dark:bg-white/[0.03] shadow-sm dark:shadow-none"
                    )}
                    style={{
                      transform: pkg.popular ? "scale(1.02)" : undefined,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 50px ${pkg.glow}, 0 8px 40px rgba(0,0,0,0.5)`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "";
                    }}
                  >
                    {/* Top gradient bar */}
                    <div className={`h-1 w-full bg-gradient-to-r ${pkg.color}`} />

                    {/* Popular badge */}
                    {pkg.popular && (
                      <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-violet-600 text-white text-[10px] font-bold tracking-wider uppercase">
                        Most Popular
                      </div>
                    )}

                    <div className="p-7 md:p-8">
                      {/* Emoji + name */}
                      <div className="mb-4">
                        <div className="text-2xl mb-2">{pkg.emoji}</div>
                        <div className="font-bold text-gray-900 dark:text-white text-xl">
                          {pkg.name}
                        </div>
                        <div className="text-gray-500 text-sm mt-0.5">
                          {pkg.tagline}
                        </div>
                      </div>

                      {/* Price */}
                      <div className="mb-5">
                        <div
                          className={`text-3xl font-extrabold bg-gradient-to-r ${pkg.color} bg-clip-text text-transparent`}
                        >
                          {currency === "INR" ? pkg.priceINR : pkg.priceUSD}
                        </div>
                        <div className="text-gray-500 text-sm mt-0.5">
                          {currency === "INR" ? `≈ ${pkg.priceUSD}` : `≈ ${pkg.priceINR}`}
                        </div>
                      </div>

                      {/* Meta: delivery + revisions */}
                      <div className="flex items-center gap-4 mb-6 text-sm text-gray-400">
                        <span className="flex items-center gap-1.5">
                          <Clock size={13} className="text-gray-500" />
                          {pkg.delivery}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <RefreshCw size={13} className="text-gray-500" />
                          {pkg.revisions}
                        </span>
                      </div>

                      {/* CTA */}
                      <div className="mb-6">
                        {pkg.popular ? (
                          <GlowButton
                            href="#contact"
                            variant="primary"
                            className="w-full justify-center"
                          >
                            Get Started →
                          </GlowButton>
                        ) : (
                          <a
                            href="#contact"
                            className="w-full flex items-center justify-center py-3.5 rounded-full text-sm font-semibold border border-gray-300 dark:border-white/15 text-gray-600 dark:text-gray-300 hover:border-violet-400 dark:hover:border-white/30 hover:bg-violet-50 dark:hover:bg-white/5 transition-all duration-300"
                          >
                            Get Started →
                          </a>
                        )}
                      </div>

                      {/* Divider */}
                      <div className="w-full h-px bg-gray-200 dark:bg-white/8 mb-5" />

                      {/* Includes */}
                      <p className="text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-600 font-semibold mb-3">
                        Includes
                      </p>
                      <ul className="space-y-2.5 mb-4">
                        {pkg.includes.map((feat) => (
                          <li
                            key={feat}
                            className="flex items-start gap-2.5 text-sm text-gray-700 dark:text-gray-300"
                          >
                            <Check
                              size={14}
                              className={cn(
                                "shrink-0 mt-0.5",
                                pkg.popular
                                  ? "text-violet-400"
                                  : "text-emerald-400"
                              )}
                            />
                            {feat}
                          </li>
                        ))}
                        {pkg.excludes.map((feat) => (
                          <li
                            key={feat}
                            className="flex items-start gap-2.5 text-sm text-gray-600"
                          >
                            <X size={14} className="shrink-0 mt-0.5 text-red-700/60" />
                            {feat}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* ── SERVICES TAB ─────────────────────────────────────── */}
          {activeTab === "services" && (
            <motion.div
              key="services"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {serviceGroups.map((group, gi) => {
                const Icon = group.icon;
                return (
                  <motion.div
                    key={group.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                      delay: gi * 0.1,
                    }}
                    className="rounded-3xl border border-gray-200 dark:border-white/8 bg-white dark:bg-white/[0.03] overflow-hidden shadow-sm dark:shadow-none"
                  >
                    {/* Category header */}
                    <div
                      className={`h-1 w-full bg-gradient-to-r ${group.color}`}
                    />
                    <div className="px-6 pt-6 pb-4 border-b border-gray-200 dark:border-white/8 flex items-center gap-3">
                      <div
                        className={cn(
                          "w-9 h-9 rounded-xl border flex items-center justify-center",
                          group.iconBg
                        )}
                      >
                        <Icon size={16} className={group.iconColor} />
                      </div>
                      <span className="text-gray-900 dark:text-white font-bold text-base">
                        {group.label}
                      </span>
                    </div>

                    {/* Service rows */}
                    <ul className="divide-y divide-gray-100 dark:divide-white/5">
                      {group.services.map((svc) => (
                        <li
                          key={svc.name}
                          className="px-6 py-4 flex flex-col gap-1 hover:bg-gray-50 dark:hover:bg-white/[0.03] transition-colors"
                        >
                          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                            {svc.name}
                          </span>
                          <div className="flex items-center flex-wrap gap-2 mt-0.5">
                            <span
                              className={`text-sm font-bold bg-gradient-to-r ${group.color} bg-clip-text text-transparent`}
                            >
                              {svc.price}
                            </span>
                            {svc.maintenance && (
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/8 text-gray-500 font-medium">
                                Maintenance: {svc.maintenance}
                              </span>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
          {/* ── SMM TAB ──────────────────────────────────────── */}
          {activeTab === "smm" && (
            <motion.div
              key="smm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              <p className="text-center text-gray-600 dark:text-gray-400 text-sm mb-8 max-w-2xl mx-auto">
                All prices are <span className="text-gray-900 dark:text-white font-semibold">INR/Month, Excl. GST</span>. Mix &amp; match modules to build a plan that fits your brand perfectly.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {smmModules.map((mod, mi) => (
                  <motion.div
                    key={mod.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: mi * 0.04 }}
                    className="rounded-2xl border border-gray-200 dark:border-white/8 bg-white dark:bg-white/[0.03] overflow-hidden flex flex-col shadow-sm dark:shadow-none"
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 40px ${mod.glow}`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "";
                    }}
                  >
                    {/* top accent bar */}
                    <div className={`h-[3px] w-full bg-gradient-to-r ${mod.color}`} />
                    <div className="px-5 pt-5 pb-4">
                      <div className="flex items-center gap-2.5 mb-3">
                        <span className="text-xl">{mod.icon}</span>
                        <span className="text-gray-900 dark:text-white font-bold text-[15px]">{mod.name}</span>
                      </div>
                      <ul className="space-y-3">
                        {mod.options.map((opt) => (
                          <li key={opt.tier} className="rounded-xl border border-gray-200 dark:border-white/6 bg-gray-50 dark:bg-white/[0.025] px-4 py-3">
                            <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{opt.tier}</span>
                              <span className={`text-sm font-extrabold bg-gradient-to-r ${mod.color} bg-clip-text text-transparent whitespace-nowrap`}>
                                {opt.price}
                              </span>
                            </div>
                            <p className="text-[11px] text-gray-500 leading-relaxed">{opt.desc}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border border-violet-400/40 dark:border-violet-500/40 text-violet-700 dark:text-violet-300 hover:bg-violet-50 dark:hover:bg-violet-600/15 hover:border-violet-500/60 dark:hover:border-violet-400/60 transition-all duration-300"
                >
                  Build a custom SMM plan →
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Guarantee strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4"
        >
          {[
            { emoji: "🤝", text: "Free discovery call" },
            { emoji: "💳", text: "50% upfront, 50% on delivery" },
            { emoji: "🔄", text: "Unlimited scope clarification" },
            { emoji: "✅", text: "Satisfaction guarantee" },
          ].map((item) => (
            <div
              key={item.text}
              className="flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/5 shadow-sm dark:shadow-none"
            >
              <span className="text-xl">{item.emoji}</span>
              <span className="text-gray-600 dark:text-gray-400 text-xs font-medium">
                {item.text}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Custom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-gray-600 text-sm mt-8"
        >
          Need something custom?{" "}
          <a
            href="#contact"
            className="text-violet-400 hover:text-violet-300 font-medium underline underline-offset-2 decoration-violet-500/40"
          >
            Let&apos;s build a custom quote for your project →
          </a>
        </motion.p>
      </div>
    </section>
  );
};

export default Pricing;

