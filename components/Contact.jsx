"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Link2, Mail, Send } from "lucide-react";
import Section from "./Section";
import Card from "./Card";
import Button from "./Button";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function Contact() {
  const [status, setStatus] = useState("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus("sending");
    
    fetch("https://formsubmit.co/ajax/sellyjuanalyarsln26@gmail.com", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(form)
    })
    .then(response => response.json())
    .then(data => {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
    })
    .catch(error => {
        console.error(error);
        setStatus("error");
    });
  };

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's build something thoughtful together."
      description="If you have a project idea, collaboration opportunity, or just want to connect, feel free to reach out."
    >
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
          className="space-y-6"
        >
          <Card>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
              Reach out
            </p>
            <div className="mt-5 space-y-4 text-sm text-slate-600 dark:text-slate-300">
              <a className="flex items-center gap-3 hover:text-slate-950 dark:hover:text-white" href="mailto:sellyjuanalyarsln26@gmail.com">
                <Mail size={16} /> sellyjuanalyarsln26@gmail.com
              </a>
              <a className="flex items-center gap-3 hover:text-slate-950 dark:hover:text-white" href="https://github.com/sellyjuanalyaaa" target="_blank" rel="noreferrer">
                <Code2 size={16} /> GitHub
              </a>
              <a className="flex items-center gap-3 hover:text-slate-950 dark:hover:text-white" href="https://www.linkedin.com/in/sellyjuan-alya-rosalina123/" target="_blank" rel="noreferrer">
                <Link2 size={16} /> LinkedIn
              </a>
            </div>
          </Card>

          <Card>
            <p className="text-lg font-semibold text-slate-950 dark:text-white">Download CV</p>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
              You can download my CV directly from the public folder.
            </p>
            <div className="mt-5">
              <Button href="/cv-sellyjuanalyarosalina.pdf" download>
                Download CV <ArrowRight className="ml-2" size={16} />
              </Button>
            </div>
          </Card>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, delay: 0.05 }}
        >
          <Card>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                  Name
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm((current) => ({ ...current, name: e.target.value }))}
                    suppressHydrationWarning
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                    placeholder="Your name"
                  />
                </label>
                <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                  Email
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm((current) => ({ ...current, email: e.target.value }))}
                    suppressHydrationWarning
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                    placeholder="you@example.com"
                  />
                </label>
              </div>

              <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                Message
                <textarea
                  required
                  rows={6}
                  value={form.message}
                  onChange={(e) => setForm((current) => ({ ...current, message: e.target.value }))}
                  suppressHydrationWarning
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                  placeholder="Tell me about your project..."
                />
              </label>

              <div className="flex flex-wrap items-center gap-3">
                <Button type="submit" disabled={status === "sending"}>
                  {status === "sending" ? "Sending..." : "Send Message"} <Send className="ml-2" size={16} />
                </Button>
                {status === "sent" && (
                  <p className="text-sm text-emerald-600 dark:text-emerald-400">
                    Message sent successfully!
                  </p>
                )}
                {status === "error" && (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    Oops! Something went wrong.
                  </p>
                )}
              </div>
            </form>
          </Card>
        </motion.div>
      </div>
    </Section>
  );
}