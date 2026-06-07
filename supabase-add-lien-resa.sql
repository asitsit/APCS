-- Ajouter la colonne lien_resa à la table spectacles
-- Coller dans Supabase > SQL Editor > Run

alter table spectacles add column if not exists lien_resa text;
