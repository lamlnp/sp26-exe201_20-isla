-- Draft only. Human review required before applying this migration.

create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data ->> 'display_name',
      new.raw_user_meta_data ->> 'name'
    )
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text check (
    display_name is null
    or length(trim(display_name)) between 1 and 50
  ),
  age integer check (age is null or age between 12 and 120),
  gender text check (gender is null or gender in ('male', 'female', 'fggt_cnt')),
  life_context text check (life_context is null or life_context in ('working', 'studying', 'both', 'none')),
  onboarding_completed boolean not null default false,
  plan text not null default 'basic' check (plan in ('basic', 'companion')),
  daily_ai_request_count integer not null default 0 check (daily_ai_request_count >= 0),
  daily_ai_request_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.mood_checkins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  mood_score smallint not null check (mood_score between 1 and 10),
  emotions text[] not null default '{}',
  tags text[] not null default '{}',
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.journal_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text check (
    title is null
    or length(trim(title)) between 1 and 120
  ),
  content text not null check (octet_length(content) <= 1000000),
  mood_score smallint check (mood_score between 1 and 10),
  emotions text[] not null default '{}',
  tags text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.ai_reflections (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  journal_entry_id uuid references public.journal_entries(id) on delete cascade,
  emotional_summary text not null,
  possible_theme text,
  reflective_question text,
  small_action text,
  safety_note text,
  model text,
  is_mock boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.cbt_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  situation text,
  emotion text,
  automatic_thought text,
  evidence_for text,
  evidence_against text,
  balanced_thought text,
  mood_after smallint check (mood_after between 1 and 10),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index mood_checkins_user_created_idx on public.mood_checkins (user_id, created_at desc);
create index journal_entries_user_created_idx on public.journal_entries (user_id, created_at desc);
create index ai_reflections_user_created_idx on public.ai_reflections (user_id, created_at desc);
create index ai_reflections_journal_entry_idx on public.ai_reflections (journal_entry_id);
create index cbt_records_user_created_idx on public.cbt_records (user_id, created_at desc);

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger mood_checkins_set_updated_at
before update on public.mood_checkins
for each row execute function public.set_updated_at();

create trigger journal_entries_set_updated_at
before update on public.journal_entries
for each row execute function public.set_updated_at();

create trigger cbt_records_set_updated_at
before update on public.cbt_records
for each row execute function public.set_updated_at();

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.mood_checkins enable row level security;
alter table public.journal_entries enable row level security;
alter table public.ai_reflections enable row level security;
alter table public.cbt_records enable row level security;

grant usage on schema public to authenticated;

revoke all on public.profiles from anon, authenticated;
revoke all on public.mood_checkins from anon, authenticated;
revoke all on public.journal_entries from anon, authenticated;
revoke all on public.ai_reflections from anon, authenticated;
revoke all on public.cbt_records from anon, authenticated;

grant select on public.profiles to authenticated;
grant update (display_name, age, gender, life_context, onboarding_completed) on public.profiles to authenticated;

grant select, insert, update, delete on public.mood_checkins to authenticated;
grant select, insert, update, delete on public.journal_entries to authenticated;
grant select, insert, delete on public.ai_reflections to authenticated;
grant select, insert, update, delete on public.cbt_records to authenticated;

create policy "profiles_select_own"
on public.profiles for select
to authenticated
using (auth.uid() = id);

create policy "profiles_update_own"
on public.profiles for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "mood_checkins_select_own"
on public.mood_checkins for select
to authenticated
using (auth.uid() = user_id);

create policy "mood_checkins_insert_own"
on public.mood_checkins for insert
to authenticated
with check (auth.uid() = user_id);

create policy "mood_checkins_update_own"
on public.mood_checkins for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "mood_checkins_delete_own"
on public.mood_checkins for delete
to authenticated
using (auth.uid() = user_id);

create policy "journal_entries_select_own"
on public.journal_entries for select
to authenticated
using (auth.uid() = user_id);

create policy "journal_entries_insert_own"
on public.journal_entries for insert
to authenticated
with check (auth.uid() = user_id);

create policy "journal_entries_update_own"
on public.journal_entries for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "journal_entries_delete_own"
on public.journal_entries for delete
to authenticated
using (auth.uid() = user_id);

create policy "ai_reflections_select_own"
on public.ai_reflections for select
to authenticated
using (auth.uid() = user_id);

create policy "ai_reflections_insert_own"
on public.ai_reflections for insert
to authenticated
with check (
  auth.uid() = user_id
  and (
    journal_entry_id is null
    or exists (
      select 1
      from public.journal_entries
      where journal_entries.id = ai_reflections.journal_entry_id
        and journal_entries.user_id = auth.uid()
    )
  )
);

create policy "ai_reflections_delete_own"
on public.ai_reflections for delete
to authenticated
using (auth.uid() = user_id);

create policy "cbt_records_select_own"
on public.cbt_records for select
to authenticated
using (auth.uid() = user_id);

create policy "cbt_records_insert_own"
on public.cbt_records for insert
to authenticated
with check (auth.uid() = user_id);

create policy "cbt_records_update_own"
on public.cbt_records for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "cbt_records_delete_own"
on public.cbt_records for delete
to authenticated
using (auth.uid() = user_id);
