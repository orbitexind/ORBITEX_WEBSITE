"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiXMark, HiArrowTopRightOnSquare, HiEnvelope, HiUser, HiLockClosed, HiShieldCheck } from "react-icons/hi2";

interface LiveAccessModalProps {
  projectTitle: string;
  liveUrl: string;
  isOpen: boolean;
  onClose: () => void;
}

interface AccessRecord {
  name: string;
  email: string;
  project: string;
  timestamp: string;
}

const LiveAccessModal = ({
  projectTitle,
  liveUrl,
  isOpen,
  onClose,
}: LiveAccessModalProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Reset form whenever modal opens
  useEffect(() => {
    if (!isOpen) {
      setName("");
      setEmail("");
      setSubmitted(false);
      setError("");
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim()) {
      setError("Please fill in both fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    // Persist access record to localStorage
    const record: AccessRecord = {
      name: name.trim(),
      email: email.trim(),
      project: projectTitle,
      timestamp: new Date().toISOString(),
    };

    try {
      const stored = localStorage.getItem("portfolio_access_requests");
      const existing: AccessRecord[] = stored ? JSON.parse(stored) : [];
      existing.push(record);
      localStorage.setItem(
        "portfolio_access_requests",
        JSON.stringify(existing)
      );
    } catch {
      // localStorage unavailable — continue silently
    }

    setSubmitted(true);

    // Open the live URL then close modal
    setTimeout(() => {
      window.open(liveUrl, "_blank", "noopener,noreferrer");
      onClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="auth-backdrop"
            className="fixed inset-0 z-[70] bg-black/85 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="auth-modal"
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none"
          >
            <motion.div
              className="relative w-full max-w-md rounded-2xl bg-white dark:bg-[#0a0a14] border border-gray-200 dark:border-white/10 shadow-2xl pointer-events-auto overflow-hidden"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top gradient line */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-violet-500/60 to-transparent" />

              {/* Header */}
              <div className="relative px-6 pt-6 pb-4 border-b border-gray-200 dark:border-white/8">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center shrink-0">
                    <HiLockClosed size={18} className="text-violet-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      Access Live Project
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                      Leave your details to view{" "}
                      <span className="text-violet-300 font-medium">
                        {projectTitle}
                      </span>
                    </p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <HiXMark size={16} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
                      <HiShieldCheck size={28} className="text-emerald-400" />
                    </div>
                    <p className="text-gray-900 dark:text-white font-semibold text-lg">
                      Access granted!
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                      Opening the live demo in a new tab…
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5">
                        Your Name
                      </label>
                      <div className="relative">
                        <HiUser
                          size={14}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                        />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                            setError("");
                          }}
                          placeholder="John Doe"
                          className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 pl-9 text-gray-900 dark:text-white text-sm placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-violet-500 dark:focus:border-violet-500/60 focus:bg-white dark:focus:bg-white/[0.07] transition-all"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5">
                        Email Address
                      </label>
                      <div className="relative">
                        <HiEnvelope
                          size={14}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                        />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setError("");
                          }}
                          placeholder="john@example.com"
                          className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 pl-9 text-gray-900 dark:text-white text-sm placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-violet-500 dark:focus:border-violet-500/60 focus:bg-white dark:focus:bg-white/[0.07] transition-all"
                        />
                      </div>
                    </div>

                    {/* Inline error */}
                    {error && (
                      <p className="text-red-400 text-xs">{error}</p>
                    )}

                    {/* Disclaimer */}
                    <p className="text-gray-400 dark:text-gray-600 text-xs">
                      Your details help track demo access. No spam, ever.
                    </p>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white text-sm font-semibold transition-all"
                    >
                      <HiArrowTopRightOnSquare size={15} />
                      Access Live Demo
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LiveAccessModal;
