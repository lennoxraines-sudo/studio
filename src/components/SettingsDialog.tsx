
"use client";

import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Settings, Shield, Palette, Globe, Monitor } from "lucide-react";
import { CLOAK_PRESETS, useSettings, type ThemePreset } from "@/hooks/use-settings";
import { Badge } from "@/components/ui/badge";

export function SettingsDialog() {
  const { cloak, setCloak, theme, setTheme } = useSettings();

  const themes: { id: ThemePreset; name: string; color: string }[] = [
    { id: "arcade", name: "Arcade (Light)", color: "bg-[#6133CC]" },
    { id: "midnight", name: "Midnight (Dark)", color: "bg-[#3B82F6]" },
    { id: "neon", name: "Neon (Retro)", color: "bg-[#FF00FF]" },
    { id: "evil", name: "Evil (Dark)", color: "bg-[#FF0000]" },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 text-primary group">
          <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-[2.5rem] border-border/50 bg-card shadow-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-headline font-bold text-primary flex items-center gap-2">
            <Settings className="w-6 h-6" /> NETWORK SETTINGS
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Customize your arcade experience and privacy settings.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-8 py-4">
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-accent uppercase tracking-widest">
              <Palette className="w-4 h-4" /> Theme Preference
            </div>
            <div className="grid grid-cols-1 gap-2">
              {themes.map((t) => (
                <Button
                  key={t.id}
                  variant={theme === t.id ? "default" : "outline"}
                  className={`rounded-xl h-auto py-3 px-4 justify-between transition-all ${
                    theme === t.id ? "bg-primary shadow-lg shadow-primary/20 scale-[1.02]" : "hover:border-primary/50"
                  }`}
                  onClick={() => setTheme(t.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${t.color} border border-white/20`} />
                    <span className="font-bold text-xs">{t.name}</span>
                  </div>
                  {theme === t.id && <Badge className="bg-white/20 text-[10px] h-4">Active</Badge>}
                </Button>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-accent uppercase tracking-widest">
              <Shield className="w-4 h-4" /> Tab Cloaking
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              Disguise your browser tab as a boring utility site to stay under the radar.
            </p>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(CLOAK_PRESETS).map(([key, preset]) => (
                <Button
                  key={key}
                  variant={cloak === key ? "default" : "outline"}
                  className={`rounded-xl h-auto py-3 px-4 justify-start gap-3 transition-all ${
                    cloak === key ? "bg-primary shadow-lg shadow-primary/20 scale-[1.02]" : "hover:border-primary/50"
                  }`}
                  onClick={() => setCloak(key)}
                >
                  <img src={preset.icon} alt="" className="w-4 h-4 rounded-sm" />
                  <span className="font-bold text-xs truncate">{preset.name}</span>
                </Button>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-accent uppercase tracking-widest">
              <Globe className="w-4 h-4" /> Global Preferences
            </div>
            <div className="p-4 rounded-2xl bg-secondary/30 border border-border/50 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Auto-Fullscreen</span>
                <Badge variant="outline" className="text-[10px] uppercase">Coming Soon</Badge>
              </div>
              <div className="flex items-center justify-between opacity-50">
                <span className="text-sm font-medium">Performance Mode</span>
                <Badge variant="outline" className="text-[10px] uppercase">Disabled</Badge>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-4 p-4 rounded-2xl bg-primary/5 border border-primary/10 text-center">
          <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
            Yoyo's Network v1.3.0 • Developed by Lennox
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
