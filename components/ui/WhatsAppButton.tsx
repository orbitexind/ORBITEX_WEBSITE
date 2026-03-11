"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiXMark } from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  const [tooltip, setTooltip] = useState(true);

  return (
    <div className="fixed z-50 flex flex-col items-end gap-2 fab-safe" style={{ bottom: "max(1.5rem, calc(1.5rem + env(safe-area-inset-bottom)))", right: "max(1.5rem, calc(1.5rem + env(safe-area-inset-right)))" }}>
      {/* Tooltip */}
      <AnimatePresence>
        {tooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="relative flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white dark:bg-[#111827] border border-gray-200 dark:border-white/10 shadow-xl"
          >
            <div>
              <p className="text-gray-900 dark:text-white text-xs font-semibold leading-tight">
                Chat with OrbitexInd
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-[10px]">
                Typically replies in minutes
              </p>
            </div>
            <button
              onClick={() => setTooltip(false)}
              aria-label="Close"
              className="w-5 h-5 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 flex items-center justify-center transition-colors ml-1"
            >
              <HiXMark size={10} className="text-gray-400" />
            </button>
            {/* Arrow */}
            <span className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-white dark:bg-[#111827] border-r border-b border-gray-200 dark:border-white/10 rotate-[-45deg]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp button */}
      <motion.a
        href="https://wa.me/919422880355"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 rounded-full shadow-2xl flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
          boxShadow: "0 4px 24px rgba(37,211,102,0.45)",
        }}
      >
        {/* Ping ring */}
        <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-30 animate-ping" />
        <FaWhatsapp size={28} className="text-white relative z-10" />
      </motion.a>
    </div>
  );
};

export default WhatsAppButton;
