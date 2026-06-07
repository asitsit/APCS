-- Colonnes pour la création de fiches riches depuis l'admin
-- Coller dans Supabase > SQL Editor > Run

alter table spectacles add column if not exists intro        text;
alter table spectacles add column if not exists contenu      text;
alter table spectacles add column if not exists public_cible text;
alter table spectacles add column if not exists tarif        text;
alter table spectacles add column if not exists acces        text;
alter table spectacles add column if not exists lien_resa    text;
