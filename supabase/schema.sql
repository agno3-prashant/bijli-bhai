-- =========================================================
-- BIJLIBHAI FOUNDATION SCHEMA (Vite + Supabase)
-- Initial Launch: Kanpur, Uttar Pradesh, India
-- =========================================================

-- ENUMS
CREATE TYPE user_role AS ENUM ('CUSTOMER', 'ELECTRICIAN', 'ADMIN');
CREATE TYPE pricing_type AS ENUM ('FIXED', 'STARTING_FROM', 'RANGE', 'INSPECTION_REQUIRED');
CREATE TYPE skill_level AS ENUM ('BASIC', 'INTERMEDIATE', 'ADVANCED', 'MASTER');

-- 1. CITIES TABLE
CREATE TABLE IF NOT EXISTS public.cities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  state TEXT NOT NULL DEFAULT 'Uttar Pradesh',
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. SERVICE ZONES TABLE (Kanpur localities)
CREATE TABLE IF NOT EXISTS public.service_zones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  city_id UUID NOT NULL REFERENCES public.cities(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  pincodes TEXT[] NOT NULL DEFAULT '{}',
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. USER PROFILES TABLE (Linked with auth.users)
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'CUSTOMER',
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  alt_phone TEXT,
  avatar_url TEXT,
  city_id UUID REFERENCES public.cities(id),
  is_verified BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. SERVICE CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.service_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  icon TEXT NOT NULL DEFAULT 'Wrench',
  description TEXT NOT NULL DEFAULT '',
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_launch_featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. SERVICES TABLE
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES public.service_categories(id) ON DELETE RESTRICT,
  name TEXT NOT NULL,
  customer_display_name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  short_description TEXT NOT NULL,
  unit TEXT NOT NULL DEFAULT 'per point / unit',
  pricing_type pricing_type NOT NULL DEFAULT 'STARTING_FROM',
  fixed_price NUMERIC(10, 2),
  minimum_price NUMERIC(10, 2),
  maximum_price NUMERIC(10, 2),
  inspection_required BOOLEAN NOT NULL DEFAULT false,
  material_included BOOLEAN NOT NULL DEFAULT false,
  visit_fee_applicable BOOLEAN NOT NULL DEFAULT true,
  skill_level skill_level NOT NULL DEFAULT 'BASIC',
  warranty_days INTEGER NOT NULL DEFAULT 7,
  launch_phase INTEGER NOT NULL DEFAULT 1,
  featured BOOLEAN NOT NULL DEFAULT false,
  active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT check_pricing CHECK (
    (pricing_type = 'FIXED' AND fixed_price IS NOT NULL) OR
    (pricing_type = 'STARTING_FROM' AND minimum_price IS NOT NULL) OR
    (pricing_type = 'RANGE' AND minimum_price IS NOT NULL AND maximum_price IS NOT NULL AND minimum_price <= maximum_price) OR
    (pricing_type = 'INSPECTION_REQUIRED')
  )
);

-- 6. BUSINESS SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.business_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_services_category ON public.services(category_id);
CREATE INDEX IF NOT EXISTS idx_services_active_featured ON public.services(active, featured);
CREATE INDEX IF NOT EXISTS idx_categories_display_order ON public.service_categories(display_order);
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON public.user_profiles(role);
CREATE INDEX IF NOT EXISTS idx_user_profiles_phone ON public.user_profiles(phone);

-- ROW LEVEL SECURITY (RLS)
ALTER TABLE public.cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_zones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_settings ENABLE ROW LEVEL SECURITY;

-- POLICIES: Public Read for catalogue & cities
CREATE POLICY "Public can view active cities" ON public.cities
  FOR SELECT USING (active = true);

CREATE POLICY "Public can view active service zones" ON public.service_zones
  FOR SELECT USING (active = true);

CREATE POLICY "Public can view active categories" ON public.service_categories
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view active services" ON public.services
  FOR SELECT USING (active = true);

CREATE POLICY "Public can read general business settings" ON public.business_settings
  FOR SELECT USING (true);

-- User Profiles RLS
CREATE POLICY "Users can view their own profile" ON public.user_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admin full access on profiles" ON public.user_profiles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles up
      WHERE up.user_id = auth.uid() AND up.role = 'ADMIN'
    )
  );

-- Admin Catalogue Manage RLS
CREATE POLICY "Admin manage categories" ON public.service_categories
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles up
      WHERE up.user_id = auth.uid() AND up.role = 'ADMIN'
    )
  );

CREATE POLICY "Admin manage services" ON public.services
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles up
      WHERE up.user_id = auth.uid() AND up.role = 'ADMIN'
    )
  );

-- =========================================================
-- SEED DATA: KANPUR CITY & LOCALITIES
-- =========================================================
INSERT INTO public.cities (id, name, state, active)
VALUES ('c1111111-1111-1111-1111-111111111111', 'Kanpur', 'Uttar Pradesh', true)
ON CONFLICT (name) DO NOTHING;

