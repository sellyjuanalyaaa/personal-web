"use client";

import { motion } from "framer-motion";
import Card from "./Card";
import Section from "./Section";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="A focused student journey shaped by design, code, and organization work."
      description="I combine academic learning with hands-on experience to build thoughtful interfaces and grow as a web developer."
    >
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="space-y-6"
        >
          <Card>
            <p className="text-base leading-8 text-slate-600 dark:text-slate-300">
              I am an Informatics student in semester 6 who enjoys creating minimalist
              digital experiences that feel clear, modern, and easy to use. My journey has
              been shaped by continuous learning, collaboration, and a strong interest in
              both development and visual design.
            </p>
          </Card>

          <Card>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-950/70">
                <p className="text-sm font-semibold text-slate-950 dark:text-white">Education</p>
                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  Informatics student, semester 6, with a focus on UI implementation and
                  problem solving.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-950/70">
                <p className="text-sm font-semibold text-slate-950 dark:text-white">Growth</p>
                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  Developed through campus activities, organization involvement, and
                  self-directed project exploration.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, delay: 0.05 }}
        >
          <Card className="h-full">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-600 dark:text-cyan-400">
              Journey highlights
            </p>
            <ul className="mt-6 space-y-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
              <li>• Built stronger discipline through consistent personal project work.</li>
              <li>• Learned how to collaborate in teams and communicate ideas clearly.</li>
              <li>• Expanded knowledge in front-end development and UI/UX fundamentals.</li>
              <li>• Developed a habit of refining layouts, spacing, and motion details.</li>
            </ul>
          </Card>
        </motion.div>
      </div>
    </Section>
  );
}