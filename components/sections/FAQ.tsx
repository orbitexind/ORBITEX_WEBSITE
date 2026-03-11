"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronDown, HiChatBubbleLeftRight } from "react-icons/hi2";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "How do I get started with a project?",
    a: "Simply send us a WhatsApp message or fill out the contact form with your project details — what you need, your budget, and deadline. We'll reply within a few hours with a quote and timeline.",
  },
  {
    q: "What are your pricing rates in India?",
    a: "Our rates are designed to be affordable for Indian clients. Website development starts from ₹6,000, Android apps from ₹5,000, and AI chatbots from ₹8,000. Check the Pricing section for full details or contact us for a custom quote.",
  },
  {
    q: "Do you work on college projects?",
    a: "Yes! We specialize in college project development with complete documentation, reports, and presentation support. Projects typically start from ₹3,000 depending on complexity.",
  },
  {
    q: "How long does it take to build an Android app?",
    a: "A basic Android app takes 3–5 days, a business app with login/database takes 5–10 days, and a full-featured app with iOS support takes 10–14 days. We share regular updates throughout development.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept UPI (GPay, PhonePe, Paytm), bank transfer (NEFT/IMPS), and Razorpay for online payments. International clients can pay via PayPal or Wise. Payment is split 50% upfront and 50% on delivery.",
  },
  {
    q: "Do you provide source code after project completion?",
    a: "Yes, for Standard and Premium packages, full source code is included. Basic packages include the compiled APK. Source code is handed over after final payment.",
  },
  {
    q: "Can you maintain my project after delivery?",
    a: "Absolutely. We offer optional monthly maintenance plans for all service types. Website maintenance starts from ₹500/month, Android app maintenance from ₹500/month. Covers bug fixes, minor updates, and server monitoring.",
  },
  {
    q: "Do you offer revisions?",
    a: "Yes. Basic packages include 2 revisions, Standard includes 3 revisions, and Premium packages include 15–20 revisions until you're 100% satisfied.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section
      id="faq"
      className="relative py-24 md:py-32 overflow-hidden bg-white dark:bg-[#030712]"
      aria-label="FAQ section"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        <div className="absolute top-1/3 left-0 w-96 h-96 rounded-full bg-violet-600/6 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-cyan-500/5 blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 max-w-3xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="section-tag">FAQ</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-5">
            Frequently Asked{" "}
            <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Everything you need to know before we start working together.
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className={cn(
                "rounded-2xl border transition-all duration-300 overflow-hidden",
                openIndex === i
                  ? "border-violet-500/40 bg-violet-50 dark:bg-violet-500/5"
                  : "border-gray-200 dark:border-white/8 bg-white dark:bg-white/[0.03] hover:border-violet-300 dark:hover:border-white/15"
              )}
            >
              <button
                className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-5 sm:py-5 text-left min-h-[56px]"
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
              >
                <span
                  className={cn(
                    "font-semibold text-sm md:text-base transition-colors",
                    openIndex === i ? "text-violet-700 dark:text-violet-300" : "text-gray-800 dark:text-gray-200"
                  )}
                >
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="shrink-0"
                >
                  <HiChevronDown
                    size={18}
                    className={cn(
                      "transition-colors",
                      openIndex === i ? "text-violet-400" : "text-gray-500"
                    )}
                  />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="px-6 pb-5 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center p-6 rounded-2xl border border-gray-200 dark:border-white/8 bg-gray-50 dark:bg-white/[0.02]"
        >
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
            Still have questions? We reply within a few hours.
          </p>
          <a
            href="https://wa.me/919422880355"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-all"
          >
            <HiChatBubbleLeftRight size={16} />
            Chat on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
