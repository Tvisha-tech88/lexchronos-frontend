"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, ChevronDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getSeverityColor } from "@/lib/utils";
import type { Risk } from "@/types/analysis";

interface RiskCardProps {
  risk: Risk;
  index: number;
}

function RiskCard({ risk, index }: RiskCardProps) {
  const [expanded, setExpanded] = useState(false);
  const colors = getSeverityColor(risk.severity);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`rounded-xl border transition-all duration-200 ${colors}`}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-start gap-3 p-4 text-left"
      >
        <ShieldAlert className="w-4 h-4 mt-0.5 shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <p className="text-sm font-semibold">{risk.title}</p>
            <Badge variant="outline" className={`text-[10px] capitalize ${colors}`}>
              {risk.category}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-semibold uppercase tracking-wider`}>
              {risk.severity} severity
            </span>
          </div>
        </div>
        <ChevronDown
          className={`w-4 h-4 shrink-0 transition-transform mt-0.5 ${expanded ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-0">
              <div className="h-px bg-current opacity-15 mb-3" />
              <p className="text-sm leading-relaxed opacity-80">{risk.description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface RiskAssessmentProps {
  risks: Risk[];
}

export function RiskAssessment({ risks }: RiskAssessmentProps) {
  const sorted = [...risks].sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2 };
    return order[a.severity] - order[b.severity];
  });

  const highCount = risks.filter((r) => r.severity === "high").length;
  const medCount = risks.filter((r) => r.severity === "medium").length;
  const lowCount = risks.filter((r) => r.severity === "low").length;

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-red-400" />
            Risk Assessment ({risks.length})
          </CardTitle>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-red-400 font-semibold">{highCount}H</span>
            <span className="text-amber-400 font-semibold">{medCount}M</span>
            <span className="text-emerald-400 font-semibold">{lowCount}L</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2.5">
          {sorted.map((risk, i) => (
            <RiskCard key={risk.id} risk={risk} index={i} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
