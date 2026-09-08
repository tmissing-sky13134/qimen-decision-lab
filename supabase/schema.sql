-- Qimen Decision Lab: persistent reading provenance and threaded discussion
create extension if not exists pgcrypto;

create table public.readings (
  id uuid primary key default gen_random_uuid(),
  chart_hash text not null unique,
  question text not null,
  question_type text not null,
  method text not null check (method in ('qimen','zhouyi','liuren','huican')),
  cast_time timestamptz not null,
  location text not null,
  timezone text not null,
  longitude numeric,
  true_solar_time boolean not null default false,
  engine_name text not null,
  engine_version text,
  created_at timestamptz not null default now()
);
create index readings_created_at_idx on public.readings (created_at desc);
create index readings_chart_hash_idx on public.readings (chart_hash);

create table public.charts (
  id uuid primary key default gen_random_uuid(),
  reading_id uuid not null unique references public.readings(id) on delete cascade,
  ruleset text not null,
  raw_summary text not null,
  chart_json jsonb not null,
  source_response jsonb,
  created_at timestamptz not null default now()
);

create table public.interpretations (
  id uuid primary key default gen_random_uuid(),
  reading_id uuid not null references public.readings(id) on delete cascade,
  overall text not null,
  core_judgment text not null,
  key_signals jsonb not null default '[]'::jsonb,
  favorable_direction text,
  timing text,
  risks jsonb not null default '[]'::jsonb,
  actions jsonb not null default '[]'::jsonb,
  confidence text not null check (confidence in ('Low','Moderate','High')),
  model_name text,
  prompt_version text,
  created_at timestamptz not null default now()
);
create index interpretations_reading_idx on public.interpretations (reading_id, created_at desc);

create table public.followups (
  id uuid primary key default gen_random_uuid(),
  reading_id uuid not null references public.readings(id) on delete cascade,
  question text not null,
  answer text not null,
  -- Invariant: this is a reference to the original chart; no cast inputs belong here.
  chart_id uuid not null references public.charts(id) on delete restrict,
  created_at timestamptz not null default now()
);
create index followups_reading_idx on public.followups (reading_id, created_at);

-- Add auth-scoped RLS policies when authentication is introduced. Until then, keep
-- this migration applied only behind trusted server-side Supabase access.
