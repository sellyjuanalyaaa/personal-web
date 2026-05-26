"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import Section from "./Section";
import TabButton from "./TabButton";
import ExperienceCard from "./ExperienceCard";
import { experience } from "../data/experience";

const tabs = [
  { id: "all", label: "All" },
  { id: "works", label: "Works" },
  { id: "organizations", label: "Organizations" },
  { id: "committees", label: "Committees" },
];

const tabContentMotion = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export default function Experience() {
  const [activeTab, setActiveTab] = useState("all");
  const [showAll, setShowAll] = useState(false);

  const filteredExperience = useMemo(() => {
    if (activeTab === "all") return experience;
    return experience.filter((item) => item.category === activeTab);
  }, [activeTab]);

  const displayedExperience = showAll ? filteredExperience : filteredExperience.slice(0, 2);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setShowAll(false);
  };

  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Experiences"
      description="I actively developed both technical and soft skills during university through internships, IT projects, and involvement in student organizations, focusing on leadership and teamwork."
    >
      <div className="mb-8 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            label={tab.label}
            isActive={activeTab === tab.id}
            onClick={() => handleTabChange(tab.id)}
          />
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={tabContentMotion}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="contents"
          >
            {displayedExperience.map((item) => (
              <ExperienceCard key={item.id} item={item} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredExperience.length === 0 ? (
          <p className="col-span-full text-center text-sm text-slate-500 dark:text-slate-400">
            No experiences found for this category.
          </p>
        ) : null}

        {filteredExperience.length > 2 ? (
          <div className="col-span-full flex justify-center pt-2">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="rounded-full border border-sky-200 bg-sky-50 px-5 py-2 text-sm font-medium text-sky-700 transition-colors hover:bg-sky-100 dark:border-slate-700 dark:bg-slate-900 dark:text-sky-300 dark:hover:bg-slate-800"
            >
              {showAll ? "See less" : "See more"}
            </button>
          </div>
        ) : null}
      </div>
    </Section>
  );
}