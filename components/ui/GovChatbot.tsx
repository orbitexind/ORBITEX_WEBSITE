"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiXMark, HiDocumentText, HiMiniMinusSmall, HiArrowsPointingOut } from "react-icons/hi2";

const CHATBOT_URL = "https://chatbot-1-orpin-one.vercel.app/";

const GovChatbot = () => {
  const [open, setOpen] = useState(false);
  const [tooltip, setTooltip] = useState(true);
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      {/* Floating trigger button — positioned above WhatsApp button */}
      <div
        className="fixed z-50 flex flex-col items-end gap-2"
        style={{
          bottom:
            "max(6.5rem, calc(6.5rem + env(safe-area-inset-bottom)))",
          right:
            "max(1.5rem, calc(1.5rem + env(safe-area-inset-right)))",
        }}
      >
        {/* Tooltip */}
        <AnimatePresence>
          {tooltip && !open && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="relative flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white dark:bg-[#111827] border border-gray-200 dark:border-white/10 shadow-xl"
            >
              <div>
                <p className="text-gray-900 dark:text-white text-xs font-semibold leading-tight">
                  Gov Document Assist
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-[10px]">
                  AI-powered document helper
                </p>
              </div>
              <button
                onClick={() => setTooltip(false)}
                aria-label="Close tooltip"
                className="w-5 h-5 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 flex items-center justify-center transition-colors ml-1"
              >
                <HiXMark size={10} className="text-gray-400" />
              </button>
              {/* Arrow */}
              <span className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-white dark:bg-[#111827] border-r border-b border-gray-200 dark:border-white/10 rotate-[-45deg]" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trigger button */}
        <motion.button
          aria-label="Open Government Document Chatbot"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 2,
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setOpen(true);
            setTooltip(false);
          }}
          className="relative w-14 h-14 rounded-full shadow-2xl flex items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
            boxShadow: "0 4px 24px rgba(59,130,246,0.5)",
          }}
        >
          {/* Ping ring */}
          <span className="absolute inset-0 rounded-full bg-blue-400 opacity-30 animate-ping" />
          <HiDocumentText size={24} className="text-white relative z-10" />
        </motion.button>
      </div>

      {/* Chatbot modal */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop (mobile only) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm sm:hidden"
              onClick={() => setOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className={`fixed z-[70] flex flex-col rounded-2xl overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.45)] border border-white/10 bg-[#0f172a] transition-all duration-300 ${expanded
                ? "inset-4 sm:inset-8"
                : "bottom-6 right-6 w-[calc(100vw-3rem)] sm:w-[420px] h-[600px] sm:h-[620px]"
                }`}
              style={
                !expanded
                  ? {
                    bottom:
                      "max(1.5rem, calc(1.5rem + env(safe-area-inset-bottom)))",
                    right:
                      "max(1.5rem, calc(1.5rem + env(safe-area-inset-right)))",
                  }
                  : undefined
              }
            >
              {/* Header */}
              <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-800 shrink-0">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <HiDocumentText size={16} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-semibold leading-tight truncate">
                    Government Document Assist
                  </p>
                  <p className="text-blue-200 text-[10px] leading-tight">
                    AI-powered · Instant answers
                  </p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => setExpanded((v) => !v)}
                    aria-label={expanded ? "Minimize" : "Expand"}
                    className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  >
                    {expanded ? (
                      <HiMiniMinusSmall size={13} className="text-white" />
                    ) : (
                      <HiArrowsPointingOut size={13} className="text-white" />
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setOpen(false);
                      setExpanded(false);
                    }}
                    aria-label="Close chatbot"
                    className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  >
                    <HiXMark size={14} className="text-white" />
                  </button>
                </div>
              </div>

              {/* Iframe */}
              <iframe
                src={CHATBOT_URL}
                title="Government Document Assist Chatbot"
                className="flex-1 w-full border-0"
                allow="microphone; clipboard-write"
                loading="lazy"
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default GovChatbot;
