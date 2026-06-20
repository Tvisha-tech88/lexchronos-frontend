"use client";

import { motion } from "framer-motion";
import { Lightbulb, Zap, Eye, MonitorDot, MessageSquareWarning } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getPriorityColor } from "@/lib/utils";
import type { Recommendation } from "@/types/analysis";

const actionTypeConfig = {
  immediate_action: { icon: Zap, label: "Immediate Action" },
  review: { icon: Eye, label: "Review" },
  monitor: { icon: MonitorDot, label: "Monitor" },
  consult: { icon: MessageSquareWarning, label: "Consult" },
};

interface RecommendationsProps {
  recommendations: Recommendation[];
}

export function Recommendations({ recommendations }: RecommendationsProps) {
  const sorted = [...recommendations].sort((a, b) => {
    const order = { urgent: 0, high: 1, medium: 2, low: 3 };
    return order[a.priority] - order[b.priority];
  });

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-base flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-400" />
          Recommendations ({recommendations.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {sorted.map((rec, i) => {
            const priorityColors = getPriorityColor(rec.priority);
            const actionConfig = actionTypeConfig[rec.action_type];
            const ActionIcon = actionConfig.icon;

            return (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="p-4 rounded-xl border border-border bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border ${priorityColors}`}>
                    <ActionIcon className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1.5">
                      <p className="text-sm font-semibold">{rec.title}</p>
                      <Badge
                        variant="outline"
                        className={`text-[10px] capitalize ${priorityColors}`}
                      >
                        {rec.priority}
                      </Badge>
                      <Badge variant="outline" className="text-[10px]">
                        {actionConfig.label}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {rec.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
