'use client';

import React from "react";
import Link from "next/link";
import { useI18n } from "@/app/i18n/i18n-context";
import { Badge } from "@/components/ui/badge";

const certificationColors: { [key: string]: string } = {
  "Standard": "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
  "Bronze": "bg-amber-700 text-amber-50 dark:bg-amber-300 dark:text-amber-950",
  "Silver": "bg-slate-300 text-slate-900 dark:bg-slate-500 dark:text-slate-50",
  "Gold": "bg-yellow-400 text-yellow-950 dark:bg-yellow-600 dark:text-yellow-50",
  "Platinum": "bg-blue-300 text-blue-900 dark:bg-blue-600 dark:text-blue-50",
  "Titanium": "bg-purple-300 text-purple-900 dark:bg-purple-600 dark:text-purple-50",
  "Ruby": "bg-red-300 text-red-900 dark:bg-red-600 dark:text-red-50",
};

function formatTranslationKey(prefix: string, value: string): string {
  return `${prefix}_${value.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`;
}

export interface PowerSupplyCardProps {
  id: string;
  modelName: string;
  oem: string;
  wattage: number;
  efficiencyRating?: string; // Renamed from efficiency to efficiencyRating
  eightyPlusCertification?: string; // Ren eighty_plus_certification
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
  const { t } = useI18n();

  return (
    <Link href={`/power-supplies/${id}`}>
      <div className="bg-card text-card-foreground rounded-lg border shadow-sm hover:shadow-md transition-shadow duration-200 h-full">
        <div className="p-4 flex flex-col h-full">
          <div className="flex-1">
            <h3 className="font-semibold text-lg truncate">{modelName}</h3>
            <div className="text-sm text-muted-foreground space-y-1 mt-2">
              <p>
                {t('powersupply.oem')}: {oem}
              </p>
              <p>
                {t('powersupply.wattage')}: {wattage}W
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {eightyPlusCertification && (
                <Badge
                  variant="secondary"
                  className={certificationColors[eightyPlusCertification] || "bg-secondary text-secondary-foreground"}
                >
                  {t('powersupply.eighty_plus_certification')}: {t(eightyPlusCertification, 'power')}
                </Badge>
              )}
              {modularity && <Badge variant="secondary">{t('powersupply.modularity')}: {t(formatTranslationKey('modularity', modularity), 'power')}</Badge>}
              {formFactor && <Badge variant="secondary">{t('powersupply.form_factor')}: {t(formatTranslationKey('form_factor', formFactor), 'power')}</Badge>}
              {topology && <Badge variant="secondary">{t('powersupply.topology')}: {t(formatTranslationKey('topology', topology), 'power')}</Badge>}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t text-sm">
            <div className="flex justify-between items-center">
              <span>{t('powersupply.details')}</span>
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