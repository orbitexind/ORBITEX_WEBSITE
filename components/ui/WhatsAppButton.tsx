"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

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
                Chat with Orbitex
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
              <X size={10} className="text-gray-400" />
            </button>
            {/* Arrow */}
            <span className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-white dark:bg-[#111827] border-r border-b border-gray-200 dark:border-white/10 rotate-[-45deg]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp button */}
      <motion.a
        href="https://wa.me/919503144168"
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
        {/* WhatsApp SVG icon */}
        <svg
          viewBox="0 0 32 32"
          width="28"
          height="28"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M16.002 2.667C8.638 2.667 2.667 8.637 2.667 16c0 2.352.629 4.553 1.726 6.453L2.667 29.333l7.12-1.693A13.28 13.28 0 0 0 16.002 29.333c7.364 0 13.331-5.97 13.331-13.333 0-7.363-5.967-13.333-13.331-13.333Zm7.527 18.714c-.312.878-1.551 1.607-2.546 1.818-.679.142-1.565.255-4.547-.977-3.814-1.565-6.271-5.452-6.458-5.703-.181-.25-1.521-2.025-1.521-3.862 0-1.838.963-2.741 1.303-3.116.34-.375.741-.469.988-.469.247 0 .494.002.71.012.229.01.535-.087.836.638.312.745 1.06 2.582 1.153 2.77.093.188.155.406.031.647-.124.24-.186.39-.374.6-.187.21-.394.469-.562.63-.187.18-.382.375-.164.736.218.361.968 1.597 2.079 2.587 1.429 1.275 2.635 1.67 3.003 1.855.369.187.586.156.803-.094.218-.25.934-1.09 1.184-1.465.25-.375.5-.312.843-.188.344.125 2.184 1.031 2.558 1.218.375.187.625.281.718.437.093.156.093.906-.219 1.784Z" />
        </svg>
      </motion.a>
    </div>
  );
};

export default WhatsAppButton;
