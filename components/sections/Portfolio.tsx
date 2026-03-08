"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Eye } from "lucide-react";
import ProjectModal, { type Project } from "@/components/ui/ProjectModal";
import LiveAccessModal from "@/components/ui/LiveAccessModal";
import { cn } from "@/lib/utils";

const projects: Project[] = [
  {
    id: 1,
    title: "Portfolio Website",
    description:
      "A modern, animated developer portfolio showcasing projects, skills, and services.",
    longDescription:
      "A fully responsive personal portfolio built with Next.js 14 and TypeScript. Features smooth scroll animations powered by Framer Motion, a dynamic project showcase with filtering, an interactive contact form, and a perfect Lighthouse score. Deployed continuously on Vercel.",
    gradient: "from-violet-600 via-purple-600 to-indigo-700",
    iconBg: "bg-violet-500/20",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    category: "Web Apps",
    liveUrl: "https://satvikrokadeportfolio.vercel.app",
    githubUrl: "#",
    year: "2024",
    features: [
      "Smooth Framer Motion animations",
      "Fully responsive design",
      "Dynamic project showcase",
      "Interactive contact form",
      "SEO & performance optimized",
      "Vercel continuous deployment",
    ],
  },
  {
    id: 2,
    title: "Waste Management Platform",
    description:
      "Smart waste collection and tracking system with route optimization and analytics.",
    longDescription:
      "A comprehensive waste management solution that enables municipalities and organizations to streamline waste collection schedules, optimize vehicle routing, and monitor waste generation trends through real-time dashboards. Features detailed reporting and multi-role user management.",
    gradient: "from-emerald-500 via-green-500 to-teal-500",
    iconBg: "bg-emerald-500/20",
    tags: ["React", "TypeScript", "Node.js", "MongoDB"],
    category: "Web Apps",
    liveUrl: "https://wastemanagement-2aa.pages.dev/",
    githubUrl: "#",
    year: "2025",
    features: [
      "Real-time collection tracking",
      "Route optimization engine",
      "Analytics dashboard",
      "Multi-role user management",
      "Reporting & data export",
      "Mobile-friendly UI",
    ],
  },
  {
    id: 3,
    title: "AI Interview Conductor",
    description:
      "AI-powered interview simulation that conducts and evaluates technical interviews.",
    longDescription:
      "An intelligent interview platform powered by Python and AI that conducts fully automated technical and behavioral interviews. The system asks context-aware follow-up questions, evaluates responses in real-time, and generates detailed candidate assessment reports with scoring breakdowns.",
    gradient: "from-cyan-500 via-blue-500 to-indigo-600",
    iconBg: "bg-cyan-500/20",
    tags: ["Python", "OpenAI", "React", "Node.js"],
    category: "AI Projects",
    liveUrl: "https://interview-conductor-python.pages.dev",
    githubUrl: "#",
    year: "2025",
    features: [
      "AI-driven Q&A sessions",
      "Real-time response evaluation",
      "Behavioral & technical tracks",
      "Candidate scoring reports",
      "Customizable question sets",
      "Session recording & playback",
    ],
  },
  {
    id: 4,
    title: "Cloud Regex",
    description:
      "Cloud-based regex pattern builder, live tester, and shareable pattern library.",
    longDescription:
      "Cloud Regex is a developer productivity tool providing an intuitive interface for building, testing, and sharing regular expressions. Features a live regex tester with match highlighting, a curated library of common patterns, and cloud sync so your patterns follow you everywhere.",
    gradient: "from-amber-500 via-orange-500 to-yellow-500",
    iconBg: "bg-amber-500/20",
    tags: ["Python", "TypeScript", "React"],
    category: "Web Apps",
    liveUrl: "https://project-cloudregex.pages.dev/",
    githubUrl: "#",
    year: "2025",
    features: [
      "Live regex testing",
      "Match highlighting",
      "Common pattern library",
      "Cloud sync across devices",
      "Export & copy patterns",
      "Shareable pattern links",
    ],
  },
];

const categories = ["All", "Web Apps", "AI Projects"];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: { duration: 0.25 },
  },
};

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [authModal, setAuthModal] = useState<{
    open: boolean;
    url: string;
    title: string;
  }>({ open: false, url: "", title: "" });
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const handleLiveClick = (url: string, title: string) => {
    if (url && url !== "#") {
      setAuthModal({ open: true, url, title });
    }
  };

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section
      id="portfolio"
      className="relative py-24 md:py-32 overflow-hidden bg-[#030712]"
      aria-label="Portfolio section"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        <div className="absolute top-1/3 left-0 w-80 h-80 rounded-full bg-cyan-500/6 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-violet-600/6 blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="section-tag">Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-5">
            Recent <span className="text-gradient">Work</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            A selection of projects I&apos;ve built for clients and personal
            exploration across web development, design, and AI.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-2 justify-center mb-12 flex-wrap"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300",
                activeCategory === cat
                  ? "text-white"
                  : "text-gray-400 hover:text-gray-200"
              )}
            >
              {activeCategory === cat && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 to-purple-600"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                variants={cardVariants}
                layout
                className="group relative rounded-3xl overflow-hidden bg-white/[0.03] border border-white/8 hover:border-white/15 cursor-pointer"
                onClick={() => setSelectedProject(project)}
                whileHover={{ y: -4 }}
                style={{ transition: "border-color 0.3s, box-shadow 0.3s" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(124,58,237,0.2)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "";
                }}
              >
                {/* Project thumbnail */}
                <div
                  className={`relative h-44 bg-gradient-to-br ${project.gradient} overflow-hidden`}
                >
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-white/10" />
                  <div className="absolute bottom-2 -left-4 w-24 h-24 rounded-full bg-black/20" />
                  {/* Emoji icon */}
                  <div className="absolute inset-0 flex items-center justify-center text-5xl">
                    {project.id === 1
                      ? "🎨"
                      : project.id === 2
                      ? "♻️"
                      : project.id === 3
                      ? "🎤"
                      : "☁️"}
                  </div>
                  {/* Hover overlay */}
                  <motion.div
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center gap-3"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors">
                      <Eye size={16} className="text-white" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                      onClick={(e) => { e.stopPropagation(); }}>
                      <Github size={16} className="text-white" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                      onClick={(e) => { e.stopPropagation(); handleLiveClick(project.liveUrl, project.title); }}>
                      <ExternalLink size={16} className="text-white" />
                    </div>
                  </motion.div>

                  {/* Category badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white text-[10px] font-semibold">
                    {project.category}
                  </div>
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white/70 text-[10px]">
                    {project.year}
                  </div>
                </div>

                {/* Card body */}
                <div className="p-5">
                  <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-violet-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-white/5 border border-white/8 text-gray-400"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-white/5 border border-white/8 text-gray-500">
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <a
            href="#contact"
            className="text-sm text-gray-500 hover:text-violet-400 transition-colors font-medium"
          >
            Want to see more? Let&apos;s talk about your project →
          </a>
        </motion.div>
      </div>

      {/* Project detail modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onLiveClick={handleLiveClick}
      />

      {/* Live access auth gate */}
      <LiveAccessModal
        projectTitle={authModal.title}
        liveUrl={authModal.url}
        isOpen={authModal.open}
        onClose={() => setAuthModal((prev) => ({ ...prev, open: false }))}
      />
    </section>
  );
};

export default Portfolio;
