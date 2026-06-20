"use client";

let workerInitialized = false;

async function ensureWorker() {
  if (workerInitialized) return;
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
  workerInitialized = true;
}

export async function extractTextFromPDF(file: File): Promise<{ text: string; pageCount: number }> {
  await ensureWorker();
  const pdfjs = await import("pdfjs-dist");

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;

  const pages: string[] = [];

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const textContent = await page.getTextContent();

    const pageText = textContent.items
      .filter((item): item is import("pdfjs-dist/types/src/display/api").TextItem =>
        "str" in item
      )
      .map((item) => item.str)
      .filter((str) => str.trim().length > 0)
      .join(" ");

    if (pageText.trim()) {
      pages.push(pageText);
    }
  }

  return {
    text: pages.join("\n\n"),
    pageCount: pdf.numPages,
  };
}
