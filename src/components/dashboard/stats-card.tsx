"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  delta?: string;
  deltaPositive?: boolean;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  delay?: number;
}

export function StatsCard({
  title,
  value,
  delta,
  deltaPositive,
  icon: Icon,
  iconColor,
  iconBg,
  delay = 0,
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="p-5 rounded-xl border border-border bg-card hover:border-border/80 hover:shadow-lg hover:shadow-black/10 transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-9 h-9 rounded-lg ${iconBg} flex items-center justify-center`}>
          <Icon className={`w-4.5 h-4.5 ${iconColor}`} size={18} />
        </div>
        {delta && (
          <span
            className={cn(
              "text-xs font-medium px-2 py-0.5 rounded-full",
              deltaPositive
                ? "text-emerald-400 bg-emerald-400/10"
                : "text-red-400 bg-red-400/10"
            )}
          >
            {delta}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold tracking-tight mb-0.5">{value}</p>
      <p className="text-xs text-muted-foreground">{title}</p>
    </motion.div>
  );
}
