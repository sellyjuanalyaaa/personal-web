"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Code2, ExternalLink } from "lucide-react";
import Section from "./Section";
import Button from "./Button";
import TabButton from "./TabButton";
import MagicBento from "./MagicBento";
import { projects } from "../data/projects";

const tabs = [
  { id: "all", label: "All" },
  { id: "about", label: "About Me" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "web", label: "Web Development" },
  { id: "uiux", label: "UI/UX" },
  { id: "dsml", label: "Data Science / ML" },
];

const keyHardSkills = ["HTML", "CSS", "JavaScript", "Tailwind CSS", "WordPress"];
const keySoftSkills = ["Komunikasi", "Kepemimpinan", "Kerja Sama Tim", "Manajemen Waktu", "Problem Solving"];

const tabAnimation = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const categoryLabels = {
  web: "Web",
  uiux: "UI/UX",
  dsml: "Data / ML",
  "Front-end": "Front-end",
};

function ProjectCard({ project }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const descriptionRef = useRef(null);

  useEffect(() => {
    const element = descriptionRef.current;
    if (!element) return;

    const updateClampState = () => {
      if (!element) return;
      const isOverflowing = element.scrollHeight > element.clientHeight + 1;
      setIsClamped(isOverflowing);
    };

    updateClampState();

    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(updateClampState);
    observer.observe(element);

    return () => observer.disconnect();
  }, [project.description, isExpanded]);

  const showToggle = isExpanded || isClamped;

  return (
    <motion.article whileHover={{ y: -5 }} className="h-full">
      <MagicBento
        className="group h-full overflow-hidden p-0"
        textAutoHide={true}
        enableStars={false}
        enableSpotlight
        enableBorderGlow={true}
        enableTilt={false}
        enableMagnetism={false}
        clickEffect
        spotlightRadius={400}
        particleCount={12}
        glowColor="14, 165, 233"
        disableAnimations={false}
      >
        <div className="relative aspect-16/10 overflow-hidden bg-slate-100 dark:bg-slate-900">
          {project.category ? (
            <span className="absolute left-4 top-4 z-10 rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/80 dark:text-slate-200">
              {categoryLabels[project.category] ?? project.category}
            </span>
          ) : null}
          <Image
            src={project.image}
            alt={project.title}
            fill
            unoptimized
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="p-6">
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>

          <h3 className="mt-5 text-xl font-semibold text-slate-950 dark:text-white">{project.title}</h3>
          <p
            ref={descriptionRef}
            className={`mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300${
              isExpanded ? "" : " line-clamp-3"
            }`}
          >
            {project.description}
          </p>
          {showToggle ? (
            <button
              type="button"
              className="mt-3 text-xs font-semibold text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300"
              onClick={() => setIsExpanded((prev) => !prev)}
            >
              {isExpanded ? "See less" : "See all"}
            </button>
          ) : null}

          <div className="mt-6 flex flex-wrap gap-3">
            <Button href={project.github} variant="secondary" target="_blank" rel="noreferrer">
              <Code2 className="mr-2" size={16} /> GitHub
            </Button>
            {project.demo ? (
              <Button href={project.demo} target="_blank" rel="noreferrer">
                <ExternalLink className="mr-2" size={16} /> Live Demo
              </Button>
            ) : null}
            {project.figma ? (
              <Button href={project.figma} target="_blank" rel="noreferrer">
                <ExternalLink className="mr-2" size={16} /> Figma
              </Button>
            ) : null}
          </div>
        </div>
      </MagicBento>
    </motion.article>
  );
}

