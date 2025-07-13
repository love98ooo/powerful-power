'use client';

import React from "react";

interface SearchBarProps {
  onInputChange: (query: string) => void;
  value: string;
}

export function SearchBar({ onInputChange, value }: SearchBarProps) {
  return (
    <div className="w-full max-w-4xl mx-auto my-4 p-4 rounded-lg">
      <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-center">搜搜你想要的电源 / 厂商 / 代工厂</h2>
        <div className="flex w-full gap-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder="输入电源型号、厂商名称、代工厂名称等..."
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            搜索
          </button>
        </div>
      </form>
    </div>
  );
}