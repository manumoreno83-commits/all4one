-- ALL4ONE Functional Fitness Club — Supabase Schema
-- Run this in Supabase SQL Editor (https://supabase.com/dashboard/project/YOUR_PROJECT/sql)

-- 1. Profiles (extends Supabase Auth users)
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  name text not null,
  role text not null check (role in ('coach', 'athlete', 'admin')),
  goal text not null default 'general',
  level text not null default 'intermediate',
  days_per_week integer not null default 4,
  injuries text[] not null default '{}',
  avatar_url text,
  coach_pin text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. Exercises (300 exercise library)
create table exercises (
  id text primary key,
  name text not null,
  category text not null,
  movement text not null,
  difficulty text not null,
  equipment text[] not null default '{}',
  muscle_groups text[] not null default '{}',
  description text not null default '',
  cues text[] not null default '{}',
  video_url text,
  risky_for text[] not null default '{}'
);

-- 3. Routines
create table routines (
  id text primary key,
  name text not null,
  description text not null default '',
  goal text not null default 'general',
  difficulty text not null default 'intermediate',
  estimated_minutes integer not null default 0,
  created_by uuid not null references profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 4. Routine Blocks
create table routine_blocks (
  id text primary key,
  routine_id text not null references routines(id) on delete cascade,
  type text not null,
  name text not null,
  duration_minutes integer not null default 10,
  notes text not null default '',
  sort_order integer not null default 0
);

-- 5. Block Exercises
create table block_exercises (
  id text primary key,
  block_id text not null references routine_blocks(id) on delete cascade,
  exercise_id text not null,
  exercise_name text not null,
  sets integer not null default 3,
  reps text not null default '10',
  load text not null default '',
  load_type text not null default 'kg',
  rest_seconds integer not null default 60,
  notes text not null default '',
  sort_order integer not null default 0
);

-- 6. Assigned Workouts (coach assigns routine to athlete on a date)
create table assigned_workouts (
  id text primary key,
  routine_id text not null references routines(id),
  athlete_id uuid not null references profiles(id),
  coach_id uuid not null references profiles(id),
  date date not null,
  status text not null default 'scheduled' check (status in ('scheduled', 'in_progress', 'completed', 'skipped')),
  created_at timestamptz not null default now()
);

-- 7. Workout Logs (completed workouts)
create table workout_logs (
  id text primary key,
  assigned_workout_id text references assigned_workouts(id),
  routine_id text not null references routines(id),
  athlete_id uuid not null references profiles(id),
  date date not null,
  duration_minutes integer not null default 0,
  completed_exercises integer not null default 0,
  total_exercises integer not null default 0,
  notes text not null default '',
  created_at timestamptz not null default now()
);

-- 8. Personal Records
create table personal_records (
  id text primary key,
  athlete_id uuid not null references profiles(id),
  exercise_id text not null,
  exercise_name text not null,
  value numeric not null,
  unit text not null,
  date date not null,
  created_at timestamptz not null default now()
);

-- INDEXES
create index idx_profiles_role on profiles(role);
create index idx_routines_created_by on routines(created_by);
create index idx_assigned_workouts_athlete on assigned_workouts(athlete_id, date);
create index idx_assigned_workouts_coach on assigned_workouts(coach_id);
create index idx_workout_logs_athlete on workout_logs(athlete_id);
create index idx_personal_records_athlete on personal_records(athlete_id);

-- ROW LEVEL SECURITY (RLS)
alter table profiles enable row level security;
alter table exercises enable row level security;
alter table routines enable row level security;
alter table routine_blocks enable row level security;
alter table block_exercises enable row level security;
alter table assigned_workouts enable row level security;
alter table workout_logs enable row level security;
alter table personal_records enable row level security;

-- Exercises: everyone can read
create policy "Exercises are viewable by everyone" on exercises for select using (true);

-- Profiles: users can read all, update own
create policy "Profiles viewable by authenticated" on profiles for select to authenticated using (true);
create policy "Users can update own profile" on profiles for update to authenticated using (auth.uid() = id);
create policy "Users can insert own profile" on profiles for insert to authenticated with check (auth.uid() = id);

-- Routines: coaches can CRUD, athletes can read assigned
create policy "Coaches can manage routines" on routines for all to authenticated
  using (created_by = auth.uid());
create policy "Athletes can view routines" on routines for select to authenticated using (true);

-- Routine blocks: follow routine access
create policy "Blocks viewable by all" on routine_blocks for select to authenticated using (true);
create policy "Blocks managed by routine owner" on routine_blocks for all to authenticated
  using (routine_id in (select id from routines where created_by = auth.uid()));

-- Block exercises: follow block access
create policy "Block exercises viewable by all" on block_exercises for select to authenticated using (true);
create policy "Block exercises managed by routine owner" on block_exercises for all to authenticated
  using (block_id in (select rb.id from routine_blocks rb join routines r on rb.routine_id = r.id where r.created_by = auth.uid()));

-- Assigned workouts: coaches can assign, athletes can view own
create policy "Coaches can manage assignments" on assigned_workouts for all to authenticated
  using (coach_id = auth.uid());
create policy "Athletes can view own assignments" on assigned_workouts for select to authenticated
  using (athlete_id = auth.uid());
create policy "Athletes can update own assignment status" on assigned_workouts for update to authenticated
  using (athlete_id = auth.uid());

-- Workout logs: athletes own their logs
create policy "Athletes can manage own logs" on workout_logs for all to authenticated
  using (athlete_id = auth.uid());
create policy "Coaches can view all logs" on workout_logs for select to authenticated
  using (exists (select 1 from profiles where id = auth.uid() and role = 'coach'));

-- Personal records: athletes own, coaches can view
create policy "Athletes can manage own PRs" on personal_records for all to authenticated
  using (athlete_id = auth.uid());
create policy "Coaches can view all PRs" on personal_records for select to authenticated
  using (exists (select 1 from profiles where id = auth.uid() and role = 'coach'));

-- AUTO-CREATE PROFILE ON SIGNUP (trigger)
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, name, role, goal, level, days_per_week, injuries)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'role', 'athlete'),
    'general',
    'intermediate',
    4,
    '{}'
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