function PortfolioAllTab({ featuredProjects }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <MagicBento
          textAutoHide={true}
          enableStars={false}
          enableSpotlight
          enableBorderGlow={true}
          enableTilt={false}
          enableMagnetism={false}
          clickEffect
          spotlightRadius={400}
          particleCount={12}
          glowColor="14, 165, 233"
          disableAnimations={false}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-600 dark:text-cyan-400">
            About Summary
          </p>
          <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">
            Mahasiswa semester 6 Informatika Universitas Jenderal Soedirman dengan IP 3.81 (117 SKS),
            berfokus pada Frontend Development dan pengembangan perangkat lunak yang responsif, rapi,
            dan mudah digunakan.
          </p>
        </MagicBento>

        <MagicBento
          textAutoHide={true}
          enableStars={false}
          enableSpotlight
          enableBorderGlow={true}
          enableTilt={false}
          enableMagnetism={false}
          clickEffect
          spotlightRadius={400}
          particleCount={12}
          glowColor="14, 165, 233"
          disableAnimations={false}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-600 dark:text-cyan-400">
            Key Skills
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {keyHardSkills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white dark:bg-white dark:text-slate-900"
              >
                {skill}
              </span>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {keySoftSkills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </MagicBento>
      </div>

      <div>
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-cyan-600 dark:text-cyan-400">
          Featured Projects
        </p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PortfolioAboutTab() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <MagicBento
        textAutoHide={true}
        enableStars={false}
        enableSpotlight
        enableBorderGlow={true}
        enableTilt={false}
        enableMagnetism={false}
        clickEffect
        spotlightRadius={400}
        particleCount={12}
        glowColor="14, 165, 233"
        disableAnimations={false}
      >
        <p className="text-base leading-8 text-slate-600 dark:text-slate-300">
          Mahasiswa semester 6 Jurusan Informatika di Universitas Jenderal Soedirman dengan IP 3.81
          (117 SKS). Memiliki minat dalam pengembangan perangkat lunak, khususnya Frontend Development,
          dengan keahlian HTML, CSS, JavaScript, Tailwind CSS, Bootstrap, serta pengelolaan website
          menggunakan WordPress. Berkomitmen untuk terus belajar dan beradaptasi dengan perkembangan
          terbaru dalam industri teknologi informasi.
        </p>
      </MagicBento>

      <MagicBento
        textAutoHide={true}
        enableStars={false}
        enableSpotlight
        enableBorderGlow={true}
        enableTilt={false}
        enableMagnetism={false}
        clickEffect
        spotlightRadius={400}
        particleCount={12}
        glowColor="14, 165, 233"
        disableAnimations={false}
      >
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-600 dark:text-cyan-400">
          Education
        </p>
        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
          Informatika, Universitas Jenderal Soedirman, Semester 6, IP 3.81 (117 SKS).
        </p>
        <p className="mt-5 text-sm font-semibold uppercase tracking-[0.22em] text-cyan-600 dark:text-cyan-400">
          Journey
        </p>
        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
          Berpengalaman dalam organisasi di bidang pengembangan sumber daya manusia, memiliki kemampuan
          analitis dan problem-solving yang baik, serta siap berkontribusi dalam tim yang dinamis dan inovatif.
        </p>
      </MagicBento>
    </div>
  );
}

function PortfolioSkillsTab() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <MagicBento
        textAutoHide={true}
        enableStars={false}
        enableSpotlight
        enableBorderGlow={true}
        enableTilt={false}
        enableMagnetism={false}
        clickEffect
        spotlightRadius={400}
        particleCount={12}
        glowColor="14, 165, 233"
        disableAnimations={false}
      >
        <p className="text-lg font-semibold text-slate-950 dark:text-white">Hard Skills</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {["HTML", "CSS", "JavaScript", "Tailwind CSS", "Bootstrap", "WordPress", "Figma"].map((item) => (
            <span
              key={item}
              className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
            >
              {item}
            </span>
          ))}
        </div>
      </MagicBento>

      <MagicBento
        textAutoHide={true}
        enableStars={false}
        enableSpotlight
        enableBorderGlow={true}
        enableTilt={false}
        enableMagnetism={false}
        clickEffect
        spotlightRadius={400}
        particleCount={12}
        glowColor="14, 165, 233"
        disableAnimations={false}
      >
        <p className="text-lg font-semibold text-slate-950 dark:text-white">Soft Skills</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {["Komunikasi", "Kepemimpinan", "Kerja Sama Tim", "Manajemen Waktu", "Problem Solving"].map((item) => (
            <span
              key={item}
              className="rounded-full bg-linear-to-r from-slate-900 to-slate-700 px-4 py-2 text-sm font-medium text-white dark:from-white dark:to-slate-200 dark:text-slate-900"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mt-5 space-y-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
          <p>
            <span className="font-semibold text-slate-900 dark:text-slate-100">Bahasa:</span> Indonesia,
            Inggris (Menengah).
          </p>
          <p>
            <span className="font-semibold text-slate-900 dark:text-slate-100">Aplikasi Office:</span>
            Microsoft Word, Excel, PowerPoint, Google Docs, Google Forms, Google Spreadsheet,
            serta tools desain seperti PicsArt, Canva, dan Figma.
          </p>
        </div>
      </MagicBento>
    </div>
  );
}

function PortfolioProjectsTab({ list }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {list.map((project) => (
        <ProjectCard key={project.title} project={project} />
      ))}
    </div>
  );
}

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("all");

  const featuredProjects = useMemo(() => projects.slice(0, 3), []);

  const filteredProjects = useMemo(() => {
    if (activeTab === "projects") return projects;
    if (activeTab === "web") return projects.filter((project) => project.category === "web");
    if (activeTab === "uiux") return projects.filter((project) => project.category === "uiux");
    if (activeTab === "dsml") return projects.filter((project) => project.category === "dsml");
    return projects;
  }, [activeTab]);

  return (
    <Section
      id="portfolio"
      eyebrow="Portfolio"
      title="Portfolio"
      description="A curated space to showcase my journey, skills, and selected projects in one place."
    >
      <div className="mb-8 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            label={tab.label}
            isActive={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          variants={tabAnimation}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {activeTab === "all" ? <PortfolioAllTab featuredProjects={featuredProjects} /> : null}
          {activeTab === "about" ? <PortfolioAboutTab /> : null}
          {activeTab === "skills" ? <PortfolioSkillsTab /> : null}
          {activeTab === "projects" ? <PortfolioProjectsTab list={filteredProjects} /> : null}
          {activeTab === "web" ? <PortfolioProjectsTab list={filteredProjects} /> : null}
          {activeTab === "uiux" ? <PortfolioProjectsTab list={filteredProjects} /> : null}
          {activeTab === "dsml" ? <PortfolioProjectsTab list={filteredProjects} /> : null}
        </motion.div>
      </AnimatePresence>
    </Section>
  );
}