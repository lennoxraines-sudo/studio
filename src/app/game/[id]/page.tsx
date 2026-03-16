
"use client";

import { useState, useRef, useEffect, use } from "react";
import Link from "next/link";
import { ArrowLeft, Maximize, Minimize, Share2, Info } from "lucide-react";
import gamesData from "../../data/games.json";
import { type Game } from "@/components/GameCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function GamePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [game, setGame] = useState<Game | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const foundGame = gamesData.find((g) => g.id === id);
    if (foundGame) {
      setGame(foundGame as Game);
    }
  }, [id]);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading Game...</h2>
          <Link href="/" className="text-primary hover:underline">Go back home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <nav className="p-4 md:p-6 border-b bg-white flex items-center justify-between">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-primary hover:text-accent transition-colors font-bold group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>BACK TO ARCADE</span>
        </Link>
        <div className="hidden md:block">
          <span className="font-headline font-bold text-xl tracking-tight text-primary">
            ARCADE<span className="text-accent">ESCAPE</span>
          </span>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" size="icon" className="rounded-full">
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </nav>

      <main className="flex-1 flex flex-col p-4 md:p-8 max-w-6xl mx-auto w-full">
        <div ref={containerRef} className={`relative rounded-3xl overflow-hidden shadow-2xl bg-black ${isFullscreen ? 'w-full h-full rounded-none' : ''}`}>
          <div className="iframe-container">
            <iframe
              src={game.iframeUrl}
              title={game.title}
              allowFullScreen
              className="bg-black"
            />
          </div>
          
          <div className={`absolute bottom-6 right-6 flex gap-2 transition-opacity ${isFullscreen ? 'opacity-100' : 'opacity-0 hover:opacity-100'}`}>
            <Button 
              onClick={toggleFullscreen} 
              className="bg-white/20 hover:bg-white/30 backdrop-blur-md border-none text-white rounded-xl h-12 px-6 shadow-lg"
            >
              {isFullscreen ? (
                <>
                  <Minimize className="w-5 h-5 mr-2" /> EXIT FULLSCREEN
                </>
              ) : (
                <>
                  <Maximize className="w-5 h-5 mr-2" /> FULLSCREEN
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary">
                {game.title}
              </h1>
              <Badge className="bg-accent hover:bg-accent px-4 py-1.5 rounded-full uppercase tracking-wider font-bold">
                {game.category}
              </Badge>
            </div>
            <Card className="p-6 md:p-8 rounded-3xl border-none shadow-sm bg-white">
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-primary/10 p-3 rounded-2xl text-primary">
                  <Info className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-headline font-bold text-xl mb-2">How to Play</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {game.description}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6 border-t">
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase mb-1">Status</p>
                  <p className="font-bold text-green-500 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    ONLINE
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase mb-1">Plays</p>
                  <p className="font-bold">2.5k+</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase mb-1">Rating</p>
                  <p className="font-bold">4.8 / 5.0</p>
                </div>
              </div>
            </Card>
          </div>

          <aside className="lg:col-span-1">
             <Card className="p-6 rounded-3xl border-none shadow-sm bg-primary/5">
                <h3 className="font-headline font-bold text-xl mb-4 text-primary">Controls</h3>
                <ul className="space-y-4">
                  <li className="flex justify-between items-center bg-white p-3 rounded-xl shadow-sm">
                    <span className="text-sm font-medium text-muted-foreground">Move</span>
                    <span className="bg-secondary px-3 py-1 rounded-lg text-sm font-bold">Arrow Keys</span>
                  </li>
                  <li className="flex justify-between items-center bg-white p-3 rounded-xl shadow-sm">
                    <span className="text-sm font-medium text-muted-foreground">Jump / Action</span>
                    <span className="bg-secondary px-3 py-1 rounded-lg text-sm font-bold">Space</span>
                  </li>
                  <li className="flex justify-between items-center bg-white p-3 rounded-xl shadow-sm">
                    <span className="text-sm font-medium text-muted-foreground">Pause</span>
                    <span className="bg-secondary px-3 py-1 rounded-lg text-sm font-bold">Esc / P</span>
                  </li>
                </ul>
                <div className="mt-8 p-4 bg-accent/10 rounded-2xl border border-accent/20">
                  <p className="text-xs font-bold text-accent uppercase mb-2">Pro Tip</p>
                  <p className="text-sm text-accent leading-snug">
                    Use Fullscreen mode for the most immersive arcade experience and better performance!
                  </p>
                </div>
             </Card>
          </aside>
        </div>
      </main>
    </div>
  );
}
