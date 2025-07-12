"use client";

import { useState, useEffect } from "react";
import React from 'react';
import { Navbar } from "@/components/layout/navbar";
import { SearchBar } from "@/components/layout/search-bar";
import { Sidebar } from "@/components/layout/sidebar";
import { PowerGrid } from "@/components/power-supply/power-grid";
import { useI18n } from "./i18n/i18n-context";
import { debounce } from "@/lib/utils";
import { useTheme } from '@/components/theme/theme-provider';

interface PowerSupply {
  id: string;
  model_name: string;
  model_name_i18n: string;
  oem: string;
  oem_i18n: string;
  notes: string;
  notes_i18n: string;
  manufacturer: string;
  wattage: number;
  efficiency_rating?: string;
  image_url?: string;
  eighty_plus_certification?: string; // Renamed from conversion_efficiency
  voltage_regulation_ranking?: number;
  acquisition_price_rmb?: number;
  fan_control_strategy?: string;
  modularity?: string;
  form_factor?: string;
  topology?: string;
}

export default function Home() {
  const [powerSupplies, setPowerSupplies] = useState<PowerSupply[]>([]);
  const [filteredSupplies, setFilteredSupplies] = useState<PowerSupply[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { theme, setTheme } = useTheme();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { t } = useI18n();

  // 获取电源数据
  useEffect(() => {
    async function fetchPowerSupplies() {
      try {
        const response = await fetch("/data/power-supplies/power-supplies.json");
        const data = await response.json();
        // Add an id field to each power supply
        const dataWithIds = data.map((item: PowerSupply) => ({
          ...item,
          id: item.id || `${item.model_name.replace(/\s+/g, '-').toLowerCase()}`
        }));
        setPowerSupplies(dataWithIds);
        setFilteredSupplies(dataWithIds);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading power supplies:", error);
        setIsLoading(false);
      }
    }

    fetchPowerSupplies();
  }, []);

  // 处理搜索
  const handleSearch = React.useCallback((query: string) => {
    if (query.trim() === "") {
      setFilteredSupplies(powerSupplies);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = powerSupplies.filter(ps => {
      const modelNameTranslated = t(ps.model_name_i18n ?? '', 'power').toLowerCase();
      const manufacturerTranslated = t(ps.oem_i18n ?? '', 'power').toLowerCase();

      return (ps.model_name ?? '').toLowerCase().includes(lowerQuery) ||
        modelNameTranslated.includes(lowerQuery) ||
        (ps.manufacturer ?? '').toLowerCase().includes(lowerQuery) ||
        manufacturerTranslated.includes(lowerQuery);
    });
    setFilteredSupplies(filtered);
  }, [powerSupplies, t]);

  const debouncedSearch = React.useMemo(() => debounce(handleSearch, 500), [handleSearch]);

  // When searchTerm changes, trigger debounced search
  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">{t('site.loading')}</div>;
  }

  return (
    <>
      <Navbar currentTheme={theme} />

      <main className="container mx-auto px-4 py-8">
        <SearchBar onInputChange={setSearchTerm} value={searchTerm} />

        <div className="mt-8">
          <PowerGrid powerSupplies={filteredSupplies.map(ps => ({
            id: ps.id,
            modelName: t(ps.model_name_i18n, 'power') || ps.model_name,
            oem: t(ps.oem_i18n, 'power') || ps.oem,
            wattage: ps.wattage,
            efficiencyRating: ps.efficiency_rating,
            eightyPlusCertification: ps.eighty_plus_certification,
            voltageRegulationRanking: ps.voltage_regulation_ranking,
            fanControlStrategy: ps.fan_control_strategy,
            imageUrl: ps.image_url,
            modularity: ps.modularity,
            formFactor: ps.form_factor,
            topology: ps.topology,
          }))} />
        </div>
      </main>

      <Sidebar
        onThemeChange={setTheme}
        currentTheme={theme}
      />

      <footer className="border-t p-4 text-center text-sm text-muted-foreground mt-12">
        &copy; {new Date().getFullYear()} {t('site.title')} | {t('site.footer')}
      </footer>
    </>
  );
}
