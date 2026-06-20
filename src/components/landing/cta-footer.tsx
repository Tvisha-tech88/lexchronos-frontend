"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Scale, ArrowRight, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTAFooter() {
  return (
    <>
      <section className="py-24 px-6 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-radial from-primary/8 via-transparent to-transparent pointer-events-none"
          aria-hidden="true"
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center relative"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/15 border border-primary/30 mb-6">
            <Scale className="w-7 h-7 text-primary" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
            Ready to transform how you{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
              read legal documents?
            </span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Upload your first document for free. No credit card. No account required to try the demo.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/upload">
              <Button size="xl" className="group">
                Analyze your first document
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/analysis/demo-meridian-001">
              <Button size="xl" variant="outline">
                Explore live demo
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center">
              <Scale className="w-3.5 h-3.5 text-primary" />
            </div>
            <span className="font-bold text-sm">LexChronos</span>
          </div>

          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Security</Link>
            <Link href="https://github.com" className="hover:text-foreground transition-colors flex items-center gap-1">
              <Github className="w-3 h-3" />
              GitHub
            </Link>
          </div>

          <p className="text-xs text-muted-foreground">
            © 2024 LexChronos. Built with Next.js & Azure OpenAI.
          </p>
        </div>
      </footer>
    </>
  );
}
