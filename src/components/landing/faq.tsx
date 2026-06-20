"use client";

import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "What types of legal documents can LexChronos analyze?",
    answer:
      "LexChronos handles any legal PDF — contracts, court orders, case filings, NDAs, employment agreements, affidavits, lease agreements, merger documents, and more. If it's a text-based PDF, we can analyze it.",
  },
  {
    question: "How secure is my data?",
    answer:
      "Your documents are processed in memory and never persisted on our servers. We use end-to-end encryption for all API calls. In the MVP, extracted text is only sent to Azure OpenAI (Microsoft's enterprise-grade, SOC 2 compliant infrastructure) and your analysis results are stored only in your browser's local storage.",
  },
  {
    question: "How accurate is the AI analysis?",
    answer:
      "LexChronos uses GPT-4o, which achieves state-of-the-art accuracy on legal document comprehension tasks. The AI is instructed to extract only what's explicitly present in the document. That said, always review AI output with professional legal judgment — LexChronos is a tool to accelerate review, not replace it.",
  },
  {
    question: "Can I export the analysis?",
    answer:
      "Yes. From any analysis page, you can export the full structured report as JSON or print it as a formatted PDF. The export includes the executive summary, full timeline, all dates, parties, risks, and recommendations.",
  },
  {
    question: "What AI model powers LexChronos?",
    answer:
      "LexChronos is built on Azure OpenAI's GPT-4o deployment, Microsoft's enterprise-grade API offering with enhanced privacy protections. You can configure your own Azure OpenAI credentials in Settings to use your organization's deployment.",
  },
  {
    question: "Is there a document size limit?",
    answer:
      "The current MVP supports PDFs up to 100MB and up to 500 pages. For very long documents, the system intelligently truncates to the most relevant 100,000 characters while preserving document structure. Support for larger documents is coming in the next release.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
            FAQ
          </p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
            Common questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about LexChronos.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="space-y-0">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-border">
                <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline hover:text-primary transition-colors py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
