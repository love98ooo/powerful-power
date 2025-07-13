"use client";

import { useState, useEffect } from "react";
import React from 'react';
import { SearchBar } from "@/components/layout/search-bar";
import { PowerGrid } from "@/components/power-supply/power-grid";
import { debounce, generatePowerSupplyId } from "@/lib/utils";

interface PowerSupply {
  id: string;
  model_name: string;
  oem: string;
  notes: string;
  manufacturer: string;
  wattage: number;
  efficiency_rating?: string;
  image_url?: string;
  eighty_plus_certification?: string;
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
  const [searchTerm, setSearchTerm] = useState<string>('');

  // 获取电源数据
  useEffect(() => {
    async function fetchPowerSupplies() {
      try {
        const response = await fetch("/data/power-supplies/power-supplies.json");
        const data = await response.json();
        // Add an id field to each power supply
        const dataWithIds = data.map((item: PowerSupply) => ({
          ...item,
          id: item.id || generatePowerSupplyId(item.model_name)
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
      return (ps.model_name ?? '').toLowerCase().includes(lowerQuery) ||
        (ps.manufacturer ?? '').toLowerCase().includes(lowerQuery) ||
        (ps.oem ?? '').toLowerCase().includes(lowerQuery);
    });
    setFilteredSupplies(filtered);
  }, [powerSupplies]);

  const debouncedSearch = React.useMemo(() => debounce(handleSearch, 500), [handleSearch]);

  // When searchTerm changes, trigger debounced search
  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">加载中...</div>;
  }

  return (
    <>
      <main className="container mx-auto px-4 py-8">
        <SearchBar onInputChange={setSearchTerm} value={searchTerm} />

        <div className="mt-8">
          <PowerGrid powerSupplies={filteredSupplies.map(ps => ({
            id: ps.id,
            modelName: ps.model_name,
            oem: ps.oem,
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

      <footer className="border-t p-4 text-center text-sm text-muted-foreground mt-12">
        &copy; {new Date().getFullYear()} Powerful Power | 数据仅供参考
      </footer>
    </>
  );
}
