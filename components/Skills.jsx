"use client";

import { motion } from "framer-motion";
import Card from "./Card";
import Section from "./Section";
import { hardSkills, softSkills } from "../data/skills";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="A balanced mix of hard skills and soft skills."
      description="I enjoy turning ideas into clean interfaces while keeping communication, teamwork, and adaptability at the center of my process."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
          className="space-y-6"
        >
          {hardSkills.map((group) => (
            <Card key={group.title}>
              <p className="text-lg font-semibold text-slate-950 dark:text-white">{group.title}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, delay: 0.05 }}
        >
          <Card className="h-full">
            <p className="text-lg font-semibold text-slate-950 dark:text-white">Soft Skills</p>
            <div className="mt-5 flex flex-wrap gap-3">
              {softSkills.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-linear-to-r from-slate-900 to-slate-700 px-4 py-2 text-sm font-medium text-white shadow-sm dark:from-white dark:to-slate-200 dark:text-slate-900"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-8 rounded-3xl bg-slate-50 p-5 dark:bg-slate-950/70">
              <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
                Main tools I frequently use include React, Laravel, Python, Tailwind CSS,
                and Figma for designing and building responsive experiences.
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </Section>
  );
}