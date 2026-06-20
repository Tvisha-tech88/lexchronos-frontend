"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, FileText, AlertCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TimelineExplorer } from "@/components/timeline/timeline-explorer";
import { getAnalysis, seedDemoData } from "@/lib/storage";
import { mockAnalysisList } from "@/lib/mock-data";
import { formatRelativeDate } from "@/lib/utils";
import type { StoredAnalysis } from "@/types/analysis";

export default function TimelinePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [analysis, setAnalysis] = useState<StoredAnalysis | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    seedDemoData(mockAnalysisList);
    const found = getAnalysis(id);
    setAnalysis(found);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!analysis || !analysis.result) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <AlertCircle className="w-12 h-12 text-muted-foreground" />
        <div className="text-center">
          <h2 className="text-xl font-bold mb-1">Analysis not found</h2>
          <Link href="/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  const { result } = analysis;

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div className="flex items-start gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 mt-0.5"
            onClick={() => router.push(`/analysis/${id}`)}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-violet-400/10 border border-violet-400/20 flex items-center justify-center">
                <Clock className="w-4 h-4 text-violet-400" />
              </div>
              <h1 className="text-xl font-bold tracking-tight">Timeline Explorer</h1>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1 ml-10">
              <FileText className="w-3 h-3" />
              <span className="truncate max-w-xs">{analysis.filename}</span>
              <span>·</span>
              <span>{formatRelativeDate(analysis.createdAt)}</span>
            </div>
          </div>
        </div>

        <Link href={`/analysis/${id}`}>
          <Button variant="outline" size="sm">
            View Full Analysis
          </Button>
        </Link>
      </motion.div>

      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border border-border bg-card">
          <p className="text-2xl font-bold">{result.events.length}</p>
          <p className="text-xs text-muted-foreground">Total events</p>
        </div>
        <div className="p-4 rounded-xl border border-border bg-card">
          <p className="text-2xl font-bold">{result.key_dates.length}</p>
          <p className="text-xs text-muted-foreground">Key dates</p>
        </div>
        <div className="p-4 rounded-xl border border-border bg-card">
          <p className="text-2xl font-bold">{result.parties.length}</p>
          <p className="text-xs text-muted-foreground">Parties</p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="rounded-xl border border-border bg-card p-6"
      >
        <TimelineExplorer events={result.events} parties={result.parties} />
      </motion.div>
    </div>
  );
}
