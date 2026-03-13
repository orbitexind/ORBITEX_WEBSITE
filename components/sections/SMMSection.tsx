"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { IconType } from "react-icons";
import {
  HiPencilSquare,
  HiUser,
  HiFilm,
  HiChartBar,
  HiWrenchScrewdriver,
  HiArrowsPointingIn,
  HiArrowTrendingUp,
  HiChatBubbleLeftRight,
  HiCalendarDays,
  HiShieldCheck,
  HiClock,
  HiSparkles,
  HiMicrophone,
  HiMagnifyingGlass,
  HiCheckBadge,
  HiMegaphone,
  HiCheck,
  HiXMark,
  HiArrowPath,
  HiSquares2X2,
  HiArrowTopRightOnSquare,
  HiStar,
  HiArrowLongRight
} from "react-icons/hi2";
import TiltCard from "@/components/ui/TiltCard";
import GlowButton from "@/components/ui/GlowButton";
import { cn } from "@/lib/utils";

// ─── Service highlight cards ──────────────────────────────────────
const smmServices = [
  {
    icon: HiPencilSquare,
    title: "Content Creation",
    tag: "Posts & Reels",
    color: "from-violet-500 to-purple-600",
    glow: "rgba(124,58,237,0.35)",
    description:
      "High-quality posts, Reels, Stories and graphics tailored to your brand — from 12 to unlimited posts/month.",
    features: [
      "Custom graphics & captions",
      "Instagram / Facebook Reels",
      "Story templates & formats",
      "Brand voice consistency",
      "Trending content formats",
      "12 to Unlimited posts/mo",
    ],
  },
  {
    icon: HiUser,
    title: "Account Management",
    tag: "Daily Handling",
    color: "from-sky-500 to-blue-600",
    glow: "rgba(14,165,233,0.35)",
    description:
      "Full end-to-end management of your social accounts — posting, engagement, comment handling, and growth.",
    features: [
      "Daily posting & scheduling",
      "Comment & DM responses",
      "Audience engagement",
      "Brand reputation handled",
      "Up to 4 platforms covered",
      "Weekly status updates",
    ],
  },
  {
    icon: HiFilm,
    title: "Video & Motion Graphics",
    tag: "Reels & Animations",
    color: "from-red-500 to-orange-500",
    glow: "rgba(239,68,68,0.35)",
    description:
      "Professional short-form video editing and animated motion graphics to keep your feed dynamic and engaging.",
    features: [
      "30-sec & 60-sec Reels",
      "Script writing included",
      "Music, captions & effects",
      "Animated text overlays",
      "Smooth transitions",
      "Story & ad formats",
    ],
  },
  {
    icon: HiChartBar,
    title: "Analytics & Reporting",
    tag: "Insights & Growth",
    color: "from-cyan-500 to-teal-500",
    glow: "rgba(6,182,212,0.35)",
    description:
      "Clear reports on growth, reach, engagement, and competitor benchmarking so you always know what's working.",
    features: [
      "Monthly performance reports",
      "Bi-weekly & weekly options",
      "Competitor benchmarking",
      "Hashtag performance tracking",
      "Audience demographics",
      "Actionable recommendations",
    ],
  },
  {
    icon: HiWrenchScrewdriver,
    title: "AI & Automation",
    tag: "Smart Tools",
    color: "from-indigo-500 to-violet-600",
    glow: "rgba(99,102,241,0.35)",
    description:
      "AI-powered scheduling, DM chatbots, sentiment analysis, and workflow automation for 24/7 social presence.",
    features: [
      "Auto publishing & scheduling",
      "AI-powered DM chatbots",
      "Sentiment monitoring",
      "Content suggestions via AI",
      "Full workflow automation",
      "24/7 uptime & responses",
    ],
  },
  {
    icon: HiArrowsPointingIn,
    title: "Lead Generation & DMs",
    tag: "Growth & Conversions",
    color: "from-amber-500 to-orange-500",
    glow: "rgba(245,158,11,0.35)",
    description:
      "Turn followers into leads with optimized CTAs, DM funnels, story polls, and strategic community engagement.",
    features: [
      "Optimized story & post CTAs",
      "DM funnel setup & tracking",
      "Lead capture forms in stories",
      "Follow-up sequences",
      "Conversion tracking",
      "Community building strategy",
    ],
  },
];

