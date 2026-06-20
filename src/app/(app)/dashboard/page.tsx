"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText,
  TrendingUp,
  Clock,
  AlertTriangle,
  Upload,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatsCard } from "@/components/dashboard/stats-card";
import { RecentAnalyses } from "@/components/dashboard/recent-analyses";
import { seedDemoData, getAllAnalyses } from "@/lib/storage";
import { mockAnalysisList } from "@/lib/mock-data";
import type { StoredAnalysis } from "@/types/analysis";

export default function DashboardPage() {
  const [analyses, setAnalyses] = useState<StoredAnalysis[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    seedDemoData(mockAnalysisList);
    setAnalyses(getAllAnalyses());
  }, []);

  const filtered = analyses.filter((a) =>
    a.filename.toLowerCase().includes(search.toLowerCase())
  );

  const completed = analyses.filter((a) => a.status === "completed").length;
  const highRiskTotal = analyses.reduce((sum, a) => {
    return sum + (a.result?.risks.filter((r) => r.severity === "high").length ?? 0);
  }, 0);

  return (
    <div className="p-6 lg:p-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Overview of your document analyses
          </p>
        </div>
        <Link href="/upload">
          <Button className="gap-2">
            <Upload className="w-4 h-4" />
            Upload document
          </Button>
        </Link>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Analyses"
          value={String(analyses.length)}
          delta="+2 this week"
          deltaPositive
          icon={FileText}
          iconColor="text-indigo-400"
          iconBg="bg-indigo-400/10"
          delay={0}
        />
        <StatsCard
          title="Completed"
          value={String(completed)}
          delta="100% success"
          deltaPositive
          icon={TrendingUp}
          iconColor="text-emerald-400"
          iconBg="bg-emerald-400/10"
          delay={0.08}
        />
        <StatsCard
          title="Avg. Analysis Time"
          value="< 30s"
          icon={Clock}
          iconColor="text-violet-400"
          iconBg="bg-violet-400/10"
          delay={0.16}
        />
        <StatsCard
          title="High Risks Found"
          value={String(highRiskTotal)}
          delta="Across all docs"
          deltaPositive={false}
          icon={AlertTriangle}
          iconColor="text-red-400"
          iconBg="bg-red-400/10"
          delay={0.24}
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold">Recent Analyses</h2>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search documents..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 text-sm"
            />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl border border-border bg-card p-4"
        >
          <RecentAnalyses analyses={filtered} />
        </motion.div>
      </div>
    </div>
  );
}
