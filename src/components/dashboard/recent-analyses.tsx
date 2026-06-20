"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, ChevronRight, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { formatRelativeDate, formatFileSize } from "@/lib/utils";
import type { StoredAnalysis } from "@/types/analysis";
import { Badge } from "@/components/ui/badge";

interface RecentAnalysesProps {
  analyses: StoredAnalysis[];
}

const statusConfig = {
  completed: { icon: CheckCircle2, label: "Completed", color: "text-emerald-400", bg: "bg-emerald-400/10" },
  processing: { icon: Clock, label: "Processing", color: "text-amber-400", bg: "bg-amber-400/10" },
  failed: { icon: AlertCircle, label: "Failed", color: "text-red-400", bg: "bg-red-400/10" },
};

export function RecentAnalyses({ analyses }: RecentAnalysesProps) {
  if (analyses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-14 h-14 rounded-2xl bg-secondary border border-border flex items-center justify-center mb-4">
          <FileText className="w-7 h-7 text-muted-foreground" />
        </div>
        <h3 className="font-semibold mb-1">No analyses yet</h3>
        <p className="text-sm text-muted-foreground">Upload a document to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {analyses.map((analysis, i) => {
        const status = statusConfig[analysis.status];
        const StatusIcon = status.icon;

        return (
          <motion.div
            key={analysis.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <Link
              href={`/analysis/${analysis.id}`}
              className="group flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary/30 hover:bg-primary/3 transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-xl bg-secondary border border-border flex items-center justify-center shrink-0 group-hover:border-primary/30 transition-colors">
                <FileText className="w-5 h-5 text-indigo-400" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                    {analysis.filename}
                  </p>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{analysis.pageCount} pages</span>
                  <span>·</span>
                  <span>{formatFileSize(analysis.fileSize)}</span>
                  <span>·</span>
                  <span>{formatRelativeDate(analysis.createdAt)}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status.bg} ${status.color}`}>
                  <StatusIcon className="w-3 h-3" />
                  {status.label}
                </div>
                {analysis.result && (
                  <Badge variant="default" className="text-[10px]">
                    {analysis.result.risks.filter(r => r.severity === "high").length} risks
                  </Badge>
                )}
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