// ─── Pricing modules ──────────────────────────────────────────────
const smmModules: {
  id: string;
  name: string;
  icon: IconType;
  color: string;
  glow: string;
  options: { tier: string; price: string; desc: string }[];
}[] = [
    {
      id: "account-mgmt",
      name: "Account Management",
      icon: HiUser,
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
      icon: HiPencilSquare,
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
      icon: HiMagnifyingGlass,
      color: "from-teal-500 to-emerald-500",
      glow: "rgba(20,184,166,0.18)",
      options: [
        { tier: "Any Volume", price: "₹1,500/mo", desc: "Professional sourcing, adaptation & integration of trending/relevant content (memes, industry news) to boost engagement without full custom creation." },
      ],
    },
    {
      id: "content-calendar",
      name: "Content Calendar",
      icon: HiCalendarDays,
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
      icon: HiChatBubbleLeftRight,
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
      icon: HiFilm,
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
      icon: HiSparkles,
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
      icon: HiChartBar,
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
      icon: HiArrowTrendingUp,
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
      icon: HiShieldCheck,
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
      icon: HiArrowsPointingIn,
      color: "from-yellow-500 to-amber-600",
      glow: "rgba(234,179,8,0.18)",
      options: [
        { tier: "Standard", price: "₹2,500/mo", desc: "Targeted lead capture via optimized CTAs, forms in Stories/posts, polls, and follow-up funnels." },
      ],
    },
    {
      id: "community-scheduling",
      name: "Community Scheduling",
      icon: HiClock,
      color: "from-sky-500 to-blue-500",
      glow: "rgba(14,165,233,0.18)",
      options: [
        { tier: "Standard", price: "₹1,000/mo", desc: "Automated publishing, scheduling across platforms, and basic engagement queuing." },
      ],
    },
    {
      id: "ai-automation",
      name: "AI Automation Complete",
      icon: HiWrenchScrewdriver,
      color: "from-violet-600 to-indigo-600",
      glow: "rgba(124,58,237,0.18)",
      options: [
        { tier: "Full Suite", price: "₹10,000/mo", desc: "Full AI suite: auto-posting, content suggestions, chatbots, sentiment analysis, and workflow automation." },
      ],
    },
    {
      id: "strategy-session",
      name: "1-on-1 Strategy Session",
      icon: HiMicrophone,
      color: "from-emerald-500 to-teal-600",
      glow: "rgba(16,185,129,0.18)",
      options: [
        { tier: "Per Session", price: "₹500 / session", desc: "45-60 min personalized strategy call with an expert — one-off or as an add-on to any plan." },
      ],
    },
  ];

// ─── Bundle packages ──────────────────────────────────────────────
const smmPackages: {
  id: string; name: string; icon: IconType; tagline: string;
  priceINR: string; priceUSD: string;
  color: string; glow: string; popular: boolean;
  includes: string[]; excludes: string[];
}[] = [
    {
      id: "smm-starter",
      name: "Starter",
      icon: HiSparkles,
      tagline: "For small businesses starting social",
      priceINR: "₹8,000/mo",
      priceUSD: "$95/mo",
      color: "from-cyan-500 to-teal-500",
      glow: "rgba(6,182,212,0.22)",
      popular: false,
      includes: [
        "1 platform managed",
        "12 posts/month",
        "Shared account manager",
        "Basic content calendar",
        "Monthly analytics report",
      ],
      excludes: [
        "Video editing / Reels",
        "AI automation",
        "DM management",
      ],
    },
    {
      id: "smm-growth",
      name: "Growth",
      icon: HiArrowTrendingUp,
      tagline: "Best for growing brands on social media",
      priceINR: "₹18,000/mo",
      priceUSD: "$215/mo",
      color: "from-violet-500 to-purple-600",
      glow: "rgba(124,58,237,0.38)",
      popular: true,
      includes: [
        "2–3 platforms managed",
        "20 posts/month",
        "Dedicated account manager",
        "4 Reels / videos per month",
        "Detailed content calendar",
        "Bi-weekly analytics report",
        "DM management included",
      ],
      excludes: [],
    },
    {
      id: "smm-pro",
      name: "Pro",
      icon: HiStar,
      tagline: "Full-scale SMM for established brands",
      priceINR: "₹35,000/mo",
      priceUSD: "$420/mo",
      color: "from-amber-500 to-orange-500",
      glow: "rgba(245,158,11,0.22)",
      popular: false,
      includes: [
        "4+ platforms managed",
        "Unlimited posts/month",
        "Dedicated account manager",
        "8 Reels + motion graphics",
        "AI-optimized content calendar",
        "Weekly analytics & reporting",
        "AI automation full suite",
        "Lead generation & DMs",
      ],
      excludes: [],
    },
  ];

