"use client";

import Link from "next/link";
import { Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-border/50 bg-background/80 backdrop-blur-xl"
    >
      <Link href="/" className="flex items-center gap-2.5 group">
        <div className="w-8 h-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <Scale className="w-4 h-4 text-primary" />
        </div>
        <span className="font-bold text-lg tracking-tight">LexChronos</span>
      </Link>

      <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
        <Link href="/#features" className="hover:text-foreground transition-colors">Features</Link>
        <Link href="/#how-it-works" className="hover:text-foreground transition-colors">How it works</Link>
        <Link href="/#testimonials" className="hover:text-foreground transition-colors">Testimonials</Link>
        <Link href="/#faq" className="hover:text-foreground transition-colors">FAQ</Link>
      </nav>

      <div className="flex items-center gap-3">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm">Sign in</Button>
        </Link>
        <Link href="/dashboard">
          <Button size="sm">Get started</Button>
        </Link>
      </div>
    </motion.header>
  );
}
