export type UserRole = "CUSTOMER" | "ELECTRICIAN" | "ADMIN";

export type PricingType = "FIXED" | "STARTING_FROM" | "RANGE" | "INSPECTION_REQUIRED";

export type SkillLevel = "BASIC" | "INTERMEDIATE" | "ADVANCED" | "MASTER";

export interface UserProfile {
  id: string;
  role: UserRole;
  full_name: string;
  phone_number: string;
  email?: string | null;
  city_id?: string | null;
  zone_id?: string | null;
  is_verified: boolean;
  avatar_url?: string | null;
  created_at: string;
  updated_at: string;
}

export interface City {
  id: string;
  name: string;
  state: string;
  slug: string;
  is_active: boolean;
  launch_date?: string | null;
  created_at: string;
}

export interface ServiceZone {
  id: string;
  city_id: string;
  name: string;
  pincodes: string[];
  is_active: boolean;
  created_at: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  customer_display_name: string;
  slug: string;
  icon_name: string;
  description: string;
  is_launch_category: boolean;
  display_order: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  category_id: string;
  name: string;
  customer_display_name: string;
  slug: string;
  short_description: string;
  unit: string;
  pricing_type: PricingType;
  fixed_price: number | null;
  minimum_price: number | null;
  maximum_price: number | null;
  inspection_required: boolean;
  material_included: boolean;
  visit_fee_applicable: boolean;
  skill_level: SkillLevel;
  warranty_days: number;
  launch_phase: number;
  featured: boolean;
  active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface BusinessSettings {
  id: string;
  key: string;
  value: string;
  description?: string;
  updated_at: string;
}