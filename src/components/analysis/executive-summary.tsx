"use client";

import { motion } from "framer-motion";
import { FileText, Users, Calendar, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AnalysisResult } from "@/types/analysis";

interface ExecutiveSummaryProps {
  result: AnalysisResult;
}

export function ExecutiveSummary({ result }: ExecutiveSummaryProps) {
  const highRisks = result.risks.filter((r) => r.severity === "high").length;
  const urgentRecs = result.recommendations.filter((r) => r.priority === "urgent").length;
  const upcomingDeadlines = result.key_dates.filter(
    (d) => d.type === "deadline" && d.importance === "high"
  ).length;

  const paragraphs = result.summary.split("\n\n").filter(Boolean);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="border-border">
          <CardHeader className="pb-4">
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              Executive Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paragraphs.map((para, i) => (
                <p key={i} className="text-sm text-muted-foreground leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="p-4 rounded-xl bg-red-500/5 border border-red-500/15"
        >
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span className="text-xs font-medium text-red-400 uppercase tracking-wider">High Risks</span>
          </div>
          <p className="text-2xl font-bold">{highRisks}</p>
          <p className="text-xs text-muted-foreground">require immediate attention</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/15"
        >
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-medium text-amber-400 uppercase tracking-wider">Deadlines</span>
          </div>
          <p className="text-2xl font-bold">{upcomingDeadlines}</p>
          <p className="text-xs text-muted-foreground">high-priority upcoming</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="p-4 rounded-xl bg-primary/5 border border-primary/15"
        >
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-primary uppercase tracking-wider">Urgent Actions</span>
          </div>
          <p className="text-2xl font-bold">{urgentRecs}</p>
          <p className="text-xs text-muted-foreground">recommendations pending</p>
        </motion.div>
      </div>
    </div>
  );
}
