import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 60;
import { analyzeDocument } from "@/lib/ai";
import { AnalysisResultSchema } from "@/types/analysis";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { text?: string; filename?: string };
    const { text, filename } = body;

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Missing required field: text" },
        { status: 400 }
      );
    }

    if (!text.trim()) {
      return NextResponse.json(
        { error: "Text content is empty" },
        { status: 400 }
      );
    }

    const safeFilename = typeof filename === "string" ? filename : "document.pdf";

    const result = await analyzeDocument(text, safeFilename);

    const parsed = AnalysisResultSchema.safeParse(result);
    if (!parsed.success) {
      console.error("Schema validation failed:", parsed.error);
      return NextResponse.json({ result }, { status: 200 });
    }

    return NextResponse.json({ result: parsed.data }, { status: 200 });
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Analysis failed" },
      { status: 500 }
    );
  }
}