INSERT INTO public.service_zones (city_id, name, pincodes, active)
VALUES 
  ('c1111111-1111-1111-1111-111111111111', 'Kakadeo & Swaroop Nagar', ARRAY['208025', '208002'], true),
  ('c1111111-1111-1111-1111-111111111111', 'Kalyanpur & IIT Gate', ARRAY['208016', '208017'], true),
  ('c1111111-1111-1111-1111-111111111111', 'Civil Lines & Mall Road', ARRAY['208001'], true),
  ('c1111111-1111-1111-1111-111111111111', 'Govind Nagar & Kidwai Nagar', ARRAY['208006', '208011'], true),
  ('c1111111-1111-1111-1111-111111111111', 'Shyam Nagar & Chakeri', ARRAY['208013', '208007'], true)
ON CONFLICT DO NOTHING;

-- ALL REQUIRED CATEGORIES
INSERT INTO public.service_categories (id, name, display_name, slug, icon, description, display_order, is_active, is_launch_featured)
VALUES
  ('a1111111-1111-1111-1111-111111111101', 'Switch', 'Switch, Socket & Board', 'switch-socket-board', 'ToggleLeft', 'Switch repair, modular board change, socket fitting', 1, true, true),
  ('a1111111-1111-1111-1111-111111111102', 'Fan', 'Fan Repair & Installation', 'fan-repair-installation', 'Fan', 'Ceiling fan, exhaust fan, regulator, bearing & winding', 2, true, true),
  ('a1111111-1111-1111-1111-111111111103', 'Light', 'Light & Chandelier Fitting', 'light-fitting', 'Lightbulb', 'LED bulb, tube, panel light, chandelier & wall sconce', 3, true, true),
  ('a1111111-1111-1111-1111-111111111104', 'MCB / DB', 'MCB / Fuse / Distribution Box', 'mcb-fuse-db', 'ShieldAlert', 'MCB trip fix, main switch, changeover & DB wiring', 4, true, true),
  ('a1111111-1111-1111-1111-111111111105', 'Wiring', 'Wiring & New Points', 'wiring-new-points', 'Cpu', 'Internal conduit wiring, open wiring & new heavy load points', 5, true, true),
  ('a1111111-1111-1111-1111-111111111106', 'Inverter', 'Inverter & Battery Setup', 'inverter-battery', 'BatteryCharging', 'Inverter installation, battery wire cleanup & backup troubleshooting', 6, true, true),
  ('a1111111-1111-1111-1111-111111111107', 'AC', 'AC Electrical & Power Point', 'ac-electrical', 'AirVent', 'Heavy 16A/25A AC switchboard, isolator & voltage checks', 7, true, true),
  ('a1111111-1111-1111-1111-111111111108', 'General', 'Inspection & Emergency Checkup', 'inspection-emergency', 'SearchCheck', 'Full house electrical fault finding & short-circuit fix', 8, true, true),
  ('a1111111-1111-1111-1111-111111111109', 'Earthing', 'Earthing & Grounding', 'earthing-grounding', 'Zap', 'Chemical earthing & shock prevention check', 9, true, false),
  ('a1111111-1111-1111-1111-111111111110', 'Stabilizer', 'Stabilizer Connection & Repair', 'stabilizer', 'Activity', 'Main line stabilizer & AC stabilizer check', 10, true, false),
  ('a1111111-1111-1111-1111-111111111111', 'Motor', 'Water Motor & Submersible Starter', 'motor-submersible', 'Waves', 'Motor capacitor, starter panel & float switch', 11, true, false),
  ('a1111111-1111-1111-1111-111111111112', 'Geyser', 'Geyser Electrical Connection', 'geyser', 'Flame', 'Geyser power point, thermostat & element check', 12, true, false),
  ('a1111111-1111-1111-1111-111111111113', 'Appliance', 'Home Appliance Power Fix', 'appliance', 'Tv', 'Microwave, washing machine power cord & earthing', 13, true, false),
  ('a1111111-1111-1111-1111-111111111114', 'CCTV', 'CCTV & Security Wiring', 'cctv-wiring', 'Video', 'Camera power supply adapter & cable routing', 14, true, false),
  ('a1111111-1111-1111-1111-111111111115', 'Solar', 'Solar Inverter & Panel Wiring', 'solar-wiring', 'Sun', 'Solar hybrid inverter wiring & safety grounding', 15, true, false),
  ('a1111111-1111-1111-1111-111111111116', 'EV', 'EV Charger Installation', 'ev-charger', 'Car', 'Dedicated 3.3kW / 7kW EV wallbox point setup', 16, true, false),
  ('a1111111-1111-1111-1111-111111111117', 'Smart', 'Smart Home Switches & Automation', 'smart-home', 'Smartphone', 'WiFi touch switch panels, smart dimmers & hub setup', 17, true, false),
  ('a1111111-1111-1111-1111-111111111118', 'Commercial', 'Shop & Office Electrical Work', 'commercial-electrical', 'Building2', '3-phase wiring, commercial DB, display lighting setup', 18, true, false)
ON CONFLICT (slug) DO NOTHING;

