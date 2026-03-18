"use client";

import { useState, useEffect } from "react";

export type CloakPreset = {
  name: string;
  title: string;
  icon: string;
};

export const CLOAK_PRESETS: Record<string, CloakPreset> = {
  none: { name: "Default", title: "Yoyo's Network | Unblocked Games", icon: "/favicon.ico" },
  google: { name: "Google", title: "Google", icon: "https://www.google.com/favicon.ico" },
  drive: { name: "My Drive", title: "My Drive - Google Drive", icon: "https://ssl.gstatic.com/docs/doclist/images/drive_2022q3_32dp.png" },
  classroom: { name: "Classroom", title: "Classes", icon: "https://www.gstatic.com/classroom/favicon.png" },
  wikipedia: { name: "Wikipedia", title: "Wikipedia, the free encyclopedia", icon: "https://en.wikipedia.org/static/favicon/wikipedia.ico" },
};

export function useSettings() {
  const [cloak, setCloak] = useState<string>("none");

  useEffect(() => {
    const savedCloak = localStorage.getItem("yoyo-cloak") || "none";
    setCloak(savedCloak);
  }, []);

  useEffect(() => {
    const preset = CLOAK_PRESETS[cloak];
    if (preset) {
      document.title = preset.title;
      
      // Update Favicon
      let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.href = preset.icon;
      
      localStorage.setItem("yoyo-cloak", cloak);
    }
  }, [cloak]);

  return { cloak, setCloak };
}
