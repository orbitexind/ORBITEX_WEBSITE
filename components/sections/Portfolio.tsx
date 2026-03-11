"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { HiArrowTopRightOnSquare, HiEye, HiArrowLongRight } from "react-icons/hi2";
import { FaGithub } from "react-icons/fa";
import ProjectModal, { type Project } from "@/components/ui/ProjectModal";
import LiveAccessModal from "@/components/ui/LiveAccessModal";
import TiltCard from "@/components/ui/TiltCard";
import { cn } from "@/lib/utils";

const thumb = (url: string) =>
  `https://s0.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=600&h=400`;

const projects: Project[] = [
  {
    id: 1,
    title: "Demo 1",
    description:
      "A modern, animated developer portfolio showcasing projects, skills, and services.",
    longDescription:
      "A fully responsive personal portfolio built with React and TypeScript. Features smooth scroll animations powered by Framer Motion, a dynamic project showcase with filtering, an interactive contact form, and a perfect Lighthouse score. Deployed continuously on OrbitexInd.",
    gradient: "from-violet-600 via-purple-600 to-indigo-700",
    iconBg: "bg-violet-500/20",
    tags: ["OrbitexInd", "TypeScript", "Tailwind CSS", "Framer Motion"],
    category: "Portfolios",
    liveUrl: "https://satvikrokadeportfolio.vercel.app",
    githubUrl: "#",
    year: "2024",
    thumbnail: thumb("https://satvikrokadeportfolio.vercel.app"),
    features: [
      "Smooth Framer Motion animations",
      "Fully responsive design",
      "Dynamic project showcase",
      "Interactive contact form",
      "SEO & performance optimized",
      "OrbitexInd continuous deployment",
    ],
  },
  {
    id: 2,
    title: "Demo 2",
    description:
      "A sleek, modern developer portfolio for Samarth Pawar with smooth animations and an elegant layout.",
    longDescription:
      "A polished personal portfolio website for Samarth Pawar, built with modern web technologies. Features fluid scroll animations, a projects showcase, skills section, and a fully responsive design — presenting the developer's work and experience in a compelling visual format.",
    gradient: "from-rose-500 via-pink-500 to-fuchsia-600",
    iconBg: "bg-rose-500/20",
    tags: ["React", "Tailwind CSS", "Framer Motion", "OrbitexInd"],
    category: "Portfolios",
    liveUrl: "https://portfolio-samarth-pawar.vercel.app",
    githubUrl: "#",
    year: "2025",
    thumbnail: thumb("https://portfolio-samarth-pawar.vercel.app"),
    features: [
      "Smooth scroll animations",
      "Projects showcase grid",
      "Skills & experience section",
      "Fully responsive design",
      "Clean, minimal UI",
      "Deployed on OrbitexInd",
    ],
  },
  {
    id: 3,
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
    thumbnail: thumb("https://wastemanagement-2aa.pages.dev/"),
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
    id: 4,
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
    thumbnail: thumb("https://interview-conductor-python.pages.dev"),
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
    id: 5,
    title: "Management System for Municipal Complaints",
    description:
      "A comprehensive platform for submitting, tracking, and resolving municipal complaints efficiently.",
    longDescription:
      "Management System for Municipal Complaints is a robust web platform that streamlines the process of submitting and managing citizen complaints. Features a user-friendly complaint submission portal, real-time status tracking, departmental routing, and an admin dashboard for efficient resolution and reporting.",
    gradient: "from-amber-500 via-orange-500 to-yellow-500",
    iconBg: "bg-amber-500/20",
    tags: ["Python", "TypeScript", "React"],
    category: "Web Apps",
    liveUrl: "https://project-cloudregex.pages.dev/",
    githubUrl: "#",
    year: "2025",
    thumbnail: thumb("https://project-cloudregex.pages.dev/"),
    features: [
      "Live regex testing",
      "Match highlighting",
      "Common pattern library",
      "Cloud sync across devices",
      "Export & copy patterns",
      "Shareable pattern links",
    ],
  },
  {
    id: 6,
    title: "NinjaH2R",
    description:
      "High-performance landing page for a Kawasaki Ninja H2R fan community with immersive visuals and smooth animations.",
    longDescription:
      "NinjaH2R is a visually stunning web experience built for motorcycle enthusiasts. The site features full-viewport hero sections, cinematic scroll animations, spec showcases, and a gallery — all optimized for performance and mobile responsiveness. Demonstrates advanced CSS and animation techniques in a real-world client deployment.",
    gradient: "from-green-500 via-emerald-600 to-teal-600",
    iconBg: "bg-green-500/20",
    tags: ["HTML", "CSS", "JavaScript", "Animations"],
    category: "3D Websites",
    liveUrl: "https://ninjah2r.vercel.app/",
    githubUrl: "#",
    year: "2025",
    thumbnail: thumb("https://ninjah2r.vercel.app/"),
    features: [
      "Cinematic full-viewport hero",
      "Smooth scroll animations",
      "Motorcycle spec showcase",
      "Responsive gallery section",
      "Performance optimized",
      "Deployed on OrbitexInd",
    ],
  },
  {
    id: 7,
    title: "WizardZ",
    description:
      "Interactive magic-themed web experience with dynamic effects, card reveals, and immersive UI.",
    longDescription:
      "WizardZ is a creative web project delivering a magic and fantasy themed interactive experience. Built with pure HTML, CSS and JavaScript, it showcases advanced DOM manipulation, card-flip animations, particle effects, and a polished UI that keeps users engaged. A strong example of creative front-end development without any framework.",
    gradient: "from-purple-600 via-violet-600 to-indigo-600",
    iconBg: "bg-purple-500/20",
    tags: ["HTML", "CSS", "JavaScript", "UI/UX"],
    category: "Web Apps",
    liveUrl: "https://wizardzco.vercel.app",
    githubUrl: "https://brave98git.github.io/WizardZ/",
    year: "2025",
    thumbnail: thumb("https://wizardzco.vercel.app"),
    features: [
      "Magic-themed interactive UI",
      "Card flip & reveal animations",
      "Particle effect system",
      "Pure JS — no framework",
      "Responsive design",
      "Creative DOM manipulation",
    ],
  },
  {
    id: 8,
    title: "Lazarev Agency Clone",
    description:
      "Pixel-perfect recreation of the award-winning Lazarev design agency website with advanced GSAP animations.",
    longDescription:
      "A high-fidelity clone of the Lazarev digital agency website, built from scratch to demonstrate mastery of advanced web animation techniques. Implements GSAP ScrollTrigger, smooth cursor effects, magnetic buttons, horizontal scroll sections, and fluid page transitions — matching the feel of top-tier agency websites used by global brands.",
    gradient: "from-slate-600 via-gray-700 to-zinc-800",
    iconBg: "bg-slate-500/20",
    tags: ["HTML", "CSS", "JavaScript", "GSAP"],
    category: "Web Apps",
    liveUrl: "https://lazarevco.vercel.app",
    githubUrl: "https://brave98git.github.io/lazarev/",
    year: "2025",
    thumbnail: thumb("https://lazarevco.vercel.app"),
    features: [
      "GSAP ScrollTrigger animations",
      "Custom smooth cursor effects",
      "Magnetic button interactions",
      "Horizontal scroll sections",
      "Fluid page transitions",
      "Agency-grade visual polish",
    ],
  },
  {
    id: 9,
    title: "Government Document Assist",
    description:
      "AI-powered chatbot that helps citizens navigate and understand government documents instantly.",
    longDescription:
      "Government Document Assist is an intelligent conversational AI built to simplify complex government paperwork for everyday citizens. Users can upload or paste documents and receive plain-language explanations, step-by-step guidance, and quick answers to compliance questions. Powered by a modern LLM backend and deployed on OrbitexInd for sub-second response times.",
    gradient: "from-blue-600 via-blue-500 to-indigo-600",
    iconBg: "bg-blue-500/20",
    tags: ["AI", "Chatbot", "OrbitexInd", "LLM"],
    category: "AI Projects",
    liveUrl: "https://chatbot-1-orpin-one.vercel.app/",
    githubUrl: "#",
    year: "2025",
    thumbnail: thumb("https://chatbot-1-orpin-one.vercel.app/"),
    features: [
      "Plain-language document explanations",
      "Step-by-step compliance guidance",
      "Instant AI-powered Q&A",
      "Supports multiple document types",
      "Fast OrbitexInd edge deployment",
      "Accessible, mobile-friendly UI",
    ],
  },
];

