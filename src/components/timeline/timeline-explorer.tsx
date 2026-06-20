"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Filter,
  ChevronDown,
  ChevronUp,
  FileCheck,
  Gavel,
  Scale,
  Bell,
  Layers,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate, getEventTypeColor } from "@/lib/utils";
import type { Event, Party } from "@/types/analysis";

const eventTypeConfig: Record<
  string,
  { icon: React.ElementType; label: string }
> = {
  filing: { icon: FileCheck, label: "Filing" },
  hearing: { icon: Gavel, label: "Hearing" },
  ruling: { icon: Scale, label: "Ruling" },
  agreement: { icon: Scale, label: "Agreement" },
  notice: { icon: Bell, label: "Notice" },
  other: { icon: Layers, label: "Other" },
};

const allTypes = ["filing", "hearing", "ruling", "agreement", "notice", "other"];

interface TimelineExplorerProps {
  events: Event[];
  parties: Party[];
}

export function TimelineExplorer({ events, parties }: TimelineExplorerProps) {
  const [activeTypes, setActiveTypes] = useState<string[]>([...allTypes]);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const partyMap = useMemo(
    () => new Map(parties.map((p) => [p.id, p])),
    [parties]
  );

  const filteredEvents = useMemo(() => {
    const filtered = events.filter((e) => activeTypes.includes(e.type));
    return [...filtered].sort((a, b) => {
      const diff = new Date(a.date).getTime() - new Date(b.date).getTime();
      return sortOrder === "asc" ? diff : -diff;
    });
  }, [events, activeTypes, sortOrder]);

  const toggleType = (type: string) => {
    setActiveTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Filter className="w-4 h-4" />
          <span>Filter:</span>
        </div>
        {allTypes.map((type) => {
          const config = eventTypeConfig[type];
          const colorClasses = getEventTypeColor(type);
          const isActive = activeTypes.includes(type);
          return (
            <button
              key={type}
              onClick={() => toggleType(type)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                isActive ? colorClasses : "border-border text-muted-foreground hover:border-border/60"
              }`}
            >
              {config.label}
            </button>
          );
        })}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSortOrder((o) => (o === "asc" ? "desc" : "asc"))}
          className="ml-auto text-xs gap-1.5"
        >
          {sortOrder === "asc" ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          {sortOrder === "asc" ? "Oldest first" : "Newest first"}
        </Button>
      </div>

      <div className="text-xs text-muted-foreground">
        Showing {filteredEvents.length} of {events.length} events
      </div>

      <div className="relative">
        <div
          className="absolute left-6 top-0 bottom-0 w-px bg-border"
          aria-hidden="true"
        />

        <div className="space-y-0">
          <AnimatePresence>
            {filteredEvents.map((event, i) => {
              const config = eventTypeConfig[event.type] ?? eventTypeConfig.other;
              const Icon = config.icon;
              const colorClasses = getEventTypeColor(event.type);
              const isExpanded = expandedIds.has(event.id);
              const involvedParties = event.parties_involved
                .map((id) => partyMap.get(id))
                .filter(Boolean) as Party[];

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: i * 0.04 }}
                  className="relative pl-16 pb-6"
                >
                  <div className={`absolute left-4 w-5 h-5 rounded-full border-2 bg-background flex items-center justify-center z-10 ${colorClasses} -translate-x-1/2`}>
                    <div className={`w-2 h-2 rounded-full ${colorClasses.includes("indigo") ? "bg-indigo-400" : colorClasses.includes("violet") ? "bg-violet-400" : colorClasses.includes("emerald") ? "bg-emerald-400" : colorClasses.includes("amber") ? "bg-amber-400" : "bg-slate-400"}`} />
                  </div>

                  <motion.div
                    layout
                    className={`rounded-xl border cursor-pointer transition-all duration-200 hover:shadow-md hover:shadow-black/10 ${colorClasses} ${isExpanded ? "shadow-md" : ""}`}
                    onClick={() => toggleExpand(event.id)}
                  >
                    <div className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border ${colorClasses}`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <p className="text-xs font-mono text-muted-foreground">
                              {formatDate(event.date)}
                            </p>
                            <Badge variant="outline" className={`text-[10px] ${colorClasses}`}>
                              {config.label}
                            </Badge>
                          </div>
                          <p className="text-sm font-semibold">{event.title}</p>
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 shrink-0 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                        />
                      </div>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-3 ml-10 pt-3 border-t border-current/15">
                              <p className="text-sm leading-relaxed opacity-80 mb-3">
                                {event.description}
                              </p>
                              {involvedParties.length > 0 && (
                                <div className="flex items-center gap-2 flex-wrap">
                                  <Users className="w-3.5 h-3.5 opacity-60" />
                                  {involvedParties.map((p) => (
                                    <span
                                      key={p.id}
                                      className="text-[10px] px-2 py-0.5 rounded-full bg-background/30 border border-current/20"
                                    >
                                      {p.name}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filteredEvents.length === 0 && (
            <div className="pl-16 py-12 text-center">
              <p className="text-muted-foreground text-sm">
                No events match the selected filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
