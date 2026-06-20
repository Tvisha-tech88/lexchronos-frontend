"use client";

import { motion } from "framer-motion";
import { Building2, User, Landmark } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Party } from "@/types/analysis";

const typeConfig = {
  individual: { icon: User, color: "text-violet-400", bg: "bg-violet-400/10" },
  company: { icon: Building2, color: "text-indigo-400", bg: "bg-indigo-400/10" },
  government: { icon: Landmark, color: "text-amber-400", bg: "bg-amber-400/10" },
};

interface PartiesInvolvedProps {
  parties: Party[];
}

export function PartiesInvolved({ parties }: PartiesInvolvedProps) {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-base">Parties Involved</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {parties.map((party, i) => {
            const config = typeConfig[party.type];
            const Icon = config.icon;
            return (
              <motion.div
                key={party.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex items-start gap-3 p-3 rounded-xl bg-secondary/50 border border-border hover:border-border/80 transition-colors"
              >
                <div className={`w-9 h-9 rounded-lg ${config.bg} flex items-center justify-center shrink-0`}>
                  <Icon className={`w-4 h-4 ${config.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-medium truncate">{party.name}</p>
                    <Badge variant="outline" className="text-[10px] shrink-0">
                      {party.role}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground capitalize mt-0.5">
                    {party.type} · {party.mentioned_count} mentions
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
