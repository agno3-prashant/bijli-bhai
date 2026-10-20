-- BijliBhai marketplace foundation (additive).
-- Does not drop or rewrite the public marketing site, reviews, or contact config.
-- Run in the existing Supabase SQL editor after reviews.sql if that is not applied yet.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Settings
-- ---------------------------------------------------------------------------
create table if not exists public.marketplace_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

insert into public.marketplace_settings (key, value) values
  ('dispatch_radius_km', '8'),
  ('offer_batch_size', '4'),
  ('offer_timeout_seconds', '45'),
  ('max_dispatch_attempts', '3'),
  ('search_timeout_seconds', '180'),
  ('dispatch_policy', '"simultaneous_batch"')
on conflict (key) do nothing;

-- ---------------------------------------------------------------------------
-- Identity
-- ---------------------------------------------------------------------------
create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references auth.users (id) on delete set null,
  full_name text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.electricians (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references auth.users (id) on delete restrict,
  display_name text not null,
  profile_photo text,
  city text not null default 'Kanpur',
  locality text,
  latitude double precision,
  longitude double precision,
  service_radius_km numeric(6,2) not null default 8,
  years_experience numeric(4,1),
  verification_status text not null default 'APPLIED'
    check (verification_status in ('APPLIED', 'UNDER_REVIEW', 'VERIFIED', 'REJECTED', 'SUSPENDED')),
  active boolean not null default false,
  availability_status text not null default 'OFFLINE'
    check (availability_status in ('OFFLINE', 'ONLINE', 'BUSY', 'PAUSED')),
  current_job_id uuid,
  average_rating numeric(3,2),
  completed_jobs_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.electrician_skills (
  electrician_id uuid not null references public.electricians (id) on delete cascade,
  skill_slug text not null,
  created_at timestamptz not null default now(),
  primary key (electrician_id, skill_slug)
);

create table if not exists public.electrician_areas (
  electrician_id uuid not null references public.electricians (id) on delete cascade,
  area_name text not null,
  created_at timestamptz not null default now(),
  primary key (electrician_id, area_name)
);

-- ---------------------------------------------------------------------------
-- Bookings / offers / assignments
-- ---------------------------------------------------------------------------
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique,
  customer_id uuid references public.customers (id) on delete set null,
  service_slug text not null,
  issue_text text,
  timing text not null default 'NOW' check (timing in ('NOW', 'SCHEDULED')),
  scheduled_for timestamptz,
  locality text,
  city text,
  pincode text,
  landmark text,
  address_text text,
  latitude double precision,
  longitude double precision,
  customer_name text,
  customer_mobile text,
  status text not null default 'REQUESTED',
  dispatch_attempt integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint bookings_status_check check (status in (
    'REQUESTED', 'SEARCHING', 'OFFERED', 'ASSIGNED',
    'ELECTRICIAN_ON_THE_WAY', 'ARRIVED', 'INSPECTION',
    'QUOTE_PENDING', 'QUOTE_APPROVED', 'WORK_IN_PROGRESS',
    'COMPLETED', 'CANCELLED', 'NO_ELECTRICIAN_FOUND'
  ))
);

create table if not exists public.booking_offers (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings (id) on delete cascade,
  electrician_id uuid not null references public.electricians (id) on delete cascade,
  status text not null default 'PENDING'
    check (status in ('PENDING', 'ACCEPTED', 'DECLINED', 'EXPIRED', 'CANCELLED')),
  offered_at timestamptz not null default now(),
  expires_at timestamptz not null,
  responded_at timestamptz,
  decline_reason text,
  rank_score numeric(8,3),
  distance_km numeric(6,2),
  unique (booking_id, electrician_id)
);

create table if not exists public.booking_assignments (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings (id) on delete cascade,
  electrician_id uuid not null references public.electricians (id) on delete restrict,
  status text not null default 'ACTIVE'
    check (status in ('ACTIVE', 'COMPLETED', 'CANCELLED', 'REASSIGNED')),
  assigned_at timestamptz not null default now(),
  released_at timestamptz
);

create unique index if not exists booking_one_active_assignment
  on public.booking_assignments (booking_id)
  where status = 'ACTIVE';

create unique index if not exists electrician_one_active_assignment
  on public.booking_assignments (electrician_id)
  where status = 'ACTIVE';

create table if not exists public.booking_status_history (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings (id) on delete cascade,
  from_status text,
  to_status text not null,
  actor_role text,
  actor_id uuid,
  reason text,
  created_at timestamptz not null default now()
);

