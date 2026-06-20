"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { extractTextFromPDF } from "@/lib/pdf-extractor";
import { saveAnalysis } from "@/lib/storage";
import { generateId, formatFileSize } from "@/lib/utils";

type UploadState =
  | { phase: "idle" }
  | { phase: "validating"; file: File }
  | { phase: "extracting"; file: File; progress: number }
  | { phase: "analyzing"; file: File; pageCount: number }
  | { phase: "complete"; analysisId: string }
  | { phase: "error"; message: string };

export function DropZone() {
  const router = useRouter();
  const [state, setState] = useState<UploadState>({ phase: "idle" });
  const [isDragging, setIsDragging] = useState(false);

  const processFile = useCallback(async (file: File) => {
    if (!file.name.toLowerCase().endsWith(".pdf")) {
      setState({ phase: "error", message: "Only PDF files are supported." });
      return;
    }
    if (file.size > 100 * 1024 * 1024) {
      setState({ phase: "error", message: "File size exceeds the 100MB limit." });
      return;
    }

    setState({ phase: "validating", file });

    try {
      setState({ phase: "extracting", file, progress: 10 });

      const { text, pageCount } = await extractTextFromPDF(file);

      if (!text.trim()) {
        setState({ phase: "error", message: "No text could be extracted from this PDF. It may be image-only or password-protected." });
        return;
      }

      setState({ phase: "analyzing", file, pageCount });

      const analysisId = generateId();

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, filename: file.name }),
      });

      if (!response.ok) {
        const err = await response.json() as { error?: string };
        throw new Error(err.error ?? "Analysis failed");
      }

      const data = await response.json() as { result: unknown };

      saveAnalysis({
        id: analysisId,
        filename: file.name,
        fileSize: file.size,
        pageCount,
        createdAt: new Date().toISOString(),
        status: "completed",
        result: data.result as import("@/types/analysis").AnalysisResult,
      });

      setState({ phase: "complete", analysisId });
      setTimeout(() => router.push(`/analysis/${analysisId}`), 800);
    } catch (err) {
      setState({
        phase: "error",
        message: err instanceof Error ? err.message : "An unexpected error occurred.",
      });
    }
  }, [router]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const getProgressValue = () => {
    switch (state.phase) {
      case "validating": return 15;
      case "extracting": return 40;
      case "analyzing": return 75;
      case "complete": return 100;
      default: return 0;
    }
  };

  const getPhaseLabel = () => {
    switch (state.phase) {
      case "validating": return "Validating file...";
      case "extracting": return "Extracting text from PDF...";
      case "analyzing": return "AI is analyzing your document...";
      case "complete": return "Analysis complete! Redirecting...";
      default: return "";
    }
  };

  const isProcessing = ["validating", "extracting", "analyzing", "complete"].includes(state.phase);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <AnimatePresence mode="wait">
        {state.phase === "idle" || state.phase === "error" ? (
          <motion.div
            key="idle"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`relative flex flex-col items-center justify-center gap-4 p-12 rounded-2xl border-2 border-dashed transition-all duration-200 cursor-pointer ${
              isDragging
                ? "border-primary bg-primary/5 scale-[1.01]"
                : "border-border hover:border-primary/50 hover:bg-primary/3"
            }`}
            onClick={() => document.getElementById("file-input")?.click()}
          >
            <input
              id="file-input"
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={handleFileInput}
            />

            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors ${isDragging ? "bg-primary/20 border border-primary/40" : "bg-secondary border border-border"}`}>
              <Upload className={`w-8 h-8 transition-colors ${isDragging ? "text-primary" : "text-muted-foreground"}`} />
            </div>

            <div className="text-center">
              <p className="font-semibold text-lg mb-1">
                {isDragging ? "Drop your PDF here" : "Upload a legal document"}
              </p>
              <p className="text-sm text-muted-foreground">
                Drag & drop or click to browse · PDF only · Max 100MB
              </p>
            </div>

            {state.phase === "error" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                {state.message}
              </motion.div>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={(e) => { e.stopPropagation(); document.getElementById("file-input")?.click(); }}
            >
              <FileText className="w-4 h-4" />
              Browse files
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="processing"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col items-center gap-6 p-12 rounded-2xl border border-border bg-card"
          >
            <div className="relative">
              {state.phase === "complete" ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-16 h-16 rounded-full bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center"
                >
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </motion.div>
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
              )}
            </div>

            <div className="text-center w-full max-w-sm">
              <p className="font-semibold mb-1">{getPhaseLabel()}</p>
              {"file" in state && (
                <p className="text-sm text-muted-foreground mb-4 truncate">{state.file.name}</p>
              )}
              <Progress value={getProgressValue()} className="h-1.5" />
              <p className="text-xs text-muted-foreground mt-2">{getProgressValue()}% complete</p>
            </div>

            <div className="flex gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <div className={`w-1.5 h-1.5 rounded-full ${["validating", "extracting", "analyzing", "complete"].includes(state.phase) ? "bg-emerald-400" : "bg-border"}`} />
                Validated
              </div>
              <div className="flex items-center gap-1.5">
                <div className={`w-1.5 h-1.5 rounded-full ${["extracting", "analyzing", "complete"].includes(state.phase) ? "bg-emerald-400" : "bg-border"}`} />
                Extracted
              </div>
              <div className="flex items-center gap-1.5">
                <div className={`w-1.5 h-1.5 rounded-full ${["analyzing", "complete"].includes(state.phase) ? "bg-primary animate-pulse" : state.phase === "complete" ? "bg-emerald-400" : "bg-border"}`} />
                Analyzing
              </div>
              <div className="flex items-center gap-1.5">
                <div className={`w-1.5 h-1.5 rounded-full ${state.phase === "complete" ? "bg-emerald-400" : "bg-border"}`} />
                Done
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
