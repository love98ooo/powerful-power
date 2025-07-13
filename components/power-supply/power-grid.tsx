'use client';

import React from "react";
import { PowerSupplyCard, PowerSupplyCardProps } from "./power-card";

interface PowerGridProps {
  powerSupplies: PowerSupplyCardProps[];
}

export function PowerGrid({ powerSupplies }: PowerGridProps) {
  if (powerSupplies.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-lg">没有找到匹配的电源</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {powerSupplies.map((powerSupply) => (
        <PowerSupplyCard
          key={powerSupply.id}
          id={powerSupply.id}
          modelName={powerSupply.modelName}
          oem={powerSupply.oem}
          wattage={powerSupply.wattage}
          eightyPlusCertification={powerSupply.eightyPlusCertification}
          modularity={powerSupply.modularity}
          formFactor={powerSupply.formFactor}
          topology={powerSupply.topology}
        />
      ))}
    </div>
  );
}