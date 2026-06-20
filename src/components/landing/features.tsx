"use client";

import { motion } from "framer-motion";
import {
  FileSearch,
  Clock,
  Users,
  ShieldAlert,
  Sparkles,
  Download,
} from "lucide-react";

const features = [
  {
    icon: FileSearch,
    title: "PDF Intelligence",
    description:
      "Extract text from any PDF — scanned or digital. Handles contracts, affidavits, court orders, and complex multi-page documents.",
    color: "text-indigo-400",
    bg: "bg-indigo-400/10",
    border: "border-indigo-400/20",
  },
  {
    icon: Clock,
    title: "Chronological Timeline",
    description:
      "Every event, date, and milestone automatically extracted and sorted into an interactive, filterable timeline.",
    color: "text-violet-400",
    bg: "bg-violet-400/10",
    border: "border-violet-400/20",
  },
  {
    icon: Users,
    title: "Party Detection",
    description:
      "Identify every party — individuals, corporations, government bodies — with their roles, relationships, and mentions throughout the document.",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/20",
  },
  {
    icon: ShieldAlert,
    title: "Risk Assessment",
    description:
      "AI identifies contractual vulnerabilities, regulatory risks, financial exposures, and missed obligations with severity ratings.",
    color: "text-red-400",
    bg: "bg-red-400/10",
    border: "border-red-400/20",
  },
  {
    icon: Sparkles,
    title: "AI Case Summary",
    description:
      "A professional executive summary covering the nature of the document, key issues, and strategic considerations — ready in seconds.",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/20",
  },
  {
    icon: Download,
    title: "Export Reports",
    description:
      "Download the full analysis as a structured report. Share with clients, partners, or colleagues with one click.",
    color: "text-sky-400",
    bg: "bg-sky-400/10",
    border: "border-sky-400/20",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
            Features
          </p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
            Everything your legal team needs
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From raw PDF to actionable intelligence. LexChronos handles the
            heavy lifting so you can focus on strategy.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map(({ icon: Icon, title, description, color, bg, border }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className={`group p-6 rounded-2xl border ${border} ${bg} hover:bg-opacity-100 transition-all duration-300 hover:shadow-lg hover:shadow-black/20 hover:-translate-y-0.5`}
            >
              <div className={`w-10 h-10 rounded-xl ${bg} border ${border} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
