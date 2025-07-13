'use client';

import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const certificationColors: { [key: string]: string } = {
  "Standard": "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
  "Bronze": "bg-amber-700 text-amber-50 dark:bg-amber-300 dark:text-amber-950",
  "Silver": "bg-slate-300 text-slate-900 dark:bg-slate-500 dark:text-slate-50",
  "Gold": "bg-yellow-400 text-yellow-950 dark:bg-yellow-600 dark:text-yellow-50",
  "Platinum": "bg-blue-300 text-blue-900 dark:bg-blue-600 dark:text-blue-50",
  "Titanium": "bg-purple-300 text-purple-900 dark:bg-purple-600 dark:text-purple-50",
};

// 硬编码的中文翻译映射
const chineseTranslations: { [key: string]: string } = {
  // 认证类型
  "Standard": "标准",
  "Bronze": "铜牌",
  "Silver": "银牌",
  "Gold": "金牌",
  "Platinum": "白金",
  "Titanium": "钛金",

  // 模块化类型
  "Full": "全模组",
  "Semi": "半模组",
  "Non-Modular": "非模组",

  // 外形尺寸
  "ATX": "ATX",
  "SFX": "SFX",
  "SFX-L": "SFX-L",

  // 拓扑结构
  "LLC Resonant": "LLC谐振",
  "Half Bridge": "半桥",
  "Double Forward": "双正激",
  "LLC DC-DC": "LLC DC-DC",
  "Single Magnetic Amplification": "单磁放大"
};

function getChineseTranslation(key: string): string {
  return chineseTranslations[key] || key;
}

export interface PowerSupplyCardProps {
  id: string;
  modelName: string;
  oem: string;
  wattage: number;
  efficiencyRating?: string;
  eightyPlusCertification?: string;
  voltageRegulationRanking?: number;
  fanControlStrategy?: string;
  modularity?: string;
  formFactor?: string;
  topology?: string;
}

export function PowerSupplyCard({
  id,
  modelName,
  oem,
  wattage,
  eightyPlusCertification,
  modularity,
  formFactor,
  topology,
}: PowerSupplyCardProps) {
  return (
    <Link href={`/power-supply/${id}`}>
      <div className="bg-card text-card-foreground rounded-lg border shadow-sm hover:shadow-md transition-shadow duration-200 h-full">
        <div className="p-4 flex flex-col h-full">
          <div className="flex-1">
            <h3 className="font-semibold text-lg truncate">{modelName}</h3>
            <div className="text-sm text-muted-foreground space-y-1 mt-2">
              <p>代工厂: {oem}</p>
              <p>功率: {wattage}W</p>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {eightyPlusCertification && (
                <Badge
                  variant="secondary"
                  className={certificationColors[eightyPlusCertification] || "bg-secondary text-secondary-foreground"}
                >
                  80 PLUS认证: {getChineseTranslation(eightyPlusCertification)}
                </Badge>
              )}
              {modularity && <Badge variant="secondary">模块化: {getChineseTranslation(modularity)}</Badge>}
              {formFactor && <Badge variant="secondary">规格尺寸: {getChineseTranslation(formFactor)}</Badge>}
              {topology && <Badge variant="secondary">架构: {getChineseTranslation(topology)}</Badge>}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t text-sm">
            <div className="flex justify-between items-center">
              <span>详情</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6 12L10 8L6 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}