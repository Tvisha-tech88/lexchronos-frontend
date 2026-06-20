"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "LexChronos cut our case preparation time by 70%. What used to take a paralegal two days — building a chronology, identifying parties, flagging risks — now takes thirty seconds. It's not an exaggeration.",
    author: "Priya Mehta",
    title: "Senior Partner",
    firm: "Mehta & Associates LLP",
    initials: "PM",
    gradient: "from-indigo-500/30 to-violet-500/30",
  },
  {
    quote:
      "The timeline view completely changed how I present cases to clients. I can show them exactly when each event happened, who was involved, and what the risks are — all in a clean, visual format they actually understand.",
    author: "James Worthington",
    title: "Corporate Counsel",
    firm: "Apex Financial Group",
    initials: "JW",
    gradient: "from-violet-500/30 to-purple-500/30",
  },
  {
    quote:
      "As a law student, contract analysis used to take me hours. LexChronos surfaces things I would have missed — ambiguous clauses, conflicting obligations, hidden deadlines. It's like having a senior associate reviewing my work.",
    author: "Sarah Chen",
    title: "3L Student",
    firm: "Yale Law School",
    initials: "SC",
    gradient: "from-emerald-500/30 to-teal-500/30",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
            Testimonials
          </p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
            Trusted by legal professionals
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            From Big Law partners to solo practitioners to law students.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(({ quote, author, title, firm, initials, gradient }, i) => (
            <motion.div
              key={author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="p-6 rounded-2xl border border-border bg-card hover:border-border/80 transition-all duration-300 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-0.5 flex flex-col"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-6">
                &ldquo;{quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${gradient} border border-border flex items-center justify-center text-sm font-bold`}>
                  {initials}
                </div>
                <div>
                  <p className="text-sm font-semibold">{author}</p>
                  <p className="text-xs text-muted-foreground">{title} · {firm}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
