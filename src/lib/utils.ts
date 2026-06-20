import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDateShort(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function generateId(): string {
  return crypto.randomUUID();
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "…";
}

export function getSeverityColor(severity: "high" | "medium" | "low"): string {
  switch (severity) {
    case "high":
      return "text-red-400 bg-red-400/10 border-red-400/20";
    case "medium":
      return "text-amber-400 bg-amber-400/10 border-amber-400/20";
    case "low":
      return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
  }
}

export function getPriorityColor(priority: "urgent" | "high" | "medium" | "low"): string {
  switch (priority) {
    case "urgent":
      return "text-red-400 bg-red-400/10 border-red-400/20";
    case "high":
      return "text-orange-400 bg-orange-400/10 border-orange-400/20";
    case "medium":
      return "text-amber-400 bg-amber-400/10 border-amber-400/20";
    case "low":
      return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
  }
}

export function getEventTypeColor(type: string): string {
  switch (type) {
    case "filing":
      return "text-indigo-400 bg-indigo-400/10 border-indigo-400/20";
    case "hearing":
      return "text-violet-400 bg-violet-400/10 border-violet-400/20";
    case "ruling":
      return "text-purple-400 bg-purple-400/10 border-purple-400/20";
    case "agreement":
      return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
    case "notice":
      return "text-amber-400 bg-amber-400/10 border-amber-400/20";
    default:
      return "text-slate-400 bg-slate-400/10 border-slate-400/20";
  }
}

export function getDateTypeColor(type: string): string {
  switch (type) {
    case "deadline":
      return "text-red-400 bg-red-400/10 border-red-400/20";
    case "hearing":
      return "text-violet-400 bg-violet-400/10 border-violet-400/20";
    case "filing":
      return "text-indigo-400 bg-indigo-400/10 border-indigo-400/20";
    case "agreement":
      return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
    default:
      return "text-slate-400 bg-slate-400/10 border-slate-400/20";
  }
}
