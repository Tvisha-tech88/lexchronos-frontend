"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Download,
  Clock,
  FileText,
  ExternalLink,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExecutiveSummary } from "@/components/analysis/executive-summary";
import { PartiesInvolved } from "@/components/analysis/parties-involved";
import { KeyDates } from "@/components/analysis/key-dates";
import { RiskAssessment } from "@/components/analysis/risk-assessment";
import { Recommendations } from "@/components/analysis/recommendations";
import { ObligationsList } from "@/components/analysis/obligations-list";
import { getAnalysis } from "@/lib/storage";
import { seedDemoData } from "@/lib/storage";
import { mockAnalysisList } from "@/lib/mock-data";
import { formatRelativeDate, formatFileSize } from "@/lib/utils";
import type { StoredAnalysis } from "@/types/analysis";

export default function AnalysisPage() {
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

  const handleExport = () => {
    if (!analysis) return;
    const json = JSON.stringify(analysis, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `lexchronos-${analysis.filename.replace(".pdf", "")}-analysis.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <AlertCircle className="w-12 h-12 text-muted-foreground" />
        <div className="text-center">
          <h2 className="text-xl font-bold mb-1">Analysis not found</h2>
          <p className="text-sm text-muted-foreground mb-4">
            This analysis may have been deleted or the ID is incorrect.
          </p>
          <Link href="/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!analysis.result) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-1">Analysis in progress</h2>
          <p className="text-sm text-muted-foreground">Please check back shortly.</p>
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
            onClick={() => router.push("/dashboard")}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="w-8 h-8 rounded-lg bg-indigo-400/10 border border-indigo-400/20 flex items-center justify-center">
                <FileText className="w-4 h-4 text-indigo-400" />
              </div>
              <h1 className="text-xl font-bold tracking-tight truncate max-w-sm">
                {analysis.filename}
              </h1>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1 ml-10">
              <span>{analysis.pageCount} pages</span>
              <span>·</span>
              <span>{formatFileSize(analysis.fileSize)}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {formatRelativeDate(analysis.createdAt)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link href={`/timeline/${analysis.id}`}>
            <Button variant="outline" size="sm" className="gap-1.5">
              <ExternalLink className="w-3.5 h-3.5" />
              Timeline
            </Button>
          </Link>
          <Button size="sm" onClick={handleExport} className="gap-1.5">
            <Download className="w-3.5 h-3.5" />
            Export JSON
          </Button>
        </div>
      </motion.div>

      <Tabs defaultValue="summary" className="space-y-6">
        <TabsList className="flex flex-wrap gap-1 h-auto bg-secondary p-1 rounded-xl">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="parties">
            Parties ({result.parties.length})
          </TabsTrigger>
          <TabsTrigger value="dates">
            Dates ({result.key_dates.length})
          </TabsTrigger>
          <TabsTrigger value="risks">
            Risks ({result.risks.length})
          </TabsTrigger>
          <TabsTrigger value="obligations">
            Obligations ({result.obligations.length})
          </TabsTrigger>
          <TabsTrigger value="recommendations">
            Actions ({result.recommendations.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="summary">
          <ExecutiveSummary result={result} />
        </TabsContent>

        <TabsContent value="parties">
          <PartiesInvolved parties={result.parties} />
        </TabsContent>

        <TabsContent value="dates">
          <KeyDates dates={result.key_dates} />
        </TabsContent>

        <TabsContent value="risks">
          <RiskAssessment risks={result.risks} />
        </TabsContent>

        <TabsContent value="obligations">
          <ObligationsList obligations={result.obligations} />
        </TabsContent>

        <TabsContent value="recommendations">
          <Recommendations recommendations={result.recommendations} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