// ─── SMM Client Results ──────────────────────────────────────────
const smmClientResults = [
  {
    handle: "@shemovesss__",
    href: "https://www.instagram.com/shemovesss__?igsh=MXEwZDl4NjVncHNycQ==",
    role: "Content Creator",
    avatarGradient: "from-pink-500 to-rose-600",
    initial: "S",
    stat: "140K+",
    statLabel: "Instagram Reach",
    statSub: "On a single Reel",
    color: "from-pink-500 to-rose-500",
    glow: "rgba(236,72,153,0.28)",
    quote:
      "Handed over my raw footage and got back fully polished Reels within a single day — perfect hooks, smooth transitions, trending audio, on-brand captions. The video hit 140K+ organic reach on Instagram. That kind of result doesn't happen with average editing. If you want content that actually performs, this is who you call.",
  },
  {
    handle: "@_jewelishq_",
    href: "https://www.instagram.com/_jewelishq_?igsh=MTd6ZnVwdXQxMHRhdw==",
    role: "Jewelry Brand, Instagram",
    avatarGradient: "from-amber-400 to-yellow-500",
    initial: "J",
    stat: "25+ Sales",
    statLabel: "New customers in 3 days",
    statSub: "Direct from Instagram DMs",
    color: "from-amber-400 to-orange-500",
    glow: "rgba(245,158,11,0.28)",
    quote:
      "We handed over our page and within 3 days of OrbitexInd managing our content, we had 25+ new customers ordering directly through our Instagram DMs — people who had never heard of us before. The visuals, captions and posting strategy were immediately impactful. Our page finally looks and converts like a real premium brand.",
  },
];

