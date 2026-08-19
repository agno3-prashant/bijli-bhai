export type UserRole = "CUSTOMER" | "ELECTRICIAN" | "ADMIN";

export type PricingType = "FIXED" | "STARTING_FROM" | "RANGE" | "INSPECTION_REQUIRED";

export type SkillLevel = "BASIC" | "INTERMEDIATE" | "ADVANCED" | "MASTER";

export interface UserProfile {
  id: string;
  user_id: string;
  role: UserRole;
  full_name: string;
  phone: string;
  alt_phone?: string | null;
  avatar_url?: string | null;
  city_id?: string | null;
  is_verified: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface City {
  id: string;
  name: string;
  state: string;
  active: boolean;
  created_at: string;
}

export interface ServiceZone {
  id: string;
  city_id: string;
  name: string;
  pincodes: string[];
  active: boolean;
  created_at: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  display_name: string;
  slug: string;
  icon: string;
  description: string;
  display_order: number;
  is_active: boolean;
  is_launch_featured: boolean;
  created_at: string;
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

export interface BusinessSetting {
  key: string;
  value: string;
  description: string | null;
  updated_at: string;
}