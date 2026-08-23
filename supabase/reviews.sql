-- Run in the existing Supabase project. Public reads only APPROVED rows.
-- Anon can insert PENDING reviews only.

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  mobile text not null,
  locality text not null,
  service text not null,
  electrician_name text,
  rating smallint not null check (rating between 1 and 5),
  review_text text not null,
  feedback_tags text[] not null default '{}',
  status text not null default 'PENDING' check (status in ('PENDING', 'APPROVED', 'REJECTED')),
  created_at timestamptz not null default now(),
  published_at timestamptz
);

alter table public.reviews enable row level security;

drop policy if exists "public_read_approved_reviews" on public.reviews;
create policy "public_read_approved_reviews"
  on public.reviews for select
  using (status = 'APPROVED');

drop policy if exists "public_insert_pending_reviews" on public.reviews;
create policy "public_insert_pending_reviews"
  on public.reviews for insert
  with check (status = 'PENDING');

-- Approve from the Supabase dashboard / SQL editor only:
-- update public.reviews set status = 'APPROVED', published_at = now() where id = '...';
