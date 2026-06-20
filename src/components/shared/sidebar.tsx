"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Scale,
  LayoutDashboard,
  Upload,
  Settings,
  Clock,
  FileText,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/upload", label: "Upload Document", icon: Upload },
];

const bottomItems = [
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 border-r border-border bg-card flex flex-col z-40">
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-border">
        <div className="w-8 h-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center">
          <Scale className="w-4 h-4 text-primary" />
        </div>
        <span className="font-bold text-base tracking-tight">LexChronos</span>
      </div>

      <nav className="flex-1 p-3 space-y-0.5">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              <Icon className={cn("w-4 h-4 shrink-0", isActive ? "text-primary" : "")} />
              {label}
              {isActive && (
                <ChevronRight className="w-3 h-3 ml-auto text-primary/60" />
              )}
            </Link>
          );
        })}

        <div className="pt-4 pb-2 px-3">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
            Recent
          </p>
        </div>

        <Link
          href="/analysis/demo-meridian-001"
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150",
            pathname.includes("demo-meridian-001")
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:text-foreground hover:bg-accent"
          )}
        >
          <FileText className="w-3.5 h-3.5 shrink-0 text-indigo-400" />
          <span className="truncate text-xs">Meridian v Atlas</span>
        </Link>
        <Link
          href="/analysis/demo-nda-002"
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150",
            pathname.includes("demo-nda-002")
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:text-foreground hover:bg-accent"
          )}
        >
          <FileText className="w-3.5 h-3.5 shrink-0 text-violet-400" />
          <span className="truncate text-xs">Henderson NDA</span>
        </Link>
        <Link
          href="/timeline/demo-meridian-001"
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150",
            pathname.includes("timeline")
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:text-foreground hover:bg-accent"
          )}
        >
          <Clock className="w-3.5 h-3.5 shrink-0 text-amber-400" />
          <span className="truncate text-xs">Timeline Explorer</span>
        </Link>
      </nav>

      <div className="p-3 border-t border-border space-y-0.5">
        {bottomItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </Link>
          );
        })}

        <div className="mx-3 mt-3 p-3 rounded-xl bg-primary/5 border border-primary/10">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary/40 to-violet-500/40 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary">
              T
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate">Tvisha Bansal</p>
              <p className="text-[10px] text-muted-foreground truncate">Free Plan</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
