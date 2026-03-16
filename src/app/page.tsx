"use client";

import { useState, useMemo } from "react";
import gamesData from "./data/games.json";
import { Navbar } from "@/components/Navbar";
import { GameCard, type Game } from "@/components/GameCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  const categories = ["All", ...Array.from(new Set(gamesData.map((g) => g.category)))];

  const filteredGames = useMemo(() => {
    return (gamesData as Game[]).filter((game) => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            game.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeTab === "All" || game.category === activeTab;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeTab]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-8 md:py-12">
        <header className="mb-12">
          <div className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent font-bold text-sm mb-4 uppercase tracking-widest">
            Unblocked & Fun
          </div>
          <h1 className="text-4xl md:text-6xl font-headline font-bold mb-6 text-primary leading-tight">
            Escape the ordinary.<br />
            Enter the <span className="text-accent underline decoration-4 underline-offset-8">Network.</span>
          </h1>
          
          <div className="mt-8">
            <Tabs defaultValue="All" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-secondary/40 p-1.5 h-auto rounded-3xl flex-wrap justify-start border border-border/50">
                {categories.map((cat) => (
                  <TabsTrigger 
                    key={cat} 
                    value={cat}
                    className="rounded-2xl px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold transition-all"
                  >
                    {cat}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </header>

        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {filteredGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary mb-6">
              <span className="text-4xl">🕹️</span>
            </div>
            <h2 className="text-2xl font-headline font-bold mb-2">No games found</h2>
            <p className="text-muted-foreground">Try adjusting your search or category filters.</p>
          </div>
        )}
      </main>

      <footer className="bg-card/50 border-t border-border py-10 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="font-headline font-bold text-xl tracking-tight text-primary">
              YOYO&apos;S<span className="text-accent">NETWORK</span>
            </span>
          </div>
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Yoyo&apos;s Network. Play anytime, anywhere.
          </p>
          <div className="flex gap-6 text-sm font-medium text-primary">
            <a href="#" className="hover:text-accent transition-colors">About</a>
            <a href="#" className="hover:text-accent transition-colors">Privacy</a>
            <a href="#" className="hover:text-accent transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