type SMMTab = "services" | "packages" | "pricing";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const SMMSection = () => {
  const [activeTab, setActiveTab] = useState<SMMTab>("services");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="smm"
      className="relative py-24 md:py-32 overflow-hidden bg-gray-50 dark:bg-[#050b14]"
      aria-label="Social Media Management section"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-pink-500/20 to-transparent" />
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full bg-violet-600/5 blur-[130px]" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-pink-600/5 blur-[120px]" />
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
          <span className="section-tag">Social Media Management</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-5">
            SMM services that{" "}
            <span className="text-gradient">grow your brand</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            We manage, create, and grow your social media presence across
            Instagram, Facebook, YouTube and more — with strategy, content, and
            AI-powered tools.
          </p>
        </motion.div>

        {/* Client Results Strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-14"
        >
          <p className="text-center text-[11px] uppercase tracking-[0.18em] text-gray-500 dark:text-gray-500 font-semibold mb-6">
            Verified results from our SMM clients
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {smmClientResults.map((client) => (
              <div
                key={client.handle}
                className="relative rounded-2xl border border-gray-200 dark:border-white/8 bg-white dark:bg-white/[0.03] p-6 overflow-hidden transition-shadow duration-300"
                style={{ boxShadow: `0 0 0px transparent` }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 40px ${client.glow}`; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 0px transparent`; }}
              >
                <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${client.color}`} />
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <div className={`text-4xl font-black bg-gradient-to-r ${client.color} bg-clip-text text-transparent leading-none`}>
                      {client.stat}
                    </div>
                    <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mt-1">{client.statLabel}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{client.statSub}</div>
                  </div>
                  <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${client.avatarGradient} flex items-center justify-center text-white font-bold text-base shrink-0 shadow-lg`}>
                    {client.initial}
                  </div>
                </div>
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <HiStar key={i} size={12} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  &ldquo;{client.quote}&rdquo;
                </p>
                <a
                  href={client.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 text-sm font-bold bg-gradient-to-r ${client.color} bg-clip-text text-transparent hover:opacity-75 transition-opacity`}
                >
                  {client.handle}
                  <HiArrowTopRightOnSquare size={12} className="text-gray-400 shrink-0" />
                </a>
                <div className="text-xs text-gray-500 mt-0.5">{client.role}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tab switcher */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center md:justify-center gap-2 mb-14 overflow-x-auto pb-2 pt-1 px-4 md:-mx-2 md:px-2 scrollbar-hide"
        >
          {(
            [
              { id: "services", Icon: HiSquares2X2, label: "What We Offer" },
              { id: "packages", Icon: HiMegaphone, label: "SMM Packages" },
              { id: "pricing", Icon: HiChartBar, label: "Build a Plan" },
            ] as { id: SMMTab; Icon: IconType; label: string }[]
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
                  layoutId="smm-tab-pill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 to-purple-600"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <tab.Icon size={15} />
                {tab.label}
              </span>
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          {/* ── WHAT WE OFFER TAB ── */}
          {activeTab === "services" && (
            <motion.div
              key="services"
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
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {smmServices.map((service) => {
                  const Icon = service.icon;
                  return (
                    <motion.div
                      key={service.title}
                      variants={cardVariants}
                      whileHover={{ y: -8 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      style={{ perspective: "1200px" }}
                    >
                      <TiltCard
                        className="group relative p-7 rounded-3xl bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/8 hover:border-violet-300 dark:hover:border-white/15 overflow-hidden cursor-default shadow-sm dark:shadow-none transition-[border-color,box-shadow] duration-300 h-full"
                        glowColor={service.glow}
                        intensity={8}
                      >
                        <div
                          className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${service.color} opacity-50 group-hover:opacity-100 transition-opacity duration-300`}
                        />
                        <div
                          className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500`}
                        />
                        <div
                          className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5 shadow-lg`}
                        >
                          <Icon size={24} className="text-white" />
                          <div
                            className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} blur-lg opacity-60 -z-10 scale-110`}
                          />
                        </div>
                        <div className="mb-3">
                          <span
                            className={`inline-block text-[10px] font-bold tracking-[0.15em] uppercase bg-gradient-to-r ${service.color} bg-clip-text text-transparent mb-1.5`}
                          >
                            {service.tag}
                          </span>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            {service.title}
                          </h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-5">
                          {service.description}
                        </p>
                        <ul className="space-y-2">
                          {service.features.map((f) => (
                            <li
                              key={f}
                              className="flex items-center gap-2.5 text-sm text-gray-700 dark:text-gray-300"
                            >
                              <HiCheckBadge size={14} className="text-emerald-400 shrink-0" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </TiltCard>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          )}

          {/* ── SMM PACKAGES TAB ── */}
          {activeTab === "packages" && (
            <motion.div
              key="packages"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
              >
                {smmPackages.map((pkg) => {
                  const PkgIcon = pkg.icon;
                  return (
                    <motion.div
                      key={pkg.id}
                      variants={cardVariants}
                      whileHover={{ y: pkg.popular ? -4 : -6 }}
                      className={cn(
                        "relative rounded-3xl overflow-hidden transition-all duration-300 border",
                        pkg.popular
                          ? "border-sky-500/50 bg-gradient-to-b from-sky-100/80 to-white dark:from-sky-950/60 dark:to-[#0a0a14]"
                          : "border-gray-200 dark:border-white/8 bg-white dark:bg-white/[0.03] shadow-sm dark:shadow-none"
                      )}
                      style={{ transform: pkg.popular ? "scale(1.02)" : undefined }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 50px ${pkg.glow}, 0 8px 40px rgba(0,0,0,0.5)`;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLDivElement).style.boxShadow = "";
                      }}
                    >
                      <div className={`h-1 w-full bg-gradient-to-r ${pkg.color}`} />
                      {pkg.popular && (
                        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-sky-600 text-white text-[10px] font-bold tracking-wider uppercase">
                          Most Popular
                        </div>
                      )}
                      <div className="p-7 md:p-8">
                        <div className="mb-4">
                          <div className={`mb-3 w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br ${pkg.color}`}>
                            <PkgIcon size={20} className="text-white" />
                          </div>
                          <div className="font-bold text-gray-900 dark:text-white text-xl">{pkg.name}</div>
                          <div className="text-gray-500 text-sm mt-0.5">{pkg.tagline}</div>
                        </div>
                        <div className="mb-5">
                          <div className={`text-3xl font-extrabold bg-gradient-to-r ${pkg.color} bg-clip-text text-transparent`}>
                            {pkg.priceINR}
                          </div>
                          <div className="text-gray-500 text-sm mt-0.5">USD {pkg.priceUSD}</div>
                        </div>
                        <div className="flex items-center gap-4 mb-6 text-sm text-gray-400">
                          <span className="flex items-center gap-1.5">
                            <HiCalendarDays size={13} className="text-gray-500" />
                            Monthly Plan
                          </span>
                          <span className="flex items-center gap-1.5">
                            <HiArrowPath size={13} className="text-gray-500" />
                            Cancel anytime
                          </span>
                        </div>
                        <div className="mb-6">
                          {pkg.popular ? (
                            <GlowButton href="#contact" variant="primary" className="w-full justify-center">
                              Get Started <HiArrowLongRight size={14} className="inline ml-1" />
                            </GlowButton>
                          ) : (
                            <a
                              href="#contact"
                              className="w-full flex items-center justify-center py-3.5 rounded-full text-sm font-semibold border border-gray-300 dark:border-white/15 text-gray-600 dark:text-gray-300 hover:border-sky-400 dark:hover:border-white/30 hover:bg-sky-50 dark:hover:bg-white/5 transition-all duration-300"
                            >
                              Get Started <HiArrowLongRight size={14} className="inline ml-1" />
                            </a>
                          )}
                        </div>
                        <div className="w-full h-px bg-gray-200 dark:bg-white/8 mb-5" />
                        <p className="text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-600 font-semibold mb-3">
                          Includes
                        </p>
                        <ul className="space-y-2.5 mb-4">
                          {pkg.includes.map((feat) => (
                            <li key={feat} className="flex items-start gap-2.5 text-sm text-gray-700 dark:text-gray-300">
                              <HiCheck size={14} className={cn("shrink-0 mt-0.5", pkg.popular ? "text-sky-400" : "text-emerald-400")} />
                              {feat}
                            </li>
                          ))}
                          {pkg.excludes.map((feat) => (
                            <li key={feat} className="flex items-start gap-2.5 text-sm text-gray-600">
                              <HiXMark size={14} className="shrink-0 mt-0.5 text-red-700/60" />
                              {feat}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          )}

          {/* ── BUILD A PLAN TAB ── */}
          {activeTab === "pricing" && (
            <motion.div
              key="pricing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              <p className="text-center text-gray-600 dark:text-gray-400 text-sm mb-8 max-w-2xl mx-auto">
                All prices are{" "}
                <span className="text-gray-900 dark:text-white font-semibold">INR/Month, Excl. GST</span>.{" "}
                Mix &amp; match modules to build a plan that fits your brand.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {smmModules.map((mod, mi) => {
                  const ModIcon = mod.icon;
                  return (
                    <motion.div
                      key={mod.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.45,
                        ease: [0.22, 1, 0.36, 1],
                        delay: mi * 0.04,
                      }}
                      className="rounded-2xl border border-gray-200 dark:border-white/8 bg-white dark:bg-white/[0.03] overflow-hidden flex flex-col shadow-sm dark:shadow-none"
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 40px ${mod.glow}`;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLDivElement).style.boxShadow = "";
                      }}
                    >
                      <div className={`h-[3px] w-full bg-gradient-to-r ${mod.color}`} />
                      <div className="px-5 pt-5 pb-4">
                        <div className="flex items-center gap-2.5 mb-3">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br ${mod.color} shrink-0`}
                          >
                            <ModIcon size={15} className="text-white" />
                          </div>
                          <span className="text-gray-900 dark:text-white font-bold text-[15px]">
                            {mod.name}
                          </span>
                        </div>
                        <ul className="space-y-3">
                          {mod.options.map((opt) => (
                            <li
                              key={opt.tier}
                              className="rounded-xl border border-gray-200 dark:border-white/6 bg-gray-50 dark:bg-white/[0.025] px-4 py-3"
                            >
                              <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                                  {opt.tier}
                                </span>
                                <span
                                  className={`text-sm font-extrabold bg-gradient-to-r ${mod.color} bg-clip-text text-transparent whitespace-nowrap`}
                                >
                                  {opt.price}
                                </span>
                              </div>
                              <p className="text-[11px] text-gray-500 leading-relaxed">{opt.desc}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <GlowButton href="#contact" variant="primary" size="lg">
            <HiMegaphone size={16} className="inline mr-2 -mt-0.5" />
            Build a custom SMM plan
          </GlowButton>
        </motion.div>
      </div>
    </section>
  );
};

export default SMMSection;
