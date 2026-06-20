"use client";

import { motion } from "framer-motion";
import { Upload, Cpu, CheckCircle2 } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Upload,
    title: "Upload your document",
    description:
      "Drag and drop any PDF — contracts, court filings, NDAs, affidavits. Up to 100MB supported. Your data never leaves your session.",
    color: "text-indigo-400",
    bg: "bg-indigo-400/10",
    border: "border-indigo-400/20",
  },
  {
    step: "02",
    icon: Cpu,
    title: "AI extracts & structures",
    description:
      "GPT-4o reads the entire document, identifies all parties, extracts every date and event, and structures the information into a comprehensive analysis.",
    color: "text-violet-400",
    bg: "bg-violet-400/10",
    border: "border-violet-400/20",
  },
  {
    step: "03",
    icon: CheckCircle2,
    title: "Review & act",
    description:
      "Navigate the interactive timeline, review risk assessments, and export the full report. Your entire case context in one clean interface.",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/20",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 relative">
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent pointer-events-none"
        aria-hidden="true"
      />
      <div className="max-w-5xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
            How it works
          </p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
            From upload to insight in 30 seconds
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            No setup. No training data. Drop a PDF, get a complete legal analysis.
          </p>
        </motion.div>

        <div className="relative">
          <div
            className="absolute left-1/2 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-border to-transparent hidden md:block"
            aria-hidden="true"
          />

          <div className="space-y-12">
            {steps.map(({ step, icon: Icon, title, description, color, bg, border }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`flex items-start gap-8 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}
              >
                <div className={`flex-1 ${i % 2 === 1 ? "md:text-right" : ""}`}>
                  <div className={`inline-flex items-center gap-2 mb-3 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                    <span className={`text-4xl font-black ${color} opacity-30`}>{step}</span>
                    <div className={`w-8 h-8 rounded-lg ${bg} border ${border} flex items-center justify-center`}>
                      <Icon className={`w-4 h-4 ${color}`} />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{title}</h3>
                  <p className="text-muted-foreground leading-relaxed max-w-sm">
                    {description}
                  </p>
                </div>

                <div className="hidden md:flex w-12 h-12 rounded-full border-2 border-border bg-background items-center justify-center z-10 shrink-0">
                  <div className={`w-3 h-3 rounded-full ${color.replace("text-", "bg-")}`} />
                </div>

                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
