// 电源数据类型
export interface PowerSupply {
  model_name: string;
  wattage: number;
  form_factor: string;
  modularity: 'Full' | 'Semi' | 'Non-Modular';
  acquisition_status: string;
  acquisition_price_rmb: number | null;
  warranty_years: number;
  warranty_policy: string;
  oem: string;
  topology: string;
  "eighty_plus_certification": string;
  fan_size_mm: number;
  fan_bearing_type: string | null;
  fan_control_strategy: string;
  packaging_quality: string;
  nameplate_data: {
    "12v_current_a": number | null;
    "5v_current_a": number | null;
    "3_3v_current_a": number | null;
    "side_power_w": number | null;
  };
  peak_efficiency: {
    peak_efficiency_percent: number | null;
  };
  cross_load_pass: boolean;
  emi_filter_y_caps_pairs: number | null;
  rectifier_bridge_spec: string | null;
  fan_wire_attachment: string | null;
  main_capacitor_spec: string | null;
  other_components_quality: string | null;
  input_voltage_range: string;
  hold_up_time_ms: {
    pg_signal_ms: number | null;
    "12v_ms": number | null;
    "5v_ms": number | null;
    "3_3v_ms": number | null;
    intel_atx_compliant: boolean;
  };
  protection_features: {
    opp_trigger_w: number | null;
    ocp_status: string;
    inrush_protection_components: string;
  };
  efficiency_points: EfficiencyPoint[];
  source?: Source;
  notes: string;
}

// 制造商数据类型
export interface Manufacturer {
  id: string;
  name: string;
  cn_name: string;
  description: string;
  country: string;
}

// 效率曲线数据点
export interface EfficiencyPoint {
  load_percentage: number;
  efficiency_percentage: number;
}

// 电源对比数据
export interface ComparisonData {
  powerSupplyIds: string[];
}

// 过滤条件
export interface FilterOptions {
  formFactor?: string;
  modularity?: string;
  certification?: string;
  minPower?: number;
  maxPower?: number;
  sortBy?: string;
}

export interface Source {
  name: string;
  url: string;
}
