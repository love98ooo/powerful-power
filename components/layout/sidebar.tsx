'use client';

import React from "react";
import { useI18n } from "@/app/i18n/i18n-context";
import { Locale } from "@/app/i18n/settings";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Menu, SunMedium, Moon, Languages } from "lucide-react";

interface SidebarProps {
  onThemeChange: (theme: "light" | "dark") => void;
  currentTheme: "light" | "dark";
}

export function Sidebar({ onThemeChange, currentTheme }: SidebarProps) {
  const { locale, setLocale } = useI18n();

  const handleLanguageChange = (newLang: Locale) => {
    setLocale(newLang);
  };

  return (
    <div className="fixed right-4 bottom-4 z-40">
      <HoverCard>
        <HoverCardTrigger asChild>
          <button
            className="flex items-center justify-center p-3 rounded-lg bg-background border shadow-sm hover:bg-muted/50 transition-colors"
            aria-label="打开设置"
          >
            <Menu className="h-5 w-5" />
          </button>
        </HoverCardTrigger>
        <HoverCardContent side="top" className="w-52 p-0 overflow-hidden rounded-lg mr-2">
          <div className="flex flex-col">
            {/* 主题切换 */}
            <div className="p-4 border-b">
              <h3 className="font-medium mb-3">主题设置</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => onThemeChange("light")}
                  className={`flex-1 p-2 rounded-md ${currentTheme === "light" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                  aria-label="切换到亮色主题"
                >
                  <SunMedium className="mx-auto" />
                </button>
                <button
                  onClick={() => onThemeChange("dark")}
                  className={`flex-1 p-2 rounded-md ${currentTheme === "dark" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                  aria-label="切换到暗色主题"
                >
                  <Moon className="mx-auto" />
                </button>
              </div>
            </div>

            {/* 语言切换 */}
            <div className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Languages className="h-4 w-4" />
                <h3 className="font-medium">语言设置</h3>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleLanguageChange("zh")}
                  className={`flex-1 p-2 rounded-md ${locale === "zh" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                  aria-label="切换到中文"
                >
                  中文
                </button>
                <button
                  onClick={() => handleLanguageChange("en")}
                  className={`flex-1 p-2 rounded-md ${locale === "en" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                  aria-label="切换到英文"
                >
                  EN
                </button>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}