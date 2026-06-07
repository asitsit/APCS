-- Créer le bucket pour les photos de spectacles
-- Coller dans Supabase > SQL Editor > Run

insert into storage.buckets (id, name, public)
values ('spectacles', 'spectacles', true)
on conflict (id) do nothing;

-- Permettre la lecture publique
create policy "Lecture publique images" on storage.objects
  for select using (bucket_id = 'spectacles');

-- Permettre l'upload aux utilisateurs connectés
create policy "Upload admin images" on storage.objects
  for insert with check (bucket_id = 'spectacles' and auth.role() = 'authenticated');

-- Permettre la suppression aux utilisateurs connectés
create policy "Suppression admin images" on storage.objects
  for delete using (bucket_id = 'spectacles' and auth.role() = 'authenticated');
