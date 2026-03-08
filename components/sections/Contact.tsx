"use client";

import { useState, useRef, ChangeEvent, FormEvent } from "react";
import { motion, useInView } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Twitter,
  Youtube,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

type FormState = "idle" | "loading" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  subject: string;
  budget: string;
  message: string;
}

const initialForm: FormData = {
  name: "",
  email: "",
  subject: "",
  budget: "",
  message: "",
};

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "orbitexind@gmail.com",
    href: "mailto:orbitexind@gmail.com",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    icon: Phone,
    label: "Phone / WhatsApp",
    value: "+91 95031 44168",
    href: "tel:+919503144168",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Maharashtra, India — Remote Worldwide",
    href: "#",
    gradient: "from-emerald-500 to-green-600",
  },
];

const socials = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter / X" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

const budgets = [
  "< $1,000",
  "$1,000 – $2,500",
  "$2,500 – $5,000",
  "$5,000 – $10,000",
  "$10,000+",
];

const Contact = () => {
  const [form, setForm] = useState<FormData>(initialForm);
  const [formState, setFormState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Enter a valid email";
    if (!form.message.trim()) newErrors.message = "Message is required";
    else if (form.message.trim().length < 20)
      newErrors.message = "Message must be at least 20 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setFormState("loading");

    try {
      const res = await fetch("https://formspree.io/f/maqpnaze", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setFormState("success");
      setForm(initialForm);
    } catch {
      setFormState("error");
    }
  };

  const inputClass = (field: keyof FormData) =>
    cn(
      "w-full px-4 py-3.5 rounded-xl bg-gray-50 dark:bg-white/[0.04] border text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 text-sm transition-all duration-200 focus:bg-violet-50/50 dark:focus:bg-violet-500/5 focus:ring-2 focus:ring-violet-500/30 outline-none",
      errors[field]
        ? "border-red-500/60 focus:border-red-500/60"
        : "border-gray-300 dark:border-white/10 focus:border-violet-500/50"
    );

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 overflow-hidden bg-slate-50 dark:bg-[#030712]"
      aria-label="Contact section"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full bg-violet-600/8 blur-[120px] -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-cyan-500/6 blur-[100px]" />
      </div>

      <div
        ref={ref}
        className="container mx-auto px-6 max-w-7xl relative z-10"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-tag">Contact</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-5">
            Let&apos;s build something{" "}
            <span className="text-gradient">amazing</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto text-lg">
            Have a project in mind? We&apos;d love to hear about it. Send us a
            message and we&apos;ll get back to you within 24 hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* ─── Left panel ─── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Intro */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Get in touch
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Whether you need a full-stack web app, a slick UI redesign, or
                an AI feature added to your product — we&apos;re here to help you
                ship something great.
              </p>
            </div>

            {/* Contact info cards */}
            <div className="space-y-3">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-white/[0.04] border border-gray-200 dark:border-white/5 hover:border-violet-300 dark:hover:border-white/12 hover:bg-violet-50 dark:hover:bg-white/[0.06] transition-all duration-200 group shadow-sm dark:shadow-none"
                  >
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shrink-0`}
                    >
                      <Icon size={16} className="text-white" />
                    </div>
                    <div>
                      <div className="text-gray-500 dark:text-gray-500 text-[11px] uppercase tracking-widest font-semibold">
                        {item.label}
                      </div>
                      <div className="text-gray-700 dark:text-gray-200 text-sm font-medium group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                        {item.value}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Social links */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-600 mb-4">
                Follow us
              </p>
              <div className="flex items-center gap-3">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-violet-600/20 hover:border-violet-500/40 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-white transition-all duration-300"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability note */}
            <div className="p-4 rounded-2xl border border-emerald-500/25 bg-emerald-500/8 flex items-start gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 mt-1 animate-pulse-slow shrink-0" />
              <div>
                <div className="text-emerald-300 text-sm font-semibold mb-0.5">
                  Currently Available
                </div>
                <div className="text-gray-500 text-xs leading-relaxed">
                  Taking on new projects for Q2 2026. Typical response time is
                  under 4 hours.
                </div>
              </div>
            </div>
          </motion.div>

          {/* ─── Right panel: form ─── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="p-5 sm:p-7 md:p-9 rounded-3xl bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/8 shadow-md dark:shadow-none">
              {formState === "success" ? (
                // ── Success state ──
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-10 gap-5"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                    <CheckCircle size={28} className="text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      Message Sent! 🎉
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm max-w-xs">
                      Thanks for reaching out! We&apos;ll review your project
                      details and get back to you within 24 hours.
                    </p>
                  </div>
                  <button
                    onClick={() => setFormState("idle")}
                    className="text-sm text-violet-400 hover:text-violet-300 font-medium underline underline-offset-2"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                // ── Form ──
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2"
                      >
                        Your Name *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Smith"
                        className={inputClass("name")}
                        autoComplete="name"
                      />
                      {errors.name && (
                        <p className="text-red-400 text-xs mt-1.5">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        className={inputClass("email")}
                        autoComplete="email"
                      />
                      {errors.email && (
                        <p className="text-red-400 text-xs mt-1.5">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2"
                    >
                      Subject
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="Project Inquiry — SaaS Dashboard"
                      className={inputClass("subject")}
                    />
                  </div>

                  {/* Budget */}
                  <div>
                    <label
                      htmlFor="budget"
                      className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2"
                    >
                      Project Budget
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={form.budget}
                      onChange={handleChange}
                      className={cn(inputClass("budget"), "cursor-pointer")}
                    >
                      <option value="" disabled className="bg-white dark:bg-[#0a0a14]">
                        Select budget range…
                      </option>
                      {budgets.map((b) => (
                        <option key={b} value={b} className="bg-white dark:bg-[#0a0a14]">
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Tell me about your project — what you want to build, your timeline, and any technical requirements…"
                      className={cn(inputClass("message"), "resize-none")}
                    />
                    {errors.message && (
                      <p className="text-red-400 text-xs mt-1.5">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={formState === "loading"}
                    whileHover={{ scale: formState === "loading" ? 1 : 1.02 }}
                    whileTap={{ scale: formState === "loading" ? 1 : 0.98 }}
                    className={cn(
                      "w-full flex items-center justify-center gap-2.5 py-4 rounded-xl font-semibold text-white text-base transition-all duration-300",
                      formState === "loading"
                        ? "bg-violet-800 cursor-not-allowed"
                        : "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 hover:shadow-[0_0_30px_rgba(124,58,237,0.5)]"
                    )}
                  >
                    {formState === "loading" ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </motion.button>

                  <p className="text-center text-gray-600 text-xs">
                    By submitting, you agree to receive a reply from OrbitexInd.
                    No spam, ever.
                  </p>

                  {formState === "error" && (
                    <p className="text-center text-red-400 text-xs">
                      Something went wrong. Please try again or{" "}
                      <a href="https://wa.me/919503144168" className="underline hover:text-red-300">
                        message on WhatsApp
                      </a>
                      .
                    </p>
                  )}
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
