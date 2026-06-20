"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import type { Obligation } from "@/types/analysis";

const statusConfig = {
  pending: { icon: Clock, label: "Pending", classes: "text-amber-400 bg-amber-400/10 border-amber-400/20" },
  completed: { icon: CheckCircle2, label: "Completed", classes: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" },
  overdue: { icon: AlertCircle, label: "Overdue", classes: "text-red-400 bg-red-400/10 border-red-400/20" },
};

interface ObligationsListProps {
  obligations: Obligation[];
}

export function ObligationsList({ obligations }: ObligationsListProps) {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-base flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          Obligations ({obligations.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2.5">
          {obligations.map((ob, i) => {
            const config = statusConfig[ob.status];
            const StatusIcon = config.icon;

            return (
              <motion.div
                key={ob.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex items-start gap-3 p-3.5 rounded-xl border border-border bg-secondary/50"
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border ${config.classes}`}>
                  <StatusIcon className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-xs font-semibold text-muted-foreground">{ob.party}</p>
                    <Badge variant="outline" className={`text-[10px] border ${config.classes}`}>
                      {config.label}
                    </Badge>
                  </div>
                  <p className="text-sm">{ob.description}</p>
                  {ob.due_date && (
                    <p className="text-xs text-muted-foreground mt-1 font-mono">
                      Due: {formatDate(ob.due_date)}
                    </p>
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