const categories = ["All", "Portfolios", "Web Apps", "AI Projects", "3D Websites"];

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
      className="relative py-24 md:py-32 overflow-hidden bg-slate-50 dark:bg-[#030712]"
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
          <span className="section-tag">Our Work</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-5">
            Recent <span className="text-gradient">Work</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto text-lg">
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
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              )}
            >
              {activeCategory === cat && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-sky-500 to-blue-600"
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
                onClick={() => setSelectedProject(project)}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                style={{ perspective: "1200px" }}
              >
                <TiltCard
                  className="group relative rounded-3xl overflow-hidden bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/8 hover:border-violet-300 dark:hover:border-white/15 cursor-pointer shadow-sm dark:shadow-none transition-[border-color,box-shadow] duration-300 h-full"
                  glowColor="rgba(124,58,237,0.25)"
                  intensity={6}
                >
                  {/* Project thumbnail */}
                  <div
                    className={`relative h-44 bg-gradient-to-br ${project.gradient} overflow-hidden`}
                  >
                    {/* Screenshot image or gradient fallback */}
                    {project.thumbnail ? (
                      <Image
                        src={project.thumbnail}
                        alt={`${project.title} preview`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        unoptimized
                      />
                    ) : (
                      <>
                        <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-white/10" />
                        <div className="absolute bottom-2 -left-4 w-24 h-24 rounded-full bg-black/20" />
                      </>
                    )}
                    {/* Hover overlay */}
                    <motion.div
                      className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center gap-3"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors">
                        <HiEye size={16} className="text-white" />
                      </div>
                      <div className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                        onClick={(e) => { e.stopPropagation(); }}>
                        <FaGithub size={16} className="text-white" />
                      </div>
                      <div className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                        onClick={(e) => { e.stopPropagation(); handleLiveClick(project.liveUrl, project.title); }}>
                        <HiArrowTopRightOnSquare size={16} className="text-white" />
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
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors">
                      OrbitexInd {project.title}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/8 text-gray-500 dark:text-gray-400"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 4 && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/8 text-gray-400 dark:text-gray-500">
                          +{project.tags.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </TiltCard>
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
            className="text-sm text-gray-500 dark:text-gray-500 hover:text-violet-600 dark:hover:text-violet-400 transition-colors font-medium"
          >
            Want to see more? Let&apos;s talk about your project <HiArrowLongRight className="inline ml-1" />
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
