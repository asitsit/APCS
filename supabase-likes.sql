-- Système de likes — Au Pestacle ce soir
-- Coller dans Supabase > SQL Editor > Run

-- Table des likes (une ligne par (spectacle, utilisateur))
create table if not exists likes (
  spectacle_id text not null references spectacles(id) on delete cascade,
  user_token   text not null,
  created_at   timestamptz default now(),
  primary key (spectacle_id, user_token)
);

alter table likes enable row level security;
drop policy if exists "Public read likes"   on likes;
drop policy if exists "Public insert likes" on likes;
drop policy if exists "Public delete likes" on likes;
create policy "Public read likes"   on likes for select using (true);
create policy "Public insert likes" on likes for insert with check (true);
create policy "Public delete likes" on likes for delete using (true);

-- Colonne de base (seed) sur les spectacles pour simuler les likes historiques
alter table spectacles add column if not exists likes_seed integer default 0;

-- Seed aléatoire entre 5 et 51 pour chaque spectacle
update spectacles
set likes_seed = floor(random() * 47 + 5)::integer
where likes_seed = 0;
