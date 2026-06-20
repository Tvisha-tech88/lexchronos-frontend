"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Settings, Key, Server, Save, CheckCircle2, Trash2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { deleteAnalysis, getAllAnalyses } from "@/lib/storage";
import type { StoredAnalysis } from "@/types/analysis";

const SETTINGS_KEY = "lexchronos_settings";

interface AppSettings {
  geminiApiKey: string;
  geminiModel: string;
}

function loadSettings(): AppSettings {
  if (typeof window === "undefined") return { geminiApiKey: "", geminiModel: "gemini-2.5-flash" };
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    return raw ? (JSON.parse(raw) as AppSettings) : { geminiApiKey: "", geminiModel: "gemini-2.5-flash" };
  } catch {
    return { geminiApiKey: "", geminiModel: "gemini-2.5-flash" };
  }
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<AppSettings>({ geminiApiKey: "", geminiModel: "gemini-2.5-flash" });
  const [saved, setSaved] = useState(false);
  const [analyses, setAnalyses] = useState<StoredAnalysis[]>([]);

  useEffect(() => {
    setSettings(loadSettings());
    setAnalyses(getAllAnalyses());
  }, []);

  const handleSave = () => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleClearAll = () => {
    if (!confirm("Delete all saved analyses? This cannot be undone.")) return;
    analyses.forEach((a) => deleteAnalysis(a.id));
    setAnalyses([]);
    localStorage.removeItem("lexchronos_analyses");
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-3"
      >
        <div className="w-10 h-10 rounded-xl bg-secondary border border-border flex items-center justify-center">
          <Settings className="w-5 h-5 text-muted-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-sm text-muted-foreground">Configure your API credentials and preferences</p>
        </div>
      </motion.div>

      <div className="max-w-2xl space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Key className="w-4 h-4 text-primary" />
                Google Gemini Configuration
              </CardTitle>
              <CardDescription>
                Your Gemini API key is already configured via <code className="text-xs bg-secondary px-1.5 py-0.5 rounded">.env.local</code>.
                You can override it here for testing — these values are stored only in your browser.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20 flex items-center gap-2 text-sm text-emerald-400">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                Gemini API key is active via environment variable.
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="apikey">API Key Override (optional)</Label>
                <Input
                  id="apikey"
                  type="password"
                  placeholder="AIzaSy..."
                  value={settings.geminiApiKey}
                  onChange={(e) => setSettings((s) => ({ ...s, geminiApiKey: e.target.value }))}
                />
                <p className="text-xs text-muted-foreground">
                  Leave blank to use the key set in <code className="bg-secondary px-1 rounded">.env.local</code>.
                </p>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="model">Model</Label>
                <Input
                  id="model"
                  placeholder="gemini-2.5-flash"
                  value={settings.geminiModel}
                  onChange={(e) => setSettings((s) => ({ ...s, geminiModel: e.target.value }))}
                />
                <p className="text-xs text-muted-foreground">
                  Recommended: <code className="bg-secondary px-1 rounded">gemini-2.5-flash</code> (fast) or{" "}
                  <code className="bg-secondary px-1 rounded">gemini-1.5-pro</code> (more thorough).
                </p>
              </div>

              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
              >
                <ExternalLink className="w-3 h-3" />
                Manage keys in Google AI Studio
              </a>

              <Button onClick={handleSave} className="gap-2 mt-2">
                {saved ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Saved!
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save settings
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Server className="w-4 h-4 text-muted-foreground" />
                Data Management
              </CardTitle>
              <CardDescription>
                Manage your locally stored analyses. All data is stored in your browser.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-secondary/50">
                <div>
                  <p className="text-sm font-medium">{analyses.length} analyses stored</p>
                  <p className="text-xs text-muted-foreground">Stored in localStorage</p>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleClearAll}
                  disabled={analyses.length === 0}
                  className="gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Clear all
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Separator />
          <div className="pt-4">
            <p className="text-xs text-muted-foreground text-center">
              LexChronos v0.1.0 · Next.js 15 · Powered by Google Gemini 2.0 Flash
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
