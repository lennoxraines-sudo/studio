
"use client";

import { useState, useRef, useEffect, use } from "react";
import Link from "next/link";
import { ArrowLeft, Maximize, Minimize, Share2, Info, MousePointer2 } from "lucide-react";
import gamesData from "../../data/games.json";
import { type Game } from "@/components/GameCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function GamePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [game, setGame] = useState<Game | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPointerLocked, setIsPointerLocked] = useState(false);
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

  const requestLock = () => {
    if (containerRef.current && isFullscreen) {
      containerRef.current.requestPointerLock();
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      const isFs = !!document.fullscreenElement;
      setIsFullscreen(isFs);
      if (!isFs && document.pointerLockElement) {
        document.exitPointerLock();
      }
    };

    const handlePointerLockChange = () => {
      setIsPointerLocked(document.pointerLockElement === containerRef.current);
    };

    document.addEventListener("fullscreenchange", handleFsChange);
    document.addEventListener("pointerlockchange", handlePointerLockChange);
    
    return () => {
      document.removeEventListener("fullscreenchange", handleFsChange);
      document.removeEventListener("pointerlockchange", handlePointerLockChange);
    };
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

  const isFPS = id === 'ultrakill';

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <nav className="p-4 md:p-6 border-b bg-card/50 flex items-center justify-between backdrop-blur-md sticky top-0 z-50">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-primary hover:text-accent transition-colors font-bold group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>BACK TO NETWORK</span>
        </Link>
        <div className="hidden md:flex flex-col items-center">
          <span className="font-headline font-bold text-xl tracking-tight text-primary">
            YOYO&apos;S<span className="text-accent">NETWORK</span>
          </span>
          <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest leading-none">
            by Lennox
          </span>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" size="icon" className="rounded-full border-border/50">
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </nav>

      <main className="flex-1 flex flex-col p-4 md:p-8 max-w-6xl mx-auto w-full">
        <div 
          ref={containerRef}
          className={`relative rounded-[2.5rem] overflow-hidden shadow-2xl bg-black transition-all ${isFullscreen ? 'w-full h-full rounded-none fixed inset-0 z-[100]' : 'border border-border/50'}`}
        >
          <div className={`${isFullscreen ? 'h-full w-full' : 'iframe-container'}`}>
            <iframe
              id="sandboxFrame"
              src={game.iframeUrl}
              title={game.title}
              allow="accelerometer *; ambient-light-sensor *; autoplay *; camera *; clipboard-read *; clipboard-write *; encrypted-media *; fullscreen *; geolocation *; gyroscope *; local-network-access *; magnetometer *; microphone *; midi *; payment *; picture-in-picture *; screen-wake-lock *; speaker *; sync-xhr *; usb *; vibrate *; vr *; web-share *; pointer-lock *"
              sandbox="allow-downloads allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-top-navigation-by-user-activation allow-storage-access-by-user-activation allow-pointer-lock"
              className={`bg-black w-full h-full border-none ${isFullscreen ? 'fixed inset-0' : ''}`}
            />
          </div>
          
          {/* Overlay for Pointer Lock (FPS games like Ultrakill) */}
          {isFullscreen && isFPS && !isPointerLocked && (
            <div 
              onClick={requestLock}
              className="absolute inset-0 z-[102] bg-black/60 flex flex-col items-center justify-center cursor-pointer group"
            >
              <div className="bg-primary/20 p-8 rounded-full mb-6 group-hover:scale-110 transition-transform">
                <MousePointer2 className="w-12 h-12 text-primary animate-pulse" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Click to Lock Mouse</h2>
              <p className="text-white/60 text-sm uppercase tracking-widest">Required for FPS Gameplay</p>
              <div className="mt-8 text-white/40 text-[10px] uppercase font-bold tracking-[0.2em]">Press ESC to unlock & exit</div>
            </div>
          )}

          <div className={`absolute bottom-6 right-6 flex gap-2 transition-opacity z-[101] ${isFullscreen ? 'opacity-0 hover:opacity-100' : 'opacity-0 hover:opacity-100'}`}>
            <Button 
              onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }} 
              className="bg-white/20 hover:bg-white/30 backdrop-blur-md border-none text-white rounded-2xl h-12 px-6 shadow-lg font-bold"
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
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <h1 className="text-3xl md:text-5xl font-headline font-bold text-foreground">
                {game.title}
              </h1>
              <div className="flex gap-2">
                <Badge className="bg-accent hover:bg-accent text-accent-foreground px-4 py-1.5 rounded-full uppercase tracking-wider font-bold">
                  {game.category}
                </Badge>
                <Button 
                  onClick={toggleFullscreen} 
                  variant="secondary" 
                  className="rounded-full h-8 px-4 font-bold text-xs uppercase tracking-wider"
                >
                  {isFullscreen ? <Minimize className="w-3 h-3 mr-2" /> : <Maximize className="w-3 h-3 mr-2" />}
                  {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                </Button>
              </div>
            </div>
            <Card className="p-6 md:p-8 rounded-[2.5rem] border-border/50 shadow-sm bg-card">
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-primary/10 p-4 rounded-[1.5rem] text-primary">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <Info className="w-6 h-6" />
                  </div>
                </div>
                <div>
                  <h3 className="font-headline font-bold text-xl mb-2">How to Play</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {game.description}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6 border-t border-border/30">
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase mb-1">Status</p>
                  <p className="font-bold text-green-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
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
             <Card className="p-8 rounded-[2.5rem] border-border/50 shadow-sm bg-secondary/20">
                <h3 className="font-headline font-bold text-xl mb-6 text-primary">Controls</h3>
                <ul className="space-y-4">
                  <li className="flex justify-between items-center bg-card p-4 rounded-[1.25rem] border border-border/30 shadow-sm">
                    <span className="text-sm font-medium text-muted-foreground">Action</span>
                    <span className="bg-secondary px-3 py-1 rounded-lg text-xs font-bold">Space / Keys</span>
                  </li>
                  <li className="flex justify-between items-center bg-card p-4 rounded-[1.25rem] border border-border/30 shadow-sm">
                    <span className="text-sm font-medium text-muted-foreground">Interaction</span>
                    <span className="bg-secondary px-3 py-1 rounded-lg text-xs font-bold">Mouse</span>
                  </li>
                </ul>
                <div className="mt-8 p-5 bg-accent/5 rounded-[1.5rem] border border-accent/20">
                  <p className="text-xs font-bold text-accent uppercase mb-2 tracking-widest">Pro Tip</p>
                  <p className="text-sm text-accent/80 leading-snug">
                    {isFPS ? "Click the center overlay in fullscreen to lock your mouse for FPS movement!" : "Use Fullscreen mode for the most immersive arcade experience and better performance!"}
                  </p>
                </div>
             </Card>
          </aside>
        </div>
      </main>

      <footer className="bg-card/50 border-t border-border py-10 px-8 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="font-headline font-bold text-xl tracking-tight text-primary">
              YOYO&apos;S<span className="text-accent">NETWORK</span>
            </span>
            <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">
              by Lennox
            </span>
          </div>
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Yoyo&apos;s Network. Play and watch anytime, anywhere.
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
