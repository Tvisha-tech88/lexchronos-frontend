"use client";

import type { StoredAnalysis } from "@/types/analysis";

const STORAGE_KEY = "lexchronos_analyses";

export function getAllAnalyses(): StoredAnalysis[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as StoredAnalysis[];
  } catch {
    return [];
  }
}

export function getAnalysis(id: string): StoredAnalysis | null {
  const all = getAllAnalyses();
  return all.find((a) => a.id === id) ?? null;
}

export function saveAnalysis(analysis: StoredAnalysis): void {
  if (typeof window === "undefined") return;
  const all = getAllAnalyses();
  const existing = all.findIndex((a) => a.id === analysis.id);
  if (existing >= 0) {
    all[existing] = analysis;
  } else {
    all.unshift(analysis);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

export function deleteAnalysis(id: string): void {
  if (typeof window === "undefined") return;
  const all = getAllAnalyses().filter((a) => a.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

export function seedDemoData(analyses: StoredAnalysis[]): void {
  if (typeof window === "undefined") return;
  const existing = getAllAnalyses();
  if (existing.length === 0) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(analyses));
  }
}