create table if not exists public.quotes (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings (id) on delete cascade,
  version integer not null default 1,
  labour_amount numeric(10,2) not null default 0,
  material_amount numeric(10,2) not null default 0,
  fees_amount numeric(10,2) not null default 0,
  discount_amount numeric(10,2) not null default 0,
  total_amount numeric(10,2) not null default 0,
  notes text,
  status text not null default 'PENDING'
    check (status in ('PENDING', 'APPROVED', 'REJECTED', 'SUPERSEDED')),
  created_at timestamptz not null default now(),
  unique (booking_id, version)
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete cascade,
  electrician_id uuid references public.electricians (id) on delete cascade,
  booking_id uuid references public.bookings (id) on delete cascade,
  kind text not null,
  payload jsonb not null default '{}',
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_user_id uuid,
  actor_role text,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  reason text,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

alter table public.reviews
  add column if not exists booking_id uuid references public.bookings (id) on delete set null;

create index if not exists bookings_status_created_idx on public.bookings (status, created_at desc);
create index if not exists booking_offers_pending_idx on public.booking_offers (electrician_id, status, expires_at);
create index if not exists electricians_live_idx
  on public.electricians (verification_status, active, availability_status);

-- ---------------------------------------------------------------------------
-- Atomic accept: first valid write wins. Frontend must never assign.
-- ---------------------------------------------------------------------------
create or replace function public.accept_booking_offer(p_offer_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();
  v_electrician public.electricians%rowtype;
  v_offer public.booking_offers%rowtype;
  v_booking public.bookings%rowtype;
begin
  if v_user_id is null then
    raise exception 'NOT_AUTHENTICATED';
  end if;

  select * into v_electrician
  from public.electricians
  where user_id = v_user_id
  for update;

  if not found then
    raise exception 'NOT_ELECTRICIAN';
  end if;

  if v_electrician.verification_status <> 'VERIFIED' or v_electrician.active is not true then
    raise exception 'ELECTRICIAN_NOT_ELIGIBLE';
  end if;

  if v_electrician.availability_status not in ('ONLINE', 'BUSY') then
    raise exception 'ELECTRICIAN_NOT_ONLINE';
  end if;

  select * into v_offer
  from public.booking_offers
  where id = p_offer_id
    and electrician_id = v_electrician.id
  for update;

  if not found then
    raise exception 'OFFER_NOT_FOUND';
  end if;

  if v_offer.status <> 'PENDING' or v_offer.expires_at <= now() then
    raise exception 'OFFER_NOT_PENDING';
  end if;

  select * into v_booking
  from public.bookings
  where id = v_offer.booking_id
  for update;

  if v_booking.status not in ('SEARCHING', 'OFFERED') then
    return jsonb_build_object(
      'ok', false,
      'code', 'ALREADY_ASSIGNED',
      'message', 'Job kisi aur electrician ko assign ho chuki hai.'
    );
  end if;

  begin
    insert into public.booking_assignments (booking_id, electrician_id, status)
    values (v_booking.id, v_electrician.id, 'ACTIVE');
  exception
    when unique_violation then
      return jsonb_build_object(
        'ok', false,
        'code', 'ALREADY_ASSIGNED',
        'message', 'Job kisi aur electrician ko assign ho chuki hai.'
      );
  end;

  update public.booking_offers
  set status = 'ACCEPTED', responded_at = now()
  where id = v_offer.id;

  update public.booking_offers
  set status = 'CANCELLED', responded_at = now()
  where booking_id = v_booking.id
    and id <> v_offer.id
    and status = 'PENDING';

  update public.bookings
  set status = 'ASSIGNED', updated_at = now()
  where id = v_booking.id;

  update public.electricians
  set availability_status = 'BUSY',
      current_job_id = v_booking.id,
      updated_at = now()
  where id = v_electrician.id;

  insert into public.booking_status_history (booking_id, from_status, to_status, actor_role, actor_id)
  values (v_booking.id, v_booking.status, 'ASSIGNED', 'electrician', v_electrician.id);

  return jsonb_build_object('ok', true, 'booking_id', v_booking.id);
end;
$$;

revoke all on function public.accept_booking_offer(uuid) from public;
grant execute on function public.accept_booking_offer(uuid) to authenticated;

-- ---------------------------------------------------------------------------
-- RLS: deny-by-default. Prompt 2/3 will add role policies. No anon marketplace I/O.
-- ---------------------------------------------------------------------------
alter table public.marketplace_settings enable row level security;
alter table public.customers enable row level security;
alter table public.electricians enable row level security;
alter table public.electrician_skills enable row level security;
alter table public.electrician_areas enable row level security;
alter table public.bookings enable row level security;
alter table public.booking_offers enable row level security;
alter table public.booking_assignments enable row level security;
alter table public.booking_status_history enable row level security;
alter table public.quotes enable row level security;
alter table public.notifications enable row level security;
alter table public.audit_logs enable row level security;

drop policy if exists marketplace_settings_read on public.marketplace_settings;
create policy marketplace_settings_read
  on public.marketplace_settings for select
  to authenticated
  using (true);
