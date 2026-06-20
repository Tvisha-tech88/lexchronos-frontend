import type { AnalysisResult } from "@/types/analysis";
import { mockAnalysis } from "./mock-data";

const ANALYSIS_PROMPT = `You are an expert legal analyst with decades of experience in contract law, litigation, and legal document review. Analyze the provided legal document text and extract structured information.

Return a valid JSON object with EXACTLY this structure — no markdown, no code blocks, just raw JSON:

{
  "summary": "A comprehensive 2-3 paragraph executive summary covering the nature of the document, key parties, central legal issues, important dates, and strategic considerations",
  "parties": [
    {
      "id": "p1",
      "name": "Full legal name",
      "role": "Their role (e.g. Plaintiff, Defendant, Lessor, Employee)",
      "type": "individual or company or government",
      "mentioned_count": 0
    }
  ],
  "key_dates": [
    {
      "id": "d1",
      "date": "YYYY-MM-DD",
      "description": "Clear description of what this date represents",
      "type": "filing or hearing or deadline or agreement or event",
      "importance": "high or medium or low"
    }
  ],
  "events": [
    {
      "id": "e1",
      "date": "YYYY-MM-DD",
      "title": "Concise event title",
      "description": "2-3 sentence description of the event and its legal significance",
      "type": "filing or hearing or ruling or agreement or notice or other",
      "parties_involved": ["p1", "p2"]
    }
  ],
  "obligations": [
    {
      "id": "o1",
      "party": "Party name",
      "description": "Specific obligation or duty",
      "due_date": "YYYY-MM-DD or null",
      "status": "pending or completed or overdue"
    }
  ],
  "risks": [
    {
      "id": "r1",
      "title": "Risk title",
      "description": "Detailed risk description and potential impact",
      "severity": "high or medium or low",
      "category": "contractual or regulatory or financial or operational or legal"
    }
  ],
  "recommendations": [
    {
      "id": "rec1",
      "title": "Action title",
      "description": "Specific, actionable recommendation with clear steps",
      "priority": "urgent or high or medium or low",
      "action_type": "immediate_action or review or monitor or consult"
    }
  ]
}

Be thorough and precise. Extract ALL dates, parties, and events present in the document. Identify real risks and provide actionable recommendations. Use professional legal language.`;

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
  }>;
  error?: {
    code: number;
    message: string;
    status: string;
  };
}

function buildMockResponse(filename: string): AnalysisResult {
  const base = mockAnalysis.result!;
  return {
    ...base,
    summary: `Analysis of "${filename}": ${base.summary}`,
  };
}

const RETRYABLE_CODES = new Set([429, 500, 502, 503, 504]);
const MAX_RETRIES = 3;

async function callGemini(url: string, body: object): Promise<GeminiResponse> {
  let lastError: Error | null = null;
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    if (attempt > 0) {
      await new Promise((r) => setTimeout(r, 1000 * 2 ** attempt));
    }
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = (await response.json()) as GeminiResponse;
    if (response.ok && !data.error) return data;
    const code = data.error?.code ?? response.status;
    if (!RETRYABLE_CODES.has(code)) {
      throw new Error(`Gemini API error ${code}: ${data.error?.message ?? response.statusText}`);
    }
    lastError = new Error(`Gemini API error ${code}: ${data.error?.message ?? response.statusText}`);
  }
  throw lastError ?? new Error("Gemini API failed after retries");
}

export async function analyzeDocument(
  text: string,
  filename: string
): Promise<AnalysisResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";

  if (!apiKey) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return buildMockResponse(filename);
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  // Keep to ~25k tokens to avoid timeouts on large PDFs
  const truncatedText = text.slice(0, 100000);

  const data = await callGemini(url, {
    system_instruction: {
      parts: [{ text: ANALYSIS_PROMPT }],
    },
    contents: [
      {
        parts: [
          {
            text: `Analyze this legal document and return structured JSON only.\n\nFilename: ${filename}\n\n${truncatedText}`,
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.1,
      maxOutputTokens: 16384,
      responseMimeType: "application/json",
      thinkingConfig: {
        thinkingBudget: 0,
      },
    },
  });

  const content = data.candidates?.[0]?.content?.parts?.find((p) => !("thought" in p))?.text;

  if (!content) {
    throw new Error("No content returned from Gemini API");
  }

  const parsed = JSON.parse(content) as AnalysisResult;
  return parsed;
}
