-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- User profiles table (extends Supabase auth.users)
create table user_profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  phone text,
  role text check (role in ('customer', 'electrician', 'admin')) not null default 'customer',
  is_verified boolean default false,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Cities table
create table cities (
  id uuid primary key default uuid_generate_v4(),
  name text not null unique,
  state text not null,
  pincode text,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Service zones table (for service areas within cities)
create table service_zones (
  id uuid primary key default uuid_generate_v4(),
  city_id uuid references cities(id) on delete cascade not null,
  name text not null,
  pincodes text[], -- Array of pincodes covered
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Service categories table
create table service_categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null unique,
  slug text not null unique,
  description text,
  icon text, -- Icon name from lucide-react
  display_order integer default 0,
  is_active boolean default true,
  launch_phase text check (launch_phase in ('phase1', 'phase2', 'phase3')) default 'phase1',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Services table
create table services (
  id uuid primary key default uuid_generate_v4(),
  category_id uuid references service_categories(id) on delete cascade not null,
  name text not null,
  customer_display_name text not null,
  slug text not null unique,
  short_description text,
  unit text, -- e.g., 'point', 'hour', 'job'
  pricing_type text check (pricing_type in ('fixed', 'starting_from', 'range', 'inspection_required')) not null,
  fixed_price decimal(10,2),
  minimum_price decimal(10,2),
  maximum_price decimal(10,2),
  inspection_required boolean default false,
  material_included boolean default false,
  visit_fee_applicable boolean default true,
  skill_level text check (skill_level in ('beginner', 'intermediate', 'expert', 'specialist')) default 'intermediate',
  warranty_days integer default 30,
  launch_phase text check (launch_phase in ('phase1', 'phase2', 'phase3')) default 'phase1',
  featured boolean default false,
  active boolean default true,
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Business settings table
create table business_settings (
  id uuid primary key default uuid_generate_v4(),
  key text not null unique,
  value jsonb,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Insert initial cities (Kanpur for launch)
insert into cities (name, state, pincode, is_active) values
('Kanpur', 'Uttar Pradesh', '208001', true),
('Kanpur', 'Uttar Pradesh', '208002', true),
('Kanpur', 'Uttar Pradesh', '208003', true),
('Kanpur', 'Uttar Pradesh', '208004', true),
('Kanpur', 'Uttar Pradesh', '208005', true),
('Kanpur', 'Uttar Pradesh', '208006', true),
('Kanpur', 'Uttar Pradesh', '208007', true),
('Kanpur', 'Uttar Pradesh', '208008', true),
('Kanpur', 'Uttar Pradesh', '208009', true),
('Kanpur', 'Uttar Pradesh', '208010', true)
on conflict do nothing;

-- Insert service categories
insert into service_categories (name, slug, description, icon, display_order, launch_phase, is_active) values
('General', 'general', 'General electrical services', 'Zap', 1, 'phase1', true),
('Light', 'light', 'Lighting installation and repair', 'Lightbulb', 2, 'phase1', true),
('Fan', 'fan', 'Fan installation, repair and servicing', 'Fan', 3, 'phase1', true),
('Switch', 'switch', 'Switch, socket and board services', 'Outlet', 4, 'phase1', true),
('MCB / DB', 'mcb-db', 'MCB, DB and panel services', 'Zap', 5, 'phase1', true),
('Wiring', 'wiring', 'Wiring and new point installations', 'Wire', 6, 'phase1', true),
('Inverter', 'inverter', 'Inverter installation and servicing', 'Zap', 7, 'phase1', true),
('AC', 'ac', 'AC electrical installation and service', 'Snowflake', 8, 'phase1', true),
('Inspection / Emergency', 'inspection-emergency', 'Electrical inspection and emergency services', 'Search', 9, 'phase1', true),
('Motor', 'motor', 'Motor winding and repair', 'Zap', 10, 'phase2', true),
('Geyser', 'geyser', 'Geyser installation and repair', 'Droplet', 11, 'phase2', true),
('Appliance', 'appliance', 'Home appliance electrical services', 'Zap', 12, 'phase2', true),
('CCTV', 'cctv', 'CCTV installation and servicing', 'Video', 13, 'phase2', true),
('Solar', 'solar', 'Solar panel installation and maintenance', 'Sun', 14, 'phase3', true),
('EV', 'ev', 'EV charging station installation', 'Zap', 15, 'phase3', true),
('Smart', 'smart', 'Smart home electrical solutions', 'Zap', 16, 'phase3', true),
('Commercial', 'commercial', 'Commercial electrical services', 'Building', 17, 'phase3', true)
on conflict do nothing;

-- Insert initial services for launch phase (phase1)
insert into services (category_id, name, customer_display_name, slug, short_description, unit, pricing_type, fixed_price, minimum_price, maximum_price, inspection_required, material_included, visit_fee_applicable, skill_level, warranty_days, launch_phase, featured, active, display_order) values
-- General Services
((select id from service_categories where slug = 'general'), 'Electrical Inspection', 'Electrical Inspection', 'electrical-inspection', 'Complete home electrical safety inspection', 'job', 'fixed', 1499.00, null, null, true, false, true, 'expert', 30, 'phase1', true, true, 1),
((select id from service_categories where slug = 'general'), 'Emergency Electrical Service', 'Emergency Electrical Service', 'emergency-electrical', '24/7 emergency electrical assistance', 'hour', 'starting_from', null, 999.00, null, false, false, true, 'expert', 7, 'phase1', true, true, 2),

-- Light Services
((select id from service_categories where slug = 'light'), 'LED Light Installation', 'LED Light Installation', 'led-light-installation', 'Installation of LED lights and fixtures', 'point', 'fixed', 299.00, null, null, false, true, true, 'intermediate', 365, 'phase1', true, true, 1),
((select id from service_categories where slug = 'light'), 'Tube Light Repair', 'Tube Light Repair', 'tube-light-repair', 'Repair of tube lights and fittings', 'point', 'fixed', 199.00, null, null, false, false, true, 'intermediate', 30, 'phase1', true, true, 2),
((select id from service_categories where slug = 'light'), 'Chandelier Installation', 'Chandelier Installation', 'chandelier-installation', 'Installation of chandeliers and decorative lights', 'point', 'fixed', 1499.00, null, null, false, true, true, 'expert', 365, 'phase1', false, true, 3),

-- Fan Services
((select id from service_categories where slug = 'fan'), 'Ceiling Fan Installation', 'Ceiling Fan Installation', 'ceiling-fan-installation', 'Installation of ceiling fans with hook', 'point', 'fixed', 799.00, null, null, false, true, true, 'intermediate', 365, 'phase1', true, true, 1),
((select id from service_categories where slug = 'fan'), 'Exhaust Fan Installation', 'Exhaust Fan Installation', 'exhaust-fan-installation', 'Installation of exhaust fans in kitchen/bathroom', 'point', 'fixed', 699.00, null, null, false, true, true, 'intermediate', 365, 'phase1', true, true, 2),
((select id from service_categories where slug = 'fan'), 'Fan Repair & Servicing', 'Fan Repair & Servicing', 'fan-repair-servicing', 'Repair and servicing of all types of fans', 'point', 'fixed', 399.00, null, null, false, false, true, 'intermediate', 30, 'phase1', true, true, 3),

-- Switch, Socket & Board Services
((select id from service_categories where slug = 'switch'), 'Switch Point Installation', 'Switch Point Installation', 'switch-point-installation', 'Installation of new switch point with wiring', 'point', 'fixed', 499.00, null, null, false, true, true, 'intermediate', 365, 'phase1', true, true, 1),
((select id from service_categories where slug = 'switch'), 'Socket Point Installation', 'Socket Point Installation', 'socket-point-installation', 'Installation of new socket point with wiring', 'point', 'fixed', 499.00, null, null, false, true, true, 'intermediate', 365, 'phase1', true, true, 2),
((select id from service_categories where slug = 'switch'), 'MCB Replacement', 'MCB Replacement', 'mcb-replacement', 'Replacement of faulty MCB in DB', 'point', 'fixed', 799.00, null, null, false, true, true, 'intermediate', 365, 'phase1', true, true, 3),
((select id from service_categories where slug = 'switch'), 'DB Upgrade', 'DB Upgrade', 'db-upgrade', 'Upgrade of distribution board with MCBs', 'job', 'starting_from', null, 2999.00, null, false, true, true, 'expert', 365, 'phase1', false, true, 4),

-- Wiring & New Points
((select id from service_categories where slug = 'wiring'), 'New Electrical Point', 'New Electrical Point', 'new-electrical-point', 'Installation of new electrical point with wiring (up to 10m)', 'point', 'fixed', 899.00, null, null, false, true, true, 'intermediate', 365, 'phase1', true, true, 1),
((select id from service_categories where slug = 'wiring'), 'Point Extension', 'Point Extension', 'point-extension', 'Extension of existing electrical point', 'point', 'fixed', 599.00, null, null, false, true, true, 'intermediate', 365, 'phase1', true, true, 2),
((select id from service_categories where slug = 'wiring'), 'Wire Replacement', 'Wire Replacement', 'wire-replacement', 'Replacement of old wiring in room', 'point', 'fixed', 1299.00, null, null, false, true, true, 'intermediate', 365, 'phase1', true, true, 3),

-- Inverter Services
((select id from service_categories where slug = 'inverter'), 'Inverter Installation', 'Inverter Installation', 'inverter-installation', 'Installation of inverter with battery connection', 'job', 'fixed', 1499.00, null, null, false, true, true, 'expert', 365, 'phase1', true, true, 1),
((select id from service_categories where slug = 'inverter'), 'Inverter Servicing', 'Inverter Servicing', 'inverter-servicing', 'Servicing and maintenance of inverter system', 'job', 'fixed', 799.00, null, null, false, false, true, 'expert', 30, 'phase1', true, true, 2),

-- AC Electrical Services
((select id from service_categories where slug = 'ac'), 'AC Point Installation', 'AC Point Installation', 'ac-point-installation', 'Installation of dedicated AC point with stabilizer wiring', 'point', 'fixed', 1299.00, null, null, false, true, true, 'intermediate', 365, 'phase1', true, true, 1),
((select id from service_categories where slug = 'ac'), 'AC Servicing Electrical', 'AC Servicing Electrical', 'ac-servicing-electrical', 'Electrical check and servicing of AC unit', 'point', 'fixed', 699.00, null, null, false, false, true, 'intermediate', 30, 'phase1', true, true, 2),
((select id from service_categories where slug = 'ac'), 'Stabilizer Installation', 'Stabilizer Installation', 'stabilizer-installation', 'Installation of voltage stabilizer for AC', 'point', 'fixed', 899.00, null, null, false, true, true, 'intermediate', 365, 'phase1', true, true, 3)
on conflict do nothing;

-- Create indexes for better performance
create index idx_user_profiles_role on user_profiles(role);
create index idx_user_profiles_is_verified on user_profiles(is_verified);
create index idx_service_categories_slug on service_categories(slug);
create index idx_service_categories_active on service_categories(is_active) where is_active = true;
create index idx_services_category_id on services(category_id);
create index idx_services_slug on services(slug);
create index idx_services_active on services(active) where active = true;
create index idx_services_launch_phase on services(launch_phase);
create index idx_cities_name on cities(name);
create index idx_service_zones_city_id on service_zones(city_id);

-- Enable Row Level Security (RLS) on tables
alter table user_profiles enable row level security;
alter table cities enable row level security;
alter table service_zones enable row level security;
alter table service_categories enable row level security;
alter table services enable row level security;
alter table business_settings enable row level security;

-- Create basic RLS policies (to be customized later)
-- For now, allow public read access to cities, service_categories, services
create policy "Allow public read access to cities" on cities for select using (true);
create policy "Allow public read access to service_categories" on service_categories for select using (true);
create policy "Allow public read access to services" on services for select using (true);
create policy "Allow public read access to service_zones" on service_zones for select using (true);

-- For user_profiles, users can only see their own profile
create policy "Users can view own profile" on user_profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on user_profiles for update using (auth.uid() = id);

-- For business_settings, only allow read for now
create policy "Allow public read access to business_settings" on business_settings for select using (true);