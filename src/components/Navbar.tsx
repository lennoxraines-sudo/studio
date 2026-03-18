"use client";

import Link from "next/link";
import { Search, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SettingsDialog } from "./SettingsDialog";

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function Navbar({ searchQuery, setSearchQuery }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border px-4 md:px-8 py-4 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2 group shrink-0">
        <div className="bg-primary p-2 rounded-2xl text-primary-foreground group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">
          <Zap className="w-6 h-6 fill-current" />
        </div>
        <div className="hidden sm:flex flex-col md:flex-row md:items-baseline md:gap-2">
          <span className="font-headline font-bold text-xl md:text-2xl tracking-tight text-primary">
            YOYO&apos;S<span className="text-accent">NETWORK</span>
          </span>
          <span className="text-[10px] md:text-xs text-muted-foreground font-medium uppercase tracking-widest">
            by Lennox
          </span>
        </div>
      </Link>

      <div className="flex-1 flex justify-center max-w-xl px-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="text"
            placeholder="Search network..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-secondary/50 border-none focus-visible:ring-primary h-10 md:h-12 text-base rounded-2xl w-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <SettingsDialog />
      </div>
    </nav>
  );
}
