
"use client";

import Image from "next/image";
import Link from "next/link";
import { Play, Film, Tv, Gamepad2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface Game {
  id: string;
  title: string;
  description: string;
  category: string;
  iframeUrl: string;
  thumbnail: string;
}

interface GameCardProps {
  game: Game;
}

export function GameCard({ game }: GameCardProps) {
  const getIcon = () => {
    switch (game.category) {
      case "Movies":
        return <Film className="w-3 h-3 ml-2" />;
      case "TV Shows":
        return <Tv className="w-3 h-3 ml-2" />;
      default:
        return <Play className="w-3 h-3 ml-2 fill-current" />;
    }
  };

  const getActionText = () => {
    switch (game.category) {
      case "Movies":
      case "TV Shows":
        return "WATCH NOW";
      default:
        return "PLAY NOW";
    }
  };

  return (
    <Link href={`/game/${game.id}`} className="group">
      <div className="game-card-hover bg-card rounded-[2rem] overflow-hidden border border-border/50 h-full flex flex-col">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={game.thumbnail}
            alt={game.title}
            width={600}
            height={400}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
            data-ai-hint="media thumbnail"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
              {game.category === "Movies" || game.category === "TV Shows" ? (
                <Film className="w-8 h-8 text-white" />
              ) : (
                <Play className="w-8 h-8 text-white fill-white" />
              )}
            </div>
          </div>
          <div className="absolute top-3 left-3">
            <Badge className="bg-primary hover:bg-primary text-primary-foreground font-medium px-3 py-1 rounded-full text-xs uppercase tracking-wider">
              {game.category}
            </Badge>
          </div>
        </div>
        <div className="p-6 flex flex-col flex-1">
          <h3 className="font-headline font-bold text-xl mb-2 text-foreground group-hover:text-primary transition-colors">
            {game.title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
            {game.description}
          </p>
          <div className="mt-auto flex items-center text-primary font-bold text-sm tracking-widest">
            {getActionText()} {getIcon()}
          </div>
        </div>
      </div>
    </Link>
  );
}
