"use client";

import { motion } from "framer-motion";
import { Calendar, AlertTriangle, Info, Gavel, FileCheck, Scale } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate, getDateTypeColor } from "@/lib/utils";
import type { KeyDate } from "@/types/analysis";

const typeIcons = {
  filing: FileCheck,
  hearing: Gavel,
  deadline: AlertTriangle,
  agreement: Scale,
  event: Calendar,
};

interface KeyDatesProps {
  dates: KeyDate[];
}

export function KeyDates({ dates }: KeyDatesProps) {
  const sorted = [...dates].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-base flex items-center gap-2">
          <Calendar className="w-4 h-4 text-primary" />
          Key Dates ({dates.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {sorted.map((date, i) => {
            const Icon = typeIcons[date.type] ?? Info;
            const colorClasses = getDateTypeColor(date.type);

            return (
              <motion.div
                key={date.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="flex items-start gap-3 p-3 rounded-xl bg-secondary/50 border border-border hover:bg-secondary transition-colors"
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${colorClasses}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium font-mono text-muted-foreground mb-0.5">
                    {formatDate(date.date)}
                  </p>
                  <p className="text-sm">{date.description}</p>
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <Badge
                    variant="outline"
                    className={`text-[10px] capitalize ${colorClasses}`}
                  >
                    {date.type}
                  </Badge>
                  {date.importance === "high" && (
                    <span className="text-[10px] text-red-400 font-medium">High</span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
