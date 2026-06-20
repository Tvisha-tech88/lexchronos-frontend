import { z } from "zod";

export const PartySchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  type: z.enum(["individual", "company", "government"]),
  mentioned_count: z.number(),
});

export const KeyDateSchema = z.object({
  id: z.string(),
  date: z.string(),
  description: z.string(),
  type: z.enum(["filing", "hearing", "deadline", "agreement", "event"]),
  importance: z.enum(["high", "medium", "low"]),
});

export const EventSchema = z.object({
  id: z.string(),
  date: z.string(),
  title: z.string(),
  description: z.string(),
  type: z.enum(["filing", "hearing", "ruling", "agreement", "notice", "other"]),
  parties_involved: z.array(z.string()),
});

export const ObligationSchema = z.object({
  id: z.string(),
  party: z.string(),
  description: z.string(),
  due_date: z.string().nullable(),
  status: z.enum(["pending", "completed", "overdue"]),
});

export const RiskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  severity: z.enum(["high", "medium", "low"]),
  category: z.enum(["contractual", "regulatory", "financial", "operational", "legal"]),
});

export const RecommendationSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  priority: z.enum(["urgent", "high", "medium", "low"]),
  action_type: z.enum(["immediate_action", "review", "monitor", "consult"]),
});

export const AnalysisResultSchema = z.object({
  summary: z.string(),
  parties: z.array(PartySchema),
  key_dates: z.array(KeyDateSchema),
  events: z.array(EventSchema),
  obligations: z.array(ObligationSchema),
  risks: z.array(RiskSchema),
  recommendations: z.array(RecommendationSchema),
});

export type Party = z.infer<typeof PartySchema>;
export type KeyDate = z.infer<typeof KeyDateSchema>;
export type Event = z.infer<typeof EventSchema>;
export type Obligation = z.infer<typeof ObligationSchema>;
export type Risk = z.infer<typeof RiskSchema>;
export type Recommendation = z.infer<typeof RecommendationSchema>;
export type AnalysisResult = z.infer<typeof AnalysisResultSchema>;

export interface StoredAnalysis {
  id: string;
  filename: string;
  fileSize: number;
  pageCount: number;
  createdAt: string;
  status: "processing" | "completed" | "failed";
  result: AnalysisResult | null;
  error?: string;
}

export interface AnalyzeRequest {
  text: string;
  filename: string;
}

export interface AnalyzeResponse {
  analysis: StoredAnalysis;
}
