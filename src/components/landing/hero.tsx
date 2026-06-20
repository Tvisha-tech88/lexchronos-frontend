"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, FileText, Sparkles, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const floatingCards = [
  {
    icon: Clock,
    label: "Timeline Generated",
    value: "9 events extracted",
    color: "text-indigo-400",
    bg: "bg-indigo-400/10",
    delay: 0,
  },
  {
    icon: Shield,
    label: "Risks Identified",
    value: "3 high severity",
    color: "text-red-400",
    bg: "bg-red-400/10",
    delay: 0.15,
  },
  {
    icon: Sparkles,
    label: "AI Summary",
    value: "Ready in 8s",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    delay: 0.3,
  },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-16">
      <div
        className="absolute inset-0 bg-grid-pattern bg-grid opacity-30"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-violet-500/5 rounded-full blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-xs text-primary font-medium mb-6"
        >
          <Sparkles className="w-3 h-3" />
          Powered by Azure OpenAI GPT-4o
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05] mb-6"
        >
          Legal documents,{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
            intelligently
          </span>
          <br />
          decoded in seconds.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          Upload any legal document — contracts, court orders, affidavits — and
          get an AI-powered timeline, risk assessment, and executive summary in
          under 30 seconds.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16"
        >
          <Link href="/upload">
            <Button size="xl" className="group">
              Analyze a document
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/analysis/demo-meridian-001">
            <Button size="xl" variant="outline">
              <FileText className="w-4 h-4" />
              View live demo
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
          <div className="relative mx-auto max-w-4xl rounded-2xl border border-border bg-card overflow-hidden shadow-2xl shadow-black/40">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/50">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-amber-500/60" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
              <span className="ml-2 text-xs text-muted-foreground font-mono">
                lexchronos.app/analysis/meridian-v-atlas
              </span>
            </div>

            <div className="grid grid-cols-3 gap-px bg-border">
              <div className="bg-card p-4">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">
                  Document
                </p>
                <p className="text-sm font-medium truncate">Meridian v Atlas Contract</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">34 pages · 2.8 MB</p>
              </div>
              <div className="bg-card p-4">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">
                  Parties
                </p>
                <p className="text-sm font-medium">6 identified</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">2 primary · 4 supporting</p>
              </div>
              <div className="bg-card p-4">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">
                  Risk Level
                </p>
                <p className="text-sm font-medium text-red-400">High</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">3 critical · 3 medium</p>
              </div>
            </div>

            <div className="p-4 space-y-2">
              {[
                { date: "Mar 15, 2023", event: "Software Development Agreement Executed", type: "agreement", color: "bg-emerald-400" },
                { date: "Sep 30, 2023", event: "Phase 2 Delivery Deadline Missed", type: "deadline", color: "bg-red-400" },
                { date: "Nov 08, 2023", event: "Complaint Filed — Delaware Court of Chancery", type: "filing", color: "bg-indigo-400" },
                { date: "Feb 14, 2024", event: "Preliminary Injunction Hearing", type: "hearing", color: "bg-violet-400" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="flex items-center gap-3 p-2.5 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <div className={`w-1.5 h-1.5 rounded-full ${item.color} shrink-0`} />
                  <span className="text-xs font-mono text-muted-foreground w-24 shrink-0">
                    {item.date}
                  </span>
                  <span className="text-xs text-foreground truncate">{item.event}</span>
                  <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded border border-border text-muted-foreground shrink-0">
                    {item.type}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="absolute -right-4 top-8 space-y-3 hidden xl:block">
            {floatingCards.map(({ icon: Icon, label, value, color, bg, delay }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + delay }}
                className="w-48 p-3 rounded-xl border border-border bg-card/90 backdrop-blur-sm shadow-lg"
              >
                <div className={`w-7 h-7 rounded-lg ${bg} flex items-center justify-center mb-2`}>
                  <Icon className={`w-3.5 h-3.5 ${color}`} />
                </div>
                <p className="text-[10px] text-muted-foreground">{label}</p>
                <p className="text-sm font-semibold">{value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-8 text-xs text-muted-foreground/60"
        >
          Trusted by 500+ legal professionals · SOC 2 compliant · End-to-end encrypted
        </motion.p>
      </div>
    </section>
  );
}
