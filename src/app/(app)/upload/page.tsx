"use client";

import { motion } from "framer-motion";
import { Upload, FileText, Shield, Zap } from "lucide-react";
import { DropZone } from "@/components/upload/drop-zone";

const highlights = [
  {
    icon: FileText,
    title: "PDF Support",
    desc: "Any PDF — digital or scanned",
    color: "text-indigo-400",
    bg: "bg-indigo-400/10",
  },
  {
    icon: Zap,
    title: "Instant Analysis",
    desc: "Results in under 30 seconds",
    color: "text-violet-400",
    bg: "bg-violet-400/10",
  },
  {
    icon: Shield,
    title: "Privacy First",
    desc: "No server storage of your files",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
];

export default function UploadPage() {
  return (
    <div className="p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-3xl mx-auto space-y-8"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Upload className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Upload Document</h1>
            <p className="text-sm text-muted-foreground">
              Upload a legal PDF to generate an AI-powered analysis
            </p>
          </div>
        </div>

        <DropZone />

        <div className="grid grid-cols-3 gap-4">
          {highlights.map(({ icon: Icon, title, desc, color, bg }) => (
            <div
              key={title}
              className="flex flex-col items-center text-center gap-2 p-4 rounded-xl border border-border bg-card"
            >
              <div className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center`}>
                <Icon className={`w-4.5 h-4.5 ${color}`} size={18} />
              </div>
              <p className="text-sm font-medium">{title}</p>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/15 text-sm text-amber-400/80">
          <strong className="text-amber-400">Note:</strong> LexChronos is currently in demo mode.
          If no Azure OpenAI key is configured in Settings, the system will generate a representative
          mock analysis to demonstrate functionality.
        </div>
      </motion.div>
    </div>
  );
}
