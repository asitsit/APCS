-- ═══════════════════════════════════════════
-- AU PESTACLE CE SOIR — Ajout du typage des articles
-- (Recommandations / Spectacles / Communauté)
-- Coller dans Supabase > SQL Editor > Run
-- ═══════════════════════════════════════════

alter table spectacles add column if not exists type text default 'spectacle';
alter table spectacles add column if not exists realisateur   text;
alter table spectacles add column if not exists lien_officiel text;

update spectacles set type = 'spectacle' where type is null;

alter table spectacles drop constraint if exists spectacles_type_check;
alter table spectacles add constraint spectacles_type_check
  check (type in ('recommandation', 'spectacle', 'communaute'));

alter table spectacles alter column type set not null;