-- SAMPLE LAUNCH SERVICES SEED
INSERT INTO public.services (
  category_id, name, customer_display_name, slug, short_description, unit,
  pricing_type, fixed_price, minimum_price, maximum_price,
  inspection_required, material_included, visit_fee_applicable, skill_level, warranty_days, launch_phase, featured, active, display_order
)
VALUES
  ('a1111111-1111-1111-1111-111111111101', 'Switch Replacement', 'Switch / Socket Replacement (Upto 3 pcs)', 'switch-replacement-3pcs', 'Burned or loose switch, socket or regulator replacement on existing board', 'pack of 3', 'FIXED', 149.00, NULL, NULL, false, false, true, 'BASIC', 7, 1, true, true, 1),
  ('a1111111-1111-1111-1111-111111111101', 'Modular Board Installation', 'New Modular Board Installation (6/8/12 Module)', 'modular-board-installation', 'Complete modular switchboard installation including internal wiring links', 'per board', 'RANGE', NULL, 249.00, 399.00, false, false, true, 'INTERMEDIATE', 7, 1, true, true, 2),
  ('a1111111-1111-1111-1111-111111111102', 'Ceiling Fan Installation', 'Ceiling Fan Installation / Uninstallation', 'ceiling-fan-installation', 'Assembly, rod fitting, ceiling hook mounting and connection check', 'per fan', 'FIXED', 199.00, NULL, NULL, false, false, true, 'BASIC', 7, 1, true, true, 3),
  ('a1111111-1111-1111-1111-111111111102', 'Fan Repair & Noise Fix', 'Fan Noise / Slow Speed / Capacitor Change', 'fan-repair-noise-capacitor', 'Capacitor replacement, blade balancing, connection tune-up', 'per fan', 'STARTING_FROM', NULL, 129.00, NULL, false, false, true, 'BASIC', 7, 1, true, true, 4),
  ('a1111111-1111-1111-1111-111111111103', 'LED Tube / Panel Light Fitting', 'LED Batten / False Ceiling Panel Fitting', 'led-panel-light-fitting', 'Drilling, clamp fitting or false ceiling spring clip install', 'per light', 'FIXED', 99.00, NULL, NULL, false, false, true, 'BASIC', 7, 1, true, true, 5),
  ('a1111111-1111-1111-1111-111111111104', 'MCB Trip Fix & Single Pole Replacement', 'MCB Trip Troubleshooting & Single Pole MCB Change', 'mcb-trip-sp-change', 'Isolate short-circuit overload, replace faulty MCB with proper rating', 'per MCB', 'FIXED', 199.00, NULL, NULL, false, false, true, 'INTERMEDIATE', 7, 1, true, true, 6),
  ('a1111111-1111-1111-1111-111111111104', 'Double Pole / RCCB / Main Switch Fix', 'DP Switch / RCCB / Isolator Replacement', 'dp-switch-rccb-replacement', 'Main protection unit replacement for whole floor or main line', 'per unit', 'RANGE', NULL, 349.00, 599.00, false, false, true, 'ADVANCED', 7, 1, true, true, 7),
  ('a1111111-1111-1111-1111-111111111105', 'New Internal Wiring Point', 'New Electrical Point (Conduit / Casing)', 'new-wiring-point', 'Wiring from nearest junction box with earth wire up to 5 meters', 'per point', 'STARTING_FROM', NULL, 299.00, NULL, false, false, true, 'INTERMEDIATE', 7, 1, true, true, 8),
  ('a1111111-1111-1111-1111-111111111106', 'Inverter & Single Battery Install', 'Inverter + Single Battery Setup & Connection', 'inverter-battery-setup', 'Complete cabling, output line linking to home DB and charging test', 'per setup', 'FIXED', 399.00, NULL, NULL, false, false, true, 'INTERMEDIATE', 7, 1, true, true, 9),
  ('a1111111-1111-1111-1111-111111111107', 'AC Heavy Power Point Installation', 'Dedicated 16A/25A AC Box with MCB', 'ac-heavy-power-point', 'Heavy load box installation with 2.5/4 sq mm line connectivity', 'per point', 'RANGE', NULL, 349.00, 499.00, false, false, true, 'INTERMEDIATE', 7, 1, true, true, 10),
  ('a1111111-1111-1111-1111-111111111108', 'Full House Electrical Fault Finding', 'Emergency Fault Finding & Inspection', 'house-electrical-inspection', 'Thorough multimeter testing of supply voltage, earthing, tripping & short circuit', 'per visit', 'INSPECTION_REQUIRED', NULL, NULL, NULL, true, false, true, 'ADVANCED', 7, 1, true, true, 11)
ON CONFLICT (slug) DO NOTHING;

-- BUSINESS SETTINGS SEED
INSERT INTO public.business_settings (key, value, description)
VALUES
  ('support_phone', '+915123000000', 'Official Kanpur helpline phone number'),
  ('support_whatsapp', '+919999999999', 'Official customer support WhatsApp link'),
  ('visit_inspection_fee', '99', 'Standard Kanpur visit & consultation fee (waived if service > ₹300)'),
  ('city_name', 'Kanpur', 'Default operating city'),
  ('service_guarantee_days', '7', 'Doorstep repair warranty period in days')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;