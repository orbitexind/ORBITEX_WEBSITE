"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Check,
  X,
  Smartphone,
  Globe,
  Brain,
  Wrench,
  Clock,
  RefreshCw,
  Zap,
  Star,
  Crown,
  CreditCard,
  Handshake,
} from "lucide-react";
import GlowButton from "@/components/ui/GlowButton";
import { cn } from "@/lib/utils";

type Tab = "packages" | "services";
type Currency = "INR" | "USD";

const mobilePackages: {
  id: string; name: string; icon: LucideIcon; tagline: string;
  delivery: string; revisions: string; priceUSD: string; priceINR: string;
  color: string; glow: string; popular: boolean;
  includes: string[]; excludes: string[];
}[] = [
  {
    id: "basic",
    name: "Starter App",
    icon: Zap,
    tagline: "Ideal for MVPs & small businesses",
    delivery: "3 Days",
    revisions: "2 Revisions",
    priceUSD: "$100 – $150",
    priceINR: "₹8,000 – ₹12,000",
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
    icon: Star,
    tagline: "Professional Android for businesses",
    delivery: "5–7 Days",
    revisions: "3 Revisions",
    priceUSD: "$125 – $250",
    priceINR: "₹10,000 – ₹20,000",
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
    icon: Crown,
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
      { name: "Website Development", priceINR: "₹6,000 – ₹10,000", priceUSD: "$75 – $125", maintenanceINR: "₹500 – ₹1,500/mo", maintenanceUSD: "$7 – $20/mo" },
      { name: "E-Commerce Website Setup", priceINR: "₹12,000 – ₹60,000", priceUSD: "$150 – $750", maintenanceINR: "₹1,500 – ₹3,000/mo", maintenanceUSD: "$20 – $40/mo" },
      { name: "Full-Stack Web Application", priceINR: "₹12,000 – ₹30,000", priceUSD: "$150 – $375", maintenanceINR: "₹2,000 – ₹5,000/mo", maintenanceUSD: "$25 – $65/mo" },
      { name: "Java Desktop Applications", priceINR: "₹6,000 – ₹30,000", priceUSD: "$75 – $375", maintenanceINR: "₹1,000 – ₹2,500/mo", maintenanceUSD: "$12 – $30/mo" },
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
      { name: "Chatbot Development", priceINR: "₹8,000 – ₹50,000", priceUSD: "$100 – $625", maintenanceINR: "₹1,500 – ₹4,000/mo", maintenanceUSD: "$20 – $50/mo" },
      { name: "Data Analysis & Dashboard", priceINR: "₹3,000 – ₹20,000", priceUSD: "$40 – $250", maintenanceINR: "₹500 – ₹1,500/mo", maintenanceUSD: "$7 – $20/mo" },
      { name: "AI / Machine Learning Solutions", priceINR: "₹10,000 – ₹30,000", priceUSD: "$125 – $375", maintenanceINR: "₹2,000 – ₹5,000/mo", maintenanceUSD: "$25 – $65/mo" },
      { name: "College Project & Documentation", priceINR: "₹3,000 – ₹20,000", priceUSD: "$40 – $250", maintenanceINR: null, maintenanceUSD: null },
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
      { name: "Android Basic App", priceINR: "₹5,000 – ₹15,000", priceUSD: "$65 – $190", maintenanceINR: "₹500 – ₹1,500/mo", maintenanceUSD: "$7 – $20/mo" },
      { name: "Custom Android Application", priceINR: "₹15,000 – ₹50,000", priceUSD: "$190 – $625", maintenanceINR: "₹1,500 – ₹4,000/mo", maintenanceUSD: "$20 – $50/mo" },
      { name: "UI/UX Design for Android", priceINR: "₹3,000 – ₹12,000", priceUSD: "$40 – $150", maintenanceINR: null, maintenanceUSD: null },
      { name: "App Bug Fixing & Optimization", priceINR: "₹500 – ₹5,000 / task", priceUSD: "$7 – $65 / task", maintenanceINR: null, maintenanceUSD: null },
      { name: "API Integration & Backend", priceINR: "₹3,000 – ₹15,000", priceUSD: "$40 – $190", maintenanceINR: "₹800 – ₹2,000/mo", maintenanceUSD: "$10 – $25/mo" },
      { name: "App Publishing on Google Play", priceINR: "₹1,000 – ₹5,000", priceUSD: "$15 – $65", maintenanceINR: null, maintenanceUSD: null },
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
                    ? "bg-sky-600 text-white shadow-lg shadow-sky-500/20"
                    : "text-gray-500 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-300"
                )}
              >
                {c === "INR" ? "₹ INR" : "$ USD"}
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
          {([
              { id: "packages", Icon: Smartphone, label: "App Packages" },
              { id: "services", Icon: Wrench, label: "Service Rates" },
            ] as { id: Tab; Icon: LucideIcon; label: string }[]
          ).map((tab) => (
              <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap min-h-[44px]",
                activeTab === tab.id
                  ? "text-white"
                  : "text-gray-500 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-300"
              )}
            >
              {activeTab === tab.id && (
                <motion.span
                  layoutId="pricing-tab-pill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-sky-600 to-blue-600"
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
          {/* â”€â”€ PACKAGES TAB â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
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
                {mobilePackages.map((pkg) => {
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
                      <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-sky-600 text-white text-[10px] font-bold tracking-wider uppercase">
                        Most Popular
                      </div>
                    )}

                    <div className="p-7 md:p-8">
                      {/* Icon + name */}
                      <div className="mb-4">
                        <div className={`mb-3 w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br ${pkg.color}`}>
                          <PkgIcon size={20} className="text-white" />
                        </div>
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
                          {currency === "INR" ? `USD ${pkg.priceUSD}` : `INR ${pkg.priceINR}`}
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
                            className="w-full flex items-center justify-center py-3.5 rounded-full text-sm font-semibold border border-gray-300 dark:border-white/15 text-gray-600 dark:text-gray-300 hover:border-sky-400 dark:hover:border-white/30 hover:bg-sky-50 dark:hover:bg-white/5 transition-all duration-300"
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
                                  ? "text-sky-400"
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
                  );
                })}
              </motion.div>
            </motion.div>
          )}

          {/* â”€â”€ SERVICES TAB â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
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
                              {currency === "INR" ? (svc as any).priceINR : (svc as any).priceUSD}
                            </span>
                            {(currency === "INR" ? (svc as any).maintenanceINR : (svc as any).maintenanceUSD) && (
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/8 text-gray-500 font-medium">
                                Maintenance: {currency === "INR" ? (svc as any).maintenanceINR : (svc as any).maintenanceUSD}
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
        </AnimatePresence>

        {/* Guarantee strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 grid grid-cols-1 xs:grid-cols-3 md:grid-cols-3 gap-3 sm:gap-4"
        >
          {[
            { Icon: Handshake, text: "Free discovery call" },
            { Icon: CreditCard, text: "50% upfront, 50% on delivery" },
            { Icon: RefreshCw, text: "Unlimited scope clarification" },
          ].map(({ Icon: GuaranteeIcon, text }) => (
            <div
              key={text}
              className="flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/5 shadow-sm dark:shadow-none"
            >
              <GuaranteeIcon size={20} className="text-sky-500 shrink-0" />
              <span className="text-gray-600 dark:text-gray-400 text-xs font-medium">
                {text}
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
              className="text-sky-400 hover:text-sky-300 font-medium underline underline-offset-2 decoration-sky-500/40"
          >
            Let&apos;s build a custom quote for your project →
          </a>
        </motion.p>
      </div>
    </section>
  );
};

export default Pricing;

