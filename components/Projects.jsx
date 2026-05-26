"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Code2, ExternalLink } from "lucide-react";
import Section from "./Section";
import Card from "./Card";
import Button from "./Button";
import { projects } from "../data/projects";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

const categoryLabels = {
  web: "Web",
  uiux: "UI/UX",
  dsml: "Data / ML",
  "Front-end": "Front-end",
};

export default function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Selected projects with clean layouts and responsive interactions."
      description="Each project reflects a focus on structure, visual polish, and practical front-end problem solving."
    >
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
        {projects.map((project, index) => (
          <motion.article
            key={project.title}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover={{ y: -6 }}
          >
            <Card className="group h-full overflow-hidden p-0">
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

                <h3 className="mt-5 text-xl font-semibold text-slate-950 dark:text-white">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {project.description}
                </p>

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
            </Card>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}