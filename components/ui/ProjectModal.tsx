"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, CheckCircle } from "lucide-react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  gradient: string;
  iconBg: string;
  tags: string[];
  category: string;
  liveUrl: string;
  githubUrl: string;
  features: string[];
  year: string;
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onLiveClick: (url: string, title: string) => void;
}

const tagColors: Record<string, string> = {
  "Next.js": "bg-black/40 text-white border-white/20",
  React: "bg-cyan-950/50 text-cyan-300 border-cyan-500/30",
  TypeScript: "bg-blue-950/50 text-blue-300 border-blue-500/30",
  "Node.js": "bg-green-950/50 text-green-300 border-green-500/30",
  "Tailwind CSS": "bg-sky-950/50 text-sky-300 border-sky-500/30",
  PostgreSQL: "bg-indigo-950/50 text-indigo-300 border-indigo-500/30",
  MongoDB: "bg-green-950/50 text-green-300 border-green-500/30",
  Python: "bg-yellow-950/50 text-yellow-300 border-yellow-500/30",
  OpenAI: "bg-emerald-950/50 text-emerald-300 border-emerald-500/30",
  Stripe: "bg-violet-950/50 text-violet-300 border-violet-500/30",
  Redis: "bg-red-950/50 text-red-300 border-red-500/30",
  Docker: "bg-blue-950/50 text-blue-300 border-blue-500/30",
};

const getTagClass = (tag: string) =>
  tagColors[tag] || "bg-white/10 text-gray-300 border-white/10";

const ProjectModal = ({ project, onClose, onLiveClick }: ProjectModalProps) => {
  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Lock scroll when open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal panel */}
          <motion.div
            key="modal"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 pointer-events-none"
          >
            <motion.div
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0a0a14] border border-white/10 shadow-2xl pointer-events-auto"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header gradient banner */}
              <div
                className={`relative h-52 w-full bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden rounded-t-2xl`}
              >
                {/* Decorative circles */}
                <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/10" />
                <div className="absolute -bottom-12 -left-8 w-48 h-48 rounded-full bg-black/20" />
                <div
                  className={`w-20 h-20 rounded-2xl ${project.iconBg} flex items-center justify-center text-5xl relative z-10 shadow-2xl`}
                >
                  {project.id === 1
                    ? "🎨"
                    : project.id === 2
                    ? "♻️"
                    : project.id === 3
                    ? "🎤"
                    : "☁️"}
                </div>
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white/80 hover:text-white transition-colors"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
                {/* Year badge */}
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/40 text-white/70 text-xs font-medium">
                  {project.year}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                {/* Title & category */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-2 block">
                      {project.category}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-white">
                      {project.title}
                    </h3>
                  </div>
                  {/* Action links */}
                  <div className="flex items-center gap-3 shrink-0">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all"
                      aria-label="View on GitHub"
                    >
                      <Github size={16} />
                    </a>
                    <button
                      onClick={() => onLiveClick(project.liveUrl, project.title)}
                      disabled={!project.liveUrl || project.liveUrl === "#"}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium transition-colors"
                    >
                      <ExternalLink size={14} />
                      Live Demo
                    </button>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed mb-6">
                  {project.longDescription}
                </p>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-3">
                    Key Features
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {project.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-2 text-sm text-gray-300"
                      >
                        <CheckCircle
                          size={14}
                          className="text-violet-400 shrink-0"
                        />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech stack */}
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-3">
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={cn(
                          "px-3 py-1 rounded-full text-xs font-medium border",
                          getTagClass(tag)
                        )}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
